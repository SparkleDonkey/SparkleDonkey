import Route from "../route";

export default Route.extend({

    init: function (app) {
        this._super(app);
        this.get("/test", this.something.bind(this));
        this.get("/test/forbid", this.forbid.bind(this));
        this.get("/test/url", this.url.bind(this));
    },

    something(req, res) {
        return res.json({status: "ok", data: {chuck: "norris", "pika": "chu"}});
    },
    forbid(req, res) {
        return this._super(res);
    },
    url(req, res) {
        return res.json({url: this.getFullUrl(req)});
    }
});