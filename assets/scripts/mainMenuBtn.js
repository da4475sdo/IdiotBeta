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
        var shareInfo = {};
        shareInfo.text = "Hello World!!!!";
        shareInfo.title = "hello World";
        //shareInfo.image = "path/to/image"
        shareInfo.link = "http://www.sdkbox.com";
        sdkbox.PluginShare.nativeShare(shareInfo);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
