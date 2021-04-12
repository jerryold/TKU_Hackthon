$(document).ready(function () {
    $(window).keydown(function (e) {
        if (e.keyCode == 116) {
            if (!confirm("刷新将会清除所有聊天记录，确定要刷新么？")) {
                e.preventDefault();
            }
        }
    });
    var socket = io.connect();
    var from = $.cookie('user');
    var to = 'all';
    socket.emit('online', { user: from }); // 跟大家說你上線了
    socket.on('online', function (data) {
        //顯示系統消息
        if (data.user != from) {
            var sys = '<div style="color:#f00">系统(' + now() + '):' + '用户 ' + data.user + ' 上線了！</div>';
        } else {
            var sys = '<div style="color:#f00">系统(' + now() + '):你進入了聊天室！</div>';
        }
        $("#contents").append(sys + "<br/>");
        flushUsers(data.users);
        showSayTo();
    });

    socket.on('say', function (data) {
        //對所有人說話
        if (data.to == 'all') {
            $("#contents").append('<div>' + data.from + '(' + now() + ')對 所有人 說：<br/>' + data.msg + '</div><br />');
        }
        //對你密語
        if (data.to == from) {
            $("#contents").append('<div style="color:#00f" >' + data.from + '(' + now() + ')對 你 說：<br/>' + data.msg + '</div><br />');
        }
    });

    socket.on('offline', function (data) {
        //顯示系统消息
        var sys = '<div style="color:#f00">系统(' + now() + '):' + '用户 ' + data.user + ' 下線了！</div>';
        $("#contents").append(sys + "<br/>");
        flushUsers(data.users);
        if (data.user == to) {
            to = "all";
        }
        showSayTo();
    });

    //伺服器關閉
    socket.on('disconnect', function () {
        var sys = '<div style="color:#f00">系统:連接伺服器器失败！</div>';
        $("#contents").append(sys + "<br/>");
        $("#list").empty();
    });

    //重新啟動服务器
    socket.on('reconnect', function () {
        var sys = '<div style="color:#f00">系统:重新连接服务器！</div>';
        $("#contents").append(sys + "<br/>");
        socket.emit('online', { user: from });
    });

    //刷新用戶列表
    function flushUsers(users) {
        //預設只剩『所有人』選項，其他先刪除
        $("#list").empty().append('<li title="觀眾聊天" alt="all" class="sayingto" onselectstart="return false">所有人</li>');
        for (var i in users) {
            $("#list").append('<li alt="' + users[i] + '" title="點擊聊天" onselectstart="return false">' + users[i] + '</li>');
        }
        //綁定事件，雙擊可以與其對話
        $("#list > li").dblclick(function () {
            if ($(this).attr('alt') != from) {
                to = $(this).attr('alt');
                $("#list > li").removeClass('sayingto');
                $(this).addClass('sayingto');
                showSayTo();
            }
        });
    }

    //顯示正在對誰說話
    function showSayTo() {
        $("#from").html(from);
        $("#to").html(to == "all" ? "所有人" : to);
    }

    //獲取當前時間
    function now() {
        var date = new Date();
        var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
        return time;
    }
    //發話
    $("#say").click(function () {
        var $msg = $("#input_content").html();
        if ($msg == "") return;
        if (to == "all") {
            $("#contents").append('<div>你(' + now() + ')對 所有人 說：<br/>' + $msg + '</div><br />');
        } else {
            $("#contents").append('<div style="color:#00f" >你(' + now() + ')對 ' + to + ' 說：<br/>' + $msg + '</div><br />');
        }
        // 發送對話
        socket.emit('say', { from: from, to: to, msg: $msg });
        $("#input_content").html("");
    });
});
