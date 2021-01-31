import Item from "./Item";
import Customer from "../prefab/Customer";

export default class Aid extends Laya.Script{
    public static aidItems = [];
    public onTriggerEnter(other:Laya.BoxCollider){
        for(let i = 0; i < Aid.aidItems.length; i++){
            if(other.owner.name == Aid.aidItems[i]){
                for(let j = 0; j < Customer.CustomerList.length; j++){
                    if((Customer.CustomerList[j] as Customer).searchfor == other.owner.name){
                        
                        Customer.CustomerList[j].destroy();
                        console.log("after:" + Customer.CustomerList);
                    }
                }

                Aid.aidItems = Aid.aidItems.filter(item=>item != Aid.aidItems[i]);
                
                other.owner.destroy();
                Item.selectedItem = null;
                break;
            }
        }
        
    }
}