$(document).ready(function(){
    
	// Модальное окно
	$('.showwin').click(function(){
		$('#jquerywin .modal-dialog').css('margin-top', '-25%'); // поднимаем modal-dialog, чтобы потом плавно спустить
        $('#jquerywin').fadeIn()
		.css({'background': 'rgba(102, 102, 102, 0.5)', 'overflow-y': 'auto'}); // фон и скролл, если контент не помещается
		$('body').css({'overflow-y': 'hidden', 'padding-right': '17px'}); // скрытие скролла у body и сдвиг на величину скролла при активации модального окна
		$('[class*="fixed-"]').css('right', '17px'); // сдвиг на величину скролла для бутстраповских классов fixed-top и fixed-bottom
		$('#top-button').removeClass("scroll-to-top"); // скрытие скролла наверх
		$('#jquerywin .modal-dialog').animate({'margin-top': '1.75rem'}, 500); // опускаем modal-dialog до середины (если ширина экрана меньше 576px, то середина - 0.5rem, если больше - 1.75rem)
    });
	$('.hidewin, #jquerywin').click(function(){ // #jquerywin - для закрытия при клике на фон
        $('#jquerywin .modal-dialog').animate({'margin-top': '-25%'}, 250);
		$('#jquerywin').fadeOut(function(){
			$('#jquerywin, #jquerywin .modal-dialog, [class*="fixed-"], body').removeAttr("style"); // удаление заданных .css()
			$('#top-button').addClass("scroll-to-top"); // показ кнопки скролла наверх
		});
    });
	// блокировка закрытия, при клике в пределах модального окна
	$('#jquerywin .modal-dialog').click(function(event){
		event.stopPropagation();
	});

  // Мягкий скролл c расширенным easing
	$('.js-scroll-trigger').click(function() {
        var id = $(this).attr("href"); // значение якоря
        $("html, body").animate({
            scrollTop: $(id).offset().top - 65 // плавный переход на позицию якоря за минусом на высоты навбара
        }, 1000, 'easeInOutExpo')
		$('.navbar-collapse').collapse('hide'); // закрытие отзывчивого меню 
    });

	// Скроллспай - указания того, какая ссылка в данный момент активна
	$('body').scrollspy({
		target: '#scrollspy', // к чему применяется
		offset: 65 // учитываем высоту навбара
	});
	
	// Управление кнопкой скролла наверх и навбаром
	var scrollCollapse = function() {
		var scrollDistance = $(document).scrollTop(); // позиция окна просмотра с верха страницы
		if (scrollDistance > 200) { // больше n пикселей
		  $('.scroll-to-top').fadeIn();
		  $(".navbar").removeClass("navbar-transparent");
		  $(".nav-link").removeClass("nav-link-transparent");
		} else {
		  $('.scroll-to-top').fadeOut();
		  $(".navbar").addClass("navbar-transparent");
		  $(".nav-link").addClass("nav-link-transparent");
		}
	}
	scrollCollapse(); // если страница загрузилась сразу на позицию больше 300px
	$(document).scroll(scrollCollapse); // вызов scrollCollapse при каждом скролле
	
});