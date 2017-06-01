$(function () {


    // 头部
    $(".button-collapse").sideNav();

    $('.materialboxed').materialbox();

    var $map=$('.m-map');

    if($map.length){
    	
    	
      var map = new BMap.Map('map'); 
      var point = new BMap.Point(114.411664, 30.512013);  
      map.centerAndZoom(point, 15);
      map.enableScrollWheelZoom(true);
      var marker = new BMap.Marker(point);  
      // 创建标注
      map.addOverlay(marker);               
    // 将标注添加到地图中
    marker.setAnimation(BMAP_ANIMATION_BOUNCE); 
    //跳动的动画
    // 覆盖区域图层测试
    map.addTileLayer(new BMap.PanoramaCoverageLayer());
    var stCtrl = new BMap.PanoramaControl(); 
    //构造全景控件
    stCtrl.setOffset(new BMap.Size(20, 20));
    map.addControl(stCtrl);
    //添加全景控件
    map.addControl(new BMap.NavigationControl());    
    map.addControl(new BMap.ScaleControl());    
    // map.addControl(new BMap.OverviewMapControl());    
    // map.addControl(new BMap.MapTypeControl());    
    map.setCurrentCity("武汉"); 


}



})