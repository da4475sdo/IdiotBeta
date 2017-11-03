require = function t(e, o, i) {
function n(r, a) {
if (!o[r]) {
if (!e[r]) {
var c = "function" == typeof require && require;
if (!a && c) return c(r, !0);
if (s) return s(r, !0);
var l = new Error("Cannot find module '" + r + "'");
throw l.code = "MODULE_NOT_FOUND", l;
}
var u = o[r] = {
exports: {}
};
e[r][0].call(u.exports, function(t) {
var o = e[r][1][t];
return n(o || t);
}, u, u.exports, t, e, o, i);
}
return o[r].exports;
}
for (var s = "function" == typeof require && require, r = 0; r < i.length; r++) n(i[r]);
return n;
}({
about: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "29063LKi4RAdIJFroXHVgj0", "about");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {},
toAbout: function() {
cc.director.loadScene("credits");
}
});
cc._RF.pop();
}, {} ],
creditsScene: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "1414em23WRLWYbnMEmAiqMd", "creditsScene");
cc.Class({
extends: cc.Component,
properties: {
highestScoreText: {
default: null,
type: cc.Label
}
},
onLoad: function() {
var t = cc.sys.localStorage.getItem("userData");
if (t) {
var e = JSON.parse(t).highestScore;
this.highestScoreText.string = e;
} else this.highestScoreText.string = "0";
}
});
cc._RF.pop();
}, {} ],
credits: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "aed48KjPzRMSJwg0buSyeEL", "credits");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {},
toCredits: function() {
cc.director.loadScene("score");
}
});
cc._RF.pop();
}, {} ],
floor: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "d00f9JwtYlFD4fK42Es2sYv", "floor");
cc.Class({
extends: cc.Component,
properties: {
xFloorPosition: 0,
yFloorPosition: 0,
floorAngle: 0,
maxFloorAngle: 30,
baseRotateAngle: 15,
rotateAngle: 0,
baseRotateDuration: .1,
rotateDuration: .03,
isPlayerOn: !1,
floorSpeed: 1,
floorBaseSpeed: 1,
speedAddRate: 1
},
onLoad: function() {},
setFloorRiseSpeed: function(t) {
this.floorSpeed = t;
},
floorRise: function() {
this.node.y += this.floorSpeed;
},
update: function(t) {
this.floorRise();
var e = this.game ? this.game.score : 1;
this.speedIncrease(e);
},
speedIncrease: function(t) {
this.floorSpeed = t < 10 ? this.floorBaseSpeed : t >= 10 && t < 30 ? this.floorBaseSpeed + this.speedAddRate : t >= 30 && t < 70 ? this.floorBaseSpeed + 3 * this.speedAddRate : t >= 70 && t < 100 ? this.floorBaseSpeed + 4 * this.speedAddRate : this.floorBaseSpeed + 5 * this.speedAddRate;
}
});
cc._RF.pop();
}, {} ],
gameOver: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "fbed2Mq5/9ELpFjybh9sGrD", "gameOver");
var i = t("global");
cc.Class({
extends: cc.Component,
properties: {
finalScore: {
type: cc.Label,
default: null
},
failedAudioSource: {
url: cc.AudioClip,
default: null
}
},
onLoad: function() {
var t = i.score;
this.finalScore.string = t;
this.scheduleOnce(this.playDeadAudio, 1);
var e = JSON.parse(cc.sys.localStorage.getItem("userData"));
if (e.highestScore < t) {
e.highestScore = t;
cc.sys.localStorage.setItem("userData", JSON.stringify(e));
}
},
playDeadAudio: function() {
cc.audioEngine.play(this.failedAudioSource, !1, 1);
}
});
cc._RF.pop();
}, {
global: "global"
} ],
game: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "efa0fyvDW9JFq2DvG55ZqpQ", "game");
var i = [];
cc.Class({
extends: cc.Component,
properties: {
areaWidth: 960,
floorGap: 200,
bottomFloorY: 0,
bottomFloorX: 0,
bottomFloor: {
default: null,
type: cc.Node
},
floorCount: 1,
score: 0,
otherFloor: {
default: null,
type: cc.Prefab
},
initFloor: {
default: null,
type: cc.Node
},
player: {
default: null,
type: cc.Node
},
counters: {
default: null,
type: cc.Label
},
resumeSign: {
default: null,
type: cc.Node
},
backgroundAudioSource: {
url: cc.AudioClip,
default: null
}
},
onLoad: function() {
var t = cc.audioEngine.play(this.backgroundAudioSource, !0, 1);
cc.director.preloadScene("gameOver", function() {
cc.log("gameOver scene preloaded");
});
cc.director.getPhysicsManager().enabled = !0;
cc.director.getCollisionManager().enabled = !0;
this.node.on(cc.Node.EventType.TOUCH_START, this.toggleGame, this);
this.bottomFloorX = this.initFloor.x;
this.bottomFloorY = this.initFloor.y;
this.player.getComponent("player").game = this;
this.player.getComponent("player").BGM = t;
this.createNewFloor();
},
createNewFloor: function() {
for (;this.bottomFloorY > this.node.y - this.node.height; ) {
var t = cc.instantiate(this.otherFloor);
this.node.addChild(t);
t.setSiblingIndex(6);
t.getComponent("floor").game = this;
this.setWidth(t);
t.setPosition(this.setPosition(t));
this.bottomFloor = t;
t.tag = this.floorCount;
this.floorCount++;
}
},
setPosition: function(t) {
var e = t.width, o = -this.areaWidth / 2 + e, n = this.areaWidth / 2 - e - 20, s = 0, r = this.bottomFloorY - (Math.random() + 1.5) * this.floorGap, a = 0, c = i.length;
if (c > 1) {
var l = i[c - 2], u = i[c - 1];
switch (u + l) {
case -3:
a = u < l ? cc.randomMinus1To1() >= 0 ? 0 : 1 : cc.randomMinus1To1() >= 0 ? 1 : 2;
break;

case -2:
a = cc.randomMinus1To1() >= 0 ? 1 : 2;
break;

case -1:
a = 0 === u || 0 === l ? cc.randomMinus1To1() >= 0 ? 1 : 2 : this.getReversePosition(u);
break;

case 0:
a = this.getReversePosition(u);
break;

case 1:
a = 0 === u || 0 === l ? cc.randomMinus1To1() >= 0 ? -1 : -2 : this.getReversePosition(u);
break;

case 2:
a = cc.randomMinus1To1() >= 0 ? -1 : -2;
break;

case 3:
a = u > l ? cc.randomMinus1To1() >= 0 ? 0 : -1 : cc.randomMinus1To1() >= 0 ? -1 : -2;
}
} else a = 0 === c ? 2 : cc.randomMinus1To1() >= 0 ? -1 : -2;
switch (a) {
case -1:
s = o;
break;

case -2:
s = o / 2;
break;

case 0:
s = 0;
break;

case 1:
s = n / 2;
break;

case 2:
s = n;
break;

default:
s = 0;
}
i.push(a);
this.bottomFloorX = s;
this.bottomFloorY = r;
return cc.p(s, r);
},
getReversePosition: function(t) {
return t >= 0 ? cc.randomMinus1To1() >= 0 ? -1 : -2 : cc.randomMinus1To1() >= 0 ? 1 : 2;
},
setWidth: function(t) {
var e = this.initFloor.width, o = t.getComponent(cc.PhysicsBoxCollider);
t.width = e;
o.size = cc.size(e - 17, 1);
o.offset = cc.v2(2, 1);
o.apply();
},
setPositionSimple: function(t) {
var e = t.width, o = 0, i = this.bottomFloorY - (Math.random() + 1.5) * this.floorGap;
o = this.bottomFloorX >= 0 ? -e / 2 : e / 2;
this.bottomFloorX = o;
this.bottomFloorY = i;
return cc.p(o, i);
},
setWidthSimple: function(t) {
var e = this.node.width / 2, o = t.getComponent(cc.PhysicsBoxCollider);
t.width = e;
o.size = cc.size(e, 1);
o.apply();
},
update: function(t) {
this.bottomFloorY = this.bottomFloor.y;
this.createNewFloor();
},
setScore: function(t) {
this.score = t;
this.counters.string = this.score.toString();
},
toggleGame: function() {
var t = cc.director, e = this.resumeSign;
if (t.isPaused()) {
t.resume();
e.active = !1;
} else {
t.pause();
e.active = !0;
}
}
});
e.exports = {
floorArray: i
};
cc._RF.pop();
}, {} ],
global: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "e311b2NEwJJOadAvoSYinYk", "global");
e.exports = {
score: null,
notFirst: !1
};
cc._RF.pop();
}, {} ],
mainMenuBtn: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "a7b74nWAbxH0reas2rk67Z+", "mainMenuBtn");
var i = t("global");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {},
reutnMainMenu: function() {
cc.audioEngine.stopAll();
cc.director.loadScene("mainMenu");
},
shareScore: function() {
var t = {};
t.text = "My score is " + i.score + " in IDIOTS!Come and try to beat me!";
t.title = "IDIOTS";
t.link = "https://user.qzone.qq.com/1833096654/infocenter";
sdkbox.PluginShare.nativeShare(t);
}
});
cc._RF.pop();
}, {
global: "global"
} ],
mainMenu: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "0c4a3/42thHU7eHay7Y16Hq", "mainMenu");
cc.Class({
extends: cc.Component,
properties: {
BGMAudioSource: {
url: cc.AudioClip,
default: null
}
},
onLoad: function() {
var t = sdkbox.PluginShare;
t.setListener({
onShareState: function(t) {
console.log("PluginShare onSharestate:" + t.state + " error:" + t.error);
t.state == sdkbox.SocialShareState.SocialShareStateSuccess && console.log("post success");
t.state == sdkbox.SocialShareState.SocialShareStateFail && console.log("post failed");
}
});
t.init();
this.preloadIndexScene();
cc.audioEngine.play(this.BGMAudioSource, !0, 1);
},
quitGame: function() {
cc.game.end();
},
preloadIndexScene: function() {
cc.director.preloadScene("main", function() {
cc.log("Main scene preloaded");
});
cc.director.preloadScene("tutorial", function() {
cc.log("Tutorial scene preloaded");
});
cc.director.preloadScene("credits", function() {
cc.log("Credits scene preloaded");
});
cc.director.preloadScene("about", function() {
cc.log("About scene preloaded");
});
}
});
cc._RF.pop();
}, {} ],
player: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "93f33vjOIdMU6wSJmoj2IOa", "player");
var i = t("global"), n = t("game"), s = null;
cc.Class({
extends: cc.Component,
properties: {
xPosition: 0,
yPosition: 0,
speed: 2,
isOnFloor: !0,
jumpLevel: 5,
baseSpeedLevel: 7,
speedLevel: 3,
fromFloorHeight: 20,
stopRange: 5,
moveYDuration: .2,
fallDuration: 1,
isStatusOn: !0,
status: 0,
minStatusTime: 5,
maxStatusTime: 10,
jumpLandX: 0,
currentFloor: {
default: null,
type: cc.Node
},
jumpAudioSource: {
url: cc.AudioClip,
default: null
},
landAudioSource: {
url: cc.AudioClip,
default: null
},
chaosAudioSource: {
url: cc.AudioClip,
default: null
},
rageAudioSource: {
url: cc.AudioClip,
default: null
},
deadAudioSource: {
url: cc.AudioClip,
default: null
}
},
onLoad: function() {
this.xPosition = this.currentFloor.x;
this.yPosition = this.currentFloor.y + this.fromFloorHeight;
this.currentFloor.getComponent("floor").isPlayerOn = !0;
cc.inputManager.setAccelerometerEnabled(!0);
cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
this.startStatusCheck(3 * cc.random0To1() + 5);
},
onDeviceMotionEvent: function(t) {
if (this.isOnFloor) {
var e = t.acc.x * this.speed * this.speedLevel, o = Math.sqrt((this.node.x - this.currentFloor.x) * (this.node.x - this.currentFloor.x) + (this.node.y - this.currentFloor.y) * (this.node.y - this.currentFloor.y));
this.currentFloor.getComponent("floor");
if (o < (this.currentFloor.width + this.node.width) / 2) {
this.setPlayerAnimationDirection(e);
this.groupMove(e);
} else {
this.playerFall(e);
this.floorRest();
}
}
},
onBeginContact: function(t, e, o) {
var n = o.node;
if ("boundary" !== n.group) if (n != this.currentFloor) {
this.currentFloor = n;
this.xPosition = this.node.x;
this.setPlayerOnFloorState(!0);
var r = n.tag;
this.game && this.game.setScore(r);
this.playAudio(this, this.landAudioSource, !1);
} else {
(s && s._instanceId || i.notFirst) && this.currentFloor.stopAction(s);
this.setPlayerOnFloorState(!0);
} else this.playerFailed();
},
onEndContact: function(t, e, o) {},
onPreSolve: function(t, e, o) {},
onPostSolve: function(t, e, o) {},
setPlayerOnFloorState: function(t) {
this.isOnFloor = t;
this.currentFloor.getComponent("floor").isPlayerOn = t;
},
groupMove: function(t) {
var e = this.floorMove(), o = this.currentFloor.getComponent("floor");
this.playerMove(t, e, o);
},
playerMove: function(t, e, o) {
var i = this.currentFloor.rotation;
Math.sin(.0174533 * Math.abs(i));
this.xPosition += t * Math.cos(.0174533 * Math.abs(i));
this.speedLevel = i * t ? this.baseSpeedLevel + Math.abs(i) : this.baseSpeedLevel - Math.abs(i);
},
floorMove: function() {
var t = this.xPosition - this.currentFloor.x, e = (this.currentFloor.width, this.currentFloor.getComponent("floor"));
t <= -this.stopRange ? e.rotateAngle = -e.baseRotateAngle : e.rotateAngle = Math.abs(e.baseRotateAngle);
return e.floorAngle > 0;
},
update: function(t) {
if (this.isOnFloor) {
var e = this.currentFloor.getComponent("floor"), o = cc.rotateBy(e.rotateDuration, e.rotateAngle), i = cc.callFunc(this.getFloorAngle, this, e), n = e.maxFloorAngle - e.baseRotateAngle;
this.node.x = this.xPosition;
(e.floorAngle < n && e.floorAngle > -n || e.floorAngle * e.rotateAngle <= 0) && this.currentFloor.runAction(cc.sequence(o, i));
} else if (this.game) {
var s = this.game.node.width, r = -s / 2, a = s / 2, c = -this.game.node.height / 2, l = this.node.x, u = this.node.y;
(l <= r || l >= a || u < c) && this.playerFailed();
}
},
getFloorAngle: function(t) {
t.getComponent("floor").floorAngle = this.currentFloor.rotation;
},
playerFall: function(t) {
this.setPlayerOnFloorState(!1);
var e = Math.abs(this.speed) * t * (this.jumpLevel + Math.abs(t / 3)), o = this.setJumpHeight(Math.abs(t)), i = cc.jumpBy(this.fallDuration, cc.p(e, 0), o, 1).easing(cc.easeOut(3));
this.jumpLandX = this.xPosition + e;
this.playAudio(this, this.jumpAudioSource, !1);
this.node.runAction(i);
},
floorRest: function() {
s = cc.rotateTo(.5, 0);
this.currentFloor.runAction(s);
},
playerFailed: function() {
n.floorArray.splice(0, n.floorArray.length);
this.playAudio(this, this.deadAudioSource, !1);
i.score = this.game.score;
cc.director.loadScene("gameOver");
cc.audioEngine.stop(this.BGM);
},
startStatusCheck: function(t) {
this.scheduleOnce(this.playerStatusChange, t);
},
playerStatusChange: function() {
var t = Math.random();
if (this.isStatusOn && 0 === this.status) {
this.status = t <= .3 ? 1 : 2;
this.statusControl(this.status);
}
},
statusControl: function(t) {
var e = this.node.getChildByName("Status"), o = e.getComponent(cc.Sprite), i = (this.maxStatusTime - this.minStatusTime) * Math.random() + this.minStatusTime;
switch (t) {
case 0:
this.statusNormal(e);
break;

case 1:
this.statusChaos(e, o);
break;

case 2:
this.statusRage(e, o);
}
this.scheduleOnce(function() {
this.statusNormal(e);
}, parseInt(i));
},
statusNormal: function(t) {
this.status = 0;
t.active = !1;
this.baseSpeedLevel = 1;
this.speed = Math.abs(this.speed);
this.startStatusCheck(5 * cc.random0To1() + 10);
},
statusChaos: function(t, e) {
var o = this;
o.status = 1;
o.loadImage("chaos", function(i) {
t.setContentSize(cc.size(47.7, 84));
e.spriteFrame = i;
t.active = !0;
o.playAudio(o, o.chaosAudioSource, !1);
});
o.speed = -o.speed;
},
statusRage: function(t, e) {
var o = this;
o.status = 2;
o.loadImage("rage", function(i) {
t.setContentSize(cc.size(62.9, 61.2));
e.spriteFrame = i;
t.active = !0;
o.playAudio(o, o.rageAudioSource, !1);
});
o.baseSpeedLevel = 5 * Math.abs(o.baseSpeedLevel);
},
setJumpHeight: function(t) {
return t <= 10 ? 20 : t <= 20 ? 80 : 100;
},
setPlayerAnimationDirection: function(t) {
t >= 0 ? this.node.setScale(1, 1) : this.node.setScale(-1, 1);
},
playAudio: function(t, e, o) {
cc.audioEngine.play(e, o, 1);
},
loadImage: function(t, e) {
var o = t;
cc.loader.loadRes(o, cc.SpriteFrame, function(t, o) {
e(o);
});
}
});
cc._RF.pop();
}, {
game: "game",
global: "global"
} ],
startGame: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "fd2a6+LDgpNMZ5TyI1oD6oG", "startGame");
var i = t("global");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {},
startGame: function() {
var t = cc.sys.localStorage.getItem("userData");
cc.audioEngine.stopAll();
if (t) {
cc.director.loadScene("main");
i.notFirst = !0;
} else cc.director.loadScene("tutorial");
}
});
cc._RF.pop();
}, {
global: "global"
} ],
tutorial: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "5e3f9LcbHNJNopHyWGAVcxd", "tutorial");
var i = 1, n = !0, s = {
left: 0,
right: 0
};
cc.Class({
extends: cc.Component,
properties: {
player: {
default: null,
type: cc.Node
},
floor: {
default: null,
type: cc.Node
},
floorJump: {
default: null,
type: cc.Node
},
tutorialText: {
default: null,
type: cc.Label
}
},
onLoad: function() {
cc.director.preloadScene("main", function() {
cc.log("Main scene preloaded");
});
cc.director.getPhysicsManager().enabled = !0;
cc.director.getCollisionManager().enabled = !0;
cc.inputManager.setAccelerometerEnabled(!0);
this.player.getComponent("player").isStatusOn = !1;
this.node.on(cc.Node.EventType.TOUCH_START, this.tutorialProgress, this);
this.tutorialProgress();
},
onDeviceMotionEvent: function(t) {
n && this.scheduleOnce(this.setPlayerMotion, 1);
if (2 === i) if (s.left >= 10 && s.right >= 20) {
this.initMotionNode();
this.tutorialText.string = "complete! Congratulations \n(tap screen to continue)";
i = 3;
} else {
this.floor.width, this.player.width;
var e = this.floor.x, o = this.floor.y, r = this.player.x, a = this.player.y;
Math.sqrt((r - e) * (r - e) + (a - o) * (a - o));
r >= e ? s.right++ : s.left++;
}
},
setPlayerMotion: function() {
this.player.getComponent("player").speed = 2;
this.floor.getComponent("floor").baseRotateAngle = 15;
n = !1;
},
tutorialProgress: function() {
switch (i) {
case 1:
this.tutorialOne();
break;

case 2:
this.tutorialTwo();
break;

case 3:
this.tutorialThree();
break;

case 4:
this.tutorialFour();
break;

case 5:
this.tutorialFive();
break;

case 6:
this.tutorialSix();
break;

case 7:
this.tutorialSeven();
break;

case 0:
this.tutorialFinal();
break;

case -1:
this.skipTutorial();
break;

default:
this.tutorialOne();
}
},
tutorialOne: function() {
this.tutorialText.string = "Welcome to Idiots! Here we will guide you through the tutorial of game \n(tap screen to continue)";
i = 2;
this.initMotionNode();
},
tutorialTwo: function() {
cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
this.tutorialText.string = "Now try to shake your phone gently to control the movement of people around";
var t = this.tutorialText.node;
t.setPosition(cc.v2(this.node.x / 5, 0));
t.setContentSize(500, 200);
this.initMotionNode();
this.toggleMotionNode(!0);
n = !0;
},
tutorialThree: function() {
this.initMotionNode();
this.floorJump.active = !0;
n = !0;
this.tutorialText.string = "Quickly shake your phone to jump to the another wood";
this.tutorialText.node.setPosition(cc.v2(-this.node.x / 7, -this.node.y / 2));
},
tutorialFour: function() {
var t = this.tutorialText.node;
i = 5;
this.initMotionNode();
this.floorJump.active = !1;
this.player.getChildByName("Status").active = !0;
t.setPosition(cc.v2(this.node.x / 5, 0));
t.setContentSize(500, 200);
this.tutorialText.string = "Then we will introduce the status of the role \n(tap screen to continue)";
},
tutorialFive: function() {
this.player.getComponent("player").statusControl(1);
this.tutorialText.string = "Chaos:The role will move in the opposite direction of control \n(tap screen to continue)";
i = 6;
},
tutorialSix: function() {
this.player.getComponent("player").statusControl(2);
this.tutorialText.string = "Rage:The role will move faster \n(tap screen to continue)";
i = 7;
},
tutorialFinal: function() {
this.initMotionNode();
this.toggleMotionNode();
this.tutorialText.node.setPosition(cc.v2(8, 9));
this.tutorialText.string = "Wow! Complete all tutorials! \n(tap screen to start)";
i = -1;
},
tutorialSeven: function() {
this.tutorialText.string = "you can tap the screen to pause or resume game \n(tap screen to continue)";
i = 0;
},
initMotionNode: function() {
var t = this.player.getComponent("player"), e = this.floor;
e = 4 != i ? this.floor : this.floorJump;
t.xPosition = e.x;
this.player.x = e.x;
this.player.y = e.y;
t.speed = 0;
e.rotation = 0;
e.getComponent("floor").baseRotateAngle = 0;
},
toggleMotionNode: function(t) {
if (t) {
this.player.opacity = 255;
this.floor.opacity = 255;
} else {
this.player.opacity = 0;
this.floor.opacity = 0;
}
},
update: function(t) {
if (2 === i) {
var e = this.floor.width, o = this.player.width, n = this.floor.x, r = this.floor.y, a = this.player.x, c = this.player.y;
if (Math.sqrt((a - n) * (a - n) + (c - r) * (c - r)) > (e + o) / 2) {
this.tutorialText.string = "Oh!Shaking overly \n(tap screen to try again)";
s.left = 0;
s.right = 0;
}
} else if (3 === i) {
var l = this.floorJump.width, u = this.floorJump.x, h = this.floorJump.y, a = this.player.x;
h > (c = this.player.y) && h - 20 < c && (this.tutorialText.string = a < u - l / 2 ? "Oh!too gently \n(tap screen to try again)" : "Oh!Shaking overly \n(tap screen to try again)");
if (this.player.getComponent("player").currentFloor === this.floorJump && a > u - l / 2 && c >= h) {
this.tutorialText.node;
this.tutorialText.string = "complete! Congratulations \n(tap screen to continue)";
i = 4;
this.initMotionNode();
}
}
},
skipTutorial: function() {
var t = {
highestScore: 0
};
cc.sys.localStorage.setItem("userData", JSON.stringify(t));
cc.audioEngine.stopAll();
cc.director.loadScene("main");
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "about", "credits", "creditsScene", "floor", "game", "gameOver", "global", "mainMenu", "mainMenuBtn", "player", "startGame", "tutorial" ]);