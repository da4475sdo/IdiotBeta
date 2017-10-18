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
        var agent = anysdk.agentManager;
        var share_plugin = agent.getSharePlugin();
        share_plugin.setListener(this.onShareResult, this);
        var info = {
            title : "测试标题",   // title 标题，印象笔记、邮箱、信息、微信、人人网和 QQ 空间使用
            titleUrl : "http://sharesdk.cn",// titleUrl 是标题的网络链接，仅在人人网和 QQ 空间使用
            site : "ShareSDK",               // site 是分享此内容的网站名称，仅在 QQ 空间使用
            siteUrl : "http://sharesdk.cn",      // siteUrl 是分享此内容的网站地址，仅在 QQ 空间使用
            imagePath:"/sdcard/test.png",            // imagePath 是图片的本地路径，Linked-In 以外的平台都支持此参数
            url:"http://sharesdk.cn",        // url 仅在微信（包括好友和朋友圈）中使用
            imageUrl:"http://www.baidu.com/img/bdlogo.png?tn=63090008_1_hao_pg", // imageUrl 是图片的网络路径，新浪微博，人人网，QQ 空间支持此字段
            text : "测试，只是测试",            // text 是分享文本，所有平台都需要这个字段
            comment : "测试中"                // comment 是我对这条分享的评论，仅在人人网和 QQ 空间使用
         }
         share_plugin.share(info);        
    },

    onShareResult:function(code, msg){
        cc.log("share result, resultcode:"+code+", msg: "+msg);
        switch ( code ) {
            case anysdk.ShareResultCode.kShareSuccess:
                alert("分享成功");
                break;
            case anysdk.ShareResultCode.kShareFail:
                alert("分享失败");
                break;
            case anysdk.ShareResultCode.kShareCancel:
                alert("分享取消");
                break;
            case anysdk.ShareResultCode.kShareNetworkError:
                alert("网络错误");
                break;
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
