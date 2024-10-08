import * as authServices from '../services/auth.js';
import { generateGoogleOAuthUrl } from '../utils/googleOAuth2.js';

const setupSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expire: new Date(Date.now() + session.refreshTokenValidUntil),
    });

    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expire: new Date(Date.now() + session.refreshTokenValidUntil),
    });
};

export const signupController = async (req, res) => {
    const newUser = await authServices.signup(req.body);

    res.status(201).json({
        status: 201,
        message: 'Successfully register user',
        data: newUser,
    });
};

export const signinController = async (req, res) => {
    const userSession = await authServices.signin(req.body);

    setupSession(res, userSession);

    res.json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: {
            accessToken: userSession.accessToken,
        }
    });
};

export const refreshController = async (req, res) => {
    const { refreshToken, sessionId } = req.cookies;
    const session = await authServices.refreshSession({ refreshToken, sessionId });

    setupSession(res, session);

    res.json({
        status: 200,
        message: 'Successfully refreshed a session!',
        data: {
            accessToken: session.accessToken,
        }
    });
};

export const signoutController = async (req, res) => {
    const { sessionId } = req.cookies;

    if (sessionId) {
        await authServices.signout(sessionId);
    }

    res.clearCookie('refreshToken');
    res.clearCookie('sessionId');

    res.status(204).send();
};

export const requestResetEmailController = async (req, res) => {
    const { email } = req.body;
    await authServices.requestResetToken(email);
    res.json({
        status: 200,
        message: 'Reset password email has been successfully sent.',
        data: {}
    });
};

export const resetPasswordController = async (req, res) => { 
    const { password, token } = req.body;
    await authServices.resetPassword(password, token);
    res.json({
        status: 200,
        message: "Password has been successfully reset.",
        data: {}
    });
};

export const getGoogleOAuthUrlController = async (req, res) => {
    const url = generateGoogleOAuthUrl();

    res.json({
        status: 200,
        message: "Successfully create Google Oauth url.",
        data: {
            url,
        }
    });
};

export const loginGoogleAuthController = async (req, res) => {
    const session = await authServices.loginOrSignupWithGoogle(req.body.code);

    setupSession(res, session);
    
    res.json({
        status: 200,
        message: 'Successfully login by Google OAuth!',
        data: {
            accessToken: session.accessToken,
        }
    });
};