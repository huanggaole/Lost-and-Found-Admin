import Item from "../script/Item";
import Customer from "../prefab/Customer";

export default class GameScene extends Laya.Scene{
    private target:Laya.Sprite;

    private ifCanmove:boolean;
    private lastx:number;
    private lasty:number;
    private lasttime;

    private customerline:Customer[];

    createChildren(){
        super.createChildren();
        this.loadScene("GameScene.scene");
    }

    createCustomer(){
        const cust = new Customer();
        this.customerline.push(cust);
        this.addChild(cust);
    }


    onMouseDown(){
        if(Item.selectedItem != null){
            this.ifCanmove = true;
            this.lastx = Laya.stage.mouseX;
            this.lasty = Laya.stage.mouseY;
        }
    }
    onMouseUp(){
        this.ifCanmove = false;
        if(Item.selectedItem != null){
            let rigidbody = Item.selectedItem.getComponent(Laya.RigidBody) as Laya.RigidBody;
            rigidbody.setVelocity({x:0,y:0})
        }
        Item.selectedItem = null;
    }
    onAwake(){
        this.customerline = [];
        this.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        
        this.on(
            Laya.Event.MOUSE_MOVE, this, ()=>{
                if(this.ifCanmove){
                    if(Item.selectedItem != null){
                        let dx = Laya.stage.mouseX - this.lastx;
                        let dy = Laya.stage.mouseY - this.lasty;
                        this.lastx = Laya.stage.mouseX;
                        this.lasty = Laya.stage.mouseY;
                        let rigidbody = Item.selectedItem.getComponent(Laya.RigidBody) as Laya.RigidBody;
                        rigidbody.setVelocity({x:dx,y:dy})
                    }
                }
            }
        )
        this.on(Laya.Event.MOUSE_UP, this, this.onMouseUp)
        this.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp)

        // 每100帧有1/10的概率自动生成一个客人
        this.timer.loop(1000,this,()=>{
            console.log(Customer.CustomerList);
            if(Customer.CustomerList.length == 0){
                this.createCustomer();
            }else if(Math.random() < 0.1){
                this.createCustomer();
            }
        })
    }
}