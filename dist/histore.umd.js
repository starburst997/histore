!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?module.exports=i():"function"==typeof define&&define.amd?define(i):t.histore=i()}(this,function(){return function(){if("undefined"==typeof history)return{get:function(){},set:function(){},reset:function(){},flush:function(){}};var t=!0;void 0===window.__histore_transit&&(window.__histore_transit={},window.__histore_transit_id=-1,t=!1);var i,e=function(){history.replaceState(window.__histore_transit)};return t||(history.pushState=(i=history.pushState,function(t,e,n){if(history.replaceState(window.__histore_transit),void 0!==window.__histore_reset)for(var o in window.__histore_reset)Object.prototype.hasOwnProperty.call(window.__histore_reset,o)&&(window.__histore_transit[o]=window.__histore_reset[o]);return i.call(history,Object.assign({},history.state,t||{},window.__histore_transit),e,n)}),history.replaceState=function(t){return function(i,e,n){return t.call(history,Object.assign({},history.state,i||{}),e,n)}}(history.replaceState)),{set:function(t,i,n){void 0===n&&(n=!1),clearTimeout(window.__histore_transit_id),window.__histore_transit[t]=i,n?e():window.__histore_transit_id=setTimeout(function(){return e()},100)},get:function(t){return history.state&&history.state[t]},getTransit:function(t){return window.__histore_transit[t]},setTransit:function(t,i){window.__histore_transit[t]=i},flush:e,reset:function(t){window.__histore_reset=t}}}});
//# sourceMappingURL=histore.umd.js.map
