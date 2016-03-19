/*
 *公告列表
 */
define(['jquery', 'underscore', 'domReady', 'common', 'IScrollLoadData',
    'text!' + window.basePath + 'html/tpl/demo/index.tpl',
    'hammer'
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
        _initEvent:function(){
            var self = this;

            $('.ui-list li').hammer().on('tap',_.debounce(function(e){
                var $this = $(this),
                    _href = $this.attr('data-href');

                _href && (window.location.hash = _href);
            },100));
        }
    };

    return function() {
        new Test();
    };
});
