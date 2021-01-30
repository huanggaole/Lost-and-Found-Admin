import Item from "./Item";

export default class Aid extends Laya.Script{
    public static aidItems = ["bag","cup","plug","handbag","coat","luggage","card","umbrella"];
    public onTriggerEnter(other:Laya.BoxCollider){
        for(let i = 0; i < Aid.aidItems.length; i++){
            if(other.owner.name == Aid.aidItems[i]){
                Aid.aidItems = Aid.aidItems.filter(item=>item != Aid.aidItems[i]);
                other.owner.destroy();
                Item.selectedItem = null;
                break;
            }
        }
        
    }
}