var myArray = [0, 5, 10, 15, 20];
var randShout = function() {
    // return $('shoutout').text(myArray[Math.floor(Math.random() * myArray.length)]);
    return myArray[Math.floor(Math.random() * myArray.length)];
};
var fingers;
var rann = !!Math.floor(Math.random() * 2);
console.log(rann);


$(document).ready(function() {

    function closeOpen(el) {
        if (!!Math.floor(Math.random() * 2)) {
            $('#' + el).text('5');
            $('#' + el).addClass("open");
        } else {
            $('#' + el).text('0');
            $('#' + el).removeClass("open");
        }
    }

    function computerAction() {
        closeOpen('com-left');
        closeOpen('com-right');
        $('#shoutout').text(randShout());

    }

    function total() {
        $('a.btn').each(function(index) {
            console.log(index + ": " + $(this).text());
        });
    }
    // total();

    $("a.player").click(function() {
        $(this).toggleClass("open");

        var fingers = $(this).text();
        if (fingers == 5) {
            $(this).text(0);
        } else {
            $(this).text(5);
        }

    });

    $('.call>a').click(function() {
        computerAction();
        countAllFingers();
        callCorrect();
    });

    function callCorrect() {
        var shoutNum = parseInt($(".total-count").text());
        if (shoutNum == countAllFingers()) {
            console.warn('Correct');
            console.log('shoutNum:' + shoutNum);
            console.log('countAllFingers' + countAllFingers());
            $(".status").html('<span class="btn btn-success">HIT !</span>');

        } else {
            $(".status").html('<span class="btn btn-warning">missed</span>');
        }
    }

    function countAllFingers() {
        var b = 0;

        $(".finger-count").each(function(index) {
            // console.log($(this).text());
            a = parseInt($(this).text());
            b += a;
        });
        // console.log(b);
        return b;
    }


});