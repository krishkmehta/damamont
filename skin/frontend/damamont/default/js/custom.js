var CustomAccordion = function (el, multiple) {
    console.log(el);
    this.el = el || {};
    this.multiple = multiple || false;

    // Variables privadas
    console.log(this.el);
    var links = this.el.find('a.heading_acc');

    // Evento
    links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown);
    links.first().trigger('click').addClass('open');
}

CustomAccordion.prototype.dropdown = function (e) {

    var $el = e.data.el;

    console.log(jQuery(this));

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

    jQuery("#overlay").click(function(){
        jQuery(this).removeClass('is-active');
        jQuery('.input-box').removeClass('is_search_active');
    });
    jQuery(".header-minicart .skip-cart").click(function(){
        jQuery('.backdrop').addClass('active');
    });
    jQuery('.backdrop').click(function(){
        jQuery(this).removeClass('active');
        jQuery('#header-cart').removeClass('skip-active');
        jQuery('.skip-cart').removeClass('skip-active');
    });
    jQuery('.skip-link-close').click(function(){
        jQuery('.backdrop').removeClass('active');
    });
    
    jQuery('.search-icon').click(function () {
        jQuery(this).addClass('search-active');
        jQuery(this).closest('.input-box').addClass('is_search_active')
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
    jQuery('body:not(.cms-home)').css({'paddingTop': headerHeight});

});