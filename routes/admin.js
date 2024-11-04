import express from 'express';
import * as controllers from '../controllers/timetable.js';

const router = express.Router();

router.get('/add-training', controllers.getAddTraining);
router.get('/delete-training', controllers.getDeleteTraining);
router.post('/add-training', controllers.postAddTraining);
router.post('/delete-training', controllers.postDeleteTraining);

export default router;