

(function ($, root) {
    function getData(url) {
        $.ajax({
            url: url,
            type: 'GET',
            success: function (data) {
                // console.log(data[0]);
                root.init(data);
                // console.log(root.BindEvent)
                new root.BindEvent(root.audio, data).bindEvent();
                root.proInit.init(data);
            },
            error: function () {
                alert('error')
            }
        })
    };
    
    getData('../mock/data.json')
})(window.Zepto, window.player || (window.player = {}))