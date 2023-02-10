const db = require("../config/config");

const Products = {};

Products.findByCategory = (id_category, result) => {
  const sql = `
    SELECT 
       CONVERT( P.id,char) as id,
        P.name,
        P.description,
        P.price,
        P.image1,
        P.image2,
        P.image3,
        CONVERT(P.id_category,char) as id_category 
    FROM
    products as P    

    WHERE 

    P.id_category = ? 



    `;

  db.query(sql, [id_category], (err, res) => {
    if (err) {
      console.log("Error", err);
      result(err, null);
    } else {
      console.log("Id de la categoria :", res);
      result(null, res);
    }
  });
};

Products.create = (products, result) => {
  const sql = `
        INSERT INTO
        products(
            name,
            description,
            price,
            image1,
            image2,
            image3,
            id_category,
            created_at,
            updated_at
        )
        VALUES (
            ?,?,?,?,?,?,?,?,?
        )

    `;

  db.query(
    sql,
    [
      products.name,
      products.description,
      products.price,
      products.image1,
      products.image2,
      products.image3,
      products.id_category,
      new Date(),
      new Date(),
    ],
    (err, res) => {
      if (err) {
        console.log("Error", err);
        result(err, null);
      } else {
        console.log("Id del nuevo Producto", res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

Products.update = (products, result) => {
  const sql = `
        UPDATE
                products
        SET
            name=?,
            description = ?,
            price = ?,
            image1= ?,
            image2= ?,
            image3 =?,
            id_category = ?,  
            updated_at = ?
        WHERE 
            id=?   


    `;

  db.query(
    sql,
    [
      products.name,
      products.description,
      products.price,
      products.image1,
      products.image2,
      products.image3,
      products.id_category,
      new Date(),
      products.id,
    ],
    (err, res) => {
      if (err) {
        console.log("Error", err);
        result(err, null);
      } else {
        console.log("Id del Producto Actualizado", products.id);
        result(null, products.id);
      }
    }
  );
};

module.exports = Products;
