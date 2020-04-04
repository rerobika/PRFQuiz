import Router from 'express';

const router = Router();

router.get('/', (req, res) => {
  req.logout();
});

export default router;
