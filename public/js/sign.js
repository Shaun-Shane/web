document.getElementById("Back").addEventListener('click', () => {
  var url = window.localStorage.getItem("sign-btn");
  console.log(url);
  location.href = url;
  //window.history.back();
})


// $("a").click(function () {
//     $("html, body").animate({
//       scrollTop: $($.attr(this, 'href')).offset().top
//     }, 600);
//     return false;
// });