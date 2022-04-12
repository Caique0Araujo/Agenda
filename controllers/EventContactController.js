const Event = require('../models/Event')
const Contact = require('../models/Contact')
const Event_Contact = require('../models/Event_Contact')
const ValidateService = require('../services/ValidateService')


module.exports = class EventContactController{
    
    static async addContact(req, res) {
        const id = req.params.id
        const event = await Event.findOne({raw: true, where: {id: id}})
        const contacts = await Contact.findAll({raw: true})


        res.render('events_contacts/addContact', {event, contacts})
    }

    static async addContactSave(req, res){

        const contacts = req.body.contact;
        const Event_eventId = req.body.event     
        
        
        Array.prototype.forEach.call(contacts, Contact_contactId => {

            ValidateService.validateObject({Event_eventId, Contact_contactId}, "eventContact").then(result => {
                if(result){
                    return
                }else{
                    Event_Contact.create({Event_eventId, Contact_contactId})
                }
            })
        })

        res.redirect('/events/events')

    }

    static async showEventsContacts(){

        const events = await Event.findAll({
            include: Contact
        })

        if(events){
            const contact = JSON.parse(JSON.stringify(events, null, 2))
            return contact
        }
        else{
            return null
        }

    }

    static async showEventContacts(id){
        const event = await Event.findByPk(id, {
            include: Contact
        })
        if(event){
            const contact = JSON.parse(JSON.stringify(event))
            return contact
        }else{
            return null
        }
    }

    static async editContacts(req, res){
        const id = req.params.id
        const event = await Event.findByPk(id, {
            include: Contact
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
            contacts.forEach(Contact_contactId =>{
                Event_Contact.destroy({where: {Event_eventId: Event_eventId, Contact_contactId: Contact_contactId}})
            })
        }else{
            Event_Contact.destroy({where: {Event_eventId: Event_eventId, Contact_contactId: contacts}})

        }
        res.redirect('/events/events')
    }



}