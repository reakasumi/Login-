import express from 'express';
import makeExpressCallback from '../utils/expressCallback';
import { usersController } from '../controllers';


const router = express.Router();

const { getUser, getUsers,insertUser } = usersController;

router.get('/',  makeExpressCallback(getUsers));
router.get('/:id', makeExpressCallback(getUser));
router.post('/', makeExpressCallback(insertUser));

export default router;