import CategoryModel from "../models/categoryModel.js";
const data = [
  {
    code: "AN_001",
    name: "Ao nu",
    image: "combo9.jpg",
    searchString: "ao nu",
    createdAt: new Date(),
  },
  {
    code: "MA_001",
    name: "may anh",
    image: "combo10.jpg",
    searchString: "may anh",
    createdAt: new Date(),
  },
  {
    code: "GN_001",
    name: "giay nam",
    image: "combo11.jpg",
    searchString: "giay nam",
    createdAt: new Date(),
  },
  {
    code: "NH_001",
    name: "nuoc hoa",
    image: "combo12.jpg",
    searchString: "nuoc hoa",
    createdAt: new Date(),
  },
];
export default async function categorySeeerd() {
 await CategoryModel.deleteMany();
  await CategoryModel.insertMany(data);
}
