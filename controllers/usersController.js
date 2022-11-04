const { request } = require("http");
const Rol = require("../models/rol");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const storage = require("../utils/cloud_storage");
const { use } = require("passport");

module.exports = {


  login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);

    User.findByEmail(email, async (err, myUser) => {
      if (err) {
        return res.status(501).json({
          success: false,

          message: "Hubo un error con el registro del usuario",
          error: err,
        });
      }
      if (!myUser) {
        return res.status(401).json({
          //El cliente no tiene autorizacion para realizar esta peticion (401)
          success: false,
          message: "El email no fue encontrado",
        });
      }

      const isPasswordValid = await bcrypt
        .compare(password, myUser.password)
        .catch((err) => false);

      if (isPasswordValid) {
        const token = jwt.sign(
          { id: myUser.id, email: myUser.email },
          keys.secretOrKey,
          {}
        );

        const data = {
          id: `${myUser.id}`,
          name: myUser.name,
          lastname: myUser.lastname,
          phone: myUser.phone,
          email: myUser.email,
          image: myUser.image,
          session_token: `JWT ${token}`,
          roles:JSON.parse(myUser.roles)
        };
        return res.status(201).json({
          success: true,
          message: "El usuario fue autenticado",
          data: data,
        });
      } else {
        return res.status(401).json({
          //El cliente no tiene autorizacion para realizar esta peticion (401)
          success: false,
          message: "El password es incorrecto",
        });
      }
    });
  },
  register(req, res) {
    const user = req.body; //CAPTURO LOS DATOS QUE ME ENVIA EL CLIENTE.
    User.create(user, (err, data) => {
      if (err) {
        if (err.code == "ER_DUP_ENTRY") {
          res.status(403).json({
            success: false,
            message: "Hubo un error con el registro del usuario",
            error: err,
          });
        } else {
          console.log("Error", err);
          res.json(err, null);
        }
      } else {
        return res.status(201).json({
          success: true,
          message: "El registro se realizo corecctamente",
          data: data, //EL ID DEL NUEVO USUARIO QUE SE REGISTRO
        });
      }
    });
  },

  async registerWithImage(req, res) {
    const user = JSON.parse(req.body.user); //CAPTURO LOS DATOS QUE ME ENVIA EL CLIENTE.

    console.log(user);

    const files = req.files;

    if (files.length > 0) {
      const path = `image_${Date.now()}`;
      const url = await storage(files[0], path);

      if (url != undefined && url != null) {
        user.image = url;
      }
    }

    User.create(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con el registro del Usuario",
          error: err,
        });
      }

      user.id = `${data}`;

      Rol.create(user.id,3,(err,(data) => {
          if (err) {
            return res.status(501).json({
              success: false,
              message: "Hubo un error con el registro del rol de  Usuario",
              error: err,
            });
          } 
          else {
            return res.status(201).json({
              success: true,
              message: "El registro se realizo correctamente",
              data: user,
            });
          }
        })
      );
    });
  },
};
