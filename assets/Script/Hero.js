cc.Class({
    extends: cc.Component,
    properties: {},

    // use this for initialization
    onLoad: function () {

        cc.director.getCollisionManager().enabled = true;  //开启碰撞检测
        cc.director.getCollisionManager().enabledDebugDraw = true;  //开启碰撞区域显示
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;//开启碰撞边框显示
    },

    onCollisionEnter: function (other, self) {  //发生碰撞时
        // cc.log('self', self)
        // cc.log('other', other)
        if (self.tag == HeroTag && other.tag == DieTag) { //死亡碰撞
            cc.log('游戏结束')
            HeroAnim.stop()
            isGameRun = false
            returnHall.active = true
        }
        if (self.tag == HeroTag && other.tag == FloorTag) { //地板碰撞
            self.node.stopAllActions()
            jumpNum = 0
            downSpeed = 0
        }
        if (self.tag == HeroTag && other.tag == FloorTag && HeroAnim.currentClip.name == window.Jump) { //地板碰撞
            HeroAnim.play(Run)

        }

    },

    onCollisionStay: function (other, self) {  //碰撞结束前
        if (self.tag == HeroTag && other.tag == FloorTag) { //停止往下落
            downSpeed = 0
        }

    },

    onCollisionExit: function (other, self) {  //碰撞结束时
        if (self.tag == HeroTag && other.tag == FloorTag) { //往下落
            downSpeed = 1
        }
    },


    update: function (dt) {

        window.Hero.y -= dt * 60 * downSpeed

    },
});
