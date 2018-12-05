// pages/myinfo/range/range.js
Page({
  /**
   * 绑定页面初始数据
   */
  data: {

    /**文章主内容 */
    article: [],

    /**激活的Tab */
    activeTab: 0,
    activeTabIndex: 'index',

    /**Swiper高度 */
    swiperHeight: '',

    /**获取更多btn */
    getmore: true,

    /**分页起始值，每次分页会加上分页长度 */
    range_start: 0,

    /**分页长度 */
    range_length: 10
  },
  
  /**
   * 页面加载事件
   */
  onLoad: function () {
    this.setSwiperHeight();
    this.indexRequest(false);
  },

  /**
   * 加载更多事件
   */
  loadMoreItems: function () {
    this.indexRequest(true);
  },

  /**
   * Tab点击事件
   * @param e Object 事件原型
   */
  rcbBottomTab: function(e) {
    //通过设置当前点击事件的data,更新Swiper.current参数
    this.setData({
      activeTab: e.currentTarget.dataset.index
    })
  },

  /**
   * Swiper滑动事件
   * @param e Object 事件原型
   */
  swiperChange: function(e) {
    //通过更新Data分别设置当前的Tab数字索引和英文索引
    var activeTab = e.detail.current;
    var activeTabIndex = e.detail.currentItemId
    this.setData({
      activeTab: activeTab,
      activeTabIndex: activeTabIndex
    })
  },

  /**
   * 点击列表进入详情事件
   * @param e Object 事件原型
   * @var tapEvent  Object 获取点击回调的事件数据
   * @var classIndex String 需要进入的Tab索引
   * @var artIndex String 需要进入的列表项目索引
   * @var cid Int 文章id
   */
  bindCardViewTap: function(event) {
    var tapEvent = event.currentTarget.dataset;
    var classIndex = tapEvent.classindex;
    var artIndex = tapEvent.artindex;
    var cid = tapEvent.cid;
    wx.navigateTo({
      url: '../detail/detail?classindex=' + classIndex + '&artindex=' + artIndex + '&cid=' + cid
    })
  },

  /**
   * 动态设置Swiper高度
   */
  setSwiperHeight: function() {
    var info = wx.getSystemInfoSync();
    this.setData({
      swiperHeight: info.windowHeight - 45
    })
  },

  /**
   * 首页数据请求方法
   * @param divPage Bool 是否分页模式
   * @var data Object POST的数据参数
   */
  indexRequest: function(divPage) {
    //分页模式
    if (divPage) {
      var data = {
        cid: -1,
        range_start: this.data.range_start,
        num: this.data.range_length,
        tab: "'" + this.data.activeTabIndex + "'",
        getmore: true
      }
    }
    //初次加载
    if (!divPage) {
      var data = {
        cid: -1,
        range_start: 0,
        num: this.data.range_length,
        getmore: false
      }
    }
    var that = this;
    //分页加载状态
    //success回调函数中取消
    wx.showLoading({
      title: '加载中'
    })
    //请求
    wx.request({
      url: 'https://blog.ideacom.cn/api/public/index.php/index/index/get_index',
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        //成功->设置下一次分页的起始页
        var range_end = that.data.range_start + that.data.range_length;

        //分页加载无更多内容时提示
        if (res.data.status == 'null') {
          wx.showToast({
            title: '后面没有啦！',
            icon: 'none',
            duration: 1500
          })
          return
        }

        //初次加载模式
        if (!divPage) {
          that.setData({
            range_start: range_end,
            article: res.data
          })
        } else {
          //分页加载模式
          //分页前的数据
          var preData = that.data.article;
          
          //新增数据入栈
          for (var i = 0; i < res.data.length; i++) {
            preData.content[that.data.activeTabIndex].push(res.data[i]);
            that.setData({
              range_start: range_end,
              article: preData
            })
          }

        }
        //直接进行缓存
        wx.setStorage({
          key: 'article',
          data: that.data.article
        })
        //取消加载状态
        wx.hideLoading();
      },
      fail:function(res){
        wx.showToast({
          title: '获取数据失败，请重试',
          icon: 'none',
          duration: 1500
        })
        //取消加载状态
        wx.hideLoading();
      }
    });
  },
})