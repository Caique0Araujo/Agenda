const express = require('express')
const exphbs = require('express-handlebars')

const contactRoutes = require('./routes/contactRoutes')
const groupRoutes = require('./routes/groupRoutes')
const eventRoutes = require('./routes/eventRoutes')

const conn = require('./db/conn')

const Contact = require('./models/Contact')



const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use('/contacts', contactRoutes)
app.use('/groups', groupRoutes)
app.use('/events', eventRoutes)

app.get('/', async (req, res)=>{
    const contacts = await Contact.findAll({raw: true})

    res.render('home', {contacts: contacts})
})

conn.sync().then(()=>{
    app.listen(3000)
}).catch((err)=>{
    console.log(err)
})
