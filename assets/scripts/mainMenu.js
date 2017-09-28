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
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.quitGame, this);
        //绑定android返回键退出游戏事件
        if(cc.sys.os == cc.sys.OS_ANDROID){
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.quitGame, this);
        }
    },

    quitGame:function (){
        cc.game.end();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
