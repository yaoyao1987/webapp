'use strict';

/*
 * 文件依赖
 */

require.config({
    paths: {
        jquery: 'libs/jquery-2.2.0.min',
        director: 'libs/director',
        domReady: 'libs/require/domReady',
        text: 'libs/require/text', //用于requirejs导入html类型的依赖
        css: 'libs/require/css', //用于requirejs导入css类型的依赖
        underscore: 'libs/underscore',
        hammerjs:'libs/hammer',
        hammer: 'libs/jquery.hammer',
        IScroll:'libs/iscroll/iscroll',
        IScrollLoadData: 'util/iscrollRefresh',
        common: 'util/common',
        dialog: 'util/modal',
        router: 'router'
    },
    //引入非AMD写法的类库。
    shim: {
        'director': {
            exports: 'Router'
        },
        'underscore': {
            exports: '_'
        },
        'IScroll': {
            exports: 'IScroll'
        },
        'IScrollLoadData': {
            exports: 'IScrollLoadData'
        }
    }
});

require(['jquery', 'router', 'common'], function($, router, common) {

    window.appView = $('#container'); //用于各个模块控制视图变化
    window.loadingView = $('#loading'); //页面加载loading
    window.basePath = 'file:///Users/yaolingyan/GitHub/webapp/';

    router.init(); //开始监控url变化
});
