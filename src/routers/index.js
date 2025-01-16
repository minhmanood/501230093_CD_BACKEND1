import categoryRoute from './categoryRoute.js'
export default function routers(app) {
    app.use("/categories",categoryRoute)
    app.get("/", (req, res) => {
      res.render("pages/index", { title: "Home" });
    });
    app.get("/components", (req, res) => {
      res.render("pages/components", { title: "components" });
    });
    app.get("/forms", (req, res) => {
      res.render("pages/forms", { title: "forms" });
    });
    app.get("/icons", (req, res) => {
      res.render("pages/icons", { title: "Icons" });
    });
    app.get("/notifications", (req, res) => {
      res.render("pages/notifications", { title: "Notification" });
    });
    app.get("/tables", (req, res) => {
      res.render("pages/tables", { title: "tables" });
    });
    app.get("/typography", (req, res) => {
      res.render("pages/typography", { title: "typography" });
    });
}