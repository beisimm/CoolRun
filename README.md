# CoolRun
# cocos creator 安卓打包调试

![5cd3bf0e8cf92](https://i.loli.net/2019/05/09/5cd3bf0e8cf92.png)![5cd3bf0e8cf92](https://i.loli.net/2019/05/09/5cd3bf0e8cf92.png)

首先配置好Ndk和Sdk

![5cd3bf9d9927f](https://i.loli.net/2019/05/09/5cd3bf9d9927f.png)![5cd3bf9d9927f](https://i.loli.net/2019/05/09/5cd3bf9d9927f.png)

再进行项目的构建,编译

项目的构建勾选上调试模式

## 手机设置

手机打开调试模式

然后和电脑连接同一局域网

手机安装刚才构建编译的APK

## 电脑设置

电脑浏览器地址输入

```
chrome-devtools://devtools/bundled/inspector.html?v8only=true&ws=192.168.100.134:6086/00010002-0003-4004-8005-000600070008
```

中间的ip地址填的是手机分配的局域网地址
