(function(win){
	var comm = {};
	
	String.prototype.decodeHTML = function (){
	    return this.replace(/&apos;/g, "'")
	               .replace(/&quot;/g, '"')
	               .replace(/&gt;/g, '>')
	               .replace(/&lt;/g, '<')
	               .replace(/&amp;/g, '&');
	};
	
	//定义回调的ajax方法
 	comm.ajaxPostCall = function(url,params,func){
 		$.ajax({
			type: "POST",
			url : url,
			data : params,
			timeout : 10000,
			cache : false
		})
		.done(function(data){
			func.call(this,data);
		})
		.fail(function(){
			alert("发生异常错误");
		});
 	};
 	
 	//定义Ajax的公共方法
 	comm.ajaxPost = function(url,params,returl){
 		$.ajax({
			type: "POST",
			url : url,
			data : params,
			timeout : 10000,
			cache : false
		})
		.done(function(data){
			data = jQuery.parseJSON(data);
			if(data.issuc){
				alert(data.msg);
				window.location.replace(returl);
			}
			else{
				alert(data.msg);
			}
		})
		.fail(function(){
			alert("发生异常错误");
		});
 	};
 	
 	//初始化select的选项值
 	comm.initSelect = function(selObj,url,params,optId,optVal,selVal,func){
 		initSelect(selObj,url,params,optId,optVal,selVal,func,false);
 	};
 	
	comm.initSelect = function(selObj,url,params,optId,optVal,selVal,func,isAddAll){
		var sel = selObj;
		sel.empty();
		if(isAddAll != null && isAddAll != undefined && isAddAll){
			var opt = $("<option value='ALL'>全部</option>");
			sel.append(opt);
		}
		this.ajaxPostCall(url,params,function(data){
			data = $.parseJSON(data);
			$.each(data.sels,function(index,elem){
				var option = $('<option value="' + elem[optId] + '">' + elem[optVal] + '</option>');
				sel.append(option);
				if(selVal != null && selVal != undefined && selVal != '' && option.val() == selVal){
					option.attr("selected","selected");
				}
			});
			if(func != null && func != undefined){
				func.call(this);
			}
		});
	};
	
	comm.initSelectpicker = function(selObj,url,params,optId,optVal,selVal,func,isAddAll){
		var sel = selObj;
		sel.empty();
		if(isAddAll != null && isAddAll != undefined && isAddAll){
			var opt = $("<option value='ALL'>全部</option>");
			sel.append(opt);
		}
		this.ajaxPostCall(url,params,function(data){
			data = $.parseJSON(data);
			$.each(data.sels,function(index,elem){
				var option = $('<option value="' + elem[optId] + '">' + elem[optVal] + '</option>');
				sel.append(option);
				if(selVal != null && selVal != undefined && selVal != '' && option.val() == selVal){
					option.attr("selected","selected");
				}
			});
			sel.selectpicker('refresh');
			if(func != null && func != undefined){
				func.call(this);
			}
		});
	};
	
	comm.initSelectizeCusArrKey = function(selObj,url,params,optId,optVal,selVal,arrKey,wTitle,func){
		var sel = selObj;
		sel.selectize()[0].selectize.destroy();
		this.ajaxPostCall(url,params,function(data){
			data = $.parseJSON(data);
			var optionArrs = [];
			$.each(data[arrKey],function(index,elem){
				var option;
				if(wTitle){
					option = {id:elem[optId],title:(elem[optId] + " " + elem[optVal])};
				}else{
					option = {id:elem[optId],title:elem[optId]};
				}
				optionArrs.push(option);
			});
			var selArrs = [];
			selArrs.push(selVal);
			sel.selectize({
				valueField: 'id',
				labelField: 'title',
				searchField: 'title',
				create : false,
				sortField : 'text',
				options: optionArrs,
				items: selArrs
			});
			if(func != null && func != undefined){
				func.call(this);
			}
		});
	};
	
	comm.initSelectizeCusAKWithId = function(selObj,url,params,cusId,optId,optVal,selVal,arrKey,wTitle,func){
		var sel = selObj;
		sel.selectize()[0].selectize.destroy();
		var valId;
		if(cusId != null && cusId !== ""){
			valId = cusId;
		}
		else{
			valId = optId;
		}
		this.ajaxPostCall(url,params,function(data){
			data = $.parseJSON(data);
			var optionArrs = [];
			$.each(data[arrKey],function(index,elem){
				var option;
				if(wTitle){
					option = {id:elem[valId],title:(elem[optId] + " " + elem[optVal])};
				}else{
					option = {id:elem[valId],title:elem[optId]};
				}
				optionArrs.push(option);
			});
			var selArrs = [];
			selArrs.push(selVal);
			sel.selectize({
				valueField: 'id',
				labelField: 'title',
				searchField: 'title',
				create : false,
				sortField : 'text',
				options: optionArrs,
				items: selArrs
			});
			if(func != null && func !== undefined){
				func.call(this);
			}
		});
	};
	
	comm.initSelectize = function(selObj,url,params,optId,optVal,selVal,func){
		var sel = selObj;
		sel.selectize()[0].selectize.destroy();
		this.ajaxPostCall(url,params,function(data){
			data = $.parseJSON(data);
			var optionArrs = [];
			$.each(data.sels,function(index,elem){
				var option = {id:elem[optId],title:elem[optVal]};
				optionArrs.push(option);
			});
			var selArrs = [];
			selArrs.push(selVal);
			sel.selectize({
				valueField: 'id',
				labelField: 'title',
				searchField: 'title',
				create : false,
				sortField : 'text',
				options: optionArrs,
				items: selArrs
			});
			if(func != null && func != undefined){
				func.call(this);
			}
		});
	};
 	
 	//初始化form提交表单
	comm.initFormForSubmit = function(action,method,params){
		var myForm = document.createElement("form");
	    myForm.action = action;
	    myForm.method = method;
	    $.each(params,function(name,value){
	    	var formInput = document.createElement("input");
	    	formInput.name = name;
	    	formInput.value = value;
	    	myForm.appendChild(formInput);
	    });
	    document.body.appendChild(myForm);
	    myForm.submit();
	};
	
	//初始化form提交表单
	comm.initJqueryFormForSubmit = function(action,method,params){
		var myForm = $("<form></form>");
	    myForm.attr("action",action);
	    myForm.attr("method",method);
	    $.each(params,function(name,value){
	    	var formInput = $("<input type='text'/>");  
	    	formInput.attr("name",name);
	    	formInput.attr("value",value);
	    	myForm.append(formInput);
	    });
	    myForm.appendTo('body').submit();
	};
	
	//校验对象是否为空
	comm.isBlank = function(obj){
		var flag = false;
		if(obj == null || obj == '' || obj == undefined || obj.trim().length == 0){
			flag = true;
		}
		return flag;
	};
	
	win.clickPage = function(pageIndex,ref) {
		var formObj = $(ref).parent().parent("form");
		formObj.find("input[name='page']").val(pageIndex);
		formObj.submit();
	};
	
	win.clickNewPage = function(pageIndex){
		var formObj = $("#pageForm");
		formObj.find("input[name='page']").val(pageIndex);
		formObj.submit();
	};
	
	win.pageGoTo = function(){
		var formObj = $("#pageForm");
		formObj.find("input[name='page']").val();
		formObj.submit();
	};
	
	win.copyToClipBoard = function(elemId,textType){
		var $temp = $("<input>");
		$("body").append($temp);
		var text;
		if(textType == '1'){
			text = $("#" + elemId).val();
		}
		else if(textType == '2'){
			text = $("#" + elemId).html();
			text = text.decodeHTML();
		}
		else{
			text = $("#" + elemId).text();
		}
		$temp.val(text).select();
		document.execCommand("copy");
		$temp.remove();
		alert("复制成功!");
	};
	
	win.copyToClipBoardText = function(obj){
		var text = $(obj).next("input").val();
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val(text).select();
		document.execCommand("copy");
		$temp.remove();
		alert("复制成功!");
	};
	
	//multipart form submit
	comm.ajaxMultipartForm = function(url,formData,func){
		$.ajax({
			url: url,
			type: 'POST',
			data: formData,
			cache: false,
			contentType: false,
			enctype: 'multipart/form-data',
			timeout : 10000,
			processData: false
		})
		.done(function(data){
			func.call(this,data);
		})
		.fail(function(){
			alert("multipart form发生异常错误");
		});
	};
	
	win.comm = comm;
	
})(window);

$(document).ready(function(){
	//搜索功能
//	$(".os-search").toggle(function(){
//		$(".os-input").animate({width:"100px"});
////		$(".os-input").css("padding-left","10px");
//		$(".os-snLogo").animate({"margin-right":"0px"});
//	},function(){
//		var searVal = $("#tlSearchIn").val();
//		if(searVal != null && searVal != undefined && searVal.length > 0){
//			$("#tlSearchForm").submit();
//		}
//		else{
//			$(".os-snLogo").animate({"margin-right":"40px"});
//			$(".os-input").animate({width:"0px"});
//			$(".os-input").css("padding-left","0px");
//		}
//	});
});
