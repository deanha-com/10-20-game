// Set all variables
var fingers;
var wins = 0;
var playersTurn = true;
var myArray = [0, 5, 10, 15, 20];
var playername = localStorage.getItem("playerName");
var randShout = function() {
    return myArray[Math.floor(Math.random() * myArray.length)];
}

function setScore(x) {
    localStorage.setItem('playerScore', x);
}

function getScore() {
    currentScore = localStorage.getItem("playerScore");
}

function setPlayerName() {
    var playerName = prompt("Please enter your name", "Player 1");
    if (playerName != null) {
        localStorage.setItem('playerName', playerName);
        $(".player-names.player").text(playerName);
    }
}

function inPlay() {
    return $('#whosturn span').text() + " /// " + wins;
}

function startGame() {
        $('.intro').parent().addClass('slideOutLeft animated');
        $('.main').parent().addClass('fadeIn animated');
        $('#player-left').animateCss('bounceInLeft');
        $('#player-right').animateCss('bounceInRight');
        if ( playername != null ) {
            $(".player-names.player").text(playername);
        }
}

function toggleWinState() {
    $('section.win-state').toggleClass('active');
    $('section.win-state').animateCss('bounceInUp');
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

    $('a').click(function(event) {
        event.preventDefault();
    });

    function randomHandState(el) {
        if (!!Math.floor(Math.random() * 2)) {
            $('#' + el).text('5');
            $('#' + el).addClass("open");
        } else {
            $('#' + el).text('0');
            $('#' + el).removeClass("open");
        }
    }

    function openHandState(el) {
        $('#' + el).text('5');
        $('#' + el).addClass("open");
    }

    function closeHandState(el) {
        $('#' + el).text('0');
        $('#' + el).removeClass("open");
    }

    function computersCall() {
        $('#shoutout').text(randShout());
        if ($('#shoutout').text() == 20) {
            // console.warn('CPU: BOTH hand needs to be OPENED');
            openHandState('com-left');
            openHandState('com-right');
        }
        if ($('#shoutout').text() == 0) {
            // console.warn('CPU: BOTH hand needs to be CLOSED');
            closeHandState('com-left');
            closeHandState('com-right');
        }
        if ($('#shoutout').text() == 5) {
            // console.warn('CPU: ONE hand needs to be CLOSED');
            closeHandState('com-left');
        }
        if ($('#shoutout').text() == 15) {
            // console.warn('CPU: ONE hand needs to be OPENED');
            openHandState('com-left');
        }
        // else {
        //     randomHandState('com-left');
        //     randomHandState('com-right');
        // }
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

            // add points to the player score
            var playerscore = $('div.score').text();
            $('div.score').text(parseInt(playerscore)+totalFingerCount());

            wins += 1;
            console.log('true - correct match:' + wins + 'wins');
            if (wins == 2) {
                toggleWinState();
                // alert($('#whosturn span').text() + ' WINS!');
                if ($('#whosturn span').text() == 'Computer') {
                    $('section.win-state').css('background','#F44336');
                    $('.end-greet').text('Ooops..');
                    $('.won-lost').text('LOST');
                } else {
                    $('section.win-state').css('background','#8bc34a');
                    $('.end-greet').text('Congrats!');
                    $('.won-lost').text('WON');

                    // add wins to the player win streaks
                    var playerwinstreak = $('div.wins>span').text();
                    if (playerwinstreak < 2) {
                        $('div.wins>span').text(parseInt(playerwinstreak)+1);
                    } else {
                        // Game over once you reach 5 games.
                        $('div.wins>span').text(parseInt(playerwinstreak)+1);
                        alert('CONGRATS! YOU COMPLETED LEVEL 1..!');
                    }
                }
                wins = 0;
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

    function cpuAutoPlay(){
        // console.log('cpu auto play');
        var dur = 2500;
        setTimeout(function(){

            // $('.countdown').addClass('countnow').css('animation','mymove '+dur+'ms');
            computersCall();
            // $('.countdown').removeClass('countnow');
            if (wins == 1) {
                $('.shoutout-container').animateCss('tada');
            } else {
                $('.shoutout-container').animateCss('bounceInDown');
            }
            setPlayerTurn(!callResults());
        }, dur);
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
            console.log('PLAYER SCORE:'+wins);

        } else {
            $('#whosturn span').text('Computer');
            $('.player-names.com').addClass('playing');
            $('.player-names.player').removeClass('playing');
            $('.call').hide();
            // $('.computer-calls').fadeIn();
            $('.speech-cpu').hide();
            $('.speech-player').show();
            cpuAutoPlay();
            console.log('COMPUTER SCORE:'+wins);
        }
        inPlay();
    }

    // ----------------------------------------------
    // open/close when user clicks hand
    $(".player-hands p").click(function() {
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
        if (wins == 1) {
                $('.shoutout-container').animateCss('tada');
        } else {
            $('.shoutout-container').animateCss('bounceInUp');
        }
        setPlayerTurn(callResults());
    });

    // when its cpu turn, we need to click the play button.
    $('a.computer-calls').click(function(){
        computersCall();
        // callResults();
        $('.shoutout-container').animateCss('tada');
        setPlayerTurn(!callResults());
    });

});