import Route from "../route";

export default Route.extend({

    init: function (app) {
        this._super(app);
        this.get("/users", this.users.bind(this));
    },

    users(req, res, next) {
        this.db.findAll('users').then(users => res.json(users), err => next(err));
    }

});