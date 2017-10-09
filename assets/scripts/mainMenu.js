cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.quitGame, this);
        //绑定android返回键退出游戏事件
        if(cc.sys.os == cc.sys.OS_ANDROID){
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.quitGame, this);
        }
    },

    quitGame:function (){
        cc.game.end();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
