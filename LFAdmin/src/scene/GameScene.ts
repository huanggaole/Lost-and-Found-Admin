import Item from "../script/Item";

export default class GameScene extends Laya.Scene{
    private target:Laya.Sprite;

    private ifCanmove:boolean;
    private lastx:number;
    private lasty:number;
    private lasttime;

    createChildren(){
        super.createChildren();
        this.loadScene("GameScene.scene");
    }
    onMouseDown(){
        if(Item.selectedItem != null){
            this.ifCanmove = true;
            this.lastx = Laya.stage.mouseX;
            this.lasty = Laya.stage.mouseY;
        }
    }
    onAwake(){
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
        this.on(
            Laya.Event.MOUSE_UP, this, ()=>{
                this.ifCanmove = false;
                if(Item.selectedItem != null){
                    let rigidbody = Item.selectedItem.getComponent(Laya.RigidBody) as Laya.RigidBody;
                    rigidbody.setVelocity({x:0,y:0})
                }
                Item.selectedItem = null;
            }
        )
    }

}