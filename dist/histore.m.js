export default function(){if("undefined"==typeof history)return{get:function(){},set:function(){},reset:function(){},flush:function(){}};var t=!0;void 0===window.__histore_transit&&(window.__histore_transit={},window.__histore_transit_id=-1,t=!1);var i,r=function(){history.replaceState(window.__histore_transit)};return t||(history.pushState=(i=history.pushState,function(t,r,e){if(history.replaceState(window.__histore_transit),void 0!==window.__histore_reset)for(var n in window.__histore_reset)Object.prototype.hasOwnProperty.call(window.__histore_reset,n)&&(window.__histore_transit[n]=window.__histore_reset[n]);return i.call(history,Object.assign({},history.state,t||{},window.__histore_transit),r,e)}),history.replaceState=function(t){return function(i,r,e){return t.call(history,Object.assign({},history.state,i||{}),r,e)}}(history.replaceState)),{set:function(t,i,e){void 0===e&&(e=!1),clearTimeout(window.__histore_transit_id),window.__histore_transit[t]=i,e?r():window.__histore_transit_id=setTimeout(function(){return r()},100)},get:function(t){return history.state&&history.state[t]},getTransit:function(t){return window.__histore_transit[t]},setTransit:function(t,i){window.__histore_transit[t]=i},flush:r,reset:function(t){window.__histore_reset=t}}};
//# sourceMappingURL=histore.m.js.map
