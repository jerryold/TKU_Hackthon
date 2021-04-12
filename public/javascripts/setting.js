$(document).ready(function () {

    let socket = io.connect();
    let room_id = $(".room_id").data('room_id'); 
    let pair_user_id = $(".pair_user_id").data('pair_user_id');
    let user_id = $.cookie("user_id");
    let adjust_size = $.cookie("adjust_size") || 0;
    let adjust_top = $.cookie("adjust_top") || 0;
    console.log(room_id,pair_user_id);
    $.cookie("room_id", room_id);
    $.cookie("pair_user_id", pair_user_id);
    $(".bigger_btn").click(function () {
        adjust_size+=0.01
        $.cookie('adjust_size',adjust_size);
        adjustSize(adjust_size);
    });
    $(".smaller_btn").click(function () {
        adjust_size-=0.01;
        $.cookie('adjust_size', adjust_size);
        adjustSize(adjust_size);
    })
    $(".up_btn").click(function () {
        adjust_top-=0.01;
        $.cookie('adjust_top', adjust_top);
        adjustTop(adjust_top);
    });
    $(".down_btn").click(function () {
        adjust_top+=0.01;
        $.cookie('adjust_top', adjust_top);
        adjustTop(adjust_top);
    })
    
    if (pair_user_id){
        console.log('pair_user_id:',pair_user_id);
        socket.emit('pair_success', { room_id: room_id, pair_user_id: pair_user_id });
    }
    // let w = $(window).width();
    // let h = $(window).height();
    // console.log(w,h);

    let origin_img = {
        width: $('.setting-img').css('width').split('px')[0],
        height: $('.setting-img').css('height').split('px')[0],
        top: $('.setting-img').css('top').split('px')[0]
    }
    let finish_btn = {
        width: $('.finish-btn').css('width').split('px')[0],
        height: $('.finish-btn').css('height').split('px')[0],
        top: $('.finish-btn').css('top').split('px')[0]
    }
    function adjustSize(size) {
        $(".setting-img").css('width', (1+size) * origin_img.width + 'px');
        $(".setting-img").css('height', (1+size) * origin_img.height + 'px');
        $(".finish-btn").css('width', (1+size) * finish_btn.width + 'px');
        $(".finish-btn").css('height', (1+size) * finish_btn.height + 'px');
    }

    function adjustTop(top) {
        $(".setting-img").css('top', (1+top) * origin_img.top + 'px');
        $(".finish-btn").css('top', (1+top) * finish_btn.top + 'px');
    }

    $('.finish-btn').click(function(){
        socket.emit('setting_finish', { room_id: room_id, pair_user_id: pair_user_id});
        console.log($.cookie('pair_user_id'));
        if ($.cookie('pair_user_id') == "undefined") {
            window.location.href = window.location.origin + "/game?room_id=" + room_id + "&position=right";
        } else {
            window.location.href = window.location.origin + "/game?room_id=" + room_id + "&position=left";
        }
    });

    socket.on('setting_finish', function (data) {
        let user_id = $.cookie("user_id");
        let room_id = $.cookie('room_id');
        if ($.cookie("room_id") != data.room_id){
            return ;
        }
        console.log(user_id, data);
        if (user_id == data.pair_user_id) {
            window.location.href = window.location.origin + "/game?room_id=" + room_id + "&position=right";
        }else {
            window.location.href = window.location.origin + "/game?room_id=" + room_id + "&position=left";
        }
    });
});

