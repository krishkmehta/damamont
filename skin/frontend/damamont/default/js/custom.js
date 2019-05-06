/*
* jquery-match-height 0.7.2 by @liabru
* http://brm.io/jquery-match-height/
* License MIT
*/
!function (t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function (t) {
    var e = -1, o = -1, n = function (t) {
        return parseFloat(t) || 0
    }, a = function (e) {
        var o = 1, a = t(e), i = null, r = [];
        return a.each(function () {
            var e = t(this), a = e.offset().top - n(e.css("margin-top")), s = r.length > 0 ? r[r.length - 1] : null;
            null === s ? r.push(e) : Math.floor(Math.abs(i - a)) <= o ? r[r.length - 1] = s.add(e) : r.push(e), i = a
        }), r
    }, i = function (e) {
        var o = {
            byRow: !0, property: "height", target: null, remove: !1
        };
        return "object" == typeof e ? t.extend(o, e) : ("boolean" == typeof e ? o.byRow = e : "remove" === e && (o.remove = !0), o)
    }, r = t.fn.matchHeight = function (e) {
        var o = i(e);
        if (o.remove) {
            var n = this;
            return this.css(o.property, ""), t.each(r._groups, function (t, e) {
                e.elements = e.elements.not(n)
            }), this
        }
        return this.length <= 1 && !o.target ? this : (r._groups.push({
            elements: this,
            options: o
        }), r._apply(this, o), this)
    };
    r.version = "0.7.2", r._groups = [], r._throttle = 80, r._maintainScroll = !1, r._beforeUpdate = null,
        r._afterUpdate = null, r._rows = a, r._parse = n, r._parseOptions = i, r._apply = function (e, o) {
        var s = i(o), h = t(e), l = [h], c = t(window).scrollTop(), p = t("html").outerHeight(!0),
            u = h.parents().filter(":hidden");
        return u.each(function () {
            var e = t(this);
            e.data("style-cache", e.attr("style"))
        }), u.css("display", "block"), s.byRow && !s.target && (h.each(function () {
            var e = t(this), o = e.css("display");
            "inline-block" !== o && "flex" !== o && "inline-flex" !== o && (o = "block"), e.data("style-cache", e.attr("style")), e.css({
                display: o,
                "padding-top": "0",
                "padding-bottom": "0",
                "margin-top": "0",
                "margin-bottom": "0",
                "border-top-width": "0",
                "border-bottom-width": "0",
                height: "100px",
                overflow: "hidden"
            })
        }), l = a(h), h.each(function () {
            var e = t(this);
            e.attr("style", e.data("style-cache") || "")
        })), t.each(l, function (e, o) {
            var a = t(o), i = 0;
            if (s.target) i = s.target.outerHeight(!1); else {
                if (s.byRow && a.length <= 1) return void a.css(s.property, "");
                a.each(function () {
                    var e = t(this), o = e.attr("style"), n = e.css("display");
                    "inline-block" !== n && "flex" !== n && "inline-flex" !== n && (n = "block");
                    var a = {
                        display: n
                    };
                    a[s.property] = "", e.css(a), e.outerHeight(!1) > i && (i = e.outerHeight(!1)), o ? e.attr("style", o) : e.css("display", "")
                })
            }
            a.each(function () {
                var e = t(this), o = 0;
                s.target && e.is(s.target) || ("border-box" !== e.css("box-sizing") && (o += n(e.css("border-top-width")) + n(e.css("border-bottom-width")), o += n(e.css("padding-top")) + n(e.css("padding-bottom"))), e.css(s.property, i - o + "px"))
            })
        }), u.each(function () {
            var e = t(this);
            e.attr("style", e.data("style-cache") || null)
        }), r._maintainScroll && t(window).scrollTop(c / p * t("html").outerHeight(!0)),
            this
    }, r._applyDataApi = function () {
        var e = {};
        t("[data-match-height], [data-mh]").each(function () {
            var o = t(this), n = o.attr("data-mh") || o.attr("data-match-height");
            n in e ? e[n] = e[n].add(o) : e[n] = o
        }), t.each(e, function () {
            this.matchHeight(!0)
        })
    };
    var s = function (e) {
        r._beforeUpdate && r._beforeUpdate(e, r._groups), t.each(r._groups, function () {
            r._apply(this.elements, this.options)
        }), r._afterUpdate && r._afterUpdate(e, r._groups)
    };
    r._update = function (n, a) {
        if (a && "resize" === a.type) {
            var i = t(window).width();
            if (i === e) return;
            e = i;
        }
        n ? o === -1 && (o = setTimeout(function () {
            s(a), o = -1
        }, r._throttle)) : s(a)
    }, t(r._applyDataApi);
    var h = t.fn.on ? "on" : "bind";
    t(window)[h]("load", function (t) {
        r._update(!1, t)
    }), t(window)[h]("resize orientationchange", function (t) {
        r._update(!0, t)
    })
});
/* End Script match height */
var jQuery = jQuery.noConflict(true);
var CustomAccordion = function (el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;

    var links = this.el.find('a.heading_acc');
    links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown);
    links.first().trigger('click').addClass('open');
}

CustomAccordion.prototype.dropdown = function (e) {

    var $el = e.data.el;

    var $this = jQuery(this),
        $next = $this.next();

    $next.slideToggle();
    $this.toggleClass('open')

    if (!e.data.multiple) {
        $el.find('a.heading_acc').next().not($next).slideUp().prev().removeClass('open');
    }
}


jQuery(document).ready(function ($) {
    var accordion = new CustomAccordion($('.accordion'), false);
    var accordion1 = new CustomAccordion($('.description-accordion'), false);

    jQuery(document).on('click',
        '.collection-review .rating-links a,' +
        '.collection-review .no-rating a', function (e) {
            e.preventDefault();

        })

    jQuery('.product-media-carousel').owlCarousel({
        loop: true,
        margin: 10,
        dots: true,
        nav: true,
        navText: ["<img src='//cdn.shopify.com/s/files/1/2405/7229/t/8/assets/LeftArrow.svg?0'>", "<img src='//cdn.shopify.com/s/files/1/2405/7229/t/8/assets/RightArrow.svg?0'>"],

        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })

    jQuery('.product-carousel').owlCarousel({
        loop: true,
        margin: 10,
        dots: true,
        nav: true,
        navText: ["<img src='//cdn.shopify.com/s/files/1/2405/7229/t/8/assets/LeftArrow.svg?0'>", "<img src='//cdn.shopify.com/s/files/1/2405/7229/t/8/assets/RightArrow.svg?0'>"],

        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    })

    jQuery('.product-widget-carousel').owlCarousel({
        loop: true,
        margin: 10,
        dots: true,
        nav: false,
        navText: ["<img src='//cdn.shopify.com/s/files/1/2405/7229/t/8/assets/LeftArrow.svg?0'>", "<img src='//cdn.shopify.com/s/files/1/2405/7229/t/8/assets/RightArrow.svg?0'>"],

        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    })

    var currencySwitcher = jQuery('.select-language').selectric({
        openOnHover: false,
        onInit: function () {
            var selected = jQuery('#select-language .selectric-items .selected span')[0];
            jQuery(selected).clone().prependTo('#select-language .selectric .label');
            jQuery('#select-language .selectric-items .selected').remove();
            //var selected1 = jQuery('#select-language1 .selectric-items .selected span')[0];
            //jQuery(selected1).clone().prependTo('#select-language1 .selectric .label');
            //jQuery('#select-language1 .selectric-items .selected').remove();
        }, optionsItemBuilder: function (itemData, element, index) {
            var flags = itemData.element.data('flag');
            return element.val().length ? '<span style="background-image: url(' + flags + ')" class="ico ico-' + itemData.text + '"></span>' + itemData.text : itemData.text;

        }, onChange: function (element) {
            jQuery(element).change();
        }
    });

});

jQuery(window).scroll(function () {
    var scroll = jQuery(window).scrollTop();

    //>=, not <=
    if (scroll >= 100) {
        //clearHeader, not clearheader - caps H
        jQuery(".header-container").addClass("is_active");
    } else {
        jQuery(".header-container").removeClass("is_active");
    }
}); //missing );

jQuery(document).ready(function () {

    jQuery("#overlay").click(function () {
        jQuery(this).removeClass('is-active');
        jQuery('.input-box').removeClass('is_search_active');
        jQuery('#fme_filters_list').addClass('no-display');
    });
    jQuery(".header-minicart .skip-cart").click(function () {
        jQuery('.backdrop').addClass('active');
    });
    jQuery('.backdrop').click(function () {
        jQuery(this).removeClass('active');
        jQuery('#header-cart').removeClass('skip-active');
        jQuery('.skip-cart').removeClass('skip-active');
    });
    jQuery('.skip-link-close').click(function () {
        jQuery('.backdrop').removeClass('active');
    });

    jQuery('.search-icon').click(function () {
        jQuery(this).addClass('search-active');
        jQuery(this).closest('.input-box').addClass('is_search_active')
        jQuery(this).next('input').focus();
        jQuery('#overlay').addClass('is-active');
    });
    jQuery('.menu-close-mobile').click(function () {
        jQuery('.main-navigation').removeClass('nav-active');
    })
    jQuery('.hamburger-menu').click(function () {
        jQuery('.main-navigation').toggleClass('nav-active');
    });
    jQuery('#search').focus(function () {
        jQuery(this).addClass('search-active');
        jQuery(this).closest('.input-box').addClass('is_search_active')
    }).blur(function () {
        jQuery('#search').removeClass('search-active')
        jQuery('.input-box').removeClass('is_search_active')
    });
    ;
    var headerHeight = jQuery('.header-container').outerHeight();
    // jQuery('body:not(.cms-home)').css({'paddingTop': headerHeight});
    // jQuery(".popup-flag2").simplePopup({ type: "html", htmlSelector: "#flag-container2" });
    jQuery(document).on('click', '.mobile-element', function () {
        jQuery('#fme_filters_list').addClass('no-display');
        jQuery('#overlay').removeClass('is-active');
    });
    jQuery(document).on('click', '.filter-toggle', function () {
        jQuery('#fme_filters_list').toggleClass('no-display');
        jQuery('#overlay').addClass('is-active');
    });
});

jQuery(document).ready(function ($) {

    jQuery('.popup-flag').click(function () {

        jQuery('#flag-container').simplePopup();
        jQuery('#overlay').addClass('is-active');
    });

    var headerHeight = jQuery('.header-container').outerHeight();
    jQuery('body:not(.cms-home)').css('paddingTop', headerHeight);

    jQuery('.single-colllection h5').matchHeight();
    jQuery('.product-view-img .product-view-text h5').matchHeight();

});

var mmmenu;
jQuery(document).ready(function () {

    jQuery('#tabs li a:not(:first)').addClass('inactive');
    jQuery('.container-tab').hide();
    jQuery('.container-tab:first').show();

    jQuery('#tabs li a').click(function () {
        var t = jQuery(this).attr('id');
        if (jQuery(this).hasClass('inactive')) {

            jQuery('#tabs li a').addClass('inactive');
            jQuery(this).removeClass('inactive');

            jQuery('.container-tab').hide();
            jQuery('#' + t + 'C').fadeIn('slow');
        }
    });
     mmmenu = new Mmenu(document.querySelector('#menu'));

    jQuery(document).on('click','.close-menu img,.mm-navbar .mm-navbar__btn', function () {
        mmmenu.close();
    })

    document.addEventListener('click', (evnt) => {
        let anchor = evnt.target.closest('a[href^="#/"]');
        if (anchor) {

            evnt.preventDefault();
        }
    });
});
