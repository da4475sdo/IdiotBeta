(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/mainMenuBtn.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a7b74nWAbxH0reas2rk67Z+', 'mainMenuBtn', __filename);
// scripts/mainMenuBtn.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {},

    reutnMainMenu: function reutnMainMenu() {
        //停止所有音效
        cc.audioEngine.stopAll();
        cc.director.loadScene("mainMenu");
    },

    shareScore: function shareScore() {
        var shareInfo = {};
        shareInfo.text = "Hello World!!!!";
        shareInfo.title = "hello World";
        //shareInfo.image = "path/to/image"
        shareInfo.link = "http://www.sdkbox.com";
        sdkbox.PluginShare.nativeShare(shareInfo);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=mainMenuBtn.js.map
        