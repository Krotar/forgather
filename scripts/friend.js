﻿function getFriends() {
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
                        $(".friends").append('<li class="user" onclick="showFriend(' + value.userID + ')"><img src="images/profiles/nick.png"/><span>' + value.name + '</span><div class="clear-fix"></div></li>');
                    } else {
                        $(".friends").append('<li class="user" onclick="showFriend(' + value.userID + ')"><img src="images/profiles/nick.png"/><span>' + value.name + ' - Request</span><div class="clear-fix"></div></li>');
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
    $(".show_friend_hide_panel").click();
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
            getFriends();
        },
        error: function (e) {
            console.log(e);
            alert("The user was not found.");
        }
    });
}

function acceptFriend() {
    $.ajax({
        url: url + 'api/friend/accept?userID=' + profile.userID + '&friendID=' + friend.userID,
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
            alert("The user was not found.");
        }
    });
}

function declineFriend() {
    $.ajax({
        url: url + 'api/friend/decline?userID=' + profile.userID + '&friendID=' + friend.userID,
        type: 'POST',
        async: false,
        contentType: 'application/json',
        data: null,
        success: function (e) {
            alert("Friend has been declined.");
            getFriends();
            $(".show_friend_show_user").click();
        },
        error: function (e) {
            console.log(e);
            alert("The user was not found.");
        }
    });
}