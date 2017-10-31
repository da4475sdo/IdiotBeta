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
        this.preloadIndexScene();
        //播放背景音乐
        cc.audioEngine.play(this.BGMAudioSource, true, 1);
    },

    quitGame:function (){
        cc.game.end();
    },

    preloadIndexScene:function (){
        //预加载游戏开始场景
        cc.director.preloadScene("main", function () {
            cc.log("Main scene preloaded");
        });
        //预加载教程场景
        cc.director.preloadScene("tutorial", function () {
            cc.log("Tutorial scene preloaded");
        });
        //预加载最高分场景
        cc.director.preloadScene("credits", function () {
            cc.log("Credits scene preloaded");
        });
        //预加载游戏相关场景
        cc.director.preloadScene("about", function () {
            cc.log("About scene preloaded");
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
