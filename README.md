# Wblog client

#### 项目介绍
Wblog 是一个极简风格的微信小程序博客，那段时间非常喜欢玩博客，看到小程序性能也是非常不错，于是制作了这个小程序。
刚做完就出去工作了，一直没能整理放上来，这都快年底了才想起来QAQ


#### 内容说明
出于不要重复造轮子的思想，我没有再专门写后台面板。但是Wblog支持其他后台进行文章管理。

目前支持[Typecho](http://typecho.org/)进行文章管理。
虽然没有写专门的后端面板，但写了一套轻量级API进行数据交互[Wapi](https://github.com/Sanlings/wapi)


#### 安装教程

1. Clone项目到本地 
```
git clone https://github.com/Sanlings/wblog.git
```
2. 打开[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)。
3. 登陆后，导入项目。
4. 在`App.js`中配置相关API项、分页等。具体如下：
```
const _Gdata = {
    api: {
        // 获取openId, sessionKey, unionId接口
        verify: 'https://' ,
        
        // 获取初始化数据
        init: 'https://',
        
        // 获取文章内容
        detail: 'https://',
    },
    conf: {
        // 获取更多
        getmore: true,
        
        // 分页长度
        range_length: 15
    }
};
```

#### 使用说明

1. 需要结合Typecho来进行数据管理
2. WAPI内已经实现了所需API，只需做好相关部署即可
3. API务必是HTTPS的

#### 后续优化进度
- 抽离所有可配置的配置项（第一次写的时候时间比较少，没有做到完全抽离）
- 支持文章搜索
- 支持切换`Markdown`与`html`富文本切换
- 支持匿名评论功能
