cc.Class({
    extends: cc.Component,

    properties: {
        //死亡音效 
        BGMAudioSource: {
            url: cc.AudioClip,
            default: null
        },
    },

    // use this for initialization
    onLoad: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.quitGame, this);
        //绑定android返回键退出游戏事件
        if(cc.sys.os == cc.sys.OS_ANDROID){
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.quitGame, this);
        }
        //播放背景音乐
        cc.audioEngine.play(this.BGMAudioSource, true, 1);
    },

    quitGame:function (){
        cc.game.end();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
