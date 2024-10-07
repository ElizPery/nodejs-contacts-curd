import { Router } from "express";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";
import * as validationUserSchemas from "../validation/users.js";
import * as authControllers from "../controllers/auth.js";

const authRouter = Router();

authRouter.post('/signup', validateBody(validationUserSchemas.userSignupSchema), ctrlWrapper(authControllers.signupController));
authRouter.get('/get-google-oauth-url', ctrlWrapper(authControllers.getGoogleOAuthUrlController));
authRouter.post('/signin', validateBody(validationUserSchemas.userSigninSchema), ctrlWrapper(authControllers.signinController));
authRouter.post('/refresh', ctrlWrapper(authControllers.refreshController));
authRouter.post('/signout', ctrlWrapper(authControllers.signoutController));
authRouter.post('/send-reset-email', validateBody(validationUserSchemas.requestResetEmailSchema), ctrlWrapper(authControllers.requestResetEmailController));
authRouter.post('/reset-pwd', validateBody(validationUserSchemas.resetPasswordSchema), ctrlWrapper(authControllers.resetPasswordController));


export default authRouter;