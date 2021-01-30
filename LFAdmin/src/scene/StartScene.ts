
import GameScene from "./GameScene"
import ConfigScene from "./configScene"
import Sprite = Laya.Sprite;

export default class StartScene extends Laya.Scene{
    private startBtn: Laya.Button;
    private confBtn: Laya.Button;
    private backGround: Sprite;
    createChildren(){
        super.createChildren();
        this.loadScene("StartScene.scene");
    }
    showBGImage(){
        // todo 低分辨率图片
        let ape = new Sprite();
        ape.pos(0,0);
        Laya.stage.addChild(ape);
        ape.loadImage("comp/tempBG.jpg");
    }

    hiddenStartScene(){
        this.startBtn.visible = false;
        this.backGround.visible = false;
        this.confBtn.visible = false;
    }

    onAwake(){
        this.startBtn.on(Laya.Event.CLICK,this,()=>{
            const gs = new GameScene();
            Laya.stage.addChild(gs);
            this.hiddenStartScene();
        });
        this.startBtn.on(Laya.Event.CLICK,this,()=>{
            const cs = new ConfigScene();
            Laya.stage.addChild(cs);
            this.hiddenStartScene();
        });
    }
}
