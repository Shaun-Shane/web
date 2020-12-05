async function checkLogIn() {
  var userInfo = JSON.parse(localStorage.getItem('userInfo'));
  //userInfo.token = "invalid"; //for test, making token malformed
  if (userInfo) console.log(userInfo.token);
  let res = await fetch('/story', {
    method: "GET",
    mode: "cors",
    redirect: "follow",
    headers: {
      authorization: JSON.stringify(userInfo)
    }
  });
  if (res.status == 401) { //for users not logged in
    let result = await res.json();
    alert(result.msg); //session invalid
    location.href = '/';
  }
}
checkLogIn();

Array.from(document.getElementsByName('sign-btn')).forEach(item => {
  item.onclick = () => {
    window.localStorage.setItem("sign-btn", location.href);
    console.log(location.href);
  }
})

Array.from(document.querySelectorAll(".footer-link")).forEach(item => {
  item.onclick = () => {
    var tmp = String(item.getAttribute("href"));
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

$("a").click(function () {
  $("html, body").animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 600);
  return false;
});



