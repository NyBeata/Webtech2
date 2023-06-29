const express = require("express");
const connection = require("../connection");
const router = express.Router();
var auth = require("../services/authentication");
var checkRole = require("../services/checkRole");

//Új állat hozzáadás
router.post("/add", auth.authenticateToken, checkRole.checkRole, (req, res) => {
  let animal = req.body;
  var query =
    "insert into animal (name,dlcId,description,status) values(?,?,?,'true')";
  connection.query(
    query,
    [animal.name, animal.dlcId, animal.description],
    (err, results) => {
      if (!err) {
        return res.status(200).json({ message: "Animal added successfully" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

//Állatok kilistázása
router.get("/get", auth.authenticateToken, (req, res, next) => {
  var query =
    "select a.id,a.name,a.description,a.status,d.id as dlcId,d.name as dlcName from animal as a INNER JOIN dlc as d where a.dlcId = d.id";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

//Állatok DLC szerinti kilistázása
router.get("/getByDlc/:id", auth.authenticateToken, (req, res, next) => {
  const id = req.params.id;
  var query = "select id,name from animal where dlcId=? and status='true'";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

//Állat id-ja alapján kiválasztás
router.get("/getById/:id", auth.authenticateToken, (req, res, next) => {
  const id = req.params.id;
  var query = "select id,name,description from animal where id=?";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      return res.status(200).json(results[0]);
    } else {
      return res.status(500).json(err);
    }
  });
});

//Állat frissítés
router.patch(
  "/update",
  auth.authenticateToken,
  checkRole.checkRole,
  (req, res, next) => {
    let animal = req.body;
    var query = "update animal set name=?,dlcId=?,description=? where id=?";
    connection.query(
      query,
      [animal.name, animal.dlcId, animal.description, animal.id],
      (err, results) => {
        if (!err) {
          if (results.affectedRows == 0) {
            return res.status(404).json({ message: "Animal id is not found" });
          }
          return res
            .status(200)
            .json({ message: "Animal updated successfully" });
        } else {
          return res.status(500).json(err);
        }
      }
    );
  }
);

//Állat törlés
router.delete(
  "/delete/:id",
  auth.authenticateToken,
  checkRole.checkRole,
  (req, res, next) => {
    const id = req.params.id;
    var query = "delete from animal where id=?";
    connection.query(query, [id], (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "Animal id is not found" });
        }
        return res.status(200).json({ message: "Animal deleted successfully" });
      } else {
        return res.status(500).json(err);
      }
    });
  }
);

//Státusz frissítés
router.patch(
  "/updateStatus",
  auth.authenticateToken,
  checkRole.checkRole,
  (req, res, next) => {
    let user = req.body;
    var query = "update animal set status=? where id=?";
    connection.query(query, [user.status, user.id], (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "Animal id is not found" });
        }
        return res
          .status(200)
          .json({ message: "Animal status updated successfully" });
      } else {
        return res.status(500).json(err);
      }
    });
  }
);

module.exports = router;
