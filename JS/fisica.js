let parallax = document.querySelector('.promo');

function scrollParallax() {
    let scrollTop = document.documentElement.scrollTop;
    parallax.style.transform = 'translateY(' + scrollTop * 0.5 + 'px)';
}

window.addEventListener('scroll', scrollParallax);

let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let box = document.querySelector('.box');
let degree = 0;

prev.addEventListener('click', function(){
    degree -= 90; 
    box.style.transform = `perspective(1000px) rotateY(${degree}deg)`; 
});

next.addEventListener('click', function(){
    degree += 90;
    box.style.transform = `perspective(1000px) rotateY(${degree}deg)`;
});

function mostrel() {
    document.getElementById('rel').style.display = 'block';
    document.getElementById('rel2').style.display = 'block';
    document.getElementById('rel3').style.display = 'block';
    document.getElementById('rel4').style.display = 'block';
    document.getElementById('rel5').style.display = 'block';
    document.getElementById('botonocultrel').style.display = 'block';
}
function ocultarrel() {
    document.getElementById('rel').style.display = 'none';
    document.getElementById('rel2').style.display = 'none';
    document.getElementById('rel3').style.display = 'none';
    document.getElementById('rel4').style.display = 'none';
    document.getElementById('rel5').style.display = 'none';
    document.getElementById('botonocultrel').style.display = 'none';

}
function mostrarfm() {
    document.getElementById('todo_f_moderno0').style.display = 'block';
    document.getElementById('todo_f_moderno').style.display = 'block';
    document.getElementById('todo_f_moderno2').style.display = 'block';
    document.getElementById('todo_f_moderno3').style.display = 'block';
    document.getElementById('todo_f_moderno4').style.display = 'block';    
}
function mostrarfc() {
    document.getElementById('todo_f_clasico0').style.display = 'block';
    document.getElementById('todo_f_clasico').style.display = 'block';
    document.getElementById('todo_f_clasico2').style.display = 'block';
    document.getElementById('todo_f_clasico3').style.display = 'block';
    document.getElementById('todo_f_clasico4').style.display = 'block';
}
function ocultar_todo() {
    document.getElementById('todo_f_moderno0').style.display = 'none';
    document.getElementById('todo_f_moderno').style.display = 'none';
    document.getElementById('todo_f_moderno2').style.display = 'none';
    document.getElementById('todo_f_moderno3').style.display = 'none';
    document.getElementById('todo_f_moderno4').style.display = 'none';

    document.getElementById('todo_f_clasico0').style.display = 'none';
    document.getElementById('todo_f_clasico').style.display = 'none';
    document.getElementById('todo_f_clasico2').style.display = 'none';
    document.getElementById('todo_f_clasico3').style.display = 'none';
    document.getElementById('todo_f_clasico4').style.display = 'none';
}
function ostrar_sistemas () {
    document.getElementById('sistemas').style.display = 'block';
    document.getElementById('sistemas2').style.display = 'block';
}
function ocultar_sistemas () {
    document.getElementById('sistemas').style.display = 'none';
    document.getElementById('sistemas2').style.display = 'none';
}
// ScrollReveal().reveal(' .derecha ', { delay: 1000, origin: 'bottom' });
// ScrollReveal().reveal(' .izquierda .b1, .izquierda .b2, .izquierda .b3', { delay: 500, origin: 'bottom', interval: 200});
 

// ScrollReveal().reveal('.texto ', { delay: 150, origin: 'left', interval: 200 });
// ScrollReveal().reveal('.re2 ', { delay: 200, origin: 'right' });