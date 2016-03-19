/*
 *列表
 */
define(['jquery', 'underscore', 'domReady', 'common', 'IScrollLoadData',
    'text!' + window.basePath + 'html/tpl/demo/list.tpl'
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
        },
        _initEvent: function() {

        }
    };

    return function() {
        new Test();
    };
});
