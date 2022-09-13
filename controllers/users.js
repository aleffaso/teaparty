const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv');
const routes = express.Router();

const User = require('./User');
const adminAuth = require("../middleware/adminAuth"); 

dotenv.config({path: './.env'})

routes.get("/admin/users", adminAuth, (req, res) => {
    renderUsers(res, req.session.token, null, null)
});

routes.get("/admin/user/new", adminAuth, (req, res) => {
    res.render("admin/users/new", {token:req.session.token});
});

routes.post("/users/new", adminAuth, (req,res) => {

    var {name, email, password, passwordCheck} = req.body;

    if(password != passwordCheck){
        renderUsers(res, req.session.token, false, "As senhas devem ser as mesmas")
    };

    User.findOne({where:{email: email}}).then(user => {

        if(user == undefined){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password,salt);

            User.create({
                name: name,
                email: email,
                password: hash
            }).then(() => {
                renderUsers(res, req.session.token, true, "Usuário criado com sucesso")
            }).catch((err) => {
                renderUsers(res, req.session.token, false, err)
            });
        }else{
            renderUsers(res, req.session.token, false, "O usuário já existe")
        }
    })
});

routes.post("/users/delete", adminAuth, (req, res) => {

    var id = req.body.id;

    if(id != undefined){
        if(!isNaN(id)){ //is it a number or not?
            User.destroy({
                where: {id: id}
            }).then(() => {
                renderUsers(res, req.session.token, true, "Usuário deletado com sucesso")
            });
        }else{
            renderUsers(res, req.session.token, false, "Usuário não encontrado")
        }
    }else{
        renderUsers(res, req.session.token, false, "Usuário não encontrado")
    }
});

routes.get("/admin/users/edit/:id", (req,res) => {

    var id = req.params.id;

    if(isNaN(id)){
        renderUsers(res, req.session.token, false, "Usuário não encontrado")
    };

    User.findByPk(id).then(user => { //Search user by its ID
        if(user != undefined){
            res.render("admin/users/edit", {token: req.session.token, user: user});
        }else{
            renderUsers(res, req.session.token, false, "Usuário não encontrado")
        }
    }).catch(err => {
        renderUsers(res, false, err)
    });
});

routes.post("/users/update", (req,res) => {

    var {id, name, email, password, passwordCheck} = req.body;

    if(password != passwordCheck){
        renderUsers(res, false, "As senhas devem ser as mesmas")
    };

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password,salt);

    User.update({name: name, email: email, password: hash},{
        where: {id:id}
    }).then(() => {
        renderUsers(res, req.session.token, true, "Usuário atualizado com sucesso!")
    }).catch(err => {
        renderUsers(res, req.session.token, false, err)
    });
});

routes.get("/login", (req,res) => {
    renderLogin(res, undefined, null, null);
}); 

routes.post("/login", (req, res) => {

    var {email, password} = req.body;

    if(email != undefined) {

        User.findOne({where: {email: email}}).then(user => {

            if(user != undefined){

                if( bcrypt.compareSync(password, user.password)){

                    jwt.sign({id:user.id, email:user.email}, process.env.JWT_TOKEN, {expiresIn:'10h'}, (err, token) =>{
                        if(err){
                            renderLogin(res, undefined, false, err)
                        }else{
                            req.session.token = token
                            res.redirect("/");   
                        }
                    });
                }else{
                    renderLogin(res, undefined, false, "Usuário ou senha incorreto");
                }
            }else{
                renderLogin(res, undefined, false, "Usuário ou senha incorreto");
            }
        });
    }else{
        renderLogin(res, undefined, false, "Usuário ou senha incorreto");
    }
});

routes.get("/logout", (req,res) => {
    req.session.token = undefined;
    renderLogin(res, undefined, true, "Sessão finalizada!");
});

async function renderUsers(res, token, message, title){
    User.findAll().then(users => {
        res.render("admin/users/index", {
            token: token,
            users: users, 
            message: message, 
            title: title
        });
    });
}

async function renderLogin(res, token, message, title){
    res.render("login", {
        token: token,
        message: message, 
        title: title
    });
}

module.exports = routes;
