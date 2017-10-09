cc.Class({
    extends: cc.Component,

    properties: {
        //死亡音效 
        failedAudioSource: {
            url: cc.AudioClip,
            default: null
        },
    },

    // use this for initialization
    onLoad: function () {
        this.scheduleOnce(this.playDeadAudio,1);
    },

    playDeadAudio:function (){
        cc.audioEngine.play(this.failedAudioSource, false, 1);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
