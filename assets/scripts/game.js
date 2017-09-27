cc.Class({
    extends: cc.Component,

    properties: {
        floorGap:100,
        //最底下的floor的Y坐标
        bottomFloorY:0,
        //最底下的floor的X坐标
        bottomFloorX:0,
        //floor数组
        floorArray:[],
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
    },

    // use this for initialization
    onLoad: function () {
        //预加载游戏结束场景
        cc.director.preloadScene("gameOver", function () {
            cc.log("Next scene preloaded");
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
        this.createNewFloor();
    },

    createNewFloor:function (){
        while(this.bottomFloorY>this.node.y-this.node.height){
            var newFloor = cc.instantiate(this.otherFloor);
            this.node.addChild(newFloor);
            this.setWidth(newFloor);
            newFloor.setPosition(this.setPosition(newFloor));
            //设置新的floor的tag，用于之后计算得分
            newFloor.tag=this.floorArray.length+1;
            this.floorArray.push(newFloor);
        }
    },

    setPosition:function (newFloor){
        //控制floor的随机宽度在initFloor宽度的0.5到1倍
        var floorWidth=newFloor.width,
            minX=-(this.node.width/2)+floorWidth,
            maxX=this.node.width/2-floorWidth,
            floorX=0,
            floorY=this.bottomFloorY-(Math.random()+1)*this.floorGap;
        if(this.bottomFloorX>=0){
            floorX=Math.random()*minX;
        }else{
            floorX=Math.random()*maxX;
        }
        this.bottomFloorX=floorX;
        this.bottomFloorY=floorY;
        return cc.p(floorX,floorY);
    },

    setWidth:function (newFloor){
        newFloor.width=this.initFloor.width*(Math.abs(Math.random()-0.5)+0.8);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.bottomFloorY=this.floorArray[this.floorArray.length-1].y;
        this.createNewFloor();
    },

    setScore:function (_score){
        this.score=_score;
        this.counters.string="Score："+this.score.toString();
    },
});
