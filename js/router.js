/*
 *路由控制
 */
define(['director', 'underscore'], function(Router, _) {

    /** 路由配置 */
    var routes = {
        'demo/index':'../js/module/demo/index.js',
		'demo/list': '../js/module/demo/list.js',
        'demo/form': '../js/module/demo/form.js',
        'demo/modal': '../js/module/demo/modal.js',
        'demo/pull-to-refresh': '../js/module/demo/pullToRefresh.js'
    };

    var current = null;

    //用于把字符串转化为一个函数
    var routeHandler = function(config) {
        return function() {
            var url = config,
                params = arguments;
            $('#loading').show();

            require([url], function(controller) {

                current = controller;
                controller.apply(null, params);

            });
        };
    };

    for (var key in routes) {
        routes[key] = routeHandler(routes[key]);
    }

    return Router(routes);
});
