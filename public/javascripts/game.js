$(document).ready(function () {

    let socket = io.connect();
    let view_pos = $("#position").data('position');
    let user_id = $.cookie("user_id");
    let room_id = $.cookie("room_id");
    let adjust_size = $.cookie("adjust_size") || 0;
    let adjust_top = $.cookie("adjust_top") || 0;
    let animation_cat_id;
    let animation_index = 0;
    let animation_max =146;
    let animation_frame_index_arr = [0,27,60,89,116]
    $(".bigger_btn").click(function () {
        adjust_size += 0.01
        $.cookie('adjust_size', adjust_size);
        adjustSize(adjust_size);
    });
    $(".smaller_btn").click(function () {
        adjust_size -= 0.01;
        $.cookie('adjust_size', adjust_size);
        adjustSize(adjust_size);
    })
    $(".up_btn").click(function () {
        adjust_top -= 0.01;
        $.cookie('adjust_top', adjust_top);
        adjustTop(adjust_top);
    });
    $(".down_btn").click(function () {
        adjust_top += 0.01;
        $.cookie('adjust_top', adjust_top);
        adjustTop(adjust_top);
    })

    // let origin_img = {
    //     width: $('.description-img').css('width').split('px')[0],
    //     height: $('.description-img').css('height').split('px')[0],
    //     top: $('.description-img').css('top').split('px')[0]
    // }
    // let start_game = {
    //     width: $('.start-game-btn').css('width').split('px')[0],
    //     height: $('.start-game-btn').css('height').split('px')[0],
    //     top: $('.start-game-btn').css('top').split('px')[0]
    // }
    // adjustSize(0);
    // adjustTop(adjust_top || 0);
    // function adjustSize(size) {
    //     $(".description-img").css('width', (1 + size) * origin_img.width + 'px');
    //     $(".description-img").css('height', (1 + size) * origin_img.height + 'px');
    //     $(".start-game-btn").css('width', (1 + size) * start_game.width + 'px');
    //     $(".start-game-btn").css('height', (1 + size) * start_game.height + 'px');
    // }

    // function adjustTop(top) {
    //     $(".description-img").css('top', (1 + top) * origin_img.top + 'px');
    //     $(".start-game-btn").css('top', (1 + top) * start_game.top + 'px');
    // }

    function paddingLeft(str, lenght) {
        if (str.length >= lenght)
            return str;
        else
            return paddingLeft("0" + str,lenght);
    }
    $('.start-game-btn').click(function () {
        socket.emit('start-game1', { room_id: room_id });
        $('.description-img').hide();
        $('.start-game-btn').hide();
        $('.game-description2-left').removeAttr('hidden');
        $('.game-description2-right').removeAttr('hidden');
        $('.start-game-btn2').removeAttr('hidden');
        // animation_cat_id = setInterval(function () {
        //     animation_index++;
        //     if (animation_index > animation_max) {
        //         animation_index = 0;
        //     }
        //     let index_str = paddingLeft(animation_index + '', 5);
        //     let url = window.location.origin + `/animation/333_${index_str}`;
        //     $('.game-description2-left').attr("src", url);
        // }, 100);

        animation_cat_id = setInterval(function () {
            animation_index++;
            if (animation_index == animation_frame_index_arr.length) {
                animation_index = 0;
            }
            let index_str = paddingLeft(animation_frame_index_arr[animation_index] + '', 5);
            let url = window.location.origin + `/animation/333_${index_str}`;
            $('.game-description2-left').attr("src", url);
        },800);
        
    });
    socket.on('start-game1', function (data) {
        $('.description-img').hide();
        $('.start-game-btn').hide();
        $('.game-description2-left').removeAttr('hidden');
        $('.game-description2-right').removeAttr('hidden');
        $('.start-game-btn2').removeAttr('hidden');
        // animation_cat_id = setInterval(function () {
        //     animation_index++;
        //     if (animation_index > animation_max) {
        //         animation_index = 0;
        //     }
        //     let index_str = paddingLeft(animation_index + '', 5);
        //     let url = window.location.origin + `/animation/333_${index_str}`;
        //     $('.game-description2-left').attr("src", url);
        // }, 100);

        animation_cat_id = setInterval(function () {
            animation_index++;
            if (animation_index == animation_frame_index_arr.length) {
                animation_index = 0;
            }
            let index_str = paddingLeft(animation_frame_index_arr[animation_index] + '', 5);
            let url = window.location.origin + `/animation/333_${index_str}`;
            $('.game-description2-left').attr("src", url);
        }, 800);
    });

    $('.start-game-btn2').click(function () {
        clearInterval(animation_cat_id);
        socket.emit('start-game2', { room_id: room_id });
        $('.game-description2-left').hide();
        $('.game-description2-right').hide();
        $('.start-game-btn2').hide();
        
        $('.game-title').removeAttr('hidden');
        $('.game-bg').removeAttr('hidden');
        $('.game-img').removeAttr('hidden');
        $('.game-optionA').removeAttr('hidden');
        $('.game-optionB').removeAttr('hidden');
        $('.game-optionC').removeAttr('hidden');
        $('.game-optionD').removeAttr('hidden');
    });
    socket.on('start-game2', function (data) {
        $('.game-description2-left').hide();
        $('.game-description2-right').hide();
        $('.start-game-btn2').hide();

        $('.game-title').removeAttr('hidden');
        $('.game-bg').removeAttr('hidden');
        $('.game-img').removeAttr('hidden');
        $('.game-optionA').removeAttr('hidden');
        $('.game-optionB').removeAttr('hidden');
        $('.game-optionC').removeAttr('hidden');
        $('.game-optionD').removeAttr('hidden');
    });


    question_arr = [{
        question:"曾經按過的粉專",
        imgea_url:"/images/questions/question1.jpg",
        option_arr:[
            { name: '人類超有病 Baxuan', isAnswer:true },
            { name: '台大公衛之夜', isAnswer:false },
            { name: '雜學校｜Za Share', isAnswer:false },
            { name: '房東的貓', isAnswer:false }
        ],
        content:"15th 資種，感謝你們今天成發完還不辭辛勞的參與聖誕趴，我真的覺得很開心，感謝辛苦協助的學員，看著大家的笑容，我也滿足了，希望大家以後可以一直持續歡樂下去，散播歡樂，散播愛。"
    }, {
        question:"曾經按過的粉專",
        imgea_url: "/images/questions/question2.jpg",
        option_arr: [
            { name: '偷窺設計', isAnswer:false },
            { name: '飆捍', isAnswer:false },
            { name: '五倍紅寶石出礦坑', isAnswer:true },
            { name: '49101 聽音樂的靈魂伴侶', isAnswer:false }
        ]
    }, {
        question:"曾經按過的粉專",
        imgea_url: "/images/questions/question3.png",
        option_arr: [
            { name: '告五人 Accusefive', isAnswer:false },
            { name: '魔法吉緣 2018 WGC', isAnswer:false },
            { name: 'PicSee 皮克看見', isAnswer:false },
            { name: '這群人 TGOP', isAnswer:true }
        ]
    }]



    console.log(view_pos);

    if(view_pos=="left"){
        setTimeout(() => {
            let question_no = getRandom(0, 2);
            let question = question_arr[question_no];
            console.log(question);
            setQuestion(question);
            socket.emit('created_question', { room_id: room_id, question_no: question_no });
        }, 1000);
    }
    socket.on('created_question', function (data) {
        let question_no = data.question_no;
        let question = question_arr[question_no];
        console.log(data);
        setQuestion(question);
    });
    
});

function setQuestion(question){
    $(".game-img").attr("src", question.imgea_url);
    $(".game-optionA").text(question.option_arr[0].name).data('is_answer', question.option_arr[0].isAnswer);
    $(".game-optionB").text(question.option_arr[1].name).data('is_answer', question.option_arr[1].isAnswer);
    $(".game-optionC").text(question.option_arr[2].name).data('is_answer', question.option_arr[2].isAnswer);
    $(".game-optionD").text(question.option_arr[3].name).data('is_answer', question.option_arr[3].isAnswer);
}
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}
