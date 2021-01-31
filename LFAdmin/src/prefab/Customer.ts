import GameScene from "../scene/GameScene";
import Aid from "../script/Aid";

enum Customer_Status{
    Walkin,
    Lining,
    Waiting,
    Leaving
}
export default class Customer extends Laya.Sprite{
    public static CustomerList = [];

    public timeleftlbl:Laya.Label;
    public lostItemsp:Laya.Sprite;
    public timeleft:number;
    private main:GameScene;

    public searchfor:string;

    public status;
    
    constructor(_main:GameScene){
        super();
        this.main = _main;
        this.x = 240;
        let box:Laya.BoxCollider = this.addComponent(Laya.BoxCollider);
        let rb:Laya.RigidBody = this.addComponent(Laya.RigidBody);
        box.width = this.width = 150;
        this.height = 150;
        box.height = 150
        box.x = 0;
        box.y = 0;

        let rdmitem = Math.floor(Math.random() * this.main.loseItems.length);
        this.searchfor = this.main.loseItems[rdmitem];
        
        let searchsprite = this.main.getChildByName(this.searchfor) as Laya.Sprite;
        
        this.main.loseItems = this.main.loseItems.filter(item => item != this.searchfor);

        this.timeleft = 20;
        this.timeleftlbl = new Laya.Label();
        this.lostItemsp = new Laya.Sprite();
        this.lostItemsp.width = 50;
        this.lostItemsp.height = 50;
        this.lostItemsp.texture = searchsprite.texture;
        this.timeleftlbl.text = "patience：" + this.timeleft;
        this.timeleftlbl.y = 0;
        this.timeleftlbl.x = 60;
        this.lostItemsp.y = 0;
        this.addChild(this.timeleftlbl);
        this.addChild(this.lostItemsp);
        this.status = Customer_Status.Walkin

        
        
        Customer.CustomerList.push(this);
    }

    public destroy(){
        Aid.aidItems = Aid.aidItems.filter(item=>item!=this.searchfor);
        super.destroy();
        Customer.CustomerList = Customer.CustomerList.filter(item => item != this);
        
        this.main.updateScore(this.timeleft);
    }

    public onAwake(){
        this.loadImage("comp/customer.png");
        
        this.timer.loop(500,this,()=>{
            this.timeleft -= 1;
            this.timeleftlbl.text = "patience：" + this.timeleft;
            if(this.timeleft <=0){
                this.timer.clearAll(this);
                this.main.updateHP(-1);
                this.main.loseItems.push(this.searchfor);
                this.destroy();
            }
        })
    }
}