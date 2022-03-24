var SpeechRecogntion = window.webkitSpeechRecognition;

var recognition = new window.SpeechRecogntion();


var instration = $('#instration');

var content = '';


$(document).ready(function () {


    recognition.continuous = true

    recognition.onstart = function () {
        instration.text('Voice Recognition is on')
    }

    recognition.onspeechend = function () {
        instration.text('No Activity');
    }

    recognition.onerror = function (event) {
        instration.text('Try Again');
        console.log(event);
    }

    recognition.onresult = function (event) {
        var current = event.resultIndex;
        var transcript = event.results[current][0].transcript;
        var confidence = event.results[current][0].confidence;
        console.log(transcript);
        content += transcript;
        $('#search-inp').val(content);
    };


    $('#start-btn').click(function (event) {
        if (content.length) {
            content += ''
        }
        $('#search-inp').val('');

        $('#create').css('display', 'block');
        $(this).css('display', 'none');
        recognition.start()
    });




    var create = document.getElementById('create'),
        textbox = document.getElementById('textbox');

    create.addEventListener('click', function () {

        $('#start-btn').css('display', 'block');
        $('#create').css('display', 'none');
        recognition.stop()
        content = '';
        $('#instration').text('Press Start Voice Recognition');
    }, false);

});