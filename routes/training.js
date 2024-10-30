import express from 'express'
import * as controllers from '../controllers/timetable.js'


const router = express.Router()

router.get('/', controllers.getAllTrainings)

export default router