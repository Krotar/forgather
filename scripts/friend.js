function getFriends() {
    $.ajax({
        datatype: 'json',
        url: url + "api/friend/getfriends?userID=" + profile.userID,
        data: null,
        success: function (data) {
            friends = data;
            $('.friends .user').remove();
            $.each(friends, function (index, value) {
                if (value.friend != "From") {
                    if (value.friend == "Accepted") {
                        $(".friends").append('<li class="user friend' + value.userID + '" ><a href="#show_friend" data-rel="close" data-transition="none" onclick="showFriend(' + value.userID + ')"><img src="images/profiles/nick.png"/><span>' + value.name + '</span><div class="clear-fix"></div></a></li>');
                    } else {
                        $(".friends").append('<li class="user friend' + value.userID + '"><a href="#show_friend" data-rel="close" data-transition="none" onclick="showFriend(' + value.userID + ')"><img src="images/profiles/nick.png"/><span>' + value.name + '</span><span class="request"><img src="images/accept.png" onclick="acceptFriend(' + value.userID + ')"/><img src="images/delete.png"  onclick="declineFriend(' + value.userID + ')"/></span><div class="clear-fix"></div></a></li>');
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
    $('#show_friend_container').css("display", "none");

    document.getElementsByClassName("friend_name")[0].focus();
    friends.forEach(function (friend) {
        var elements = document.getElementsByClassName("friend" + friend.userID);
        $.each(elements, function (index, value) {
            value.style.display = "block";
        });
    });

    $.each(friends, function (index, value) {
        console.log(value);
        if (value.userID == userID) {
            friend = value;
        }
    });

    if (friend.friend == "Accepted") {
        number = false;
        mail = false;
        social = false;
        gaming = false;
        $('.friend_name').text(friend.name);
        $('#show_friend_container').fadeIn();

        //opvullen lijst van info
        $("#show_friend_container").empty();
        for (var i = 0; i < categories.length; i++) {
            for (var property in friend) {
                if (friend[property] != null) {
                    if (categories[i][0] == property) {
                        if (!window[categories[i][1]]) {
                            $("#show_friend_container").append('<div class="section"><p class="left"><img src="images/buttons/' + categories[i][1] + '.png" /></p><ul class="left" id="show_friend_' + categories[i][1] + '_container"></ul><div class="clear-fix"></div></div>');
                            window[categories[i][1]] = true;
                        }
                        $('#show_friend_' + categories[i][1] + '_container').append('<li><img src="images/buttons/' + property + '.png" class="left"/><span class="left">' + friend[property] + '</span></li>');
                    }
                }
            }
        }

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


function deleteFriend() {
    $.ajax({
        url: url + 'api/friend/delete?userID=' + profile.userID + '&friendID=' + friend.userID,
        type: 'POST',
        async: false,
        contentType: 'application/json',
        data: null,
        success: function (e) {
            getFriends();
        },
        error: function (e) {
            alert("Something went wrong.");
        }
    });
}

function acceptFriend(friendID) {
    if (friendID == null) {
        friendID = friend.userID;
    }

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
    if (friendID == null) {
        friendID = friend.userID;
    }

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

function searchFriends() {
    var searchContact = document.getElementsByClassName("search_contact");

    $.each(searchContact, function (index, element) {
        element.addEventListener("keyup", function () {
            console.log(element.value);
            friends.forEach(function (friend) {
                if (friend.name.toLowerCase().indexOf(element.value.toLowerCase()) >= 0) {
                    var elements = document.getElementsByClassName("friend" + friend.userID);
                    $.each(elements, function (index, value) {
                        value.style.display = "block";
                    });
                } else {
                    var elements = document.getElementsByClassName("friend" + friend.userID);
                    $.each(elements, function (index, value) {
                        value.style.display = "none";
                    });
                }
            });
        });
    });
}