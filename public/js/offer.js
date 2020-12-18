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
        location.href = location.href; //still stay at about page
    })
    document.getElementById("sign-list").appendChild(logOut);
}

async function checkLogIn() {
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //userInfo.token = "invalid"; //for test, making token malformed
    if (userInfo) console.log(userInfo.token);
    let res = await fetch('/offer', {
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
checkLogIn(); //用于检查用户是否登录

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

if (document.querySelector('.open-navbar-icon')) {
    document.querySelector('.open-navbar-icon').addEventListener('click', () => {
        tp.classList.add('change');
    });
}

if (document.querySelector('.close-navbar-icon')) {
    document.querySelector('.close-navbar-icon').addEventListener('click', () => {
        tp.classList.remove('change');
    });
}

Array.from(document.getElementsByName('sign-btn')).forEach(item => {
    item.onclick = () => {
        window.localStorage.setItem("sign-btn", location.href);
        console.log(location.href);
    }
})

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

Array.from(document.querySelectorAll(".nav-link")).forEach(item => {
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

$(window).load(function() {
    $("a").click(function() {
        $("html, body").animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 600);
        return false;
    });
})


//ppz ↓
Array.from(document.querySelectorAll(".card")).forEach(item => {
    item.onclick = () => {
        item.parentElement.parentElement.classList
            .toggle("change");
    }
});