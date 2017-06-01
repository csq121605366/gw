$(function() {

    // 头部
    $(".button-collapse").sideNav();


    var $map=$('.m-map');
    if($map.length){
    	
    	function initialize() {  
    		var mp = new BMap.Map('map'); 
    		console.log(mp)
    		mp.centerAndZoom(new BMap.Point(121.491, 31.233), 11);  
    	}  
    	
    	function loadScript() {  
    		var script = document.createElement("script");  
    		script.src = "http://api.map.baidu.com/api?v=2.0&ak=MhdTi8ClYYqNTLG6TXZP9edTXZLDGGsb&callback=initialize";
    		document.body.appendChild(script);  
    	}  
    	window.onload = loadScript;  


    }


})