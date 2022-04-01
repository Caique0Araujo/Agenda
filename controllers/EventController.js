const Event = require('../models/Event')
const {DateTime} = require('luxon')
const DateService = require('../models/DateService')

module.exports = class EventController{
    static createEvent(req, res){
        res.render('events/addEvent')
    }
    static async createEventSave(req, res){
        const name = req.body.name
        const description = req.body.description
        const eventDate = req.body.date


        await Event.create({name, description, eventDate})
        res.redirect('events/') 
    }


    static async editEvent(req, res){
        const id = req.params.id
        const event = await Event.findOne({raw: true, where: {id: id}})
        
        res.render('events/editEvent', {event})
    }
    static async editEventPost(req, res){

        const id = req.body.id
        const name = req.body.name
        const description = req.body.description

        const event = {
            id,
            name,
            description
        }

        await Event.update(event, {where: {id:id}})

        res.redirect('events/')
    }


    static async showEvents(req, res){

        const events = await Event.findAll({raw: true})    
        
        events.forEach(event => {
            event.eventDate = DateService.formatDate(event.eventDate)
        });
        
        res.render('events/events', {events: events})
    }
    static async showEvent(req, res){
        const id = req.params.id
        const event = await Event.findOne({raw: true, where: {id: id}})
        event.eventDate = DateService.formatDate(event.eventDate) 

        
        res.render('events/event', {event})
    }


    static async deleteEvent(req, res){
        const id = req.body.id

        await Event.destroy({
            where: {id: id}
        })

        res.redirect('events/')
    }
}