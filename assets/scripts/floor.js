cc.Class({
    extends: cc.Component,

    properties: {
        xFloorPosition:0,
        yFloorPosition:0,
        floorAngle:0,
        maxFloorAngle:30,
        baseRotateAngle:15,
        rotateAngle:0,
        baseRotateDuration:0.1,
        rotateDuration:0.03,
        isPlayerOn:false,
        floorSpeed:1,
    },

    // use this for initialization
    onLoad: function () {
       
    },

    //设置floor上升速度
    setFloorRiseSpeed:function (speed){
        this.floorSpeed=speed;
    },

    floorRise:function (){
        this.node.y+=this.floorSpeed;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.floorRise();
    },
});
