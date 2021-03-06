/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import Aid from "./script/Aid"
import Table from "./script/Table"
import Item from "./script/Item"
/*
* 游戏初始化配置;
*/
export default class GameConfig{
    static width:number=640;
    static height:number=1136;
    static scaleMode:string="fixedwidth";
    static screenMode:string="none";
    static alignV:string="top";
    static alignH:string="left";
    static startScene:any="StartScene.scene";
    static sceneRoot:string="";
    static debug:boolean=false;
    static stat:boolean=false;
    static physicsDebug:boolean=false;
    static exportSceneToJson:boolean=true;
    constructor(){}
    static init(){
        var reg: Function = Laya.ClassUtils.regClass;
        reg("script/Aid.ts",Aid);
        reg("script/Table.ts",Table);
        reg("script/Item.ts",Item);
    }
}
GameConfig.init();