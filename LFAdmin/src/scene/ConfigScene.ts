import Sprite = Laya.Sprite;

export default class configScene extends Laya.Scene {
    private bgmFlag : Laya.Text;
    private seFlag : Laya.Text;
    private backGround: Sprite;
    createChildren(){
        super.createChildren();
        this.loadScene("ConfigScene.scene");
    }
    showBGImage(){
        // todo 低分辨率图片
        let ape = new Sprite();
        ape.pos(0,0);
        Laya.stage.addChild(ape);
        ape.loadImage("comp/tempBG.jpg");
    }
    onAwake(){
        this.showBGImage();
    }
}
