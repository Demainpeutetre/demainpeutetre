//INSTAFEED

var result = null;

var feed = new Instafeed({
	get: 'user',
	userId: 4034986418,
	clientId: 'c82f268229d34673b0b4c1d6a75222b0',
	accessToken: '4034986418.1677ed0.a4168a68457c4a62a6ebae8d77340ace',
	target: 'instagram',
	resolution: 'standard_resolution',
	template: '<a class="fancybox" rel="gallery1" href="{{model.images.standard_resolution.url}}"><img class="instagram-image" src="{{image}}" /></a>',
	after: function() {

		for(var i in result.data) {

			if (result.data[i].tags.length) {
				$('#instagram img').each(function(index) {
					if (index == i) {
						$(this).addClass(result.data[i].tags[0].substr(0));
					}
				});
			}

		}
		// disable button if no more results to load
		if (!this.hasNext())
		$('#pagination').addClass('hidden');
	},
	success: function(r) {
		result = r;
	}
});

// bind the load more button
$('#pagination').click(function() {
	feed.next();
});

feed.run();

//NAVBAR

$(document).ready(function(){

	// hide .navbar first
	$(".navbar").hide();

	// fade in .navbar
	$(function () {
		$(window).scroll(function () {
			// set distance user needs to scroll before we fadeIn navbar
			if ($(this).scrollTop() > 115) {
				$('.navbar').fadeIn();
			} else {
				$('.navbar').fadeOut();
			}
		});


	});

});

//ANIMATE

$('#instagram').addClass('animated fadeIn');

//FANCYBOX

$(document).ready(function() {
	$(".fancybox").fancybox({
		openEffect	: 'elastic',
		closeEffect	: 'elastic',
	});
});

//PROFILE

(function($) {
	$(function() {
		$('.toggle-overlay').click(function() {
			$('aside').toggleClass('open');
		});
	});
})(jQuery);
