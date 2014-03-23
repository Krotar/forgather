//var url = "http://localhost:57320/";
//var url = "http://forgather.azurewebsites.net/";

var url;

if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
    url = "http://forgather.azurewebsites.net/";
} else {
    url = "http://localhost:57320/";
}