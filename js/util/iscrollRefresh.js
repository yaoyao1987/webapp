;
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery', 'underscore', 'IScroll'], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function($, _, IScroll) {
    "use strict";

    /**
     * wrapper        要渲染滚动实例的位置
     * list           list
     * pulldownAction 下拉执行的逻辑
     * pullupAction   上拉执行的逻辑
     * opts           滚动个性化参数 
     */
    function IscrollRefresh(wrapper, pulldownAction, pullupAction, opts) {
        this.wrapper = wrapper; //要渲染滚动实例的位置
        this.pulldownAction = pulldownAction; //下拉执行的逻辑
        this.pullupAction = pullupAction; //上拉执行的逻辑
        this.dir = opts ? (opts.dir ? opts.dir : false) : false; //横向还是竖向滚动,1代表横向，0代表竖向
        this.allowPullDown = opts ? (opts.hasOwnProperty('allowPullDown') ? opts.allowPullDown : true) : true; //允许下拉刷新
        this.allowPullUp = opts ? (opts.hasOwnProperty('allowPullUp') ? opts.allowPullUp : true) : true; //允许上拉加载
        this.pullDir = null; //上拉还是下拉
        this.listScroll = null; //iscroll对象
        this.isRefresh = false; //当前是否允许刷新或加载
        this.allowTime = 1e3; //1s之后才能刷新
        this._init();
        this._initEvent();
    }

    IscrollRefresh.prototype = {
        //初始化
        _init: function() {
            var self = this,
                wrapper = self.wrapper,
                _scrollX = self.dir ? true : false,
                _scrollY = !_scrollX;

            self.listScroll = new IScroll(wrapper, {
                scrollX: _scrollX,
                scrollY: _scrollY,
                preventDefault: false,
                tap: true
            });
        },
        //初始化事件
        _initEvent: function() {
            var self = this,
                listScroll = self.listScroll;

            listScroll.on('scrollMove', self._scrollMoveHandler.bind(self));
            listScroll.on('scrollEnd', self._scrollEndHandler.bind(self));
            listScroll.on('refresh', self._scrollRefreshHandler.bind(self));
        },
        //滚动中
        _scrollMoveHandler: function() {
            var self = this,
                wrapper = self.wrapper,
                $wrapper = $(wrapper),
                isRefresh = self.isRefresh,
                listScroll = self.listScroll,
                allowPullDown = self.allowPullDown,
                allowPullUp = self.allowPullUp,
                allowTime = self.allowTime,
                lastUpdateTime = $(wrapper).attr('data-updatetime'),
                nowTime = (new Date()).getTime();

            //允许下拉刷新
            if (allowPullDown) {

                $wrapper.addClass('ui-list-pulldown');

                //如果下拉的高度大于等于50）并且滑动方向是向下的,设置为可以下拉刷新
                if (listScroll.y > 50 && listScroll.directionY === -1) {

                    self.pullDir = 'pulldown';
                }
                //如果没到达到指定下拉距离的时候,设置不能刷新
                else if (listScroll.y < 50 && listScroll.y >= 0 && listScroll.directionY === -1) {
                    //
                }
            } else {
                $wrapper.removeClass('ui-list-pulldown');
            }

            //允许上拉加载
            if (allowPullUp) {

                if (listScroll.directionY === 1) {
                    $wrapper.find('.ui-list-pullup').removeClass('hide');
                }

                if ((listScroll.y <= (listScroll.maxScrollY - 5)) && listScroll.directionY === 1) {
                    //设置显示上拉样式
                    self.pullDir = 'pullup';
                    console.log('允许上拉');
                } else if ((listScroll > (listScroll.maxScrollY - 5)) && listScroll.y < listScroll.maxScrollY && listScroll.directionY === 1) {
                    console.log('我在上拉');
                }
            }

            //判断当前是否允许刷新或加载
            if (isRefresh) {
                return false;
            }

            //当前时间与最后更新时间相差一定间隔以上才能继续更新
            if (lastUpdateTime && (nowTime - lastUpdateTime < allowTime)) {
                self.isRefresh = true;
                isRefresh = true;
            } else if (lastUpdateTime && (nowTime - lastUpdateTime > allowTime)) {
                self.isRefresh = false;
                isRefresh = false;
            }
        },
        //结束滚动
        _scrollEndHandler: function() {
            var self = this,
                isRefresh = self.isRefresh,
                pullDir = self.pullDir,
                wrapper = self.wrapper,
                $wrapper = $(wrapper),
                listScroll = self.listScroll,
                pulldownAction = self.pulldownAction,
                pullupAction = self.pullupAction;

            $wrapper.find('.ui-list-pullup').addClass('hide');

            //判断当前是否在加载中
            if (isRefresh) {
                return false;
            }

            //当前操作是下拉
            if (pullDir === 'pulldown') {
                console.log('pulldown');

                if (typeof pulldownAction === 'function') {
                    pulldownAction.call(self);
                }
            }
            //当前操作是上拉
            else if (pullDir === 'pullup') {
                console.log('pullup');
                pullupAction.call(self);
            }
        },
        //刷新listscroll
        _scrollRefreshHandler: function() {
            var self = this,
                wrapper = self.wrapper,
                $wrapper = $(wrapper);

            $wrapper.attr('data-updatetime', (new Date()).getTime());
            self.isRefresh = false;
        },
        _scrollRefresh: function() {
            var self = this,
                listScroll = self.listScroll;

            listScroll.refresh();
        }
    };

    return function(wrapper, pulldownAction, pullupAction, opts) {
        return new IscrollRefresh(wrapper, pulldownAction, pullupAction, opts);
    };

}));
