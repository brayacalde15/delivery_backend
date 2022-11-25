const usersController = require("../controllers/usersController");
const passport = require("passport");

/** Require multer */
const multer = require("multer");

module.exports = (app, upload) => {
  //GET -> OBTENER DATOS
  // POST -> ALMACENAR DATOS
  //DELETE -> BORRAR DATOS
  //PUT -> ACTUALIZAR DATOS

  app.post("/api/users/create", usersController.register);
  app.post(
    "/api/users/createWithImage",
    multer().array("image", 1),
    usersController.registerWithImage
  );
  app.post("/api/users/login", usersController.login);

  app.put("/api/users/update",passport.authenticate('jwt',{session:false}),   multer().array("image", 1),usersController.updateWithImage);

  app.put("/api/users/updateWithOutImage",passport.authenticate('jwt',{session:false}), usersController.updateWithOutImage);
};
