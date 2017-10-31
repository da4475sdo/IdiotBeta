"use strict";
cc._RF.push(module, 'd00f9JwtYlFD4fK42Es2sYv', 'floor');
// scripts/floor.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        xFloorPosition: 0,
        yFloorPosition: 0,
        floorAngle: 0,
        maxFloorAngle: 30,
        baseRotateAngle: 15,
        rotateAngle: 0,
        baseRotateDuration: 0.1,
        rotateDuration: 0.03,
        isPlayerOn: false,
        floorSpeed: 1,
        floorBaseSpeed: 1,
        speedAddRate: 1
    },

    // use this for initialization
    onLoad: function onLoad() {},

    //设置floor上升速度
    setFloorRiseSpeed: function setFloorRiseSpeed(speed) {
        this.floorSpeed = speed;
    },

    floorRise: function floorRise() {
        this.node.y += this.floorSpeed;
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        this.floorRise();
        //设置游戏速度随着层数增加
        var score = this.game ? this.game.score : 1;
        this.speedIncrease(score);
    },

    speedIncrease: function speedIncrease(score) {
        if (score < 10) {
            this.floorSpeed = this.floorBaseSpeed;
        } else if (score >= 10 && score < 30) {
            this.floorSpeed = this.floorBaseSpeed + this.speedAddRate;
        } else if (score >= 30 && score < 70) {
            this.floorSpeed = this.floorBaseSpeed + this.speedAddRate * 3;
        } else if (score >= 70 && score < 100) {
            this.floorSpeed = this.floorBaseSpeed + this.speedAddRate * 4;
        } else {
            this.floorSpeed = this.floorBaseSpeed + this.speedAddRate * 5;
        }
    }
});

cc._RF.pop();