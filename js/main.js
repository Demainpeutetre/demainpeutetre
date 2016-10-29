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
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    });

    //click on tag "all"
    $('#tags li.all').on("click", function () {
        $('#instagram a').show();
    });
}

//result buffer
result = null;

//init tags list
tags = [];

//set nb of image per call
nb_image_par_call = 12;

//set call index to 1 (because first call auton on init)
call_index = 1;

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
            if (result.data[i].tags.length) {
                $('#instagram a').each(function (index) {

                  console.log('index: ' + index);
                   console.log('call index: ' + call_index);
                   console.log('test:' + (i + ((call_index - 1) * nb_image_par_call)));

                   if ((index == (i + ((call_index - 1) * nb_image_par_call)))) {

                       console.log ('ok');

                        var tag = result.data[i].tags[0].substr(0);
                        if (tags.indexOf(tag) == -1) {
                            tags.push(tag);
                        }
                        $(this).addClass(tag);
                    }

                    console.log('----------------------------------');

                });
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
