// jQuery('.owl-carousel').owlCarousel({
//     loop:true,
//     margin:10,
//     nav:true,
//     responsive:{
//         0:{
//             items:1
//         },
//         600:{
//             items:3
//         },
//         1000:{
//             items:5
//         }
//     }
// });



(function(){
    var headerHeight = jQuery('header-container').outerHeight();
    jQuery('body').css({'paddingTop': headerHeight});
}());
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