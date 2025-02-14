import CategoryModel from "../models/categoryModel.js";
import { ObjectId } from "mongodb";

import { removeVietnameseAccents } from "../common/index.js";
import e from "express";
export async function listCategory(req, res) {
  const search = req.query?.search;
  const pageSize = !!req.query.pageSize ? parseInt(req.query.pageSize) : 5;
  const page = !!req.query.page ? parseInt(req.query.page) : 1;
  const skip = (page - 1) * pageSize;
  const sort = !!req.query.sort ? req.query.sort : null;
  const sortObject = [
    { code: "name_ASC", name: "Tên tăng dần" },
    { code: "name_DESC", name: "Tên giảm dần" },
    { code: "code_ASC", name: "Mã tăng dần " },
    { code: "code_DESC", name: "Mã giảm dần " },
  ];
  let filters = {
    deletedAt: null,
  };
  if (search && search.length > 0) {
    filters.searchString = {
      $regex: removeVietnameseAccents(search),
      $options: "i",
    };
  }

  try {
    const countCategories = await CategoryModel.countDocuments(filters);
    const categories = await CategoryModel.find(filters)
      .skip(skip)
      .limit(pageSize);

    res.render("pages/categories/list", {
      title: "Categories",
      categories: categories,
      countPagination: Math.ceil(countCategories / pageSize),
      pageSize,
      page,
      sort,
      sortObject,
    });
  } catch (error) {
    console.log(error);
    res.send("no product");
  }
}
export async function renderPageCreateCategory(req, res) {
  res.render("pages/categories/form", {
    title: "Create Categories",
    mode: "Create",
    category: {},
    err: {},
  });
}
export async function createCategory(req, res) {
  const data = req.body;

  try {
    const category = await CategoryModel.findOne({
      code: data.code,
      deletedAt: null,
    });
    if (category) {
      throw "code";
    }
    await CategoryModel.create({
      ...data,
      createdAt: new Date(),
    });

    res.redirect("/categories");
  } catch (error) {
    console.log("error", error);
    let err = {};
    if (error === "code") {
      err.code = "Mã sản phẩm này đã tồn tại ";
    }
    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
    }
    res.render("pages/categories/form", {
      title: "Create Categories",
      mode: "Create",
      category: { ...data },
      err,
    });
  }
}
export async function renderPageUpdateCategory(req, res) {
  try {
    const { id } = req.params;

    const category = await CategoryModel.findOne({
      _id: new ObjectId(id),
      deletedAt: null,
    });
    if (category) {
      res.render("pages/categories/form", {
        title: "Create Categories",
        mode: "Update",
        category: category,
        err: {},
      });
    } else {
      res.send("không tìm thấy sản phẩm nào phù hợp ");
    }
  } catch (error) {
    console.log(error);
    res.send("không tìm thấy sản phẩm nào phù hợp ");
  }
}
export async function updateCategory(req, res) {
  const { ...data } = req.body;
  const { id } = req.params;
  try {
     const category = await CategoryModel.findOne({
       code:data.code,
       deletedAt: null,
     });
     if (category) {
       throw "code";
     }
    await CategoryModel.updateOne(
      { _id: new ObjectId(id) },
      {
        ...data,
        updatedAt: new Date(),
      }
    );

    res.redirect("/categories");
  } catch (error) {
   console.log("error", error);
   let err = {};
   if (error === "code") {
     err.code = "Mã sản phẩm này đã tồn tại ";
   }
   if (error.name === "ValidationError") {
     Object.keys(error.errors).forEach((key) => {
       err[key] = error.errors[key].message;
     });
   }
   res.render("pages/categories/form", {
     title: "Update Categories",
     mode: "Update",
     category: { ...data,_id:id },
     err,
   });
  }
}
export async function renderPageDeleteCategory(req, res) {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findOne({
      _id: new ObjectId(id),
      deletedAt: null,
    });
    if (category) {
      res.render("pages/categories/form", {
        title: "Delete Categories",
        mode: "Delete",
        category: category,
        err: {},
      });
    } else {
      res.send("không tìm thấy sản phẩm nào phù hợp ");
    }
  } catch (error) {
    console.log(error);
    res.send("Trang web này không tồn tại ");
  }
}
export async function deleteCategory(req, res) {
  const { id } = req.body;
  try {
    await CategoryModel.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          deletedAt: new Date(),
        },
      }
    );

    res.redirect("/categories");
  } catch (error) {
    console.log(error);
    res.send("xóa sản phẩm không thành công ");
  }
}
