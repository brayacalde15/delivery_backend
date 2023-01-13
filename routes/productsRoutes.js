const productsController = require("../controllers/productsController");
const passport = require("passport");

/** Require multer */
const multer = require("multer");

module.exports = (app ,upload) => {
  //GET -> OBTENER DATOS
  // POST -> ALMACENAR DATOS
  //DELETE -> BORRAR DATOS
  //PUT -> ACTUALIZAR DATOS

  app.post(
    "/api/products/create",passport.authenticate("jwt", { session: false }),upload.array('image',3), productsController.createProducts);
};
