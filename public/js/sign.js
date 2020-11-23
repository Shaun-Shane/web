function goBack() {
    window.history.back();
}

$("a").click(function () {
    $("html, body").animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 600);
    return false;
});