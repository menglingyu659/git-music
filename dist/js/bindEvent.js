(function ($, root) {
    function BindEvent(audio, data) {
        console.log(audio);
        console.log(data);
        root.audio = audio;
        this.data = data;
        this.len = this.data.length;
        this.index = 0;
        root.flag = false;
        $('.active').removeClass('active')
        $('.list li').eq(0).addClass('active');
    };
    BindEvent.prototype.bindEvent = function () {
        var self = this;
        var timer = null;
        var deg = 0;
        $('.btn').eq(2).click(function () {
            console.log(root.audio.paused)
            if (root.audio.paused) {
                console.log('play');
                root.flag = true;
                root.audio.play();
                console.log(root.proInit.start, self.data)
                root.proInit.start(self.data[self.index], undefined, false);
                $(this).css({
                    backgroundImage: 'url("../image/icon-pause.png")'
                })
                timer = setInterval(function () {
                    $('.disc-wrap').css({
                        transform: 'rotateZ(' + (deg) + 'deg)',
                        transition: 'transform .2s linear'
                    });
                    deg += 2;
                }, 200)
            } else {
                console.log('stop')
                clearInterval(timer);
                root.flag = false;
                root.audio.pause();
                root.proInit.stop(self.data[0]);
                $(this).css({
                    backgroundImage: 'url("../image/icon-play.png")'
                });
            }
        });
        $('.btn').eq(1).click(function () {
            merge(-1)
        });
        $('.btn').eq(3).click(function () {
            merge(1)
        });
        $('.btn').eq(4).click(function () {
            $(this).toggleClass('play');
            $(this).hasClass('play') ? $(this).find('.list').show() : $(this).find('.list').hide();
        })
        $('.list').on('click', 'li', function () {
            clearInterval(timer);
            var index = $(this).index();
            $('.active').removeClass('active');
            $('.list li').eq(index).addClass('active');
            root.audio.src = self.data[index].audio;
            root.init(self.data[index]);
            self.index = index;
            $('.btn').eq(2).trigger('click');
            root.proInit.start(self.data[self.index], 0, false);
            console.log(root.audio);
            return false;
        })

        function merge(i) {
            console.log(root.flag);
            root.curPer = 0;
            root.cTime = 0;
            deg = 0;
            self.index = algorithm(i);
            root.audio.src = self.data[self.index].audio;
            root.proInit.init(self.data[self.index])
            root.init(self.data[self.index]);
            root.proInit.start(self.data[self.index], 0, true);
            if (root.flag) {
                root.audio.play();
                root.proInit.start(self.data[self.index], 0, false);
            };
            $('.disc-wrap').css({
                transform: 'rotateZ(' + (deg) + 'deg)',
                transition: 'none'
            });
            root.audio = root.audio
            $('.active').removeClass('active')
            $('.list li').eq(self.index).addClass('active');
        }

        function algorithm(data) {
            return (data + self.index + self.len) % self.len
        };
    }
    root.BindEvent = BindEvent
})(window.Zepto, window.player || (window.player = {}))