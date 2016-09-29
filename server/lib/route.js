import CoreObject from "core-object";

export default CoreObject.extend({

    init(app, root = '/api') {
        this._super();
        this.app = app;
        this.db = app.db;
        this.root = root || '';
    },

    get(route, ...args){
        this.app.get(this.root + route, ...args);
    },

    post(route, ...args){
        this.app.post(this.root + route, ...args);
    },

    put(route, ...args){
        this.app.put(this.root + route, ...args);
    },

    all(route, ...args){
        this.app.all(this.root + route, ...args);
    },

    /**
     * Construct the full url of the request
     * @param req
     * @returns {string}
     */
    getFullUrl(req) {
        return req.protocol + '://' + req.get('host') + req.originalUrl;
    },

    forbid(res) {
        return res.status(403).json({error: "Unauthorized"});
    }

});