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
import Label = cc.Label;

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
    warnWindow: cc.Node = null

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
    addHeroNodeFrefab(Node, Prefab) {  //先清空Node的子节点, 然后再通过Prefab插入子节点
        Node.removeAllChildren()
        let heroPrefa = cc.instantiate(Prefab)
        Node.addChild(heroPrefa)
    }

    onLoad() {
        this.onShowMainView()  //初始化RoomView
        for (let key in HeroInfo) {
            let newPrefa = cc.instantiate(this.Prefa)  //实例化HeroList的背景, 这里他已经是个node了
            this.addHeroNodeFrefab(newPrefa, this.HeroPrefaList[HeroInfo[key].ID])  //通过HeroID拿到Hero作为HeroList展示用
            var btnOk = cc.instantiate(this.btnOkPrefab)
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
            newPrefa.addChild(btnOk)
            newPrefa.addChild(btnCoin)
            newPrefa.addChild(btnJewel)
            // @ts-ignore
            if (HeroInfo[key].isHave && window.SelectHeroID == HeroInfo[key].ID) {
                btnOk.active = true
                btnCoin.active = false
                btnJewel.active = false
            } else {
                btnOk.active = false
                btnCoin.active = true
                btnJewel.active = true
            }

            btnOk.on(cc.Node.EventType.TOUCH_START, this.onHeroSelect, [btnOk, HeroInfo[key], HeroInfo])
            btnOk.on(cc.Node.EventType.TOUCH_END, this.onHeroSelect, [btnOk, HeroInfo[key], HeroInfo])
            btnCoin.on(cc.Node.EventType.TOUCH_START, this.onShop, [btnOk, HeroInfo[key], btnCoin, btnJewel, 'btnCoin', this.coinLabel, this.warnWindow])
            btnJewel.on(cc.Node.EventType.TOUCH_START, this.onShop, [btnOk, HeroInfo[key], btnCoin, btnJewel, 'btnJewel', this.jewelLabel, this.warnWindow])
            this.PlayerViewContent.addChild(newPrefa)
        }
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

    // update (dt) {}


    changeNodeLabel(Node: Node, value: number) {  //通过Node直接改变其中Label组件的值
        // @ts-ignore
        Node.getComponent(cc.Label).string = value.toString()
    }

    onHeroSelect() {  //用来修改选择英雄的, 然后把按钮隐藏掉
        let nodes = this[0].parent.parent.children  //查找兄弟节点
        for (let i = 0; i < nodes.length; i++) {
            let have = HeroInfo['Hero_' + i].isHave;

            let nodeOK = nodes[i].getChildByName('btnOK')
            // @ts-ignore
            if (i == window.SelectHeroID) {  //如果是你选择的角色, 而且有那么不显示确定按钮
                nodeOK.active = false
                // @ts-ignore
            } else if (i != window.SelectHeroID && have) {
                nodeOK.active = true

            }
        }
        // @ts-ignore
        window.SelectHeroID = this[1].ID
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

    onCloseWarn() {
        this.warnWindow.active = false
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
        } else {
            // @ts-ignore
            this.coinLabel.string = window.coin.toString()
        }

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


    onShop() {  //点击购买
        let warnLabel = this[6].getChildByName('Label').getComponent(Label);
        if (this[4] == "btnCoin") {
            // @ts-ignore
            if (this[1].coinPrice < window.coin) {
                // @ts-ignore
                window.coin -= this[1].coinPrice
                // @ts-ignore
                this[5].string = window.coin.toString()
                this[2].active = false
                this[3].active = false
                this[1].isHave = true
                this[0].active = true
            } else {

                warnLabel.string = '你的金币不足\n还差' + (this[1].coinPrice - window.coin) + '金币,请充值'

                this[6].active = true
            }

        } else if (this[4] == "btnJewel") {
            // @ts-ignore
            if (this[1].jewelPrice < window.jewel) {
                // @ts-ignore
                window.jewel -= this[1].jewelPrice  //这里出过一个坑, 你要拆分成两步来写,如果只写一步的话就没有给全局的jewel赋值
                // @ts-ignore
                this[5].string = window.jewel.toString()
                this[2].active = false
                this[3].active = false
                this[1].isHave = true
                this[0].active = true
            } else {

                warnLabel.string = '你的钻石不足\n还差' + (this[1].jewelPrice - window.jewel) + '钻石,请充值'
                this[6].active = true


            }
        }
    }

}
