function $(v) { return(document.getElementById(v)); }
function $S(v) { return($(v).style); }

function $T(v,i) { return((i?$(i):document).getElementsByTagName(v)); }
function browser(v) { return(Math.max(navigator.userAgent.toLowerCase().indexOf(v),0)); }
function clearDefault(el) { if(el.defaultValue==el.value) el.value=""; }
function cookieGrab(f) { var c=document.cookie.split(';'); f=f+"="; for(var i in c) { var v=trim(c[i]); if(v.indexOf(f)==0) { return(v.substr(f.length,v.length)); } } }
function cookieStab(f,v) { document.cookie=f+'='+v+'; path=/'; }
function inArray(v,r) { for(var i in r) if(r[i]==v) return(1); } 
function inArrayRM(v,r) { var z=new Array(),j=0; for(var i in r) if(r[i]!=v) { z[j++]=r[i]; } return(z); }
function input(i,v) { if(i.defaultValue==i.value) i.value=v; }
function isset(v) { return((typeof(v)=='undefined' || v=='undefined' || v.length==0)?0:1); }
function mkNav(t) { var v=$('navMe'); $S(v.firstChild.className).display='none'; $S(t.className).display='block'; v.id=''; t.parentNode.id='navMe'; }
function mkStyle(v) { if(v) { var b=zero($S('content').fontSize)+zero(v); $S('content').fontSize=b+'px'; cookieStab('fontSize',b-15); } }
function trim(v) { return(v.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,"")); }
function upDown(v,s) { var b=!isNaN(s)?s:($S('pm'+v).display=='none'?1:0),c=cookieGrab('side'); $T('span','s'+v)[0].innerHTML=b?'&ndash;':'+'; $S('pm'+v).display=b?'block':'none'; if(!s) { var r={},z=''; c=(c+'*'+v+':'+b).split('*'); for(var i in c) if(isset(c[i])) { i=c[i].split(':'); r[i[0]]=i[1]; } for(var i in r) z+=i+':'+r[i]+'*'; cookieStab('side',z.substr(0,z.length-1)); } }
function XY(e,v) { var z=browser('msie')?Array(event.clientX+document.body.scrollLeft,event.clientY+document.body.scrollTop):Array(e.pageX,e.pageY); return(z[zero(v)]); }
function XYwin(v) { var z=browser('msie')?Array(document.body.clientHeight,document.body.clientWidth):Array(window.innerHeight,window.innerWidth); return(isset(v)?z[v]:z); }
function zero(v) { v=parseInt(v); return(!isNaN(v)?v:0); }

/* LOAD */

var loadTime=new Date().getTime();

function init() { var c=cookieGrab('side'); if(c) c=c.split('*'); for(var i in c) { i=c[i].split(':'); if($('pm'+i[0])) upDown(i[0],parseInt(i[1])); } }

window.onload=function() { if(typeof(trax)!='undefined') { trax(); mkStyle(cookieGrab('fontSize')); } };

function loadWin() {  var v=new Date().getTime(); if(!$('content')) { if(v-loadTime<=5000) setTimeout("loadWin()",200); else window.onload=init; } else init(); }

setTimeout("loadWin()",200);