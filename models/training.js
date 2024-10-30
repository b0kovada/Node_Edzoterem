import fs from 'fs'
import path from 'path'
import __dirname from '../util/rootpath.js'

const FILE_PATH = path.join(__dirname, 'data', 'timetable.json')

const getFileConent = () => {
    let content = []
    try{
        content = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'))
    }catch(err){
        console.log(`File reading error: ${err}`)
    }
    return content
}

const setFileConent = (content) => {
    try{
        fs.writeFileSync(FILE_PATH, JSON.stringify(content))
    }catch(err){
        console.log(`File reading error: ${err}`)
    }
}

class Training {
    constructor(title, time, master){
        this.title = title,
        this. time = time,
        this.master = master
    }

    save(){
        const trainings = getFileConent()
        trainings.push(this)
        setFileConent(trainings)
    }

    static getAllTrainings(){
        return getFileConent()
    }
}

export default Training