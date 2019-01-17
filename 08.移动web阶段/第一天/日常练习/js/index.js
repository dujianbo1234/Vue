window.onload = function () {
    headerSearch();
    coundtDown();
    bannerEffect();
}
// 头部搜索栏效果
function headerSearch() {
    var banner = document.querySelector(".jd_banner");
    var header = document.querySelector('.jd_header');
    //1. 获取banner当前的高度
    var bannerHight = banner.offsetHeight;
    window.onscroll = function () {
        //2. 获取banner滚动了多少距离
        var offsetTop = document.body.scrollTop || document.documentElement.scrollTop;
        // console.log(offsetTop);
        // 3.计算比例,获取透明度,设置背景颜色样式
        var opacity = 0;
        // 判断:如果banner还没有滚动出屏幕,才有必要进行计算和设置透明度
        if(offsetTop < bannerHight){
            opacity = offsetTop/bannerHight;
            header.style.backgroundColor = "rgba(233,35,34,"+opacity+")";
        }
    }
}
// 倒计时效果
function coundtDown (){
    // 获取用于展示时间的span
    var spans = document.querySelector('.jd_time').querySelectorAll('span');
    // 设置倒计时
    var totalTime = 3800;
    // 开启定时器
    var timerID = setInterval(function(){
        totalTime--;
        // 判断,如果totalTime小于零,停止定时器
        if(totalTime < 0){
            clearInterval(timerID);
            return;
        }
        // 获取时
        var hour = Math.floor(totalTime/3600);   //3800/3600 = 1
        // 获取分
        var min = Math.floor(totalTime%3600/60);    //3800%3600/60 = 3
        // 获取秒
        var second = Math.floor(totalTime%60);  //3800%60 = 2
        // 将获得的时间填充到span中
        spans[0].innerHTML = Math.floor(hour/10);
        spans[1].innerHTML = Math.floor(hour%10);
        spans[3].innerHTML = Math.floor(min/10);
        spans[4].innerHTML = Math.floor(min%10);
        spans[6].innerHTML = Math.floor(second/10);
        spans[7].innerHTML = Math.floor(second%10);
    },1000);
}
// 轮播图效果
function bannerEffect(){
    // 修改轮播图结构,在开始插入最后一张图片,在最后拆入第一张图片
    // 1.1获取轮播图结构
    var banner = document.querySelector('.jd_banner');
    // 1.2获取图片容器
    var imgBox=banner.querySelector("ul:first-of-type");
    // 1.3获取第一张图
    var first = imgBox.querySelector('li:first-of-type');
    // 1.4获取最后一张图
    var last = imgBox.querySelector('li:last-of-type');
    // 1.5在imgBox首尾插入一张图片  cloneNode:复制一个dom元素
    imgBox.appendChild(first.cloneNode(true));
    /*insertBefore(需要插入的dom元素，位置)*/
    imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);

    // 2.设置对应样式
    /*2.1获取所有li元素*/
    var lis = imgBox.querySelectorAll('li');
    /*2.2 获取li元素的数量*/
    var lisNum = lis.length;
    /*2.3.获取banner的宽度*/
    var bannerWidth = banner.offsetWidth;
    /*2.4 设置图片盒子的宽度*/
    imgBox.style.width = lisNum*bannerWidth + 'px';
    /*2.5 设置每一个li(图片)元素的宽度*/
    for(var i=0; i < lis.length;i++){
        lis[i].style.width = bannerWidth + 'px';
    }
    /*定义图片索引:图片已经有一个宽度的默认偏移*/
    var index = 1;
    /*3.设置默认的偏移*/
    imgBox.style.left = -bannerWidth + 'px';
    /*4.当屏幕变化的时候，重新计算宽度*/
    window.onresize = function(){
        /*4.1.获取banner的宽度,覆盖全局的宽度值*/
        bannerWidth = banner.offsetWidth;
        /*4.2 设置图片盒子的宽度*/
        imgBox.style.width = lisNum*bannerWidth + 'px';
        /*4.3设置每一个li(图片)元素的宽度*/
        for(var i=0;i<lis.length;i++){
            lis[i].style.width = bannerWidth + 'px';
        }
        /*4.4重新设置定位值*/
        imgBox.style.left = -index*bannerWidth + 'px';
    }
    /* 5.实现自动轮播 */
    var timerId;
    var stratTime = function(){
        timerId = setInterval(function(){
            // 5.1变换索引(往左滚动所以索引要++)
            index++;
            // 5.2添加过渡效果
            imgBox.style.transition = "left 0.5s ease-in-out";
            // 5.3设置偏移
            imgBox.style.left = -index*bannerWidth + 'px';
            setTimeout(function(){
                if(index == lisNum-1){
                    index = 1;
                    // 如果一个元素的某个属性之前添加过渡效果,那么过渡效果会一直存在,如果不要需要清除掉
                    // 关闭过渡效果
                    imgBox.style.transition = 'none';
                    // 偏移到指定位置
                    imgBox.style.left = -index*bannerWidth + 'px';
                }
            },500);
        },2000);
    }
    stratTime();
}

