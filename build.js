({
    appDir: './',
    baseUrl: './js',
    dir: './ddd',
    modules: [
        {
            name: 'main'
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true,
    paths: {
        jquery:'libs/jquery-2.2.0.min',
        director: 'libs/director',
        domReady:'libs/require/domReady',
        text:'libs/require/text',       //用于requirejs导入html类型的依赖
        css:'libs/require/css',         //用于requirejs导入css类型的依赖
        underscore: 'libs/underscore',
        fastclick:'libs/fastclick',
        common:'util/common',
        chart:'libs/Chart',
        IScroll:'libs/iscroll/iscroll-probe',
        IScrollLoadData:'libs/iscroll/iscroll-load-data',
        router:'router'
    },
    shim:{
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
})