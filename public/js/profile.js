function sessionInvalidAlert(msg) {
    swal({
        title: `${msg}`,
        icon: "error",
    }).then(function() {
        location.href = '/';
    })
}

async function checkLogIn() {
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //userInfo.token = "invalid"; //for test, making token malformed
    if (userInfo) console.log(userInfo.token);
    //console.log(location.href);
    let res = await fetch(location.href, {
        method: "GET",
        mode: "cors",
        redirect: "follow",
        headers: {
            authorization: JSON.stringify(userInfo)
        }
    });
    if (res.status == 401) { //for users not logged in
        let result = await res.json();
        sessionInvalidAlert(result.msg); //session invalid
    } else { //user is logged inUser
        console.log(userInfo);
        document.getElementById("username").innerHTML = userInfo.user.username;
        document.getElementById("form-username").innerHTML = userInfo.user.username;
        if (userInfo.user.last_login)
            document.getElementById("Last-sign-in").innerHTML = userInfo.user.last_login;
        else
            document.getElementById("Last-sign-in").innerHTML = userInfo.user.registered;
        document.getElementById("Registered").innerHTML = userInfo.user.registered;
    }
}
checkLogIn();

if (document.getElementById("Back")) {
    document.getElementById("Back").addEventListener('click', () => {
        window.history.back();
    })
}

async function deleteAccount() {
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(userInfo.username);
    let res = await fetch(location.href, {
        method: "POST",
        mode: "cors",
        redirect: "follow",
        headers: {
            authorization: JSON.stringify(userInfo)
        }
    });
    swal({
        title: `Good Bye ${userInfo.user.username}`,
        icon: "success",
    }).then(function() {
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        userInfo.token = "invalid"; //making token malformed
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        location.href = '/';
    })
}

if (document.getElementById("DeleteAccount")) {
    document.getElementById("DeleteAccount").addEventListener('click', async() => {
        swal("Do you really want to do this?", {
            buttons: {
                cancel: "No",
                yes: {
                    text: "Yes! Delete this account.",
                    value: "deleteAccount",
                },
            },
            icon: "warning",
        }).then((value) => {
            switch (value) {
                case "deleteAccount":
                    deleteAccount();
                    break;
            }
        });
    })
}