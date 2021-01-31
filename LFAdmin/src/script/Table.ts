import Aid from "./Aid";
import Customer from "../prefab/Customer";

export default class Table extends Laya.Script{
    public onTriggerEnter(other:Laya.BoxCollider){
        Aid.aidItems.push((other.owner as Customer).searchfor);
        console.log(Aid.aidItems);
    }
}