import fs from 'fs';
import path from 'path';
import __dirname from '../util/rootpath.js';

const FILE_PATH = path.join(__dirname, 'data', 'timetable.json');

const getFileContent = () => {
    let content = [];
    try {
        content = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
    } catch (err) {
        console.log(`File reading error: ${err}`);
    }
    return content;
};

const setFileContent = (content) => {
    try {
        fs.writeFileSync(FILE_PATH, JSON.stringify(content));
    } catch (err) {
        console.log(`File writing error: ${err}`);
    }
};

class Training {
    constructor(title, day, time, master) {
        this.title = title;
        this.day = day;
        this.time = time;
        this.master = master;
    }

    save() {
        const trainings = getFileContent();
        trainings.push(this);
        setFileContent(trainings);
    }

    static getAllTrainings() {
        return getFileContent();
    }

    static deleteTraining(index) {
        const trainings = getFileContent();
        if (index >= 0 && index < trainings.length) {
            trainings.splice(index, 1);
            setFileContent(trainings); 
        }
    }
}

export default Training;
