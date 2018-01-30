(function(){
	
	//无限循环表格tr（子类）,以一个表格为单位
	$(".JS_showHide").each(function(){
		var _this=$(this)
		var _trnode=_this.find("tr[deep]");
		//子类隐藏
		for(i=0;i<_trnode.length;i++)
		{
		}
		//_trnode表示的是含有deep属性的tr标签
		_trnode.each(function(){
			var _this=$(this)
			var cur_deep=_this.attr("deep")
			//这个是当前tr下的直接子菜单
			var next_l=_this.nextUntil("tr[deep='"+cur_deep+"']");
			//如果当前下面的子类的个数是大于0的
			if(next_l.length>0)
				{
					var parernt_title=_this.find(".title").css("paddingLeft");
						next_l.each(function(){//
							if($(this).attr("deep")==parseInt(cur_deep)+1)
							{
								//$(this).removeAttr("style")
								if(_this.find(".title").length>0)
								{
									$(this).find(".title").css("padding-left",parseInt(parseInt(_this.find(".title").css("paddingLeft").slice(0,-2))+17)+"px")
									}
								}
						})
					
				_this.find("i").toggle(
					   function(){								
							var next_l=_this.nextUntil("tr[deep='"+cur_deep+"']")
							var parernt_title=_this.find(".title").css("paddingLeft")
							next_l.each(function(){
	                            if($(this).attr("deep")>=parseInt(cur_deep)+1)
	                            {
	                                $(this).removeAttr("style")
	                            }
	                        })
							_this.find("i").removeClass("plus_link").addClass("minus_link");
						},
						function(){
						var next_l=_this.nextUntil("tr[deep='"+cur_deep+"']")
						//var parernt_title=_this.find(".title").css("paddingLeft")
						next_l.each(function(){
                            if($(this).attr("deep")>=parseInt(cur_deep)+1)
                            {
                                $(this).css("display","none");
                                }
                            //如果直接点击的最顶部的

                        })
						_this.find("i").removeClass("minus_link").addClass("plus_link");
					})
				}
				//如果当前tr的没有子类
				else
				{
					_this.find("i").removeClass("plus_link").addClass("minus_link");
				}
			})
	})
})();
/* table表格模块结束 */