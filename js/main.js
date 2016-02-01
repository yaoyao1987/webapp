
'use strict';

/*
 * 文件依赖
 */

require.config({
    paths: {
        jquery:'libs/jquery-2.2.0.min',
        director: 'libs/director',
        domReady:'libs/require/domReady',
        text:'libs/require/text',       //用于requirejs导入html类型的依赖
        css:'libs/require/css',         //用于requirejs导入css类型的依赖
        underscore: 'libs/underscore',
        fastclick:'libs/fastclick',
        common:'util/common',
        router:'router'
    },
    //引入非AMD写法的类库。
    shim: {         
        'director': {
            exports: 'Router'
        },
        'underscore': {
            exports: '_'
        },
        'dialog':{
            deps: ['jquery'],
            exports: 'dialog'
        }
    }
});

require(['jquery','router','common','fastclick'], function ($,router,common,fastclick){
    
    window.appView = $('#container');      //用于各个模块控制视图变化
    window.loadingView = $('#loading'); //页面加载loading
    // window.basePath = 'file:///project/js/webapp/';  //路径
    // window.basePath = 'http://m.kxlapp.com/IPark2.0/';  //路径
    router.init();                      //开始监控url变化

    // fastclick.attach(document.body);
});