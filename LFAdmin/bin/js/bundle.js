(function () {
    'use strict';

    class Item extends Laya.Script {
        onStart() {
            super.onStart();
            this.owner.on(Laya.Event.MOUSE_DOWN, this, () => { Item.selectedItem = this.owner; });
        }
    }

    var Customer_Status;
    (function (Customer_Status) {
        Customer_Status[Customer_Status["Walkin"] = 0] = "Walkin";
        Customer_Status[Customer_Status["Lining"] = 1] = "Lining";
        Customer_Status[Customer_Status["Waiting"] = 2] = "Waiting";
        Customer_Status[Customer_Status["Leaving"] = 3] = "Leaving";
    })(Customer_Status || (Customer_Status = {}));
    class Customer extends Laya.Sprite {
        constructor() {
            super();
            this.x = 268;
            let box = this.addComponent(Laya.BoxCollider);
            let rb = this.addComponent(Laya.RigidBody);
            box.width = this.width = 72;
            this.height = 40;
            box.height = 80;
            box.x = 0;
            box.y = -40;
            this.timeleft = 20;
            this.timeleftlbl = new Laya.Label();
            this.lostItemsp = new Laya.Sprite();
            this.timeleftlbl.text = "耐心：" + this.timeleft;
            this.timeleftlbl.y = -20;
            this.timeleftlbl.x = 40;
            this.lostItemsp.y = -40;
            this.addChild(this.timeleftlbl);
            this.status = Customer_Status.Walkin;
            Customer.CustomerList.push(this);
        }
        destroy() {
            super.destroy();
            Customer.CustomerList = Customer.CustomerList.filter(item => item != this);
        }
        onAwake() {
            this.loadImage("comp/customer.png");
            this.timer.loop(500, this, () => {
                this.timeleft -= 1;
                this.timeleftlbl.text = "耐心：" + this.timeleft;
                if (this.timeleft <= 0) {
                    this.timer.clearAll(this);
                    this.destroy();
                }
            });
        }
    }
    Customer.CustomerList = [];

    class GameScene extends Laya.Scene {
        createChildren() {
            super.createChildren();
            this.loadScene("GameScene.scene");
        }
        createCustomer() {
            const cust = new Customer();
            this.customerline.push(cust);
            this.addChild(cust);
        }
        onMouseDown() {
            if (Item.selectedItem != null) {
                this.ifCanmove = true;
                this.lastx = Laya.stage.mouseX;
                this.lasty = Laya.stage.mouseY;
            }
        }
        onMouseUp() {
            this.ifCanmove = false;
            if (Item.selectedItem != null) {
                let rigidbody = Item.selectedItem.getComponent(Laya.RigidBody);
                rigidbody.setVelocity({ x: 0, y: 0 });
            }
            Item.selectedItem = null;
        }
        onAwake() {
            this.customerline = [];
            this.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            this.on(Laya.Event.MOUSE_MOVE, this, () => {
                if (this.ifCanmove) {
                    if (Item.selectedItem != null) {
                        let dx = Laya.stage.mouseX - this.lastx;
                        let dy = Laya.stage.mouseY - this.lasty;
                        this.lastx = Laya.stage.mouseX;
                        this.lasty = Laya.stage.mouseY;
                        let rigidbody = Item.selectedItem.getComponent(Laya.RigidBody);
                        rigidbody.setVelocity({ x: dx, y: dy });
                    }
                }
            });
            this.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            this.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
            this.timer.loop(1000, this, () => {
                console.log(Customer.CustomerList);
                if (Customer.CustomerList.length == 0) {
                    this.createCustomer();
                }
                else if (Math.random() < 0.1) {
                    this.createCustomer();
                }
            });
        }
    }

    class StartScene extends Laya.Scene {
        createChildren() {
            super.createChildren();
            this.loadScene("StartScene.scene");
        }
        onAwake() {
            this.startBtn.on(Laya.Event.CLICK, this, () => {
                const gs = new GameScene();
                Laya.stage.addChild(gs);
            });
        }
    }

    class Aid extends Laya.Script {
        onTriggerEnter(other) {
            for (let i = 0; i < Aid.aidItems.length; i++) {
                if (other.owner.name == Aid.aidItems[i]) {
                    Aid.aidItems = Aid.aidItems.filter(item => item != Aid.aidItems[i]);
                    other.owner.destroy();
                    Item.selectedItem = null;
                    break;
                }
            }
        }
    }
    Aid.aidItems = ["bag", "cup", "plug", "handbag", "coat", "luggage", "card", "umbrella"];

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("scene/StartScene.ts", StartScene);
            reg("scene/GameScene.ts", GameScene);
            reg("script/Aid.ts", Aid);
            reg("script/Item.ts", Item);
            reg("prefab/Customer.ts", Customer);
        }
    }
    GameConfig.width = 1136;
    GameConfig.height = 640;
    GameConfig.scaleMode = "showall";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "GameScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            const ss = new StartScene();
            Laya.stage.addChild(ss);
        }
    }
    new Main();

}());
