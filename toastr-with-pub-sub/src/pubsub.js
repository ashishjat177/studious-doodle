class Pubsub {
    constructor() {
        this.events = new Map();
    }

    publish(name, data) {
        if(this.events.has(name)) {
            this.events.get(name).forEach(cb => cb(data));
        }
    }

    subscribe(name, cb) {
        if(!this.events.has(name)) {
            this.events.set(name, []);
        }
        this.events.get(name).push(cb);

        return  () => {
             const updated =  this.events.get(name).filter((item) => item !== cb);
            if(updated.length) {
                this.events.set(name, updated);
            } else {
                this.events.delete(name);
            }
        }
    }
}

export const pubSub = new Pubsub();