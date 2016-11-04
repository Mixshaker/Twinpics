"use strict";

$(function() {
    let img_array = ["https://kde.link/test/1.png",
        "https://kde.link/test/2.png",
        "https://kde.link/test/9.png",
        "https://kde.link/test/7.png",
        "https://kde.link/test/6.png",
        "https://kde.link/test/3.png",
        "https://kde.link/test/4.png",
        "https://kde.link/test/0.png",
        "https://kde.link/test/5.png",
        "https://kde.link/test/8.png"
    ];

    $.getJSON("https://kde.link/test/get_field_size.php", function(data) {
        let w = data["width"],
            h = data["height"],
            field = w * h,
            half_field = field / 2;

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
            arr1.push(i);
        }

        // arr2 = 2nd half of array (copy and sort of arr1)
        arr2 = arr1.slice();
        arr = arr1.concat(arr2);
        arr.sort(compareRandom);

        // insert images to container
        for (let l = 0; l < arr.length; l++) {
            $('.container').append('<div class="block" id="id' + l + '"><img src="https://kde.link/test/' + arr[l] + '.png" class="hidden" data-id="' + arr[l] + '" alt=""></div>');
        }

        // max 10 images
        $('.block').each(function() {
            if ($(this).find('img').data('id') > 9) {
                $(this).addClass('undef');
            }
        });

        let check = false,
            sel, //selected element
            selid = 0, //selected id
            steps = 0,
            open = 0,
            cell = $('.block'); //select block


        function qwe(e) {
            let el = e.target.firstChild;
            if (el.className.indexOf('hidden') > -1) {
                steps++;
                el.className = el.className.replace('hidden', '');

                function timeOutClick() {
                    //if click on 2nd image in the pair
                    if (check) {
                        check = false;
                        // if images coincide
                        if (el.getAttribute('data-id') == selid) {
                            open++;
                            if (open == field / 2) alert('Вы прошли игру за ' + steps + ' шагов.');
                        } else {
                            //hide block
                            sel.className += ' hidden';
                            el.className += ' hidden';
                        }
                    } else {
                        //if click on 1st image in the pair
                        selid = el.getAttribute('data-id');
                        sel = el;
                        check = true;
                    }
                }

                // timeout to see image on clicked block
                setTimeout(timeOutClick, 100);
            }
        }

        //
        for (let l = 0; l < field; l++) {
            cell[l].addEventListener('click', qwe);
        }




    }); //getJson
})