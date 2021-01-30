
import GameScene from "./GameScene"

export default class StartScene extends Laya.Scene{
    private startBtn: Laya.Button;
    createChildren(){
        super.createChildren();
        this.loadScene("StartScene.scene");
    }
    onAwake(){
        this.startBtn.on(Laya.Event.CLICK,this,()=>{
            const gs = new GameScene();
            Laya.stage.addChild(gs);
        });
    }
}