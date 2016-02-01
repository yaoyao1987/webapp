/*
*路由控制
*/
define(['director','underscore'], function (Router,_) {

    /** 路由配置 */
    var routes = {
        'list': '../js/module/list.js'
    };

    var current = null;

    //用于把字符串转化为一个函数
    var routeHandler = function (config) {
        return function () {
            var url = config,
                params = arguments;
            $('#loading').show();

            require([url], function (controller) {
                if(current && current !== controller){
                    current.onRouteChange && current.onRouteChange();
                }
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