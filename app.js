import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'

import adminRoutes from './routes/admin.js'
import timetableRoutes from './routes/training.js'
import __dirname from './util/rootpath.js'

const app = express()
const PORT = 3000
//const router = express.Router();

app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', timetableRoutes) //!!
app.use('/admin', adminRoutes) //!!

app.use((req, res) => {
    res.status(404).render('404.ejs', {
        pageTitle: 'Page Not Found',
        path: ''
    })
})

app.listen(PORT, () => console.log(`server runs on port: http://localhost:${PORT}`))