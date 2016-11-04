'use strict';

$(function() {
    let field_width,
        field_height,
        img_array = ['https://kde.link/test/1.png',
            'https://kde.link/test/2.png',
            'https://kde.link/test/9.png',
            'https://kde.link/test/7.png',
            'https://kde.link/test/6.png',
            'https://kde.link/test/3.png',
            'https://kde.link/test/4.png',
            'https://kde.link/test/0.png',
            'https://kde.link/test/5.png',
            'https://kde.link/test/8.png'
        ];

    $.getJSON("https://kde.link/test/get_field_size.php", function(data) {
        let w = data["width"],
            h = data["height"],
            box_size = w * h,
            half_box_size = box_size / 2;

        // container width
        $('.container').width(w * 100 + 'px');

        let array1 = [],
            array2 = [],
            array3 = []; // arrays

        // push img.src to 1st half of array
        for (let i = 0; i < half_box_size; i++) {
            array1.push(i);
        }

        // random sort in array func.
        function compareRandom(a, b) {
            return Math.random() - 0.5;
        }

        // array2 = 2nd half of array (copy and sort of array1)
        array1.sort(compareRandom);
        array2 = array1.slice();
        array2.sort(compareRandom);
        array3 = array1.concat(array2);

        // insert images to container
        for (let l = 0; l < array3.length; l++) {
            $('.container').append('<div class="block" id="id' + l + '"><img src="https://kde.link/test/' + array3[l] + '.png" data-id="' + array3[l] + '" alt=""></div>');
        }

        // временное
        $('.block').each(function() {
            if ($(this).find('img').data('id') > 9) {
                $(this).addClass('undef');
            }
        });

        // hide img at start
        $('.block img').each(function() {
            $(this).addClass('hidden');
        });


        let check = false,
            selcolor = 0,
            sela, steps = 0,
            open = 0,
            timer,
            a = document.getElementsByClassName('block');
        for (let i = 0; i < a.length; i++) {
            a[i].addEventListener('click', function(e) {
                let el = e.target.firstChild;
                if (el.className.indexOf('hidden') > -1) {
                    steps++;
                    el.className = el.className.replace('hidden', '');
                    setTimeout(function() {
                        if (check) {
                            check = false;
                            // if images coincide
                            if (el.getAttribute('data-id') == selcolor) {
                                open++;
                                if (open == 8) alert('You win! Steps: ' + steps);
                            } else {
                                //hide block
                                sela.className += ' hidden';
                                el.className += ' hidden';
                            }
                        } else {
                            selcolor = el.getAttribute('data-id');
                            sela = el;
                            check = true;
                        }
                    }, 100);
                }
            });
        }


    }); //getJson
})