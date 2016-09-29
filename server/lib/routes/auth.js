import Route from "../route";
import joi from "joi";
import validate from "validate-express";


let validation = {
    login: {
        body: {
            username: joi.string().required(),
            password: joi.string().required()
        }
    },
    register: {
        body: {
            username: joi.string().required().min(5).max(32),
            password: joi.string().required().min(5).max(32),
            email: joi.string().email(),
            name: joi.string().max(128),
            lang: joi.string().max(20),
            phone_primary: joi.string().max(20),
            location: joi.string().max(128)
        }
    }
};


export default Route.extend({

    init: function (app) {
        this._super(app);
        this.post("/register", validate(validation.register, {stripUnknown: true}), this.register.bind(this));
        this.post("/login", validate(validation.login), this.login.bind(this));
        this.all("/logout", this.logout.bind(this));
    },

    register(req, res) {
        // TODO
        return res.status(201).json({data: req.body});
    },

    login(req, res) {
        // TODO
        req.session.uid = '1';
        return res.status(200).json({data: req.body});
    },

    logout(req, res) {
        // TODO destroy the session?
        delete req.session.uid;
        return res.status(200).end();
    }

});