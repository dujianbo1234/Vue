window.onload = function () {
    // 获取左侧栏
    var left_box = document.querySelector('.left_box');
    // 获取左侧栏高度
    var left_boxHeight = left_box.offsetHeight;
    // 获取用来滑动的列表
    var ulBox = document.querySelector('ul:first-of-type');
    // 获取滑动列表的高
    var ulBoxHeight = ulBox.offsetHeight;
    // 获取所有li元素
    var lis = ulBox.querySelectorAll("li");
    // 计算静止最大,最小区间
    var maxTop = 0;
    var minTop = left_boxHeight - ulBoxHeight;
    // 设置滑动状态下的最大,最小区间
    var maxBounceTop = maxTop + 100;
    var minBounceTop = minTop - 100;
    console.log(maxBounceTop + ':' + minBounceTop);

    /* 1.实现滑动 */
    var startY = 0;
    var moveY = 0;
    var distanceY = 0;
    // 设置一个变量保存每次移动后的值
    var currentY = 0;
    // 添加滑动事件
    ulBox.addEventListener("touchstart", function (e) {
        // 获取手指起始坐标
        startY = e.targetTouches[0].clientY;
    });
    // 滑动中的事件
    ulBox.addEventListener("touchmove", function (e) {
        moveY = e.targetTouches[0].clientY;
        // 计算距离的差异
        distanceY = moveY - startY;
        // 判断滑动的时候是否超出当前指定滑动区间
        if (currentY + distanceY > maxBounceTop || currentY + distanceY < minBounceTop) {
            console.log('超出范围了');
            return;
        }
        // 将之前可能存在的偏移效果清除
        ulBox.style.transition = 'none';
        // 设置偏移效果:应该在之前滑动的距离基础上再进行滑动操作
        ulBox.style.top = currentY + distanceY + 'px';
    });
    // 滑动事件结束时
    ulBox.addEventListener("touchend", function (e) {
        // 判断当前滑动的距离是否在静止状态和滑动状态下的最小top值之间
        if (currentY + distanceY < minTop) {
            currentY = minTop;
            // 如果上次滑动数据+这次滑动距离<静止状态最小top值时
            ulBox.style.transition = 'top 0.5s';
            ulBox.style.top = minTop + 'px';
        } else if (currentY + distanceY > maxTop) {
            currentY = maxTop;
            /*回到maxTop位置*/
            ulBox.style.transition = "top 0.5s";
            ulBox.style.top = maxTop + "px";
        } else {
            /*记录当前滑动的距离*/
            currentY += distanceY;
        }
    });

    /* 2.添加左边点击事件 */
    /* 为每一个li元素设置添加一个索引值 */
    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
    }
    /*绑定fastclick*/
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            /*参数可以是任意的dom元素，如果写document.body，说明会将document.body下面的所的元素都绑定fastclick*/
            FastClick.attach(document.body);
        }, false);
    }
    /*fastclick使用的时候就是来绑定添加click事件*/
    ulBox.addEventListener('click', function (e) {
        /*1.修改li元素的样式：将所有li元素的active样式清除，再为当前被点击的li元素添加active样式*/
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove("active");
        }
        /*为当前被单击的li元素添加样式*/
        var li = e.target.parentNode;
        var liHeight = li.offsetHeight;
        li.classList.add('active');

        /*2.移动当前的li元素到父容器的最顶部，但是不能超出之前设定了静止状态下的最小top值*/
        /*获取当前li元素的索引值*/
        var index = li.index;
        /*开启过渡*/
        ulBox.style.transition = "top .5s";
        /*设置偏移*/
        if (-index * liHeight < minTop) {
            ulBox.style.top = minTop + 'px';
            currentY = minTop;
        } else {
            ulBox.style.top = -index * liHeight + 'px';
            currentY = -index * liHeight;
        }
    });

}