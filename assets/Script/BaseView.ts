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

    // LIFE-CYCLE CALLBACKS:


    onLoad() {
        this.animationHero.play('Run');
        this.btnRoll.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.btnRoll.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.btnRoll.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);

    }

    start() {

    }

    // update (dt) {}

    callBackFunc() {
        this.animationHero.play('Run');


    }

    touchStart() {
        if (this.animationHero.currentClip.name != 'Run') {
            return
        }
        cc.log('touchStart');
        this.animationHero.play('Roll');
        this.animationHero.node.setPosition(cc.v2(-123, -58));
    }

    touchEnd() {
        if (this.animationHero.currentClip.name != 'Roll') {
            return
        }
        cc.log('touchEnd');
        this.animationHero.play('Run');
        this.animationHero.node.setPosition(cc.v2(-123, -50));


    }

    onAnimationChang(target, data) {
        if (data == 'Jump') {
            if (this.animationHero.currentClip.name == 'Jump') {
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
