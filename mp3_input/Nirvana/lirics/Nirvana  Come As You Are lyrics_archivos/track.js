function mail() { if(!mailCK('sexyTOP')) return false; setTimeout("$('mailA').innerHTML='<h3>Your friends should receive their email shortly</h3>'",1); }
function mailCKe(v) { return((v.indexOf(".")<=2 && v.indexOf("@")<=0)?1:0); }
function mailCK(i) { var v=$T('input','mailA'),z=''; if(v[0].value.length<=0) z='Requires &ldquo;Your Name&rdquo;'; if(mailCKe(v[1].value)) z+=(z?'<br>':'')+'Requires &ldquo;Your eMail&rdquo;'; if(mailCKe(v[2].value)) z+=(z?'<br>':'')+'Requires &ldquo;eMail #1&rdquo;'; $(i).innerHTML=z; return(z?0:1); }
function sexyTOG() { document.onclick=function(){ $S('sexyBG').display='none'; $S('sexyBOX').display='none'; document.onclick=function(){}; }; }
function sexyBOX(v,b) { wReq(v,1,function(v) { sexyTOG(); $S('sexyBG').height=XYwin(0)+'px'; $S('sexyBG').display='block'; $('sexyBOX').innerHTML=v+'<div class="sexyX">(click outside box to close)'+"<\/div>"; $S('sexyBOX').left=Math.round((XYwin(1)-b)/2)+'px'; $S('sexyBOX').width=b+'px'; $S('sexyBOX').display='block'; }); }

function wReq(u,s,change) { var r=[function(){ return new XMLHttpRequest(); },function(){ return new ActiveXObject("Msxml2.XMLHTTP"); },function(){ return new ActiveXObject("Microsoft.XMLHTTP"); }]; for(var i in r) { try { var v=r[i],q=v(); } catch(e) { continue; } }

	if(change) q.onreadystatechange=function(){ if(q.readyState==4 && q.status==200) change(q.responseText); }; q.open('GET',u,s?1:0); q.send(null);

}

/* STAR */

var starGo='',starUp='';

function starUpdate(q,e,i) { var oX=$('sexyBOX').offsetLeft,x=(XY(e)-$('star'+i).offsetLeft-oX)/84*100; $('starCurr'+i).title=x; wReq('/trax.php?'+q+'&vote='+(x/100)); starUp=1; }
function starRevert(i,s) { $S('starCurr'+i).width=Math.round(parseInt($('starCurr'+i).title)*84/100)+'px'; $('starUser'+i).innerHTML=starUp?'Thank you! ;)':''; setTimeout("$('starUser"+i+"').innerHTML=''",1500); starUp=0; }
function starCurr(e,i) { function starMove(e) { var eX=XY(e)-$('star'+i).offsetLeft-oX,eY=XY(e,1)-$('star'+i).offsetTop-oY; if(eX<1 || eX>84 || eY<0 || eY>19) { document.onmousemove=''; starGo=''; starRevert(i); } else { $S('starCurr'+i).width=eX+'px'; $('starUser'+i).innerHTML=Math.round(eX/84*100)+'%'; } }

	if(!starGo) { starGo=1; var oX=$('sexyBOX').offsetLeft,oY=$('sexyBOX').offsetTop; document.onmousemove=starMove; }

}

/* TRAX */

var me='',meC='',meX='',keyed='',sub='',RS='',isActive=0,setup=0,advLine={},cue=new Array();
var langMK={'ar':'ara','de':'deu','el':'ell','en':'eng','es':'spa','fr':'fra','it':'ita','ja':'jpn','ko':'kor','nl':'ndl','pt':'por','ru':'rus','zh-CN':'zho'};
var langV={'ar':'العربية','de':'Deutsch','el':'Ελληνικά','en':'English','es':'Español','fr':'Français','it':'Italiano','ja':'日本語','ko':'한국어','nl':'Nederlands','pt':'Português','ru':'Русский','zh-CN':'中文'};
var langZ={'ar':{'0':'انقاذ','1':'الغاء','2':'عدد'},'de':{'0':'sparen','1':'annullieren','2':'zahl'},'el':{'0':'σώζω','1':'ακυρώνω','2':'αριθμός'},'en':{'0':'save','1':'cancel','2':'number'},'es':{'0':'ahorrar','1':'anular','2':'número'},'fr':{'0':'sauvegarder','1':'annuler','2':'nombre'},'it':{'0':'conservare','1':'cancellare','2':'numero'},'ja':{'0':'を除けば','1':'取り消し','2':'数'},'ko':{'0':'를 제외하고','1':'취소','2':'수'},'nl':{'0':'sparen','1':'annuleer','2':'aantal'},'pt':{'0':'salvar','1':'cancelamento','2':'número'},'ru':{'0':'спасти','1':'отменить','2':'линия'},'zh-CN':{'0':'拯救','1':'取消','2':'数'}};

function advise(c) { var i=c.id.substr(4); return((typeof(advLine)!='undefined' && advLine[i] && advLine[i].length)?advLine[i]:0); }
function ckLan() { var v=$('loc').innerHTML; return((v.indexOf('/babelfish')!=-1 || v.indexOf('/translate')!=-1)?1:0); }
function grab() { if($('trans')) if(ckLan()) { if($('zTran') && $('content')) { $('zTran').value=$('content').innerHTML; $('zTran').parentNode.submit(); } } }
function mkLan(a,b,c) { return(c?'babelfish.altavista.com/babelfish/trurl_pagecontent?lp=en_'+a+'&url='+b:'translate.google.com/translate?u='+b+'&langpair=en%7C'+a+'&hl=en&ie=UTF-8&oe=UTF-8'); }
function mkCue() { if($(me) && isset(keyed)) { cue[parseInt(me.substr(4))]=me; } }
function mkURL(v,b) { var e=v.split('/'); return(e.slice(0,3).join('/')+'/'+(b!='en'?langMK[b]+':':'')+(e[3])); }
function subver(v) { if($('edit').value!=sub) keyed=v.parentNode.parentNode.id; sub=v.innerHTML; $('editRep').innerHTML=rep($('edit').value,v.innerHTML); $('edit').value=sub; }
function transtip(v) { return false; }

function rep(v,w) { var z='',sLan=$('content').lang; if(isset(v)) { if(inArray(v,RS)) RS=inArrayRM(v,RS); RS.splice(0,0,v); }

 	for(var i in RS) if(w!=RS[i]) z+='<span onclick="subver(this)" class="rep" title="Replace with &ldquo;'+RS[i]+'&rdquo;">'+RS[i]+"<\/span>";

	return(z+'<div id="rep"><div><input type="submit" class="submit" value="'+langZ[sLan][0]+'" onclick="editZ(0,isset(keyed)?1:2)" title="'+langZ[sLan][0]+'"> <input type="submit" class="submit" value="'+langZ[sLan][1]+'" onclick="editZ(0,2)" title="'+langZ[sLan][1]+'">'+"<\/div>"+'<span class="east">'+langZ[sLan][2]+' '+(parseInt(zero(me.substr(4)))+1)+"<\/span>"+'<br style="clear:both">'+"<\/div>");

}

function editColor(v) { $S(v).color='#EF0000'; setTimeout("$S('"+v+"').color=''",1000); }
function editSwap(v) { if(v) { var b=$T('input',v)[0].value; $(v).innerHTML=!b.replace(' ','')?'&nbsp;':b; } return false; }
function editMe(v) { if(me!=v.id && v.innerHTML!='&nbsp;' && isActive) { if(isset(keyed) || meC) $S(me).color='#EF0000'; RS=advise(v); if($S(v.id).color) { $S(v.id).color=''; meC=1; } else meC=0; editZ(v.id); v.innerHTML='<input type="text" onkeyup="keyed=this.parentNode.id" value="'+(meX=v.innerHTML)+'" id="edit"><input type="hidden" id="editid" value="'+v.id+'"><span id="editRep">'+rep()+"<\/span>"; setTimeout("$T('input','"+v.id+"')[0].focus()",100); } }
function editZ(c,s,inner) {

	if(s==1) { var v=trim(inner?$(c).innerHTML:$('edit').value),b=(inner?c:$('editid').value).substr(4); if(v.length && b.length) { var d=document.body.appendChild(document.createElement('script')); d.language='javascript'; d.src='http://www.lyricsfreak.com/grab/?line='+b+'&url='+document.location.href+'&content='+escape(v); cue[parseInt(me)]=''; editColor(me); } else return(0); } else if($(me) && s==2) $(me).innerHTML=meX;

	if(((c && me) || s==1) && !inner) editSwap(me); if(s!=1) mkCue(me); keyed=''; me=c;
	
}

function editSaveTog(v) { var a=v?'save':'edit',b=v?0:1,c=$('isActive'),z=''; c.className=a; c.firstChild.innerHTML=v?langZ[$('content').lang][0]:a; c.href='javascript:editSaveTog('+b+');';

	if(!(isActive=v)) { editSwap(me); mkCue(); if(cue.length) for(var i in cue) if(cue[i]) { me=cue[i]; editZ(cue[i],1,1); } me=''; cue=new Array(); }

	else { if(!ckLan() && !setup && document.location.href.substr(10).indexOf(':')!=-1) { setup=1; var r=$('content').innerHTML.replace(/\n/g,"").split('<br>'),z=''; if(r.length==1) r=r[0].split('<BR>');		for(var i=0; i<r.length; i++) { if(!$('trans-'+i)) z+='<span id="tran'+i+'" onclick="editMe(this)" onmousemove="if(this && typeof(transtip)!=\'undefined\') transtip(this)" title="'+(r[i]==''?'line break':'Edit this line&hellip;')+'">'+(r[i]=='' || r[i]=="\n" || r[i]=="\r\n" || r[i]=="\n\n"?'&nbsp;':r[i])+"<\/span>"; $('content').innerHTML=z; } } editMe($('tran0')); }

}

function trax() {

	function commit(v) { v=v.replace('http://','').replace(/\/[a-z]{3}\:/,'/'); return(Array(v,escape(v))); }
	
	var R=commit(!ckLan()?document.location.href:$T('base')[0].href),D,Tm={'el':1,'nl':1,'ru':1,'zh':1,'ar':2,'zh-CN':2,'ko':2,'ja':2},z=''; R[1]=R[1].replace(/\+/g,'%2B').replace(/:/,'%3A').replace(/\//g,'%2F');

	if(ckLan() && (browser('msie') || browser('firefox'))) { document.body.innerHTML+='<form action="http://www.lyricsfreak.com/grab/" method="post" target="zTranMK"><input type="hidden" name="tr" id="zTran" />'+"<\/form>"+'<iframe name="zTranMK" height="1" width="1">'+"<\/iframe>"; setTimeout("grab()","100"); }

	for(var i in langV) z+='<a href="http://'+($('trans-'+i)?mkURL(R[0],i):mkLan(i,R[1],Tm[i]==2?0:1))+'" target="_top"'+(!$('trans-'+i)?' class="transLight"':'')+'><span>'+langV[i]+"<\/span><\/a>";

	if(!ckLan()) if(-1!=document.location.href.substr(10).indexOf(':')) { if(!$('sst')) { d=document.body.appendChild(document.createElement('script')); d.id='sst'; d.language='javascript'; } else d=$('sst'); void(d.src='http://www.lyricsfreak.com/grab/?line=-1&url='+document.location.href); }

	$('pmLang').innerHTML=z;

}
