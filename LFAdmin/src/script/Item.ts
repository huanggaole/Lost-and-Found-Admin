export default class Item extends Laya.Script{
    static selectedItem:Laya.Node;

    public onStart(){
        super.onStart();
        this.owner.on(Laya.Event.MOUSE_DOWN, this, ()=>{Item.selectedItem = this.owner})
    }
}