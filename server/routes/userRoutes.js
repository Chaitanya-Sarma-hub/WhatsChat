const router = require("express").Router();
const {
  registeruser,
  loginUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(registeruser).get(protect, allUsers);
router.route("/login").post(loginUser);

module.exports = router;
