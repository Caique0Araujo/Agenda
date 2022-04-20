const Event = require('../models/Event')
const Contact = require('../models/Contact')
const Event_Contact = require('../models/Event_Contact')
const ValidateService = require('../services/ValidateService')


module.exports = class EventContactController{


    // ADD
    

    static async addContact(req, res) {
        
        const id = req.params.id
        const userid = req.session.userid
        const event = await Event.findOne({raw: true, where: {id: id, UserId: userid}})
        const contacts = await Contact.findAll({raw: true, where: {UserId: userid}})


        res.render('events_contacts/addContact', {event, contacts})
    }

    static async addContactSave(req, res){

        const contacts = req.body.contact;
        const Event_eventId = req.body.event   
        const UserId = req.session.userid  
        if(Array.isArray(contacts)){

            contacts.forEach(async function (Contact_contactId){

                if(await ValidateService.validateObject({Event_eventId, Contact_contactId}, "eventContact")){
                    return
                }else{
                    console.log({Event_eventId, Contact_contactId, UserId})
                    await Event_Contact.create({Event_eventId, Contact_contactId, UserId})
                }
            })
        }else{
            if(await ValidateService.validateObject({Event_eventId, Contact_contactId: contacts}, "eventContact")){
                return
            }else{
                await Event_Contact.create({Event_eventId, Contact_contactId: contacts, UserId})
            }
        }
        req.session.save(()=>{
            res.redirect('/events/events')
        })
        

    }


    // SHOW


    static async showEventsContacts(userid){

        const events = await Event.findAll({
            include: Contact,
            where: {
                UserId: userid
            }
        })

        if(events){
            const contact = JSON.parse(JSON.stringify(events, null, 2))
            return contact
        }
        else{
            return null
        }

    }

    static async showEventContacts(id, userid){

        const event = await Event.findByPk(id, {
            include: Contact,
            where: {
                UserId: userid
            }
        })
        if(event){
            const contact = JSON.parse(JSON.stringify(event))
            return contact
        }else{
            return null
        }
    }


    // DELETE


    static async editContacts(req, res){
        const id = req.params.id
        const userid = req.session.userid
        const event = await Event.findByPk(id, {
            include: Contact,
            where: {
                UserId: userid
            }
        })
        if(event){
            const events = JSON.parse(JSON.stringify(event))
            res.render('events_contacts/editContacts', {events: events})
        }else{
            res.render('events_contacts/editContacts')
        }

    }

    static async removeContact(req, res){
        const Event_eventId = req.body.idEvent
        const contacts = req.body.contacts

        if(Array.isArray(contacts)){
            contacts.forEach(async Contact_contactId =>{
                await Event_Contact.destroy({where: {Event_eventId: Event_eventId, Contact_contactId: Contact_contactId}})
            })
        req.flash('message', 'Contatos removidos com sucesso!')

        }else{
            await Event_Contact.destroy({where: {Event_eventId: Event_eventId, Contact_contactId: contacts}})
            req.flash('message', 'Contato removido com sucesso!')

        }
        req.session.save(()=>{
            res.redirect('/events/events')
        })
    }



}