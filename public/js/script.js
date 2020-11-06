const container = document.querySelector('.container');

const colors = ["#6495ed", "#7fffd4", "#ffa07a", "#f08080", "#afeeee"];

let i = 0;

Array.from(document.querySelectorAll(".nav-link")).forEach(item => {
  item.style.cssText = `background-color: ${colors[i++]}`;
  item.addEventListener('click', ()=>{
    container.classList.remove('change');
  });
});

Array.from(document.querySelectorAll(".navigation-button")).forEach(item => {
    item.onclick = () => {
        item.parentElement.parentElement.classList
        .toggle("change");
    }
});

document.querySelector('.open-navbar-icon').addEventListener('click', ()=>{
    container.classList.add('change');
});

document.querySelector('.close-navbar-icon').addEventListener('click', ()=>{
    container.classList.remove('change');
});


$("a").click(function () {
    $("html, body").animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 600);
    return false;
});


