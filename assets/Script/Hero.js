cc.Class({
    extends: cc.Component,

    // use this for initialization
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        // this.touchingNumber = 0;
    },

    onCollisionEnter: function (other, self) {
        cc.log('self',self)
        cc.log('other',other)
        if (self.tag == HeroTag && other.tag == DieTag) { //死亡碰撞
            cc.log('游戏结束')
            HeroAnim.stop()
            isGameRun = false
        }

        downSpeed = 0
    },

    onCollisionStay: function (other, self) {
        // console.log('on collision stay');
        downSpeed = 0

    },

    onCollisionExit: function (other, self) {

        cc.log(downSpeed)
        downSpeed = 1

    },

    // called every frame, uncomment this function to activate update callback

    update: function (dt) {

        window.Hero.y -= dt * 60 * downSpeed

    },
});
