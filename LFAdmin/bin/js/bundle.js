(function () {
    'use strict';

    class Item extends Laya.Script {
        onStart() {
            super.onStart();
            this.owner.on(Laya.Event.MOUSE_DOWN, this, () => { Item.selectedItem = this.owner; });
        }
    }

    class GameScene extends Laya.Scene {
        createChildren() {
            super.createChildren();
            this.loadScene("GameScene.scene");
        }
        onMouseDown() {
            if (Item.selectedItem != null) {
                this.ifCanmove = true;
                this.lastx = Laya.stage.mouseX;
                this.lasty = Laya.stage.mouseY;
            }
        }
        onAwake() {
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
            this.on(Laya.Event.MOUSE_UP, this, () => {
                this.ifCanmove = false;
                if (Item.selectedItem != null) {
                    let rigidbody = Item.selectedItem.getComponent(Laya.RigidBody);
                    rigidbody.setVelocity({ x: 0, y: 0 });
                }
                Item.selectedItem = null;
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
                }
            }
        }
    }
    Aid.aidItems = ["s1"];

    class Customer extends Laya.Script {
        onStart() {
            super.onStart();
        }
        onAwake() {
            super.onAwake();
            console.log(this.owner);
            console.log(this.owner.getChildByName("timleft"));
            this.timeleft = this.owner.getChildByName("timleft");
            this.lostItem = this.owner.getChildByName("lostItem");
            this.timeleft.text = "耐心：90";
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("scene/StartScene.ts", StartScene);
            reg("scene/GameScene.ts", GameScene);
            reg("script/Aid.ts", Aid);
            reg("script/Item.ts", Item);
            reg("script/Customer.ts", Customer);
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
    GameConfig.physicsDebug = true;
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
