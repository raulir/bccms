/*! @vimeo/player v2.12.2 | (c) 2020 Vimeo | MIT License | https://github.com/vimeo/player.js */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):((e=e||self).Vimeo=e.Vimeo||{},e.Vimeo.Player=t())}(this,function(){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var e="undefined"!=typeof global&&"[object global]"==={}.toString.call(global);function i(e,t){return 0===e.indexOf(t.toLowerCase())?e:"".concat(t.toLowerCase()).concat(e.substr(0,1).toUpperCase()).concat(e.substr(1))}function l(e){return/^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(e)}function s(e){var t,n=0<arguments.length&&void 0!==e?e:{},r=n.id,o=n.url,i=r||o;if(!i)throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");if(t=i,!isNaN(parseFloat(t))&&isFinite(t)&&Math.floor(t)==t)return"https://vimeo.com/".concat(i);if(l(i))return i.replace("http:","https:");if(r)throw new TypeError("“".concat(r,"” is not a valid video id."));throw new TypeError("“".concat(i,"” is not a vimeo.com url."))}var t=void 0!==Array.prototype.indexOf,n="undefined"!=typeof window&&void 0!==window.postMessage;if(!(e||t&&n))throw new Error("Sorry, the Vimeo Player API is not available in this browser.");var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};!function(e){if(!e.WeakMap){var n=Object.prototype.hasOwnProperty,r=function(e,t,n){Object.defineProperty?Object.defineProperty(e,t,{configurable:!0,writable:!0,value:n}):e[t]=n};e.WeakMap=(r(t.prototype,"delete",function(e){if(o(this,"delete"),!a(e))return!1;var t=e[this._id];return!(!t||t[0]!==e||(delete e[this._id],0))}),r(t.prototype,"get",function(e){if(o(this,"get"),a(e)){var t=e[this._id];return t&&t[0]===e?t[1]:void 0}}),r(t.prototype,"has",function(e){if(o(this,"has"),!a(e))return!1;var t=e[this._id];return!(!t||t[0]!==e)}),r(t.prototype,"set",function(e,t){if(o(this,"set"),!a(e))throw new TypeError("Invalid value used as weak map key");var n=e[this._id];return n&&n[0]===e?n[1]=t:r(e,this._id,[e,t]),this}),r(t,"_polyfill",!0),t)}function t(){if(void 0===this)throw new TypeError("Constructor WeakMap requires 'new'");if(r(this,"_id","_WeakMap"+"_"+i()+"."+i()),0<arguments.length)throw new TypeError("WeakMap iterable is not supported")}function o(e,t){if(!a(e)||!n.call(e,"_id"))throw new TypeError(t+" method called on incompatible receiver "+typeof e)}function i(){return Math.random().toString().substring(2)}function a(e){return Object(e)===e}}("undefined"!=typeof self?self:"undefined"!=typeof window?window:o);var a,f=(function(e){var t,n,r;r=function(){var t,n,r,o,i,a,e=Object.prototype.toString,u="undefined"!=typeof setImmediate?function(e){return setImmediate(e)}:setTimeout;try{Object.defineProperty({},"x",{}),t=function(e,t,n,r){return Object.defineProperty(e,t,{value:n,writable:!0,configurable:!1!==r})}}catch(e){t=function(e,t,n){return e[t]=n,e}}function c(e,t){this.fn=e,this.self=t,this.next=void 0}function l(e,t){r.add(e,t),n=n||u(r.drain)}function s(e){var t,n=typeof e;return null==e||"object"!=n&&"function"!=n||(t=e.then),"function"==typeof t&&t}function f(){for(var e=0;e<this.chain.length;e++)d(this,1===this.state?this.chain[e].success:this.chain[e].failure,this.chain[e]);this.chain.length=0}function d(e,t,n){var r,o;try{!1===t?n.reject(e.msg):(r=!0===t?e.msg:t.call(void 0,e.msg))===n.promise?n.reject(TypeError("Promise-chain cycle")):(o=s(r))?o.call(r,n.resolve,n.reject):n.resolve(r)}catch(e){n.reject(e)}}function h(e){var t=this;t.triggered||(t.triggered=!0,t.def&&(t=t.def),t.msg=e,t.state=2,0<t.chain.length&&l(f,t))}function v(e,n,r,o){for(var t=0;t<n.length;t++)!function(t){e.resolve(n[t]).then(function(e){r(t,e)},o)}(t)}function m(e){this.def=e,this.triggered=!1}function p(e){this.promise=e,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function y(e){if("function"!=typeof e)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var r=new p(this);this.then=function(e,t){var n={success:"function"!=typeof e||e,failure:"function"==typeof t&&t};return n.promise=new this.constructor(function(e,t){if("function"!=typeof e||"function"!=typeof t)throw TypeError("Not a function");n.resolve=e,n.reject=t}),r.chain.push(n),0!==r.state&&l(f,r),n.promise},this.catch=function(e){return this.then(void 0,e)};try{e.call(void 0,function(e){(function e(n){var r,o=this;if(!o.triggered){o.triggered=!0,o.def&&(o=o.def);try{(r=s(n))?l(function(){var t=new m(o);try{r.call(n,function(){e.apply(t,arguments)},function(){h.apply(t,arguments)})}catch(e){h.call(t,e)}}):(o.msg=n,o.state=1,0<o.chain.length&&l(f,o))}catch(e){h.call(new m(o),e)}}}).call(r,e)},function(e){h.call(r,e)})}catch(e){h.call(r,e)}}var g=t({},"constructor",y,!(r={add:function(e,t){a=new c(e,t),i?i.next=a:o=a,i=a,a=void 0},drain:function(){var e=o;for(o=i=n=void 0;e;)e.fn.call(e.self),e=e.next}}));return t(y.prototype=g,"__NPO__",0,!1),t(y,"resolve",function(n){return n&&"object"==typeof n&&1===n.__NPO__?n:new this(function(e,t){if("function"!=typeof e||"function"!=typeof t)throw TypeError("Not a function");e(n)})}),t(y,"reject",function(n){return new this(function(e,t){if("function"!=typeof e||"function"!=typeof t)throw TypeError("Not a function");t(n)})}),t(y,"all",function(t){var a=this;return"[object Array]"!=e.call(t)?a.reject(TypeError("Not an array")):0===t.length?a.resolve([]):new a(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");var r=t.length,o=Array(r),i=0;v(a,t,function(e,t){o[e]=t,++i===r&&n(o)},e)})}),t(y,"race",function(t){var r=this;return"[object Array]"!=e.call(t)?r.reject(TypeError("Not an array")):new r(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");v(r,t,function(e,t){n(t)},e)})}),y},(n=o)[t="Promise"]=n[t]||r(),e.exports&&(e.exports=n[t])}(a={exports:{}},a.exports),a.exports),d=new WeakMap;function h(e,t,n){var r=d.get(e.element)||{};t in r||(r[t]=[]),r[t].push(n),d.set(e.element,r)}function u(e,t){return(d.get(e.element)||{})[t]||[]}function v(e,t,n){var r=d.get(e.element)||{};if(!r[t])return!0;if(!n)return r[t]=[],d.set(e.element,r),!0;var o=r[t].indexOf(n);return-1!==o&&r[t].splice(o,1),d.set(e.element,r),r[t]&&0===r[t].length}var c=["autopause","autoplay","background","byline","color","controls","dnt","height","id","loop","maxheight","maxwidth","muted","playsinline","portrait","responsive","speed","texttrack","title","transparent","url","width"];function m(r,e){var t=1<arguments.length&&void 0!==e?e:{};return c.reduce(function(e,t){var n=r.getAttribute("data-vimeo-".concat(t));return!n&&""!==n||(e[t]=""===n?1:n),e},t)}function p(e,t){var n=e.html;if(!t)throw new TypeError("An element must be provided");if(null!==t.getAttribute("data-vimeo-initialized"))return t.querySelector("iframe");var r=document.createElement("div");return r.innerHTML=n,t.appendChild(r.firstChild),t.setAttribute("data-vimeo-initialized","true"),t.querySelector("iframe")}function y(i,e,t){var a=1<arguments.length&&void 0!==e?e:{},u=2<arguments.length?t:void 0;return new Promise(function(t,n){if(!l(i))throw new TypeError("“".concat(i,"” is not a vimeo.com url."));var e="https://vimeo.com/api/oembed.json?url=".concat(encodeURIComponent(i));for(var r in a)a.hasOwnProperty(r)&&(e+="&".concat(r,"=").concat(encodeURIComponent(a[r])));var o=new("XDomainRequest"in window?XDomainRequest:XMLHttpRequest);o.open("GET",e,!0),o.onload=function(){if(404!==o.status)if(403!==o.status)try{var e=JSON.parse(o.responseText);if(403===e.domain_status_code)return p(e,u),void n(new Error("“".concat(i,"” is not embeddable.")));t(e)}catch(e){n(e)}else n(new Error("“".concat(i,"” is not embeddable.")));else n(new Error("“".concat(i,"” was not found.")))},o.onerror=function(){var e=o.status?" (".concat(o.status,")"):"";n(new Error("There was an error fetching the embed code from Vimeo".concat(e,".")))},o.send()})}function g(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){return console.warn(e),{}}return e}function w(e,t,n){if(e.element.contentWindow&&e.element.contentWindow.postMessage){var r={method:t};void 0!==n&&(r.value=n);var o=parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/,"$1"));8<=o&&o<10&&(r=JSON.stringify(r)),e.element.contentWindow.postMessage(r,e.origin)}}function b(n,r){var t,e=[];if((r=g(r)).event){if("error"===r.event)u(n,r.data.method).forEach(function(e){var t=new Error(r.data.message);t.name=r.data.name,e.reject(t),v(n,r.data.method,e)});e=u(n,"event:".concat(r.event)),t=r.data}else if(r.method){var o=function(e,t){var n=u(e,t);if(n.length<1)return!1;var r=n.shift();return v(e,t,r),r}(n,r.method);o&&(e.push(o),t=r.value)}e.forEach(function(e){try{if("function"==typeof e)return void e.call(n,t);e.resolve(t)}catch(e){}})}var k,E,T,F=new WeakMap,_=new WeakMap,M={},Player=function(){function Player(u){var e,c=this,t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};if(!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Player),window.jQuery&&u instanceof jQuery&&(1<u.length&&window.console&&console.warn&&console.warn("A jQuery object with multiple elements was passed, using the first element."),u=u[0]),"undefined"!=typeof document&&"string"==typeof u&&(u=document.getElementById(u)),e=u,!Boolean(e&&1===e.nodeType&&"nodeName"in e&&e.ownerDocument&&e.ownerDocument.defaultView))throw new TypeError("You must pass either a valid element or a valid id.");if("IFRAME"!==u.nodeName){var n=u.querySelector("iframe");n&&(u=n)}if("IFRAME"===u.nodeName&&!l(u.getAttribute("src")||""))throw new Error("The player element passed isn’t a Vimeo embed.");if(F.has(u))return F.get(u);this._window=u.ownerDocument.defaultView,this.element=u,this.origin="*";var r=new f(function(i,a){if(c._onMessage=function(e){if(l(e.origin)&&c.element.contentWindow===e.source){"*"===c.origin&&(c.origin=e.origin);var t=g(e.data);if(t&&"error"===t.event&&t.data&&"ready"===t.data.method){var n=new Error(t.data.message);return n.name=t.data.name,void a(n)}var r=t&&"ready"===t.event,o=t&&"ping"===t.method;if(r||o)return c.element.setAttribute("data-ready","true"),void i();b(c,t)}},c._window.addEventListener("message",c._onMessage),"IFRAME"!==c.element.nodeName){var e=m(u,t);y(s(e),e,u).then(function(e){var t,n,r,o=p(e,u);return c.element=o,c._originalElement=u,t=u,n=o,r=d.get(t),d.set(n,r),d.delete(t),F.set(c.element,c),e}).catch(a)}});if(_.set(this,r),F.set(this.element,this),"IFRAME"===this.element.nodeName&&w(this,"ping"),M.isEnabled){var o=function(){return M.exit()};M.on("fullscreenchange",function(){(M.isFullscreen?h:v)(c,"event:exitFullscreen",o),c.ready().then(function(){w(c,"fullscreenchange",M.isFullscreen)})})}return this}var e,t,n;return e=Player,(t=[{key:"callMethod",value:function(n,e){var r=this,o=1<arguments.length&&void 0!==e?e:{};return new f(function(e,t){return r.ready().then(function(){h(r,n,{resolve:e,reject:t}),w(r,n,o)}).catch(t)})}},{key:"get",value:function(n){var r=this;return new f(function(e,t){return n=i(n,"get"),r.ready().then(function(){h(r,n,{resolve:e,reject:t}),w(r,n)}).catch(t)})}},{key:"set",value:function(n,r){var o=this;return new f(function(e,t){if(n=i(n,"set"),null==r)throw new TypeError("There must be a value to set.");return o.ready().then(function(){h(o,n,{resolve:e,reject:t}),w(o,n,r)}).catch(t)})}},{key:"on",value:function(e,t){if(!e)throw new TypeError("You must pass an event name.");if(!t)throw new TypeError("You must pass a callback function.");if("function"!=typeof t)throw new TypeError("The callback must be a function.");0===u(this,"event:".concat(e)).length&&this.callMethod("addEventListener",e).catch(function(){}),h(this,"event:".concat(e),t)}},{key:"off",value:function(e,t){if(!e)throw new TypeError("You must pass an event name.");if(t&&"function"!=typeof t)throw new TypeError("The callback must be a function.");v(this,"event:".concat(e),t)&&this.callMethod("removeEventListener",e).catch(function(e){})}},{key:"loadVideo",value:function(e){return this.callMethod("loadVideo",e)}},{key:"ready",value:function(){var e=_.get(this)||new f(function(e,t){t(new Error("Unknown player. Probably unloaded."))});return f.resolve(e)}},{key:"addCuePoint",value:function(e,t){var n=1<arguments.length&&void 0!==t?t:{};return this.callMethod("addCuePoint",{time:e,data:n})}},{key:"removeCuePoint",value:function(e){return this.callMethod("removeCuePoint",e)}},{key:"enableTextTrack",value:function(e,t){if(!e)throw new TypeError("You must pass a language.");return this.callMethod("enableTextTrack",{language:e,kind:t})}},{key:"disableTextTrack",value:function(){return this.callMethod("disableTextTrack")}},{key:"pause",value:function(){return this.callMethod("pause")}},{key:"play",value:function(){return this.callMethod("play")}},{key:"requestFullscreen",value:function(){return M.isEnabled?M.request(this.element):this.callMethod("requestFullscreen")}},{key:"exitFullscreen",value:function(){return M.isEnabled?M.exit():this.callMethod("exitFullscreen")}},{key:"getFullscreen",value:function(){return M.isEnabled?f.resolve(M.isFullscreen):this.get("fullscreen")}},{key:"unload",value:function(){return this.callMethod("unload")}},{key:"destroy",value:function(){var t=this;return new f(function(e){_.delete(t),F.delete(t.element),t._originalElement&&(F.delete(t._originalElement),t._originalElement.removeAttribute("data-vimeo-initialized")),t.element&&"IFRAME"===t.element.nodeName&&t.element.parentNode&&t.element.parentNode.removeChild(t.element),t._window.removeEventListener("message",t._onMessage),e()})}},{key:"getAutopause",value:function(){return this.get("autopause")}},{key:"setAutopause",value:function(e){return this.set("autopause",e)}},{key:"getBuffered",value:function(){return this.get("buffered")}},{key:"getChapters",value:function(){return this.get("chapters")}},{key:"getCurrentChapter",value:function(){return this.get("currentChapter")}},{key:"getColor",value:function(){return this.get("color")}},{key:"setColor",value:function(e){return this.set("color",e)}},{key:"getCuePoints",value:function(){return this.get("cuePoints")}},{key:"getCurrentTime",value:function(){return this.get("currentTime")}},{key:"setCurrentTime",value:function(e){return this.set("currentTime",e)}},{key:"getDuration",value:function(){return this.get("duration")}},{key:"getEnded",value:function(){return this.get("ended")}},{key:"getLoop",value:function(){return this.get("loop")}},{key:"setLoop",value:function(e){return this.set("loop",e)}},{key:"setMuted",value:function(e){return this.set("muted",e)}},{key:"getMuted",value:function(){return this.get("muted")}},{key:"getPaused",value:function(){return this.get("paused")}},{key:"getPlaybackRate",value:function(){return this.get("playbackRate")}},{key:"setPlaybackRate",value:function(e){return this.set("playbackRate",e)}},{key:"getPlayed",value:function(){return this.get("played")}},{key:"getSeekable",value:function(){return this.get("seekable")}},{key:"getSeeking",value:function(){return this.get("seeking")}},{key:"getTextTracks",value:function(){return this.get("textTracks")}},{key:"getVideoEmbedCode",value:function(){return this.get("videoEmbedCode")}},{key:"getVideoId",value:function(){return this.get("videoId")}},{key:"getVideoTitle",value:function(){return this.get("videoTitle")}},{key:"getVideoWidth",value:function(){return this.get("videoWidth")}},{key:"getVideoHeight",value:function(){return this.get("videoHeight")}},{key:"getVideoUrl",value:function(){return this.get("videoUrl")}},{key:"getVolume",value:function(){return this.get("volume")}},{key:"setVolume",value:function(e){return this.set("volume",e)}}])&&r(e.prototype,t),n&&r(e,n),Player}();return e||(k=function(){for(var e,t=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],n=0,r=t.length,o={};n<r;n++)if((e=t[n])&&e[1]in document){for(n=0;n<e.length;n++)o[t[0][n]]=e[n];return o}return!1}(),E={fullscreenchange:k.fullscreenchange,fullscreenerror:k.fullscreenerror},T={request:function(o){return new Promise(function(e,t){function n(){T.off("fullscreenchange",n),e()}T.on("fullscreenchange",n);var r=(o=o||document.documentElement)[k.requestFullscreen]();r instanceof Promise&&r.then(n).catch(t)})},exit:function(){return new Promise(function(t,e){if(T.isFullscreen){var n=function e(){T.off("fullscreenchange",e),t()};T.on("fullscreenchange",n);var r=document[k.exitFullscreen]();r instanceof Promise&&r.then(n).catch(e)}else t()})},on:function(e,t){var n=E[e];n&&document.addEventListener(n,t)},off:function(e,t){var n=E[e];n&&document.removeEventListener(n,t)}},Object.defineProperties(T,{isFullscreen:{get:function(){return Boolean(document[k.fullscreenElement])}},element:{enumerable:!0,get:function(){return document[k.fullscreenElement]}},isEnabled:{enumerable:!0,get:function(){return Boolean(document[k.fullscreenEnabled])}}}),M=T,function(e){function n(e){"console"in window&&console.error&&console.error("There was an error creating an embed: ".concat(e))}var t=0<arguments.length&&void 0!==e?e:document;[].slice.call(t.querySelectorAll("[data-vimeo-id], [data-vimeo-url]")).forEach(function(t){try{if(null!==t.getAttribute("data-vimeo-defer"))return;var e=m(t);y(s(e),e,t).then(function(e){return p(e,t)}).catch(n)}catch(e){n(e)}})}(),function(e){var r=0<arguments.length&&void 0!==e?e:document;if(!window.VimeoPlayerResizeEmbeds_){window.VimeoPlayerResizeEmbeds_=!0;window.addEventListener("message",function(e){if(l(e.origin)&&e.data&&"spacechange"===e.data.event)for(var t=r.querySelectorAll("iframe"),n=0;n<t.length;n++)if(t[n].contentWindow===e.source){t[n].parentElement.style.paddingBottom="".concat(e.data.data[0].bottom,"px");break}})}}()),Player});


/*        
*/

function basic_vimeo_init(){
	
	setTimeout(function(){
		
		$('.basic_vimeo_container').each(function(){
			
			var $this = $(this)
			
			var $iframe = $('.basic_vimeo_iframe', $this)
			var iframe = $iframe[0]
		    var player = new Vimeo.Player(iframe)
		    
		    player.setAutopause(true)
		    player.pause()
		    player.setCurrentTime(0)
		 
			setTimeout(function(){
				player.play()
				$iframe.css({'opacity': 1})
			}, 200)
			
			$('.basic_vimeo_sound', $this).on('click.cms', function(){
				if ($(this).hasClass('basic_vimeo_sound_is_off')){
					$(this).addClass('basic_vimeo_sound_is_on').removeClass('basic_vimeo_sound_is_off')
					player.setVolume(0.75)
				} else {
					$(this).addClass('basic_vimeo_sound_is_off').removeClass('basic_vimeo_sound_is_on')
					player.setVolume(0)
				}
			})
			
			if ($this.hasClass('basic_vimeo_cover')){
				
				Promise.all([player.getVideoWidth(), player.getVideoHeight()]).then(function(dimensions) {
					
					var width = dimensions[0]
					var height = dimensions[1]
					
					$this.data({'width':width,'height':height})
					basic_vimeo_resize()
					
				});
			}
			
		})

	}, 1000)
}

function basic_vimeo_resize(){
	
	$('.basic_vimeo_cover').each(function(){
		
		var $this = $(this)
		
		if($this.data('width') && $this.data('height')){
			
			var video_ratio = $this.data('width')/$this.data('height')
			
			var container_width = $this.width()
			var container_height = $this.height()
			var container_ratio = container_width/container_height
			
			var $iframe = $('.basic_vimeo_iframe', $this)
			
			if (video_ratio > container_ratio){ 
				$iframe.css({'height':container_height, 'width': container_width * (video_ratio/container_ratio)})
			} else {
				$iframe.css({'width':container_width, 'height': container_height * (container_ratio/video_ratio)})
			}
			
			$iframe.css({'position':'absolute', 'top':'50%', 'left':'50%', 'transform':'translate(-50%,-50%)'})
			
			if($iframe.parent().css('position') == 'static'){
				$iframe.parent().css({'position':'relative'})
			}
			
		}
		
	})

}

function basic_vimeo_scroll(){
	
}

$(document).ready(function() {
	
	$(window).on('resize.cms', basic_vimeo_resize)
	$(window).on('scroll.cms', basic_vimeo_scroll)
	
	basic_vimeo_init()
	basic_vimeo_resize()
	basic_vimeo_scroll()

});
