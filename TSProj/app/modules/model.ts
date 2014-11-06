var observable = require("ui/core/observable");

class Model {
    private observable;

    constructor() {
        this.observable = new observable.Observable();
        this.observable.counter = 42;
    }

    get Text(): string {
        return this.Counter + " taps left ";
    }

    get Counter(): number {
        return this.observable.counter;
    }
    
    get Observable(): any {
        return this.observable;
    }

    action(): void {
        this.observable.counter--;
    }
}

module.exports = new Model();
