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
     * 手机号码验证
     */
    Sys.isMobilePhone = function (value) {
        var b = false,
            reg = /^0{0,1}(13[0-9]|15[0-9]|14[0-9]|18[0-9])[0-9]{8}$/;
        if (!Sys.isBlank(value)) {
            b = reg.test(value);
        }
        return b;
    };

    /**
    * 座机号码验证
    */
    Sys.isTelPhone = function (value) {
        var b = false,
            reg = /(^(\d{2,4}[-_－—]?)?\d{3,8}([-_－—]?\d{3,8})?([-_－—]?\d{1,7})?$)|(^0?1[35]\d{9}$)/;
        if (!Sys.isBlank(value)) {
            b = reg.test(value);
        }
        return b;
    };

    /**
    * 验证网址
    */
    Sys.isWebsite = function (value) {
        var b = false,
            reg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
        if (!Sys.isBlank(value)) {
            b = reg.test(value);
        }
        return b;
    };

    /**
     * 验证email
     * @type {RegExp}
     */
    Sys.isEmail = function (value) {
        var b = false,
            emailReg =  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if (!Sys.isBlank(value)) {
            b = emailReg.test(value);
        }
        return b;
    };

    /**
     * 获得字符串的字符长度，中文两个字符，英文一个字符
     * @param str
     * @returns {*}
     */
    Sys.getBLen = function(str) {  
        if (str === null) return 0;  
        if (typeof str != "string"){  
            str += "";  
        }  
        return str.replace(/[^\x00-\xff]/g,"01").length;  
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
     * 数组去重(传入的数组都是降序排列的)
     * @param oldData 原数据
     * @param newData 新数据
     * @param 返回去重数组
     */
    Sys.goBack = function(data){
        if (data) {
            window.location.hash = data;
        }else{
            history.back();
        }
    };

    /**
     * 数组去重(传入的数组都是降序排列的)
     * @param oldData 原数据
     * @param newData 新数据
     * @param 返回去重数组
     */
    Sys.uinique = function(oldData, newData) {
        var lastOldData = _.last(oldData),
            firstNewData = _.first(newData),
            lastNewData = _.last(newData),
            result = [];

        if (lastOldData.createTime > firstNewData.createTime) {
            result = newData;
        } else if (lastOldData.createTime > lastNewData.createTime && lastOldData.createTime < firstNewData.createTime) {
            result = _.find(newData, function(obj) {
                return obj.createTime < oldData.createTime;
            });
        }

        return result;
    };

    /**
     * rgb颜色转换为hex,使用左移运算符
     * @param   
     * @return 返回hex
     */
    Sys.rgbToHex = function(color) {
        var arr = [],
            strHex;
        if (/^(rgb|RGB)/.test (color)) {
            arr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
            strHex = '#' + ((1 << 24) + (arr[0] << 16) + (arr[1] << 8) + parseInt(arr[2])).toString(16).substr(1);
        } else {
            strHex = color;
        }
        return strHex;
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

    /**
     * 拆分时间工具
     * @param time 毫秒数值
     * @returns {*}
     */
    Sys.splitDate = function(time) {
        if (isNaN(time)) {
            return null;
        }
        var d = new Date(time);
        if (!d) {
            return null;
        }
        return {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate(),
            hour: d.getHours(),
            minute: d.getMinutes(),
            second: d.getSeconds()
        }
    };

    /**
     * 星期几
     * @param time
     * @returns {*}
     */
    Sys.weekChinese = function(time) {
        if (isNaN(time)) {
            return null;
        }
        var d = new Date(time);
        if (!d) {
            return null;
        }
        var a = new Array("日", "一", "二", "三", "四", "五", "六");
        var week = new Date().getDay();
        return "星期" + a[week];
    };

    /**
     * 从app接口获取数据
     * @type {{getToken: Function, getTeamId: Function, getTeamName: Function}}
     */
    Sys.jsBrigeUtil = {
        //TODO 接入app后从接口获得
        getToken: function() {
            return 'OIeVJbmrFtDJbrRqrUWJmLPCaC9xd5H/Ti9OIs+9aFak2hcnDqA48hIReWr7d9QGVabDf+IQ69s=';
        },
        getTeamId: function() {
            return 'T2adhiahdi';
        },
        getTeamName: function() {
            return '杭州多多科技有限公司';
        },
        getSelfPhone: function(){
            return '18757164249';
        },
        getSelfUser: function(){
        	return {phone:'18757164249', realName:"测试管理员", imagery:"core/common/images/topxiao.gif"};
        },
        getParkId : function(){
            return 1
        },
        getTeam: function(){
            return {teamId:'T2adhiahdi',teamName:'杭州多多科技有限公司'};
        },
        getUser: function(phone){
            return {phone:phone, realName:"万益东", imagery:""};
        },
        getMember: function(phone){
            return {phone:phone, realName:"万益东"};
        },
        showToast:function(txt){
            alert(txt);
        },
        showBigImage: function(imgArr){
            alert("展示大图");
        }
    };
    /**
     * 模拟app对js调用
     */
    Sys.callByApp = function(){
      //模拟app的后退
        document.onkeydown = function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if(e && (e.keyCode == 8 || e.keyCode == 37)){
                if(Sys.mq.valid("back")){
                    Sys.mq.exec("back");
                }
            }
        };
    }();
    /**
     * 图片懒加载
     * @param $img
     * @private
     */
    Sys._lazyLoadImg = function($img){
        var src = $img.data('original');
        if(src){
            $img.attr('src', src);
            $img.attr("data-original","");
        }
    };
    //系统的自建消息队列
    Sys.mq = (function() {
        var messageQuery = {};

        var validName = function(name) {
            if (!/^\S+$/.test(name))
                throw new Error("执行器名称: " + name + " 不能为存在空格");
        };
        return {
            valid: function(name){
                var bag = messageQuery[name];
                if (!bag || $.type(bag.fn) != 'function'){
                    return false;
                }else{
                    return true;
                }
            },
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
                if (!bag || $.type(bag.fn) != 'function') return;
                // if (!bag || $.type(bag.fn) != 'function')
                //     throw new Error("执行器名称: " + name + "对应的function 不存在, 或者错误");
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

    (function(){
        if(!Sys.jsBridge){
            if (window.WebViewJavascriptBridge) {
                console.log("here is WebViewJavascriptBridge");
                Sys.jsBridge = new jsBridgeInit();
            } else {
                document.addEventListener(
                    'WebViewJavascriptBridgeReady'
                    , function() {
                        console.log("WebViewJavascriptBridge is ready");
                        Sys.jsBridge = new jsBridgeInit();
                    },
                    false
                );
            }
        }
        function JsBridge(){
            //初始化
            WebViewJavascriptBridge.init(function(message, responseCallback) {
                console.log('JS got a message', message);
                if(Sys.mq.valid(message)){
                    Sys.mq.exec(message);
                    Sys.mq.del(message);
                }
            });
            //注册
            {
                //注册回退
                WebViewJavascriptBridge.register("back",function(data,responseCallback){
                    if(Sys.mq.valid("back")){
                        Sys.mq.exec("back");
                        Sys.mq.del("back");
                        responseCallback(false);
                    }else{
                        responseCallback(true);
                    }
                });
            }
            //发送消息
            this.send = function(message,callback){
                window.WebViewJavascriptBridge.send(
                    message
                    , function(responseData) {
                       callback(responseData);
                    }
                );
            };
            //调用native
            this.call = function(funcName,param,callback){
                WebViewJavascriptBridge.callHandler(
                    funcName
                    , {'param': param}
                    , function(responseData) {
                        callback(responseData);
                    }
                );
            };
            return this;
        }
    })();
    return Sys;
});
