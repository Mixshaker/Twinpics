"use strict";

$(function() {
    let img_array = ["http://mixshaker.pp.ua/twinpics/test/1.png",
        "http://mixshaker.pp.ua/twinpics/test/2.png",
        "http://mixshaker.pp.ua/twinpics/test/9.png",
        "http://mixshaker.pp.ua/twinpics/test/7.png",
        "http://mixshaker.pp.ua/twinpics/test/6.png",
        "http://mixshaker.pp.ua/twinpics/test/3.png",
        "http://mixshaker.pp.ua/twinpics/test/4.png",
        "http://mixshaker.pp.ua/twinpics/test/0.png",
        "http://mixshaker.pp.ua/twinpics/test/5.png",
        "http://mixshaker.pp.ua/twinpics/test/8.png"
    ];

    $.getJSON("http://mixshaker.pp.ua/twinpics/get_field_size.php", function(data) {
        let w = data["width"],
            h = data["height"],
            field = w * h,
            half_field = field / 2;
        console.log(w + " " + h + " " + half_field);

        // container width
        $('.container').width(w * 60 + 'px');

        // random sort in array func.
        function compareRandom(a, b) {
            return Math.random() - 0.5;
        }

        let arr1 = [],
            arr2 = [],
            arr = [];

        // push img.src to 1st half of array
        for (let i = 0; i < half_field; i++) {
            arr1.push({
                id: i,
                value: img_array[i]
            });
        }

        // arr2 = 2nd half of array (copy and sort of arr1)
        arr2 = arr1.slice();
        arr = arr1.concat(arr2);
        arr.sort(compareRandom);

        // insert images to container
        for (let l = 0; l < arr.length; l++) {
            $('.container').append('<div class="block" id="id' + l + '"><img src="' + arr[l]["value"] + '" class="hidden" data-id="' + arr[l]["id"] + '" alt=""></div>');
        }

        // if image is broken or does not exist
        $('.block').each(function() {
            if ($(this).find('img').attr('src') == "undefined") {
                $(this).addClass('undef');
            }
        });

        let check = false,
            sel, //selected element
            selid = 0, //selected id
            steps = 0,
            open = 0;

        //coincide func
        function coincide(e) {
            let el = $(e.target).children();
            if ($(el).hasClass('hidden') > -1) {
                steps++;
                $(el).removeClass('hidden');

                let timeOutClick = function() {
                    //if click on 2nd image in the pair
                    if (check) {
                        check = false;
                        // if images coincide
                        if ($(el).attr('data-id') == selid) {
                            open++;
                            if (open == field / 2) alert('Вы прошли игру за ' + steps + ' шагов.');
                        } else {
                            //hide block
                            $(sel).addClass('hidden');
                            $(el).addClass('hidden');
                        }
                    } else {
                        //if click on 1st image in the pair
                        selid = $(el).attr('data-id');
                        sel = el;
                        check = true;
                    }
                };

                // timeout to see image on clicked block
                setTimeout(timeOutClick, 100);
            }
        }

        //Click Listener
        for (let l = 0; l < field; l++) {
            $('.block').eq(l).on('click', coincide);
        }

    }); //getJson
});