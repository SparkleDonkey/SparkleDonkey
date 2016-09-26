import Ember from "ember";

const {Controller, inject} = Ember;

export default Controller.extend({

    paperSidenav: inject.service(),

    actions: {
        transitionTo(){
            this.get('paperSidenav').close();
            this.transitionToRoute(...Array.prototype.slice.call(arguments, 0, -1).filter(x => x));
        }
    }
});
