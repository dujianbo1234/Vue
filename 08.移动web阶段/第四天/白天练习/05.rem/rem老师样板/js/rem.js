$(window).on("resize",function(){
    /* 1、获取屏幕的宽度 */
   width=$("html").width();
   console.log(width,666)
   
   /* 2、计算font-size */
   fontSize=width/640*100;
   $("html").css("font-size",fontSize)
   // $("html").css({"font-size":fontSize})
}).trigger("resize");