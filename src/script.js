$(document).ready(function() {
	//navigation functionality
	$('#nav li.link').each(function(){
		var that = $(this)
		;
		that
			.bind('mouseenter', function(){
			that.css({	'-moz-box-shadow' : '0 0 5px #808080',
						'-webkit-box-shadow' : '0 0 5px #808080',
						'box-shadow' : '0 0 5px #808080'
				}).fadeIn('fast')
			.find('ul').fadeIn('slow');
			})
			.bind('mouseleave', function(){
				that.css({ '-moz-box-shadow' : 'none',
							'-webkit-box-shadow' : 'none',
							'box-shadow' : 'none'
				});
			that.find('ul').fadeOut('fast');
			})
	});
	
	//tabs functionality
	$('.tab-content').hide();
	
	$('#tabs-nav li:first').addClass('active').show();
		
	$('.tab-content:first').show();
	
	$('#tabs-nav li').click(function(){
		$('#tabs-nav li').removeClass('active');
		$(this).addClass('active');
		$('.tab-content').hide();
		
		var activeTab = $(this).find('a').attr('href');
		$(activeTab).show();
		return false;
	});

}); //end document ready





