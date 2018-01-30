;(function($, undefined){


$(".lo-panner.lo-icon1").animate({top: '150px','left':'50%','opacity':'1','margin-left':'-50px'}, 500);
$(".lo-panner.lo-icon2").animate({top: '62px','left':'50%','opacity':'1','margin-left':'187px'}, 500);
$(".lo-panner.lo-icon3").animate({top: '127px','left':'50%','opacity':'1','margin-left':'343px'}, 500);


})(jQuery);


// input 暗注
$(".Jclear").live("focus",function(){
	$(this).addClass("focus");
	var _v = $(this).attr('rel'),
		_tV = $(this).val();
	if(_v == _tV){
		$(this).val('').css('color','#333');
		$(this).val('').css('font-size','14px');
	}
});
$(".Jclear").live("blur",function(){
	$(this).removeClass("focus");
	var _v = $(this).attr('rel'),
		_tV = $(this).val();
	if(_tV == '' || _v == _tV){
		$(this).css('color','#999').val(_v);
		$(this).css('font-size','16px');
	}else{
		$(this).css('color','#333');
		$(this).css('font-size','14px');
	}
});
// textArea 暗注
$(".JClear").live("focus",function(){
	$(this).addClass("focus");
	var _v = $(this).attr('rel'),
		_tV = $(this).val();
	if(_v == _tV){
		$(this).val('').css('color','#333');
		$(this).css('font-size','12px');
	}
});
$(".JClear").live("blur",function(){
	$(this).removeClass("focus");
	var _v = $(this).attr('rel'),
		_tV = $(this).val();
	if(_tV == '' || _v == _tV){
		$(this).css('color','#999').val(_v);
		$(this).css('font-size','12px');
	}else{
		$(this).css('color','#333');
		$(this).css('font-size','12px');
	}
});


//search input
$(".os-search").click(function(){
	$(".os-input").focus();
	//如果退出框没隐藏，未已登陆状态
	if($(".search-top").prev("a").is(":visible")){
		$(".os-input").animate({width:"150px"});
		$(".os-exit").css("visibility",'hidden');
		$(".lname").css("visibility",'hidden');
	}else{
		$(".os-input").animate({width:"90px"});
	}
	$(".os-input").addClass("os-input-show");
	$(".os-login").hide();
});

$(".os-input").blur(function(){
	$(".os-input").animate({width:"0px"});
	$(".os-input").removeClass("os-input-show");
	var username=$("#alLoginName").text();
	if(username.length==0){
		$("#withOutLogin").show();
		$("#alLogin").hide();
	}else{
		$("#alLogin").show();
		$("#withOutLogin").hide();
	}
	if($(".os-exit").length>0){
		$(".os-exit").css("visibility",'visible');
		$(".lname").css("visibility",'visible');
	}
})

// 滚动显示tip
/*$(window).scroll(function(){
	if($(window).scrollTop() >= 105){
        $(".os-topTo").stop(true,true).fadeIn(100); 
        $(".pr-note").css("top","20px");       
    }if($(window).scrollTop() >= 10){
    	$(".on-posfix").css("position","fixed");
		$(".on-posfix").css("top","0px"); 
	}if($(window).scrollTop() >= 250){
		$(".su-titList").css("position","fixed");
		$(".su-titList").css("top","-10px");
	}else{    
        $(".os-topTo").stop(true,true).fadeOut(100);    
        $(".pr-note").css("top","146px");
        $(".on-posfix").css("position","absolute");
        $(".on-posfix").css("top","100px");
        $(".su-titList").css("position","absolute");
		$(".su-titList").css("top","90px");    
    } 
});*/

// 置顶
$(".os-topTo").click(function(){
	$('html,body').animate({scrollTop: '0px'}, 400);
});


// login 淡入淡出
$(".lo-lostPassA").click(function(){
	$(".os-loginDiv").animate({left:'-500px',opacity:'0'},400);
	$(".lo-findPassW").animate({opacity:'100','z-index':'10'},500);
});

$(".lo-regA").click(function(){
	$(".os-loginDiv").animate({left:'-500px',opacity:'0'},400);
	$(".lo-regDiv").animate({opacity:'100','z-index':'10'},500);
});

$(".lo-backLogin").click(function(){
	$(".os-loginDiv").animate({left:'0px',opacity:'1'},400);
	$(".lo-findPassW").animate({opacity:'0','z-index':'9'},400);
	$(".lo-regDiv").animate({opacity:'0','z-index':'9'},400);
});



// menu left
$(".on-menuL ul li").click(function(e){
	$(this).parents(".on-menuL").find("li").removeClass("on-menuOn");
	$(this).parents(".on-menuL").find("li .su-mask").removeClass("su-mask1");
	$(this).not(".child-li").addClass("on-menuOn");
	$(this).find(".su-mask").addClass("su-mask1");
	//e.stopPropagation();
});


// 三级菜单
$(".parent-li").toggle(function(){
   $(this).find(".se-icon2").addClass("se-icon1");
   $(this).parents("dl").find(".child-parent").slideUp();
},function(){
	$(this).find(".se-icon2").removeClass("se-icon1");
   	$(this).parents("dl").find(".child-parent").slideDown();
});

$(".child-li dt").toggle(function(){
	$(this).find(".se-icon2").addClass("se-icon1");
	$(this).parents("li").next(".child-child").slideUp();
},function(){
	$(this).find(".se-icon2").removeClass("se-icon1");
	$(this).parents("li").next(".child-child").slideDown();
});


// 公告 淡入淡出
$(".pr-title.pr-t1").toggle(function(){
	$(".pr-con1").slideDown();
	$(this).find("em").removeClass("pr-up");
},function(){
	$(".pr-con1").slideUp();
	$(this).find("em").addClass("pr-up");
});
$(".pr-title.pr-t2").toggle(function(){
	$(".pr-con2").slideDown();
	$(this).find("em").removeClass("pr-up");
},function(){
	$(".pr-con2").slideUp();
	$(this).find("em").addClass("pr-up");
});
$(".pr-title.pr-t3").toggle(function(){
	$(".pr-con3").slideUp();
	$(this).find("em").addClass("pr-up");
},function(){
	$(".pr-con3").slideDown();
	$(this).find("em").removeClass("pr-up");
});
$(".pr-title.pr-t4").toggle(function(){
	$(".pr-con4").slideUp();
	$(this).find("em").addClass("pr-up");
},function(){
	$(".pr-con4").slideDown();
	$(this).find("em").removeClass("pr-up");
});
$(".pr-title.pr-t5").toggle(function(){
	$(".pr-con5").slideUp();
	$(this).find("em").addClass("pr-up");
},function(){
	$(".pr-con5").slideDown();
	$(this).find("em").removeClass("pr-up");
});
$(".pr-title.pr-t6").toggle(function(){
	$(".pr-con6").slideUp();
	$(this).find("em").addClass("pr-up");
},function(){
	$(".pr-con6").slideDown();
	$(this).find("em").removeClass("pr-up");
});
$(".pr-title.pr-t7").toggle(function(){
	$(".pr-con7").slideUp();
	$(this).find("em").addClass("pr-up");
},function(){
	$(".pr-con7").slideDown();
	$(this).find("em").removeClass("pr-up");
});
$(".pr-title.pr-t8").toggle(function(){
	$(".pr-con8").slideDown();
	$(this).find("em").removeClass("pr-up");
},function(){
	$(".pr-con8").slideUp();
	$(this).find("em").addClass("pr-up");
});
$(".pr-title.pr-t9").toggle(function(){
	$(".pr-con9").slideUp();
	$(this).find("em").addClass("pr-up");
},function(){
	$(".pr-con9").slideDown();
	$(this).find("em").removeClass("pr-up");
});
$(".pr-title.pr-t10").toggle(function(){
    $(".pr-con10").slideUp();
    $(this).find("em").addClass("pr-up");
},function(){
    $(".pr-con10").slideDown();
    $(this).find("em").removeClass("pr-up");
});
$(".pr-title.pr-t11").toggle(function(){
    $(".pr-con11").slideUp();
    $(this).find("em").addClass("pr-up");
},function(){
    $(".pr-con11").slideDown();
    $(this).find("em").removeClass("pr-up");
});
$(".pr-title.pr-t12").toggle(function(){
    $(".pr-con12").slideUp();
    $(this).find("em").addClass("pr-up");
},function(){
    $(".pr-con12").slideDown();
    $(this).find("em").removeClass("pr-up");
});
$(".pr-title.pr-t13").toggle(function(){
    $(".pr-con13").slideUp();
    $(this).find("em").addClass("pr-up");
},function(){
    $(".pr-con13").slideDown();
    $(this).find("em").removeClass("pr-up");
});
$(".pr-title.pr-t14").toggle(function(){
    $(".pr-con14").slideUp();
    $(this).find("em").addClass("pr-up");
},function(){
    $(".pr-con14").slideDown();
    $(this).find("em").removeClass("pr-up");
});
$(".pr-title.pr-t15").toggle(function(){
    $(".pr-con15").slideUp();
    $(this).find("em").addClass("pr-up");
},function(){
    $(".pr-con15").slideDown();
    $(this).find("em").removeClass("pr-up");
});
$(".pr-title.pr-t16").toggle(function(){
    $(".pr-con16").slideUp();
    $(this).find("em").addClass("pr-up");
},function(){
    $(".pr-con16").slideDown();
    $(this).find("em").removeClass("pr-up");
});
$(".pr-title.pr-t17").toggle(function(){
    $(".pr-con17").slideUp();
    $(this).find("em").addClass("pr-up");
},function(){
    $(".pr-con17").slideDown();
    $(this).find("em").removeClass("pr-up");
});
$(".pr-title.pr-t18").toggle(function(){
    $(".pr-con18").slideUp();
    $(this).find("em").addClass("pr-up");
},function(){
    $(".pr-con18").slideDown();
    $(this).find("em").removeClass("pr-up");
});
$(".pr-title.pr-t19").toggle(function(){
    $(".pr-con12").slideUp();
    $(this).find("em").addClass("pr-up");
},function(){
    $(".pr-con19").slideDown();
    $(this).find("em").removeClass("pr-up");
});





//导航定位
$("ul[name='apibuslist'] li").click(function(){
	var href = $(this).find("a").attr("href");
	var pos = $(href).offset().top-50;
	$("html,body").animate({scrollTop: pos}, 800);
	return false;	
});

$(".pos li").each(function(index){
	$(this).click(function(){
		var _ptitleTop = $(".pr-title").eq(index).offset().top;
		var wst =  $(window).scrollTop();
		var wH = $(window).height();
		for (i=1; i<10; i++){      
			if($(document).height()-_ptitleTop<wH){
				$(this).addClass("cur").siblings("li").removeClass("cur");
			}else{
				if($("#local"+i).offset().top<=wst+5){ //判断滚动条位置
					$("#scroll-it"+i).parents("li").addClass("cur").siblings("li").removeClass("cur");    //给当前导航加c类
				}
			}
		} 
		var href = $(this).find("a").attr("href");
		var pos = $(href).offset().top;
		$("html,body").animate({scrollTop: pos}, 800);
		return false;	
	});
});

// 平台简介 list position
$(".on-posHover").hover(function(){
	$(this).find("em").css({"background-color":"#f7f8f9","border":"1px solid #e2e3e4","border-bottom":"none"});
	$(".on-posfix .on-posList").show();
},function(){
	$(this).find("em").css({"background-color":"#fff","border":"1px solid #fff","border-bottom":"none"});
	$(".on-posfix .on-posList").hide();
});

// select
$(".selUl").click(function(){
	$(this).nextAll(".selOpt").show();
});
$(".selIcon").click(function(){
	$(this).next(".selOpt").show();
});
$(".selOpt li").click(function(){
	$(this).parent().prevAll(".selUl").find("li").text($(this).text());
	$(this).parent().hide();
})
$(".autIdTable").hover(function(){},function(){
	$(".selOpt").hide();
});


$(".selOptF li").click(function(){
	if($(this).index() == 0){
		$(".selUlSS li").text($(".selUlSS").nextAll(".selOpt").find("li:eq(0)").text());
		$(".autIdTableT").show();
		$(".te-TextT").hide();
		$(".selUl li").css("color","#999");
	}
	if($(this).index() == 1){
		$(".selUlSS li").text($(".selUlSS").nextAll(".selOpt").find("li:eq(1)").text());
		$(".autIdTableT").hide();
		$(".te-TextT").show();
		$(".selUl li").css("color","rgb(51, 51, 51)");
	}	
	if($(this).index() >= 2){
		$(".selUlSS li").text($(".selUlSS").nextAll(".selOpt").find("li:eq(0)").text());
		$(".autIdTableT").show();
		$(".te-TextT").hide();
		$(".selUl li").css("color","#999");
		$(".selUlS li").css("color","rgb(51, 51, 51)");
	}
});

$(".selOptS li").click(function(){
	if($(this).index() == 0){
		$(".autIdTableT").show();
		$(".te-TextT").hide();
		$(".selUlSS li").css("color","#999");
		$(".selUlSSS li").css("color","#999");
	}
	if($(this).index() == 1){
		$(".autIdTableT").hide();
		$(".te-TextT").show();
		$(".selUlSS li").css("color","rgb(51, 51, 51)");
	}
	if($(this).index() >= 2){
		$(".autIdTableT").show();
		$(".te-TextT").hide();
		$(".selUlSS li").css("color","rgb(51, 51, 51)");
	}
});

$(".selTest li").click(function(){
	if($(this).index() > 0){
		$(this).parent().prev().prev().find("li").css("color","rgb(51, 51, 51)");
	}else{
		$(this).parent().prev().prev().find("li").css("color","#999");
	}
});
// input 
$(".lo-text,.te-Text").focus(function(){
	$(this).css("border","1px solid #76abf3");
});
$(".lo-text,.te-Text").blur(function(){
	$(this).css("border","1px solid #ddd");
});
