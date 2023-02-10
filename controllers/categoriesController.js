const Category = require("../models/category");

module.exports = {
  createCategory(req, res) {
    const category = req.body;

    Category.create(category, (err, idCategory) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con el registro de la categoria",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "La categoria se creo correctamente",
        data: `${idCategory}`, //El ID de la nueva categoria
      });
    });
  },

  getAll(req, res) {
    Category.getAll((err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al momento de listar las Categorias",
          error: err,
        });
      }

      return res.status(201).json(data);
    });
  },
};
