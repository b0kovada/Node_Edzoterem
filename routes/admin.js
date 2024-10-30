import express from 'express'
import * as controllers from '../controllers/timetable.js'

const router = express.Router()

router.get('/add-training', controllers.getAddTraining)

router.post('/add-training', controllers.postAddTraining)

export default router