/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2016, EllisLab, Inc.
 * @license		https://expressionengine.com/license
 * @link		https://ellislab.com
 * @since		Version 2.3
 * @filesource
 */
!function(t){"use strict";function e(t){this.size=0,this.limit=t,this.cache=[],this.cache_map=[]}function i(e,i){var s=this;this.els=t("p."+e.uniqid),this.template_id=e.uniqid+"_pag_template",t.template(this.template_id,e.pagination),this.els.delegate("a","click",function(){var t=s._extract_qs(this.href,i.options.base_url);return i.add_filter(t),!1})}function s(e,i){var s=this;if(this.sort=[],this.plugin=i,this.headers=i.element.find("th"),this.css={asc:e.cssAsc,desc:e.cssDesc},this.header_map={},this._initial_sort=e.sort,!e.pagination)return void t(i.element).tablesorter();this.headers.each(function(){var i=t(this),r=i.data("table_column");s.header_map[r]=i,i.data("sortable",e.columns[r].sort)}),i.element.find("thead").delegate("th","selectstart",function(){return!1}).delegate("th","click",function(i){var r=t(this);if(r.has("input").length)return!0;if(!r.data("sortable"))return!1;var n=i.shiftKey?"add":"set";return s[n](r.data("table_column"),r.hasClass(e.cssAsc)?"desc":"asc"),!1});for(var r=this._initial_sort.length;r--;){var n=this.header_map[this._initial_sort[r][0]];void 0!==n&&(this.sort.push(this._initial_sort[r]),n.toggleClass(this.css.asc,"asc"===this._initial_sort[r][1]).toggleClass(this.css.desc,"desc"===this._initial_sort[r][1]))}}t.widget("ee.table",{_listening:t(),_template_string:"",_current_data:{},options:{uniqid:null,base_url:null,pagination:null,template:null,pag_template:null,rows:[],sort:[],columns:[],cache_limit:600,filters:{},cssAsc:"headerSortDown",cssDesc:"headerSortUp"},_create:function(){var r=this,n=r.options;r.tbody=r.element.find("tbody"),r.tbody.size()||(r.tbody=t("<tbody/>"),r.element.append(r.tbody)),r.no_results=t("<div />").html(n.no_results),r.tbody.children().length||(r.element.hide(),r.element.after(r.no_results)),r.filters=n.filters,n.base_url=n.base_url.replace(new RegExp("&amp;","g"),"&"),r.sort=new s(n,r),r.cache=new e(n.cache_limit),r.pagination=new i(n,r);var a=r._prep_for_cache(),h={html_rows:r.tbody.find("tr"),pagination:r.pagination.html(),rows:n.rows};r.cache.set(a,h),r._current_data=h,r.template_id=n.uniqid+"_row_template",r.set_template(n.template),r._trigger("create",null,r._ui({data:h}))},get_container:function(){return this.tbody},set_container:function(e){this.tbody=t(e)},get_header:function(e){self.element.find("th").filter(function(){return t(this).data("table_column")==e})},get_template:function(){return this._template_string},set_template:function(e){this._template_string=e,t.template(this.template_id,e)},get_current_data:function(){return this._current_data},clear_cache:function(){return this.cache.clear(),this},clear_filters:function(){return this.filters={},this._listening.each(function(){t(this).unbind("interact.ee_table")}),this},clear_sort:function(){return this.sort.reset(),this},add_filter:function(e){var i=this,s=EE.BASE+"&"+i.options.base_url;if(t.isPlainObject(e))return i._set_filter(i._listening),i.filters=t.extend(i.filters,e),i._request(s),this;var r,n=e.closest("form"),a="interact.ee_table";return n&&e.is(n)?a+=" submit.ee_table":e.bind("keydown",function(t){13==t.keyCode&&t.preventDefault()}),t(e).bind(a,function(t){return clearTimeout(r),r=setTimeout(function(){i._set_filter(i._listening),i._request(s)},200),!1}),i._listening=i._listening.add(e),i._set_filter(i._listening),this},set_sort:function(t,e){return this.sort.set(t,e),this},add_sort:function(t,e){return this.sort.add(t,e),this},refresh:function(){var t=EE.BASE+"&"+this.options.base_url;return this._request(t),this},_request:function(e){var i,s,r=this;r._trigger("load",null,r._ui()),s=function(t){r._current_data=t,t.rows.length?(r.element.show(),r.tbody.html(t.html_rows),r.no_results.remove()):r.tbody.is("tbody")?(r.tbody.empty(),r.element.hide(),r.element.after(r.no_results)):r.tbody.html(r.no_results),r.pagination.update(t.pagination),r._trigger("update",null,r._ui({data:t}))};var n=r._prep_for_cache();return i=r.cache.get(n),null!==i?s(i):(r.filters.tbl_offset&&(e+="&tbl_offset="+r.filters.tbl_offset,delete r.filters.tbl_offset),r.filters.XID=EE.XID,void t.ajax(e,{type:"post",data:r.filters,success:function(e){e.html_rows=t.tmpl(r.template_id,e.rows),e.pagination=r.pagination.parse(e.pagination),r.cache.set(n,e,e.rows.length),s(e)},dataType:"json"}))},_prep_for_cache:function(){this.filters.tbl_sort=this.sort.get();var t,e=/^(XID|S|D|C|M)$/,i=[];for(t in this.filters)""==this.filters[t]||null!==e.exec(t)?delete this.filters[t]:i.push(t,this.filters[t]);return i.sort(),i.join("")},_set_filter:function(e){var i=e.serializeArray(),s=this;t.each(i,function(){s.filters[this.name]=this.value})},_ui:function(e){return e=e||{},t.extend({sort:this.sort.get(),filters:this.filters},e)}}),e.prototype={limit:function(){return this.limit},size:function(){return this.cache.length},set:function(t,e,i){for(var s=i||1;this.size+s>this.limit;){var r=this.cache.shift();this.cache_map.shift(),this.size-=r[2]}return this.cache.push([t,e,s]),this.cache_map.push(t),this.size+=s,this},get:function(t){var e,i=this._find(t);return i>-1?(e=this.cache.splice(i,1)[0],this.cache.push(e),this.cache_map.splice(i,1),this.cache_map.push(e[0]),e[1]):null},"delete":function(t){var e,i=this._find(t);return i>-1&&(e=this.cache.splice(i,1),this.cache_map.splice(i,1),this.size-=e[2]),this},clear:function(){return this.size=0,this.cache=[],this.cache_map=[],this},_find:function(t){if(!Array.prototype.indexOf){for(var e=this.cache_map,i=e.length,s=0;i>s;s++)if(e[s]==t)return s;return-1}return this.cache_map.indexOf(t)}},i.prototype={parse:function(e){return e?t.tmpl(this.template_id,e).html():""},update:function(t){return t?void this.els.html(t).show():void this.els.html("")},html:function(){return this.els.html()},_qs_splitter:new RegExp("([^&=]+)=?([^&]*)","g"),_extract_qs:function(t,e){t=t.replace(e,"");var i,s=t.indexOf("?"),r={};for(s>0&&(t=t.slice(s+1));i=this._qs_splitter.exec(t);)r[decodeURIComponent(i[1])]=decodeURIComponent(i[2]);return r}},s.prototype={get:function(t){if(t){for(var e=this.sort.length;e--;)if(this.sort[e][0]==t)return this.sort[e][1];return null}return this.sort},add:function(t,e){var i,s=t;for(e&&(s=[[t,e]]),i=s.length;i--;)this.sort.push(s[i]),this.header_map[s[i][0]].toggleClass(this.css.asc,"asc"===s[i][1]).toggleClass(this.css.desc,"desc"===s[i][1]);return this.plugin.refresh(),this},set:function(t,e){return this.clear(),this.add(t,e),this},reset:function(){return this.clear(),this.set(this._initial_sort),this.plugin.refresh(),this},clear:function(){for(var t=this.sort.length;t--;)this.header_map[this.sort[t][0]].removeClass(this.css.asc+" "+this.css.desc);return this.sort=[],this}}}(jQuery);