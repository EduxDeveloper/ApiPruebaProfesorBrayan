import express from "express";
import RecoveryPasswordController from "../Controllers/recoveryPasswordProfesoresController.js"

const router = express.Router();

router.route("/").post(RecoveryPasswordController.requestCodePass);
router.route("/verifyCode").post(RecoveryPasswordController.verifyCode);
router.route("/newPassword").post(RecoveryPasswordController.changePassword);

export default router;