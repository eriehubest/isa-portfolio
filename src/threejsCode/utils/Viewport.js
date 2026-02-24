import Events from "./Events";


export default class Viewport
{
    constructor()
    {
        this.canvas = document.querySelector('.canvas')
        this.events = new Events();

        this.measure();  
        this.resize(); 
    }

    measure()
    {
        const measureElement = this.canvas.getBoundingClientRect();
        this.width = measureElement.width;
        this.height = measureElement.height;
        this.ratio = this.width / this.height
    }

    resize()
    {
        addEventListener('resize', ()=>{
            this.measure();

            this.events.trigger('resize');
        })
    }
}