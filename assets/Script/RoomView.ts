// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import delayTime = cc.delayTime;

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Node)
        // @ts-ignore
    btnRightNode: cc.Node = []

    @property(cc.Node)
        // @ts-ignore
    btnLeftNode: cc.Node = []

    @property(cc.Node)
        // @ts-ignore
    btnLeftNodeBack: cc.Node = []

    @property(cc.Button)
    btnStartGame: cc.Button = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        for(let i = 0; i<this.btnLeftNode.length;i++){  //通过点击让下方变颜色
            this.btnLeftNode[i].on(cc.Node.EventType.TOUCH_START, this.onTouchActive, this.btnLeftNodeBack[i]);
            this.btnLeftNode[i].on(cc.Node.EventType.TOUCH_END, this.onTouchHide, this.btnLeftNodeBack[i]);
            this.btnLeftNode[i].on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchHide, this.btnLeftNodeBack[i]);
        }

    }

    start() {
        // this.btnLeftNodeBack[0].active = false

    }

    onInRange() {
        // @ts-ignore
        for (let i = 0; i < this.btnRightNode.length; i++) {
            cc.log('now' + this.btnRightNode[i]);
            let mTo = cc.moveTo(0.2, 0, this.btnRightNode[i].y);
            let dely = cc.delayTime(0.5 * i);
            let sqe = cc.sequence(dely, mTo);
            this.btnRightNode[i].runAction(sqe);
        }
    }

    onTouchActive() {   
        this.active = true
    }
    onTouchHide(){
        this.active = false

    }

    onOutRange() {

        // @ts-ignore
        for (let i = 0; i < this.btnRightNode.length; i++) {
            cc.log('now' + this.btnRightNode[i])
            let mTo = cc.moveTo(0.2, 163, this.btnRightNode[i].y)
            let dely = cc.delayTime(0.3 * i)
            let sqe = cc.sequence(dely, mTo)
            this.btnRightNode[i].runAction(sqe)
        }
    }

    // update (dt) {}
    onGameStart() {  //切换场景
        this.onOutRange()
        setTimeout(function () {  //实现动画效果结束之后再切换场景
            cc.director.loadScene("GameScene")

        }, 800);
    }
}