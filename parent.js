!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).iframy={})}(this,(function(t){"use strict";function e(t,e,r,n,i,o,a){try{var s=t[o](a),u=s.value}catch(t){return void r(t)}s.done?e(u):Promise.resolve(u).then(n,i)}function r(t){return function(){var r=this,n=arguments;return new Promise((function(i,o){var a=t.apply(r,n);function s(t){e(a,i,o,s,u,"next",t)}function u(t){e(a,i,o,s,u,"throw",t)}s(void 0)}))}}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function o(t,e,r){return e&&i(t.prototype,e),r&&i(t,r),t}function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var s=function(t){var e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},i=n.iterator||"@@iterator",o=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function s(t,e,r,n){var i=e&&e.prototype instanceof h?e:h,o=Object.create(i.prototype),a=new L(n||[]);return o._invoke=function(t,e,r){var n="suspendedStart";return function(i,o){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===i)throw o;return E()}for(r.method=i,r.arg=o;;){var a=r.delegate;if(a){var s=w(a,r);if(s){if(s===c)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var h=u(t,e,r);if("normal"===h.type){if(n=r.done?"completed":"suspendedYield",h.arg===c)continue;return{value:h.arg,done:r.done}}"throw"===h.type&&(n="completed",r.method="throw",r.arg=h.arg)}}}(t,r,a),o}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var c={};function h(){}function l(){}function f(){}var d={};d[i]=function(){return this};var p=Object.getPrototypeOf,v=p&&p(p(k([])));v&&v!==e&&r.call(v,i)&&(d=v);var m=f.prototype=h.prototype=Object.create(d);function y(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function g(t){var e;this._invoke=function(n,i){function o(){return new Promise((function(e,o){!function e(n,i,o,a){var s=u(t[n],t,i);if("throw"!==s.type){var c=s.arg,h=c.value;return h&&"object"==typeof h&&r.call(h,"__await")?Promise.resolve(h.__await).then((function(t){e("next",t,o,a)}),(function(t){e("throw",t,o,a)})):Promise.resolve(h).then((function(t){c.value=t,o(c)}),(function(t){return e("throw",t,o,a)}))}a(s.arg)}(n,i,e,o)}))}return e=e?e.then(o,o):o()}}function w(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,w(t,e),"throw"===e.method))return c;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return c}var n=u(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,c;var i=n.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,c):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,c)}function b(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function x(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function L(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(b,this),this.reset(!0)}function k(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:E}}function E(){return{value:void 0,done:!0}}return l.prototype=m.constructor=f,f.constructor=l,f[a]=l.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===l||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,f):(t.__proto__=f,a in t||(t[a]="GeneratorFunction")),t.prototype=Object.create(m),t},t.awrap=function(t){return{__await:t}},y(g.prototype),g.prototype[o]=function(){return this},t.AsyncIterator=g,t.async=function(e,r,n,i){var o=new g(s(e,r,n,i));return t.isGeneratorFunction(r)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},y(m),m[a]="Generator",m[i]=function(){return this},m.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=k,L.prototype={constructor:L,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(x),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],a=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var s=r.call(o,"catchLoc"),u=r.call(o,"finallyLoc");if(s&&u){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(s){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&r.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,c):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),c},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),x(r),c}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var i=n.arg;x(r)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:k(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),c}},t}("object"==typeof module?module.exports:{});try{regeneratorRuntime=s}catch(t){Function("r","regeneratorRuntime = r")(s)}var u=function(t){var e=t.id,r=t.type,n=t.data,i=void 0===n?null:n,o=t.meta,a=void 0===o?null:o,s=t.name,u=void 0===s?null:s,c=t.uid,h=void 0===c?null:c;return JSON.stringify({id:e,data:i,meta:a,name:u,type:r,uid:h})},c=function(){function t(){n(this,t),a(this,"listeners",{})}return o(t,[{key:"on",value:function(t,e){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(e)}},{key:"once",value:function(t,e){var r=this;this.listeners[t]||(this.listeners[t]=[]);this.listeners[t].push((function n(i){e(i);for(var o=0;o<r.listeners[t].length;o++)r.listeners[t][o]===n&&r.listeners[t].splice(o,1)}))}},{key:"off",value:function(t,e){if(this.listeners[t])for(var r=0;r<this.listeners[t].length;r++)this.listeners[t][r]===e&&this.listeners[t].splice(r,1)}},{key:"offAll",value:function(t){this.listeners[t]=[]}},{key:"emit",value:function(t,e){this.listeners[t]&&this.listeners[t].forEach((function(t){return t(e)}))}}]),t}(),h=function(){function t(e){n(this,t),a(this,"internalBus",new c),a(this,"listenersBus",new c),a(this,"dimensions",void 0),a(this,"props",void 0),a(this,"scrolling",void 0),a(this,"url",void 0),a(this,"frame",void 0),a(this,"uid",void 0),a(this,"API",{}),a(this,"on",this.addListener.bind(this)),a(this,"once",this.addListenerOnce.bind(this)),a(this,"off",this.removeListener.bind(this)),a(this,"offAll",this.removeAllListeners.bind(this));var r=e.dimensions,i=void 0===r?{}:r,o=e.props,s=void 0===o?{}:o,u=e.scrolling,h=void 0!==u&&u,l=e.url;this.dimensions=i,this.props=s,this.scrolling=h,this.url=l,this.uid=this.generateID(),this.frame=document.createElement("iframe"),this.frame.setAttribute("src","".concat(this.url,"?").concat("@if-uid","=").concat(this.uid)),this.dimensions.width&&this.frame.setAttribute("width",this.dimensions.width),this.dimensions.height&&this.frame.setAttribute("height",this.dimensions.height),this.frame.setAttribute("scrolling",this.scrolling?"yes":"no"),this.globalListener=this.globalListener.bind(this),window.addEventListener("message",this.globalListener)}var e,i;return o(t,[{key:"generateID",value:function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)}},{key:"waitForMessage",value:(i=r(regeneratorRuntime.mark((function t(e,r){var n=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t){n.internalBus.on(e,(function i(o){var a=o.id;if(o.uid===n.uid&&(!r||r===a))return n.internalBus.off(e,i),t(o)}))})));case 1:case"end":return t.stop()}}),t)}))),function(t,e){return i.apply(this,arguments)})},{key:"globalListener",value:function(t){var e,r,n;try{r=t.data,e={id:(n=JSON.parse(r)).id,data:n.data,meta:n.meta,name:n.name,type:n.type,uid:n.uid}}catch(t){return void console.warn("Message received, but was not parsed")}var i=e,o=i.id,a=i.data,s=i.name,u=i.type,c=i.uid;c===this.uid&&(this.internalBus.emit(u,{id:o,data:a,name:s,type:u,uid:c}),"@if-ch-to-p"===u&&this.listenersBus.emit(s,a))}},{key:"sendMessage",value:function(t){var e,r=t.id,n=t.data,i=t.name,o=t.type;try{e=u({id:r,data:n,name:i,type:o})}catch(t){console.warn("Message was not serialized successfully, please check the data you passed"),e=u({id:r,meta:{errorType:"coerce-error"},name:i,type:o})}this.frame.contentWindow.postMessage(e,"*")}},{key:"exposeApi",value:function(t){for(var e=this,n=function(n){var i=t[n],o=e.generateID(),a=function(){var t=r(regeneratorRuntime.mark((function t(r){var n,a,s,u,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.sendMessage({data:r,id:o,name:i,type:"@if-api-req"}),t.next=3,e.waitForMessage("@if-api-res",o);case 3:if(n=t.sent,a=n.data,s=n.meta,c=(u=void 0===s?{}:s).error){t.next=10;break}return t.abrupt("return",a);case 10:if("coerce-error"!==c){t.next=12;break}throw new Error("Message was not serialized successfully in child component");case 12:if("regular-error"!==c){t.next=14;break}throw new Error(u.message||"Error occured inside child compomnent");case 14:throw new Error("Unknown error. Please check method implementation in child component");case 15:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();e.API[i]=a},i=0;i<t.length;i++)n(i)}},{key:"render",value:(e=r(regeneratorRuntime.mark((function t(e){var r,n,i,o=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=e instanceof HTMLElement?e:document.querySelector(e)){t.next=3;break}throw new Error("Parent element does not exist");case 3:return r.appendChild(this.frame),t.next=6,new Promise((function(t){o.frame.addEventListener("load",(function e(){o.frame.removeEventListener("load",e),t()}))}));case 6:return this.sendMessage({data:{props:this.props},type:"@if-init-req"}),t.next=9,this.waitForMessage("@if-init-res");case 9:return n=t.sent,i=n.data,this.exposeApi(i),t.abrupt("return",this);case 13:case"end":return t.stop()}}),t,this)}))),function(t){return e.apply(this,arguments)})},{key:"addListener",value:function(t,e){this.listenersBus.on(t,e)}},{key:"addListenerOnce",value:function(t,e){this.listenersBus.once(t,e)}},{key:"removeListener",value:function(t,e){this.listenersBus.off(t,e)}},{key:"removeAllListeners",value:function(t){this.listenersBus.offAll(t)}},{key:"emit",value:function(t,e){this.sendMessage({data:e,name:t,type:"@if-p-to-ch"})}}],[{key:"create",value:function(e){return new t(e)}}]),t}();t.IFramyParent=h,Object.defineProperty(t,"__esModule",{value:!0})}));
