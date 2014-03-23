//var url = "http://localhost:57320/";
//var url = "http://forgather.azurewebsites.net/";

var url;

$.ajax({
    datatype: 'json',
    url: "http://localhost:57320/api/friend/getfriends?userID=5",
    data: null,
    async: false,
    success: function (data) {
        url = "http://localhost:57320/";
    },
    error: function (e) {
        url = "http://forgather.azurewebsites.net/";
    }
});

if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
    alert("device");
} else {
    alert("browser");
}