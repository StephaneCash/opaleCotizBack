const router = require("express").Router();
const deviseController = require("../controllers/deviseController");

router.get("/", deviseController.getAllDevises);
router.post("/", deviseController.createDevise);

router.get("/:id", deviseController.getOneDevise);
router.put("/:id", deviseController.updateDevise);
router.delete("/:id", deviseController.deleteDevise);

module.exports = router;