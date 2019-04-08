
jQuery(document).ready(function () {

    jQuery('.product-carousel').owlCarousel({
        loop:true,
        margin:10,
        dots:true,
        nav:true,
        navText: ["<img src='//cdn.shopify.com/s/files/1/2405/7229/t/8/assets/LeftArrow.svg?0'>","<img src='//cdn.shopify.com/s/files/1/2405/7229/t/8/assets/RightArrow.svg?0'>"],

        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:3
            }
        }
    })
});

jQuery(window).scroll(function() {
    var scroll = jQuery(window).scrollTop();

        //>=, not <=
        if (scroll >= 100) {
            //clearHeader, not clearheader - caps H
            jQuery(".header-container").addClass("is_active");
        }
        else{
            jQuery(".header-container").removeClass("is_active");
        }
    }); //missing );

jQuery(document).ready(function () {
    jQuery('.search-icon').click(function(){
        jQuery(this).addClass('search-active');
        jQuery(this).closest('.input-box').addClass('is_search_active')
    });
    jQuery('.menu-close-mobile').click(function(){
        jQuery('.main-navigation').removeClass('nav-active');
    })
    jQuery('.hamburger-menu').click(function(){
        jQuery('.main-navigation').toggleClass('nav-active');
    });
    jQuery('#search').focus(function(){
        jQuery(this).addClass('search-active');
        jQuery(this).closest('.input-box').addClass('is_search_active')
    }).blur(function () {
        jQuery('#search').removeClass('search-active')
        jQuery('.input-box').removeClass('is_search_active')
    });;
    var headerHeight = jQuery('.header-container').outerHeight();
    jQuery('body:not(.cms-home)').css({'paddingTop': headerHeight});
});