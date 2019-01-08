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
        if (self.tag == HeroTag && other.tag == DieTag) { //死亡碰撞
            cc.log('游戏结束')
            HeroAnim.stop()
            isGameRun = false
            returnHall.active = true
        }
        if (self.tag == HeroTag && other.tag == FloorTag) { //地板碰撞
            self.node.stopAllActions()  //终止跳跃的动作
            jumpNum = 0 //跳跃计数清零
            downSpeed = 0
        }
        if (self.tag == HeroTag && other.tag == FloorTag && HeroAnim.currentClip.name == window.Jump) { //地板碰撞
            HeroAnim.play(Run)  //这里独立出来是针对跳跃动作的

        }
        if (self.tag == HeroTag && other.tag == Wall) {  //撞墙了
            window.cllisionWall = true
            cc.log(self.node.x)
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
        if (self.tag == HeroTag && other.tag == Wall) {  //没有撞墙了
            window.cllisionWall = false
        }
    },


    update: function (dt) {
        window.Hero.y -= dt * 60 * downSpeed


    },
});
