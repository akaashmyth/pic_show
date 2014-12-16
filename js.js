(function($) {
    $.fn.extend({
        // @图片播放模型  start
        "picShow" : function (options){
            options = $.extend({
                removing: false,
                picBoxShow: false
            }, options);
            var obj = $(this);
            obj.find(".js_Next").undelegate();
            obj.find(".js_Prev").undelegate();
            var liWidth = obj.find(".s_nav li").outerWidth(true);
            var ulWidth = liWidth*obj.find(".s_nav li").length;
            var s_navWidth = obj.find(".s_nav").width();
            obj.find(".next").attr("class","next");
            obj.find(".prev").attr("class","prev");
            var mr = parseInt(obj.find(".s_nav li").css("margin-right"));
            obj.find(".count").html("<em>1</em> / "+ obj.find(".s_nav li").length + "张");
            // 如果picBoxShow 为true 的时候 则点击小图的时候可以显示大图
            if(options.picBoxShow){
                obj.find(".pic_show_box_nav li").click(function (){
                    $(this).addClass("on").siblings().removeClass("on");
                    obj.find(".pic_show_box img").attr("src",$(this).find("img").attr("data-img"));
                    obj.find(".count em").html($(this).index()+1)
                });
            }
            if( ulWidth > s_navWidth+mr && options.removing ){
                obj.find(".s_nav ul").css("width",ulWidth);
                obj.find(".next").addClass("js_Next");

                obj.delegate(".js_Prev","click", function (){

                    obj.find(".next").addClass("js_Next");
                    var left = obj.find(".s_nav ul").position().left;
                    if( left+options.removing >= 0 ){
                        obj.find(".s_nav ul").animate({"left": 0});
                        obj.find(".prev").removeClass("js_Prev");
                    }else{
                        obj.find(".s_nav ul").animate({"left":left + options.removing});
                    }
                });
                obj.delegate(".js_Next","click", function (){
                    
                    obj.find(".prev").addClass("js_Prev");
                    var left = obj.find(".s_nav ul").position().left;
                    if( ulWidth+(left-options.removing) <= s_navWidth+mr ){
                        obj.find(".s_nav ul").animate({"left":left - (left+(ulWidth - s_navWidth - mr))});
                        obj.find(".next").removeClass("js_Next");
                    }else{
                        obj.find(".s_nav ul").animate({"left":left-options.removing});
                    }
                });
            }
        }
        // @图片播放模型   end
    });
})(jQuery)