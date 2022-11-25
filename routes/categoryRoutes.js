const categoriesController = require("../controllers/categoriesController");
const passport = require("passport");

/** Require multer */
const multer = require("multer");

module.exports = (app) => {
  //GET -> OBTENER DATOS
  // POST -> ALMACENAR DATOS
  //DELETE -> BORRAR DATOS
  //PUT -> ACTUALIZAR DATOS

  app.post(
    "/api/categories/create",passport.authenticate("jwt", { session: false }), categoriesController.createCategory);
};
