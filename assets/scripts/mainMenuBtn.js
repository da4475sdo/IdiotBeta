var Global=require("global");

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
    onLoad: function () {
        
    },

    reutnMainMenu:function (){
        //停止所有音效
        cc.audioEngine.stopAll();
        cc.director.loadScene("mainMenu");
    },

    shareScore:function (){
        var shareInfo = {},
        userData=JSON.parse(cc.sys.localStorage.getItem('userData'));;
        shareInfo.text = "My score is "+userData.highestScore+" in IDIOTS!Come and try to beat me!";
        shareInfo.title = "IDIOTS";
        shareInfo.link = "http://120.78.57.98:8080/share/shareImage.html";
        sdkbox.PluginShare.nativeShare(shareInfo);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
Global