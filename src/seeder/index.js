import categorySeeerd from "./category.js";
import mongoConnect from "../mongo/mongoConnecter.js";
async function seeder() {
  await mongoConnect();
  console.log("started seeder catagory");
  await categorySeeerd();
  console.log("seeder catagory end");
  process.exit(0);
}
seeder();
