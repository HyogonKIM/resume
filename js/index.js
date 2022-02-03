

$('#nav .depth li').eq(0).addClass('on')
var cflag = false;
$('#nav .depth li a').on('click', function(e){
    e.preventDefault()
    cflag = true;
    $(this).parent().addClass('on').siblings().removeClass('on')
    
    
    var num = $(this).parent().index()
    var secDist = $('section').eq(num).offset().top
    if (num===0) {
        $('#sect2').removeClass('on')
        $('#nav').css({background:'#6667ab'})
    } else if (num===1) {
        $('#sect2').addClass('on')
        $('#sect3').removeClass('on')
        $('#nav').css({background:'#63B4B8'})
    } else if (num===2) {
        $('#sect3').addClass('on')
        $('#sect4').removeClass('on')
        $('#nav').css({background:'#A9E4D7'})
    } else if (num===3) {
        $('#sect4').addClass('on')
        $('#sect5').removeClass('on')
        $('#nav').css({background:'#63B4B8'})
    } else if (num===4) {
        $('#sect5').addClass('on')
        $('#nav').css({background:'#6667ab'})
    } 



    $('html, body').stop().animate({
        scrollTop : secDist
    }, 500, function(){
        cflag = false
    })
})


var sDist0 = $('#sect1').offset().top
var sDist1 = $('#sect2').offset().top
var sDist2 = $('#sect3').offset().top
var sDist3 = $('#sect4').offset().top
// 마지막구간이 윈도우높이보다 클때
var lastSect = $('#sect5').offset().top          
// 마지막구간이 윈도우높이보다 작을때
// var lastSect = $('body').height() - $(window).height()
var sct=0;
$(window).on('scroll', function(){
    sct = $(this).scrollTop()
    if ( sct>=sDist0 && sct<sDist1 && !cflag && !$('#sect').hasClass('on')) {
        $('#nav .depth li').eq(0).addClass('on').siblings().removeClass('on')
        $('#nav').css({background:'#6667ab'})
        $('#sect2').removeClass('on')
       
    } else if ( sct>=sDist1 && sct<sDist2 && !cflag) {
        $('#nav .depth li').eq(1).addClass('on').siblings().removeClass('on')
        $('#nav').css({background:'#63B4B8'})
        $('#sect2').addClass('on')
        $('#sect3').removeClass('on')
    } else if ( sct>=sDist2 && sct<sDist3 && !cflag) {
        $('#nav .depth li').eq(2).addClass('on').siblings().removeClass('on')
        $('#nav').css({background:'#A9E4D7'})
        $('#sect3').addClass('on')
        $('#sect4').removeClass('on')
    } else if ( sct>=sDist3 && sct<lastSect && !cflag) {
        $('#nav .depth li').eq(3).addClass('on').siblings().removeClass('on')
        $('#nav').css({background:'#63B4B8'})
        $('#sect4').addClass('on')
        $('#sect5').removeClass('on')
    }
    else if ( sct>=lastSect && !cflag) {
        $('#nav .depth li').eq(4).addClass('on').siblings().removeClass('on')
        $('#nav').css({background:'#6667ab'})
    } 
})



$('section').on('mousewheel', function(event, delta){
    if (delta>0) {    // 마우스휠을 위로 굴리면 양수
        $('html, body').stop().animate({
            scrollTop: $(this).prev().offset().top
        }, 1000)
    } else if (delta<0) {  // 마우스휠을 아래로 굴리면 음수
        $('html, body').stop().animate({
            scrollTop: $(this).next().offset().top
        }, 1000)
    }
})


var arrChartColor = ['#e8670c', '#ff9e5a', '#ff710d', '#7f4f2d', '#cc5b0b', '#cc3a1a'];
var arrPercent = [90, 80, 70, 60, 50]
$('.skills').each(function(idx){
    $(this).attr({'data-percent':arrPercent[idx]})
    $(this).easyPieChart({
        animate: 2000,       // 진행시간
        easing: 'easeOutBounce', // 속도함수
        barColor: arrChartColor[idx],   // 채워지는 색상
        trackColor: '#efefef', // 트색 색상
        scaleColor: false, // 눈금선 색상
        lineCap:'round', // 선의 끝 모양(butt, round, square)
        lineWidth:20, // 선의 폭
        size:180, // 원형차트의 크기
        // onStart:$.noop,
        // onStop:$.noop,
        onStep: function(from, to, percent) {  
            $(this.el).find('.percent').text(Math.round(percent));
        }
    })
})  

var flag = true;
$(window).on('scroll', function(){
    var sct = $(this).scrollTop();
    if (sct>0 && flag) {
         $('.skills').each(function(idx){
            $(this).data('easyPieChart').disableAnimation().update(0).enableAnimation().update(arrPercent[idx]);
         })
         flag = false
    } else if ( sct==0 && !flag ) {
        $('.skills').each(function(idx){
            $(this).attr({ 'data-percent':0 })
        })
        flag = true
    }
});

$('#nav .depthcover1 a').on('click', function(){
    var index = $('#nav .depth li.on').index()
    var prev = $('section').eq(index).prev().offset().top
    $('body, html').stop().animate({scrollTop: prev}, 800)
})
$('#nav .depthcover2 a').on('click', function(){
    var index = $('#nav .depth li.on').index()
    var next = $('section').eq(index).next().offset().top
    $('body, html').stop().animate({scrollTop: next}, 800)
})

// portfolio 페이지 메뉴 클릭 이벤트
$('#sect4 .category ul li').on('click', function(){
    var num = $(this).index()
    $(this).addClass('on').siblings().removeClass('on')
    $('#sect4 .content ul').eq(num).addClass('on').siblings().removeClass('on')
})
