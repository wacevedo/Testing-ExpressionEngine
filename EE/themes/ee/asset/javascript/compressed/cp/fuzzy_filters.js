!function(t){function e(e,i){this.ul=e,this.keep=t();var s=e.find("li");i.keep&&(this.keep=this.ul.find(i.keep),s=s.not(i.keep)),this.items=s.map(function(e){return{el:this,text:t(this).text(),score:1,origIndex:e}}),this.length=this.items.length}function i(t){this.ul=t,this.items=t.find("li"),this.isNav=!!t.closest(".nav-main").length,this.scrollWrap=this.getScrollWrap(),this.scrollOffset=this.isNav?7:4,this.current=-1,this.scrolled=0,this.setLength(this.items)}e.prototype={filter:function(e){if(""==e)return this.reset();var i=0,s=this;_.each(this.items,function(n){n.score=s._scoreString(n.text,e),t(n.el).toggle(0!=n.score),i+=Math.ceil(n.score)}),this.length=i,this.items.sort(function(t,e){return e.score-t.score}),this._update()},reset:function(){_.each(this.items,function(e){t(e.el).toggle(!0)}),this.length=this.items.length,this.items.sort(function(t,e){return t.origIndex-e.origIndex}),this._update()},_update:function(){this.ul.empty().append(_.pluck(this.items,"el")),this.ul.append(this.keep)},_scoreString:function(t,e){var i=0,s=1,n=e.length;t=t.toLowerCase(),t[0]==e[0]&&(i+=1);for(var r=0;n>r;r++){var h=t.indexOf(e.charAt(r).toLowerCase());switch(h){case-1:return 0;case 0:i+=.6,r==s&&(i+=.4);break;default:i+=.4/s}s+=h,t=t.substr(h+1)}return i/n*(n/s)}},i.prototype={getScrollWrap:function(){return this.isNav?this.ul:this.ul.closest(".scroll-wrap")},setCurrent:function(t){return this.current=t,this.ul.find("li a.act").removeClass("act"),0>t?void(this.active=null):(this.active=this.ul.find("li a:visible").eq(t),this.active.addClass("act"),void this._updateScroll())},getCurrent:function(){return this.active},setLength:function(t){this.length=t},_updateScroll:function(){var t=this.current-this.scrolled;t>this.scrollOffset?this.scrolled+=t-this.scrollOffset:0>=t&&(this.scrolled+=t),this.scrollWrap.scrollTop(this.scrolled*this.active.outerHeight())},down:function(){this.setCurrent(Math.min(this.length,this.current+1))},up:function(){this.setCurrent(Math.max(0,this.current-1))}};var s={enter:13,escape:27,up:38,right:39,down:40};t.fn.fuzzyFilter=function(){return this.each(function(){if(!t(this).data("fuzzyFilterActive")){t(this).data("fuzzyFilterActive",!0);var n=t(this),r=t(this).closest(".sub-menu, .nav-sub-menu").find("ul"),h=new i(r),l=new e(r,{keep:":has(.add, .nav-add)"}),u=h.getScrollWrap();n.on("focus",function(){u.width(u.width())}),n.on("keydown",function(t){switch(h.setLength(l.length),t.keyCode){case s.enter:t.preventDefault(),h.getCurrent()[0].click();break;case s.escape:n.val("");break;case s.up:h.up();break;case s.down:h.down();break;default:return}t.preventDefault()}),n.on("interact",function(){l.filter(n.val()),h.setCurrent(0)})}})},t.fuzzyFilter=function(){t(".nav-filter input, .filters input[data-fuzzy-filter=true]").fuzzyFilter()},t.fuzzyFilter()}(jQuery);