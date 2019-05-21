/*  
    author: zhong
    date: 2019.5.5
*/

/*兼容Object.assign*/
if (typeof Object.assign != 'function') {
    Object.assign = function (target) {
        'use strict';
        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        target = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source != null) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    };
}
/*兼容bind*/
(function () {
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== "function") {
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }
            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () { },
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };
            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();
            return fBound;
        };
    }
}());
function BannerSlide(option) {
    this._init(option);
}
BannerSlide.prototype = {
    _init: function (option) {
        /*防止低版本浏览器window.console报错*/
        this.compatibleConsole();
        /*检查必须数据是否传入并且数据格式正确*/
        this.isThisAttr(option);
        /*将数据绑到实例上*/
        this.container = option.container; /*容器*/
        this.imagesSrc = option.imagesSrc; /*图片路径*/
        this.switchEffect = Object.assign(
            {},
            { /*切换效果*/
                slide: true, /*默认轮播*/
                arrow: true, /*默认箭头*/
                radius: true /*默认圆点*/
            },
            option.switchEffect
        );
        this.speed = option.speed ? option.speed : 3000; /*轮播速度*/
        /*加载html布局*/
        this.bannerHtmlLoad();
        /*绑定事件*/
        this.bindEvent();
    },
    /*检查必须数据是否传入并且数据格式正确*/
    isThisAttr: function (option) {
        var msg = !option && '未传入配置对象(new BannerSlide()未传入对象)' || (!option.container || option.container.constructor !== String) && '无目标容器(container属性字符串值未传入)' || (!option.imagesSrc || option.imagesSrc.constructor !== Array) && '无图片路径(imagesSrc属性数组值未传入)' || null;
        if (msg) {
            throw new TypeError(msg + '————BannerSlide.js');
        }
    },
    /*防止低版本浏览器window.console报错*/
    compatibleConsole: function () {
        window.console = window.console || (function () {
            var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile
                = c.clear = c.exception = c.trace = c.assert = function () { };
            return c;
        })();
    },
    /*加载html布局*/
    bannerHtmlLoad: function () {
        var str = '<div class="bannerSlide-container" id="bannerSlide-container">\
                    <div class="bs-images">';
        for (var i = 0 in this.imagesSrc) {
            str += '<img ' + (i == 0 ? "class=' checked'" : "") + ' src="' + this.imagesSrc[i] + '" alt="">';
        }
        str += '</div>';
        if (this.switchEffect.arrow) {
            str += '<div class="bs-scope">\
                                <div class="left-btn"></div>\
                                <div class="right-btn"></div>\
                            </div>';

        }
        if (this.switchEffect.radius) {
            str += '<div class="bs-radius">';
            for (var i = 0 in this.imagesSrc) {
                str += '<span' + (i == 0 ? " class='checked'" : "") + '></span>';
            }
        }
        str += '</div>\
            </div>';
        document.querySelector(this.container).innerHTML = str;
    },
    /*绑定事件*/
    bindEvent: function () {
        this.doms = {},
        /*初始化显示index*/
        this.index = 1;
        /*dom数据绑定到实例*/
        this.doms = Object.assign({}, {
            MaxBox: document.getElementById('bannerSlide-container'),
            images: document.querySelectorAll('#bannerSlide-container .bs-images>img'),
            leftBtn: document.querySelector('#bannerSlide-container .bs-scope .left-btn'),
            rightBtn: document.querySelector('#bannerSlide-container .bs-scope .right-btn'),
            radiusBtn: document.querySelectorAll('#bannerSlide-container .bs-radius>span')
        }, this.doms);
        var _this = this;

        if (this.switchEffect.slide) {
            /*轮播定时器*/
            this.time = setInterval(function () {
                this.slideFun();
            }.bind(this), this.speed);
        }

        if (this.switchEffect.arrow) {
            /*左右箭头*/
            this.doms.leftBtn.onclick = function () {
                return this.clickIndex(-1);
            }.bind(_this);
            this.doms.rightBtn.onclick = function () {
                return this.clickIndex(1);
            }.bind(_this);
        }

        if (this.switchEffect.radius) {
            /*点击圆点*/
            for (var i = 0; i < this.doms.radiusBtn.length; i++) {
                this.doms.radiusBtn[i].onclick = function () {
                    _this.index = 0;
                    _this.clickIndex(_this.prevAllDom(this).length);
                }
            }
        }

    },
    /*定时器函数*/
    slideFun: function () {
        this.render();
        this.index++;
    },
    /*点击左右箭头调用函数*/
    clickIndex: function (num) {
        clearInterval(this.time);
        this.time = null;
        this.index += num;
        this.render();
        this.time = setInterval(function () {
            this.slideFun();
        }.bind(this), this.speed);
    },
    /*渲染显示及index判定*/
    render: function () {
        if (this.index > this.doms.images.length - 1) {
            this.index = 0;
        } else if (this.index < 0) {
            this.index = this.doms.images.length - 1;
        }
        for (var j = 0; j < this.doms.images.length; j++) {
            this.removeClass(this.doms.images[j], 'checked');
            if (this.switchEffect.radius) {
                this.removeClass(this.doms.radiusBtn[j], 'checked');
            }
        }
        if (this.switchEffect.radius) {
            this.addClass(this.doms.radiusBtn[this.index], 'checked');
        }
        this.addClass(this.doms.images[this.index], 'checked');
    },
    addClass: function (ele, cls) {
        if (!this.hasClass(ele, cls)) {
            ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
        }
    },
    removeClass: function (ele, cls) {
        if (this.hasClass(ele, cls)) {
            var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
            while (newClass.indexOf(' ' + cls + ' ') >= 0) {
                newClass = newClass.replace(' ' + cls + ' ', ' ');
            }
            ele.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    },
    hasClass: function (ele, cls) {
        cls = cls || '';
        if (cls.replace(/\s/g, '').length == 0) return false;
        return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ');
    },
    prevAllDom: function (obj) {
        var pe = obj.parentElement;
        var cs = pe.children;
        var arr = [];
        for (var i = 0; i < cs.length; i++) {
            var csi = cs[i];
            if (csi == obj) {
                break;
            }
            arr.push(csi);
        }
        return arr;
    }
};