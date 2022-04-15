const Group = require('../models/Group')
const Contact = require('../models/Contact')
const Group_Contact = require('../models/Group_Contact')
const ValidateService = require('../services/ValidateService')

module.exports = class GroupContactController{
    
    static async addContact(req, res) {
        const id = req.params.id
        const group = await Group.findOne({raw: true, where: {id: id}})
        const contacts = await Contact.findAll({raw: true})

        res.render('Groups_contacts/addContact', {group, contacts})
    }

    static async addContactSave(req, res){

        const contacts = req.body.contact;
        const Group_groupId = req.body.group

        
        Array.prototype.forEach.call(contacts, Contact_contactId => {

        ValidateService.validateObject({Group_groupId, Contact_contactId}, "groupContact").then(result => {
            if(result){
                return
            }else{
                Group_Contact.create({Group_groupId, Contact_contactId})
            }
        })

        
            
        })

        res.redirect('/groups/groups')

    }

    static async showGroupsContacts(id){

        const groups = await Group.findAll({
            include: Contact,
            where: {
                UserId: id
            }
        })

        if(groups){
            const contact = JSON.parse(JSON.stringify(groups, null, 2))
            return contact
        }
        else{
            return null
        }

    }

    static async showGroupContacts(id){
        const group = await Group.findByPk(id, {
            include: Contact
        })
        if(group){
            const contact = JSON.parse(JSON.stringify(group))
            return contact
        }else{
            return null
        }
    }

    static async editContacts(req, res){
        const id = req.params.id
        const group = await Group.findByPk(id, {
            include: Contact
        })
        if(group){
            const groups = JSON.parse(JSON.stringify(group))
            res.render('groups_contacts/editContacts', {groups: groups})
        }else{
            res.render('groups_contacts/editContacts')
        }

    }

    static async removeContact(req, res){
        const Group_groupId = req.body.idGroup
        const contacts = req.body.contacts

        if(Array.isArray(contacts)){
            contacts.forEach(Contact_contactId =>{
                Group_Contact.destroy({where: {Group_groupId: Group_groupId, Contact_contactId: Contact_contactId}})
            })
        }else{
            Group_Contact.destroy({where: {Group_groupId: Group_groupId, Contact_contactId: contacts}})

        }
        res.redirect('/groups/groups')
    }



}