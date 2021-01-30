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

    public status;
    
    constructor(){
        super();
        this.x = 268;
        let box:Laya.BoxCollider = this.addComponent(Laya.BoxCollider);
        let rb:Laya.RigidBody = this.addComponent(Laya.RigidBody);
        box.width = this.width = 72;
        this.height = 40;
        box.height = 80
        box.x = 0;
        box.y = -40;

        this.timeleft = 20;
        this.timeleftlbl = new Laya.Label();
        this.lostItemsp = new Laya.Sprite();
        this.timeleftlbl.text = "耐心：" + this.timeleft;
        this.timeleftlbl.y = -20;
        this.timeleftlbl.x = 40;
        this.lostItemsp.y = -40;
        this.addChild(this.timeleftlbl);
        this.status = Customer_Status.Walkin

        Customer.CustomerList.push(this);
    }

    public destroy(){
        super.destroy();
        Customer.CustomerList = Customer.CustomerList.filter(item => item != this);
    }

    public onAwake(){
        this.loadImage("comp/customer.png");
        
        this.timer.loop(500,this,()=>{
            this.timeleft -= 1;
            this.timeleftlbl.text = "耐心：" + this.timeleft;
            if(this.timeleft <=0){
                this.timer.clearAll(this);
                this.destroy();
            }
        })
    }
}