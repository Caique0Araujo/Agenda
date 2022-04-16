const UserController = require("../controllers/UserController")
const User = require("../models/User")

module.exports.checkAuth = async function(req, res, next) {

    const userid = req.session.userid

    if(!userid){
        req.flash('message', "Faça login para continuar")
        res.render('users/login')
        return
    }

    const user = await User.findOne({where: {id: userid}})


    if(!user){
        req.flash('message', "Faça login para continuar")
        res.redirect('/users/logout')
        return

    }

    next()
}