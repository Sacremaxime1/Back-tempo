const router = require("express").Router();
const cardController = require("../controllers/card.controller");
const multer = require("multer");
const upload = multer();

router.get("/", cardController.readCard);
router.post("/", upload.single("file"), cardController.createCard);
router.delete("/:id", cardController.deleteCard);
router.patch("/upvote-card/:id", cardController.upvoteCard);
router.patch("/unupvote-card/:id", cardController.unUpvoteCard);
router.patch("/downvote-card/:id", cardController.downvoteCard);
router.patch("/undownvote-card/:id", cardController.unDownvoteCard);

module.exports = router;
