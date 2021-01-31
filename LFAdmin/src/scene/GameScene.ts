import Item from "../script/Item";
import Customer from "../prefab/Customer";

export default class GameScene extends Laya.Scene{
    private target:Laya.Sprite;

    private ifCanmove:boolean;
    private lastx:number;
    private lasty:number;
    private lasttime;

    private HPvalue:number;
    private Scorevalue:number;

    private HP:Laya.Label;
    private score:Laya.FontClip;

    public loseItems:string[];


    createChildren(){
        super.createChildren();
        this.loadScene("GameScene.scene");
    }

    createCustomer(){
        const cust = new Customer(this);
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

    updateHP(changevalue){
        this.HPvalue += changevalue;
        this.HP.text = "HP: "+this.HPvalue;
        if(this.HPvalue <= 0){
            alert("动作太慢被顾客投诉啦！游戏失败！\nYou are too slow that many customers have complained, you lose the game!");
            // Laya.stage.removeSelf();
            this.timer.clearAll(this);
            this.destroy();
        }
    }

    updateScore(changevalue){
        this.Scorevalue += changevalue;
        this.score.value = this.Scorevalue + "";
    }
    onAwake(){
        this.loseItems = ["bag","cup","plug","handbag","coat","luggage","card","umbrella"];
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

        this.HPvalue = 3;
        this.Scorevalue = 0;
        this.updateHP(0);
        this.updateScore(0);

        // 每100帧有1/10的概率自动生成一个客人
        this.timer.loop(1000,this,()=>{
            if(this.loseItems.length == 0 && Customer.CustomerList.length == 0){
                alert("所有的失物都归还给失主了，真好！\n你本局游戏得分为：" + this.Scorevalue + "\n" +
                    "Well Done! All the lost things have found their owner!\n You got " + this.Scorevalue + " score in this game.");
                this.timer.clearAll(this);
                this.destroy();
            }

            if(this.loseItems.length == 0){
                return;
            }
            if(Customer.CustomerList.length == 0){
                this.createCustomer();
            }else if(Math.random() < 0.1){
                this.createCustomer();
            }
        })
    }
}