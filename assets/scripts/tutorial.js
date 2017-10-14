var tutorialIndex=1,
    isPlayerStop=true,
    tutorialTwoGoals={
        left:0,
        right:0,
    };
cc.Class({
    extends: cc.Component,

    properties: {
        player:{
            default:null,
            type:cc.Node,
        },
        floor:{
            default:null,
            type:cc.Node,
        },
        tutorialText:{
            default:null,
            type:cc.Label,
        },
    },

    // use this for initialization
    onLoad: function () {
        //预加载游戏开始场景
        cc.director.preloadScene("main", function () {
            cc.log("Main scene preloaded");
        });
        //开启物理系统
        cc.director.getPhysicsManager().enabled = true;
        //开启碰撞系统
        var manager= cc.director.getCollisionManager();
        manager.enabled=true;
        //绑定重力感应事件
        cc.inputManager.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
        //关闭player的状态系统
        this.player.getComponent("player").isStatusOn=false;
        //绑定屏幕点击事件
        this.node.on(cc.Node.EventType.TOUCH_START,this.tutorialProgress,this);
        //开始教程1
        this.tutorialProgress();
    },

    onDeviceMotionEvent:function (event){
        isPlayerStop&&this.scheduleOnce(this.setPlayerMotion,1);
        if(tutorialIndex===2){
            if(tutorialTwoGoals.left>=10&&tutorialTwoGoals.right>=20){
                this.initMotionNode();
                this.tutorialText.string="哇！完成了！恭喜你进入下一步（点击屏幕继续）";
                tutorialIndex=3;
            }else{
                var floorWidth=this.floor.width,
                playerWidth=this.player.width,
                floorX=this.floor.x,
                floorY=this.floor.y,
                playerX=this.player.x,
                playerY=this.player.y,
                distanceFromCenter=Math.sqrt((playerX-floorX)*(playerX-floorX)+(playerY-floorY)*(playerY-floorY));
                if(playerX>=floorX){
                    tutorialTwoGoals.right++;
                }else{
                    tutorialTwoGoals.left++;
                }
            }
        }
    },

    setPlayerMotion:function (){
        this.player.getComponent("player").speed=2;
        this.floor.getComponent("floor").baseRotateAngle=15;
        isPlayerStop=false;
    },

    tutorialProgress:function (){
        switch(tutorialIndex){
            case 1:this.tutorialOne();break;
            case 2:this.tutorialTwo();break;
            case 3:this.tutorialThree();break;
            default:this.tutorialOne();break;
        }
    },

    tutorialOne:function (){
        var tutorialString="欢迎来到Idiot游戏！下面我们将引导你进行游戏的基础操作教程（点击屏幕继续）";
        this.tutorialText.string=tutorialString;
        tutorialIndex=2;
        this.initMotionNode();
    },

    tutorialTwo:function (){
        var tutorialString="现在试着轻轻摇动你的手机来控制人物的左右移动";
        this.tutorialText.string=tutorialString;
        var textNode=this.tutorialText.node;
        textNode.setPosition(cc.v2(this.node.x/3,this.node.y/3));
        this.initMotionNode();
        this.toggleMotionNode(true);
        isPlayerStop=true;
    },

    tutorialThree:function (){
        
    },

    initMotionNode:function (){
        var playerComponent=this.player.getComponent("player");
        playerComponent.xPosition=this.floor.x;
        this.player.x=this.floor.x;
        this.player.y=this.floor.y;
        playerComponent.speed=0;
        this.floor.rotation=0;
        this.floor.getComponent("floor").baseRotateAngle=0;
    },

    toggleMotionNode:function (flag){
        if(flag){
            this.player.opacity=255;
            this.floor.opacity=255;
        }else{
            this.player.opacity=0;
            this.floor.opacity=0;
        }
    },
    //called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(tutorialIndex===2){
            var floorWidth=this.floor.width,
            playerWidth=this.player.width,
            floorX=this.floor.x,
            floorY=this.floor.y,
            playerX=this.player.x,
            playerY=this.player.y,
            distanceFromCenter=Math.sqrt((playerX-floorX)*(playerX-floorX)+(playerY-floorY)*(playerY-floorY));
            if(distanceFromCenter>(floorWidth+playerWidth)/2){
                this.tutorialText.string="oh!用力过大了，请再试一次（点击屏幕重试）";
                tutorialTwoGoals.left=0;
                tutorialTwoGoals.right=0;
            }
        }
    },

    skipTutorial:function (){
        //停止所有音效
        cc.audioEngine.stopAll();
        cc.director.loadScene("main");
    },
});
