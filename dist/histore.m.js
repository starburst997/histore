export default function(){if("undefined"==typeof history)return{get:function(){},set:function(){}};var t,o=!0;return void 0===window.transit&&(window.transit={},o=!1),history,history,o||(history.pushState=(t=history.pushState,function(o,n,i){return console.log("PushState called"),history.replaceState(window.transit),window.transit.position=0,console.log(Object.assign({},history.state,o||{},window.transit)),t.call(history,Object.assign({},history.state,o||{},window.transit),n,i)}),history.replaceState=function(t){return function(o,n,i){return console.log("ReplaceState called"),console.log(Object.assign({},history.state,o||{},window.transit)),t.call(history,Object.assign({},history.state,o||{},window.transit),n,i)}}(history.replaceState)),{set:function(t,o){window.transit[t]=o,console.log("*** Set transit: "+t+" / "+o)},get:function(t){return history.state&&history.state[t]},flush:function(){console.log("*** Flush:"),console.log(window.transit),history.replaceState(window.transit)}}};
//# sourceMappingURL=histore.m.js.map
