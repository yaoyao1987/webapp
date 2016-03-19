;
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'hammer'], factory);
    } else {
        factory(jQuery);
    }
}(function($, hammer) {
    "use strict";

    function modal(opts) {
        var i = 0,
            $dialog = null,
            opt = opts || {},
            len = opt.buttons ? opt.buttons.length : 0,
            buttonTemp = '',
            modalTemp = '<div class="ui-modal ui-modal-' + opt.type + '"><div class="ui-modal-content">';

        opt.title && (modalTemp += '<h3 class="ui-modal-title">'+opt.title+'</h3>');
        opt.text && (modalTemp += '<div class="ui-modal-text">'+opt.text+'</div>');
        (opt.type === 'prompt') && (modalTemp += '<div class="ui-modal-input"><input type="text" class="ui-input" /></div>');

        len && (buttonTemp += '<div class="ui-modal-buttons">');
        for (; i < len; i++) {
            var btnTemp = '<span class="ui-modal-button ' + opt.buttons[i].btnCss + '">' + opt.buttons[i].name + '</span>',
                $btn = $(btnTemp);
            buttonTemp += btnTemp;
        }
        len && (buttonTemp += '</div>');
        modalTemp += (buttonTemp + '</div></div>');
        $dialog = $(modalTemp);

        $dialog.find('.ui-modal-button').hammer().on("tap", _.debounce(function() {
            var i = $dialog.find('.ui-modal-button').index(this),
                fun = opt.buttons[i].fun;;
            if ((typeof fun).toLocaleLowerCase() == "function") {
                if (fun() !== false) {
                    if (opt.fun) opt.fun();
                    $dialog.remove();
                }
            } else {
                if (opt.fun) opt.fun();
                $dialog.remove();
            }
        }));

        return $dialog;
    }

    $.alert = function(opts) {

        var opt = $.extend({
            type: 'alert',
            title: "",
            text: "",
            buttons: []
        }, opts);

        var $alert = modal(opt);
        $("body").append($alert);
    };

    $.confirm = function(opts) {
        var opt = $.extend({
            type: 'confirm',
            title: "",
            text: "",
            buttons: []
        }, opts);

        var $confirm = modal(opt);
        $("body").append($confirm);
    };

    $.prompt = function(opts) {
        var opt = $.extend({
            type: 'prompt',
            title: "",
            text: "",
            buttons: []
        }, opts);

        var $prompt = modal(opt);
        $("body").append($prompt);
    };

    $.actions = function(opts) {
        var opt = $.extend({
            type: 'actions',
            title: '',
            text: '',
            buttons: null
        }, opts);

        var $actions = modal(opt);
        $("body").append($actions);
    };

    $.toast = function(opts) {
        var opt = $.extend({
            type: 'toast',
            title: '',
            text: '',
            icon: '',
            duration: 2e3, //toast时间
            buttons: null
        }, opts);

        var $toast = modal(opt);
        $("body").append($toast);

        $toast.find(".ui-modal-content").animate({ opacity: '0.0' }, opt.duration, function() {
            $toast.remove();
        });
    };
}));