import Training from '../models/training.js';

export const getAddTraining = (req, res) => {
    res.render('add-training.ejs', {
        pageTitle: 'Add Training',
        path: '/admin/add-training'
    });
};

export const postAddTraining = (req, res) => {
    const training = new Training(req.body.title, req.body.day, req.body.time, req.body.master);
    training.save();
    res.redirect('/');
};

export const getAllTrainings = (req, res) => {
    res.render('timetable.ejs', {
        pageTitle: 'Timetable',
        path: '/',
        trainings: Training.getAllTrainings()
    });
};

export const getDeleteTraining = (req, res) => {
    const trainings = Training.getAllTrainings(); 
    res.render('delete-training.ejs', {
        pageTitle: 'Delete Training',
        path: '/admin/delete-training',
        trainings: trainings 
    });
};

export const postDeleteTraining = (req, res) => {
    const trainingIndex = req.body.id; 
    Training.deleteTraining(trainingIndex); 
    res.redirect('/admin/delete-training'); 
};

