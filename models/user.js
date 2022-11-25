const db = require("../config/config");
const bcrypt = require("bcryptjs");
const { session } = require("passport/lib");
const User = {};

User.findById = (id, result) => {
  const sql = `SELECT 
  CONVERT(U.id, CHAR) AS id,
  U.email,
  U.name,
  U.lastname,
  U.image,
  U.phone,
  U.password,
  U.confirmpassword,
  JSON_ARRAYAGG(
    JSON_OBJECT(
      'id',CONVERT(R.id, CHAR),
          'name',R.name,
          'image',R.image,
          'route',R.route
      )
  )AS roles
  
  FROM
    users AS U
    INNER JOIN 
    user_has_roles AS UHR ON 
    UHR.id_user=U.id
    INNER JOIN
    roles AS R 
    ON UHR.id_rol= R.id
    WHERE
    U.id = ?
    GROUP BY U.id`;
console.log("Este es el Id : ",id);
  db.query(sql, [id], (err, user) => {
    if (err) {
      console.log("Error", err);
      result(err, null);
    } else {
      console.log("Usuario Obtenido", user);
      result(null, user[0]);
    }
    
  });
};

User.findByEmail = (email, result) => {
  const sql = `SELECT 
    U.id,
    U.email,
    U.name,
    U.lastname,
    U.image,
    U.phone,
    U.password,
    U.confirmpassword,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'id',CONVERT(R.id, CHAR),
            'name',R.name,
            'image',R.image,
            'route',R.route
        )
    )AS roles
    
    FROM
      users AS U
      INNER JOIN 
      user_has_roles AS UHR ON 
      UHR.id_user=U.id
      INNER JOIN
      roles AS R 
      ON UHR.id_rol= R.id
      WHERE
      email = ?
      GROUP BY U.id`;

  db.query(sql, [email], (err, user) => {
    if (err) {
      console.log("Error", err);
      result(err, null);
    } else {
      console.log("Usuario Obtenido", user[0]);
      result(null, user[0]);
    }
  });
};

User.create = async (user, result) => {
  const hash = await bcrypt.hash(user.password, 10);
  const hashConfirm = await bcrypt.hash(user.confirmpassword, 10);

  const sql =
    "INSERT INTO users(email,name,lastname,phone,image,password,confirmpassword,created_at,update_at) VALUES(?,?,?,?,?,?,?,?,?)";

  db.query(
    sql,
    [
      user.email,
      user.name,
      user.lastname,
      user.phone,
      user.image,
      hash,
      hashConfirm,
      new Date(),
      new Date(),
    ],
    (err, res) => {
      if (err) {
        console.log("Error", err);
        result(err, null);
      } else {
        console.log("Id del nuevo Usuario", res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

User.update = (user, result) => {
  const sql = 
  `
  UPDATE
        users
  SET
        name = ?,
        lastname = ?,
        phone = ? ,
        image = ?,
        update_at =  ?
  WHERE  
        id = ?  
  `;

  db.query(
    sql,
    [
      user.name,
      user.lastname,
      user.phone,
      user.image,         
      new Date(),
      user.id
      
    ],
    (err, res) => {
      if (err) {
        console.log("Error", err);
        result(err, null);
      } else {
        console.log("Usuario Actualizado correctamente",user.id);
        result(null, user.id);
      }
    }
  );
};

User.updateWithOutImage = (user, result) => {
  const sql = 
  `
  UPDATE
        users
  SET
        name=?,
        lastname=?,
        phone=?,
        update_at = ?        
        
  WHERE  
        id=? 
  `;

  db.query(
    sql,
    [
      user.name,
      user.lastname,
      user.phone,
      new Date(),
      user.id
    ],
    (err, res) => {
      if (err) {
        console.log("Error", err);
        result(err, null);
      } else {
        console.log("Usuario Actualizado correctamente",user.id);
        result(null, user.id);
      }
    }
  );
};

module.exports = User;
