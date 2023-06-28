import { Router } from "express";
import getPosts from "./get-posts";
import storePost from "./store-post";
import loginUser from "./login-user";
import signUpUser from "./signup-user";
import getPost from "./get-post";
import deletePost from "./delete-post";
import catchAll from "./catch-all";
import protectApi from "../../utils/protectApi";
import verify from './verify'
import { ServerPostFromCach , serverPostsFromCach } from "../../controllers/cach";
import { storePostValidation, loginUserValitation, signupUservalidation, jwtValitation } from "../../utils/Valitation";
const router = Router();

router.get("/posts", getPosts);
router
  .route("/post/:postId?")
  .get(getPost)
  .post(protectApi, storePostValidation,storePost)
  .delete(protectApi, deletePost);
router.post("/login",loginUserValitation, loginUser);
router.post("/signup",signupUservalidation, signUpUser);
router.post("/verify",jwtValitation, verify);

router.use(catchAll);

export default router;
