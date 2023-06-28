import { Router } from "express";
import protectRoute from "../../utils/protectRoute";
import home from "./home";
import login from "./login";
import dashboard from "./dashboard";
import logOut from "./logout";
import moderatePost from "./moderate-post";
import signUpAdmin from "./signup-admin";
import { loginAdminValidation ,signupAdminValidation  } from "../../utils/Valitation";

const router = Router();

router.get("/", home);
router
  .route("/login")
  .get((req, res) => res.render("login"))
  .post(loginAdminValidation ,login);

router
  .route("/signup")
  .get((req, res) => res.render("signup"))
  .post( signupAdminValidation , signUpAdmin);

router.get("/dashboard", protectRoute("/admin/login"), dashboard);
router.get("/logout", logOut);
router.post("/moderate", moderatePost);

export default router;
