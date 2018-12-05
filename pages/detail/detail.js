// pages/edit/edit.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleCid: '',
    articleTitle: '',
    articleTag: [],
    articleAuthor: '',
    articleContext: '',
    articleTime: '',
    authorLogo: '',
    procData:''
    // Elment: {
    //     commentbox: '/icons/comments.png',
    //     commentbtn: '',
    //     favorite: '/icons/favorites.png',
    //     praise: '/icons/favorites.png',
    //     share: '/icons/share.png',
    //     CommentBoxText: '请输入评论',
    //     aboutitemTitle: '相关内容'
    // }
  },

  /**
   * 监听页面加载
   */
  onLoad: function(tapEvent) {
    this.readArticle(tapEvent);
    //进入详情的请求加载状态
    //在detail页面刷新data后取消Loading状态
    wx.showLoading({
      title: '加载中',
    })
  },
  // onShow:function() {
  //   //取消加载状态提示
  //   wx.hideLoading();
  // },
  /**
   * 读取缓存数据
   * @param tapEvent Object 传递的点击事件数据
   * @var classIndex String 需要进入的Tab索引
   * @var artIndex String 需要进入的列表项目索引
   * @var cid Int 文章id
   */
  readArticle: function(tapEvent) {
    var classIndex = tapEvent.classindex;
    var artIndex = tapEvent.artindex;
    var cid = tapEvent.cid;
    var that = this;

    //获取缓存
    wx.getStorage({
      key: 'article',
      success: function(res) {
        var article = res.data.content[classIndex][artIndex];
        that.setData({
          articleCid: article.cid,
          articleTitle: article.title,
          articleAuthor: article.screenName,
          articleTime: article.modified
        })

      },
      fail: function() {
        wx.showToast({
          title: '获取数据失败，请重试',
          icon: 'none',
          duration: 1500
        })
        //取消加载状态
        wx.hideLoading();
      }
    })
    //发送文章内容详情请求
    this.detailRequest(cid);
  },

  /**
   * 请求文章内容详情方法
   * @param cid Int 文章Id
   */
  detailRequest: function(cid) {
    var that = this;

    //请求
    wx.request({
      url: app.globalData.api.detail,
      data: {
        cid: cid,
        range_start: '-1',
        num: '1',
        getmore: false
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        //将markdown内容转换为towxml数据
        let data = app.towxml.toJson(res.data[0].text, 'markdown');
        //设置文档显示主题，默认'light'
        //data.theme = 'light';
        that.setData({
          articleContext: data
        })
        //取消加载状态
        wx.hideLoading();
      },
      fail: function() {
        wx.showToast({
          title: '获取数据失败，请重试',
          icon: 'none',
          duration: 1500
        })
        //取消加载状态
        wx.hideLoading();
      }
    });
  }
})