var location_loader = function(){
    console.log("load location");
    var latitude = null;
    var longitude = null;
 
    // 位置情報取得オブジェクトチェック
    if (!navigator.geolocation){
        console.log("Geolocation 使用不可");
        return;
    }
 
    // 位置情報取得オブジェクトオプション
    var option = {
        enableHighAccuracy:true,   // GPS利用
        maximumAge: 30000,
        timeout: 5000,
    }
 
    // 位置情報を取得
    navigator.geolocation.getCurrentPosition(resultHandler, errorHandler, option);
 
    // 位置情報取得成功時
    function resultHandler(position){
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log("latitude:" + latitude);
        console.log("longitude:" + longitude);
    }
 
    // 位置情報取得失敗時
    function errorHandler(error){
        console.log(error.message);
    }
};

function initMap() {
    console.log("GMAP")
    var lat = 35.621393;
    var lng = 139.723364;
    var shinagawa = {lat: lat, lng: lng};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: shinagawa
    });
    location_loader();
}