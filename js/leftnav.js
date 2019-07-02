 $(function () {
    var toolTop = $(".recommend").offset().top;
    toggleTool();
//显示与隐藏
    var flag = true;
    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        };
    }
//页面滚动
    $(window).scroll(function () {
        toggleTool();
        if (flag) {
//页面滚动导航一起动
            $(".floor .w").each(function (index, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fixedtool li").eq(index).addClass("current").siblings().removeClass();
                }
            })
        }
    })
//点击快速跳转到当前页面
    $(".fixedtool li").click(function () {
        flag = false;
        var current = $(".floor .w").eq($(this).index()).offset().top;
        $("body,html").stop().animate({
            scrollTop: current
        },function(){
            flag = true;
        });
        $(this).addClass("current").siblings().removeClass();
    })
}) 


