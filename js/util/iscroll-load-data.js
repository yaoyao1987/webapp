;(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery','IScroll'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($,IScroll) {
	"use strict";

	function IScrollLoadData(wrapperEl,contentEl,dropTopAction,dropBottomAction,limit){
		this.wrapper=wrapperEl;
		this.content=contentEl;
		this.pullDownEl=this.wrapper.querySelector('.scroller-pulldown');
		this.pullUpEl=this.wrapper.querySelector('.scroller-pullup');
		this.scrollerEl=this.wrapper.querySelector('.scroller');
		this.dropTopAction=dropTopAction;
		this.dropBottomAction=dropBottomAction;
		this.limit=limit||30;
		this.myScroll = null;
		
		this.clickTop_bind=this.clickTop.bind(this);
		this.clickBottom_bind=this.clickBottom.bind(this);
		
		this.pullUpLabel_Text='上翻刷新...';
		this.pullDownLabel_Text='下拉刷新...';
		this.pullLoading_Text='加载中~~';
		this.releaseLoading_Text='松开加载~~';
		this.loading_top_flag=false;
		this.loading_bottom_flag=false;
		this.checkIScroll(true);
		this.createIScroll();
	}

	IScrollLoadData.prototype = {
		refresh:function(direct){
			this.checkIScroll();
			delete this.myScroll.waitLoadTop;
			this.myScroll.refresh();
		},
		updateContentLen:function(direct){
			var children=this.content.children;
			if(children.len>this.limit){
				if(direct=='bottom'){
					
				}else{
					
				}
			}
		},
		checkIScroll:function(flag){
			var soh=this.content.offsetHeight+this.pullDownEl.offsetHeight+this.pullUpEl.offsetHeight;
			var woh=this.wrapper.clientHeight;
			var holder=this.scrollerEl.querySelector('.scroller-holder');
			if(soh<woh){
				if(!holder){
					var ul=document.createElement('ul');
					ul.className='scroller-holder';
					this.scrollerEl.appendChild(ul);
					holder=ul;
				}
				holder.style.height=(woh-soh+2)+'px';
			}else if(holder){
				this.scrollerEl.removeChild(holder);
			}
		},
		pullDownAction:function(){
			var self=this;
	
			if(this.dropTopAction){
				this.dropTopAction(function(out){
					var firstChild=self.content.querySelector(':first-child');
					if(firstChild)
					  self.content.insertBefore(out,firstChild);
					else
					  self.content.appendChild(out);
					self.refresh('top');
				});
			}else{
				this.refresh('top');
			} 
		},
		pullUpAction:function(){
			var self=this;
	
			if(this.dropBottomAction){
				this.dropBottomAction(function(out){
					self.content.appendChild(out);
					self.refresh('bottom');
				});
			}else{
				this.refresh('bottom');
			}
		},
		clickTop:function(){
			var self=this;
			if(this.dropTopAction){
				this.dropTopAction(function(out){
					var firstChild=self.content.querySelector(':first-child');
					if(firstChild)
					  self.content.insertBefore(out,firstChild);
					else
					  self.content.appendChild(out);
					self.initIScroll(false);
					
				});
			}
		},
		clickBottom:function(){
			var self=this;
			if(this.dropBottomAction){
				this.dropBottomAction(function(out){
					self.content.appendChild(out);
					self.initIScroll(false);
					
				});
			}
		},
		initIScroll:function(flag){
			if(this.overflow_window){
				return;
			}
			
			if(this.scrollerEl.offsetHeight-this.pullDownEl.offsetHeight>=document.documentElement.clientHeight){
				this.wrapper.style.bottom='0px';
				this.wrapper.style.top=((-1)*this.pullDownEl.offsetHeight)+'px';
				this.pullUpEl.querySelector('.pullup-label').innerText=this.pullUpLabel_Text;
				this.pullDownEl.querySelector('.pulldown-label').innerText=this.pullDownLabel_Text;
				this.pullUpEl.removeEventListener('click',this.clickBottom_bind);
				this.pullDownEl.removeEventListener('click',this.clickUp_bind);
				this.myScroll.refresh();
				this.overflow_window=true;
			}else{
				this.wrapper.style.bottom=(document.documentElement.clientHeight-this.scrollerEl.offsetHeight)+'px';
				this.pullUpEl.querySelector('.pullup-label').innerText='点击获取最近...';
				this.pullDownEl.querySelector('.pulldown-label').innerText='点击获取最新...';
				if(flag){
					this.pullUpEl.addEventListener('click',this.clickBottom_bind);
					this.pullDownEl.addEventListener('click',this.clickTop_bind);
				}
				
			}
		},
		createIScroll:function(){
			var self=this;
			this.myScroll = new IScroll(this.wrapper, {
				probeType: 2, mouseWheel: false,bindToWrapper:true,scrollY:true
			}).on('scroll',function(){
				if (this.y > 50 &&  
					(!self.pullDownEl.className.match('flip') && 
					 !self.pullDownEl.className.match('loading'))) {
					self.pullDownEl.className = 'flip';
					self.pullDownEl.querySelector('.pulldown-label').innerHTML = self.releaseLoading_Text;
					this.waitLoadTop=self.pullDownEl.offsetHeight;
				} else if (this.y < 50 && self.pullDownEl.className.match('flip')) {
					self.pullDownEl.className = '';
					self.pullDownEl.querySelector('.pulldown-label').innerHTML = self.pullDownLabel_Text;
					 delete this.waitLoadTop;
				} else if (this.y < (this.maxScrollY - 5) && 
						  (!self.pullUpEl.className.match('flip')&&
						   !self.pullUpEl.className.match('loading'))) {
					self.pullUpEl.className = 'flip';
					self.pullUpEl.querySelector('.pullup-label').innerHTML = self.releaseLoading_Text;
				} else if (this.y > (this.maxScrollY + 5) && self.pullUpEl.className.match('flip')) {
					self.pullUpEl.className = '';
					self.pullUpEl.querySelector('.pullup-label').innerHTML = self.pullUpLabel_Text;
				}
			}).on('scrollEnd',function(){
				console.log('scrollEnd ',this);
				
				if (self.pullDownEl.className.match('flip')) {
					self.pullDownEl.className = 'loading';
					self.pullDownEl.querySelector('.pulldown-label').innerHTML = self.pullLoading_Text;	
					self.pullDownAction();// Execute custom function (ajax call?)
					
				} else if (self.pullUpEl.className.match('flip')) {
					self.pullUpEl.className = 'loading';
					self.pullUpEl.querySelector('.pullup-label').innerHTML = self.pullLoading_Text;				
					self.pullUpAction();	// Execute custom function (ajax call?)
				}
			}).on('refresh',function(){
				console.log('refresh this.y='+this.y+
						' , this.maxScrollY='+this.maxScrollY+
						' , this.scrollerHeight='+this.scrollerHeight+
						' , this.wrapperHeight='+this.wrapperHeight);
				if (self.pullDownEl.className.match('loading')) {
					self.pullDownEl.className = '';
					self.pullDownEl.querySelector('.pulldown-label').innerHTML = self.pullDownLabel_Text;
				} else if (self.pullUpEl.className.match('loading')) {
					self.pullUpEl.className = '';
					self.pullUpEl.querySelector('.pullup-label').innerHTML = self.pullUpLabel_Text;
				}
			});
		}
	};

	return function(wrapperEl,contentEl,dropTopAction,dropBottomAction,limit){
        new IScrollLoadData(wrapperEl,contentEl,dropTopAction,dropBottomAction,limit);
    };
}));