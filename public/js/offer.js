const container = document.querySelector('.container');
const tp = document.querySelector('.top');

const colors = ["#6495ed", "#7fffd4", "#ffa07a", "#f08080", "#afeeee"];

let i = 0;

Array.from(document.querySelectorAll(".nav-link")).forEach(item => {
  item.style.cssText = `background-color: ${colors[i++]}`;
  item.addEventListener('click', ()=>{
    container.classList.remove('change');
  });
});

Array.from(document.querySelectorAll(".card")).forEach(item => {
    item.onclick = () => {
        item.parentElement.parentElement.classList
        .toggle("change");
    }
});

