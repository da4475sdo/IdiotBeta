(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/creditsScene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1414em23WRLWYbnMEmAiqMd', 'creditsScene', __filename);
// scripts/creditsScene.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        highestScoreText: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        var userData = cc.sys.localStorage.getItem('userData');
        if (userData) {
            var score = JSON.parse(userData).highestScore;
            this.highestScoreText.string = score;
        } else {
            this.highestScoreText.string = "0";
        }
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
        //# sourceMappingURL=creditsScene.js.map
        