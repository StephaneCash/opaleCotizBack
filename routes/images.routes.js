const router = require("express").Router();
const imageController = require("../controllers/imageController");
const upload = require("../middleware/uploadImage");

router.get("/", imageController.getAllImages);
router.post("/", upload, imageController.createImage);

router.get("/:id", imageController.getOneImage);
router.put("/:id", upload, imageController.updateImage);
router.delete("/:id", imageController.deleteImage);

module.exports = router;