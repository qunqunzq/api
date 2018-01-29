(function ($) {
    $.fn.opWidget = function () {
        var _that = this,
            TabsSetting = {
                effect: "none", //切换时的动画效果 ex: none,最朴素的显示/隐藏效果 fade,可实现淡隐淡现的效果 scrolly,垂直滚动 scrollx,水平滚动
                navCls: "ds-switchable-nav", //对其进行轮播的目标列表的class值
                contentCls: "ds-switchable-content", //轮播列表所对应的内容列表的class值
                delay: .1, //延迟加载时间 .1 == 100ms
                triggerType: "mouse", //触发方式—— mouse：鼠标经过触发 click：鼠标点击触发
                hasTriggers: true, //是否设置触发点
                activeTriggerCls: "ds-active", //默认激活列表项的class值
                autoplay: true, //是否自动播放
                circular: true, //是否有循环滚动效果
                prevBtnCls: "ds-prev", //上一页的class值
                nextBtnCls: "ds-next", //下一页的class值
                disableBtnCls: "ds-disable", //按钮不可用的class值
                duration: 0.3, //动画时长 0.1 = 100ms
                waitingTime: 3  //画面停留时长 0.1 = 100ms ， 默认值为3
            },
            CountdownSetting = {
                endTime: 0, //倒计时结束时间 例如：毫秒数： 'endTime': '10000' 或 日期格式： 'endTime': '2011-7-21 11:01:01'
                interval: 100, //倒计时刷新间隔（单位为毫秒/次）即每隔多少毫秒刷新一次
                timeRunCls: '.ds-countdown-run', //有此class名的标签，其内容在倒计时运行时显示,倒计时结束时隐藏
                timeUnitCls: { //设定时间单位b标签的class
                    'd': '.ds-d',      //天
                    'h': '.ds-h',      //小时
                    'm': '.ds-m',      //分
                    's': '.ds-s',      //秒
                    'i': '.ds-i'       //100毫秒
                },
                timeEndCls: '.ds-countdown-end' //有此class名的标签，其内容在倒计时运行时隐藏,倒计时结束时显示
            },
            NavSetting = {
                effect: "none", //切换时的动画效果
                mainMenuCls: "ds-mainmenu", //需要有下拉菜单的主导航的class值
                subMenuCls: "ds-submenu", //下拉菜单的class值
                duration: 0.3 //动画时长 0.1 = 100ms
            },
            MaskSetting = {
                effect: "none", //切换时的动画效果
                maskLayoutCls: "ds-mask-layout", //需要遮罩的模块的class值
                maskCls: "ds-mask", //遮罩的class值
                duration: 0.3 //动画时长 0.1 = 100ms
            },
            MagnifySetting = {
                magnifyCls: "ds-magnify", //需要变更的模块的class值
                bigDemoCls: "ds-bigDemo" //放大后的模块的class值
            },
            AccordionSetting = {
                triggerCls: "ds-switchable-trigger",  //主列表的class值
                panelCls: "ds-switchable-panel",  //列表所对应的内容列表的class值
                activeTriggerCls: "ds-active", //默认激活列表项的class值
                triggerType: "mouse"  //触发方式——mouse：鼠标经过触发 click：鼠标点击触发
            };
        _that.each(function () {
            var _tt = $(this),
                widgetType = _tt.attr("data-widget-type"),
                widgetConfig = _tt.attr("data-widget-config"),
                settings = {}, options = {};
            widgetConfig = widgetConfig ? checkConfig(widgetConfig) : "{}";
            options = $.parseJSON(widgetConfig);
            switch (widgetType) {
                case "Tabs":
                case "Slide":
                    settings = $.extend(false, {}, TabsSetting, options);
                    settings = settingInit(settings);
                    tabsAct(_tt, settings);
                    break;
                case "Carousel":
                    settings = $.extend(false, {}, TabsSetting, options);
                    settings = settingInit(settings);
                    tabsAct(_tt, settings, 1);
                    break;
                case "Countdown":
                    settings = $.extend(false, {}, CountdownSetting, options);
                    settings = countdownSettingInit(settings);
                    countdownAct(_tt, settings);
                    break;
                case "Nav":
                    settings = $.extend(false, {}, NavSetting, options);
                    settings = navSettingInit(settings);
                    navAct(_tt, settings);
                    break;
                case "Mask":
                    settings = $.extend(false, {}, MaskSetting, options);
                    settings = maskSettingInit(settings);
                    maskAct(_tt, settings);
                    break;
                case "Magnify":
                    settings = $.extend(false, {}, MagnifySetting, options);
                    settings = magnifySettingInit(settings);
                    magnifyAct(_tt, settings);
                    break;
                case "Accordion":
                    settings = $.extend(false, {}, AccordionSetting, options);
                    settings = accordionSettingInit(settings);
                    accordionAct(_tt, settings);
                    break;
                default:
                    break;
            }
        });
        function checkConfig(widgetConfig) {
            var wca = widgetConfig.match(/[a-zA-Z0-9_]|\{|\}|\-|\_|\.|\:|\'|\"|\,/g);
            if (wca) {
                widgetConfig = wca.join("");
            } else {
                return;
            }
            widgetConfig = widgetConfig.replace(/'/g, '"').replace(/}$/, '').replace(/{/, '');
            var reg = /"?endTime"?:?"?([0-9].+?[0-9])"?,/,
                ret = /"?timeUnitCls"?:?"?{(.+?)}"?,/,
                sk = widgetConfig.match(reg),
                st = widgetConfig.match(ret),
                widgetConfig = widgetConfig.replace(reg, ""),
                widgetConfig = widgetConfig.replace(ret, "");
            var arr = [], arr = widgetConfig.split(","), li = arr.length, con = "{";
            if (sk) {
                if (parseInt(sk[1]) == sk[1]) {
                    var cs = sk[1];
                } else {
                    var ski1 = sk[1].match(/.{8}$/), ski2 = sk[1].replace(/.{8}$/, "");
                    var cs = ski2 + " " + ski1[0];
                }
                con += '"endTime":"' + cs + '",';
            }
            if (st) {
                con += '"timeUnitCls":' + checkConfig(st[1]) + ',';
            }
            for (var n = 0; n <= li - 1; n++) {
                arr[n] = arr[n].split(/:/);
                if (arr[n].length >= 2) {
                    arr[n][1] = '"' + arr[n][1].replace(/"/g, '') + '"';
                    arr[n][0] = '"' + arr[n][0].replace(/"/g, '') + '"';
                    con += arr[n][0] + ":" + arr[n][1];
                    if (n < li - 1) {
                        con += ",";
                    }
                }
            }
            con += "}";
            return con;
        }

        function settingInit(settings) {
            if (settings.effect != "fade" && settings.effect != "scrolly" && settings.effect != "scrollx" && settings.effect != "special") {
                settings.effect = "none";
            }
            if (Number(settings.delay) < 0 || !Number(settings.delay)) {
                settings.delay = 0.1;
            }
            if (settings.triggerType != "click") {
                settings.triggerType = "mouseenter";
            }
            if (!settings.hasTriggers || settings.hasTriggers == "false") {
                settings.hasTriggers = false;
            }
            if (!settings.autoplay || settings.autoplay == "false") {
                settings.autoplay = false;
            }
            if (!settings.circular || settings.circular == "false") {
                settings.circular = false;
            }
            if (Number(settings.duration) < 0 || !Number(settings.duration)) {
                settings.duration = 0.3;
            }
            if (Number(settings.waitingTime) <= 0.1 || !Number(settings.waitingTime)) {
                settings.waitingTime = 3;
            }
            if (Number(settings.waitingTime) <= Number(settings.delay)) {
                settings.delay = 0.1;
            }
            settings.navCls = clsInit(settings.navCls);
            settings.contentCls = clsInit(settings.contentCls);
            settings.activeTriggerCls = clsInit(settings.activeTriggerCls);
            settings.prevBtnCls = clsInit(settings.prevBtnCls);
            settings.nextBtnCls = clsInit(settings.nextBtnCls);
            settings.disableBtnCls = clsInit(settings.disableBtnCls);
            return settings;
        }

        function countdownSettingInit(settings) {
            if (Number(settings.interval) < 100 || !Number(settings.interval)) {
                settings.interval = 100;
            }
            settings.timeUnitCls.d = clsInit(settings.timeUnitCls.d);
            settings.timeUnitCls.h = clsInit(settings.timeUnitCls.h);
            settings.timeUnitCls.m = clsInit(settings.timeUnitCls.m);
            settings.timeUnitCls.s = clsInit(settings.timeUnitCls.s);
            settings.timeUnitCls.i = clsInit(settings.timeUnitCls.i);
            settings.timeRunCls = clsInit(settings.timeRunCls);
            settings.timeEndCls = clsInit(settings.timeEndCls);
            return settings;
        }

        function navSettingInit(settings) {
            if (settings.effect != "slide") {
                settings.effect = "none";
            }
            if (Number(settings.duration) < 0 || !Number(settings.duration)) {
                settings.duration = 0.3;
            }
            settings.mainMenuCls = clsInit(settings.mainMenuCls);
            settings.subMenuCls = clsInit(settings.subMenuCls);
            return settings;
        }

        function maskSettingInit(settings) {
            if (settings.effect != "fade") {
                settings.effect = "none";
            }
            if (Number(settings.duration) < 0 || !Number(settings.duration)) {
                settings.duration = 0.3;
            }
            settings.maskLayoutCls = clsInit(settings.maskLayoutCls);
            settings.maskCls = clsInit(settings.maskCls);
            return settings;
        }

        function magnifySettingInit(settings) {
            settings.magnifyCls = clsInit(settings.magnifyCls);
            settings.bigDemoCls = clsInit(settings.bigDemoCls);
            return settings;
        }

        function accordionSettingInit(settings) {
            if (settings.triggerType != "click") {
                settings.triggerType = "mouseenter";
            }
            settings.triggerCls = clsInit(settings.triggerCls);
            settings.panelCls = clsInit(settings.panelCls);
            settings.activeTriggerCls = clsInit(settings.activeTriggerCls);
            return settings;
        }

        function clsInit(cls) {
            return cls.replace(/\{|\}|\.|\:|\'|\"|\,/g, "");
        }

        function tabsAct(_tt, settings, bl) {
            var _nav = _tt.find("." + settings.navCls),
                _con = _tt.find("." + settings.contentCls), _tCon = _con.children(), tConLength = _tCon.size(),
                tcWidth = _tCon.width(), tcHeight = _tCon.height(),
                duration = 0, ct;
            if (_nav.size() <= 0) {
                addNav(_con, tConLength, settings);
                _nav = _tt.find("." + settings.navCls);
            }
            var _tNav = _nav.children();
            if (settings.effect == "special") {
                if (bl) {
                    specialCarousel(_tt, settings, tcWidth, tcHeight, 0, 0);
                    settings.hasTriggers = false;
                    settings.circular = true;
                } else {
                    settings.effect = "none";
                }
            }
            if (settings.effect == "none") {
                duration = 0;
            } else {
                duration = settings.duration * 1000;
            }
            if (!settings.hasTriggers) {
                _nav.hide();
            }
            _tNav.off(settings.triggerType + " click");
            _tNav.on(settings.triggerType + " click", function () {
                var _t = $(this), index = _t.index(), tnSize = _tNav.size();
                clearTimeout(ct)
                ct = setTimeout(function () {
                    _t.addClass(settings.activeTriggerCls).siblings().removeClass(settings.activeTriggerCls);
                    if (settings.effect == "none" || settings.effect == "fade") {
                        _tCon.eq(index).stop(true, true).fadeIn(duration).siblings().stop(true, true).fadeOut(duration);
                    } else if (settings.effect == "scrolly") {
                        var ch = _tCon.height();
                        _con.stop(true, true).animate({
                            marginTop: -index * ch
                        }, duration);
                    } else if (settings.effect == "scrollx") {
                        var cw = _tCon.width();
                        _con.stop(true, true).animate({
                            marginLeft: -index * cw
                        }, duration);
                    } else if (settings.effect == "special") {
                        specialCarousel(_tt, settings, tcWidth, tcHeight, duration, index);
                    }
                    if (bl && !settings.circular) {
                        var _prev1 = _tt.find("." + settings.prevBtnCls), _next1 = _tt.find("." + settings.nextBtnCls);
                        if (index <= 0) {
                            _prev1.addClass(settings.disableBtnCls);
                        } else {
                            _prev1.removeClass(settings.disableBtnCls);
                        }
                        if (index >= tnSize - 1) {
                            _next1.addClass(settings.disableBtnCls);
                        } else {
                            _next1.removeClass(settings.disableBtnCls);
                        }
                    }
                }, settings.delay * 1000);
            });
            if (settings.autoplay) {
                tabsInterval(_tt, _tNav, settings);
            }
            if (bl) {
                var _prev = _tt.find("." + settings.prevBtnCls), _next = _tt.find("." + settings.nextBtnCls);
                if (!settings.circular) {
                    _prev.addClass(settings.disableBtnCls);
                }
                _tt.on("click", "." + settings.prevBtnCls, function () {//.not("." + settings.disableBtnCls)
                    var _t = $(this), _nn = _nav.find("." + settings.activeTriggerCls), ni = _tNav.index(_nn), dSize = _t.filter("." + settings.disableBtnCls).size();
                    if (dSize <= 0) {
                        if (ni >= 1) {
                            _nn.prev().triggerHandler("click");
                        } else {
                            _tNav.filter(":last").triggerHandler("click");
                        }
                    }
                });
                _tt.on("click", "." + settings.nextBtnCls, function () {//.not("." + settings.disableBtnCls)
                    var _t = $(this), _nn = _nav.find("." + settings.activeTriggerCls), ni = _tNav.index(_nn), nc = _tNav.size(), dSize = _t.filter("." + settings.disableBtnCls).size();
                    if (dSize <= 0) {
                        if (ni <= nc - 2) {
                            _nn.next().triggerHandler("click");
                        } else {
                            _tNav.filter(":first").triggerHandler("click");
                        }
                    }
                });
            }
        }

        function specialCarousel(_tt, settings, tcWidth, tcHeight, duration, aum) {
            var _con = _tt.find("." + settings.contentCls), _tCon = _con.children(), tConLength = _tCon.size(),
                ttWidth = _tt.width();
            _tCon.each(function (i) {
                var _t = $(this);
                var sinx = Math.sin(2 * Math.PI / tConLength * ((i - aum + tConLength) % tConLength)) + 1,
                    cosx = Math.cos(2 * Math.PI / tConLength * ((i - aum) % tConLength)) + 1,
                    tLeft = Math.round(sinx * (ttWidth - tcWidth) / 2),
                    tWidth = Math.round(Math.abs(cosx * tcWidth * 2 / 3) / 2 + tcWidth / 3),
                    tHeight = Math.round(Math.abs(cosx * tcHeight * 2 / 3) / 2 + tcHeight / 3),
                    tzIndex = Math.round(cosx * tConLength * 2);
                _t.animate({
                    width: tWidth,
                    height: tHeight,
                    left: tLeft + (tcWidth - tWidth) / 2,
                    top: (tcHeight - tHeight) / 2,
                    zIndex: tzIndex
                }, duration);
            });
        }

        function addNav(_con, tConLength, settings) {
            var navCon = '<ul class="' + settings.navCls + '">';
            for (var i = 0; i < tConLength; i++) {
                navCon += '<li';
                if (i == 0) navCon += ' class="' + settings.activeTriggerCls + '"';
                navCon += '>' + (i + 1) + '</li>';
            }
            navCon += '</ul>';
            _con.after(navCon);
        }

        function tabsInterval(_tt, _tNav, settings) {
            var actInterval = setInterval(function () {
                tabsAutoPlay(_tNav, settings);
            }, settings.waitingTime * 1000);
            _tt.mouseenter(function () {
                clearInterval(actInterval);
            }).mouseleave(function () {
                    clearInterval(actInterval);
                    actInterval = setInterval(function () {
                        tabsAutoPlay(_tNav, settings);
                    }, settings.waitingTime * 1000);
                });
        }

        function tabsAutoPlay(_tNav, settings) {
            var countLi = _tNav.size(), _actLi = _tNav.filter("." + settings.activeTriggerCls);
            if (_actLi.index() >= countLi - 1) {
                if (settings.circular) {
                    _tNav.eq(0).triggerHandler("click");
                }
            } else {
                _actLi.next().triggerHandler("click");
            }
        }

        function countdownAct(_tt, settings) {
            var t = 0;
            if (parseInt(settings.endTime) == settings.endTime) {
                t = parseInt(settings.endTime);
            } else {
                var EndTime = settings.endTime.replace(/-/g, "/"), EndTime = new Date(EndTime),
                    NowTime = new Date();
                t = parseInt(EndTime.getTime()) - parseInt(NowTime.getTime());
            }
            GetTime(_tt, settings, t);
        }

        function GetTime(_tt, settings, t) {
            var d = 0, h = 0, m = 0, s = 0, i = 0;
            if (t >= 0) {
                d = addZero(Math.floor(t / 1000 / 60 / 60 / 24));
                h = addZero(Math.floor(t / 1000 / 60 / 60 % 24));
                m = addZero(Math.floor(t / 1000 / 60 % 60));
                s = addZero(Math.floor(t / 1000 % 60));
                i = Math.floor((t % 1000) / 100);
            }
            _tt.find("." + settings.timeUnitCls.d).text(d);
            _tt.find("." + settings.timeUnitCls.h).text(h);
            _tt.find("." + settings.timeUnitCls.m).text(m);
            _tt.find("." + settings.timeUnitCls.s).text(s);
            _tt.find("." + settings.timeUnitCls.i).text(i);
            if (t >= settings.interval) {
                t -= settings.interval;
                setTimeout(function () {
                    GetTime(_tt, settings, t);
                }, settings.interval);
            } else if (t > 0 && t <= settings.interval) {
                setTimeout(function () {
                    GetTime(_tt, settings, 0);
                }, t);
            } else {
                _tt.find("." + settings.timeRunCls).hide();
                _tt.find("." + settings.timeEndCls).show();
            }
        }

        function addZero(n) {
            return n >= 10 ? n : "0" + n;
        }

        function navAct(_tt, settings) {
            var _mainMenu = _tt.find("." + settings.mainMenuCls), duration, st;
            if (settings.effect == "slide") {
                duration = settings.duration * 1000;
            } else if (settings.effect == "none") {
                duration = 0;
            }
            _mainMenu.on("mouseenter",function () {
                var _ts = $(this).find("." + settings.subMenuCls);
                _ts.stop(true, true);
                st = setTimeout(function () {
                    if (settings.effect == "slide") {
                        _ts.slideDown(duration);
                    } else {
                        _ts.fadeIn(duration);
                    }
                }, 100);
            }).on("mouseleave", function () {
                    clearTimeout(st);
                    var _ts = $(this).find("." + settings.subMenuCls);
                    _ts.stop(true, true);
                    if (settings.effect == "slide") {
                        _ts.slideUp(duration);
                    } else {
                        _ts.fadeOut(duration);
                    }
                });
        }

        function maskAct(_tt, settings) {
            var _hasmask = _tt.find("." + settings.maskLayoutCls), duration, ct;
            if (settings.effect == "fade") {
                duration = settings.duration * 1000;
            } else if (settings.effect == "none") {
                duration = 0;
            }
            _hasmask.on("mouseenter",function () {
                var _ts = $(this).find("." + settings.maskCls);
                _ts.stop(true, true);
                _ts.fadeIn(duration);
            }).on("mouseleave", function () {
                    var _ts = $(this).find("." + settings.maskCls);
                    _ts.stop(true, true);
                    _ts.fadeOut(duration);
                });
        }

        function magnifyAct(_tt, settings) {
            var _mag = _tt.find("." + settings.magnifyCls), zi = _mag.css("z-index");
            zi = (zi == "auto") ? 1 : zi;
            _mag.on("mouseenter",function () {
                var _t = $(this), _ts = _t.find("." + settings.bigDemoCls);
                _ts.show();
                _t.css("z-index", zi + 1);
            }).on("mouseleave", function () {
                    var _t = $(this), _ts = _t.find("." + settings.bigDemoCls);
                    _ts.hide();
                    _t.css("z-index", zi);
                });
        }

        function accordionAct(_tt, settings) {
            var _ac = _tt.find("." + settings.triggerCls);
            _ac.on(settings.triggerType, function () {
                var _t = $(this), ti = _ac.index(_t);
                _ac.removeClass(settings.activeTriggerCls);
                _t.addClass(settings.activeTriggerCls);
                _tt.find("." + settings.panelCls).hide().eq(ti).show();
            });
        }
    }
})(jQuery)