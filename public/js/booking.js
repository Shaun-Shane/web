function sessionInvalidAlert(msg) {
    swal({
        title: `${msg}`,
        icon: "error",
    }).then(function() {
        localStorage.setItem("href#", "Tours");
        location.href = '/';
    })
}

async function checkLogIn() {
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //userInfo.token = "invalid"; //for test, making token malformed
    if (userInfo) console.log(userInfo.token);
    let res = await fetch('/booking', {
        method: "GET",
        mode: "cors",
        redirect: "follow",
        headers: {
            authorization: JSON.stringify(userInfo)
        }
    });
    console.log(res.msg);
    if (res.status == 401) { //for users not logged in
        let result = await res.json();
        sessionInvalidAlert(result.msg);
    } else if (res.status == 200) {
        //show img
        document.getElementById("booking-img").style.cssText = "opacity: 1.0";
    }
}
checkLogIn();

if (document.getElementById("Back")) {
    document.getElementById("Back").addEventListener('click', () => {
        localStorage.setItem("href#", "Tours");
        location.href = '/';
        //window.history.back();
    })
}