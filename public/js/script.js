function changeTop(username) { //登陆后修改顶部
    var signInLink = document.getElementById("sign-in-link");
    var signUpLink = document.getElementById("sign-up-link");
    document.getElementById("sign-list").removeChild(signInLink);
    document.getElementById("sign-list").removeChild(signUpLink);

    var userAccount = document.createElement("div");
    userAccount.className = "sign-link";
    userAccount.id = "user-account-btn";
    userAccount.innerHTML = username;
    userAccount.addEventListener('click', () => {
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        location.href = `/profile/${userInfo.user.username}`; //go to user profile
    })
    document.getElementById("sign-list").appendChild(userAccount);

    var logOut = document.createElement("div");
    logOut.className = "sign-link";
    logOut.id = "log-out-btn";
    logOut.innerHTML = "Log Out";
    logOut.addEventListener('click', () => {
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        userInfo.token = "invalid"; //making token malformed
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        location.href = '/'; //back to home page
    })
    document.getElementById("sign-list").appendChild(logOut);
}

async function checkLogIn() {
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //userInfo.token = "invalid"; //for test, making token malformed
    if (userInfo) console.log(userInfo.token);
    let res = await fetch('/', {
        method: "GET",
        mode: "cors",
        redirect: "follow",
        headers: {
            authorization: JSON.stringify(userInfo)
        }
    });
    console.log(res.msg);
    if (res.status == 401) { //for users not logged in
        // let result = await res.json();
        // alert(result.msg); //session invalid
    } else if (res.status == 200) changeTop(userInfo.user.username);
}
checkLogIn();

const container = document.querySelector('.container');
const tp = document.querySelector('.top');

const colors = ["#6495ed", "#7fffd4", "#ffa07a", "#f08080", "#afeeee"];

let i = 0;

Array.from(document.querySelectorAll(".nav-link")).forEach(item => {
    item.style.cssText = `background-color: ${colors[i++]}`;
    item.addEventListener('click', () => {
        container.classList.remove('change');
    });
});

Array.from(document.querySelectorAll(".navigation-button")).forEach(item => {
    item.onclick = () => {
        item.parentElement.parentElement.classList
            .toggle("change");
    }
});

document.querySelector('.open-navbar-icon').addEventListener('click', () => {
    tp.classList.add('change');
});

document.querySelector('.close-navbar-icon').addEventListener('click', () => {
    tp.classList.remove('change');
});

Array.from(document.getElementsByName('nav-link')).forEach(item => {
    item.onclick = () => {
        tp.classList.remove('change');
    }
})

Array.from(document.getElementsByName('sign-btn')).forEach(item => {
    item.onclick = () => {
        window.localStorage.setItem("sign-btn", location.href);
        console.log(location.href);
    }
})

document.querySelector(".form-btn").onclick = () => {
    swal({
        title: `Thanks for your message!`,
        icon: "success",
    })
}

function navToIndexFromOtherPage() {
    var tmp = localStorage.getItem("href#");
    console.log(tmp);
    if (!tmp || !tmp.length) return;
    $(window).load(function() {
        console.log("okay");
        if (typeof($('#' + tmp).offset()) == "undefined") return;
        console.log($('#' + tmp).offset().top);
        $("html, body").animate({
            scrollTop: $(`#${tmp}`).offset().top
        }, 600);
    })
    localStorage.setItem("href#", "");
}
navToIndexFromOtherPage();

$(window).load(function() {
    $("a").click(function() {
        var offset = $($.attr(this, 'href')).offset();
        if (typeof(offset) == "undefined") return;
        $("html, body").animate({
            scrollTop: offset.top
        }, 600);
        console.log(offset.top)
        return false;
    });
})