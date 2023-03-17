import { Router } from 'express';
import { isAuthenticated } from './../../utils/middlewares';

const router = Router();

router.get('/', isAuthenticated, (req, res) => {
    console.log('Success');
    res.sendStatus(200);
});

export default router;
