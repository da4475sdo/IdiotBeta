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
        floorJump:{
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
        //开启重力感应
        cc.inputManager.setAccelerometerEnabled(true);
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
            case 4:this.tutorialFour();break;
            case 5:this.tutorialFive();break;
            case 6:this.tutorialSix();break;
            case 7:this.tutorialSeven();break;
            case 8:this.skipTutorial();break;
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
        //绑定重力感应事件
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
        var tutorialString="现在试着轻轻摇动你的手机来控制人物的左右移动";
        this.tutorialText.string=tutorialString;
        var textNode=this.tutorialText.node;
        textNode.setPosition(cc.v2(this.node.x/3,this.node.y/3));
        this.initMotionNode();
        this.toggleMotionNode(true);
        isPlayerStop=true;
    },

    tutorialThree:function (){
        this.initMotionNode();
        //显示需要跳跃到的木板
        this.floorJump.active=true;
        //开启角色移动定时器
        isPlayerStop=true;
        this.tutorialText.string="快速地摇动你的手机来跳跃到另一块木板上";
        var textNode=this.tutorialText.node;
        textNode.setPosition(cc.v2(-this.node.x/7,-this.node.y/2));
    },

    tutorialFour:function (){
        tutorialIndex=5;
        this.initMotionNode();
        this.floorJump.active=false;
        this.player.getChildByName("Status").active=true;
        this.tutorialText.node.setPosition(cc.v2(this.node.x/3,this.node.y/3));
        this.tutorialText.string="接下来就是介绍角色的状态啦（点击屏幕继续）";
    },

    tutorialFive:function (){
        var playerScript=this.player.getComponent("player");
        //开启混乱状态
        playerScript.statusControl(1);
        this.tutorialText.string="混乱状态：角色将往控制方向相反移动（点击屏幕继续）";
        tutorialIndex=6;
    },

    tutorialSix:function (){
        var playerScript=this.player.getComponent("player");
        //开启狂暴状态
        playerScript.statusControl(2);
        this.tutorialText.string="狂暴状态：角色将移动得更快（点击屏幕继续）";
        tutorialIndex=7;
    },

    tutorialSeven:function (){
        this.initMotionNode();
        this.toggleMotionNode();
        var textNode=this.tutorialText.node;
        textNode.setPosition(cc.v2(8,9));
        this.tutorialText.string="哇！完成全部教程了！赶快开始游戏吧（点击屏幕开始游戏）";
        tutorialIndex=8;
    },

    initMotionNode:function (){
        var playerComponent=this.player.getComponent("player"),
            currentFloor=this.floor;
        if(tutorialIndex!=4){
            currentFloor=this.floor;
        }else{
            currentFloor=this.floorJump;
        }
        playerComponent.xPosition=currentFloor.x;
        this.player.x=currentFloor.x;
        this.player.y=currentFloor.y;
        playerComponent.speed=0;
        currentFloor.rotation=0;
        currentFloor.getComponent("floor").baseRotateAngle=0;
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
        }else if(tutorialIndex===3){
            var floorJumpWidth=this.floorJump.width,
                floorJumpX=this.floorJump.x,
                floorJumpY=this.floorJump.y,
                playerX=this.player.x,
                playerY=this.player.y;
            if((floorJumpY)>playerY&&(floorJumpY-20)<playerY){
                if(playerX<floorJumpX-floorJumpWidth/2){
                    this.tutorialText.string="用力过轻了呢（点击屏幕重试）";
                }else{
                    this.tutorialText.string="用力过大了呢（点击屏幕重试）";
                }
            }
            if(this.player.getComponent("player").currentFloor===this.floorJump&&playerX>floorJumpX-floorJumpWidth/2
            &&playerY>=floorJumpY){
                var textNode=this.tutorialText.node;
                this.tutorialText.string="哇！完成了！恭喜你进入下一步（点击屏幕继续）";
                tutorialIndex=4;
                this.initMotionNode();                
            }
        }
    },

    skipTutorial:function (){
        //初始化用户数据
        var userData={
            highestScore:0,
        };
        //存入数据库
        cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
        //停止所有音效
        cc.audioEngine.stopAll();
        cc.director.loadScene("main");
    },
});
