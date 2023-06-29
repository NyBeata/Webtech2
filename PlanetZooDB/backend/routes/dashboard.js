const express = require("express");
const connection = require("../connection");
const router = express.Router();
var auth = require("../services/authentication");

router.get("/details", (req, res, next) => {
  var dlcCount;
  var animalCount;

  var query = "select count(id) as dlcCount from dlc";
  connection.query(query, (err, results) => {
    if (!err) {
      dlcCount = results[0].dlcCount;
    } else {
      return res.status(500).json(err);
    }
  });

  var query = "select count(id) as animalCount from animal";
  connection.query(query, (err, results) => {
    if (!err) {
      animalCount = results[0].animalCount;

      var data = {
        dlc: dlcCount,
        animal: animalCount,
      };
      return res.status(200).json(data);
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
