const router = require("express").Router();
const talent = require("../controllers/talentController");
const upload = require("../middleware/uploadVideo");

router.get("/", talent.getAllTalents);
router.post("/", upload, talent.createTalent);

router.get("/:id", talent.getOneTalent);
router.put("/:id", upload, talent.updateTalent);
router.delete("/:id", talent.deleteTalent);

module.exports = router;