cc.Class({
    extends: cc.Component,

    properties: {
        xPosition:0,
        yPosition:0,
        speed:2,
        isOnFloor:true,
        jumpLevel:5,
        baseSpeedLevel:7,
        speedLevel:3,
        //player距离的地板的高度
        fromFloorHeight:20,
        //player静止的距离范围
        stopRange:5,
        //floor下降时，player下落移动时长
        moveYDuration:0.2,
        //player下落的时长
        fallDuration:1,
        once:true,
         // player node 当前所在的floor node
        currentFloor: {
            default: null,
            type: cc.Node
        },    
    },

    // use this for initialization
    onLoad: function () {
        //初始化player node 位置
        this.xPosition=this.currentFloor.x;
        this.yPosition=this.currentFloor.y+this.fromFloorHeight;
        this.currentFloor.getComponent("floor").isPlayerOn=true;
        //绑定重力感应事件
        cc.inputManager.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    },

    onDeviceMotionEvent:function (event){
        if(this.isOnFloor){
            //player移动的距离
            var deviceMotion=event.acc.x,
            distance=deviceMotion*this.speed*this.speedLevel,
            playerToFloorCenterDis=Math.sqrt((this.node.x-this.currentFloor.x)*(this.node.x-this.currentFloor.x)
            +(this.node.y-this.currentFloor.y)*(this.node.y-this.currentFloor.y)),
            _currentFloor=this.currentFloor.getComponent("floor");
            //判断player是在floor上移动还是下落
            if((playerToFloorCenterDis<(this.currentFloor.width+this.node.width)/2)){
                this.groupMove(distance);
            }else{
                this.playerFall(Math.abs(distance));
                this.floorRest();
            }
        }
    },

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact: function (contact, selfCollider, otherCollider) {
        var otherColliderNode=otherCollider.node;
        //当player触碰到上下边界时，游戏结束
        if(otherColliderNode.group==="boundary"){
            this.playerFailed();
            return;
        }
        //当player下落到新的floor时调用
        if(otherColliderNode!=this.currentFloor){
            this.currentFloor=otherColliderNode;
            //同步player X坐标
            this.xPosition=this.node.x;
            this.setPlayerOnFloorState(true);
            //设置游戏得分
            this.game.setScore(otherColliderNode.tag);
        }
    },

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact: function (contact, selfCollider, otherCollider) {
    },

    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve: function (contact, selfCollider, otherCollider) {
    },

    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve: function (contact, selfCollider, otherCollider) {
    },

    setPlayerOnFloorState:function (_switch){
        this.isOnFloor=_switch;
        this.currentFloor.getComponent("floor").isPlayerOn=_switch;
    },

    groupMove:function (distance){
        var playerYMoveDirecition=this.floorMove(),
            _currentFloor=this.currentFloor.getComponent('floor');
        this.playerMove(distance,playerYMoveDirecition,_currentFloor);
    },

    playerMove:function (distance,playerYMoveDirecition,_currentFloor){
        var _floorAngle=this.currentFloor.rotation,
            yMoveDistance=distance*Math.sin(Math.abs(_floorAngle)*0.0174533);
            this.xPosition+=(distance*Math.cos(Math.abs(_floorAngle)*0.0174533));
        //根据角度更新速度等级
        _floorAngle*distance?this.speedLevel=this.baseSpeedLevel+Math.abs(_floorAngle):this.speedLevel=this.baseSpeedLevel-Math.abs(_floorAngle);
    },

    floorMove:function (){
        var playerXPosition=this.xPosition,
            distanceFromCenter=playerXPosition-this.currentFloor.x,
            playerYMoveDirecition=true,
            floorWidth=this.currentFloor.width,
            _currentFloor=this.currentFloor.getComponent('floor');
        //当player在floor的左半部分时，旋转角度为负
        if(distanceFromCenter<-this.stopRange){
            _currentFloor.rotateAngle=-_currentFloor.baseRotateAngle;
        }else if(distanceFromCenter>this.stopRange){
            _currentFloor.rotateAngle=Math.abs(_currentFloor.baseRotateAngle);
        }else{
            _currentFloor.rotateAngle=0;
        }
        //当floor上的player下降时
        if(_currentFloor.floorAngle>0){
            playerYMoveDirecition=true;
        }else{
            playerYMoveDirecition=false; 
        }
        //返回player的垂直移动方向
        return playerYMoveDirecition;
    },

    update (dt) {
        //player在floor上时
        if(this.isOnFloor){
            var _currentFloor=this.currentFloor.getComponent('floor'),
                floorRotate=new cc.RotateBy(_currentFloor.rotateDuration, _currentFloor.rotateAngle),
                callback = cc.callFunc(this.getFloorAngle, this,_currentFloor),
                _maxFloorAngle=_currentFloor.maxFloorAngle-_currentFloor.baseRotateAngle,
                _fromFloorHeight=this.currentFloor.y+this.fromFloorHeight;
            //控制player横向移动
            this.node.x=this.xPosition;
            //控制floor的最大旋转角度
            if((_currentFloor.floorAngle<_maxFloorAngle&&_currentFloor.floorAngle>-_maxFloorAngle)
            ||(_currentFloor.floorAngle*_currentFloor.rotateAngle<=0)){
                this.currentFloor.runAction(cc.sequence(floorRotate,callback));
            }
        }else{//player自由下落时
            
        }
    },

    getFloorAngle:function (currentFloor){
        var _currentFloor=currentFloor.getComponent("floor");
        _currentFloor.floorAngle=this.currentFloor.rotation;
    },

    playerFall:function (distance){
        this.setPlayerOnFloorState(false);
        var landX=this.currentFloor.rotation>=0?this.speed*(this.speedLevel+distance*this.jumpLevel):-this.speed*(this.speedLevel+distance*this.jumpLevel),
            fallXMove=cc.moveBy(this.fallDuration,cc.p(landX,0)).easing(cc.easeCircleActionOut());
        this.node.runAction(fallXMove);
    },

    floorRest:function (){
        var floorRestRoration=cc.rotateTo(1,0);
        this.currentFloor.runAction(floorRestRoration);
    },

    playerFailed:function (){
        //转换到游戏结束场景
        cc.director.loadScene("gameOver");
    }
});
