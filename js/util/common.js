/*
通用
*/
define(['jquery'], function($) {
    'use strict';

    var Sys = {};

    /**
    	Sys 直接属性: 大写驼峰命名
    	Sys 直接属性的子属性: 小写驼峰命名
    */

    //
    Sys.HOST = "http://" + window.location.host;

    /**
     * 判断传入的值是否为空
     * @param html {} 传入值
     * @param 返回true/false
     */
    Sys.isBlank = function(s) {
        return (!s || $.trim(s) === "");
    };

    /**
     * 重写浏览器默认方法
     */
    Sys.stopPropagation = function(e) {
        var evt = e || window.event;
        //IE用cancelBubble=true来阻止而FF下需要用stopPropagation方法
        evt.stopPropagation ? evt.stopPropagation() : (evt.cancelBubble = true);
    };

    /**
     * 美化checkbox控件
     * @param options {DOM}
     */
    Sys.iCheckbox = function($dom, fnCallback, sSel) {
        $dom.on("click", Sys.isBlank(sSel) ? '.answers-checkbox li' : sSel, function(e) {
            e.stopPropagation();
            var optionItem = $(this);
            if (!optionItem.find("input:checkbox").is(":checked")) {
                optionItem.addClass("selected");
                optionItem.find("input:checkbox")[0].checked = true;
            } else {
                optionItem.removeClass("selected");
                optionItem.find("input:checkbox")[0].checked = false;
            }
            $.isFunction(fnCallback) && fnCallback.call(optionItem, e);
        });
    };

    //系统的自建消息队列
    Sys.mq = (function() {
        var messageQuery = {};

        var validName = function(name) {
            if (!/^\S+$/.test(name))
                throw new Error("执行器名称: " + name + " 不能为存在空格");
        };
        return {
            add: function(name, fn, me) {
                validName(name);
                if (!!messageQuery[name])
                    throw new Error("执行器名称: " + name + " 已经存在, 请先删除");
                //如果传入的me对象为空, 则使用window
                if (!me)
                    me = window;
                messageQuery[name] = {
                    fn: fn,
                    me: me
                };
            },
            del: function(name) {
                validName(name);
                //清除
                delete messageQuery[name];
            },
            exec: function(name) {
                validName(name);
                var bag = messageQuery[name];
                if (!bag || $.type(bag.fn) != 'function')
                    throw new Error("执行器名称: " + name + "对应的function 不存在, 或者错误");
                var arr = [];
                //不采用第一个参数, 因为第一个参数是执行器的名称
                for (var i = 1; i < arguments.length; ++i)
                    arr.push(arguments[i]);
                //调用它
                return bag.fn.apply(bag.me, arr);
            }
        };

    })();

    Sys.AmapKey = function() {
        return "895670b313d78b4db4c5f15b60b86e54";
    };
    return Sys;
});
