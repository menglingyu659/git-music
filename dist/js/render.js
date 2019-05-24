(function ($, root) {
    function imageRender(data) {
        console.log(data.image);
        data = data[0] || data;
        var img = new Image();
        img.src = data.image;
        img.onload = function () {
            $('.img img').attr('src', data.image);
            root.blurImg(img, $('.wrapper'));
            // $('.img img').src = data.image;
        };
        console.log(img, $('.wrapper'))
        
    };

    function introductionRender(data) {
        data = data[0] || data;
        $('.singer').text(data.singer);
        $('.song').text(data.song);
        $('.album').text(data.album)
    };

    function listRender(data) {
        if (!data[0]) {
            return;
        }
        var str = '';
        data.forEach(function (ele, index) {
            str += '<li>' + ele.singer + '—' + ele.song + '—' + ele.album + '</li>'
        });
        $('.list').html(str)
    }

    function audioRender(data) {
        data = data[0] || data;
        var audio = new Audio();
        audio.src = data.audio;
        root.audio = audio;
        console.log(root.audio, root)
    }
    root.init = function (data) {
        imageRender(data);
        introductionRender(data);
        audioRender(data);
        listRender(data)
    };
})(window.Zepto, window.player || (window.player = {}));