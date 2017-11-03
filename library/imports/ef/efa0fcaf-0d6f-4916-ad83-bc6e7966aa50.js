"use strict";
cc._RF.push(module, 'efa0fyvDW9JFq2DvG55ZqpQ', 'game');
// scripts/game.js

"use strict";

var floorPositionArray = [];
cc.Class({
    extends: cc.Component,

    properties: {
        areaWidth: 960,
        floorGap: 200,
        //最底下的floor的Y坐标
        bottomFloorY: 0,
        //最底下的floor的X坐标
        bottomFloorX: 0,
        //当前屏幕最底层的floor
        bottomFloor: {
            default: null,
            type: cc.Node
        },
        //层数
        floorCount: 1,
        //所得分数
        score: 0,
        otherFloor: {
            default: null,
            type: cc.Prefab
        },
        initFloor: {
            default: null,
            type: cc.Node
        },
        player: {
            default: null,
            type: cc.Node
        },
        counters: {
            default: null,
            type: cc.Label
        },
        resumeSign: {
            default: null,
            type: cc.Node
        },
        //死亡音效 
        backgroundAudioSource: {
            url: cc.AudioClip,
            default: null
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        //播放背景音乐
        var BGM = cc.audioEngine.play(this.backgroundAudioSource, true, 1);
        //预加载游戏结束场景
        cc.director.preloadScene("gameOver", function () {
            cc.log("gameOver scene preloaded");
        });
        //开启物理系统
        cc.director.getPhysicsManager().enabled = true;
        //开启碰撞系统
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //绑定屏幕点击事件
        this.node.on(cc.Node.EventType.TOUCH_START, this.toggleGame, this);
        //初始化当前最底层的floor坐标
        this.bottomFloorX = this.initFloor.x;
        this.bottomFloorY = this.initFloor.y;
        this.player.getComponent("player").game = this;
        this.player.getComponent("player").BGM = BGM;
        this.createNewFloor();
    },

    createNewFloor: function createNewFloor() {
        while (this.bottomFloorY > this.node.y - this.node.height) {
            var newFloor = cc.instantiate(this.otherFloor);
            this.node.addChild(newFloor);
            newFloor.setSiblingIndex(6);
            newFloor.getComponent("floor").game = this;
            this.setWidth(newFloor);
            newFloor.setPosition(this.setPosition(newFloor));
            //手残党模式
            // this.setWidthSimple(newFloor);
            // newFloor.setPosition(this.setPositionSimple(newFloor));
            this.bottomFloor = newFloor;
            //设置新的floor的tag，用于之后计算得分
            newFloor.tag = this.floorCount;
            this.floorCount++;
        }
    },

    setPosition: function setPosition(newFloor) {
        var floorWidth = newFloor.width,
            minX = -(this.areaWidth / 2) + floorWidth,
            maxX = this.areaWidth / 2 - floorWidth - 20,
            floorX = 0,
            floorY = this.bottomFloorY - (Math.random() + 1.5) * this.floorGap,
            isPositionCError = true,
            index = 0,
            floorArrayLength = floorPositionArray.length;
        if (floorArrayLength > 1) {
            var preSecondIndex = floorPositionArray[floorArrayLength - 2],
                preOneIndex = floorPositionArray[floorArrayLength - 1],
                preIndexes = preOneIndex + preSecondIndex;
            switch (preIndexes) {
                case -3:
                    preOneIndex < preSecondIndex ? cc.randomMinus1To1() >= 0 ? index = 0 : index = 1 : cc.randomMinus1To1() >= 0 ? index = 1 : index = 2;break;
                case -2:
                    cc.randomMinus1To1() >= 0 ? index = 1 : index = 2;break;
                case -1:
                    if (preOneIndex === 0 || preSecondIndex === 0) {
                        cc.randomMinus1To1() >= 0 ? index = 1 : index = 2;
                    } else {
                        index = this.getReversePosition(preOneIndex);
                    }break;
                case 0:
                    index = this.getReversePosition(preOneIndex);break;
                case 1:
                    if (preOneIndex === 0 || preSecondIndex === 0) {
                        cc.randomMinus1To1() >= 0 ? index = -1 : index = -2;
                    } else {
                        index = this.getReversePosition(preOneIndex);
                    }break;
                case 2:
                    cc.randomMinus1To1() >= 0 ? index = -1 : index = -2;break;
                case 3:
                    preOneIndex > preSecondIndex ? cc.randomMinus1To1() >= 0 ? index = 0 : index = -1 : cc.randomMinus1To1() >= 0 ? index = -1 : index = -2;break;
            };
        } else {
            if (floorArrayLength === 0) {
                index = 2;
            } else {
                cc.randomMinus1To1() >= 0 ? index = -1 : index = -2;
            }
        }
        switch (index) {
            case -1:
                floorX = minX;break;
            case -2:
                floorX = minX / 2;break;
            case 0:
                floorX = 0;break;
            case 1:
                floorX = maxX / 2;break;
            case 2:
                floorX = maxX;break;
            default:
                floorX = 0;break;
        };
        floorPositionArray.push(index);
        this.bottomFloorX = floorX;
        this.bottomFloorY = floorY;
        return cc.p(floorX, floorY);
    },

    getReversePosition: function getReversePosition(preOneIndex) {
        var index = 0;
        preOneIndex >= 0 ? cc.randomMinus1To1() >= 0 ? index = -1 : index = -2 : cc.randomMinus1To1() >= 0 ? index = 1 : index = 2;
        return index;
    },

    setWidth: function setWidth(newFloor) {
        //控制floor的随机宽度在initFloor宽度的1到1.5倍
        var floorWidth = this.initFloor.width,
            box = newFloor.getComponent(cc.PhysicsBoxCollider);
        newFloor.width = floorWidth;
        box.size = cc.size(floorWidth - 17, 1);
        box.offset = cc.v2(2, 1);
        box.apply();
    },

    setPositionSimple: function setPositionSimple(newFloor) {
        var floorWidth = newFloor.width,
            floorX = 0,
            floorY = this.bottomFloorY - (Math.random() + 1.5) * this.floorGap;
        this.bottomFloorX >= 0 ? floorX = -floorWidth / 2 : floorX = floorWidth / 2;
        this.bottomFloorX = floorX;
        this.bottomFloorY = floorY;
        return cc.p(floorX, floorY);
    },

    setWidthSimple: function setWidthSimple(newFloor) {
        var floorWidth = this.node.width / 2,
            box = newFloor.getComponent(cc.PhysicsBoxCollider);
        newFloor.width = floorWidth;
        box.size = cc.size(floorWidth, 1);
        box.apply();
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        this.bottomFloorY = this.bottomFloor.y;
        this.createNewFloor();
    },

    setScore: function setScore(_score) {
        this.score = _score;
        this.counters.string = this.score.toString();
    },

    toggleGame: function toggleGame() {
        var _director = cc.director,
            _resumeSign = this.resumeSign;
        if (_director.isPaused()) {
            _director.resume();
            _resumeSign.active = false;
        } else {
            _director.pause();
            _resumeSign.active = true;
        }
    }
});

//通用变量
module.exports = {
    floorArray: floorPositionArray
};

cc._RF.pop();