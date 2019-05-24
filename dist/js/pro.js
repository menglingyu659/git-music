(function ($, root) {
    var frameId = null;
        root.curPer = 0;
        root.cTime = 0;

    function init(data) {
        var data = data[0] || data;
        var allTime = math(data.duration);
        $('.all-time').html(allTime);
        proEvent(data);
    };

    function start(data, per, f) {
        cancelAnimationFrame(frameId)
        console.log(root.cTime, root.curPer);
        per = (typeof per == 'number') ? per : root.curPer;
        console.log(typeof per)
        var w = $('.process').width();
        var firstTime = +new Date();
        var duration = data.duration;
        // console.log(pe)
        function timeout() {
            frameId = requestAnimationFrame(function () {
                var curTime = +new Date();
                root.curPer = per + ((curTime - firstTime) / (duration * 1000));
                if (root.curPer >= 1) {
                    cancelAnimationFrame(frameId);

                } else if (!f) {
                    timeout();
                }
                var cmTime = data.duration * root.curPer;
                root.cTime = math(cmTime);
                $('.cur-time').html(root.cTime);
                $('i').css({
                    transform: 'translateX(' + root.curPer * w + 'px)',
                });
                // console.log(root.curPer * w)
                $('.process-bar').css({
                    width: root.curPer * w + 'px'
                })
            })
        };
        timeout();
    };

    function stop(data) {
        cancelAnimationFrame(frameId);
    };

    function proEvent(data, offset) {
        var x = null;
        var l = $('.process').offset().left;
        var f = true;
        console.log(data)
        $('i').on({
            // 'touchstart': function (e) {
            //     console.log('start')
            //     x = e.changedTouches[0].clientX - $(this).offset().left;
            // },
            touchmove: function (e) {
                root.audio.pause();
                cancelAnimationFrame(frameId)
                if (f) {
                    console.log('f')
                    offset = offset == undefined ? e.changedTouches[0].clientX - l : offset;
                    f = false;
                } else {
                    offset = e.changedTouches[0].clientX - l;
                    console.log(e.changedTouches[0].clientX, l)
                }
                offset = e.changedTouches[0].clientX - l 
                offset = offset >= 0 ? offset : 0;
                offset = offset <= ($('.process').width()) ? offset : ($('.process').width())
                console.log(offset)

                $('i').css({
                    transform: 'translateX(' + offset + 'px)',
                });
                $('.process-bar').css({
                    width: offset + 'px'
                })
            },
            touchend: function (e) {
                // f = true;
                var per = ($('.process-bar').width() / $('.process').width());
                var curT = Math.floor(per * data.duration);
                root.audio.currentTime = curT;
                console.log(per)
                console.log(math(curT));
                console.log(root.audio)
                root.audio.play();
                console.log(root.audio.paused)
                start(data, per, false)
                $('.btn').eq(2).css({
                    backgroundImage: 'url("../image/icon-pause.png")'
                });
                root.flag = true;
            }
        })
    }

    function math(duration) {
        var minute = Math.floor(duration / 60) >= 10 ? Math.floor(duration / 60) : ('0' + Math.floor(duration / 60));
        var second = Math.floor(duration % 60) >= 10 ? Math.floor(duration % 60) : ('0' + Math.floor(duration % 60));
        return minute + ':' + second
    };

    root.proInit = {
        init: init,
        start: start,
        stop: stop,
    }
}(window.Zepto, window.player || (window.player = {})))