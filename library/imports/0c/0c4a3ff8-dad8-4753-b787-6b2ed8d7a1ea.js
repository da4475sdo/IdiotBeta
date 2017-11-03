"use strict";
cc._RF.push(module, '0c4a3/42thHU7eHay7Y16Hq', 'mainMenu');
// scripts/mainMenu.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        //死亡音效 
        BGMAudioSource: {
            url: cc.AudioClip,
            default: null
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        var plugin = sdkbox.PluginShare;
        plugin.setListener({
            onShareState: function onShareState(response) {
                console.log("PluginShare onSharestate:" + response.state + " error:" + response.error);
                if (response.state == sdkbox.SocialShareState.SocialShareStateSuccess) {
                    console.log("post success");
                }
                if (response.state == sdkbox.SocialShareState.SocialShareStateFail) {
                    console.log("post failed");
                }
            }
        });
        plugin.init();
        this.preloadIndexScene();
        //播放背景音乐
        cc.audioEngine.play(this.BGMAudioSource, true, 1);
    },

    quitGame: function quitGame() {
        cc.game.end();
    },

    preloadIndexScene: function preloadIndexScene() {
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
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();