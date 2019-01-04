// 公共数据, 这里的数据以后由数据库提供
window.HeroID = []  //英雄ID
HeroID.push(0)
HeroID.push(1)
HeroID.push(2)

var HeroInfo = {}
HeroInfo.Hero_0 = {
    ID : 0,
    coinPrice:0,
    jewelPrice:0,
    detail:'默认角色',
    isHave:true
}
HeroInfo.Hero_1 = {
    ID : 1,
    coinPrice:500,
    jewelPrice:50,
    detail:'身材火爆的魔鬼御姐',
    isHave:false
}
HeroInfo.Hero_2 = {
    ID : 2,
    coinPrice:800,
    jewelPrice:800,
    detail:'被绿了,当然是选择原谅他',
    isHave:false
}
window.SelectHeroID = 1 //选择的英雄id

window.coin = 10000 //金币数量
window.jewel = 100 //钻石数量