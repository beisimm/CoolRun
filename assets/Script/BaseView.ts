// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import callFunc = cc.callFunc;
import v2 = cc.v2;

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Animation)
    animationHero: cc.Animation = null;

    @property(cc.Node)
    btnRoll: cc.Node = null;

    // @ts-ignore
    @property(cc.Node)
    backGroup1: cc.Node = [];

    // @ts-ignore
    @property(cc.Node)
    backGroup2: cc.Node = [];

    // @ts-ignore
    @property(cc.Node)
    backGroup3: cc.Node = [];

    // LIFE-CYCLE CALLBACKS:


    onLoad() {
        this.animationHero.play('Run');
        this.btnRoll.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.btnRoll.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.btnRoll.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
    }

    start() {
        this.backGroup1[0].setPosition(v2(0, 25)); // 初始化背景
        this.backGroup1[1].setPosition(v2(499, 25));
        this.backGroup2[0].setPosition(v2(0, 0));
        this.backGroup2[1].setPosition(v2(1000, 0));
        this.backGroup3[0].setPosition(v2(0, -91.4));
        this.backGroup3[1].setPosition(v2(499 ,-91.4));


    }

    update(dt) {
        this.bg1Move(this.backGroup1[0]);  //背景移动
        this.bg1Move(this.backGroup1[1]);
        this.bg2Move(this.backGroup2[0]);
        this.bg2Move(this.backGroup2[1]);
        this.bg3Move(this.backGroup3[0]);
        this.bg3Move(this.backGroup3[1]);
    }

    bg1Move(bg: cc.Node) {
        bg.x -= backGroundSpeed1;  //移动速度
        if(bg.x< -bg.width+1){
            bg.x += bg.width*2-2;  //调整出现黑边的问题
        }
    }

    bg2Move(bg: cc.Node) {
        bg.x -= backGroundSpeed2;
        if(bg.x< -bg.width){
            bg.x += bg.width*2;
        }
    }

    bg3Move(bg: cc.Node) {
        bg.x -= backGroundSpeed3;
        if(bg.x< -bg.width){
            bg.x += bg.width*2-2;
        }
    }
    callBackFunc() {
        this.animationHero.play('Run');


    }

    touchStart() {  //滑行动作按下
        if (this.animationHero.currentClip.name != 'Run') {
            return
        }
        cc.log('touchStart');
        this.animationHero.play('Roll');
        this.animationHero.node.setPosition(cc.v2(-123, -58));
    }

    touchEnd() {  //滑行动作放开
        if (this.animationHero.currentClip.name != 'Roll') {
            return
        }
        cc.log('touchEnd');
        this.animationHero.play('Run');
        this.animationHero.node.setPosition(cc.v2(-123, -50));


    }

    onAnimationChang(target, data) {
        if (data == 'Jump') {
            if (this.animationHero.currentClip.name == 'Jump') {  //防止连续跳跃
                return
            }
            let actionTo = cc.jumpTo(1, cc.v2(-123, -50), 70, 1);  //设置跳跃(持续时间,起跳位置, 起跳高度, 跳几次)
            let callBack = cc.callFunc(this.callBackFunc, this);  // 用于还原跑步动作
            let seq = cc.sequence(actionTo, callBack);
            this.animationHero.node.runAction(seq);
            this.animationHero.play(data);
        }


    }


}
