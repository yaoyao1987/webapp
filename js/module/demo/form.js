/*
 *公告列表
 */
define(['jquery', 'underscore', 'domReady', 'common', 'IScrollLoadData',
    'text!' + window.basePath + 'html/tpl/demo/form.tpl',
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

            //弹出评论框
            $('.ui-input').on('focus',function(){
                $('.ui-textarea-container').removeClass('hide');
                $('.ui-textarea-container .ui-textarea').focus();
            });

            //点击mask隐藏
            $('.ui-mask').hammer().on('tap',_.debounce(function(e){
                var $this = $(this);
                //隐藏评论框
                $('.ui-textarea-container').addClass('hide');
            }));
        }
    };

    return function() {
        new Test();
    };
});
