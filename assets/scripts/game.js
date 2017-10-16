cc.Class({
    extends: cc.Component,

    properties: {
        floorGap:200,
        //最底下的floor的Y坐标
        bottomFloorY:0,
        //最底下的floor的X坐标
        bottomFloorX:0,
        //当前屏幕最底层的floor
        bottomFloor:{
            default: null,
            type: cc.Node
        },
        //层数
        floorCount:1,
        //所得分数
        score:0,
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
        counters:{
            default: null,
            type: cc.Label
        },
        //死亡音效 
        backgroundAudioSource: {
            url: cc.AudioClip,
            default: null
        },        
    },

    // use this for initialization
    onLoad: function () {        
        //播放背景音乐
        var BGM = cc.audioEngine.play(this.backgroundAudioSource, true, 1);
        //预加载游戏结束场景
        cc.director.preloadScene("gameOver", function () {
            cc.log("gameOver scene preloaded");
        });
        //开启物理系统
        cc.director.getPhysicsManager().enabled = true;
        //开启碰撞系统
        var manager= cc.director.getCollisionManager();
        manager.enabled=true;
        //初始化当前最底层的floor坐标
        this.bottomFloorX=this.initFloor.x;
        this.bottomFloorY=this.initFloor.y;
        this.player.getComponent("player").game=this;
        this.player.getComponent("player").BGM=BGM;
        this.createNewFloor();
    },

    createNewFloor:function (){
        while(this.bottomFloorY>this.node.y-this.node.height){
            var newFloor = cc.instantiate(this.otherFloor);
            this.node.addChild(newFloor);
            newFloor.getComponent("floor").game=this;
            this.setWidth(newFloor);
            newFloor.setPosition(this.setPosition(newFloor));
            //手残党模式
            // this.setWidthSimple(newFloor);
            // newFloor.setPosition(this.setPositionSimple(newFloor));
            this.bottomFloor=newFloor;
            //设置新的floor的tag，用于之后计算得分
            newFloor.tag=this.floorCount;
            this.floorCount++;
        }
    },

    setPosition:function (newFloor){
        var floorWidth=newFloor.width,
            minX=-(this.node.width/2)+floorWidth*1.5,
            maxX=this.node.width/2-floorWidth*1.5,
            floorX=0,
            floorY=this.bottomFloorY-(Math.random()+1.5)*this.floorGap,
            isPositionCError=true;
        while(isPositionCError){
            if(this.bottomFloorX>=0){
                floorX=Math.random()*minX;
            }else{
                floorX=Math.random()*maxX;
            }
            //计算和上一个floor的水平位置差距,不满足则重新计算新floor位置
            if(Math.abs(floorX-this.bottomFloorX)>=floorWidth/2){
                isPositionCError=false;
            }else{
                isPositionCError=true;
            }
        }
        this.bottomFloorX=floorX;
        this.bottomFloorY=floorY;
        return cc.p(floorX,floorY);
    },

    setWidth:function (newFloor){
        //控制floor的随机宽度在initFloor宽度的1到1.5倍
        var floorWidth=this.initFloor.width*(Math.abs(Math.random()-0.5)+1),
            box=newFloor.getComponent(cc.PhysicsBoxCollider);
        newFloor.width=floorWidth;
        box.size=cc.size(floorWidth,1);
        box.apply();
    },

    setPositionSimple:function (newFloor){
        var floorWidth=newFloor.width, 
            floorX=0,
            floorY=this.bottomFloorY-(Math.random()+1.5)*this.floorGap;
        this.bottomFloorX>=0?floorX=-floorWidth/2:floorX=floorWidth/2;
        this.bottomFloorX=floorX;
        this.bottomFloorY=floorY;
        return cc.p(floorX,floorY);
    },

    setWidthSimple:function (newFloor){
        var floorWidth=this.node.width/2,
            box=newFloor.getComponent(cc.PhysicsBoxCollider);
        newFloor.width=floorWidth;
        box.size=cc.size(floorWidth,1);
        box.apply();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.bottomFloorY=this.bottomFloor.y;
        this.createNewFloor();
    },

    setScore:function (_score){
        this.score=_score;
        this.counters.string="Score："+this.score.toString();
    },
});