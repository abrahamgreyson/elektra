!function(t){function e(e,r,a){var o=this;return this.on("click.pjax",e,function(e){var i=t.extend({},m(r,a));i.container||(i.container=t(this).attr("data-pjax")||o),n(e,i)})}function n(e,n,r){r=m(n,r);var o=e.currentTarget;if("A"!==o.tagName.toUpperCase())throw"$.fn.pjax or $.pjax.click requires an anchor element";if(!(e.which>1||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||location.protocol!==o.protocol||location.hostname!==o.hostname||o.href.indexOf("#")>-1&&h(o)==h(location)||e.isDefaultPrevented())){var i={url:o.href,container:t(o).attr("data-pjax"),target:o},s=t.extend({},i,r),c=t.Event("pjax:click");t(o).trigger(c,[s]),c.isDefaultPrevented()||(a(s),e.preventDefault(),t(o).trigger("pjax:clicked",[s]))}}function r(e,n,r){r=m(n,r);var o=e.currentTarget;if("FORM"!==o.tagName.toUpperCase())throw"$.pjax.submit requires a form element";var i={type:o.method.toUpperCase(),url:o.action,container:t(o).attr("data-pjax"),target:o};if("GET"!==i.type&&void 0!==window.FormData)i.data=new FormData(o),i.processData=!1,i.contentType=!1;else{if(t(o).find(":file").length)return;i.data=t(o).serializeArray()}a(t.extend({},i,r)),e.preventDefault()}function a(e){function n(e,n,a){a||(a={}),a.relatedTarget=r;var o=t.Event(e,a);return s.trigger(o,n),!o.isDefaultPrevented()}e=t.extend(!0,{},t.ajaxSettings,a.defaults,e),t.isFunction(e.url)&&(e.url=e.url());var r=e.target,o=d(e.url).hash,s=e.context=v(e.container);e.data||(e.data={}),t.isArray(e.data)?e.data.push({name:"_pjax",value:s.selector}):e.data._pjax=s.selector;var c;e.beforeSend=function(t,r){if("GET"!==r.type&&(r.timeout=0),t.setRequestHeader("X-PJAX","true"),t.setRequestHeader("X-PJAX-Container",s.selector),!n("pjax:beforeSend",[t,r]))return!1;r.timeout>0&&(c=setTimeout(function(){n("pjax:timeout",[t,e])&&t.abort("timeout")},r.timeout),r.timeout=0);var a=d(r.url);o&&(a.hash=o),e.requestUrl=f(a)},e.complete=function(t,r){c&&clearTimeout(c),n("pjax:complete",[t,r,e]),n("pjax:end",[t,e])},e.error=function(t,r,a){var o=j("",t,e),s=n("pjax:error",[t,r,a,e]);"GET"==e.type&&"abort"!==r&&s&&i(o.url)},e.success=function(r,c,u){var p=a.state,f="function"==typeof t.pjax.defaults.version?t.pjax.defaults.version():t.pjax.defaults.version,h=u.getResponseHeader("X-PJAX-Version"),m=j(r,u,e),v=d(m.url);if(o&&(v.hash=o,m.url=v.href),f&&h&&f!==h)return void i(m.url);if(!m.contents)return void i(m.url);a.state={id:e.id||l(),url:m.url,title:m.title,container:s.selector,fragment:e.fragment,timeout:e.timeout},(e.push||e.replace)&&window.history.replaceState(a.state,m.title,m.url);try{document.activeElement.blur()}catch(x){}m.title&&(document.title=m.title),n("pjax:beforeReplace",[m.contents,e],{state:a.state,previousState:p}),s.html(m.contents);var g=s.find("input[autofocus], textarea[autofocus]").last()[0];g&&document.activeElement!==g&&g.focus(),y(m.scripts);var w=e.scrollTo;if(o){var b=decodeURIComponent(o.slice(1)),T=document.getElementById(b)||document.getElementsByName(b)[0];T&&(w=t(T).offset().top)}"number"==typeof w&&t(window).scrollTop(w),n("pjax:success",[r,c,u,e])},a.state||(a.state={id:l(),url:window.location.href,title:document.title,container:s.selector,fragment:e.fragment,timeout:e.timeout},window.history.replaceState(a.state,document.title)),u(a.xhr),a.options=e;var h=a.xhr=t.ajax(e);return h.readyState>0&&(e.push&&!e.replace&&(w(a.state.id,p(s)),window.history.pushState(null,"",e.requestUrl)),n("pjax:start",[h,e]),n("pjax:send",[h,e])),a.xhr}function o(e,n){var r={url:window.location.href,push:!1,replace:!0,scrollTo:!1};return a(t.extend(r,m(e,n)))}function i(t){window.history.replaceState(null,"",a.state.url),window.location.replace(t)}function s(e){C||u(a.xhr);var n,r=a.state,o=e.state;if(o&&o.container){if(C&&A==o.url)return;if(r){if(r.id===o.id)return;n=r.id<o.id?"forward":"back"}var s=R[o.id]||[],c=t(s[0]||o.container),l=s[1];if(c.length){r&&b(n,r.id,p(c));var f=t.Event("pjax:popstate",{state:o,direction:n});c.trigger(f);var d={id:o.id,url:o.url,container:c,push:!1,fragment:o.fragment,timeout:o.timeout,scrollTo:!1};if(l){c.trigger("pjax:start",[null,d]),a.state=o,o.title&&(document.title=o.title);var h=t.Event("pjax:beforeReplace",{state:o,previousState:r});c.trigger(h,[l,d]),c.html(l),c.trigger("pjax:end",[null,d])}else a(d);c[0].offsetHeight}else i(location.href)}C=!1}function c(e){var n=t.isFunction(e.url)?e.url():e.url,r=e.type?e.type.toUpperCase():"GET",a=t("<form>",{method:"GET"===r?"GET":"POST",action:n,style:"display:none"});"GET"!==r&&"POST"!==r&&a.append(t("<input>",{type:"hidden",name:"_method",value:r.toLowerCase()}));var o=e.data;if("string"==typeof o)t.each(o.split("&"),function(e,n){var r=n.split("=");a.append(t("<input>",{type:"hidden",name:r[0],value:r[1]}))});else if(t.isArray(o))t.each(o,function(e,n){a.append(t("<input>",{type:"hidden",name:n.name,value:n.value}))});else if("object"==typeof o){var i;for(i in o)a.append(t("<input>",{type:"hidden",name:i,value:o[i]}))}t(document.body).append(a),a.submit()}function u(e){e&&e.readyState<4&&(e.onreadystatechange=t.noop,e.abort())}function l(){return(new Date).getTime()}function p(t){var e=t.clone();return e.find("script").each(function(){this.src||jQuery._data(this,"globalEval",!1)}),[t.selector,e.contents()]}function f(t){return t.search=t.search.replace(/([?&])(_pjax|_)=[^&]*/g,""),t.href.replace(/\?($|#)/,"$1")}function d(t){var e=document.createElement("a");return e.href=t,e}function h(t){return t.href.replace(/#.*/,"")}function m(e,n){return e&&n?n.container=e:n=t.isPlainObject(e)?e:{container:e},n.container&&(n.container=v(n.container)),n}function v(e){if(e=t(e),e.length){if(""!==e.selector&&e.context===document)return e;if(e.attr("id"))return t("#"+e.attr("id"));throw"cant get selector for pjax container!"}throw"no pjax container for "+e.selector}function x(t,e){return t.filter(e).add(t.find(e))}function g(e){return t.parseHTML(e,document,!0)}function j(e,n,r){var a={},o=/<html/i.test(e),i=n.getResponseHeader("X-PJAX-URL");if(a.url=i?f(d(i)):r.requestUrl,o)var s=t(g(e.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0])),c=t(g(e.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));else var s=c=t(g(e));if(0===c.length)return a;if(a.title=x(s,"title").last().text(),r.fragment){if("body"===r.fragment)var u=c;else var u=x(c,r.fragment).first();u.length&&(a.contents="body"===r.fragment?u:u.contents(),a.title||(a.title=u.attr("title")||u.data("title")))}else o||(a.contents=c);return a.contents&&(a.contents=a.contents.not(function(){return t(this).is("title")}),a.contents.find("title").remove(),a.scripts=x(a.contents,"script[src]").remove(),a.contents=a.contents.not(a.scripts)),a.title&&(a.title=t.trim(a.title)),a}function y(e){if(e){var n=t("script[src]");e.each(function(){var e=this.src,r=n.filter(function(){return this.src===e});if(!r.length){var a=document.createElement("script"),o=t(this).attr("type");o&&(a.type=o),a.src=t(this).attr("src"),document.head.appendChild(a)}})}}function w(t,e){R[t]=e,X.push(t),T(U,0),T(X,a.defaults.maxCacheLength)}function b(t,e,n){var r,o;R[e]=n,"forward"===t?(r=X,o=U):(r=U,o=X),r.push(e),(e=o.pop())&&delete R[e],T(r,a.defaults.maxCacheLength)}function T(t,e){for(;t.length>e;)delete R[t.shift()]}function E(){return t("meta").filter(function(){var e=t(this).attr("http-equiv");return e&&"X-PJAX-VERSION"===e.toUpperCase()}).attr("content")}function S(){t.fn.pjax=e,t.pjax=a,t.pjax.enable=t.noop,t.pjax.disable=P,t.pjax.click=n,t.pjax.submit=r,t.pjax.reload=o,t.pjax.defaults={timeout:650,push:!0,replace:!1,type:"GET",dataType:"html",scrollTo:0,maxCacheLength:20,version:E},t(window).on("popstate.pjax",s)}function P(){t.fn.pjax=function(){return this},t.pjax=c,t.pjax.enable=S,t.pjax.disable=t.noop,t.pjax.click=t.noop,t.pjax.submit=t.noop,t.pjax.reload=function(){window.location.reload()},t(window).off("popstate.pjax",s)}var C=!0,A=window.location.href,D=window.history.state;D&&D.container&&(a.state=D),"state"in window.history&&(C=!1);var R={},U=[],X=[];t.inArray("state",t.event.props)<0&&t.event.props.push("state"),t.support.pjax=window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/),t.support.pjax?S():P()}(jQuery);