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
    } else { //user is logged in
        document.getElementById("user-account-btn").innerHTML = userInfo.user.username;
        document.querySelector(".container").style.cssText = "opacity: 1.0";
    }
}
checkLogIn();

Array.from(document.querySelectorAll(".story-bg")).forEach(item => {
    if (item.parentElement.getAttribute("href") == "#TOP") {
        item.onclick = () => {
            swal({
                title: `Story is constructing! Please wait for a while...`,
                icon: "info",
            })
        }
    }
});

Array.from(document.querySelectorAll(".footer-link")).forEach(item => {
    item.onclick = () => {
        var tmp = String(item.getAttribute("href"));
        if (!tmp.includes("#")) {
            window.location.href = "/" + tmp;
            return;
        }
        window.localStorage.setItem("href#", tmp.split('#')[1]);
        console.log(tmp.split('#')[1]);
        console.log(window.localStorage.getItem("href#"));
        location.href = '/';
    }
});

Array.from(document.querySelectorAll(".back-link")).forEach(item => {
    item.onclick = () => {
        var tmp = String(item.getAttribute("href"));
        window.localStorage.setItem("href#", tmp.split('#')[1]);
        console.log(tmp.split('#')[1]);
        console.log(window.localStorage.getItem("href#"));
        location.href = '/';
    }
});

if (document.getElementById("user-account-btn")) {
    document.getElementById("user-account-btn").onclick = () => {
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        location.href = `/profile/${userInfo.user.username}`; //go to user profile
    }
}

if (document.getElementById("log-out-btn")) {
    document.getElementById("log-out-btn").onclick = () => {
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        userInfo.token = "invalid"; //making token malformed
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        location.href = '/'; //back to home page
    }
}

$(window).load(function() {
    $("a").click(function() {
        $("html, body").animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 600);
        return false;
    });
})