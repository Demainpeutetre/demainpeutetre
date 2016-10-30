//update tags list from instafeed
function updateTags() {

    //make list
    var html = '<li class="all">all</li>';
    for (var e in tags) {
        html = html + '<li>' + tags[e] + '</li>';
    }

    //refresh list
    $('#tags').html(html);

    //click on tag
    $('#tags li').on("click", function () {
        var c = $(this).html();

        $('#instagram a').each(function () {
            if (!$(this).hasClass(c)) {
                $(this).fadeOut();
            } else {
                $(this).fadeIn();
            }
        });
    });

    //click on tag "all"
    $('#tags li.all').on("click", function () {
        $('#instagram a').show();
    });
}

//result buffer
var result = null;

//init tags list
var tags = [];

//set nb of image per call
var nb_image_par_call = 12;

//set call index to 1 (because first call auton on init)
var call_index = 1;

//init instafeed
var feed = new Instafeed({
    get: 'user',
    limit: nb_image_par_call,
    userId: 4034986418,
    clientId: 'c82f268229d34673b0b4c1d6a75222b0',
    accessToken: '4034986418.1677ed0.a4168a68457c4a62a6ebae8d77340ace',
    target: 'instagram',
    resolution: 'standard_resolution',
    template: '<a class="fancybox" rel="gallery1" href="{{model.images.standard_resolution.url}}"><img class="instagram-image" src="{{image}}" /></a>',
    after: function () {

        //set image classes with first tag
        for (var i in result.data) {

            //if photo has tags
            if (result.data[i].tags.length) {

                //calc offset
                var offset = (call_index - 1) * nb_image_par_call;

                //define index
                var index = parseInt(i) + parseInt(offset);

                //loop on tags
                for (var t in result.data[i].tags) {
                    //if tag doesn't exists in tags list, we add it
                    if (tags.indexOf(result.data[i].tags[t]) === -1) {
                        tags.push(result.data[i].tags[t]);
                    }

                    //add tag as class to image
                    $('#instagram a').eq(index).addClass(result.data[i].tags[t]);
                }
            }
        }

        //update tags
        updateTags();

        // disable button if no more results to load
        if (!this.hasNext()) {
            $('#pagination').addClass('hidden');
        }

    },
    success: function (r) {
        result = r;
    }
});

// bind the load more button
$('#pagination').click(function () {
    feed.next();
    call_index++;
});

feed.run();

//NAVBAR

$(document).ready(function () {

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

$(document).ready(function () {
    $(".fancybox").fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic',
    });
});

//PROFILE

(function ($) {
    $(function () {
        $('.toggle-overlay').click(function () {
            $('aside').toggleClass('open');
        });
    });
})(jQuery);

/*
  Slidemenu
*/
(function() {
  var $body = document.body,
    $menu_trigger = $body.getElementsByClassName('menu-trigger')[0];

  if (typeof $menu_trigger !== 'undefined') {
    $menu_trigger.addEventListener('click', function() {
      $body.className = ($body.className == 'menu-active') ? '' : 'menu-active';
    });
  }

}).call(this);
