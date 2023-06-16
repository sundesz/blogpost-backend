import { NextFunction, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import { CredentialType } from '../../types';
import { getUser } from '../../middleware/helper';
import { ISessionData } from '../../types/session';
import { userMessage } from '../../utils/userMessages';

/**
 * Login request handler
 */
const handleLogin: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const { username, password } = req.body as CredentialType;

    if (!username || !password) {
      return res.status(400).json(userMessage.warning.REQUIRED_USER_PASS);
    }

    const user = await getUser(username);
    if (!user) {
      return res.status(401).json(userMessage.error.INVALID_USER_PASS);
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      return res.status(401).json(userMessage.error.INVALID_USER_PASS);
    }

    const userData: ISessionData = {
      userId: user.userId,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    req.session.isAuth = true;
    req.session.data = userData;
    res.status(200).json(userData);
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Logout handler
 */
const handleLogout: RequestHandler = (req, res, next: NextFunction) => {
  try {
    req.session.destroy((err) => {
      if (err) next(err);
      res.clearCookie('sid').status(204).end();
    });
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Check if user is authenticated or not
 */
const isSessionAuthenticated: RequestHandler = (
  req,
  res,
  next: NextFunction
) => {
  try {
    if (req.session.isAuth) {
      res.status(200).json({ status: true, data: req.session.data });
    } else {
      res.status(200).json({ status: false });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  handleLogin,
  handleLogout,
  isSessionAuthenticated,
};
