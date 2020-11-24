document.getElementById("Back").addEventListener('click', () => {
  var url = window.localStorage.getItem("sign-btn");
  location.href = url;
  //console.log(url);
  //window.history.back();
})


// $("a").click(function () {
//     $("html, body").animate({
//       scrollTop: $($.attr(this, 'href')).offset().top
//     }, 600);
//     return false;
// });