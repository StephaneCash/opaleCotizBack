const router = require("express").Router();
const cagnottesController = require("../controllers/cagnotteController");
const upload = require("../middleware/uploadImage");

router.get("/", cagnottesController.getAllCagnottes);
router.post("/", upload, cagnottesController.createCagnotte);

router.get("/:id", cagnottesController.getOneCagnotte);
router.put("/:id", upload, cagnottesController.updateCagnotte);
router.delete("/:id", cagnottesController.deleteCagnotte);

module.exports = router;