const User = require("../models/User");
const ValidateService = require("../services/ValidateService");
const EncryptService = require("../services/EncryptService");

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

      req.flash("message", "Cadastro efeituado com sucesso");

      res.redirect("/users/login");
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

    req.flash('message', 'Login efetuado com sucesso') 
        
    req.session.save(()=>{
        res.redirect('/')
    })

  }
  static logout(req, res){
    req.session.destroy()
    res.redirect('/users/login')
  }

  static editPassword(req, res){
    res.render('users/editPassword')
  }

  static config(req, res){
    res.render('users/config')
  }
};
