!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var r;n.r(t);var o=indexedDB.open("budget",1);function a(){var e=r.transaction(["pending"],"readwrite").objectStore("pending").getAll();e.onsuccess=function(){e.result.length>0&&fetch("/api/transaction/bulk",{method:"POST",body:JSON.stringify(e.result),headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(){r.transaction(["pending"],"readwrite").objectStore("pending").clear()}))}}o.onupgradeneeded=function(e){e.target.result.createObjectStore("pending",{autoIncrement:!0})},o.onsuccess=function(e){r=e.target.result,navigator.onLine&&a()},o.onerror=function(e){console.log("Woops! "+e.target.errorCode)};var c,u=[];function i(){var e=u.reduce((function(e,t){return e+parseInt(t.value)}),0);document.querySelector("#total").textContent=e}function l(){var e=document.querySelector("#tbody");e.innerHTML="",u.forEach((function(t){var n=document.createElement("tr");n.innerHTML="\n      <td>".concat(t.name,"</td>\n      <td>").concat(t.value,"</td>\n    "),e.appendChild(n)}))}function d(){var e=u.slice().reverse(),t=0,n=e.map((function(e){var t=new Date(e.date);return"".concat(t.getMonth()+1,"/").concat(t.getDate(),"/").concat(t.getFullYear())})),r=e.map((function(e){return t+=parseInt(e.value)}));c&&c.destroy();var o=document.getElementById("myChart").getContext("2d");c=new Chart(o,{type:"line",data:{labels:n,datasets:[{label:"Total Over Time",fill:!0,backgroundColor:"#6666ff",data:r}]}})}function f(e){var t=document.querySelector("#t-name"),n=document.querySelector("#t-amount"),o=document.querySelector(".form .error");if(""!==t.value&&""!==n.value){o.textContent="";var a={name:t.value,value:n.value,date:(new Date).toISOString()};e||(a.value*=-1),u.unshift(a),d(),l(),i(),fetch("/api/transaction",{method:"POST",body:JSON.stringify(a),headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){e.errors?o.textContent="Missing Information":(t.value="",n.value="")})).catch((function(e){var o;o=a,r.transaction(["pending"],"readwrite").objectStore("pending").add(o),t.value="",n.value=""}))}else o.textContent="Missing Information"}fetch("/api/transaction").then((function(e){return e.json()})).then((function(e){u=e,i(),l(),d()})),document.querySelector("#add-btn").onclick=function(){f(!0)},document.querySelector("#sub-btn").onclick=function(){f(!1)},window.addEventListener("online",a)}]);
