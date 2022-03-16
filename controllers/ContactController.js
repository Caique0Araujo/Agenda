const Contact = require('../models/Contact')

module.exports = class ContactController{
    static createContact(req, res){
        res.render('contacts/addContact')
    }
    static async createContactSave(req, res){
        const name = req.body.nome
        const fone = req.body.fone
        const email = req.body.email

        await Contact.create({name, email, fone})
        res.redirect('contacts/')
    }


    static async editContact(req, res){
        const id = req.params.id
        const contact = await Contact.findOne({raw: true, where: {id: id}})

        res.render('contacts/editContact', {contact})
    }
    static async editContactPost(req, res){
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

        res.redirect('contacts/')
    }


    static async showContacts(req, res){
        const contacts = await Contact.findAll({raw: true})

        res.render('contacts/contacts', {contacts: contacts})
    }
    static async showContact(req, res){
        const id = req.params.id
        const contact = await Contact.findOne({raw: true, where: {id: id}})

        res.render('contacts/contact', {contact})
    }


    static async deleteContact(req, res){
        const id = req.body.id

        await Contact.destroy({
            where: {id: id}
        })

        res.redirect('contacts/')
    }

}