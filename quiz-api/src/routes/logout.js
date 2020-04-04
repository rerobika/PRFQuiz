import Router from 'express';
import { isAuthenticated } from './auth'

const router = Router();
router.use(isAuthenticated);

router.get('/', (req, res) => {
  req.logout();
});

export default router;
