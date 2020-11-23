function goBack() {
  // console.log(window.location.pathname);
  // while (window.location.pathname == "/public/sign-in.html" || window.location.pathname == "/public/sign-out.html")
    window.history.back();
}

// $("a").click(function () {
//     $("html, body").animate({
//       scrollTop: $($.attr(this, 'href')).offset().top
//     }, 600);
//     return false;
// });