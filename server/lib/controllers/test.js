import Controller from "../controller";

export default Controller.extend({

    init: function (app) {
        this._super.init(app);
        app.get("/test", this.something.bind(this));
    },

    something: function (req, res) {
        return res.json({status: "ok", data: {chuck: "norris", "pika": "chu"}});
    }
});