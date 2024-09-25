import * as authServices from '../services/auth.js';

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