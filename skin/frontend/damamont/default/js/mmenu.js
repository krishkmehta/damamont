// WARNING! This file contains some subset of JS that is not supported by type inference.
// You can try checking 'Transpile to ES5' checkbox if you want the types to be inferred
/**
 * @license
 mmenu.js

 Copyright (c) Fred Heusschen
 www.frebsite.nl

 License: CC-BY-NC-4.0
 http://creativecommons.org/licenses/by-nc/4.0/
 */
'use strict';
!function(m) {
    function t(i) {
        if (n[i]) {
            return n[i].exports;
        }
        var module = n[i] = {
            i : i,
            l : false,
            exports : {}
        };
        return m[i].call(module.exports, module, module.exports, t), module.l = true, module.exports;
    }
    var n = {};
    t.m = m;
    t.c = n;
    t.d = function(d, name, n) {
        if (!t.o(d, name)) {
            Object.defineProperty(d, name, {
                enumerable : true,
                get : n
            });
        }
    };
    t.r = function(input) {
        if ("undefined" != typeof Symbol && Symbol.toStringTag) {
            Object.defineProperty(input, Symbol.toStringTag, {
                value : "Module"
            });
        }
        Object.defineProperty(input, "__esModule", {
            value : true
        });
    };
    t.t = function(a, b) {
        if (1 & b && (a = t(a)), 8 & b) {
            return a;
        }
        if (4 & b && "object" == typeof a && a && a.__esModule) {
            return a;
        }
        var d = Object.create(null);
        if (t.r(d), Object.defineProperty(d, "default", {
            enumerable : true,
            value : a
        }), 2 & b && "string" != typeof a) {
            var key;
            for (key in a) {
                t.d(d, key, function(howMany) {
                    return a[howMany];
                }.bind(null, key));
            }
        }
        return d;
    };
    t.n = function(module) {
        var n = module && module.__esModule ? function() {
            return module.default;
        } : function() {
            return module;
        };
        return t.d(n, "a", n), n;
    };
    t.o = function(arg, str) {
        return Object.prototype.hasOwnProperty.call(arg, str);
    };
    t.p = "";
    t(t.s = 0);
}([function(canCreateDiscussions, res, networkMonitor) {
    function $(obj, node) {
        if ("object" != typeOf(obj)) {
            obj = {};
        }
        if ("object" != typeOf(node)) {
            node = {};
        }
        for (let i in node) {
            if (node.hasOwnProperty(i)) {
                if (void 0 === obj[i]) {
                    obj[i] = node[i];
                } else {
                    if ("object" == typeOf(obj[i])) {
                        $(obj[i], node[i]);
                    }
                }
            }
        }
        return obj;
    }
    function typeOf(obj) {
        return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }
    function extend(target, a, b) {
        if ("function" == typeof a) {
            var to = a.call(target);
            if (void 0 !== to) {
                return to;
            }
        }
        return null !== a && "function" != typeof a && void 0 !== a || void 0 === b ? a : b;
    }
    function set(el, str, times) {
        var i = false;
        var callback = function(parent) {
            if (!(void 0 !== parent && parent.target !== el)) {
                if (!i) {
                    el.removeEventListener("transitionend", callback);
                    el.removeEventListener("webkitTransitionEnd", callback);
                    str.call(el);
                }
                i = true;
            }
        };
        el.addEventListener("transitionend", callback);
        el.addEventListener("webkitTransitionEnd", callback);
        setTimeout(callback, 1.1 * times);
    }
    function get() {
        return "mm-" + d++;
    }
    function query(target, key) {
        if (void 0 === moduleOptions[key]) {
            moduleOptions[key] = {};
        }
        $(moduleOptions[key], target);
    }
    function add(name) {
        var corner;
        return name.split(".").forEach((e, n) => {
            if (0 == n) {
                corner = document.createElement(e);
            } else {
                corner.classList.add(e);
            }
        }), corner;
    }
    function resolve(o, str) {
        return Array.prototype.slice.call(o.querySelectorAll(str));
    }
    function callback(b, x) {
        var data = Array.prototype.slice.call(b.children);
        return x ? data.filter((domUtils) => {
            return domUtils.matches(x);
        }) : data;
    }
    function _(e, a) {
        var args = [];
        var parent = e.parentElement;
        for (; parent;) {
            args.push(parent);
            parent = parent.parentElement;
        }
        return a ? args.filter((contentSelector) => {
            return contentSelector.matches(a);
        }) : args;
    }
    function expect(keys) {
        return keys.filter((recogs) => {
            return !recogs.matches(".mm-hidden");
        });
    }
    function parse(e) {
        var peaksAtTopTempo = [];
        return expect(e).forEach((e) => {
            peaksAtTopTempo.push(...callback(e, "a.mm-listitem__text"));
        }), peaksAtTopTempo.filter((recogs) => {
            return !recogs.matches(".mm-btn_next");
        });
    }
    function next(obj, type, delay) {
        if (obj.matches("." + type)) {
            obj.classList.remove(type);
            obj.classList.add(delay);
        }
    }
    function map(index, type, callback) {
        if ("number" == typeof index) {
            index = "(min-width: " + index + "px)";
        }
        json[index] = json[index] || [];
        json[index].push({
            yes : type,
            no : callback
        });
    }
    function cb(action, options) {
        var type = options.matches ? "yes" : "no";
        for (let i = 0; i < json[action].length; i++) {
            json[action][i][type]();
        }
    }
    function require(target) {
        return target === window ? localStorage : target.dataset;
    }
    function H(e, x) {
        var n = require(e)[x] || "";
        return n.length ? n.split(",") : [];
    }
    function start(i, c, e) {
        var name = c.split(".")[0];
        var k = K;
        var t = H(i, c);
        t.push("" + k);
        (function(key, type, b) {
            require(key)[type] = b.join(",");
        })(i, c, t);
        obj[k] = e;
        i.addEventListener(name, e);
        K++;
    }
    function normalize(el, name) {
        var animationEventName = name.split(".")[0];
        H(el, name).forEach((k) => {
            el.removeEventListener(animationEventName, obj[k]);
            delete obj[k];
        });
        delete require(el)[name];
    }
    networkMonitor.r(res);
    var params = {
        hooks : {},
        extensions : [],
        wrappers : [],
        navbar : {
            add : true,
            title : "Menu",
            titleLink : "parent"
        },
        onClick : {
            close : true,
            preventDefault : null,
            setSelected : true
        },
        slidingSubmenus : true
    };
    var options = {
        classNames : {
            inset : "Inset",
            nolistview : "NoListview",
            nopanel : "NoPanel",
            panel : "Panel",
            selected : "Selected",
            spacer : "Spacer",
            vertical : "Vertical"
        },
        clone : false,
        language : null,
        openingInterval : 25,
        panelNodetype : ["ul", "ol"],
        transitionDuration : 400
    };
    var d = 0;
    var moduleOptions = {};
    var inner = {
        Menu : "\u0645\u0646\u0648"
    };
    var deleteFromCurrentValuesForDomain = {
        Menu : "Men\u00fc"
    };
    var testDiv = {
        Menu : "\u041c\u0435\u043d\u044e"
    };
    var json = {};
    query({
        Menu : "Menu"
    }, "nl");
    query(inner, "fa");
    query(deleteFromCurrentValuesForDomain, "de");
    query(testDiv, "ru");
    class self {
        constructor(value, test, arr) {
            return this.opts = $(test, self.options), this.conf = $(arr, self.configs), this._api = ["bind", "initPanels", "openPanel", "closePanel", "closeAllPanels", "setSelected"], this.node = {}, this.vars = {}, this.hook = {}, this.clck = [], this.node.menu = "string" == typeof value ? document.querySelector(value) : value, "function" == typeof this._deprecatedWarnings && this._deprecatedWarnings(), this._initWrappers(), this._initAddons(), this._initExtensions(), this._initHooks(), this._initAPI(),
                this._initMenu(), this._initPanels(), this._initOpened(), this._initAnchors(), function() {
                for (let query in json) {
                    let script = window.matchMedia(query);
                    cb(query, script);
                    script.onchange = (inDisplayValue) => {
                        cb(query, script);
                    };
                }
            }(), this;
        }
        openPanel(e, width) {
            if (this.trigger("openPanel:before", [e]), e && (e.matches(".mm-panel") || (e = e.closest(".mm-panel")), e)) {
                if ("boolean" != typeof width && (width = true), e.parentElement.matches(".mm-listitem_vertical")) {
                    _(e, ".mm-listitem_vertical").forEach((t) => {
                        e.classList.add("mm-listitem_opened");
                        callback(t, ".mm-panel").forEach((focusedObj) => {
                            focusedObj.classList.remove("mm-hidden");
                        });
                    });
                    let panels = _(e, ".mm-panel").filter((instance) => {
                        return !instance.parentElement.matches(".mm-listitem_vertical");
                    });
                    this.trigger("openPanel:start", [e]);
                    if (panels.length) {
                        this.openPanel(panels[0]);
                    }
                    this.trigger("openPanel:finish", [e]);
                } else {
                    if (e.matches(".mm-panel_opened")) {
                        return;
                    }
                    let contatos = callback(this.node.pnls, ".mm-panel");
                    let track = callback(this.node.pnls, ".mm-panel_opened")[0];
                    contatos.filter((i) => {
                        return i !== e;
                    }).forEach((focusedObj) => {
                        focusedObj.classList.remove("mm-panel_opened-parent");
                    });
                    let element = e.mmParent;
                    for (; element;) {
                        if (element = element.closest(".mm-panel")) {
                            if (!element.parentElement.matches(".mm-listitem_vertical")) {
                                element.classList.add("mm-panel_opened-parent");
                            }
                            element = element.mmParent;
                        }
                    }
                    contatos.forEach((focusedObj) => {
                        focusedObj.classList.remove("mm-panel_highest");
                    });
                    contatos.filter((type) => {
                        return type !== track;
                    }).filter((i) => {
                        return i !== e;
                    }).forEach((e) => {
                        e.classList.add("mm-hidden");
                    });
                    e.classList.remove("mm-hidden");
                    let animate = () => {
                        if (track) {
                            track.classList.remove("mm-panel_opened");
                        }
                        e.classList.add("mm-panel_opened");
                        if (e.matches(".mm-panel_opened-parent")) {
                            if (track) {
                                track.classList.add("mm-panel_highest");
                            }
                            e.classList.remove("mm-panel_opened-parent");
                        } else {
                            if (track) {
                                track.classList.add("mm-panel_opened-parent");
                            }
                            e.classList.add("mm-panel_highest");
                        }
                        this.trigger("openPanel:start", [e]);
                    };
                    let click = () => {
                        if (track) {
                            track.classList.remove("mm-panel_highest");
                            track.classList.add("mm-hidden");
                        }
                        e.classList.remove("mm-panel_highest");
                        this.trigger("openPanel:finish", [e]);
                    };
                    if (width && !e.matches(".mm-panel_noanimation")) {
                        setTimeout(() => {
                            set(e, () => {
                                click();
                            }, this.conf.transitionDuration);
                            animate();
                        }, this.conf.openingInterval);
                    } else {
                        animate();
                        click();
                    }
                }
                this.trigger("openPanel:after", [e]);
            }
        }
        closePanel(options) {
            this.trigger("closePanel:before", [options]);
            var pre = options.parentElement;
            if (pre.matches(".mm-listitem_vertical")) {
                pre.classList.remove("mm-listitem_opened");
                options.classList.add("mm-hidden");
                this.trigger("closePanel", [options]);
            }
            this.trigger("closePanel:after", [options]);
        }
        closeAllPanels(ownerCount) {
            this.trigger("closeAllPanels:before");
            this.node.pnls.querySelectorAll(".mm-listitem").forEach((focusedObj) => {
                focusedObj.classList.remove("mm-listitem_selected", "mm-listitem_opened");
            });
            var value = callback(this.node.pnls, ".mm-panel");
            var owner_count = ownerCount || value[0];
            callback(this.node.pnls, ".mm-panel").forEach((o) => {
                if (o !== owner_count) {
                    o.classList.remove("mm-panel_opened");
                    o.classList.remove("mm-panel_opened-parent");
                    o.classList.remove("mm-panel_highest");
                    o.classList.add("mm-hidden");
                }
            });
            this.openPanel(owner_count, false);
            this.trigger("closeAllPanels:after");
        }
        togglePanel(e) {
            let rec_certD = e.parentElement;
            if (rec_certD.matches(".mm-listitem_vertical")) {
                this[rec_certD.matches(".mm-listitem_opened") ? "closePanel" : "openPanel"](e);
            }
        }
        setSelected(option) {
            this.trigger("setSelected:before", [option]);
            resolve(this.node.menu, ".mm-listitem_selected").forEach((focusedObj) => {
                focusedObj.classList.remove("mm-listitem_selected");
            });
            option.classList.add("mm-listitem_selected");
            this.trigger("setSelected:after", [option]);
        }
        bind(test, arr) {
            this.hook[test] = this.hook[test] || [];
            this.hook[test].push(arr);
        }
        trigger(name, data) {
            if (this.hook[name]) {
                var n = 0;
                var numberOfFrustums = this.hook[name].length;
                for (; n < numberOfFrustums; n++) {
                    this.hook[name][n].apply(this, data);
                }
            }
        }
        _initAPI() {
            var w = this;
            this.API = {};
            this._api.forEach((method) => {
                this.API[method] = function() {
                    var val = w[method].apply(w, arguments);
                    return void 0 === val ? w.API : val;
                };
            });
            this.node.menu.mmenu = this.API;
        }
        _initHooks() {
            for (let key in this.opts.hooks) {
                this.bind(key, this.opts.hooks[key]);
            }
        }
        _initWrappers() {
            this.trigger("initWrappers:before");
            for (let i = 0; i < this.opts.wrappers.length; i++) {
                self.wrappers[this.opts.wrappers[i]].call(this);
            }
            this.trigger("initWrappers:after");
        }
        _initAddons() {
            this.trigger("initAddons:before");
            for (let key in self.addons) {
                self.addons[key].call(this);
            }
            this.trigger("initAddons:after");
        }
        _initExtensions() {
            this.trigger("initExtensions:before");
            if ("array" == typeOf(this.opts.extensions)) {
                this.opts.extensions = {
                    all : this.opts.extensions
                };
            }
            for (let i in this.opts.extensions) {
                if (this.opts.extensions[i].length) {
                    let args = this.opts.extensions[i].map((canCreateDiscussions) => {
                        return "mm-menu_" + canCreateDiscussions;
                    });
                    map(i, () => {
                        this.node.menu.classList.add(...args);
                    }, () => {
                        this.node.menu.classList.remove(...args);
                    });
                }
            }
            this.trigger("initExtensions:after");
        }
        _initMenu() {
            this.trigger("initMenu:before");
            this.node.menu.parentElement.classList.add("mm-wrapper");
            this.node.menu.id = this.node.menu.id || get();
            this.vars.orgMenuId = this.node.menu.id;
            if (this.conf.clone) {
                this.node.orig = this.node.menu;
                this.node.menu = this.node.orig.cloneNode(true);
                this.node.menu.id = "mm-" + this.node.menu.id;
                resolve(this.node.menu, "[id]").forEach((timeline_mode) => {
                    timeline_mode.id = "mm-" + timeline_mode.id;
                });
            }
            let message = add("div.mm-panels");
            callback(this.node.menu).forEach((t) => {
                if (this.conf.panelNodetype.indexOf(t.nodeName.toLowerCase()) > -1) {
                    message.append(t);
                }
            });
            this.node.menu.append(message);
            this.node.pnls = message;
            this.node.menu.classList.add("mm-menu");
            this.trigger("initMenu:after");
        }
        _initPanels(validator) {
            this.clck.push((e, canCreateDiscussions) => {
                if (canCreateDiscussions.inMenu) {
                    var y = e.getAttribute("href");
                    if (y && y.length > 1 && "#" == y.slice(0, 1)) {
                        try {
                            let panelName = resolve(this.node.menu, y)[0];
                            if (panelName && panelName.matches(".mm-panel")) {
                                return e.parentElement.matches(".mm-listitem_vertical") ? this.togglePanel(panelName) : this.openPanel(panelName), true;
                            }
                        } catch (e) {
                        }
                    }
                }
            });
            this.initPanels(validator);
        }
        initPanels(event) {
            this.trigger("initPanels:before", [event]);
            var i = this.conf.panelNodetype.join(", ");
            var a = [];
            event = event || callback(this.node.pnls, i);
            const subscribe = (events) => {
                events.filter((completions) => {
                    return completions.matches(i);
                }).forEach((e) => {
                    if (e = this._initPanel(e)) {
                        this._initNavbar(e);
                        this._initListview(e);
                        a.push(e);
                        var parent = [];
                        parent.push(...callback(e, "." + this.conf.classNames.panel));
                        callback(e, ".mm-listview").forEach((e) => {
                            callback(e, ".mm-listitem").forEach((e) => {
                                parent.push(...callback(e, i));
                            });
                        });
                        if (parent.length) {
                            subscribe(parent);
                        }
                    }
                });
            };
            subscribe(event);
            this.trigger("initPanels:after", [a]);
        }
        _initPanel(e) {
            if (this.trigger("initPanel:before", [e]), e.matches(".mm-panel")) {
                return e;
            }
            if (next(e, this.conf.classNames.panel, "mm-panel"), next(e, this.conf.classNames.nopanel, "mm-nopanel"), next(e, this.conf.classNames.inset, "mm-listview_inset"), e.matches(".mm-listview_inset") && e.classList.add("mm-nopanel"), e.matches(".mm-nopanel")) {
                return null;
            }
            var t = e.id || get();
            var and = e.matches("." + this.conf.classNames.vertical) || !this.opts.slidingSubmenus;
            if (e.classList.remove(this.conf.classNames.vertical), e.matches("ul, ol")) {
                e.removeAttribute("id");
                let parent = add("div");
                e.before(parent);
                parent.append(e);
                e = parent;
            }
            e.id = t;
            e.classList.add("mm-panel", "mm-hidden");
            var a = [e.parentElement].filter(($content) => {
                return $content.matches("li");
            })[0];
            return and ? a && a.classList.add("mm-listitem_vertical") : this.node.pnls.append(e), a && (a.mmChild = e, e.mmParent = a), this.trigger("initPanel:after", [e]), e;
        }
        _initNavbar(item) {
            if (this.trigger("initNavbar:before", [item]), callback(item, ".mm-navbar").length) {
                return;
            }
            var r = item.mmParent;
            var tr = add("div.mm-navbar");
            var i = this._getPanelTitle(item, this.opts.navbar.title);
            var url = "";
            console.log(item);
            if (r) {
                if (r.matches(".mm-listitem_vertical")) {
                    return;
                }
                let data;
                let params = (data = r.matches(".mm-listitem") ? callback(r, ".mm-listitem__text")[0] : resolve(data = item.closest(".mm-panel"), 'a[href="#' + item.id + '"]')[0]).closest(".mm-panel").id;
                switch(i = this._getPanelTitle(item, data.textContent), this.opts.navbar.titleLink) {
                    case "anchor":
                        url = data.getAttribute("href");
                        break;
                    case "parent":
                        url = "#" + params;
                }
                let t = add("a.mm-btn.mm-btn_prev.mm-navbar__btn");
                t.setAttribute("href", "#" + params);
                tr.append(t);
            } else {
                if (!this.opts.navbar.title) {
                    return;
                }
            }
            if (!this.opts.navbar.add) {
                callback(item, ".mm-navbar")[0].classList.add("mm-hidden");
            }
            let a = add("a.mm-navbar__title");
            if (a.innerHTML = i, url && a.setAttribute("href", url), tr.append(a), r) {
                let td_link = add("span.mm-btn.mm-navbar__btn");
                tr.append(td_link);
            }
            item.prepend(tr);
            this.trigger("initNavbar:after", [item]);
        }
        _initListview(a) {
            this.trigger("initListview:before", [a]);
            callback(a, "ul, ol").forEach((e) => {
                next(e, this.conf.classNames.nolistview, "mm-nolistview");
                if (!e.matches(".mm-nolistview")) {
                    e.classList.add("mm-listview");
                    callback(e).forEach((e) => {
                        e.classList.add("mm-listitem");
                        next(e, this.conf.classNames.selected, "mm-listitem_selected");
                        next(e, this.conf.classNames.spacer, "mm-listitem_spacer");
                        callback(e, "a, span").forEach((pseudo) => {
                            if (!pseudo.matches(".mm-btn")) {
                                pseudo.classList.add("mm-listitem__text");
                            }
                        });
                    });
                }
            });
            var t = a.mmParent;
            if (t && t.matches(".mm-listitem") && !callback(t, ".mm-btn").length) {
                let node = callback(t, "a, span")[0];
                if (node) {
                    let n = add("a.mm-btn.mm-btn_next.mm-listitem__btn");
                    n.setAttribute("href", "#" + a.id);
                    node.parentElement.insertBefore(n, node.nextSibling);
                    if (node.matches("span")) {
                        n.classList.add("mm-listitem__text");
                        n.innerHTML = node.innerHTML;
                        node.remove();
                    }
                }
            }
            this.trigger("initListview:after", [a]);
        }
        _initOpened() {
            this.trigger("initOpened:before");
            let pipelets = this.node.pnls.querySelectorAll(".mm-listitem_selected");
            let t = null;
            pipelets.forEach((sat) => {
                t = sat;
                sat.classList.remove("mm-listitem_selected");
            });
            if (t) {
                t.classList.add("mm-listitem_selected");
            }
            let nextPanel = t ? t.closest(".mm-panel") : callback(this.node.pnls, ".mm-panel")[0];
            this.openPanel(nextPanel, false);
            this.trigger("initOpened:after");
        }
        _initAnchors() {
            this.trigger("initAnchors:before");
            document.addEventListener("click", (binding) => {
                var obj = binding.target;
                if (obj.matches("a[href]") || (obj = obj.closest("a[href]"))) {
                    var slot = {
                        inMenu : obj.closest(".mm-menu") === this.node.menu,
                        inListview : obj.matches(".mm-listitem > a"),
                        toExternal : obj.matches('[rel="external"]') || obj.matches('[target="_blank"]')
                    };
                    var data = {
                        close : null,
                        setSelected : null,
                        preventDefault : "#" == obj.getAttribute("href").slice(0, 1)
                    };
                    for (let i = 0; i < this.clck.length; i++) {
                        let val = this.clck[i].call(this, obj, slot);
                        if (val) {
                            if ("boolean" == typeof val) {
                                return void binding.preventDefault();
                            }
                            if ("object" == typeOf(val)) {
                                data = $(val, data);
                            }
                        }
                    }
                    if (slot.inMenu && slot.inListview && !slot.toExternal) {
                        if (extend(obj, this.opts.onClick.setSelected, data.setSelected)) {
                            this.setSelected(obj.parentElement);
                        }
                        if (extend(obj, this.opts.onClick.preventDefault, data.preventDefault)) {
                            binding.preventDefault();
                        }
                        if (extend(obj, this.opts.onClick.close, data.close) && this.opts.offCanvas && "function" == typeof this.close) {
                            this.close();
                        }
                    }
                }
            }, true);
            this.trigger("initAnchors:after");
        }
        i18n($rootScope) {
            return function(name, key) {
                return "string" == typeof key && void 0 !== moduleOptions[key] && moduleOptions[key][name] || name;
            }($rootScope, this.conf.language);
        }
        _getPanelTitle(test, message) {
            var values;
            return "function" == typeof this.opts.navbar.title && (values = this.opts.navbar.title.call(test)), void 0 === values && (values = test.getAttribute("mm-data-title")), "string" == typeof values && values.length ? values : "string" == typeof message ? this.i18n(message) : "function" == typeof message ? this.i18n(message.call(test)) : "string" == typeof self.options.navbar.title ? this.i18n(self.options.navbar.title) : this.i18n("Menu");
        }
    }
    self.version = "8.0.6";
    self.options = params;
    self.configs = options;
    self.addons = {};
    self.wrappers = {};
    self.node = {};
    var newValue = {
        blockUI : true,
        moveBackground : true
    };
    var state = {
        menu : {
            insertMethod : "prepend",
            insertSelector : "body"
        },
        page : {
            nodetype : "div",
            selector : null,
            noSelector : []
        }
    };
    const obj = {};
    var localStorage = {};
    var K = 1;
    self.options.offCanvas = newValue;
    self.configs.offCanvas = state;
    self.prototype.open = function() {
        this.trigger("open:before");
        if (!this.vars.opened) {
            this._openSetup();
            setTimeout(() => {
                this._openStart();
            }, this.conf.openingInterval);
            this.trigger("open:after");
        }
    };
    self.prototype._openSetup = function() {
        var options = this.opts.offCanvas;
        this.closeAllOthers();
        self.node.page.mmStyle = self.node.page.getAttribute("style") || "";
        (function(i, context, data) {
            H(i, context).forEach((key) => {
                obj[key](data || {});
            });
        })(window, "resize.page", {
            force : true
        });
        var additionArgs = ["mm-wrapper_opened"];
        if (options.blockUI) {
            additionArgs.push("mm-wrapper_blocking");
        }
        if ("modal" == options.blockUI) {
            additionArgs.push("mm-wrapper_modal");
        }
        if (options.moveBackground) {
            additionArgs.push("mm-wrapper_background");
        }
        document.querySelector("html").classList.add(...additionArgs);
        setTimeout(() => {
            this.vars.opened = true;
        }, this.conf.openingInterval);
        this.node.menu.classList.add("mm-menu_opened");
    };
    self.prototype._openStart = function() {
        set(self.node.page, () => {
            this.trigger("open:finish");
        }, this.conf.transitionDuration);
        this.trigger("open:start");
        document.documentElement.classList.add("mm-wrapper_opening");
    };
    self.prototype.close = function() {
        this.trigger("close:before");
        if (this.vars.opened) {
            set(self.node.page, () => {
                this.node.menu.classList.remove("mm-menu_opened");
                document.querySelector("html").classList.remove("mm-wrapper_opened", "mm-wrapper_blocking", "mm-wrapper_modal", "mm-wrapper_background");
                self.node.page.setAttribute("style", self.node.page.mmStyle);
                this.vars.opened = false;
                this.trigger("close:finish");
            }, this.conf.transitionDuration);
            this.trigger("close:start");
            document.documentElement.classList.remove("mm-wrapper_opening");
            this.trigger("close:after");
        }
    };
    self.prototype.closeAllOthers = function() {
        resolve(document.body, ".mm-menu_offcanvas").forEach((aMenu) => {
            if (aMenu !== this.node.menu) {
                let transport = aMenu.mmenu;
                if (transport && transport.close) {
                    transport.close();
                }
            }
        });
    };
    self.prototype.setPage = function(name) {
        this.trigger("setPage:before", [name]);
        var context = this.conf.offCanvas;
        if (!name) {
            let ret = "string" == typeof context.page.selector ? resolve(document.body, context.page.selector) : callback(document.body, context.page.nodetype);
            if (ret = ret.filter((recogs) => {
                return !recogs.matches(".mm-menu, .mm-wrapper__blocker");
            }), context.page.noSelector.length && (ret = ret.filter((recogs) => {
                return !recogs.matches(context.page.noSelector.join(", "));
            })), ret.length > 1) {
                let e = add("div");
                ret[0].before(e);
                ret.forEach((t) => {
                    e.append(t);
                });
                ret = [e];
            }
            name = ret[0];
        }
        name.classList.add("mm-page", "mm-slideout");
        name.id = name.id || get();
        self.node.page = name;
        this.trigger("setPage:after", [name]);
    };
    const update = function() {
        normalize(document.body, "keydown.tabguard");
        start(document.body, "keydown.tabguard", (event) => {
            if (document.documentElement.matches(".mm-wrapper_opened") && 9 == event.keyCode) {
                event.preventDefault();
            }
        });
        normalize(window, "resize.page");
        start(window, "resize.page", (thrust) => {
            if (self.node.page && (document.documentElement.matches(".mm-wrapper_opening") || thrust.force)) {
                self.node.page.style.minHeight = window.innerHeight + "px";
            }
        });
    };
    const initialize = function() {
        this.trigger("initBlocker:before");
        var options = this.opts.offCanvas;
        var context = this.conf.offCanvas;
        if (options.blockUI) {
            if (!self.node.blck) {
                let e = add("div.mm-wrapper__blocker.mm-slideout");
                e.innerHTML = "<a></a>";
                document.querySelector(context.menu.insertSelector).append(e);
                self.node.blck = e;
            }
            var onclick = (event) => {
                event.preventDefault();
                event.stopPropagation();
                if (!document.documentElement.matches(".mm-wrapper_modal")) {
                    this.close();
                }
            };
            self.node.blck.addEventListener("mousedown", onclick);
            self.node.blck.addEventListener("touchstart", onclick);
            self.node.blck.addEventListener("touchmove", onclick);
            this.trigger("initBlocker:after");
        }
    };
    var rendering = {
        aria : true,
        text : true
    };
    var constNameMap = {
        text : {
            closeMenu : "Close menu",
            closeSubmenu : "Close submenu",
            openSubmenu : "Open submenu",
            toggleSubmenu : "Toggle submenu"
        }
    };
    var insertIntoCurrentValues = {
        "Close menu" : "\u0628\u0633\u062a\u0646 \u0645\u0646\u0648",
        "Close submenu" : "\u0628\u0633\u062a\u0646 \u0632\u06cc\u0631\u0645\u0646\u0648",
        "Open submenu" : "\u0628\u0627\u0632\u06a9\u0631\u062f\u0646 \u0632\u06cc\u0631\u0645\u0646\u0648",
        "Toggle submenu" : "\u0633\u0648\u06cc\u06cc\u0686 \u0632\u06cc\u0631\u0645\u0646\u0648"
    };
    var outer = {
        "Close menu" : "Men\u00fc schlie\u00dfen",
        "Close submenu" : "Untermen\u00fc schlie\u00dfen",
        "Open submenu" : "Untermen\u00fc \u00f6ffnen",
        "Toggle submenu" : "Untermen\u00fc wechseln"
    };
    var deleteFromCurrentValues = {
        "Close menu" : "\u0417\u0430\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e",
        "Close submenu" : "\u0417\u0430\u043a\u0440\u044b\u0442\u044c \u043f\u043e\u0434\u043c\u0435\u043d\u044e",
        "Open submenu" : "\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u043f\u043e\u0434\u043c\u0435\u043d\u044e",
        "Toggle submenu" : "\u041f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u043f\u043e\u0434\u043c\u0435\u043d\u044e"
    };
    query({
        "Close menu" : "Menu sluiten",
        "Close submenu" : "Submenu sluiten",
        "Open submenu" : "Submenu openen",
        "Toggle submenu" : "Submenu wisselen"
    }, "nl");
    query(insertIntoCurrentValues, "fa");
    query(outer, "de");
    query(deleteFromCurrentValues, "ru");
    self.options.screenReader = rendering;
    self.configs.screenReader = constNameMap;
    var log;
    log = function(o, value, name) {
        o[value] = name;
        if (name) {
            o.setAttribute(value, name.toString());
        } else {
            o.removeAttribute(value);
        }
    };
    self.sr_aria = function(obj, name, x) {
        log(obj, "aria-" + name, x);
    };
    self.sr_role = function(e, type) {
        log(e, "role", type);
    };
    self.sr_text = function(aNetChannelMessage) {
        return '<span class="mm-sronly">' + aNetChannelMessage + "</span>";
    };
    var sections = {
        fix : true
    };
    const hide = "ontouchstart" in window || !!navigator.msMaxTouchPoints || false;
    self.options.scrollBugFix = sections;
    var autoHeight = {
        height : "default"
    };
    self.options.autoHeight = autoHeight;
    var stash = {
        close : false,
        open : false
    };
    self.options.backButton = stash;
    var ret = {
        add : false,
        visible : {
            min : 1,
            max : 3
        }
    };
    self.options.columns = ret;
    var counters = {
        add : false,
        addTo : "panels",
        count : false
    };
    self.options.counters = counters;
    self.configs.classNames.counters = {
        counter : "Counter"
    };
    var suite = {
        add : false,
        addTo : "panels",
        type : null
    };
    self.options.dividers = suite;
    self.configs.classNames.divider = "Divider";
    var newObj = {
        menu : {
            open : false,
            node : null,
            maxStartPos : 100,
            threshold : 50
        },
        panels : {
            close : false
        },
        vendors : {
            hammer : {}
        }
    };
    var Drag = {
        menu : {
            width : {
                perc : .8,
                min : 140,
                max : 440
            },
            height : {
                perc : .8,
                min : 140,
                max : 880
            }
        }
    };
    self.options.drag = newObj;
    self.configs.drag = Drag;
    var defaultOptions = {
        drop : false,
        fitViewport : true,
        event : "click",
        position : {},
        tip : true
    };
    var result = {
        offset : {
            button : {
                x : -5,
                y : 5
            },
            viewport : {
                x : 20,
                y : 20
            }
        },
        height : {
            max : 880
        },
        width : {
            max : 440
        }
    };
    self.options.dropdown = defaultOptions;
    self.configs.dropdown = result;
    var support = {
        fixed : {
            insertMethod : "append",
            insertSelector : "body"
        },
        sticky : {
            offset : 0
        }
    };
    self.configs.fixedElements = support;
    self.configs.classNames.fixedElements = {
        fixed : "Fixed",
        sticky : "Sticky"
    };
    var defaults = {
        use : false,
        top : [],
        bottom : [],
        position : "left",
        type : "default"
    };
    self.options.iconbar = defaults;
    var fields = {
        add : false,
        blockPanel : true,
        hideDivider : false,
        hideNavbar : true,
        visible : 3
    };
    self.options.iconPanels = fields;
    var panZoomFunctions = {
        enable : false,
        enhance : false
    };
    self.options.keyboardNavigation = panZoomFunctions;
    const run = function(endlabel) {
        normalize(document.body, "keydown.tabguard");
        normalize(document.body, "focusin.tabguard");
        start(document.body, "focusin.tabguard", (mutationEvent) => {
            if (document.documentElement.matches(".mm-wrapper_opened")) {
                let node = mutationEvent.target;
                if (node.matches(".mm-tabend")) {
                    let e;
                    if (node.parentElement.matches(".mm-menu") && self.node.blck) {
                        e = self.node.blck;
                    }
                    if (node.parentElement.matches(".mm-wrapper__blocker")) {
                        e = resolve(document.body, ".mm-menu_offcanvas.mm-menu_opened")[0];
                    }
                    if (!e) {
                        e = node.parentElement;
                    }
                    if (e) {
                        callback(e, ".mm-tabstart")[0].focus();
                    }
                }
            }
        });
        normalize(document.body, "keydown.navigate");
        start(document.body, "keydown.navigate", (event) => {
            var element = event.target;
            var tp = element.closest(".mm-menu");
            if (tp) {
                tp.mmenu;
                if (!element.matches("input, textarea")) {
                    switch(event.keyCode) {
                        case 13:
                            if (element.matches(".mm-toggle") || element.matches(".mm-check")) {
                                element.dispatchEvent(new Event("click"));
                            }
                            break;
                        case 32:
                        case 37:
                        case 38:
                        case 39:
                        case 40:
                            event.preventDefault();
                    }
                }
                if (endlabel) {
                    if (element.matches("input")) {
                        switch(event.keyCode) {
                            case 27:
                                element.value = "";
                        }
                    } else {
                        let $scope = tp.mmenu;
                        switch(event.keyCode) {
                            case 8:
                                let jField = resolve(tp, ".mm-panel_opened")[0].mmParent;
                                if (jField) {
                                    $scope.openPanel(jField.closest(".mm-panel"));
                                }
                                break;
                            case 27:
                                if (tp.matches(".mm-menu_offcanvas")) {
                                    $scope.close();
                                }
                        }
                    }
                }
            }
        });
    };
    var mockGoogleMaps = {
        load : false
    };
    self.options.lazySubmenus = mockGoogleMaps;
    var re = [];
    var data = {
        breadcrumbs : {
            separator : "/",
            removeFirst : false
        }
    };
    self.options.navbars = re;
    self.configs.navbars = data;
    self.configs.classNames.navbars = {
        panelNext : "Next",
        panelPrev : "Prev",
        panelTitle : "Title"
    };
    const cased = {
        breadcrumbs : function(value) {
            var obj = add("span.mm-navbar__breadcrumbs");
            value.append(obj);
            this.bind("initNavbar:after", (e) => {
                if (!e.querySelector(".mm-navbar__breadcrumbs")) {
                    callback(e, ".mm-navbar")[0].classList.add("mm-hidden");
                    var bits = [];
                    var tr = add("span.mm-navbar__breadcrumbs");
                    var obj = e;
                    var s = true;
                    for (; obj;) {
                        if (obj.matches(".mm-panel") || (obj = obj.closest(".mm-panel")), !obj.parentElement.matches(".mm-listitem_vertical")) {
                            var chatStatus = resolve(obj, ".mm-navbar__title")[0].textContent;
                            if (chatStatus.length) {
                                bits.unshift(s ? "<span>" + chatStatus + "</span>" : '<a href="#' + obj.id + '">' + chatStatus + "</a>");
                            }
                            s = false;
                        }
                        obj = obj.mmParent;
                    }
                    if (this.conf.navbars.breadcrumbs.removeFirst) {
                        bits.shift();
                    }
                    tr.innerHTML = bits.join('<span class="mm-separator">' + this.conf.navbars.breadcrumbs.separator + "</span>");
                    callback(e, ".mm-navbar")[0].append(tr);
                }
            });
            this.bind("openPanel:start", (fieldsetLabel) => {
                var user_info = fieldsetLabel.querySelector(".mm-navbar__breadcrumbs");
                if (user_info) {
                    obj.innerHTML = user_info.innerHTML;
                }
            });
            this.bind("initNavbar:after:sr-aria", (e) => {
                resolve(e, ".mm-breadcrumbs a").forEach((e) => {
                    self.sr_aria(e, "owns", e.getAttribute("href").slice(1));
                });
            });
        },
        close : function(context) {
            var t = add("a.mm-btn.mm-btn_close.mm-navbar__btn");
            context.append(t);
            this.bind("setPage:after", (domvalue) => {
                t.setAttribute("href", "#" + domvalue.id);
            });
            this.bind("setPage:after:sr-text", () => {
                t.innerHTML = self.sr_text(this.i18n(this.conf.screenReader.text.closeMenu));
                self.sr_aria(t, "owns", t.getAttribute("href").slice(1));
            });
        },
        next : function(wrap) {
            var element;
            var id;
            var name;
            var el = add("a.mm-btn.mm-btn_next.mm-navbar__btn");
            wrap.append(el);
            this.bind("openPanel:start", (fieldsetLabel) => {
                element = fieldsetLabel.querySelector("." + this.conf.classNames.navbars.panelNext);
                id = element ? element.getAttribute("href") : "";
                name = element ? element.innerHTML : "";
                if (id) {
                    el.setAttribute("href", id);
                } else {
                    el.removeAttribute("href");
                }
                el.classList[id || name ? "remove" : "add"]("mm-hidden");
                el.innerHTML = name;
            });
            this.bind("openPanel:start:sr-aria", (canCreateDiscussions) => {
                self.sr_aria(el, "hidden", el.matches("mm-hidden"));
                self.sr_aria(el, "owns", (el.getAttribute("href") || "").slice(1));
            });
        },
        prev : function(selector) {
            var element;
            var id;
            var name;
            var el = add("a.mm-btn.mm-btn_prev.mm-navbar__btn");
            selector.append(el);
            this.bind("initNavbar:after", (e) => {
                callback(e, ".mm-navbar")[0].classList.add("mm-hidden");
            });
            this.bind("openPanel:start", (instance) => {
                if (!instance.parentElement.matches(".mm-listitem_vertical")) {
                    if (!(element = instance.querySelector("." + this.conf.classNames.navbars.panelPrev))) {
                        element = instance.querySelector(".mm-navbar__btn.mm-btn_prev");
                    }
                    id = element ? element.getAttribute("href") : "";
                    name = element ? element.innerHTML : "";
                    if (id) {
                        el.setAttribute("href", id);
                    } else {
                        el.removeAttribute("href");
                    }
                    el.classList[id || name ? "remove" : "add"]("mm-hidden");
                    el.innerHTML = name;
                }
            });
            this.bind("initNavbar:after:sr-aria", (fieldsetLabel) => {
                self.sr_aria(fieldsetLabel.querySelector(".mm-navbar"), "hidden", true);
            });
            this.bind("openPanel:start:sr-aria", (canCreateDiscussions) => {
                self.sr_aria(el, "hidden", el.matches(".mm-hidden"));
                self.sr_aria(el, "owns", (el.getAttribute("href") || "").slice(1));
            });
        },
        searchfield : function(canCreateDiscussions) {
            if ("object" != typeOf(this.opts.searchfield)) {
                this.opts.searchfield = {};
            }
            this.opts.searchfield.add = true;
            this.opts.searchfield.addTo = [canCreateDiscussions];
        },
        title : function(options) {
            var id;
            var name;
            var element;
            var interestingPoint;
            var cell = add("a.mm-navbar__title");
            options.append(cell);
            this.bind("openPanel:start", (instance) => {
                if (!instance.parentElement.matches(".mm-listitem_vertical")) {
                    if (!(element = instance.querySelector("." + this.conf.classNames.navbars.panelTitle))) {
                        element = instance.querySelector(".mm-navbar__title");
                    }
                    if (id = element ? element.getAttribute("href") : "") {
                        cell.setAttribute("href", id);
                    } else {
                        cell.removeAttribute("href");
                    }
                    name = element ? element.innerHTML : "";
                    cell.innerHTML = name;
                    cell.classList[id || name ? "remove" : "add"]("mm-hidden");
                }
            });
            this.bind("openPanel:start:sr-aria", (canCreateDiscussions) => {
                if (this.opts.screenReader.text && (interestingPoint || callback(this.node.menu, ".mm-navbars_top, .mm-navbars_bottom").forEach((fieldsetLabel) => {
                    let viewportCenter = fieldsetLabel.querySelector(".mm-btn_prev");
                    if (viewportCenter) {
                        interestingPoint = viewportCenter;
                    }
                }), interestingPoint)) {
                    var t = true;
                    if ("parent" == this.opts.navbar.titleLink) {
                        t = !interestingPoint.matches(".mm-hidden");
                    }
                    self.sr_aria(cell, "hidden", t);
                }
            });
        }
    };
    const eventsToMods = {
        tabs : function(e) {
            e.classList.add("mm-navbar_tabs");
            e.parentElement.classList.add("mm-navbars_has-tabs");
            var r = callback(e, "a");
            e.addEventListener("click", (event) => {
                var t = event.target;
                if (t.matches("a")) {
                    if (t.matches(".mm-navbar__tab_selected")) {
                        event.stopImmediatePropagation();
                    } else {
                        try {
                            this.openPanel(this.node.menu.querySelector(t.getAttribute("href")), false);
                            event.stopImmediatePropagation();
                        } catch (e) {
                        }
                    }
                }
            });
            this.bind("openPanel:start", function init($this) {
                r.forEach((focusedObj) => {
                    focusedObj.classList.remove("mm-navbar__tab_selected");
                });
                var dayEle = r.filter((recogs) => {
                    return recogs.matches('[href="#' + $this.id + '"]');
                })[0];
                if (dayEle) {
                    dayEle.classList.add("mm-navbar__tab_selected");
                } else {
                    var currentitem = $this.mmParent;
                    if (currentitem) {
                        init.call(this, currentitem.closest(".mm-panel"));
                    }
                }
            });
        }
    };
    var scrollProperty = {
        scroll : false,
        update : false
    };
    var he = {
        updateOffset : 50
    };
    self.options.pageScroll = scrollProperty;
    self.configs.pageScroll = he;
    var service = {
        add : false,
        addTo : "panels",
        cancel : false,
        noResults : "No results found.",
        placeholder : "Search",
        panel : {
            add : false,
            dividers : true,
            fx : "none",
            id : null,
            splash : null,
            title : "Search"
        },
        search : true,
        showTextItems : false,
        showSubPanels : true
    };
    var TAGNAMES = {
        clear : false,
        form : false,
        input : false,
        submit : false
    };
    var moveListener = {
        Search : "\u062c\u0633\u062a\u062c\u0648",
        "No results found." : "\u0646\u062a\u06cc\u062c\u0647\u200c\u0627\u06cc \u06cc\u0627\u0641\u062a \u0646\u0634\u062f.",
        cancel : "\u0627\u0646\u0635\u0631\u0627\u0641"
    };
    var args = {
        Search : "Suche",
        "No results found." : "Keine Ergebnisse gefunden.",
        cancel : "beenden"
    };
    var mapping = {
        Search : "\u041d\u0430\u0439\u0442\u0438",
        "No results found." : "\u041d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e.",
        cancel : "\u043e\u0442\u043c\u0435\u043d\u0438\u0442\u044c"
    };
    query({
        Search : "Zoeken",
        "No results found." : "Geen resultaten gevonden.",
        cancel : "annuleren"
    }, "nl");
    query(moveListener, "fa");
    query(args, "de");
    query(mapping, "ru");
    self.options.searchfield = service;
    self.configs.searchfield = TAGNAMES;
    const show = function(noFallback) {
        var options = this.opts.searchfield;
        this.conf.searchfield;
        if (callback(this.node.pnls, ".mm-panel_search").length) {
            return null;
        }
        var t = add("div.mm-panel_search");
        var tr = add("ul");
        switch(t.append(tr), this.node.pnls.append(t), options.panel.id && (t.id = options.panel.id), options.panel.title && t.setAttribute("data-mm-title", options.panel.title), options.panel.fx) {
            case false:
                break;
            case "none":
                t.classList.add("mm-panel_noanimation");
                break;
            default:
                t.classList.add("mm-panel_fx-" + options.panel.fx);
        }
        if (options.panel.splash) {
            let n = add("div.mm-panel__content");
            n.innerHTML = options.panel.splash;
            t.append(n);
        }
        return this._initPanels([t]), t;
    };
    const init = function(e) {
        function $(t, d) {
            if (d) {
                var i;
                for (i in d) {
                    t.setAttribute(i, d[i]);
                }
            }
        }
        var options = this.opts.searchfield;
        var opts = this.conf.searchfield;
        if (e.parentElement.matches(".mm-listitem_vertical")) {
            return null;
        }
        if (result = resolve(e, ".mm-searchfield")[0]) {
            return result;
        }
        var result = add((opts.form ? "form" : "div") + ".mm-searchfield");
        var t = add("div.mm-searchfield__input");
        var obj = add("input");
        if (obj.type = "text", obj.autocomplete = "off", obj.placeholder = this.i18n(options.placeholder), t.append(obj), result.append(t), e.prepend(result), $(obj, opts.input), opts.clear) {
            let e = add("a.mm-btn.mm-btn_close.mm-searchfield__btn");
            e.setAttribute("href", "#");
            t.append(e);
        }
        if ($(result, opts.form), opts.form && opts.submit && !opts.clear) {
            let e = add("a.mm-btn.mm-btn_next.mm-searchfield__btn");
            e.setAttribute("href", "#");
            t.append(e);
        }
        if (options.cancel) {
            let element = add("a.mm-searchfield__cancel");
            element.setAttribute("href", "#");
            element.textContent = this.i18n("cancel");
            result.append(element);
        }
        return result;
    };
    const create = function(opts) {
        var options = this.opts.searchfield;
        var config = (this.conf.searchfield, {});
        if (opts.closest(".mm-panel_search")) {
            config.panels = resolve(this.node.pnls, ".mm-panel");
            config.noresults = [opts.closest(".mm-panel")];
        } else {
            if (opts.closest(".mm-panel")) {
                config.panels = [opts.closest(".mm-panel")];
                config.noresults = config.panels;
            } else {
                config.panels = resolve(this.node.pnls, ".mm-panel");
                config.noresults = [this.node.menu];
            }
        }
        config.panels = config.panels.filter((instance) => {
            return !instance.parentElement.matches(".mm-listitem_vertical");
        });
        config.panels = config.panels.filter((recogs) => {
            return !recogs.matches(".mm-panel_search");
        });
        config.listitems = [];
        config.panels.forEach((e) => {
            config.listitems.push(...resolve(e, ".mm-listitem"));
        });
        config.dividers = [];
        config.panels.forEach((e) => {
            config.dividers.push(...resolve(e, ".mm-divider"));
        });
        var x = callback(this.node.pnls, ".mm-panel_search")[0];
        var e = resolve(opts, "input")[0];
        var a = resolve(opts, ".mm-searchfield__cancel")[0];
        e.mmSearchfield = config;
        if (options.panel.add && options.panel.splash) {
            normalize(e, "focus.splash");
            start(e, "focus.splash", (canCreateDiscussions) => {
                this.openPanel(x);
            });
        }
        if (options.cancel) {
            normalize(e, "focus.cancel");
            start(e, "focus.cancel", (canCreateDiscussions) => {
                a.classList.add("mm-searchfield__cancel-active");
            });
            normalize(a, "click.splash");
            start(a, "click.splash", (event) => {
                if (event.preventDefault(), a.classList.remove("mm-searchfield__cancel-active"), x.matches(".mm-panel_opened")) {
                    let panels = callback(this.node.pnls, ".mm-panel_opened-parent");
                    if (panels.length) {
                        this.openPanel(panels[panels.length - 1]);
                    }
                }
            });
        }
        if (options.panel.add && "panel" == options.addTo) {
            this.bind("openPanel:finish", (x_or_y) => {
                if (x_or_y === x) {
                    e.focus();
                }
            });
        }
        normalize(e, "input.search");
        start(e, "input.search", (event) => {
            switch(event.keyCode) {
                case 9:
                case 16:
                case 17:
                case 18:
                case 37:
                case 38:
                case 39:
                case 40:
                    break;
                default:
                    this.search(e);
            }
        });
        this.search(e);
    };
    const __alloyId9 = function(e) {
        if (e) {
            var options = this.opts.searchfield;
            this.conf.searchfield;
            if (e.closest(".mm-panel") || (e = callback(this.node.pnls, ".mm-panel")[0]), !callback(e, ".mm-panel__noresultsmsg").length) {
                var tr = add("div.mm-panel__noresultsmsg.mm-hidden");
                tr.innerHTML = this.i18n(options.noResults);
                e.append(tr);
            }
        }
    };
    self.prototype.search = function(obj, url) {
        var options = this.opts.searchfield;
        this.conf.searchfield;
        url = (url = url || "" + obj.value).toLowerCase().trim();
        var container = obj.mmSearchfield;
        var cuePoints = resolve(obj.closest(".mm-searchfield"), ".mm-btn");
        var panel = callback(this.node.pnls, ".mm-panel_search")[0];
        var settings = container.panels;
        var transports = container.noresults;
        var existing = container.listitems;
        var toCheck = container.dividers;
        if (existing.forEach((focusedObj) => {
            focusedObj.classList.remove("mm-listitem_nosubitems");
        }), panel && (callback(panel, ".mm-listview")[0].innerHTML = ""), settings.forEach(($suggestionContainer) => {
            $suggestionContainer.scrollTop = 0;
        }), url.length) {
            if (toCheck.forEach((e) => {
                e.classList.add("mm-hidden");
            }), existing.forEach((e) => {
                var i = callback(e, ".mm-listitem__text")[0];
                var s = false;
                if (i && i.textContent.toLowerCase().indexOf(url) > -1) {
                    if (i.matches(".mm-listitem__btn")) {
                        if (options.showSubPanels) {
                            s = true;
                        }
                    } else {
                        if (i.matches("a")) {
                            s = true;
                        } else {
                            if (options.showTextItems) {
                                s = true;
                            }
                        }
                    }
                }
                if (!s) {
                    e.classList.add("mm-hidden");
                }
            }), options.panel.add) {
                let children = [];
                settings.forEach((args) => {
                    let mixins = expect(resolve(args, ".mm-listitem"));
                    if ((mixins = mixins.filter((recogs) => {
                        return !recogs.matches(".mm-hidden");
                    })).length) {
                        if (options.panel.dividers) {
                            let n = add("li.mm-divider");
                            n.innerHTML = args.querySelector(".mm-navbar__title").innerHTML;
                            children.push(n);
                        }
                        mixins.forEach((eleTemplate) => {
                            children.push(eleTemplate.cloneNode(true));
                        });
                    }
                });
                children.forEach((rootDOMTravelScope) => {
                    rootDOMTravelScope.querySelectorAll(".mm-toggle, .mm-check").forEach((inventoryService) => {
                        inventoryService.remove();
                    });
                });
                callback(panel, ".mm-listview")[0].append(...children);
                this.openPanel(panel);
            } else {
                if (options.showSubPanels) {
                    settings.forEach((e) => {
                        expect(resolve(e, ".mm-listitem")).forEach((canCreateDiscussions) => {
                            let t = canCreateDiscussions.mmChild;
                            if (t) {
                                resolve(t, ".mm-listitem").forEach((focusedObj) => {
                                    focusedObj.classList.remove("mm-hidden");
                                });
                            }
                        });
                    });
                }
                settings.reverse().forEach((args, n) => {
                    let i = args.mmParent;
                    if (i) {
                        if (expect(resolve(args, ".mm-listitem")).length) {
                            if (i.matches(".mm-hidden")) {
                                i.classList.remove("mm-hidden");
                            }
                        } else {
                            if (!obj.closest(".mm-panel")) {
                                if (args.matches(".mm-panel_opened") || args.matches(".mm-panel_opened-parent")) {
                                    setTimeout(() => {
                                        this.openPanel(i.closest(".mm-panel"));
                                    }, (n + 1) * (1.5 * this.conf.openingInterval));
                                }
                                i.classList.add("mm-listitem_nosubitems");
                            }
                        }
                    }
                });
                settings.forEach((e) => {
                    expect(resolve(e, ".mm-listitem")).forEach((apexdist) => {
                        let new_link_node = function(c, expr) {
                            var graphicsTargets = [];
                            var target = c.previousElementSibling;
                            for (; target;) {
                                if (!(expr && !target.matches(expr))) {
                                    graphicsTargets.push(target);
                                }
                                target = target.previousElementSibling;
                            }
                            return graphicsTargets;
                        }(apexdist, ".mm-divider")[0];
                        if (new_link_node) {
                            new_link_node.classList.remove("mm-hidden");
                        }
                    });
                });
            }
            cuePoints.forEach((focusedObj) => {
                return focusedObj.classList.remove("mm-hidden");
            });
            transports.forEach((e) => {
                resolve(e, ".mm-panel__noresultsmsg").forEach((component) => {
                    return component.classList[existing.filter((recogs) => {
                        return !recogs.matches(".mm-hidden");
                    }).length ? "add" : "remove"]("mm-hidden");
                });
            });
            if (options.panel.add) {
                if (options.panel.splash) {
                    resolve(panel, ".mm-panel__content").forEach((e) => {
                        return e.classList.add("mm-hidden");
                    });
                }
                existing.forEach((focusedObj) => {
                    return focusedObj.classList.remove("mm-hidden");
                });
                toCheck.forEach((focusedObj) => {
                    return focusedObj.classList.remove("mm-hidden");
                });
            }
        } else {
            if (existing.forEach((focusedObj) => {
                return focusedObj.classList.remove("mm-hidden");
            }), toCheck.forEach((focusedObj) => {
                return focusedObj.classList.remove("mm-hidden");
            }), cuePoints.forEach((e) => {
                return e.classList.add("mm-hidden");
            }), transports.forEach((e) => {
                resolve(e, ".mm-panel__noresultsmsg").forEach((e) => {
                    return e.classList.add("mm-hidden");
                });
            }), options.panel.add) {
                if (options.panel.splash) {
                    resolve(panel, ".mm-panel__content").forEach((focusedObj) => {
                        return focusedObj.classList.remove("mm-hidden");
                    });
                } else {
                    if (!obj.closest(".mm-panel_search")) {
                        let charListNotLatin = callback(this.node.pnls, ".mm-panel_opened-parent");
                        this.openPanel(charListNotLatin.slice(-1)[0]);
                    }
                }
            }
        }
        this.trigger("updateListview");
    };
    var reductio_value_count = {
        add : false,
        addTo : "panels"
    };
    self.options.sectionIndexer = reductio_value_count;
    var _private = {
        current : true,
        hover : false,
        parent : false
    };
    self.options.setSelected = _private;
    var INDICATOR_TEXT_MAPPING = {
        collapsed : {
            use : false,
            blockMenu : true,
            hideDivider : false,
            hideNavbar : true
        },
        expanded : {
            use : false
        }
    };
    self.options.sidebar = INDICATOR_TEXT_MAPPING;
    self.configs.classNames.toggles = {
        toggle : "Toggle",
        check : "Check"
    };
    var Observable;
    self.addons = {
        offcanvas : function() {
            if (this.opts.offCanvas) {
                var e = function(params) {
                    return "object" != typeof params && (params = {}), params;
                }(this.opts.offCanvas);
                this.opts.offCanvas = $(e, self.options.offCanvas);
                var context = this.conf.offCanvas;
                this._api.push("open", "close", "setPage");
                this.vars.opened = false;
                this.bind("initMenu:after", () => {
                    initialize.call(this);
                    this.setPage(self.node.page);
                    update.call(this);
                    this.node.menu.classList.add("mm-menu_offcanvas");
                    this.node[this.conf.clone ? "orig" : "menu"].parentElement.classList.remove("mm-wrapper");
                    document.querySelector(context.menu.insertSelector)[context.menu.insertMethod](this.node.menu);
                    let charListNotLatin = window.location.hash;
                    if (charListNotLatin) {
                        let t = this.vars.orgMenuId;
                        if (t && t == charListNotLatin.slice(1)) {
                            setTimeout(() => {
                                this.open();
                            }, 1e3);
                        }
                    }
                });
                this.bind("setPage:after", (domvalue) => {
                    if (self.node.blck) {
                        callback(self.node.blck, "a").forEach((t) => {
                            t.setAttribute("href", "#" + domvalue.id);
                        });
                    }
                });
                this.bind("open:start:sr-aria", () => {
                    self.sr_aria(this.node.menu, "hidden", false);
                });
                this.bind("close:finish:sr-aria", () => {
                    self.sr_aria(this.node.menu, "hidden", true);
                });
                this.bind("initMenu:after:sr-aria", () => {
                    self.sr_aria(this.node.menu, "hidden", true);
                });
                this.bind("initBlocker:after:sr-text", () => {
                    callback(self.node.blck, "a").forEach((dashboardPanel) => {
                        dashboardPanel.innerHTML = self.sr_text(this.i18n(this.conf.screenReader.text.closeMenu));
                    });
                });
                this.clck.push((ELEMENT, canCreateDiscussions) => {
                    var result = this.vars.orgMenuId;
                    if (result && ELEMENT.matches('[href="#' + result + '"]')) {
                        if (canCreateDiscussions.inMenu) {
                            return this.open(), true;
                        }
                        var nav = ELEMENT.closest(".mm-menu");
                        if (nav) {
                            var transport = nav.mmenu;
                            if (transport && transport.close) {
                                return transport.close(), set(nav, () => {
                                    this.open();
                                }, this.conf.transitionDuration), true;
                            }
                        }
                        return this.open(), true;
                    }
                    if ((result = self.node.page.id) && ELEMENT.matches('[href="#' + result + '"]')) {
                        return this.close(), true;
                    }
                });
            }
        },
        screenReader : function() {
            var e = function(params) {
                return "boolean" == typeof params && (params = {
                    aria : params,
                    text : params
                }), "object" != typeof params && (params = {}), params;
            }(this.opts.screenReader);
            this.opts.screenReader = $(e, self.options.screenReader);
            var container = this.conf.screenReader;
            if (e.aria) {
                this.bind("initAddons:after", () => {
                    this.bind("initMenu:after", function() {
                        this.trigger("initMenu:after:sr-aria", [].slice.call(arguments));
                    });
                    this.bind("initNavbar:after", function() {
                        this.trigger("initNavbar:after:sr-aria", [].slice.call(arguments));
                    });
                    this.bind("openPanel:start", function() {
                        this.trigger("openPanel:start:sr-aria", [].slice.call(arguments));
                    });
                    this.bind("close:start", function() {
                        this.trigger("close:start:sr-aria", [].slice.call(arguments));
                    });
                    this.bind("close:finish", function() {
                        this.trigger("close:finish:sr-aria", [].slice.call(arguments));
                    });
                    this.bind("open:start", function() {
                        this.trigger("open:start:sr-aria", [].slice.call(arguments));
                    });
                    this.bind("initOpened:after", function() {
                        this.trigger("initOpened:after:sr-aria", [].slice.call(arguments));
                    });
                });
                this.bind("updateListview", () => {
                    this.node.pnls.querySelectorAll(".mm-listitem").forEach((completions) => {
                        self.sr_aria(completions, "hidden", completions.matches(".mm-hidden"));
                    });
                });
                this.bind("openPanel:start", (e) => {
                    var pipelets = resolve(this.node.pnls, ".mm-panel").filter((i) => {
                        return i !== e;
                    }).filter((instance) => {
                        return !instance.parentElement.matches(".mm-panel");
                    });
                    var args = [e];
                    resolve(e, ".mm-listitem_vertical .mm-listitem_opened").forEach((e) => {
                        args.push(...callback(e, ".mm-panel"));
                    });
                    pipelets.forEach((e) => {
                        self.sr_aria(e, "hidden", true);
                    });
                    args.forEach((e) => {
                        self.sr_aria(e, "hidden", false);
                    });
                });
                this.bind("closePanel", (e) => {
                    self.sr_aria(e, "hidden", true);
                });
                this.bind("initPanels:after", (wrappersTemplates) => {
                    wrappersTemplates.forEach((e) => {
                        resolve(e, ".mm-btn").forEach((e) => {
                            self.sr_aria(e, "haspopup", true);
                            let pathWithLeadingSlash = e.getAttribute("href");
                            if (pathWithLeadingSlash) {
                                self.sr_aria(e, "owns", pathWithLeadingSlash.replace("#", ""));
                            }
                        });
                    });
                });
                this.bind("initNavbar:after", (e) => {
                    var completions = callback(e, ".mm-navbar")[0];
                    var n = completions.matches(".mm-hidden");
                    self.sr_aria(completions, "hidden", n);
                });
                if (e.text && "parent" == this.opts.navbar.titleLink) {
                    this.bind("initNavbar:after", (e) => {
                        var routesFileLocation = callback(e, ".mm-navbar")[0];
                        var n = !!routesFileLocation.querySelector(".mm-btn_prev");
                        self.sr_aria(resolve(routesFileLocation, ".mm-navbar__title")[0], "hidden", n);
                    });
                }
            }
            if (e.text) {
                this.bind("initAddons:after", () => {
                    this.bind("setPage:after", function() {
                        this.trigger("setPage:after:sr-text", [].slice.call(arguments));
                    });
                    this.bind("initBlocker:after", function() {
                        this.trigger("initBlocker:after:sr-text", [].slice.call(arguments));
                    });
                });
                this.bind("initNavbar:after", (e) => {
                    let n = callback(e, ".mm-navbar")[0];
                    if (n) {
                        let lnkDiv = callback(n, ".mm-btn_prev")[0];
                        if (lnkDiv) {
                            lnkDiv.innerHTML = self.sr_text(this.i18n(container.text.closeSubmenu));
                        }
                    }
                });
                this.bind("initListview:after", (canCreateDiscussions) => {
                    let n = canCreateDiscussions.mmParent;
                    if (n) {
                        let node = callback(n, ".mm-btn_next")[0];
                        if (node) {
                            let data = this.i18n(container.text[node.parentElement.matches(".mm-listitem_vertical") ? "toggleSubmenu" : "openSubmenu"]);
                            node.innerHTML += self.sr_text(data);
                        }
                    }
                });
            }
        },
        scrollBugFix : function() {
            if (hide && this.opts.offCanvas && this.opts.offCanvas.blockUI) {
                var sections = function(r) {
                    return "boolean" == typeof r && (r = {
                        fix : r
                    }), "object" != typeof r && (r = {}), r;
                }(this.opts.scrollBugFix);
                this.opts.scrollBugFix = $(sections, self.options.scrollBugFix);
                if (sections.fix) {
                    this.bind("open:start", () => {
                        callback(this.node.pnls, ".mm-panel_opened")[0].scrollTop = 0;
                    });
                    this.bind("initMenu:after", () => {
                        if (!this.vars.scrollBugFixed) {
                            let e = false;
                            document.addEventListener("touchmove", (event) => {
                                if (document.documentElement.matches(".mm-wrapper_opened")) {
                                    event.preventDefault();
                                }
                            });
                            document.body.addEventListener("touchstart", (tok) => {
                                var d = tok.target;
                                if (d.matches(".mm-panels > .mm-panel") && document.documentElement.matches(".mm-wrapper_opened")) {
                                    if (!e) {
                                        e = true;
                                        if (0 === d.scrollTop) {
                                            d.scrollTop = 1;
                                        } else {
                                            if (d.scrollHeight === d.scrollTop + d.offsetHeight) {
                                                d.scrollTop -= 1;
                                            }
                                        }
                                        e = false;
                                    }
                                }
                            });
                            document.body.addEventListener("touchmove", (event) => {
                                var el = event.target;
                                if (el.matches(".mm-panels > .mm-panel") && document.documentElement.matches(".mm-wrapper_opened") && el.scrollHeight > el.clientHeight) {
                                    event.stopPropagation();
                                }
                            });
                        }
                        this.vars.scrollBugFixed = true;
                        window.addEventListener("orientationchange", (canCreateDiscussions) => {
                            var hostBody = callback(this.node.pnls, ".mm-panel_opened")[0];
                            hostBody.scrollTop = 0;
                            hostBody.style["-webkit-overflow-scrolling"] = "auto";
                            hostBody.style["-webkit-overflow-scrolling"] = "touch";
                        });
                    });
                }
            }
        },
        autoHeight : function() {
            var settings = function(target) {
                return "boolean" == typeof target && target && (target = {
                    height : "auto"
                }), "string" == typeof target && (target = {
                    height : target
                }), "object" != typeof target && (target = {}), target;
            }(this.opts.autoHeight);
            if (this.opts.autoHeight = $(settings, self.options.autoHeight), "auto" != settings.height && "highest" != settings.height) {
                return;
            }
            const _setMaster = (() => {
                const merge = () => {
                    var message = callback(this.node.pnls, ".mm-panel_opened")[0];
                    return message && (message = select(message)), message || (message = callback(this.node.pnls, ".mm-panel")[0]), message.offsetHeight;
                };
                const getClickedFileFullPath = () => {
                    var widestInView = 0;
                    return callback(this.node.pnls, ".mm-panel").forEach((obj) => {
                        obj = select(obj);
                        widestInView = Math.max(widestInView, obj.offsetHeight);
                    }), widestInView;
                };
                const select = (e) => {
                    return e.parentElement.matches(".mm-listitem_vertical") && (e = _(e, ".mm-panel").filter((instance) => {
                        return !instance.parentElement.matches(".mm-listitem_vertical");
                    })[0]), e;
                };
                return () => {
                    if (!this.opts.offCanvas || this.vars.opened) {
                        var i = window.getComputedStyle(this.node.pnls);
                        var C = Math.max(parseInt(i.top, 10), 0) || 0;
                        var v = Math.max(parseInt(i.bottom, 10), 0) || 0;
                        var str = 0;
                        this.node.menu.classList.add("mm-menu_autoheight-measuring");
                        if ("auto" == settings.height) {
                            str = merge();
                        } else {
                            if ("highest" == settings.height) {
                                str = getClickedFileFullPath();
                            }
                        }
                        this.node.menu.style.height = str + C + v + "px";
                        this.node.menu.classList.remove("mm-menu_autoheight-measuring");
                    }
                };
            })();
            this.bind("initMenu:after", () => {
                this.node.menu.classList.add("mm-menu_autoheight");
            });
            if (this.opts.offCanvas) {
                this.bind("open:start", _setMaster);
            }
            if ("highest" == settings.height) {
                this.bind("initPanels:after", _setMaster);
            }
            if ("auto" == settings.height) {
                this.bind("updateListview", _setMaster);
                this.bind("openPanel:start", _setMaster);
            }
        },
        backButton : function() {
            if (this.opts.offCanvas) {
                var e = function(n) {
                    return "boolean" == typeof n && (n = {
                        close : n
                    }), "object" != typeof n && (n = {}), n;
                }(this.opts.backButton);
                this.opts.backButton = $(e, self.options.backButton);
                var hash = "#" + this.node.menu.id;
                if (e.close) {
                    var p = [];
                    const handler = () => {
                        p = [hash];
                        callback(this.node.pnls, ".mm-panel_opened, .mm-panel_opened-parent").forEach((domvalue) => {
                            p.push("#" + domvalue.id);
                        });
                    };
                    this.bind("open:finish", () => {
                        history.pushState(null, document.title, hash);
                    });
                    this.bind("open:finish", handler);
                    this.bind("openPanel:finish", handler);
                    this.bind("close:finish", () => {
                        p = [];
                        history.back();
                        history.pushState(null, document.title, location.pathname + location.search);
                    });
                    window.addEventListener("popstate", (canCreateDiscussions) => {
                        if (this.vars.opened && p.length) {
                            var type = (p = p.slice(0, -1))[p.length - 1];
                            if (type == hash) {
                                this.close();
                            } else {
                                this.openPanel(this.node.menu.querySelector(type));
                                history.pushState(null, document.title, hash);
                            }
                        }
                    });
                }
                if (e.open) {
                    window.addEventListener("popstate", (canCreateDiscussions) => {
                        if (!(this.vars.opened || location.hash != hash)) {
                            this.open();
                        }
                    });
                }
            }
        },
        columns : function() {
            var item = function(options) {
                return "boolean" == typeof options && (options = {
                    add : options
                }), "number" == typeof options && (options = {
                    add : true,
                    visible : options
                }), "object" != typeof options && (options = {}), "number" == typeof options.visible && (options.visible = {
                    min : options.visible,
                    max : options.visible
                }), options;
            }(this.opts.columns);
            if (this.opts.columns = $(item, self.options.columns), item.add) {
                item.visible.min = Math.max(1, Math.min(6, item.visible.min));
                item.visible.max = Math.max(item.visible.min, Math.min(6, item.visible.max));
                var entries = "";
                var s = "";
                var i = 0;
                for (; i <= item.visible.max; i++) {
                    entries = entries + (" mm-menu_columns-" + i);
                    s = s + (" mm-panel_columns-" + i);
                }
                if (entries.length) {
                    entries = entries.slice(1);
                    s = s.slice(1);
                }
                var start = s + " mm-panel_opened mm-panel_opened-parent mm-panel_highest";
                this.bind("openPanel:before", (node) => {
                    var t;
                    if (node && (t = node.mmParent), t && (t = t.closest(".mm-panel"))) {
                        var title = t.className;
                        if (title.length && (title = title.split("mm-panel_columns-")[1])) {
                            var subnetLength = parseInt(title.split(" ")[0], 10) + 1;
                            for (; subnetLength > 0;) {
                                if (!(node = callback(this.node.pnls, ".mm-panel_columns-" + subnetLength)[0])) {
                                    subnetLength = -1;
                                    break;
                                }
                                subnetLength++;
                                node.classList.remove(start);
                                node.classList.add("mm-hidden");
                            }
                        }
                    }
                });
                this.bind("openPanel:start", (i) => {
                    var s = callback(this.node.pnls, ".mm-panel_opened-parent").length;
                    if (!i.matches(".mm-panel_opened-parent")) {
                        s++;
                    }
                    s = Math.min(item.visible.max, Math.max(item.visible.min, s));
                    this.node.menu.classList.remove(...entries.split(" "));
                    this.node.menu.classList.add("mm-menu_columns-" + s);
                    var a = [];
                    callback(this.node.pnls, ".mm-panel").forEach((e) => {
                        e.classList.remove(...s.split(" "));
                        if (e.matches(".mm-panel_opened-parent")) {
                            a.push(e);
                        }
                    });
                    a.push(i);
                    a.slice(-item.visible.max).forEach((e, viewStatus) => {
                        e.classList.add("mm-panel_columns-" + viewStatus);
                    });
                });
            }
        },
        counters : function() {
            var element = function(o) {
                return "boolean" == typeof o && (o = {
                    add : o,
                    count : o
                }), "object" != typeof o && (o = {}), "panels" == o.addTo && (o.addTo = ".mm-panel"), o;
            }(this.opts.counters);
            if (this.opts.counters = $(element, self.options.counters), this.bind("initListview:after", (f) => {
                var b = this.conf.classNames.counters.counter;
                f.querySelectorAll("." + b).forEach((instrumented) => {
                    next(instrumented, b, "mm-counter");
                });
            }), element.add && this.bind("initListview:after", (t) => {
                if (t.matches(element.addTo)) {
                    var n = t.mmParent;
                    if (n && !n.querySelector(".mm-counter")) {
                        let removeButton = add("span.mm-counter");
                        let datasourceToolbox = callback(n, ".mm-btn")[0];
                        if (datasourceToolbox) {
                            datasourceToolbox.prepend(removeButton);
                        }
                    }
                }
            }), element.count) {
                const search = (type) => {
                    (type ? [type] : callback(this.node.pnls, ".mm-panel")).forEach((e) => {
                        var t = e.mmParent;
                        if (t) {
                            var lnkDiv = t.querySelector(".mm-counter");
                            if (lnkDiv) {
                                var paramKeys = [];
                                callback(e, ".mm-listview").forEach((e) => {
                                    paramKeys.push(...callback(e));
                                });
                                lnkDiv.innerHTML = expect(paramKeys).length.toString();
                            }
                        }
                    });
                };
                this.bind("initListview:after", search);
                this.bind("updateListview", search);
            }
        },
        dividers : function() {
            var element = function(o) {
                return "boolean" == typeof o && (o = {
                    add : o
                }), "object" != typeof o && (o = {}), "panels" == o.addTo && (o.addTo = ".mm-panel"), o;
            }(this.opts.dividers);
            this.opts.dividers = $(element, self.options.dividers);
            this.bind("initListview:after", (e) => {
                callback(e, "ul, ol").forEach((e) => {
                    callback(e).forEach((e) => {
                        next(e, this.conf.classNames.divider, "mm-divider");
                        if (e.matches(".mm-divider")) {
                            e.classList.remove("mm-listitem");
                        }
                    });
                });
            });
            if (element.type) {
                this.bind("initMenu:after", () => {
                    this.node.menu.classList.add("mm-menu_dividers-" + element.type);
                });
            }
            if (element.add) {
                this.bind("initListview:after", (t) => {
                    if (t.matches(element.addTo)) {
                        resolve(t, ".mm-divider").forEach((inventoryService) => {
                            inventoryService.remove();
                        });
                        resolve(t, ".mm-listview").forEach((e) => {
                            var delim = "";
                            expect(callback(e)).forEach((n) => {
                                let matchDelim = callback(n, ".mm-listitem__text")[0].textContent.trim().toLowerCase()[0];
                                if (matchDelim.length && matchDelim != delim) {
                                    delim = matchDelim;
                                    let c = add("li.mm-divider");
                                    c.textContent = matchDelim;
                                    e.insertBefore(c, n);
                                }
                            });
                        });
                    }
                });
            }
        },
        drag : function() {
            function minMax(value, min, max) {
                return value < min && (value = min), value > max && (value = max), value;
            }
            if (this.opts.offCanvas && !("function" != typeof Hammer || Hammer.VERSION < 2)) {
                var _this = function(options) {
                    return "boolean" == typeof options && (options = {
                        menu : options,
                        panels : options
                    }), "object" != typeof options && (options = {}), "boolean" == typeof options.menu && (options.menu = {
                        open : options.menu
                    }), "object" != typeof options.menu && (options.menu = {}), "boolean" == typeof options.panels && (options.panels = {
                        close : options.panels
                    }), "object" != typeof options.panels && (options.panels = {}), options;
                }(this.opts.drag);
                this.opts.drag = $(_this, self.options.drag);
                var context = this.conf.drag;
                if (_this.menu.open) {
                    this.bind("setPage:after", () => {
                        var c;
                        var s;
                        var pipelets;
                        var options = {
                            events : "panleft panright",
                            typeLower : "x",
                            typeUpper : "X",
                            open_dir : "right",
                            close_dir : "left",
                            negative : false
                        };
                        var i = "width";
                        var x = "innerWidth";
                        var value = options.open_dir;
                        var makeUI = function(storeCfg) {
                            if (storeCfg <= _this.menu.maxStartPos) {
                                p = 1;
                            }
                        };
                        var _handleHeaderCellRendered = function() {
                            return resolve(document.body, ".mm-slideout");
                        };
                        var p = 0;
                        var max = 0;
                        var _maxDistance = 0;
                        var left = this.opts.extensions.all;
                        var position = void 0 === left ? "left" : left.indexOf("mm-menu_position-right") > -1 ? "right" : left.indexOf("mm-menu_position-top") > -1 ? "top" : left.indexOf("mm-menu_position-bottom") > -1 ? "bottom" : "left";
                        var alignment = void 0 === left ? "back" : left.indexOf("mm-menu_position-top") > -1 || left.indexOf("mm-menu_position-bottom") > -1 || left.indexOf("mm-menu_position-front") > -1 ? "front" : "back";
                        switch(position) {
                            case "top":
                            case "bottom":
                                options.events = "panup pandown";
                                options.typeLower = "y";
                                options.typeUpper = "Y";
                                i = "height";
                                x = "innerHeight";
                        }
                        switch(position) {
                            case "right":
                            case "bottom":
                                options.negative = true;
                                makeUI = function(storeCfg) {
                                    if (storeCfg >= window[x] - _this.menu.maxStartPos) {
                                        p = 1;
                                    }
                                };
                        }
                        switch(position) {
                            case "right":
                                options.open_dir = "left";
                                options.close_dir = "right";
                                break;
                            case "top":
                                options.open_dir = "down";
                                options.close_dir = "up";
                                break;
                            case "bottom":
                                options.open_dir = "up";
                                options.close_dir = "down";
                        }
                        switch(alignment) {
                            case "front":
                                _handleHeaderCellRendered = function() {
                                    return [this.node.menu];
                                };
                        }
                        var element = extend(this.node.menu, _this.menu.node, self.node.page);
                        if ("string" == typeof element) {
                            element = document.querySelector(element);
                        }
                        var mc = new Hammer(element, this.opts.drag.vendors.hammer);
                        mc.on("panstart", (window) => {
                            makeUI.call(this, window.center[options.typeLower]);
                            pipelets = _handleHeaderCellRendered.call(this);
                            value = options.open_dir;
                        });
                        mc.on(options.events + " panend", (event) => {
                            if (p > 0) {
                                event.preventDefault();
                            }
                        });
                        mc.on(options.events, (e) => {
                            if (c = e["delta" + options.typeUpper], options.negative && (c = -c), c != max && (value = c >= max ? options.open_dir : options.close_dir), (max = c) > _this.menu.threshold && 1 == p) {
                                if (document.documentElement.matches(".mm-wrapper_opened")) {
                                    return;
                                }
                                p = 2;
                                this._openSetup();
                                this.trigger("open:start");
                                document.documentElement.classList.add("mm-wrapper_dragging");
                                _maxDistance = minMax(window[x] * context.menu[i].perc, context.menu[i].min, context.menu[i].max);
                            }
                            if (2 == p) {
                                s = minMax(max, 10, _maxDistance) - ("front" == alignment ? _maxDistance : 0);
                                if (options.negative) {
                                    s = -s;
                                }
                                let name = "translate" + options.typeUpper + "(" + s + "px )";
                                pipelets.forEach((elem) => {
                                    elem.style["-webkit-transform"] = "-webkit-" + name;
                                    elem.style.transform = name;
                                });
                            }
                        });
                        mc.on("panend", (canCreateDiscussions) => {
                            if (2 == p) {
                                document.documentElement.classList.remove("mm-wrapper_dragging");
                                pipelets.forEach((elem) => {
                                    elem.style["-webkit-transform"] = "";
                                    elem.style.transform = "";
                                });
                                this[value == options.open_dir ? "_openStart" : "close"]();
                            }
                            p = 0;
                        });
                    });
                }
                if (_this.panels.close) {
                    this.bind("initPanel:after", (g) => {
                        var $panel = g["mmParent "];
                        if ($panel) {
                            $panel = $panel.closest(".mm-panel");
                            var touch = new Hammer(g, this.opts.drag.vendors.hammer);
                            var _takingTooLongTimeout = null;
                            touch.on("panright", (canCreateDiscussions) => {
                                if (!_takingTooLongTimeout) {
                                    this.openPanel($panel);
                                    _takingTooLongTimeout = setTimeout(() => {
                                        clearTimeout(_takingTooLongTimeout);
                                        _takingTooLongTimeout = null;
                                    }, this.conf.openingInterval + this.conf.transitionDuration);
                                }
                            });
                        }
                    });
                }
            }
        },
        dropdown : function() {
            function show() {
                if (this.vars.opened) {
                    this.node.menu.setAttribute("style", this.node.menu.mmStyle);
                    var result = [{}, []];
                    result = render.call(this, "y", result);
                    result = render.call(this, "x", result);
                    for (let key in result[0]) {
                        this.node.menu.style[key] = result[0][key];
                    }
                    if (options.tip) {
                        this.node.menu.classList.remove("mm-menu_tip-left", "mm-menu_tip-right", "mm-menu_tip-top", "mm-menu_tip-bottom");
                        this.node.menu.classList.add(...result[1]);
                    }
                }
            }
            if (this.opts.offCanvas) {
                var options = function(value) {
                    return "boolean" == typeof value && value && (value = {
                        drop : value
                    }), "object" != typeof value && (value = {}), "string" == typeof value.position && (value.position = {
                        of : value.position
                    }), value;
                }(this.opts.dropdown);
                this.opts.dropdown = $(options, self.options.dropdown);
                var config = this.conf.dropdown;
                if (options.drop) {
                    var target;
                    this.bind("initMenu:after", () => {
                        if (this.node.menu.classList.add("mm-menu_dropdown"), "string" != typeof options.position.of) {
                            let blockHostsStr = this.vars.orgMenuId;
                            if (blockHostsStr && blockHostsStr.length) {
                                options.position.of = '[href="#' + blockHostsStr + '"]';
                            }
                        }
                        if ("string" == typeof options.position.of) {
                            target = resolve(document.body, options.position.of)[0];
                            var routes = options.event.split(" ");
                            if (1 == routes.length) {
                                routes[1] = routes[0];
                            }
                            if ("hover" == routes[0]) {
                                target.addEventListener("mouseenter", (canCreateDiscussions) => {
                                    this.open();
                                }, {
                                    passive : true
                                });
                            }
                            if ("hover" == routes[1]) {
                                this.node.menu.addEventListener("mouseleave", (canCreateDiscussions) => {
                                    this.close();
                                }, {
                                    passive : true
                                });
                            }
                        }
                    });
                    this.bind("open:start", () => {
                        this.node.menu.mmStyle = this.node.menu.getAttribute("style");
                        document.documentElement.classList.add("mm-wrapper_dropdown");
                    });
                    this.bind("close:finish", () => {
                        this.node.menu.setAttribute("style", this.node.menu.mmStyle);
                        document.documentElement.classList.remove("mm-wrapper_dropdown");
                    });
                    var render = function(i, value) {
                        var x;
                        var method;
                        var maxHeightInCSS;
                        var s = value[0];
                        var bubbles = value[1];
                        var scroll = "x" == i ? "scrollLeft" : "scrollTop";
                        var arrowOffsetPosition = "x" == i ? "offsetWidth" : "offsetHeight";
                        var pos = "x" == i ? "left" : "top";
                        var dir = "x" == i ? "right" : "bottom";
                        var axis = "x" == i ? "width" : "height";
                        var id = "x" == i ? "innerWidth" : "innerHeight";
                        var prop = "x" == i ? "maxWidth" : "maxHeight";
                        var where = null;
                        var g = document.documentElement[scroll] || document.body[scroll];
                        var hide = (x = pos, target.getBoundingClientRect()[x] + document.body["left" === x ? "scrollLeft" : "scrollTop"] - g);
                        var show = hide + target[arrowOffsetPosition];
                        var Xmain = window[id];
                        var Xvertical2 = config.offset.button[i] + config.offset.viewport[i];
                        if (options.position[i]) {
                            switch(options.position[i]) {
                                case "left":
                                case "bottom":
                                    where = "after";
                                    break;
                                case "right":
                                case "top":
                                    where = "before";
                            }
                        }
                        return null === where && (where = hide + (show - hide) / 2 < Xmain / 2 ? "after" : "before"), "after" == where ? (maxHeightInCSS = Xmain - ((method = "x" == i ? hide : show) + Xvertical2), s[pos] = method + config.offset.button[i] + "px", s[dir] = "auto", options.tip && bubbles.push("mm-menu_tip-" + ("x" == i ? "left" : "top"))) : (maxHeightInCSS = (method = "x" == i ? show : hide) - Xvertical2, s[dir] = "calc( 100% - " + (method - config.offset.button[i]) + "px )", s[pos] = "auto", options.tip &&
                        bubbles.push("mm-menu_tip-" + ("x" == i ? "right" : "bottom"))), options.fitViewport && (s[prop] = Math.min(config[axis].max, maxHeightInCSS) + "px"), [s, bubbles];
                    };
                    this.bind("open:start", show);
                    window.addEventListener("resize", (canCreateDiscussions) => {
                        show.call(this);
                    }, {
                        passive : true
                    });
                    if (!this.opts.offCanvas.blockUI) {
                        window.addEventListener("scroll", (canCreateDiscussions) => {
                            show.call(this);
                        }, {
                            passive : true
                        });
                    }
                }
            }
        },
        fixedElements : function() {
            if (this.opts.offCanvas) {
                var name;
                var THREAD_STARTED;
                var deps;
                var cookiesToString;
                var output = this.conf.fixedElements;
                this.bind("setPage:after", (uri) => {
                    name = this.conf.classNames.fixedElements.fixed;
                    cookiesToString = resolve(document, output.fixed.insertSelector)[0];
                    resolve(uri, "." + name).forEach((cookies) => {
                        next(cookies, name, "mm-slideout");
                        cookiesToString[output.fixed.insertMethod](cookies);
                    });
                    resolve(uri, "." + (THREAD_STARTED = this.conf.classNames.fixedElements.sticky)).forEach((instrumented) => {
                        next(instrumented, THREAD_STARTED, "mm-sticky");
                    });
                    deps = resolve(uri, ".mm-sticky");
                });
                this.bind("open:start", () => {
                    if (deps.length && "hidden" == window.getComputedStyle(document.documentElement).overflow) {
                        let v_height_diff = (document.documentElement.scrollTop || document.body.scrollTop) + output.sticky.offset;
                        deps.forEach((DOMNode) => {
                            DOMNode.style.top = parseInt(window.getComputedStyle(DOMNode).top, 10) + v_height_diff + "px";
                        });
                    }
                });
                this.bind("close:finish", () => {
                    deps.forEach((smallActionBox) => {
                        smallActionBox.style.top = "";
                    });
                });
            }
        },
        iconbar : function() {
            var e;
            var m = function(data) {
                return "array" == typeOf(data) && (data = {
                    use : true,
                    top : data
                }), "object" != typeOf(data) && (data = {}), void 0 === data.use && (data.use = true), "boolean" == typeof data.use && data.use && (data.use = true), data;
            }(this.opts.iconbar);
            if (this.opts.iconbar = $(m, self.options.iconbar), m.use && (["top", "bottom"].forEach((n, i) => {
                var val = m[n];
                if ("array" != typeOf(val)) {
                    val = [val];
                }
                var t = add("div.mm-iconbar__" + n);
                for (let i = 0, l = val.length; i < l; i++) {
                    if ("string" == typeof val[i]) {
                        t.innerHTML += val[i];
                    } else {
                        t.append(val[i]);
                    }
                }
                if (t.children.length) {
                    if (!e) {
                        e = add("div.mm-iconbar");
                    }
                    e.append(t);
                }
            }), e)) {
                this.bind("initMenu:after", () => {
                    this.node.menu.prepend(e);
                });
                let enabledClassname = "mm-menu_iconbar-" + m.position;
                let search = () => {
                    this.node.menu.classList.add(enabledClassname);
                    self.sr_aria(e, "hidden", false);
                };
                let done = () => {
                    this.node.menu.classList.remove(enabledClassname);
                    self.sr_aria(e, "hidden", true);
                };
                if ("boolean" == typeof m.use ? this.bind("initMenu:after", search) : map(m.use, search, done), "tabs" == m.type) {
                    e.classList.add("mm-iconbar_tabs");
                    e.addEventListener("click", (event) => {
                        var t = event.target;
                        if (t.matches("a")) {
                            if (t.matches(".mm-iconbar__tab_selected")) {
                                event.stopImmediatePropagation();
                            } else {
                                try {
                                    var alternator = this.node.menu.querySelector(t.getAttribute("href"))[0];
                                    if (alternator && alternator.matches(".mm-panel")) {
                                        event.preventDefault();
                                        event.stopImmediatePropagation();
                                        this.openPanel(alternator, false);
                                    }
                                } catch (e) {
                                }
                            }
                        }
                    });
                    const handler = (chk) => {
                        resolve(e, "a").forEach((focusedObj) => {
                            focusedObj.classList.remove("mm-iconbar__tab_selected");
                        });
                        var dayEle = resolve(e, '[href="#' + chk.id + '"]')[0];
                        if (dayEle) {
                            dayEle.classList.add("mm-iconbar__tab_selected");
                        } else {
                            let jField = chk.mmParent;
                            if (jField) {
                                handler(jField.closest(".mm-panel"));
                            }
                        }
                    };
                    this.bind("openPanel:start", handler);
                }
            }
        },
        iconPanels : function() {
            var view = function(value) {
                return "boolean" == typeof value && (value = {
                    add : value
                }), "number" != typeof value && "string" != typeof value || (value = {
                    add : true,
                    visible : value
                }), "object" != typeof value && (value = {}), value;
            }(this.opts.iconPanels);
            this.opts.iconPanels = $(view, self.options.iconPanels);
            var t = false;
            if ("first" == view.visible && (t = true, view.visible = 1), view.visible = Math.min(3, Math.max(1, view.visible)), view.visible++, view.add) {
                this.bind("initMenu:after", () => {
                    var additionArgs = ["mm-menu_iconpanel"];
                    if (view.hideNavbar) {
                        additionArgs.push("mm-menu_hidenavbar");
                    }
                    if (view.hideDivider) {
                        additionArgs.push("mm-menu_hidedivider");
                    }
                    this.node.menu.classList.add(...additionArgs);
                });
                var args = [];
                if (!t) {
                    var before_cnt = 0;
                    for (; before_cnt <= view.visible; before_cnt++) {
                        args.push("mm-panel_iconpanel-" + before_cnt);
                    }
                }
                this.bind("openPanel:start", (scope) => {
                    var list = callback(this.node.pnls, ".mm-panel");
                    if (!(scope = scope || list[0]).parentElement.matches(".mm-listitem_vertical")) {
                        if (t) {
                            list.forEach((component, childId) => {
                                component.classList[0 == childId ? "add" : "remove"]("mm-panel_iconpanel-first");
                            });
                        } else {
                            list.forEach((focusedObj) => {
                                focusedObj.classList.remove(...args);
                            });
                            list = list.filter((recogs) => {
                                return recogs.matches(".mm-panel_opened-parent");
                            });
                            let t = false;
                            list.forEach((all) => {
                                if (scope === all) {
                                    t = true;
                                }
                            });
                            if (!t) {
                                list.push(scope);
                            }
                            list.forEach((focusedObj) => {
                                focusedObj.classList.remove("mm-hidden");
                            });
                            (list = list.slice(-view.visible)).forEach((e, viewStatus) => {
                                e.classList.add("mm-panel_iconpanel-" + viewStatus);
                            });
                        }
                    }
                });
                this.bind("initListview:after", (e) => {
                    if (view.blockPanel && !e.parentElement.matches(".mm-listitem_vertical") && !callback(e, ".mm-panel__blocker")[0]) {
                        let t = add("a.mm-panel__blocker");
                        t.setAttribute("href", "#" + e.closest(".mm-panel").id);
                        e.prepend(t);
                    }
                });
            }
        },
        keyboardNavigation : function() {
            if (!hide) {
                var item = function(options) {
                    return "boolean" != typeof options && "string" != typeof options || (options = {
                        enable : options
                    }), "object" != typeof options && (options = {}), options;
                }(this.opts.keyboardNavigation);
                if (this.opts.keyboardNavigation = $(item, self.options.keyboardNavigation), item.enable) {
                    let arrowDiv = add("button.mm-tabstart");
                    let photoText = add("button.mm-tabend");
                    let $svSurface = add("button.mm-tabend");
                    this.bind("initMenu:after", () => {
                        if (item.enhance) {
                            this.node.menu.classList.add("mm-menu_keyboardfocus");
                        }
                        run.call(this, item.enhance);
                    });
                    this.bind("initOpened:before", () => {
                        this.node.menu.prepend(arrowDiv);
                        this.node.menu.append(photoText);
                        callback(this.node.menu, ".mm-navbars-top, .mm-navbars-bottom").forEach((rootDOMTravelScope) => {
                            rootDOMTravelScope.querySelectorAll(".mm-navbar__title").forEach((elem) => {
                                elem.setAttribute("tabindex", "-1");
                            });
                        });
                    });
                    this.bind("initBlocker:after", () => {
                        self.node.blck.append($svSurface);
                        callback(self.node.blck, "a")[0].classList.add("mm-tabstart");
                    });
                    let relativePath = "input, select, textarea, button, label, a[href]";
                    const handler = (e) => {
                        e = e || callback(this.node.pnls, ".mm-panel_opened")[0];
                        var name = null;
                        var jField = document.activeElement.closest(".mm-navbar");
                        if (!jField || jField.closest(".mm-menu") != this.node.menu) {
                            if ("default" == item.enable && ((name = resolve(e, ".mm-listview a[href]:not(.mm-hidden)")[0]) || (name = resolve(e, relativePath + ":not(.mm-hidden)")[0]), !name)) {
                                let categoryNames = [];
                                callback(this.node.menu, ".mm-navbars_top, .mm-navbars_bottom").forEach((defaultSounds) => {
                                    categoryNames.push(...resolve(defaultSounds, relativePath + ":not(.mm-hidden)"));
                                });
                                name = categoryNames[0];
                            }
                            if (!name) {
                                name = callback(this.node.menu, ".mm-tabstart")[0];
                            }
                            if (name) {
                                name.focus();
                            }
                        }
                    };
                    this.bind("open:finish", handler);
                    this.bind("openPanel:finish", handler);
                    this.bind("initOpened:after:sr-aria", () => {
                        [this.node.menu, self.node.blck].forEach((e) => {
                            callback(e, ".mm-tabstart, .mm-tabend").forEach((e) => {
                                self.sr_aria(e, "hidden", true);
                                self.sr_role(e, "presentation");
                            });
                        });
                    });
                }
            }
        },
        lazySubmenus : function() {
            var e = function(data) {
                return "boolean" == typeof data && (data = {
                    load : data
                }), "object" != typeof data && (data = {}), data;
            }(this.opts.lazySubmenus);
            this.opts.lazySubmenus = $(e, self.options.lazySubmenus);
            if (e.load) {
                this.bind("initMenu:after", () => {
                    var peaksAtTopTempo = [];
                    resolve(this.node.pnls, "li").forEach((t) => {
                        peaksAtTopTempo.push(...callback(t, this.conf.panelNodetype.join(", ")));
                    });
                    peaksAtTopTempo.filter((recogs) => {
                        return !recogs.matches(".mm-listview_inset");
                    }).filter((recogs) => {
                        return !recogs.matches(".mm-nolistview");
                    }).filter((recogs) => {
                        return !recogs.matches(".mm-nopanel");
                    }).forEach((e) => {
                        e.classList.add("mm-panel_lazysubmenu", "mm-nolistview", "mm-nopanel");
                    });
                });
                this.bind("initPanels:before", (defaults) => {
                    (defaults = defaults || callback(this.node.pnls, this.conf.panelNodetype.join(", "))).forEach((s) => {
                        var p = ".mm-panel_lazysubmenu";
                        var n = resolve(s, p);
                        if (s.matches(p)) {
                            n.unshift(s);
                        }
                        n.filter((recogs) => {
                            return !recogs.matches(".mm-panel_lazysubmenu .mm-panel_lazysubmenu");
                        }).forEach((focusedObj) => {
                            focusedObj.classList.remove("mm-panel_lazysubmenu", "mm-nolistview", "mm-nopanel");
                        });
                    });
                });
                this.bind("initOpened:before", () => {
                    var e = [];
                    resolve(this.node.pnls, "." + this.conf.classNames.selected).forEach((t) => {
                        e.push(..._(t, ".mm-panel_lazysubmenu"));
                    });
                    if (e.length) {
                        e.forEach((focusedObj) => {
                            focusedObj.classList.remove("mm-panel_lazysubmenu", "mm-nolistview mm-nopanel");
                        });
                        this.initPanels([e[e.length - 1]]);
                    }
                });
                this.bind("openPanel:before", (s) => {
                    var p = ".mm-panel_lazysubmenu";
                    var n = resolve(s, p);
                    if (s.matches(p)) {
                        n.unshift(s);
                    }
                    if ((n = n.filter((recogs) => {
                        return !recogs.matches(".mm-panel_lazysubmenu .mm-panel_lazysubmenu");
                    })).length) {
                        this.initPanels(n);
                    }
                });
            }
        },
        navbars : function() {
            var order = this.opts.navbars;
            if (void 0 !== order) {
                if (!(order instanceof Array)) {
                    order = [order];
                }
                var children = {};
                if (order.length) {
                    order.forEach((e) => {
                        if (!(e = function(obj) {
                            return "boolean" == typeof obj && obj && (obj = {}), "object" != typeof obj && (obj = {}), void 0 === obj.content && (obj.content = ["prev", "title"]), obj.content instanceof Array || (obj.content = [obj.content]), void 0 === obj.use && (obj.use = true), "boolean" == typeof obj.use && obj.use && (obj.use = true), obj;
                        }(e)).use) {
                            return false;
                        }
                        var result = add("div.mm-navbar");
                        var k = e.position;
                        if ("bottom" !== k) {
                            k = "top";
                        }
                        if (!children[k]) {
                            children[k] = add("div.mm-navbars_" + k);
                        }
                        children[k].append(result);
                        for (let i = 0, l = e.content.length; i < l; i++) {
                            let str = e.content[i];
                            if ("string" == typeof str) {
                                let reporter = cased[str];
                                if ("function" == typeof reporter) {
                                    reporter.call(this, result);
                                } else {
                                    result.innerHTML += str;
                                }
                            } else {
                                result.append(str);
                            }
                        }
                        if ("string" == typeof e.type) {
                            let reporter = eventsToMods[e.type];
                            if ("function" == typeof reporter) {
                                reporter.call(this, result);
                            }
                        }
                        let onQuietFail = () => {
                            result.classList.remove("mm-hidden");
                            self.sr_aria(result, "hidden", false);
                        };
                        let done = () => {
                            result.classList.add("mm-hidden");
                            self.sr_aria(result, "hidden", true);
                        };
                        if ("boolean" != typeof e.use) {
                            map(e.use, onQuietFail, done);
                        }
                    });
                    this.bind("initMenu:after", () => {
                        for (let i in children) {
                            this.node.menu["bottom" == i ? "append" : "prepend"](children[i]);
                        }
                    });
                }
            }
        },
        pageScroll : function() {
            function scrollToForm() {
                if (f) {
                    f.scrollIntoView({
                        behavior : "smooth"
                    });
                }
                f = null;
            }
            function load(data) {
                try {
                    return "#" != data && "#" == data.slice(0, 1) ? self.node.page.querySelector(data) : null;
                } catch (e) {
                    return null;
                }
            }
            var e = function(params) {
                return "boolean" == typeof params && (params = {
                    scroll : params
                }), "object" != typeof params && (params = {}), params;
            }(this.opts.pageScroll);
            this.opts.pageScroll = $(e, self.options.pageScroll);
            var f;
            var moment = this.conf.pageScroll;
            if (e.scroll && this.bind("close:finish", () => {
                scrollToForm();
            }), this.opts.offCanvas && e.scroll && this.clck.push((e, t) => {
                if (f = null, t.inMenu) {
                    var filename = e.getAttribute("href");
                    if (f = load(filename)) {
                        return this.node.menu.matches(".mm-menu_sidebar-expanded") && document.documentElement.matches(".mm-wrapper_sidebar-expanded") ? void scrollToForm() : {
                            close : true
                        };
                    }
                }
            }), e.update) {
                let sections = [];
                this.bind("initListview:after", (value) => {
                    parse(resolve(value, ".mm-listitem")).forEach((t) => {
                        var a = load(t.getAttribute("href"));
                        if (a) {
                            sections.unshift(a);
                        }
                    });
                });
                let min = -1;
                window.addEventListener("scroll", (i) => {
                    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                    var i = 0;
                    for (; i < sections.length; i++) {
                        if (sections[i].offsetTop < scrollY + moment.updateOffset) {
                            if (min !== i) {
                                min = i;
                                let elem = parse(resolve(callback(this.node.pnls, ".mm-panel_opened")[0], ".mm-listitem"));
                                if ((elem = elem.filter((recogs) => {
                                    return recogs.matches('[href="#' + sections[i].id + '"]');
                                })).length) {
                                    this.setSelected(elem[0].parentElement);
                                }
                            }
                            break;
                        }
                    }
                });
            }
        },
        searchfield : function() {
            var options = function(o) {
                return "boolean" == typeof o && (o = {
                    add : o
                }), "object" != typeof o && (o = {}), "boolean" == typeof o.panel && (o.panel = {
                    add : o.panel
                }), "object" != typeof o.panel && (o.panel = {}), "panel" == o.addTo && (o.panel.add = true), o.panel.add && (o.showSubPanels = false, o.panel.splash && (o.cancel = true)), o;
            }(this.opts.searchfield);
            this.opts.searchfield = $(options, self.options.searchfield);
            this.conf.searchfield;
            if (options.add) {
                this.bind("close:start", () => {
                    resolve(this.node.menu, ".mm-searchfield").forEach((old_parent) => {
                        old_parent.blur();
                    });
                });
                this.bind("initPanels:after", (results) => {
                    var data = null;
                    if (options.panel.add) {
                        data = show.call(this, results);
                    }
                    var result = null;
                    switch(options.addTo) {
                        case "panels":
                            result = results;
                            break;
                        case "panel":
                            result = [data];
                            break;
                        default:
                            if ("string" == typeof options.addTo) {
                                result = resolve(this.node.menu, options.addTo);
                            } else {
                                if ("array" == typeOf(options.addTo)) {
                                    result = options.addTo;
                                }
                            }
                    }
                    result.forEach((id) => {
                        id = init.call(this, id);
                        if (options.search && id) {
                            create.call(this, id);
                        }
                    });
                    if (options.noResults) {
                        (options.panel.add ? [data] : results).forEach((p1__3354_SHARP_) => {
                            __alloyId9.call(this, p1__3354_SHARP_);
                        });
                    }
                });
                this.clck.push(($content, canCreateDiscussions) => {
                    if (canCreateDiscussions.inMenu && $content.matches(".mm-searchfield__btn")) {
                        if ($content.matches(".mm-btn_close")) {
                            let e = resolve($content.closest(".mm-searchfield"), "input")[0];
                            return e.value = "", this.search(e), true;
                        }
                        if ($content.matches(".mm-btn_next")) {
                            let messageForm = $content.closest("form");
                            return messageForm && messageForm.submit(), true;
                        }
                    }
                });
            }
        },
        sectionIndexer : function() {
            var o = function(o) {
                return "boolean" == typeof o && (o = {
                    add : o
                }), "object" != typeof o && (o = {}), o;
            }(this.opts.sectionIndexer);
            this.opts.sectionIndexer = $(o, self.options.sectionIndexer);
            if (o.add) {
                this.bind("initPanels:after", (canCreateDiscussions) => {
                    if ("panels" != o.addTo && resolve(this.node.menu, o.addTo).filter((recogs) => {
                        return recogs.matches(".mm-panel");
                    }), !this.node.indx) {
                        let result = "";
                        "abcdefghijklmnopqrstuvwxyz".split("").forEach((canCreateDiscussions) => {
                            result = result + ('<a href="#">' + canCreateDiscussions + "</a>");
                        });
                        let message = add("div.mm-sectionindexer");
                        message.innerHTML = result;
                        this.node.pnls.prepend(message);
                        this.node.indx = message;
                        this.node.indx.addEventListener("click", (event) => {
                            if (event.target.matches("a")) {
                                event.preventDefault();
                            }
                        });
                        let init = (event) => {
                            if (event.target.matches("a")) {
                                var day = event.target.textContent;
                                var n = callback(this.node.pnls, ".mm-panel_opened")[0];
                                var y = -1;
                                var level = n.scrollTop;
                                n.scrollTop = 0;
                                resolve(n, ".mm-divider").filter((recogs) => {
                                    return !recogs.matches(".mm-hidden");
                                }).forEach((e) => {
                                    if (y < 0 && day == e.textContent.trim().slice(0, 1).toLowerCase()) {
                                        y = e.offsetTop;
                                    }
                                });
                                n.scrollTop = y > -1 ? y : level;
                            }
                        };
                        if (hide) {
                            this.node.indx.addEventListener("touchstart", init);
                            this.node.indx.addEventListener("touchmove", init);
                        } else {
                            this.node.indx.addEventListener("mouseover", init);
                        }
                    }
                    this.bind("openPanel:start", (e) => {
                        var following = resolve(e, ".mm-divider").filter((recogs) => {
                            return !recogs.matches(".mm-hidden");
                        }).length;
                        this.node.indx.classList[following ? "add" : "remove"]("mm-sectionindexer_active");
                    });
                });
            }
        },
        setSelected : function() {
            var e = function(obj) {
                return "boolean" == typeof obj && (obj = {
                    hover : obj,
                    parent : obj
                }), "object" != typeof obj && (obj = {}), obj;
            }(this.opts.setSelected);
            if (this.opts.setSelected = $(e, self.options.setSelected), "detect" == e.current) {
                const render = (from) => {
                    from = from.split("?")[0].split("#")[0];
                    var ele = this.node.menu.querySelector('a[href="' + from + '"], a[href="' + from + '/"]');
                    if (ele) {
                        this.setSelected(ele.parentElement);
                    } else {
                        var cancelTextAry = from.split("/").slice(0, -1);
                        if (cancelTextAry.length) {
                            render(cancelTextAry.join("/"));
                        }
                    }
                };
                this.bind("initMenu:after", () => {
                    render.call(this, window.location.href);
                });
            } else {
                if (!e.current) {
                    this.bind("initListview:after", (e) => {
                        resolve(e, ".mm-listitem_selected").forEach((focusedObj) => {
                            focusedObj.classList.remove("mm-listitem_selected");
                        });
                    });
                }
            }
            if (e.hover) {
                this.bind("initMenu:after", () => {
                    this.node.menu.classList.add("mm-menu_selected-hover");
                });
            }
            if (e.parent) {
                this.bind("openPanel:finish", (tokenObject) => {
                    resolve(this.node.pnls, ".mm-listitem_selected-parent").forEach((focusedObj) => {
                        focusedObj.classList.remove("mm-listitem_selected-parent");
                    });
                    var t = tokenObject.mmParent;
                    for (; t;) {
                        if (!t.matches(".mm-listitem_vertical")) {
                            t.classList.add("mm-listitem_selected-parent");
                        }
                        t = (t = t.closest(".mm-panel")).mmParent;
                    }
                });
                this.bind("initMenu:after", () => {
                    this.node.menu.classList.add("mm-menu_selected-parent");
                });
            }
        },
        sidebar : function() {
            if (this.opts.offCanvas) {
                var context = function(obj) {
                    return ("string" == typeof obj || "boolean" == typeof obj && obj || "number" == typeof obj) && (obj = {
                        expanded : obj
                    }), "object" != typeof obj && (obj = {}), "boolean" == typeof obj.collapsed && obj.collapsed && (obj.collapsed = {
                        use : true
                    }), "string" != typeof obj.collapsed && "number" != typeof obj.collapsed || (obj.collapsed = {
                        use : obj.collapsed
                    }), "object" != typeof obj.collapsed && (obj.collapsed = {}), "boolean" == typeof obj.expanded && obj.expanded && (obj.expanded = {
                        use : true
                    }), "string" != typeof obj.expanded && "number" != typeof obj.expanded || (obj.expanded = {
                        use : obj.expanded
                    }), "object" != typeof obj.expanded && (obj.expanded = {}), obj;
                }(this.opts.sidebar);
                this.opts.sidebar = $(context, self.options.sidebar);
                var enabledClassname = "mm-wrapper_sidebar-collapsed";
                var selector = "mm-wrapper_sidebar-expanded";
                if (context.collapsed.use) {
                    this.bind("initMenu:after", () => {
                        if (this.node.menu.classList.add("mm-menu_sidebar-collapsed"), context.collapsed.blockMenu && this.opts.offCanvas && !callback(this.node.menu, ".mm-menu__blocker")[0]) {
                            let a_element = add("a.mm-menu__blocker");
                            a_element.setAttribute("href", "#" + this.node.menu.id);
                            this.node.menu.prepend(a_element);
                        }
                        if (context.collapsed.hideNavbar) {
                            this.node.menu.classList.add("mm-menu_hidenavbar");
                        }
                        if (context.collapsed.hideDivider) {
                            this.node.menu.classList.add("mm-menu_hidedivider");
                        }
                    });
                    let select = () => {
                        document.documentElement.classList.add(enabledClassname);
                    };
                    let show = () => {
                        document.documentElement.classList.remove(enabledClassname);
                    };
                    if ("boolean" == typeof context.collapsed.use) {
                        this.bind("initMenu:after", select);
                    } else {
                        map(context.collapsed.use, select, show);
                    }
                }
                if (context.expanded.use) {
                    this.bind("initMenu:after", () => {
                        this.node.menu.classList.add("mm-menu_sidebar-expanded");
                    });
                    let select = () => {
                        document.documentElement.classList.add(selector);
                        if (!document.documentElement.matches(".mm-wrapper_sidebar-closed")) {
                            this.open();
                        }
                    };
                    let done = () => {
                        document.documentElement.classList.remove(selector);
                        this.close();
                    };
                    if ("boolean" == typeof context.expanded.use) {
                        this.bind("initMenu:after", select);
                    } else {
                        map(context.expanded.use, select, done);
                    }
                    this.bind("close:start", () => {
                        if (document.documentElement.matches("." + selector)) {
                            document.documentElement.classList.add("mm-wrapper_sidebar-closed");
                        }
                    });
                    this.bind("open:start", () => {
                        document.documentElement.classList.remove("mm-wrapper_sidebar-closed");
                    });
                    this.clck.push((canCreateDiscussions, f) => {
                        if (f.inMenu && f.inListview && document.documentElement.matches(".mm-wrapper_sidebar-expanded")) {
                            return {
                                close : false
                            };
                        }
                    });
                }
            }
        },
        toggles : function() {
            this.bind("initPanels:after", (wrappersTemplates) => {
                wrappersTemplates.forEach((e) => {
                    resolve(e, "input").forEach((instrumented) => {
                        next(instrumented, this.conf.classNames.toggles.toggle, "mm-toggle");
                        next(instrumented, this.conf.classNames.toggles.check, "mm-check");
                    });
                });
            });
        }
    };
    self.wrappers = {
        angular : function() {
            this.opts.onClick = {
                close : true,
                preventDefault : false,
                setSelected : true
            };
        },
        bootstrap : function() {
            function render(e) {
                var obj = add(e.matches("a") ? "a" : "span");
                var names = ["href", "title", "target"];
                var i = 0;
                for (; i < names.length; i++) {
                    if (void 0 !== e.getAttribute(names[i])) {
                        obj.setAttribute(names[i], e.getAttribute(names[i]));
                    }
                }
                return obj.innerHTML = e.innerHTML, resolve(obj, ".sr-only").forEach((inventoryService) => {
                    inventoryService.remove();
                }), obj;
            }
            function init(prop) {
                var result = add("ul");
                return callback(prop).forEach((e) => {
                    var t = add("li");
                    if (e.matches(".dropdown-divider")) {
                        t.classList.add("Divider");
                    } else {
                        if (e.matches(".dropdown-item")) {
                            t.append(render(e));
                        }
                    }
                    result.append(t);
                }), result;
            }
            if (this.node.menu.matches(".navbar-collapse")) {
                this.conf.clone = false;
                var result = add("nav");
                var t = add("div");
                result.append(t);
                callback(this.node.menu).forEach((e) => {
                    switch(true) {
                        case e.matches(".navbar-nav"):
                            t.append(function(obj) {
                                var result = add("ul");
                                return resolve(obj, ".nav-item").forEach((a) => {
                                    var t = add("li");
                                    if (a.matches(".active") && t.classList.add("Selected"), !a.matches(".nav-link")) {
                                        let doc = callback(a, ".dropdown-menu")[0];
                                        if (doc) {
                                            t.append(init(doc));
                                        }
                                        a = callback(a, ".nav-link")[0];
                                    }
                                    t.prepend(render(a));
                                    result.append(t);
                                }), result;
                            }(e));
                            break;
                        case e.matches(".dropdown-menu"):
                            t.append(init(e));
                            break;
                        case e.matches(".form-inline"):
                            this.conf.searchfield.form = {
                                action : e.getAttribute("action") || null,
                                method : e.getAttribute("method") || null
                            };
                            this.conf.searchfield.input = {
                                name : e.querySelector("input").getAttribute("name") || null
                            };
                            this.conf.searchfield.clear = false;
                            this.conf.searchfield.submit = true;
                            break;
                        default:
                            t.append(e.cloneNode(true));
                    }
                });
                this.bind("initMenu:before", () => {
                    document.body.prepend(result);
                    this.node.menu = result;
                });
                var element = this.node.menu.parentElement.querySelector(".navbar-toggler");
                element.removeAttribute("data-target");
                element.removeAttribute("aria-controls");
                element.outerHTML = element.outerHTML;
                element.addEventListener("click", (event) => {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    this[this.vars.opened ? "close" : "open"]();
                });
            }
        },
        olark : function() {
            this.conf.offCanvas.page.noSelector.push("#olark");
        },
        turbolinks : function() {
            var value;
            document.addEventListener("turbolinks:before-visit", (canCreateDiscussions) => {
                value = function(serverElements, userJQuery) {
                    var queriedSelectors = [];
                    var i = 0;
                    for (; i < serverElements.length; i++) {
                        let selector = serverElements[i];
                        if (userJQuery(selector)) {
                            queriedSelectors.push(selector);
                        }
                    }
                    return queriedSelectors;
                }((value = document.documentElement.className).split(" "), (httpToken) => {
                    return !/mm-/.test(httpToken);
                }).join(" ");
            });
            document.addEventListener("turbolinks:load", (canCreateDiscussions) => {
                if (void 0 !== value) {
                    document.documentElement.className = value;
                }
            });
        },
        wordpress : function() {
            this.conf.classNames.selected = "current-menu-item";
            var pbElement = document.getElementById("wpadminbar");
            if (pbElement) {
                pbElement.style.position = "fixed";
                pbElement.classList.add("mm-slideout");
            }
        }
    };
    window.Mmenu = self;
    if (Observable = window.jQuery || window.Zepto || null) {
        Observable.fn.mmenu = function(options, suggestedVariableValueCallback) {
            var store = Observable();
            return this.each((i, nav) => {

                if (nav.mmenu) {
                    return;
                }
            //    let opts = new self(nav, options, suggestedVariableValueCallback);
                let container = Observable(opts.node.menu);
                container.data("mmenu", opts.API);
                store = store.add(container);
            }), store;
        };
    }
}]);
