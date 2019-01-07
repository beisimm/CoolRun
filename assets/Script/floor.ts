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


    @property
    text: string = 'hello';

    @property(cc.Prefab)
    floor: cc.Prefab = []

    @property(cc.Node)
    floorMove: cc.Node = null

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.floorCreate()
        this.floorCreate()

    }

    start() {

    }

    floorStartX = 0  //地板起始位置
    floorCreate() {
        //添加地板块左侧
        let floorleft = cc.instantiate(this.floor[0])
        floorleft.x = this.floorStartX  //改变创建地板的位置
        this.floorMove.addChild(floorleft)
        this.floorStartX += floorleft.width - 1 //地板位置修正

        for (let i = 0; i < Math.random() * 10 + 1; i++) {
            //添加地板块中间
            let floorMid = cc.instantiate(this.floor[1])
            floorMid.x = this.floorStartX  //改变创建地板的位置
            this.floorMove.addChild(floorMid)
            this.floorStartX += floorMid.width - 1
        }

        //添加地板块右侧
        let floorRight = cc.instantiate(this.floor[2])
        floorRight.x = this.floorStartX  //改变创建地板的位置
        this.floorMove.addChild(floorRight)
        this.floorStartX += floorRight.width - 1

        cc.log(this.floorStartX)
        this.floorStartX += Math.random() * 100  //随机出现断崖
    }

    num = 0

    update(dt) {
        this.num += dt * floorSpeed4
        this.floorMove.x -= dt * floorSpeed4  //地板的移动
        if (this.num > 500) {  // 每移动一个屏幕的距离绘制一次地板
            this.floorCreate()
            this.num = 0
        }
    }
}
  