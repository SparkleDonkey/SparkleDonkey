import CoreObject from "core-object";

export default CoreObject.extend({

    init(app) {
        this._super.init();
        this.app = app;
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