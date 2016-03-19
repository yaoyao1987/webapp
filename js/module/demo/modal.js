/*
 *公告列表
 */
define(['jquery', 'underscore', 'domReady', 'common', 'IScrollLoadData',
    'text!' + window.basePath + 'html/tpl/demo/modal.tpl',
    'hammer','dialog'
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

            //alert
            $('.ui-alert').hammer().on('tap',function(){
                $.alert({
                    title:'alert',
                    buttons:[{
                        name:'知道了',
                        btnCss:'',
                        fun:null
                    }]
                });
            });

            //confirm
            $('.ui-confirm').hammer().on('tap',function(){
                $.confirm({
                    title:'confirm',
                    buttons:[{
                        name:'取消',
                        btnCss:'',
                        fun:null
                    },{
                        name:'确定',
                        btnCss:'',
                        fun:null
                    }]
                });
            });

            //prompt
            $('.ui-prompt').hammer().on('tap',function(){
                $.prompt({
                    title:'prompt',
                    buttons:[{
                        name:'取消',
                        btnCss:'',
                        fun:null
                    },{
                        name:'确定',
                        btnCss:'',
                        fun:null
                    }]
                });
            });

            //actions
            $('.ui-actions').hammer().on('tap',function(){
                $.actions({
                    buttons:[{
                        name:'出现',
                        btnCss:'',
                        fun:null
                    },{
                        name:'删除',
                        btnCss:'',
                        fun:null
                    },{
                        name:'取消',
                        btnCss:'',
                        fun:null
                    }]
                });
            });

            //toast
            $('.ui-toast').hammer().on('tap',function(){
                $.toast({
                    title:'toast'
                });
            });
        }
    };

    return function() {
        new Test();
    };
});
