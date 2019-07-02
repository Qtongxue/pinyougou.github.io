window.addEventListener('load', function () {
    //获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    //每个图片的宽度
    var focusWidth = focus.offsetWidth;
    //鼠标经过左右按钮显示
    focus.addEventListener('mouseover', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        //鼠标经过清除定时器
        clearInterval(timer);
        //并且timer为空
        timer = null;
    });
    //鼠标移出左右按钮隐藏
    focus.addEventListener('mouseout', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        //鼠标移出添加定时器
        timer = setInterval(function () {
            //手动调用点击事件
            arrow_r.click();
        }, 2000);
    });
    //获取元素ul和小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // console.log(ol);
    //动态获取小圆圈，创建li,并且添加进ol
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        //添加自定义属性给li绑定索引号
        li.setAttribute('index', i);

        // console.log(li);
        ol.appendChild(li);
        //添加点击事件
        li.addEventListener('click', function () {
            //排他思想
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            //获取索引号
            var index = this.getAttribute('index');
            // index = num = circle;
            //添加动画ul动，距离等于索引号诚意图片宽度
            animate(ul, -index * focusWidth);
        });
    }
    ol.children[0].className = 'current';
    //克隆第一张图片
    var first = ul.children[0].cloneNode(true);
    //并且添加到最后
    ul.appendChild(first);

    var num = 0; //控制图片滚动
    var circle = 0;//控制小圆圈播放
    //右边添加点击事件
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            //播放到最后一张
            if (num == ul.children.length - 1) {
                ul.style.left = 0; //迅速跳回第一张
                num = 0;
            }
            num++;
            //添加动画，索引号乘以宽度
            animate(ul, -num * focusWidth, function () {
                flag = true; // 打开节流阀
            });

            circle++;
            if (circle == ol.children.length) {
                circle = 0;//跳回第一个
            }
            circleChange();
        }

    });

    //排他思想
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }


    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            circle--;
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    });

    var timer = setInterval(function () {
        arrow_r.click();
    }, 2000);


});