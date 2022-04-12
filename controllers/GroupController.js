const Group = require('../models/Group')
const GroupContactController = require('../controllers/GroupContactController')

module.exports = class GroupController{
    static createGroup(req, res){
        res.render('groups/addGroup')
    }
    static async createGroupSave(req, res){
        const name = req.body.name
        const description = req.body.description

        await Group.create({name, description})
        res.redirect('groups/')
    }


    static async editGroup(req, res){
        const id = req.params.id
        const group = await Group.findOne({raw: true, where: {id: id}})

        res.render('groups/editGroup', {group})
    }
    static async editGroupPost(req, res){

        const id = req.body.id
        const name = req.body.name
        const description = req.body.description

        const group = {
            id,
            name,
            description
        }

        await Group.update(group, {where: {id: id}})

        res.redirect('groups/')
    }


    static async showGroups(req, res){
        const groups = await GroupContactController.showGroupsContacts()

        res.render('groups/groups', {groups: groups})
    }

    static async showGroup(req, res){
        const id = req.params.id
        const group = await GroupContactController.showGroupContacts(id)

        res.render('groups/group', {group})
    }


    static async deleteGroup(req, res){
        const id = req.body.id

        await Group.destroy({
            where: {id: id}
        })

        res.redirect('groups/')
    }

}