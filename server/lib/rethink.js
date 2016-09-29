import CoreObject from "core-object";
import rdb from "rethinkdb";

export default CoreObject.extend({

    init(conn){
        this._super();
        this.conn = conn;
    },

    findAll(tableName){
        return rdb.table(tableName).run(this.conn)
            .then(function (cursor) {
                return cursor.toArray();
            });
    }
});
