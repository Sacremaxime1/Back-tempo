const router = require("express").Router();
const cardController = require("../controllers/card.controller");
const multer = require("multer");
const upload = multer();

router.get("/", cardController.readCard);
router.post("/", upload.single("file"), cardController.createCard);
router.put("/:id", cardController.updateCard);
router.delete("/:id", cardController.deleteCard);
router.patch("/like-card/:id", cardController.likeCard);
router.patch("/unlike-card/:id", cardController.unlikeCard);

module.exports = router;
