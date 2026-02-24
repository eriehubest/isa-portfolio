export default class Events {
    constructor() {
        this.callbacks = {};
    }

    on(_name, _callback, _order = 0) {
        if (!(this.callbacks[_name] instanceof Array))
            this.callbacks[_name] = [];

        if (!(this.callbacks[_name][_order] instanceof Array))
            this.callbacks[_name][_order] = [];

        this.callbacks[_name][_order].push(_callback);

        return this;
    }

    off(_name, _order) {
        if (typeof _order !== 'undefined' || _order !== '') {
            this.callbacks[_name].splice(_order, 1);
        }
        else {
            delete this.callbacks[_name];
        }
        
        return this;
    }

    trigger(_name, _params = []) {
        for ( const order in this.callbacks[_name] ) {
            for ( const callback of this.callbacks[_name][order] ) {
                callback.apply(this, _params)
            }
        }
    }
}