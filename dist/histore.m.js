export default function(){if("undefined"==typeof history)return{get:function(){},set:function(){}};var t={},e=function(e){return function(r,n,i){return e.call(history,Object.assign({},history.state,r||{},t),n,i)}};return history.pushState=e(history.pushState),history.replaceState=e(history.replaceState),{set:function(e,r){t[e]=r},get:function(t){return history.state&&history.state[t]}}};
//# sourceMappingURL=histore.m.js.map
