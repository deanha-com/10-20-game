// Set all variables
var fingers;
var wins = 0;
var playersTurn = true;
var myArray = [0, 5, 10, 15, 20];
var randShout = function() {
    return myArray[Math.floor(Math.random() * myArray.length)];
};


function startGame() {
        $('.intro').parent().addClass('zoomOut animated');
        $('#player-left').animateCss('bounceInLeft');
        $('#player-right').animateCss('bounceInRight');
        // $('#com-left').animateCss('fadeInDown');
        // $('#com-right').animateCss('fadeInDown');        
}

// Document Ready
$(document).ready(function() {
    $.fn.extend({
      animateCss: function(animationName, callback) {
        var animationEnd = (function(el) {
          var animations = {
            animation: 'animationend',
            OAnimation: 'oAnimationEnd',
            MozAnimation: 'mozAnimationEnd',
            WebkitAnimation: 'webkitAnimationEnd',
          };

          for (var t in animations) {
            if (el.style[t] !== undefined) {
              return animations[t];
            }
          }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function() {
          $(this).removeClass('animated ' + animationName);

          if (typeof callback === 'function') callback();
        });

        return this;
      },
    });

    // Run animations
    function startGame() {
        $('.intro').parent().addClass('zoomOut animated');
        $('#player-left').animateCss('bounceInLeft');
        $('#player-right').animateCss('bounceInRight');
        // $('#com-left').animateCss('fadeInDown');
        // $('#com-right').animateCss('fadeInDown');
        
    }

    function randomHandState(el) {
        if (!!Math.floor(Math.random() * 2)) {
            $('#' + el).text('5');
            $('#' + el).addClass("open");
        } else {
            $('#' + el).text('0');
            $('#' + el).removeClass("open");
        }
    }

    function computersCall() {
        randomHandState('com-left');
        randomHandState('com-right');
        $('#shoutout').text(randShout());
        totalFingerCount();
    }

    function playersCall(val) {
        $('#shoutout').text(val);
    }

    function setHandState(el) {
        if (el.text() == 5) {
            el.text(0);
        } else {
            el.text(5);
        }
    }
    
    function totalFingerCount() {
        var b = 0;
        $(".finger-count").each(function(index) {
            a = parseInt($(this).text());
            b += a;
        });
        $('#totalfingercount span').text(b);
        return b;
    }

    function callResults() {
        var shoutNum = parseInt($(".total-count").text());
        if (shoutNum == totalFingerCount()) {
            $(".status").html('<span class="btn btn-success">Hit!</span>');
            wins += 1;
            console.log('true - correct match:' + wins + 'wins');
            if (wins == 2) {
                alert($('#whosturn span').text() + ' WINS!');
            }
            return true;
        } else {
            $(".status").html('<span class="btn btn-danger">Missed!</span>');
            wins = 0;
            console.log('false - no match:' + wins + 'wins');
            return false;
        }

        console.warn(shoutNum);
        console.warn(totalFingerCount());
    }

    function cpuAutoCall(){
        console.log('auto calling');
        setTimeout(function(){

            computersCall();
            $('.shoutout-container').animateCss('tada');
            setPlayerTurn(!callResults());
        }, 2000);
    }

    function setPlayerTurn(check) {
        if (check) {
            $('#whosturn span').text('Player');
            $('.player-names.player').addClass('playing');
            $('.player-names.com').removeClass('playing');
            $('.computer-calls').hide();

            $('.call').fadeIn();
            $('.speech-player').hide();
            $('.speech-cpu').show();

        } else {
            $('#whosturn span').text('Computer');
            $('.player-names.com').addClass('playing');
            $('.player-names.player').removeClass('playing');
            $('.call').hide();
            $('.computer-calls').fadeIn();
            $('.speech-cpu').hide();
            $('.speech-player').show();
            cpuAutoCall();
        }
    }
    

    // ----------------------------------------------
    // open/close when user clicks hand
    $("a.player").click(function() {
        $(this).toggleClass("open");
        var fingers = $(this);
        setHandState(fingers);
    });


    // what happens when user calls a number
    $('.call>a').click(function() {
        var playerHasCalled = parseInt($(this).text());
        playersCall(playerHasCalled);
        // 
        randomHandState('com-left');
        randomHandState('com-right');
        // 
        totalFingerCount();
        // callResults();
        $('.shoutout-container').animateCss('tada');
        setPlayerTurn(callResults());
    });

    // when its cpu turn we neet to click the play button
    $('a.computer-calls').click(function(){
        computersCall();
        // callResults();
        $('.shoutout-container').animateCss('tada');
        setPlayerTurn(!callResults());
    });
   

});