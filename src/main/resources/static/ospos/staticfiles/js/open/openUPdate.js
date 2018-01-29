/**
 * Created by 14033210 on 16-9-6.
 */
$(function(){
    $(".tab").each(function(){
        $(this).find(".tab-handler li").each(function(index){
            $(this).click(function(){
                $(this).addClass("cur").siblings("li").removeClass("cur");
                $(this).parents(".tab").find(".tab-panel").eq(index).show().siblings(".tab-panel").hide();
            });
        })

        $(this).find(".tab-handler li").first().click();
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

    $(".os-nav >li dl dd").hover(function(){
        $(this).toggleClass("dd-hover");
    });

	$(".os-nav li").hover(function(){
		$(this).toggleClass("lihover");
	});

	$(".su-table tr.parent").each(function(){
		if($(this).find("td:first").hasClass("tdslidedown")){
			$(this).nextUntil("tr.parent").show();
		}else{
			$(this).nextUntil("tr.parent").hide();
		}
		$(this).click(function(){
			$(this).find("td:first").toggleClass("tdslidedown");
			if($(this).find("td:first").hasClass("tdslidedown")){
				$(this).nextUntil("tr.parent").show();
			}else{
				$(this).nextUntil("tr.parent").hide();
			}
		});
		
	});

    $("https://open.suning.com/ospos/staticfiles/js/open/.sidenav .list").hasClass("js-list");

    $(".JS-sideselect").each(function(){
        $(this).hover(function(){
            $(this).find(".list").show();
        },function(){
            $(this).find(".list").hide();
        });
    });


    $(".JS-sideselect .list li").hover(function(){
        $(this).toggleClass("hover");
    });

    $(".JS-sideselect .list li").click(function(){
        $(this).parents(".JS-sideselect").find("h3").text($(this).text());
        $(this).parent(".list").hide();
    });


    $(".JS-tab").each(function(){
        $(this).find(".JS-tab-handler li").each(function(index){
            $(this).click(function(){
                $(this).addClass("cur").siblings("li").removeClass("cur");
                $(this).parents(".JS-tab").find(".JS-tab-panel").eq(index).show().siblings(".JS-tab-panel").hide();
            });
        })

        $(this).find(".JS-tab-handler li").first().click();
    });
	
	
    $(".Jdisabled").attr("disabled","disabled");
    
	
    $(".Jplaceholder").live("focus",function(){
        $(this).addClass("focus");
        var _v = $(this).attr('rel'),
            _tV = $(this).val();
        if(_v == _tV){
           // $(this).val('')
            $(this).addClass("placeholder");
        }
    });
    $(".Jplaceholder").live("blur",function(){
        $(this).removeClass("focus");
        var _v = $(this).attr('rel'),
            _tV = $(this).val();
        if(_tV == '' || _v == _tV){
            $(this).addClass("placeholder2");
            $(this).removeClass("placeholder");
            $(this).val(_v);
        }else{
            $(this).addClass("placeholder");
        }
    });

    $(".JS-table tbody").find("tr:not(.JS-dynum):odd").addClass("odds");
	$(".JS-table tbody tr").hover(function(){
		$(this).toggleClass("trhover");
	});
	
	//应用概述
	$(".JS-check").click(function(){
		$(".appsecret").show();
	});
	
	$(".appsecret a").click(function(){
		$(this).parents(".appsecret").hide();
	});
	
	//应用证书
	$(".JS-certicheck").click(function(){
		$(this).hide();
		$(".appsecret2").show();
	});
	
	
	$(".appsecret2 a").click(function(){
		$(this).parents(".appsecret2").hide();
		$(".JS-certicheck").show();
	});
	
	
    function Time(){
        $('.Wdate').off().on('click',function(){
            WdatePicker();
        });
    }
    Time();

	//弹出框
    $(".JS-set").click(function(){
        $(".JS-setpop").show();
    });

	$(".JS-enter").click(function(){
        $(".JS-enterpop").show();
    });

    $(".popbox .close ,.popbox .btn-cancel").click(function(){
        $(this).parents(".popbox").hide();
    });
	
	
	//数据统计	
	$(".JS-btn_num").click(function(){
		$(this).parents("tr").next(".JS-dynum").toggle().siblings(".JS-dynum").hide();
	});
	
	$(".JS-dynum .btn_colse").click(function(){
		$(this).parents(".JS-dynum").hide();
	});

	//左侧分类出滚动条
	var _mainRightH = $(".JS-mainRight").height();
	$(".js-list").css("maxHeight",_mainRightH-122);

	//控制台
	$(".cooperation .JS_close").click(function(){
		$(this).parents(".promotion").hide();
	});
});


	
	
	