/*
 *公告列表
 */
define(['jquery', 'underscore', 'domReady', 'common', 'IScrollLoadData',
    'text!' + window.basePath + 'html/tpl/demo/pull-to-refresh.tpl'
], function($, _, domReady, common, IScrollLoadData, tpl) {

    function Test() {
        this._init();
        this._initEvent();
    }

    Test.prototype = {
        _init: function() {
            var self = this;

            appView.html(tpl);

            domReady(function() {
                loadingView.hide();
            });

            /*这里要注意，必须将_bindScroll方法绑定在onload事件上，
            onload事件才是真正的页面或图像加载完成*/
            window.onload = self._bindScroll();
        },
        //绑定滚动,iscroll上拉加载下拉刷新
        _bindScroll: function() {
            var self = this,
                wrapper = $('.ui-scroller-wrapper')[0];

            self.listScroll = IScrollLoadData(wrapper,self._pullDownAction.bind(self),self._pullUpAction.bind(self));
            
            //手指在屏幕上滑动的时候连续地触发
            wrapper.addEventListener('touchmove',function(e){
                e.preventDefault();
            },false);

            //刷新listScroll
            self.listScroll._scrollRefresh();
        },
        //下拉刷新数据
        _pullDownAction:function(){
            var self = this;

            //这里写下拉刷新的方法

            //刷新listScroll
            self.listScroll._scrollRefresh();
        },
        //上拉加载数据
        _pullUpAction:function(){
            var self = this;

            //这里写上拉加载数据的方法

            //刷新listScroll
            self.listScroll._scrollRefresh();
        },
        _initEvent: function() {

        }
    };

    return function() {
        new Test();
    };
});
