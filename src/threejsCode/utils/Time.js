import Events from "./Events";


export default class Time
{
    constructor()
    {
        this.events = new Events();

        this.startTime = Date.now();
        this.currenTime = this.startTime;
        this.deltaMax = 60;

        this.tick = this.tick.bind(this);
        this.tick();
    }

    tick()
    {
        requestAnimationFrame(this.tick);

        const previousTime = this.currenTime;
        this.currenTime = Date.now();

        this.delta = Math.min(this.deltaMax, this.currenTime - previousTime);

        this.events.trigger('tick');
    }
}