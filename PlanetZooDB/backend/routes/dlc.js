const express = require("express");
const connection = require("../connection");
const router = express.Router();
var auth = require("../services/authentication");
var checkRole = require("../services/checkRole");

//Új DLC hozzáadás
router.post(
  "/add",
  checkRole.checkRole,
  (req, res, next) => {
    let dlc = req.body;
    query = "insert into dlc (name) values(?)";
    connection.query(query, [dlc.name], (err, results) => {
      if (!err) {
        return res.status(200).json({ message: "DLC added successfully" });
      } else {
        return res.status(500).json(err);
      }
    });
  }
);

//DLC-k kilistázása
router.get("/get", (req, res, next) => {
  var query = "select *from dlc order by name";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

//DLC frissítés
router.patch(
  "/update",
  checkRole.checkRole,
  (req, res, next) => {
    let animal = req.body;
    var query = "update dlc set name=? where id=?";
    connection.query(query, [animal.name, animal.id], (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "DLC id is not found" });
        }
        return res.status(200).json({ message: "DLC updated successfully" });
      } else {
        return res.status(500).json(err);
      }
    });
  }
);

module.exports = router;
