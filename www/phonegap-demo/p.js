// This is a JavaScript file
var pictureSource;   // picture source
var destinationType; // sets the format of returned value

// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
function onDeviceReady() {
  pictureSource=navigator.camera.PictureSourceType;
  destinationType=navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
  // Uncomment to view the base64-encoded image data
  // console.log(imageData);

  // Get image handle
  //
  var smallImage = document.getElementById('smallImage');

  // Unhide image elements
  //
  smallImage.style.display = 'block';

  // Show the captured photo
  // The inline CSS rules are used to resize the image
  //
  smallImage.src = "data:image/jpeg;base64," + imageData;

  $("#image-data").empty().val(imageData);
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
  // Uncomment to view the image file URI
  // console.log(imageURI);

  // Get image handle
  //
  var largeImage = document.getElementById('largeImage');

  // Unhide image elements
  //
  largeImage.style.display = 'block';

  // Show the captured photo
  // The inline CSS rules are used to resize the image
  //
  largeImage.src = imageURI;
}

// A button will call this function
//
function capturePhoto() {
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
  destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function capturePhotoEdit() {
  // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
  destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function getPhoto(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
  destinationType: destinationType.FILE_URI,
  sourceType: source });
}

// Called if something bad happens.
//
function onFail(message) {
  alert('Failed because: ' + message);
}

function sendPhoto(){
    var data = $("#image-data").val();
    var kind = $("#command").val();
    var uuid = $("#uuid").val();
    if (data){
        $.ajax({
            url: "https://park.mq-sol.jp/surveys/jsonp/",
            type: "POST",
            crossDomain: true,
            data: {
                pict: data,
                kind: kind,
                uuid: uuid
            },
            //dataType: "json",
            dataType: "text",
            success:function(result){
                console.log("ok");
                console.log(result);
                $("#smallImage").attr("src","");
                $("#image-data").val("");
            },
            error:function(xhr,status,error){
                console.log("ng")
                console.log(status)
                console.log(error);
            }
        });
    }else{
        alert("写真を撮影していません");
    }

}