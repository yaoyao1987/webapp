/*
 *公告列表
*/
require.config({
    paths: {
        IScroll:'libs/iscroll-probe',
        IScrollLoadData:'util/iscroll-load-data',
    },
    //引入非AMD写法的类库。
    shim: {         
        'IScroll': {
            exports: 'IScroll'
        },
        'IScrollLoadData': {
            exports: 'IScrollLoadData'
        }
    }
});
define(['jquery','underscore','domReady','common','IScrollLoadData',
    'text!'+window.basePath+'html/list.tpl',
    'css!'+window.basePath+'/css/module/list.css'], function ($,_,domReady,common,IScrollLoadData,tpl) {

    function announcementList(){
        this.data = null;
    	this._init();
        this._initEvent();
    }

    announcementList.prototype = {
        //载入数据
        _loadData:function(){
            // var self = this,
            //     url = '',
            //     data = {};
            // $.ajax({
            //     url:url,
            //     type:"POST",
            //     data:data,
            //     dataType:'json',
            //     success:function(data){
            //         //如果成功
            //         if (data.result.code == 0) {
            //             self.data = $.parseJSON(data.result.value);
            //             //显示页面
            //             self._showHtml();
            //         }else{

            //         }
            //     }
            // });
            var self = this;
            //这个是测试数据，等接口来了之后替换
            var data = [
                {id:110,name:'yaoyaoyaoyaoyaoyaoyaoyaoyaoyaoyaoyaoyaoyao',pic:'../../img/default_img.png'},
                {id:111,name:'ruanruan',pic:'../../img/default_img.png'},
                {id:112,name:'xiaojiang',pic:'../../img/default_img.png'},
                {id:113,name:'zhangjian',pic:'../../img/default_img.png'},
                {id:114,name:'ddd',pic:'../../img/default_img.png'},
                {id:115,name:'yangqian',pic:'../../img/default_img.png'},
                {id:116,name:'pengpeng',pic:'../../img/default_img.png'},
                {id:117,name:'yyy',pic:'../../img/default_img.png'},
                {id:118,name:'dzt',pic:'../../img/default_img.png'},
                {id:119,name:'dfy',pic:'../../img/default_img.png'},
            ];
            self.data = data;
            self._showHtml();
        },
        //显示页面
        _showHtml:function(){
            var self = this, data = self.data;
            appView.html(_.template(tpl,{data:data}));
        },
        //初始化
    	_init:function(){
            var self = this;

            //载入数据
            self._loadData();

    		//页面加载完成
            domReady(function () {
                //隐藏loading页面
                $('#loading').hide();
                //延迟加载图片
                $('img.lazy').each(function(){
                    var $this = $(this),
                        dataOri = $this.data('original');
                    $this.attr('src',dataOri);
                });
            });
    	},
        //初始化事件
        _initEvent:function(){
            var self = this,
                data = self.data,
                wrapper=$('#container')[0];

            //iscroll上拉加载下拉刷新
            if (data) {
                var content=$('.item-list')[0];
                document.addEventListener('touchmove', function (e) { 
                    e.stopPropagation();
                    e.preventDefault(); 
                }, false);
                IScrollLoadData(wrapper,content,self.dropTopAction,self.dropBottomAction,20);
            }
        },
        //上拉加载数据
        dropTopAction:function(cb){
            // console.log('向上');
            setTimeout(function(){
                var d=document.createDocumentFragment();
                for(var i=0;i<3;i++){
                  var li=document.createElement('li');
                  li.innerText='Generated top row '+new Date().getTime();
                  d.appendChild(li);
                }
                cb(d);
            },5000);
        },
        //下拉刷新数据
        dropBottomAction:function(cb){
            console.log('向下');
            setTimeout(function(){
                var d=document.createDocumentFragment();
                for(var i=0;i<3;i++){
                  var li=document.createElement('li');
                  li.innerText='Generated bottom row '+new Date().getTime();
                  d.appendChild(li);
                  
                }
                cb(d);
            },5000);
        }
    };

    return function(){
    	new announcementList();
    };
});