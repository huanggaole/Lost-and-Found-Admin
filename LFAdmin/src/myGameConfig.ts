import StartScene from "./scene/StartScene";
import GameScene from "./scene/GameScene";
import Aid from "./script/Aid";
import Item from "./script/Item";
import Customer from "./prefab/Customer";
import Table from "./script/Table";

/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */

/*
* 游戏初始化配置;
*/
export default class GameConfig{
    static width:number=1136;
    static height:number=640;
    static scaleMode:string="showall";
    static screenMode:string="none";
    static alignV:string="top";
    static alignH:string="left";
    static startScene:any="GameScene.scene";
    static sceneRoot:string="";
    static debug:boolean=false;
    static stat:boolean=false;
    static physicsDebug:boolean=false;
    static exportSceneToJson:boolean=true;
    constructor(){}
    static init(){
        var reg: Function = Laya.ClassUtils.regClass;
        reg("scene/StartScene.ts", StartScene);
        reg("scene/GameScene.ts", GameScene);
        reg("script/Aid.ts",Aid);
        reg("script/Table.ts",Table);        
        reg("script/Item.ts",Item);
        reg("prefab/Customer.ts",Customer);
    }
}
GameConfig.init();