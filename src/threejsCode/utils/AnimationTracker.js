export default class AnimationTracker {
    static getInstance() {
        if (!AnimationTracker.instance) {
            new AnimationTracker();
        }

        return AnimationTracker.instance;
    }

    constructor() {
        AnimationTracker.instance = this;

        this.animationEvents = {};
    }

    addEvent(_name) {
        if (typeof this.animationEvents[_name] === 'undefined')
            this.animationEvents[_name] = 0;

        return this
    }

    updateEvent(_name, _progress) {
        if (typeof this.animationEvents[_name] === 'undefined')
            this.addEvent(_name);

        this.animationEvents[_name] = _progress;

        return this;
    }
}