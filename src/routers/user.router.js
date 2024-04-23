const {Router} = require("express");
const router = Router();
const userCtrl = require("../controller/user.controller")

router.post("/register", userCtrl.postUser);
router.post("/login", userCtrl.postUserLogin)
router.put("/usuarios", userCtrl.putUsuario)


module.exports = router;