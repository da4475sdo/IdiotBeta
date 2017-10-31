"use strict";
cc._RF.push(module, 'fd2a6+LDgpNMZ5TyI1oD6oG', 'startGame');
// scripts/startGame.js

"use strict";

var Global = require("global");
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

    startGame: function startGame() {
        var userData = cc.sys.localStorage.getItem('userData');
        //停止所有音效
        cc.audioEngine.stopAll();
        if (userData) {
            cc.director.loadScene("main");
            Global.notFirst = true;
        } else {
            cc.director.loadScene("tutorial");
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();