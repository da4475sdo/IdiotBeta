"use strict";
cc._RF.push(module, '1414em23WRLWYbnMEmAiqMd', 'creditsScene');
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