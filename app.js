class Component {
    /**
     * @type HTMLCanvasElement
     */
    canvas;

    /**
     * @type Component[]
     */
    instances = [];

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get radius() {
        return this._radius;
    }

    get color() {
        return this._color;
    }

    set x(x) {
        this.clear();
        this._x = x;
        this.show();
    }

    set y(y) {
        this.clear();
        this._y = y;
        this.show();
    }

    set width(width) {
        this.clear();
        this._width = width;
        this.show();
    }

    set height(height) {
        this.clear();
        this._height = height;
        this.show();
    }

    set radius(radius) {
        this.clear();
        this._radius = radius;
        this.show();
    }

    set color(color) {
        this.clear();
        this._color = color;
        this.show();
    }

    render(canvas){
        this.canvas = canvas;
        this._x = this._y = this._width = this._height = this._radius = 0;
        this._color = '#000';
        this.created();

        this.show();

        this.mounted();
        for(const instance of this.instances){
            instance.render(this.canvas);
        }
    }
    show(){
        const ctx = this.canvas.getContext("2d");
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    clear(){
        const ctx = this.canvas.getContext("2d");
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }
    created () {}
    mounted () {}
}

class Eye extends Component{
    startPosition;

    constructor (startPosition){
        super();
        this.startPosition = startPosition;
    }

    created(){
        this.x = this.startPosition + 67;
        this.y = 67;
        this.width = 1;
        this.height = 10;
        this.radius = 65;
        this.color = '#FFF';

        const iris = new Iris(this.startPosition);
        this.instances.push(iris);
    }


    show(){
        const ctx = this.canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

}


class Iris extends Component{
    startPosition;
    deafult = 67;

    constructor (startPosition){
        super();
        this.startPosition = startPosition;
    }

    

    created(){
        this.x = this.startPosition + this.deafult + 10;
        this.y =  this.deafult  + 10;
        this.width = 1;
        this.height = 10;
        this.radius = 65 / 2;
        this.color = '#000';
    }

    show(){
        const ctx = this.canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    clear(){
        const ctx = this.canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.radius + 5, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.closePath();
    }
    mounted(){

        document.addEventListener('mousemove', (event) =>{
            const isTop = (window.innerHeight / 2 - 100) >= event.clientY;
            const isBottom = (window.innerHeight / 2 + 100) <= event.clientY;
            const isLeft = (window.innerWidth / 2 - 100) >= event.clientX;
            const isRight= (window.innerWidth / 2 + 100) <= event.clientX;


            if(isTop){
                this.y = this.deafult  - 10;
            }
            else if (isBottom){
                this.y = this.deafult  + 10;
            }
            else{
                this.y = this.deafult;
            }


            if(isLeft){
                this.x = this.startPosition + this.deafult  - 10;
            }
            else if (isRight){
                this.x = this.startPosition + this.deafult  + 10;
            }
            else{
                this.x = this.startPosition + this.deafult;
            }
        });
    }
}



class App{
    /**
     * @type HTMLElement
     */
    rootEl;
    /**
     * @type HTMLElement
     */
    rootElSelector;
    /**
     * @type HTMLCanvasElement
     */
    canvas;

    constructor(selector){
        this.rootElSelector = selector;
        this.rootEl = document.querySelector(selector);
    }

    start(){
        this.canvas = document.createElement('canvas');
        this.canvas.style.width = '100%'
        this.canvas.style.height = '100%'

        this.rootEl.appendChild(this.canvas);


        new Eye(0).render(this.canvas);
        new Eye(150).render(this.canvas);
    }
}



(function(){
    const app = new App('#app');
    app.start();
})()