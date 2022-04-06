const Event = require('../models/Event')
const Contact = require('../models/Contact')
const Event_Contact = require('../models/Event_Contact')

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
            Event_Contact.create({Event_eventId, Contact_contactId})
        })

        res.redirect('/events/events')

    }

    static async showContacts(){

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



}