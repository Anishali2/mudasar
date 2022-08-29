const cartController = require("../controler/cartController");
const express = require("express");
// --------for add users ---------
// const cartController = require('../controler/userControler')

const router = express.Router();

router.get("/get", cartController.get);
router.post("/new", cartController.new);
router.put("/updateqty", cartController.updateqty);
router.put("/newproduct", cartController.newproduct);
router.put("/delete/:id", cartController.delete);

module.exports = router;
