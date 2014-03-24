function getFriends() {
    $.ajax({
        datatype: 'json',
        url: url + "/api/friend/getfriends?userID=" + profile.userID,
        data: null,
        success: function (data) {
            friends = data;
            $('.friends .user').remove();
            $.each(friends, function (index, value) {
                if (value.friend != "From") {
                    if (value.friend == "Accepted") {
                        $(".friends").append('<li class="user"><a href="#show_friend" data-rel="close" data-transition="none" onclick="showFriend(' + value.userID + ')"><img src="images/profiles/nick.png"/><span>' + value.name + '</span><div class="clear-fix"></div></a></li>');
                    } else {
                        $(".friends").append('<li class="user"><a href="#show_friend" data-rel="close" data-transition="none" onclick="showFriend(' + value.userID + ')"><img src="images/profiles/nick.png"/><span>' + value.name + '</span><span class="request"><img src="images/accept_friend.png" onclick="acceptFriend(' + value.userID + ')"/><img src="images/decline_friend.png"  onclick="declineFriend(' + value.userID + ')"/></span><div class="clear-fix"></div></a></li>');
                    }
                }
            });
        },
        error: function (e) {
            alert("Could not fetch friends.");
        }
    });
}

function showFriend(userID) {
    $('.show_friend_invited').css("display", "none");
    $('.show_friend_info').css("display", "none");

    $.each(friends, function (index, value) {
        console.log(value);
        if (value.userID == userID) {
            friend = value;
        }
    });
    if (friend.friend == "Accepted") {
        $('.friend_name').text(friend.name);
        $('.show_friend_info').fadeIn();
    }
    if (friend.friend == "To") {
        $('.friend_name').text(friend.name);
        $('.show_friend_invited').fadeIn();
    }
}

function inviteFriend() {
    $.ajax({
        url: url + 'api/friend/invite?userID=' + profile.userID + '&friendName=' + $("#invite_email").val(),
        type: 'POST',
        async: false,
        contentType: 'application/json',
        data: null,
        success: function (e) {
            alert("Friend has been invited.");
        },
        error: function (e) {
            alert("The user was not found.");
        }
    });
}

function acceptFriend(friendID) {
    $.ajax({
        url: url + 'api/friend/accept?userID=' + profile.userID + '&friendID=' + friendID,
        type: 'POST',
        async: false,
        contentType: 'application/json',
        data: null,
        success: function (e) {
            alert("Friend has been accepted.");
            friend.friend = "Accepted";
            showFriend(friend.userID);
            getFriends();
        },
        error: function (e) {
            console.log(e);
            alert("Something went wrong.");
        }
    });
}

function declineFriend(friendID) {
    $.ajax({
        url: url + 'api/friend/decline?userID=' + profile.userID + '&friendID=' + friendID,
        type: 'POST',
        async: false,
        contentType: 'application/json',
        data: null,
        success: function (e) {
            alert("Friend has been declined.");
            getFriends();
            location.hash = "show_user";
        },
        error: function (e) {
            console.log(e);
            alert("Something went wrong.");
        }
    });
}