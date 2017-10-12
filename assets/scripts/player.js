var Global=require("global");
var floorRestAction=null;
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
        //0:正常;1:混乱;2:狂暴
        status:0,
        //状态最小持续时间
        minStatusTime:5,
        //状态最大持续时间
        maxStatusTime:10,
        //跳跃的终点
        jumpLandX:0,
         // player node 当前所在的floor node
        currentFloor: {
            default: null,
            type: cc.Node
        },
        //跳跃音效 
        jumpAudioSource: {
            url: cc.AudioClip,
            default: null
        },
        //着陆音效 
        landAudioSource: {
            url: cc.AudioClip,
            default: null
        },
        //混乱音效 
        chaosAudioSource: {
            url: cc.AudioClip,
            default: null
        },
        //狂暴音效 
        rageAudioSource: {
            url: cc.AudioClip,
            default: null
        },
        //死亡音效 
        deadAudioSource: {
            url: cc.AudioClip,
            default: null
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
        //在5-8秒内进行状态变化
        this.startStatusCheck(cc.random0To1()*3+5);
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
                this.playerFall(distance);
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
            var score=otherColliderNode.tag;
            //设置游戏得分
            this.game.setScore(score);
            //播放落地音效
            this.playAudio(this,this.landAudioSource,false);
        }else{
            //防止跳上同一块木板不动的情况
            this.currentFloor.stopAction(floorRestAction);
            this.setPlayerOnFloorState(true);
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
        if(distanceFromCenter<=-this.stopRange){
            _currentFloor.rotateAngle=-_currentFloor.baseRotateAngle;
        }else{
            _currentFloor.rotateAngle=Math.abs(_currentFloor.baseRotateAngle);
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
                floorRotate=cc.rotateBy(_currentFloor.rotateDuration, _currentFloor.rotateAngle),
                callback = cc.callFunc(this.getFloorAngle, this,_currentFloor),
                _maxFloorAngle=_currentFloor.maxFloorAngle-_currentFloor.baseRotateAngle;
            //控制player横向移动
            this.node.x=this.xPosition;
            //控制floor的最大旋转角度
            if((_currentFloor.floorAngle<_maxFloorAngle&&_currentFloor.floorAngle>-_maxFloorAngle)
            ||(_currentFloor.floorAngle*_currentFloor.rotateAngle<=0)){
                this.currentFloor.runAction(cc.sequence(floorRotate,callback));
            }
        }else{//player自由下落时
            var sceneWidth=this.game.node.width,
                sceneHeight=this.game.node.height,
                leftBound=-sceneWidth/2,
                rightBound=sceneWidth/2,
                bottomBound=-sceneHeight/2,
                playerX=this.node.x,
                playerY=this.node.y;
            //避免player运动过快，物理碰撞系统无法检测问题
            if(playerX<=leftBound||playerX>=rightBound||playerY<bottomBound){
                this.playerFailed();
            }
        }
    },

    getFloorAngle:function (currentFloor){
        var _currentFloor=currentFloor.getComponent("floor");
        _currentFloor.floorAngle=this.currentFloor.rotation;
    },

    playerFall:function (distance){
        this.setPlayerOnFloorState(false);
        var playerSpeed=Math.abs(this.speed),
            _jumpLevel=this.jumpLevel+Math.abs(distance/3),
            landX=playerSpeed*distance*_jumpLevel,
            jumpHeight=this.setJumpHeight(Math.abs(distance)),
            callback = cc.callFunc(this.playAudio, this,this.jumpAudioSource,false),
            fallXMove=cc.jumpBy(this.fallDuration,cc.p(landX,0),jumpHeight,1).easing(cc.easeOut(3.0));
        this.jumpLandX=this.xPosition+landX;
        this.node.runAction(cc.sequence(callback,fallXMove));
    },

    floorRest:function (){
        floorRestAction=cc.rotateTo(0.5,0);
        this.currentFloor.runAction(floorRestAction);
    },

    playerFailed:function (){
        this.playAudio(this,this.deadAudioSource,false);
        //记录最后得分
        Global.score=this.game.score;
        //转换到游戏结束场景
        cc.director.loadScene("gameOver");
        //关闭背景音乐
        cc.audioEngine.stop(this.BGM);
    },

    //开启状态检测
    startStatusCheck:function (_duration){
        this.scheduleOnce(this.playerStatusChange,_duration);
    },

    playerStatusChange:function (){
        var randomNum=Math.random();
        if(this.status===0){
            this.status=randomNum<=0.7?1:2;
            this.statusControl(this.status);
        }
    },

    statusControl:function (status){
        var statusNode=this.node.getChildByName("Status"),
            statusNodeSprite=statusNode.getComponent(cc.Sprite),
            statusTime=(this.maxStatusTime-this.minStatusTime)*Math.random()+this.minStatusTime;
        switch(status){
            case 0:this.statusNormal(statusNode);break;
            case 1:this.statusChaos(statusNode,statusNodeSprite);break;
            case 2:this.statusRage(statusNode,statusNodeSprite);break;
        };
        //在状态持续时间结束后，恢复player的正常状态
        this.scheduleOnce(function (){
            this.statusNormal(statusNode);
        },parseInt(statusTime));
    },

    //正常状态
    statusNormal:function (statusNode){
        this.status=0;
        //隐藏状态节点
        statusNode.active=false;
        //初始化player状态
        this.baseSpeedLevel=1;
        this.speed=Math.abs(this.speed);
        //定时进行下一次状态变化
        this.startStatusCheck(cc.random0To1()*5+10);
    },

    //混乱状态，人物的移动方向和控制方向相反
    statusChaos:function (statusNode,statusNodeSprite){
        var that=this;
        that.status=1;
        that.loadImage("chaos",function (_spriteFrame){
            statusNode.setContentSize(cc.size(47.7, 84));
            statusNodeSprite.spriteFrame=_spriteFrame;
            //显示状态节点
            statusNode.active=true;
            //播放混乱音效
            that.playAudio(that,that.chaosAudioSource,false);
        });
        that.speed=-that.speed;
    },

    //狂暴状态，人物的移动速度加快
    statusRage:function (statusNode,statusNodeSprite){
        var that=this;
        that.status=2;
        that.loadImage("rage",function (_spriteFrame){
            statusNode.setContentSize(cc.size(62.9, 61.2));
            statusNodeSprite.spriteFrame=_spriteFrame;
            //显示状态节点
            statusNode.active=true;
            //播放狂暴音效
            that.playAudio(that,that.rageAudioSource,false);
        });
        that.baseSpeedLevel=Math.abs(that.baseSpeedLevel)*5;
    },

    setJumpHeight:function (distance){
        var jumpHeight=0;
        if(distance<=10){
            jumpHeight=20;
        }else if(distance<=20){
            jumpHeight=80
        }else{
            jumpHeight=100;
        }
        return jumpHeight;
    },

    playAudio:function (target,audioSource,isLoop){
        cc.audioEngine.play(audioSource, isLoop, 1);
    },
    
    //读取图片，根路径为resource文件夹
    loadImage:function (filePath,callback){
        var url = filePath;
        cc.loader.loadRes(url, cc.SpriteFrame, function (err, _spriteFrame) {
            callback(_spriteFrame);
        });
    },
});
