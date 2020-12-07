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
    alert(result.msg); //session invalid
    location.href = '/';
  }
}
checkLogIn();

if (document.getElementById("Back")) {
  document.getElementById("Back").addEventListener('click', () => {
    var url = window.localStorage.getItem("sign-btn");
    console.log(url);
    location.href = url; 
    //window.history.back();
  })
}

