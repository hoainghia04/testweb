'use strict'
var body = $('body');
var html = $('html');
var windowwidth = $(window).width();
var footer = $('.footer-ht');
var header = $('.header');
var sfooter = $('.footer-sht');


$(document).ready(function () {

    /* page load as iframe */
    if (self !== top) {
        body.addClass('iframe');
    } else {
        body.removeClass('iframe');
    }

    /* menu open close */
    $('.menu-btn').on('click', function () {
        if (html.hasClass('menu-open') === true) {
            html.removeClass('menu-open');
        } else {
            html.addClass('menu-open');
        }
        return false;
    });
});

$(window).on('load', function () {

    /* loader hider */
    setTimeout(function () {
        $('.loader-wrap').hide();
    }, 100)

    coverimg();

    /* url path on menu */
    var path = window.location.href.split("/").slice(-1); // because the 'href' property of the DOM element is the absolute path
    $('.sidebar-wrap .nav li a').removeClass('active');
    $('.sidebar-wrap .sidebar .nav li a').each(function () {
        var linkitem = $(this);

        if (linkitem.attr('href') == path) {
            linkitem.addClass("active");

            if (linkitem.closest('.dropdown').length > 0) {
                linkitem.closest('.dropdown').find('.dropdown-toggle').addClass('show')
                linkitem.closest('.dropdown').find('.dropdown-menu').addClass('show')
            }
        }
    });

    /* popover executes */
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })

    /* all tooltip execute */
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    /* hide tooltip after 1000ms once shown */
    document.addEventListener('shown.bs.tooltip', function (e) {
        setTimeout(function () {
            $(e.target).tooltip('hide');
        }, 500);
    })

    /* scroll from top and add class */
    if ($(document).scrollTop() > '30') {
        $('.header').addClass('active');
    } else {
        $('.header').removeClass('active');
    }

    /* chosen title filter dd */
    if ($('.simplechosen').length > 0) {
        $('.simplechosen').chosen();
    }

    if ($('.multichosen').length > 0) {
        /* chosen title filter dd */
        $(".multichosen").chosen({ no_results_text: "Oops, nothing found!", max_selected_options: 2 });
        $(".multichosen").bind("chosen:maxselected", function () {
            $(this).closest('.form-group').next('.invalid-feedback').show()
        });
        $(".multichosen").chosen().change(function () {
            if ($(this).find('option:selected').length < 2) {
                $(this).closest('.form-group').next('.invalid-feedback').hide()
            }
        });
    };

    /* filter sliders range picker for filter */
    if ($('#rangeslider').length > 0) {
        var html5Slider = document.getElementById('rangeslider');
        noUiSlider.create(html5Slider, {
            start: [100, 200],
            connect: true,
            range: {
                'min': 0,
                'max': 500
            }
        });
        var inputNumber = document.getElementById('input-number');
        var select = document.getElementById('input-select');

        html5Slider.noUiSlider.on('update', function (values, handle) {
            var value = values[handle];

            if (handle) {
                inputNumber.value = Math.round(value);
            } else {
                select.value = Math.round(value);
            }
        });
        select.addEventListener('change', function () {
            html5Slider.noUiSlider.set([this.value, null]);
        });
        inputNumber.addEventListener('change', function () {
            html5Slider.noUiSlider.set([null, this.value]);
        });

    }

    /* increamenter ui */
    if ($('.increamenter').length > 0) {

        $('.increamenter > .btn:first-child').on('click', function () {
            var number = $(this).closest('.increamenter').find('.form-control').val();
            number = parseInt(number) - 1;
            if (number >= 0) {
                $(this).closest('.increamenter').find('.form-control').val(number)
            }
        })

        $('.increamenter > .btn:last-child').on('click', function () {
            var number = $(this).closest('.increamenter').find('.form-control').val();
            number = parseInt(number) + 1;
            if (number >= 0) {
                $(this).closest('.increamenter').find('.form-control').val(number)
            }
        })

    }

    /* overflow y scroll min height */
    var windowheight = $(window).innerHeight();
    if (header.length > 0) {
        if (sfooter.length > 0) {
            windowheight = windowheight - header.outerHeight() - sfooter.outerHeight();
            $('.page-content').css({ 'min-height': windowheight + 'px', 'max-height': windowheight + 'px', })
        } else if (footer.length > 0) {
            windowheight = windowheight - header.outerHeight() - footer.outerHeight();
            $('.page-content').css({ 'min-height': windowheight + 'px', 'max-height': windowheight + 'px', });
        } else {
            windowheight = windowheight - header.outerHeight();
            $('.page-content').css({ 'max-height': windowheight + 'px', 'min-height': windowheight + 'px' })
        }
    }

});


$('.page-content').on('scroll', function () {

    /* scroll from top and add class */
    if ($('.page-content').scrollTop() > '30') {
        $('.header').addClass('active');
    } else {
        $('.header').removeClass('active');
    }

});


$(window).on('resize', function () {
    /* update window width for columns set on resize */
    windowwidth = $(window).width();

    /* overflow y scroll min height */
    var windowheight = $(window).innerHeight();
    if (header.length > 0) {
        if (sfooter.length > 0) {
            windowheight = windowheight - header.outerHeight() - sfooter.outerHeight();
            $('.page-content').css({ 'min-height': windowheight + 'px', 'max-height': windowheight + 'px', })
        } else if (footer.length > 0) {
            windowheight = windowheight - header.outerHeight() - footer.outerHeight();
            $('.page-content').css({ 'min-height': windowheight + 'px', 'max-height': windowheight + 'px', });
        } else {
            windowheight = windowheight - header.outerHeight();
            $('.page-content').css({ 'max-height': windowheight + 'px', 'min-height': windowheight + 'px' })
        }
    }


});

/* coverimg */
function coverimg() {
    $('.coverimg').each(function () {
        var imgpath = $(this).find(' > img');
        $(this).css('background-image', 'url(' + imgpath.attr('src') + ')');
        imgpath.hide();
    });
}

/* create cookie */
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";  path=/; SameSite=None; Secure";
}
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";

}
function removeCookie(cname) {
    document.cookie = cname + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

/* animate value */
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
