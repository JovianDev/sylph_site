var app=function(){"use strict";function e(){}function s(e){return e()}function i(){return Object.create(null)}function t(e){e.forEach(s)}function n(e){return"function"==typeof e}function o(e,s){return e!=e?s==s:e!==s||e&&"object"==typeof e||"function"==typeof e}let r,a;function l(e,s){return r||(r=document.createElement("a")),r.href=s,e===r.href}function d(e,s){e.appendChild(s)}function c(e,s,i){e.insertBefore(s,i||null)}function w(e){e.parentNode.removeChild(e)}function u(e){return document.createElement(e)}function p(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function m(e){return document.createTextNode(e)}function b(){return m(" ")}function f(e,s,i){null==i?e.removeAttribute(s):e.getAttribute(s)!==i&&e.setAttribute(s,i)}function h(e,s){s=""+s,e.wholeText!==s&&(e.data=s)}function g(e){a=e}const v=[],x=[],y=[],k=[],$=Promise.resolve();let S=!1;function _(e){y.push(e)}let A=!1;const E=new Set;function T(){if(!A){A=!0;do{for(let e=0;e<v.length;e+=1){const s=v[e];g(s),C(s.$$)}for(g(null),v.length=0;x.length;)x.pop()();for(let e=0;e<y.length;e+=1){const s=y[e];E.has(s)||(E.add(s),s())}y.length=0}while(v.length);for(;k.length;)k.pop()();S=!1,A=!1,E.clear()}}function C(e){if(null!==e.fragment){e.update(),t(e.before_update);const s=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,s),e.after_update.forEach(_)}}const O=new Set;function z(e,s){e&&e.i&&(O.delete(e),e.i(s))}function N(e,s,i,t){if(e&&e.o){if(O.has(e))return;O.add(e),undefined.c.push((()=>{O.delete(e),t&&(i&&e.d(1),t())})),e.o(s)}}function M(e){e&&e.c()}function B(e,i,o,r){const{fragment:a,on_mount:l,on_destroy:d,after_update:c}=e.$$;a&&a.m(i,o),r||_((()=>{const i=l.map(s).filter(n);d?d.push(...i):t(i),e.$$.on_mount=[]})),c.forEach(_)}function R(e,s){const i=e.$$;null!==i.fragment&&(t(i.on_destroy),i.fragment&&i.fragment.d(s),i.on_destroy=i.fragment=null,i.ctx=[])}function q(e,s){-1===e.$$.dirty[0]&&(v.push(e),S||(S=!0,$.then(T)),e.$$.dirty.fill(0)),e.$$.dirty[s/31|0]|=1<<s%31}function D(s,n,o,r,l,d,c,u=[-1]){const p=a;g(s);const m=s.$$={fragment:null,ctx:null,props:d,update:e,not_equal:l,bound:i(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(p?p.$$.context:[])),callbacks:i(),dirty:u,skip_bound:!1,root:n.target||p.$$.root};c&&c(m.root);let b=!1;if(m.ctx=o?o(s,n.props||{},((e,i,...t)=>{const n=t.length?t[0]:i;return m.ctx&&l(m.ctx[e],m.ctx[e]=n)&&(!m.skip_bound&&m.bound[e]&&m.bound[e](n),b&&q(s,e)),i})):[],m.update(),b=!0,t(m.before_update),m.fragment=!!r&&r(m.ctx),n.target){if(n.hydrate){const e=function(e){return Array.from(e.childNodes)}(n.target);m.fragment&&m.fragment.l(e),e.forEach(w)}else m.fragment&&m.fragment.c();n.intro&&z(s.$$.fragment),B(s,n.target,n.anchor,n.customElement),T()}g(p)}class I{$destroy(){R(this,1),this.$destroy=e}$on(e,s){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(s),()=>{const e=i.indexOf(s);-1!==e&&i.splice(e,1)}}$set(e){var s;this.$$set&&(s=e,0!==Object.keys(s).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function L(s){let i,t,n,o,r,a,g,v,x,y,k,$,S,_,A,E,T,C;return{c(){i=u("div"),t=u("div"),n=u("img"),r=b(),a=u("h4"),g=m(s[1]),v=b(),x=u("p"),x.textContent="Software Engineer",y=b(),k=u("div"),$=u("a"),S=p("svg"),_=p("path"),A=b(),E=u("a"),T=p("svg"),C=p("path"),l(n.src,o=s[0])||f(n,"src",o),f(n,"alt",s[1]),f(n,"class","svelte-hws98i"),f(t,"class","dev-img svelte-hws98i"),f(a,"class","svelte-hws98i"),f(x,"class","svelte-hws98i"),f(_,"d","M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"),f(S,"xmlns","http://www.w3.org/2000/svg"),f(S,"width","40"),f(S,"height","40"),f(S,"fill","currentColor"),f(S,"class","bi bi-linkedin"),f(S,"viewBox","0 0 16 16"),f($,"href",s[2]),f($,"target","__blank"),f($,"class","svelte-hws98i"),f(C,"d","M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"),f(T,"xmlns","http://www.w3.org/2000/svg"),f(T,"width","40"),f(T,"height","40"),f(T,"fill","currentColor"),f(T,"class","bi bi-github"),f(T,"viewBox","0 0 16 16"),f(E,"href",s[3]),f(E,"target","__blank"),f(E,"class","svelte-hws98i"),f(k,"class","dev-links svelte-hws98i"),f(i,"class","dev svelte-hws98i")},m(e,s){c(e,i,s),d(i,t),d(t,n),d(i,r),d(i,a),d(a,g),d(i,v),d(i,x),d(i,y),d(i,k),d(k,$),d($,S),d(S,_),d(k,A),d(k,E),d(E,T),d(T,C)},p(e,[s]){1&s&&!l(n.src,o=e[0])&&f(n,"src",o),2&s&&f(n,"alt",e[1]),2&s&&h(g,e[1]),4&s&&f($,"href",e[2]),8&s&&f(E,"href",e[3])},i:e,o:e,d(e){e&&w(i)}}}function F(e,s,i){let{devImg:t}=s,{name:n}=s,{linkedin:o}=s,{github:r}=s;return e.$$set=e=>{"devImg"in e&&i(0,t=e.devImg),"name"in e&&i(1,n=e.name),"linkedin"in e&&i(2,o=e.linkedin),"github"in e&&i(3,r=e.github)},[t,n,o,r]}class j extends I{constructor(e){super(),D(this,e,F,L,o,{devImg:0,name:1,linkedin:2,github:3})}}function V(s){let i,t,n,o,r,a=`Download for ${s[0]}`;return{c(){i=u("button"),t=u("i"),n=b(),o=u("span"),r=m(a),f(t,"class","fa fa-download"),f(i,"class","download-btn svelte-190sovi")},m(e,s){c(e,i,s),d(i,t),d(i,n),d(i,o),d(o,r)},p(e,[s]){1&s&&a!==(a=`Download for ${e[0]}`)&&h(r,a)},i:e,o:e,d(e){e&&w(i)}}}function P(e,s,i){let{OS:t}=s;return e.$$set=e=>{"OS"in e&&i(0,t=e.OS)},[t]}class H extends I{constructor(e){super(),D(this,e,P,V,o,{OS:0})}}var U="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/*!@license
     * UAParser.js v0.7.28
     * Lightweight JavaScript-based User-Agent string parser
     * https://github.com/faisalman/ua-parser-js
     *
     * Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
     * Licensed under MIT License
     */
var Q,G,W=(Q=function(e,s){!function(i,t){var n="function",o="object",r="string",a="model",l="name",d="type",c="vendor",w="version",u="architecture",p="console",m="mobile",b="tablet",f="smarttv",h="wearable",g="embedded",v={extend:function(e,s){var i={};for(var t in e)s[t]&&s[t].length%2==0?i[t]=s[t].concat(e[t]):i[t]=e[t];return i},has:function(e,s){return typeof e===r&&-1!==s.toLowerCase().indexOf(e.toLowerCase())},lowerize:function(e){return e.toLowerCase()},major:function(e){return typeof e===r?e.replace(/[^\d\.]/g,"").split(".")[0]:t},trim:function(e,s){return e=e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""),void 0===s?e:e.substring(0,255)}},x={rgx:function(e,s){for(var i,r,a,l,d,c,w=0;w<s.length&&!d;){var u=s[w],p=s[w+1];for(i=r=0;i<u.length&&!d;)if(d=u[i++].exec(e))for(a=0;a<p.length;a++)c=d[++r],typeof(l=p[a])===o&&l.length>0?2==l.length?typeof l[1]==n?this[l[0]]=l[1].call(this,c):this[l[0]]=l[1]:3==l.length?typeof l[1]!==n||l[1].exec&&l[1].test?this[l[0]]=c?c.replace(l[1],l[2]):t:this[l[0]]=c?l[1].call(this,c,l[2]):t:4==l.length&&(this[l[0]]=c?l[3].call(this,c.replace(l[1],l[2])):t):this[l]=c||t;w+=2}},str:function(e,s){for(var i in s)if(typeof s[i]===o&&s[i].length>0){for(var n=0;n<s[i].length;n++)if(v.has(s[i][n],e))return"?"===i?t:i}else if(v.has(s[i],e))return"?"===i?t:i;return e}},y={browser:{oldSafari:{version:{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}},oldEdge:{version:{.1:"12.",21:"13.",31:"14.",39:"15.",41:"16.",42:"17.",44:"18."}}},os:{windows:{version:{ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"}}}},k={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[w,[l,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[w,[l,"Edge"]],[/(opera\smini)\/([\w\.-]+)/i,/(opera\s[mobiletab]{3,6})\b.+version\/([\w\.-]+)/i,/(opera)(?:.+version\/|[\/\s]+)([\w\.]+)/i],[l,w],[/opios[\/\s]+([\w\.]+)/i],[w,[l,"Opera Mini"]],[/\sopr\/([\w\.]+)/i],[w,[l,"Opera"]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,/(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i,/(ba?idubrowser)[\/\s]?([\w\.]+)/i,/(?:ms|\()(ie)\s([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i,/(rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([\w\.]+)/i,/(weibo)__([\d\.]+)/i],[l,w],[/(?:[\s\/]uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i],[w,[l,"UCBrowser"]],[/(?:windowswechat)?\sqbcore\/([\w\.]+)\b.*(?:windowswechat)?/i],[w,[l,"WeChat(Win) Desktop"]],[/micromessenger\/([\w\.]+)/i],[w,[l,"WeChat"]],[/konqueror\/([\w\.]+)/i],[w,[l,"Konqueror"]],[/trident.+rv[:\s]([\w\.]{1,9})\b.+like\sgecko/i],[w,[l,"IE"]],[/yabrowser\/([\w\.]+)/i],[w,[l,"Yandex"]],[/(avast|avg)\/([\w\.]+)/i],[[l,/(.+)/,"$1 Secure Browser"],w],[/focus\/([\w\.]+)/i],[w,[l,"Firefox Focus"]],[/opt\/([\w\.]+)/i],[w,[l,"Opera Touch"]],[/coc_coc_browser\/([\w\.]+)/i],[w,[l,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[w,[l,"Dolphin"]],[/coast\/([\w\.]+)/i],[w,[l,"Opera Coast"]],[/xiaomi\/miuibrowser\/([\w\.]+)/i],[w,[l,"MIUI Browser"]],[/fxios\/([\w\.-]+)/i],[w,[l,"Firefox"]],[/(qihu|qhbrowser|qihoobrowser|360browser)/i],[[l,"360 Browser"]],[/(oculus|samsung|sailfish)browser\/([\w\.]+)/i],[[l,/(.+)/,"$1 Browser"],w],[/(comodo_dragon)\/([\w\.]+)/i],[[l,/_/g," "],w],[/\s(electron)\/([\w\.]+)\ssafari/i,/(tesla)(?:\sqtcarbrowser|\/(20[12]\d\.[\w\.-]+))/i,/m?(qqbrowser|baiduboxapp|2345Explorer)[\/\s]?([\w\.]+)/i],[l,w],[/(MetaSr)[\/\s]?([\w\.]+)/i,/(LBBROWSER)/i],[l],[/;fbav\/([\w\.]+);/i],[w,[l,"Facebook"]],[/FBAN\/FBIOS|FB_IAB\/FB4A/i],[[l,"Facebook"]],[/safari\s(line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(chromium|instagram)[\/\s]([\w\.-]+)/i],[l,w],[/\bgsa\/([\w\.]+)\s.*safari\//i],[w,[l,"GSA"]],[/headlesschrome(?:\/([\w\.]+)|\s)/i],[w,[l,"Chrome Headless"]],[/\swv\).+(chrome)\/([\w\.]+)/i],[[l,"Chrome WebView"],w],[/droid.+\sversion\/([\w\.]+)\b.+(?:mobile\ssafari|safari)/i],[w,[l,"Android Browser"]],[/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i],[l,w],[/version\/([\w\.]+)\s.*mobile\/\w+\s(safari)/i],[w,[l,"Mobile Safari"]],[/version\/([\w\.]+)\s.*(mobile\s?safari|safari)/i],[w,l],[/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],[l,[w,x.str,y.browser.oldSafari.version]],[/(webkit|khtml)\/([\w\.]+)/i],[l,w],[/(navigator|netscape)\/([\w\.-]+)/i],[[l,"Netscape"],w],[/ile\svr;\srv:([\w\.]+)\).+firefox/i],[w,[l,"Firefox Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,/(firefox)\/([\w\.]+)\s[\w\s\-]+\/[\w\.]+$/i,/(mozilla)\/([\w\.]+)\s.+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,/(links)\s\(([\w\.]+)/i,/(gobrowser)\/?([\w\.]*)/i,/(ice\s?browser)\/v?([\w\._]+)/i,/(mosaic)[\/\s]([\w\.]+)/i],[l,w]],cpu:[[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],[[u,"amd64"]],[/(ia32(?=;))/i],[[u,v.lowerize]],[/((?:i[346]|x)86)[;\)]/i],[[u,"ia32"]],[/\b(aarch64|armv?8e?l?)\b/i],[[u,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[u,"armhf"]],[/windows\s(ce|mobile);\sppc;/i],[[u,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],[[u,/ower/,"",v.lowerize]],[/(sun4\w)[;\)]/i],[[u,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?:64|(?=v(?:[1-7]|[5-7]1)l?|;|eabi))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[u,v.lowerize]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus\s10)/i],[a,[c,"Samsung"],[d,b]],[/\b((?:s[cgp]h|gt|sm)-\w+|galaxy\snexus)/i,/\ssamsung[\s-]([\w-]+)/i,/sec-(sgh\w+)/i],[a,[c,"Samsung"],[d,m]],[/\((ip(?:hone|od)[\s\w]*);/i],[a,[c,"Apple"],[d,m]],[/\((ipad);[\w\s\),;-]+apple/i,/applecoremedia\/[\w\.]+\s\((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[a,[c,"Apple"],[d,b]],[/\b((?:agr|ags[23]|bah2?|sht?)-a?[lw]\d{2})/i],[a,[c,"Huawei"],[d,b]],[/d\/huawei([\w\s-]+)[;\)]/i,/\b(nexus\s6p|vog-[at]?l\d\d|ane-[at]?l[x\d]\d|eml-a?l\d\da?|lya-[at]?l\d[\dc]|clt-a?l\d\di?|ele-l\d\d)/i,/\b(\w{2,4}-[atu][ln][01259][019])[;\)\s]/i],[a,[c,"Huawei"],[d,m]],[/\b(poco[\s\w]+)(?:\sbuild|\))/i,/\b;\s(\w+)\sbuild\/hm\1/i,/\b(hm[\s\-_]?note?[\s_]?(?:\d\w)?)\sbuild/i,/\b(redmi[\s\-_]?(?:note|k)?[\w\s_]+)(?:\sbuild|\))/i,/\b(mi[\s\-_]?(?:a\d|one|one[\s_]plus|note lte)?[\s_]?(?:\d?\w?)[\s_]?(?:plus)?)\sbuild/i],[[a,/_/g," "],[c,"Xiaomi"],[d,m]],[/\b(mi[\s\-_]?(?:pad)(?:[\w\s_]+))(?:\sbuild|\))/i],[[a,/_/g," "],[c,"Xiaomi"],[d,b]],[/;\s(\w+)\sbuild.+\soppo/i,/\s(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007)\b/i],[a,[c,"OPPO"],[d,m]],[/\svivo\s(\w+)(?:\sbuild|\))/i,/\s(v[12]\d{3}\w?[at])(?:\sbuild|;)/i],[a,[c,"Vivo"],[d,m]],[/\s(rmx[12]\d{3})(?:\sbuild|;)/i],[a,[c,"Realme"],[d,m]],[/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)\b[\w\s]+build\//i,/\smot(?:orola)?[\s-](\w*)/i,/((?:moto[\s\w\(\)]+|xt\d{3,4}|nexus\s6)(?=\sbuild|\)))/i],[a,[c,"Motorola"],[d,m]],[/\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],[a,[c,"Motorola"],[d,b]],[/((?=lg)?[vl]k\-?\d{3})\sbuild|\s3\.[\s\w;-]{10}lg?-([06cv9]{3,4})/i],[a,[c,"LG"],[d,b]],[/(lm-?f100[nv]?|nexus\s[45])/i,/lg[e;\s\/-]+((?!browser|netcast)\w+)/i,/\blg(\-?[\d\w]+)\sbuild/i],[a,[c,"LG"],[d,m]],[/(ideatab[\w\-\s]+)/i,/lenovo\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+)|yt[\d\w-]{6}|tb[\d\w-]{6})/i],[a,[c,"Lenovo"],[d,b]],[/(?:maemo|nokia).*(n900|lumia\s\d+)/i,/nokia[\s_-]?([\w\.-]*)/i],[[a,/_/g," "],[c,"Nokia"],[d,m]],[/droid.+;\s(pixel\sc)[\s)]/i],[a,[c,"Google"],[d,b]],[/droid.+;\s(pixel[\s\daxl]{0,6})(?:\sbuild|\))/i],[a,[c,"Google"],[d,m]],[/droid.+\s([c-g]\d{4}|so[-l]\w+|xq-a\w[4-7][12])(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[a,[c,"Sony"],[d,m]],[/sony\stablet\s[ps]\sbuild\//i,/(?:sony)?sgp\w+(?:\sbuild\/|\))/i],[[a,"Xperia Tablet"],[c,"Sony"],[d,b]],[/\s(kb2005|in20[12]5|be20[12][59])\b/i,/\ba000(1)\sbuild/i,/\boneplus\s(a\d{4})[\s)]/i],[a,[c,"OnePlus"],[d,m]],[/(alexa)webm/i,/(kf[a-z]{2}wi)(\sbuild\/|\))/i,/(kf[a-z]+)(\sbuild\/|\)).+silk\//i],[a,[c,"Amazon"],[d,b]],[/(sd|kf)[0349hijorstuw]+(\sbuild\/|\)).+silk\//i],[[a,"Fire Phone"],[c,"Amazon"],[d,m]],[/\((playbook);[\w\s\),;-]+(rim)/i],[a,c,[d,b]],[/((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10;\s(\w+)/i],[a,[c,"BlackBerry"],[d,m]],[/(?:\b|asus_)(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus\s7|padfone|p00[cj])/i],[a,[c,"ASUS"],[d,b]],[/\s(z[es]6[027][01][km][ls]|zenfone\s\d\w?)\b/i],[a,[c,"ASUS"],[d,m]],[/(nexus\s9)/i],[a,[c,"HTC"],[d,b]],[/(htc)[;_\s-]{1,2}([\w\s]+(?=\)|\sbuild)|\w+)/i,/(zte)-(\w*)/i,/(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i],[c,[a,/_/g," "],[d,m]],[/droid[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i],[a,[c,"Acer"],[d,b]],[/droid.+;\s(m[1-5]\snote)\sbuild/i,/\bmz-([\w-]{2,})/i],[a,[c,"Meizu"],[d,m]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,/(hp)\s([\w\s]+\w)/i,/(asus)-?(\w+)/i,/(microsoft);\s(lumia[\s\w]+)/i,/(lenovo)[_\s-]?([\w-]+)/i,/linux;.+(jolla);/i,/droid.+;\s(oppo)\s?([\w\s]+)\sbuild/i],[c,a,[d,m]],[/(archos)\s(gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/\s(nook)[\w\s]+build\/(\w+)/i,/(dell)\s(strea[kpr\s\d]*[\dko])/i,/[;\/]\s?(le[\s\-]+pan)[\s\-]+(\w{1,9})\sbuild/i,/[;\/]\s?(trinity)[\-\s]*(t\d{3})\sbuild/i,/\b(gigaset)[\s\-]+(q\w{1,9})\sbuild/i,/\b(vodafone)\s([\w\s]+)(?:\)|\sbuild)/i],[c,a,[d,b]],[/\s(surface\sduo)\s/i],[a,[c,"Microsoft"],[d,b]],[/droid\s[\d\.]+;\s(fp\du?)\sbuild/i],[a,[c,"Fairphone"],[d,m]],[/\s(u304aa)\sbuild/i],[a,[c,"AT&T"],[d,m]],[/sie-(\w*)/i],[a,[c,"Siemens"],[d,m]],[/[;\/]\s?(rct\w+)\sbuild/i],[a,[c,"RCA"],[d,b]],[/[;\/\s](venue[\d\s]{2,7})\sbuild/i],[a,[c,"Dell"],[d,b]],[/[;\/]\s?(q(?:mv|ta)\w+)\sbuild/i],[a,[c,"Verizon"],[d,b]],[/[;\/]\s(?:barnes[&\s]+noble\s|bn[rt])([\w\s\+]*)\sbuild/i],[a,[c,"Barnes & Noble"],[d,b]],[/[;\/]\s(tm\d{3}\w+)\sbuild/i],[a,[c,"NuVision"],[d,b]],[/;\s(k88)\sbuild/i],[a,[c,"ZTE"],[d,b]],[/;\s(nx\d{3}j)\sbuild/i],[a,[c,"ZTE"],[d,m]],[/[;\/]\s?(gen\d{3})\sbuild.*49h/i],[a,[c,"Swiss"],[d,m]],[/[;\/]\s?(zur\d{3})\sbuild/i],[a,[c,"Swiss"],[d,b]],[/[;\/]\s?((zeki)?tb.*\b)\sbuild/i],[a,[c,"Zeki"],[d,b]],[/[;\/]\s([yr]\d{2})\sbuild/i,/[;\/]\s(dragon[\-\s]+touch\s|dt)(\w{5})\sbuild/i],[[c,"Dragon Touch"],a,[d,b]],[/[;\/]\s?(ns-?\w{0,9})\sbuild/i],[a,[c,"Insignia"],[d,b]],[/[;\/]\s?((nxa|Next)-?\w{0,9})\sbuild/i],[a,[c,"NextBook"],[d,b]],[/[;\/]\s?(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05]))\sbuild/i],[[c,"Voice"],a,[d,m]],[/[;\/]\s?(lvtel\-)?(v1[12])\sbuild/i],[[c,"LvTel"],a,[d,m]],[/;\s(ph-1)\s/i],[a,[c,"Essential"],[d,m]],[/[;\/]\s?(v(100md|700na|7011|917g).*\b)\sbuild/i],[a,[c,"Envizen"],[d,b]],[/[;\/]\s?(trio[\s\w\-\.]+)\sbuild/i],[a,[c,"MachSpeed"],[d,b]],[/[;\/]\s?tu_(1491)\sbuild/i],[a,[c,"Rotor"],[d,b]],[/(shield[\w\s]+)\sbuild/i],[a,[c,"Nvidia"],[d,b]],[/(sprint)\s(\w+)/i],[c,a,[d,m]],[/(kin\.[onetw]{3})/i],[[a,/\./g," "],[c,"Microsoft"],[d,m]],[/droid\s[\d\.]+;\s(cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[a,[c,"Zebra"],[d,b]],[/droid\s[\d\.]+;\s(ec30|ps20|tc[2-8]\d[kx])\)/i],[a,[c,"Zebra"],[d,m]],[/\s(ouya)\s/i,/(nintendo)\s([wids3utch]+)/i],[c,a,[d,p]],[/droid.+;\s(shield)\sbuild/i],[a,[c,"Nvidia"],[d,p]],[/(playstation\s[345portablevi]+)/i],[a,[c,"Sony"],[d,p]],[/[\s\(;](xbox(?:\sone)?(?!;\sxbox))[\s\);]/i],[a,[c,"Microsoft"],[d,p]],[/smart-tv.+(samsung)/i],[c,[d,f]],[/hbbtv.+maple;(\d+)/i],[[a,/^/,"SmartTV"],[c,"Samsung"],[d,f]],[/(?:linux;\snetcast.+smarttv|lg\snetcast\.tv-201\d)/i],[[c,"LG"],[d,f]],[/(apple)\s?tv/i],[c,[a,"Apple TV"],[d,f]],[/crkey/i],[[a,"Chromecast"],[c,"Google"],[d,f]],[/droid.+aft([\w])(\sbuild\/|\))/i],[a,[c,"Amazon"],[d,f]],[/\(dtv[\);].+(aquos)/i],[a,[c,"Sharp"],[d,f]],[/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],[[c,v.trim],[a,v.trim],[d,f]],[/[\s\/\(](android\s|smart[-\s]?|opera\s)tv[;\)\s]/i],[[d,f]],[/((pebble))app\/[\d\.]+\s/i],[c,a,[d,h]],[/droid.+;\s(glass)\s\d/i],[a,[c,"Google"],[d,h]],[/droid\s[\d\.]+;\s(wt63?0{2,3})\)/i],[a,[c,"Zebra"],[d,h]],[/(tesla)(?:\sqtcarbrowser|\/20[12]\d\.[\w\.-]+)/i],[c,[d,g]],[/droid .+?; ([^;]+?)(?: build|\) applewebkit).+? mobile safari/i],[a,[d,m]],[/droid .+?;\s([^;]+?)(?: build|\) applewebkit).+?(?! mobile) safari/i],[a,[d,b]],[/\s(tablet|tab)[;\/]/i,/\s(mobile)(?:[;\/]|\ssafari)/i],[[d,v.lowerize]],[/(android[\w\.\s\-]{0,9});.+build/i],[a,[c,"Generic"]],[/(phone)/i],[[d,m]]],engine:[[/windows.+\sedge\/([\w\.]+)/i],[w,[l,"EdgeHTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[w,[l,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,/(icab)[\/\s]([23]\.[\d\.]+)/i],[l,w],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[w,l]],os:[[/microsoft\s(windows)\s(vista|xp)/i],[l,w],[/(windows)\snt\s6\.2;\s(arm)/i,/(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,/(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)(?!.+xbox)/i],[l,[w,x.str,y.os.windows.version]],[/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],[[l,"Windows"],[w,x.str,y.os.windows.version]],[/ip[honead]{2,4}\b(?:.*os\s([\w]+)\slike\smac|;\sopera)/i,/cfnetwork\/.+darwin/i],[[w,/_/g,"."],[l,"iOS"]],[/(mac\sos\sx)\s?([\w\s\.]*)/i,/(macintosh|mac(?=_powerpc)\s)(?!.+haiku)/i],[[l,"Mac OS"],[w,/_/g,"."]],[/(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/\s]([\w\.]+)/i,/\((series40);/i],[l,w],[/\(bb(10);/i],[w,[l,"BlackBerry"]],[/(?:symbian\s?os|symbos|s60(?=;)|series60)[\/\s-]?([\w\.]*)/i],[w,[l,"Symbian"]],[/mozilla.+\(mobile;.+gecko.+firefox/i],[[l,"Firefox OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[w,[l,"webOS"]],[/crkey\/([\d\.]+)/i],[w,[l,"Chromecast"]],[/(cros)\s[\w]+\s([\w\.]+\w)/i],[[l,"Chromium OS"],w],[/(nintendo|playstation)\s([wids345portablevuch]+)/i,/(xbox);\s+xbox\s([^\);]+)/i,/(mint)[\/\s\(\)]?(\w*)/i,/(mageia|vectorlinux)[;\s]/i,/(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?=\slinux)|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus|raspbian)(?:\sgnu\/linux)?(?:\slinux)?[\/\s-]?(?!chrom|package)([\w\.-]*)/i,/(hurd|linux)\s?([\w\.]*)/i,/(gnu)\s?([\w\.]*)/i,/\s([frentopc-]{0,4}bsd|dragonfly)\s?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku)\s(\w+)/i],[l,w],[/(sunos)\s?([\w\.\d]*)/i],[[l,"Solaris"],w],[/((?:open)?solaris)[\/\s-]?([\w\.]*)/i,/(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,/(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,/(unix)\s?([\w\.]*)/i],[l,w]]},$=function(e,s){if("object"==typeof e&&(s=e,e=t),!(this instanceof $))return new $(e,s).getResult();var n=e||(void 0!==i&&i.navigator&&i.navigator.userAgent?i.navigator.userAgent:""),o=s?v.extend(k,s):k;return this.getBrowser=function(){var e={name:t,version:t};return x.rgx.call(e,n,o.browser),e.major=v.major(e.version),e},this.getCPU=function(){var e={architecture:t};return x.rgx.call(e,n,o.cpu),e},this.getDevice=function(){var e={vendor:t,model:t,type:t};return x.rgx.call(e,n,o.device),e},this.getEngine=function(){var e={name:t,version:t};return x.rgx.call(e,n,o.engine),e},this.getOS=function(){var e={name:t,version:t};return x.rgx.call(e,n,o.os),e},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return n},this.setUA=function(e){return n=typeof e===r&&e.length>255?v.trim(e,255):e,this},this.setUA(n),this};$.VERSION="0.7.28",$.BROWSER={NAME:l,MAJOR:"major",VERSION:w},$.CPU={ARCHITECTURE:u},$.DEVICE={MODEL:a,VENDOR:c,TYPE:d,CONSOLE:p,MOBILE:m,SMARTTV:f,TABLET:b,WEARABLE:h,EMBEDDED:g},$.ENGINE={NAME:l,VERSION:w},$.OS={NAME:l,VERSION:w},e.exports&&(s=e.exports=$),s.UAParser=$;var S=void 0!==i&&(i.jQuery||i.Zepto);if(S&&!S.ua){var _=new $;S.ua=_.getResult(),S.ua.get=function(){return _.getUA()},S.ua.set=function(e){_.setUA(e);var s=_.getResult();for(var i in s)S.ua[i]=s[i]}}}("object"==typeof window?window:U)},Q(G={exports:{}},G.exports),G.exports);function Z(e){let s,i,t,n,o,r,a,p,m,h;return m=new H({props:{OS:e[0].name}}),{c(){s=u("header"),i=u("img"),n=b(),o=u("nav"),o.innerHTML='<ul class="svelte-cillmf"></ul>',r=b(),a=u("div"),p=u("form"),M(m.$$.fragment),l(i.src,t="/sylphLogoPossibility.png")||f(i,"src","/sylphLogoPossibility.png"),f(i,"alt","Sylph logo"),f(i,"class","svelte-cillmf"),f(o,"class","svelte-cillmf"),f(p,"action",e[1]),f(p,"method","get"),f(p,"target","_blank"),f(a,"class","dl-btn svelte-cillmf"),f(s,"class","svelte-cillmf")},m(e,t){c(e,s,t),d(s,i),d(s,n),d(s,o),d(s,r),d(s,a),d(a,p),B(m,p,null),h=!0},p(e,[s]){const i={};1&s&&(i.OS=e[0].name),m.$set(i),(!h||2&s)&&f(p,"action",e[1])},i(e){h||(z(m.$$.fragment,e),h=!0)},o(e){N(m.$$.fragment,e),h=!1},d(e){e&&w(s),R(m)}}}function K(e,s,i){let t,n;return t=(new W).getOS(),"Mac OS"===t?.name&&(n="https://github.com/oslabs-beta/Sylph/releases/download/v1.0.0-MacOS/Sylph-1.0.0.dmg"),"Windows"===t?.name&&(n="https://github.com/oslabs-beta/Sylph/releases/download/v1.0.0-testing/Sylph.Setup.1.0.0.exe"),[t,n]}class Y extends I{constructor(e){super(),D(this,e,K,Z,o,{})}}function X(s){let i;return{c(){i=u("footer"),i.innerHTML='<div class="copyw svelte-bsk1ze"><h2 class="svelte-bsk1ze">Copyright © 2021 Sylph</h2></div>',f(i,"class","svelte-bsk1ze")},m(e,s){c(e,i,s)},p:e,i:e,o:e,d(e){e&&w(i)}}}class J extends I{constructor(e){super(),D(this,e,null,X,o,{})}}function ee(s){let i,t,n,o,r,a,l,p,m,h,g,v,x,y,k,$,S,_,A,E,T,C,O,q,D,I;return t=new Y({}),S=new j({props:{devImg:"https://media-exp1.licdn.com/dms/image/C4D03AQGA6GbnL7avug/profile-displayphoto-shrink_800_800/0/1631750855713?e=1639612800&v=beta&t=pbtoVQC0qc8Ap0n2dRDbj7qvyYN8fwVApYtQsZqu4Ks",name:"Randy Diebold",linkedin:"https://www.linkedin.com/in/randy-diebold-523802206/",github:"https://github.com/Randy-diebold"}}),A=new j({props:{devImg:"https://media-exp1.licdn.com/dms/image/C4D03AQFkBD1Q_j8AAw/profile-displayphoto-shrink_800_800/0/1563465185947?e=1639612800&v=beta&t=-8k7a0_FGR6M7eaQeMdNbfyLlD3DD0ETRNZSWAR5ipc",name:"Kailee Pedersen",linkedin:"https://www.linkedin.com/in/kaileepedersen/",github:"https://github.com/kailee-p"}}),T=new j({props:{devImg:"https://media-exp1.licdn.com/dms/image/C4E03AQEKSfkLzET2Dw/profile-displayphoto-shrink_800_800/0/1629157163376?e=1639612800&v=beta&t=Dr92AuQHcyoSBWiZSq1LgPTqkqmCSGjnKrUfHcCIcmE",name:"Haobo Wang",linkedin:"https://www.linkedin.com/in/haobowang225/",github:"https://github.com/hwpanda"}}),O=new j({props:{devImg:"https://media-exp1.licdn.com/dms/image/C4E03AQF499xOPl_xjQ/profile-displayphoto-shrink_800_800/0/1631916229559?e=1639612800&v=beta&t=lQ3b5BwuQETt64nYRZzq8SMzN3-c6wvPvIAFVDyD0wQ",name:"Nick Andreala",linkedin:"https://www.linkedin.com/in/nickandreala/",github:"https://github.com/JovianDev"}}),D=new J({}),{c(){i=b(),M(t.$$.fragment),n=b(),o=u("container"),r=u("section"),r.innerHTML='<div class="title-text svelte-1dowenf"><h2 class="svelte-1dowenf">Svelte Prototyping</h2> \n      <h1 class="svelte-1dowenf">SIMPLIFIED</h1> \n      <p class="svelte-1dowenf">An Open Source Drag and Drop</p> \n      <p class="svelte-1dowenf">Svelte Prototyping App</p></div> \n    <div class="title-img svelte-1dowenf"><img src="/sylph-screen.png" alt="sylph screen shot"/></div>',a=b(),l=u("section"),l.innerHTML='<iframe width="560" height="315" src="https://www.youtube.com/embed/uK2RnIzrQ0M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>',p=b(),m=u("section"),m.innerHTML='<div class="feature svelte-1dowenf"><div class="feature-discription svelte-1dowenf"><img src="/dnd.png" alt="feature icon" class="feature-icon svelte-1dowenf"/> \n        <h2 class="svelte-1dowenf">About</h2> \n        <p class="svelte-1dowenf"><strong><em>Sylph</em></strong> is a prototyping tool for Svelte web applications.\n          With its convenient drag-and-drop interface, component customizer, real-time\n          code preview, and real-time site preview, Sylph allows users to quickly\n          prototype and develop the architecture of their Svelte applications.</p></div> \n      <div class="feature-img svelte-1dowenf"><img src="/sylph-screen.png" alt="feature screenshot" class="svelte-1dowenf"/></div></div> \n    <div class="feature svelte-1dowenf"><div class="feature-img svelte-1dowenf"><img src="/sylph-screen.png" alt="feature screenshot" class="svelte-1dowenf"/></div> \n      <div class="feature-discription svelte-1dowenf"><img src="/dnd.png" alt="feature icon" class="feature-icon svelte-1dowenf"/> \n        <h2 class="svelte-1dowenf">Svelte Prototyping, Reimagined</h2> \n        <p class="svelte-1dowenf">Harnessing the power of Electron, TypeScript, and Svelte, <strong><em>Sylph</em></strong> provides an open-source solution for the fast-growing Svelte community&#39;s\n          prototyping needs. Sylph is available for Mac and Windows operating systems.</p></div></div>',h=b(),g=u("section"),g.innerHTML='<div class="svelte-1dowenf"><h1 class="svelte-1dowenf">Download Sylph</h1></div>',v=b(),x=u("section"),y=u("h1"),y.textContent="Sylph Contributors",k=b(),$=u("div"),M(S.$$.fragment),_=b(),M(A.$$.fragment),E=b(),M(T.$$.fragment),C=b(),M(O.$$.fragment),q=b(),M(D.$$.fragment),document.title="Sylph",f(r,"class","title-head svelte-1dowenf"),f(l,"class","yt-video svelte-1dowenf"),f(m,"class","features"),f(g,"class","download svelte-1dowenf"),f(y,"class","svelte-1dowenf"),f($,"class","devs svelte-1dowenf"),f(x,"class","dev-section svelte-1dowenf"),f(o,"class","main-container svelte-1dowenf")},m(e,s){c(e,i,s),B(t,e,s),c(e,n,s),c(e,o,s),d(o,r),d(o,a),d(o,l),d(o,p),d(o,m),d(o,h),d(o,g),d(o,v),d(o,x),d(x,y),d(x,k),d(x,$),B(S,$,null),d($,_),B(A,$,null),d($,E),B(T,$,null),d($,C),B(O,$,null),d(o,q),B(D,o,null),I=!0},p:e,i(e){I||(z(t.$$.fragment,e),z(S.$$.fragment,e),z(A.$$.fragment,e),z(T.$$.fragment,e),z(O.$$.fragment,e),z(D.$$.fragment,e),I=!0)},o(e){N(t.$$.fragment,e),N(S.$$.fragment,e),N(A.$$.fragment,e),N(T.$$.fragment,e),N(O.$$.fragment,e),N(D.$$.fragment,e),I=!1},d(e){e&&w(i),R(t,e),e&&w(n),e&&w(o),R(S),R(A),R(T),R(O),R(D)}}}return new class extends I{constructor(e){super(),D(this,e,null,ee,o,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
