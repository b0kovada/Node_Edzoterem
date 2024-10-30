import Training from '../models/traning.js'


export const getAddTraining = (req, res) => {
    res.render('add-training.ejs', {
        pageTitle: 'Add Training',
        path: '/admin/add-training'
    })
}

export const postAddTraining = (req, res) => {
    const training = new Training(req.body.title)
    training.save()
    res.redirect('/')
}

export const getAllTrainings = (req, res) => {
    res.render('timetable.ejs', {
        pageTitle: 'Timetable',
        path: '/',
        trainings: Training.getAllTrainings()
    })
}