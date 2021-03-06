
import GameScene from "./GameScene"

export default class StartScene extends Laya.Scene{
    private intro: Laya.Label;
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
        this.intro.text = "这里是某高铁站，春运期间有大量旅客会将物品落在列车上，我们每天都能收到大量来自各个列车的遗失物品。你的任务就是帮助我们，在来领遗失物品的乘客等得不耐烦开始打投诉电话之前，从仓库中把他们遗失的物品找到并及时拿出来还给他们。";
        this.intro.text += "\n\n";
        this.intro.text += "This is a railway station. During the Spring Festival, a large number of passengers will drop their belongings on the train. We can receive a large number of lost belongings from various trains every day. Your task is to help us find the lost items from the warehouse and return them to their owners before they ran out of their patience and start a complaint call.";
    }
}