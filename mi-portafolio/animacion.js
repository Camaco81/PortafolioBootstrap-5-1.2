window.addEventListener('scroll', () => {
const imagenes = document.querySelectorAll('.imagen-animada');

imagenes.forEach(imagen => {
const imagenTop = imagen.getBoundingClientRect().top;
const viewportHeight = window.innerHeight;

if (imagenTop < viewportHeight * 0.8) { // Ajusta el valor 0.8 para controlar cuando se activa la animación
imagen.classList.add('visible');
} else {
imagen.classList.remove('visible'); // Opcional: reinicia la animación si la imagen sale del viewport
}
});
});