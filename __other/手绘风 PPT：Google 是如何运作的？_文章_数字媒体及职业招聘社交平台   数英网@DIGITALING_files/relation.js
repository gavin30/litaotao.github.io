var domain="http://"+location.host;function disTime(d){var b=0;var a=1;var e=null;function c(){if(!$(d).hasClass("tip_act")){a--}if(a<=b){clearInterval(e);$(d).addClass("tip_act");$(d).slideUp()}}e=setInterval(c,1000)}function openConfirm(a){$("#cancel_"+a).slideDown()}function closeConfirm(a){$("#cancel_"+a).slideUp()}function directMsg(){$(".no_flow_btn").hover(function(){$("#direct_msg").show()},function(){$("#direct_msg").hide()})}directMsg();var relation={follow:function(b,i,h){var a=h?h:1;var e={datas:{rfId:b,relationType:a}};var g=$(this);if(b==""){alert("no user id!");return false}var c=$("#userType").val();if(c==""){openPopup("400","popup_login_user");return false}var d=$("#ruserId").val();var f=domain+"/datas/follows";$.post(f,e,function(j){switch(j.isSuccess){case 0:$("#tip_"+i).slideDown().removeClass("tip_act");$("#tip_"+i).find("i").addClass("error_icon").removeClass("correct_icon");$("#tip_"+i).find("span").text("关注失败！").removeClass("color_666").addClass("color_red");disTime("#tip_"+i);break;case 1:if(j.content==1){if(i){if($("#"+i).parents("#people_list").hasClass("nofans")){$("#"+i).html('<span class="inline_bk w_46"><i class="icon double_flow_icon"></i></span>');$("#fans_"+i).text(j.friendsCount)}else{$("#"+i).html('<span class="inline_bk w_46 mg_r_5"><i class="icon double_flow_icon"></i></span><span class="v_m">粉丝<a class="inline_bk color_blue font_b mg_l_5" href="domain/people/fans'+b+'">'+j.friendsCount+"</a></span>")}$("#tip_"+i).slideDown().removeClass("tip_act");$("#tip_"+i).find("i").removeClass("error_icon").addClass("correct_icon");$("#tip_"+i).find("span").text("关注成功！").addClass("color_666").removeClass("color_red");disTime("#tip_"+i)}else{if(!$("#avatar_by").hasClass("by_info")){$("#follows").html('<a class="direct_btn mg_r_5" href="javascript:void(0);" onclick="openPopup(\'720\',\'popup_private_message\');"><em></em>私信</a><a class="cancel_attention_btn" href="javascript:void(0);" onclick="openConfirm(\'avatarinfo\');">互相关注 <em class="color_blue">取消</em></a>')}else{$("#follows").html('<a class="direct_btn mg_r_5" href="javascript:void(0);" onclick="openPopup(\'720\',\'popup_private_message\');"><em></em>私信</a><span class="inline_bk v_m"><i class="icon double_flow_icon"></i></span>')}$("#fans_avatarinfo").text(j.friendsCount);$("#tip_avatarinfo").slideDown().removeClass("tip_act");$("#tip_avatarinfo").find("i").removeClass("error_icon").addClass("correct_icon");$("#tip_avatarinfo").find("span").text("关注成功！").addClass("color_666").removeClass("color_red");disTime("#tip_avatarinfo");directMsg()}}else{if(i){if($("#"+i).parents("#people_list").hasClass("nofans")){$("#"+i).html('<span class="inline_bk w_46 v_m"><b>已关注</b></span>');$("#fans_"+i).text(j.friendsCount)}else{$("#"+i).html('<span class="inline_bk w_46 v_m mg_r_5"><b>已关注</b></span><span class="v_m">粉丝<a class="inline_bk color_blue font_b mg_l_5" href="domain/people/fans'+b+'">'+j.friendsCount+"</a></span>")}$("#tip_"+i).slideDown().removeClass("tip_act");$("#tip_"+i).find("i").removeClass("error_icon").addClass("correct_icon");$("#tip_"+i).find("span").text("关注成功！").addClass("color_666").removeClass("color_red");disTime("#tip_"+i)}else{if(!$("#avatar_by").hasClass("by_info")){if(b==1000||d==1000){$("#follows").html('<a class="direct_btn mg_r_5" href="javascript:void(0);" onclick="openPopup(\'720\',\'popup_private_message\');"><em></em>私信</a><a class="cancel_attention_btn" href="javascript:void(0);" onclick="openConfirm(\'avatarinfo\');">已关注 <em class="color_blue">取消</em></a>')}else{$("#follows").html('<a class="grey_direct_btn mg_r_5 no_flow_btn"><em></em>私信</a><a class="cancel_attention_btn" href="javascript:void(0);" onclick="openConfirm(\'avatarinfo\');">已关注 <em class="color_blue">取消</em></a>')}}else{if(b==1000||d==1000){$("#follows").html('<a class="direct_btn mg_r_5" href="javascript:void(0);" onclick="openPopup(\'720\',\'popup_private_message\');"><em></em>私信</a><span class="inline_bk color_999 v_m"><b>已关注</b></span>')}else{$("#follows").html('<a class="grey_direct_btn mg_r_5 no_flow_btn"><em></em>私信</a><span class="inline_bk color_999 v_m"><b>已关注</b></span>')}}$("#fans_avatarinfo").text(j.friendsCount);$("#tip_avatarinfo").slideDown().removeClass("tip_act");$("#tip_avatarinfo").find("i").removeClass("error_icon").addClass("correct_icon");$("#tip_avatarinfo").find("span").text("关注成功！").addClass("color_666").removeClass("color_red");disTime("#tip_avatarinfo");directMsg()}}break;default:openCloseTips("uncurrent_b_icon",j.errorMessage,"color_red","320");return false}},"json")},unfollow:function(g,a,d){$("#cancel_"+a).slideUp();$("#cancel_avatarinfo").slideUp();var c=d?d:1;var f={datas:{rfId:g,relationType:c}};if(g==""){alert("no user id!");return false}var e=$("#ruserId").val();var b=domain+"/datas/unfollow";$.post(b,f,function(h){switch(h.isSuccess){case 0:$("#tip_"+a).slideDown().removeClass("tip_act");$("#tip_"+a).find("i").addClass("error_icon").removeClass("correct_icon");$("#tip_"+a).find("span").text("取消失败！").removeClass("color_666").addClass("color_red");disTime("#tip_"+a);break;case 1:if(a){$("#"+a).html('<a class="attention_btn mg_r_5" href="javascript:void(0);" onclick="relation.follow('+g+",'"+a+'\')">关注</a><span class="v_m">粉丝<a class="inline_bk color_blue font_b mg_l_5" href="domain/people/fans'+g+'">'+h.friendsCount+"</a></span>");$("#tip_"+a).slideDown().removeClass("tip_act");$("#tip_"+a).find("i").removeClass("error_icon").addClass("correct_icon");$("#tip_"+a).find("span").text("取消成功！").addClass("color_666").removeClass("color_red");disTime("#tip_"+a)}else{if(g==1000||e==1000){$("#follows").html('<a class="direct_btn mg_r_5" href="javascript:void(0);" onclick="openPopup(\'720\',\'popup_private_message\');"><em></em>私信</a><a class="attention_btn" href="javascript:void(0);" onclick="relation.follow('+g+",'',"+c+')">关注</a>')}else{$("#follows").html('<a class="grey_direct_btn mg_r_5 no_flow_btn"><em></em>私信</a><a class="attention_btn" href="javascript:void(0);" onclick="relation.follow('+g+",'',"+c+')">关注</a>')}$("#fans_avatarinfo").text(h.friendsCount);$("#tip_avatarinfo").slideDown().removeClass("tip_act");$("#tip_avatarinfo").find("i").removeClass("error_icon").addClass("correct_icon");$("#tip_avatarinfo").find("span").text("取消成功！").addClass("color_666").removeClass("color_red");disTime("#tip_avatarinfo");directMsg()}break;default:openCloseTips("uncurrent_b_icon",h.errorMessage,"color_red","320");return false}},"json")},visiter:function(c){if(c==""){alert("no user id!");return false}var b={datas:{vfId:c}};var a=domain+"/datas/visiter";$.post(a,b,function(d){},"json")}};