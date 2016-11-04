$(function() {
    var field_width,
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
        var w = data["width"],
            h = data["height"],
            box_size = w * h,
            half_box_size = box_size / 2;

        console.log(w);
        console.log(h);
        console.log(half_box_size);

        // container width
        $('.container').width(w * 100 + 'px');

        var array1 = [],
            array2 = [],
            array3 = []; // arrays

        // push img.src to 1st half of array
        for (var i = 0; i < half_box_size; i++) {
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

        console.log(array1);
        console.log(array2);
        console.log(array3);

        // insert images to container
        var l, len;
        for (l = 0, len = array3.length; l < len; l++) {
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
            $(this).hide();
        });

        $('[id^="id"]').on('click', function() {
            $(this).find('img').toggle();
            $(this).find('img').toggleClass('open1');

            // take img1 id & img2 id & compare them
            var img1_id = $(this).find('img').data('id');
            console.log(img1_id);
        });

        // test

        var check = false,
            selcolor = 0,
            sela, steps = 0,
            open = 0,
            timer,
            a = document.getElementsByTagName('a');
        for (var i = 0; i < array3.length; i++) {
            array3[i].addEventListener('click', function(e) {
                var el = e.target;
                if (el.className.indexOf('hidden') > -1) {
                    steps++;
                    el.className = el.className.replace('hidden', '');
                    setTimeout(function() {
                        if (check) {
                            check = false;
                            if (el.getAttribute('color') == selcolor) {
                                open++;
                                if (open == 8) alert('You win! Steps: ' + steps);
                            } else {
                                sela.className += ' hidden';
                                el.className += ' hidden';
                            }
                        } else {
                            selcolor = el.getAttribute('color');
                            sela = el;
                            check = true;
                        }
                    }, 100);
                }
            });
        }


    }); //getJson
})