var Global=require("global");
cc.Class({
    extends: cc.Component,

    properties: {
        //死亡音效 
        finalScore: {
            type: cc.Label,
            default: null
        },
        //死亡音效 
        failedAudioSource: {
            url: cc.AudioClip,
            default: null
        },
    },

    // use this for initialization
    onLoad: function () {
        var score=Global.score;
        this.finalScore.string="FINAL SCORE:"+score;
        this.scheduleOnce(this.playDeadAudio,1);
        //判断是不是最高分，如果是则保存
        var userData=JSON.parse(cc.sys.localStorage.getItem('userData'));
        if(userData.highestScore<score){
            userData.highestScore=score;
            cc.sys.localStorage.setItem('userData',JSON.stringify(userData));
        }
    },

    playDeadAudio:function (){
        cc.audioEngine.play(this.failedAudioSource, false, 1);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
