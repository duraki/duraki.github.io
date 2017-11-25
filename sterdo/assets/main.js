$(document).ready(function() {

    function dark_theme() {
          
          /** body **/
          $('body').css('background', 'rgb(21, 20, 20)');
          $('body').css('color', 'rgba(255, 255, 255, 0.77)');
          $('a').css('color', '#e25c5c');
          $('hr').css('border-color', '#e8dfdf36');

          /** brutalist **/
          $('.topcorner').css('background', '#303030');
          $('.topcorner').css('height', '100px');
          $('#avatar').css('display', 'none');

          $('.author').css('color', '#303030');
          $('.author').css('background', '#303030');

          /** post **/
          $('pre').css('background', '#4c4c4c4d');
          $('.permalink').css('color', '#968e8e');
          $('#desc').css('background-color', '#fff');
          $('#desc').css('opacity', 0.2);
          $('.post').css('border-color', '#eeeeee36'); 
          $('#title-m').css('color', '#303030');
          $('#title-m').css('background', '#303030');
          $(".go").hover(function(e) { 
            $(this).css('background',e.type === "mouseenter"?"#33181882":"none");
          });

					$(".permalink").css('background', '#303030');
					$('.permalink').css('color', 'rgb(48, 48, 48)');
          $('.permalink').css('height', '10px');

          /** root **/
          $('p').addClass('contrast');
          $("p").hover(function(e) { 
            $(this).css("color",e.type === "mouseenter"?"rgba(255, 255, 255, 0.80)":"rgba(255, 255, 255, 0.77)");
          });

          $(".tag").hover(function(e) { 
            $(this).css("border",e.type === "mouseenter"?"1px solid #f18c8c":"1px solid white");
          });

    }

    $('.tag-right').click(function() {
        dark_theme();
    });

    $('.topcorner').click(function() {
        dark_theme();
    });

});
