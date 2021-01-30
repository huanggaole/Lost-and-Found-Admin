export default class Customer extends Laya.Sprite{
    public timeleftlbl:Laya.Label;
    public lostItemsp:Laya.Sprite;
    public timeleft:number;
    
    constructor(){
        super();
        this.timeleft = 100;
        this.timeleftlbl = new Laya.Label();
        this.lostItemsp = new Laya.Sprite();
    }

    public onAwake(){
        
    }
}