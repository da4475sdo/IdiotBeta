cc.Class({
    extends: cc.Component,

    properties: {
        highestScoreText:{
            default:null,
            type:cc.Label,
        },
    },

    // use this for initialization
    onLoad: function () {
        var userData=cc.sys.localStorage.getItem('userData');
        if(userData){
            var score=JSON.parse(userData).highestScore;
            this.highestScoreText.string="High Score:"+score;
        }else{
            this.highestScoreText.string="High Score:0";
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
