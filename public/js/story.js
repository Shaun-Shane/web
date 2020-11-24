Array.from(document.getElementsByName('sign-btn')).forEach(item => {
  item.onclick = () => {
    window.localStorage.setItem("sign-btn", location.href);
    console.log(location.href);
  }
})

$("a").click(function () {
    $("html, body").animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 600);
    return false;
});


