/*
 *公告列表
 */
define(['jquery', 'underscore', 'domReady', 'common',
    'text!' + window.basePath + 'html/index/tpl/test.tpl',
    'css!' + window.basePath + 'css/module/test.css'
], function($, _, domReady, common, tpl) {

    function Test() {
        this._init();
        this._initEvent();
    }

    Test.prototype = {
        _init: function() {
            appView.html(tpl);

            domReady(function() {
                loadingView.hide();
            });
        },
        _initEvent: function() {
            $('.ui-input').on('focus', function() {
                $('.ui-textarea-container').removeClass('hide');
                $('.ui-textarea-container textarea').on('focus');
            });
        }
    };

    return function() {
        new Test();
    };
});
