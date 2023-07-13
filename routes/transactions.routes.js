const router = require("express").Router();
const transaction = require("../controllers/transactionsController");

router.get("/", transaction.getAllTransactions);
router.post("/", transaction.createTransaction);

router.get("/:id", transaction.getOneTransaction);
router.put("/:id", transaction.updateTransaction);
router.delete("/:id", transaction.deleteTransaction);

module.exports = router;