import express from 'express';
import makeExpressCallback from '../utils/expressCallback';
import { authController } from '../controllers';

const router = express.Router();

const { login } = authController;

router.post('/login', makeExpressCallback(login));

export default router;