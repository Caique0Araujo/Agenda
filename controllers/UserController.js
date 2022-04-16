const User = require("../models/User");
const ValidateService = require("../services/ValidateService");
const EncryptService = require("../services/EncryptService");
const session = require("express-session");

module.exports = class UserController {
  static login(req, res) {
    res.render("users/login");
  }
  static register(req, res) {
    res.render("users/register");
  }
  static async registerSave(req, res) {
    const { name, fone, email, password, confirmPassord } = req.body;

    if (ValidateService.validatePassword(password, confirmPassord)) {
      req.flash("message", "Senhas diferentes, tente novamente!");
      res.render("users/register");
      return;
    }

    if (await ValidateService.validateEmail(email)) {
      req.flash("message", "Email já cadastrado!");
      res.render("users/register");
      return;
    }

    const user = {
      name: name,
      fone: fone,
      email: email,
      password: EncryptService.encrypt(password),
    };

    try {
      await User.create(user);
      req.flash("message", "Cadastro efeituado com sucesso!");
      res.render("users/login");

    } catch (error) {
      console.log(error);
    }
  }
  static async loginSave(req, res) {
    const {email, password} = req.body

    const user = await User.findOne({where: {email: email}})

    if (!user) {
        req.flash("message", "Usuário não encontrado!");
        res.render("users/login");
        return;
      }
    if (EncryptService.decrypt(password, user.password)){
        req.flash('message', 'Senha incorreta! ')
        res.render('users/login')
        return
    }

    req.session.userid = user.id  
    req.session.name = user.name 

    req.flash('message', 'Login efetuado com sucesso!') 
        
    req.session.save(()=>{
        res.redirect('/')
    })

  }
  static logout(req, res){
    req.session.destroy((err) => {
      res.redirect('/users/login')
    })
  }

  static editPassword(req, res){
    res.render('users/editPassword')
  }

  static async editPasswordSave(req, res){
    const id = req.session.userid
    const user = {
      name: req.body.name,
      fone: req.body.fone,
      email: req.body.email
    }

    try {
      await User.update(user, {where: {id: id}})
      req.flash("message", "Informações alteradas com sucesso!");
      req.session.save(()=>{
        res.redirect('/users/config')
    })
      
    } catch (error) {
      console.log(error)
    }

  }

  static async config(req, res){

    const UserId = req.session.userid

    try {
      const user = await User.findOne({where: {id: UserId}, raw: true})
      res.render('users/config', {user})

      
    } catch (error) {
      console.log(error)
    }

  }

  static async configSave(req,res){

    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword
    const confirmPassord = req.body.confirmPassword
    const id = req.session.userid

    const user = await User.findOne({where: {id: id}, raw: true})

    if (EncryptService.decrypt(oldPassword, user.password)){
      req.flash('message', 'Senha incorreta! ')
      res.render('users/editPassword')

    }else{
      if (ValidateService.validatePassword(newPassword, confirmPassord)) {
        req.flash("message", "Senhas diferentes, tente novamente!");
        res.render('users/editPassword')
  
      }else{
        user.password = EncryptService.encrypt(newPassword)
        await User.update(user, {where: {id: id}})
        req.flash("message", "Senha alterada com sucesso!");
        req.session.save(()=>{
          res.redirect('/users/config')
      })
      }
    }
  }
};
