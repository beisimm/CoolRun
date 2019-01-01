// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // @ts-ignore
    @property(cc.Node)
    btnRightNode: cc.Node = [];
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
    }

    onInRange() {
        for (let i = 0; i < this.btnRightNode.length; i++) {
            cc.log('now' + this.btnRightNode[i]);
            let mTo = cc.moveTo(0.3,0,this.btnRightNode[i].y);
            let dely = cc.delayTime(0.5*i);
            let sqe = cc.sequence(dely,mTo);
            this.btnRightNode[i].runAction(sqe);
        }
    }

    onOutRange() {

        for (let i = 0; i < this.btnRightNode.length; i++) {
            cc.log('now' + this.btnRightNode[i]);
            let mTo = cc.moveTo(0.3,163,this.btnRightNode[i].y);
            let dely = cc.delayTime(0.5*i);
            let sqe = cc.sequence(dely,mTo);
            this.btnRightNode[i].runAction(sqe);
        }
    }

    // update (dt) {}
    onSwitchScene() {  //切换场景
        cc.director.loadScene("GameScene");
    }
}
