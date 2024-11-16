$(document).ready(function () {
            $('.customer-logos').slick({
                slidesToShow: 6,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 1500,
                arrows: false,
                dots: false,
                pauseOnHover: false,
                responsive: [{
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 4
                    }
                }, {
                    breakpoint: 520,
                    settings: {
                        slidesToShow: 3
                    }
                }]
            });
            $('.owl-carousel').owlCarousel({
                loop: true,
                autoplay: true,
                margin: 10,
                nav: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 1
                    },
                    1000: {
                        items: 1
                    }
                }
            });
            const toggles = document.querySelectorAll(".faq-toggle");
            toggles.forEach((toggle) => {
                toggle.addEventListener("click", () => {
                    toggle.parentNode.classList.toggle("active");
                });
            });

            function ts_browserWidth() {
                return $(window).width();
            }
            /*****
             * "Back to top" button
             *****/
            if ($('#ts-back-to-top').length) {
                $(window).scroll(function () {
                    if (ts_browserWidth() >= 720 || $('body').hasClass('ts-back-to-top-mobile')) {
                        if ($(window).scrollTop() >= 500) {
                            $('#ts-back-to-top').addClass('hello');
                        } else {

                            $('#ts-back-to-top').removeClass('hello');
                        }
                    }
                });
            }
            $('#ts-back-to-top').click(function () {
                $('html, body').animate({
                    scrollTop: 0
                }, 800);
                return false;
            });

        })