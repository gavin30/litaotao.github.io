var nJob1001inputValueTipsCount=1;(function(a){a.fn.job1001inputValueTips=function(i){try{var e;var k=a(this),l=a("#"+k.attr("id")+"Desc"),f,d=k.parent(),j=k.attr("id")+"Desc";oDefautlOptions={info:"",color:"#ccc"};i=a.extend(oDefautlOptions,i);if(!k[0]||(k[0].tagName!="INPUT")){return false}if(i.info==""&&k.attr("placeholder")!=""){i.info=k.attr("placeholder")}if(c()){if(nJob1001inputValueTipsCount){var g=new Array();g.push("<style>");g.push("input:-moz-placeholder{color:"+i.color+"}");g.push("input::-moz-placeholder{color:"+i.color+"}");g.push("input::-webkit-input-placeholder{color:"+i.color+"}");g.push("input:-ms-input-placeholder{color:"+i.color+"}");g.push("</style>");a("head").append(g.join(""));nJob1001inputValueTipsCount=0}if(i.info!=""){k.attr("placeholder",i.info);return false}}if(d.css("position")===(e||"static")){d.css("position","relative")}if(a.browser.msie&&(a.browser.version==6||a.browser.version==7||document.documentMode==7)){d.css("zoom","1")}if(!l[0]){d.append('<span id="'+j+'" style="display:none;position:absolute">'+i.info+"</span>");l=a("#"+j);f=b(k.css("paddingTop"))+b(k.css("paddingBottom"))+k.height()+b(k.css("borderTopWidth"))+4;l.css({fontSize:k.css("fontSize"),top:k.position().top,left:k.position().left+b(k.css("paddingLeft"))+b(k.css("borderLeftWidth"))+3,height:f,lineHeight:f+"px",color:i.color})}l[0].style.display=k.val()!=""?"none":"block";l.bind({"selectstart click":function(){k.focus();return false}});k.bind({focus:function(){l.hide()},"blur keyup":function(){l[0].style.display=k.val()!=""?"none":"block"}});return k}catch(h){}};function b(d){d=d.toLowerCase();d=d=="medium"?"0px":d;return parseInt(d.replace(/px/gi,""))}function c(){var d=document.createElement("input");return"placeholder" in d}})(jQuery);