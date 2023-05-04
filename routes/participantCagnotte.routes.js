const router = require("express").Router();
const participantCagnotteController = require("../controllers/participantCagnotteController");

router.get("/v1/cagnottes", participantCagnotteController.getAllData);
router.post("/v1/cagnottes", participantCagnotteController.createParticipantCagnote);

router.delete("/v1/cagnottes/:id", participantCagnotteController.removeparticipantId);

module.exports = router;