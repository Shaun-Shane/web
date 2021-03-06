if (document.getElementById("Back")) {
    document.getElementById("Back").addEventListener('click', () => {
        var url = window.localStorage.getItem("sign-btn");
        console.log(url);
        location.href = url;
        //window.history.back();
    })
}

function signUpAlert(result, res) {
    swal({
        title: `${result.msg}`,
        icon: `${res.status == 201 ? "success" : (res.status == 400 ? "warning" : "error")}`,
    }).then(function() {
        if (result.url) window.location.href = result.url;
    });
}

if (document.getElementById("sign-up-form")) {
    document.getElementById("sign-up-form").addEventListener('submit', async(e) => {
        e.preventDefault();

        let formData = new FormData(document.getElementById("sign-up-form"));
        var jsonObj = {};
        for (let [name, value] of formData) {
            jsonObj[name] = value; // key1 = value1, then key2 = value2
        }
        console.log(jsonObj);

        let res = await fetch('/sign-up', {
            method: "POST",
            mode: "cors",
            redirect: "follow",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(jsonObj)
        });
        let result = await res.json();
        signUpAlert(result, res);
    })
}

function signInAlert(result, res) {
    swal({
        title: `${result.msg}`,
        icon: `${res.status == 200 ? "success" : "error"}`,
    }).then(function() {
        if (res.status != 200) return; //is not logged in
        let url = window.localStorage.getItem("sign-btn");
        window.localStorage.setItem('userInfo', JSON.stringify(result)); //set localStorage token
        location.href = url;
    });
}

if (document.getElementById("sign-in-form")) {
    document.getElementById("sign-in-form").addEventListener('submit', async(e) => {
        e.preventDefault();

        //var data = new FormData(signForm);
        let formData = new FormData(document.getElementById("sign-in-form"));

        var jsonObj = {};
        for (let [name, value] of formData) {
            jsonObj[name] = value; // key1 = value1, then key2 = value2
        }
        console.log(jsonObj);

        let res = await fetch('/sign-in', {
            method: "POST",
            mode: "cors",
            redirect: "follow",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(jsonObj)
        });
        let result = await res.json();
        signInAlert(result, res);
    })
}