const express = require('express')
const router = express.Router()
const Contact = require('../models/Contact')


router.get('/add', (req, res)=>{
    res.render('addContact')
})

router.post('/addcontact', async (req, res)=>{
    
    const name = req.body.nome
    const fone = req.body.fone
    const email = req.body.email

    await Contact.create({name, email, fone})
    res.redirect('contacts')

})

// Editar contatos - Precisa de view
router.get('/edit/:id', async(req, res)=>{

    const id = req.params.id
    const contact = await Contact.findOne({raw: true, where: {id: id}})

    res.render('editContact', {contact})

})

router.post('/editcontact', async(req, res)=>{


    const id = req.body.id
    const name = req.body.name
    const fone = req.body.fone
    const email = req.body.email

    const contact = {
        id,
        name,
        fone,
        email
    }

    await Contact.update(contact, {where: {id: id}})

    res.redirect('contacts')

})

// Mostrar contatos - Precisa de view
router.get('/contacts', async(req, res)=>{

    const contacts = await Contact.findAll({raw: true})

    res.render('contacts', {contacts: contacts})
        

})

router.get('/contacts/:id', async(req, res)=>{

    const id = req.params.id
    const contact = await Contact.findOne({raw: true, where: {id: id}})

    res.render('contact', {contact})
})

// Deletar contatos
router.post('/delete', async(req, res)=>{

    const id = req.body.id

    await Contact.destroy({
        where: {id: id}
    })

    res.redirect('contacts')
    
})






/*

// Adicionar contatos - Precisa de view
router.get('/add', (req, res)=>{
    res.render('addContact')
})

router.post('/addcontact', (req, res)=>{
    
    const data = ['nome', 'fone', 'email', req.body.nome, req.body.fone, req.body.email]
    const sql = "INSERT INTO contatos (??, ??, ??) VALUES (?, ?, ?)"

    db.query(sql, data, (err)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('contacts')
        }
    })

})

// Editar contatos - Precisa de view
router.get('/edit/:id', (req, res)=>{

    const data = ['id', req.params.id]
    const sql = "SELECT * FROM contatos where ?? = ?"

    db.query(sql, data, (err, data)=>{
        if(err){
            console.log(err)
            return
        }else{
            const contact = data[0]
            res.render('editContact', {contact})
        }
    })
})

router.post('/editcontact', (req, res)=>{

    const data = ['nome', req.body.nome, 'fone', req.body.fone, 'email', req.body.email, 'id', req.body.id]
    const sql = "UPDATE contatos SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?"

    db.query(sql, data, (err, data)=>{
        if(err){
            console.log(err)
            return
        }else{
            res.redirect('contacts')
        }
    })

})

// Mostrar contatos - Precisa de view
router.get('/contacts', (req, res)=>{

    db.query("SELECT * FROM contatos", (err, data)=>{
        if(err){
            console.log(err)
            return
        }else{
            const contacts = data
            res.render('contacts', {contacts})
        }
    })
})

router.get('/contacts/:id', (req, res)=>{

    const data = ['id', req.params.id]
    const sql = "SELECT * FROM contatos where ?? = ?"

    db.query(sql, data, (err, data)=>{
        if(err){
            console.log(err)
            return
        }else{
            const contact = data[0]
            res.render('contact', {contact})
        }
    })
})

// Deletar contatos
router.get('/delete/:id', (req, res)=>{

    const data = ['id', req.params.id]
    const sql = "DELETE FROM contatos where ?? = ?"

    db.query(sql, data, (err, data)=>{
        if(err){
            console.log(err)
            return
        }else{
            const contact = data[0]
            res.render('contacts')
        }
    })
    
})

*/

module.exports = router