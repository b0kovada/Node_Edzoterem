import express from 'express'
import * as controllers from '../controllers/training.js'


const router = express.Router()

router.get('/', controllers.getAllTrainings)

export default router
proba