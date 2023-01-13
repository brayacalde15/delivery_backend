const Products = require("../models/products");
const storage = require("../utils/cloud_storage");
const asyncForEach = require("../utils/async_foreach");

module.exports = {


    createProducts(req, res) {
    const products = JSON.parse(req.body.products); //CAPTURO LOS DATOS QUE ME ENVIA EL CLIENTE.

    const files = req.files;

    let inserts = 0;

    if (files.length === 0) {
        return res.status(501).json({
        success: false,
        message:
            "Hubo un error con el registro del Producto, No tiene imagenes",
        });
    } else {

        
        Products.create(products, (err, id_products) => {
        if (err) {
            return res.status(501).json({
            success: false,
            message: "Hubo un error con el registro del producto",
            error: err,
            });
        }

        products.id = id_products;

        
        const start = async () => {
            await asyncForEach(files, async (file) => {
            const path = `image_${Date.now()}`;
            const url = await storage(file, path);

            if (url != undefined && url != null) {

                if (inserts == 0) {
                //IMAGE 1

                products.image1 = url;

            } 
                else if (inserts == 1) {
                //IMAGE 2

                products.image2 = url;
            } 
                else if (inserts == 2) {
                // IMAGE 3

                products.image3 = url;
            }

        }

        await Products.update(products, (err, data) => {
                if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error con el registro del producto",
                    error: err,
                });
            }

                inserts = inserts + 1;

                if (inserts == files.length) {
                return res.status(201).json({
                    success: true,
                    message: "El producto se almaceno correctamente",
                    data: data,
                });
            }
        });
    });
  }
    start();
  
});
}
  },
};
