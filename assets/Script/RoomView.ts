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
import Prefab = cc.Prefab;

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
    MainView: cc.Node = null

    @property(cc.Node)
    RoomHeroShow: cc.Node = null

    @property(cc.Label)
    coinLabel: cc.Label = null

    @property(cc.Label)
    jewelLabel: cc.Label = null

    @property(cc.Node)
    PlayerViewContent: cc.Node = null

    @property(cc.Prefab)
    Prefa: cc.Prefab = null


    @property(cc.Prefab)
        // @ts-ignore
    HeroPrefaList: cc.Prefab = []

    @property(cc.Prefab)
    btnOkPrefab: cc.Prefab = null

    @property(cc.Prefab)
    coinShopPrefab: cc.Prefab = null

    @property(cc.Prefab)
    jewelShopPrefab: cc.Prefab = null

    @property(cc.Node)
    PlayView: cc.Node = null

    @property(cc.Node)
        // @ts-ignore
    btnLeftNodeBack: cc.Node = []

    @property(cc.Button)
    btnStartGame: cc.Button = null;

    // LIFE-CYCLE CALLBACKS:
    addHeroNodeFrefab(Node, Prefab) {
        this.RoomHeroShow.removeAllChildren()

        let heroPrefa = cc.instantiate(Prefab)
        Node.addChild(heroPrefa)
    }

    onLoad() {
        this.onShowMainView()  //初始化RoomView
        for (let key in HeroInfo) {
            let newPrefa = cc.instantiate(this.Prefa)  //实例化HeroList的背景, 这里他已经是个node了
            this.addHeroNodeFrefab(newPrefa, this.HeroPrefaList[HeroInfo[key].ID])  //通过HeroID拿到Hero
            if (HeroInfo[key].isHave) {  //判断是否已经购买,展示不同的按钮
                var btnOk = cc.instantiate(this.btnOkPrefab)
                newPrefa.addChild(btnOk)
                btnOk.on(cc.Node.EventType.TOUCH_START, this.onHeroSelect, HeroInfo[key].ID.toString())
            } else {
                var btnCoin = cc.instantiate(this.coinShopPrefab)  //通过Prefab实例获取节点
                var btnJewel = cc.instantiate(this.jewelShopPrefab)
                let CoinNode = btnCoin.getChildByName('NODE') //通过子节点的名字获取子节点
                let JewelNode = btnJewel.getChildByName('NODE')
                // let CoinLabel = CoinNode.getComponent(cc.Label)  //获取子节点的Label
                // CoinLabel.string = HeroInfo[key].coinPrice.toString()
                // JewelLabel.string = HeroInfo[key].jewelPrice.toString()
                // @ts-ignore
                this.changeNodeLabel(CoinNode, HeroInfo[key].coinPrice)
                // @ts-ignore
                this.changeNodeLabel(JewelNode, HeroInfo[key].jewelPrice)
                newPrefa.addChild(btnCoin)
                newPrefa.addChild(btnJewel)
            }

            this.PlayerViewContent.addChild(newPrefa)
        }
        // @ts-ignore
        // for (let i = 0; i < window.HeroID.length; i++) {  // 根据角色数量绘制展示用的英雄选择
        //     let newPrefa = cc.instantiate(this.Prefa)  //实例化HeroList的背景, 这里他已经是个node了
        //     this.addHeroNodeFrefab(newPrefa, this.HeroPrefaList[i])
        //     var btnOk = cc.instantiate(this.btnOkPrefab)
        //     newPrefa.addChild(btnOk)
        //     this.PlayerViewContent.addChild(newPrefa)
        //     btnOk.on(cc.Node.EventType.TOUCH_START, this.onHeroSelect, i.toString())
        // }
        // @ts-ignore
        this.addHeroNodeFrefab(this.RoomHeroShow, this.HeroPrefaList[window.SelectHeroID])  //在视图里根据用户选择的角色id进行渲染
        // @ts-ignore
        this.coinLabel.string = window.coin.toString()  //显示金币数量
        // @ts-ignore
        this.jewelLabel.string = window.jewel.toString()  // 显示钻石数量

        // @ts-ignore
        for (let i = 0; i < this.btnLeftNode.length; i++) {  //通过点击让下方呈现按压颜色
            this.btnLeftNode[i].on(cc.Node.EventType.TOUCH_START, this.onTouchActive, this.btnLeftNodeBack[i]);
            this.btnLeftNode[i].on(cc.Node.EventType.TOUCH_END, this.onTouchHide, this.btnLeftNodeBack[i]);
            this.btnLeftNode[i].on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchHide, this.btnLeftNodeBack[i]);
        }

    }

    start() {

    }

    changeNodeLabel(Node:Node, value:number){  //通过Node直接改变其中Label组件的值
        // @ts-ignore
        Node.getComponent(cc.Label).string = value.toString()
    }

    // update (dt) {}
    onHeroSelect() {  //用来修改选择英雄的

        let num = Number(this)
        // @ts-ignore

        window.SelectHeroID = this
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
        // @ts-ignore
        this.active = true
    }

    onTouchHide() {

        // @ts-ignore
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

    onShowMainView() {
        this.MainView.active = true
        this.PlayView.active = false
        // @ts-ignore
        this.addHeroNodeFrefab(this.RoomHeroShow, this.HeroPrefaList[window.SelectHeroID])  //切换主界面显示的Hero
    }

    onAddCoinNumber() {
        // @ts-ignore
        window.coin += 100
        // @ts-ignore
        if (window.coin > 10000) {
            // @ts-ignore
            this.coinLabel.string = (window.coin / 10000) + '万'
        }
        // @ts-ignore
        this.coinLabel.string = window.coin.toString()
    }

    onAddJewelNumber() {
        // @ts-ignore
        window.jewel += 100
        // @ts-ignore
        if (window.jewel > 10000) {
            // @ts-ignore
            this.jewelLabel.string = (window.jewel / 10000) + '万'
        }
        // @ts-ignore
        this.jewelLabel.string = window.jewel.toString()
    }

    onShowPlayerView() {
        this.MainView.active = false
        this.PlayView.active = true
    }

    onGameStart() {  //切换场景
        this.onOutRange()
        setTimeout(function () {  //实现动画效果结束之后再切换场景
            cc.director.loadScene("GameScene")

        }, 800);
    }


}
