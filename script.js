// Imágenes del carrusel (puedes reemplazar estas URLs con las tuyas)
const imagenes = [
  "https://img.freepik.com/vector-premium/n-carta-corazon-sobre-fondo-rojo-amantes-amigos_708797-116.jpg",
  "https://i.ytimg.com/vi/xuoOAP1d76M/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLARb6B7p9V_2aQa6r4JkDmkFRyhgQ",
  "https://i.ytimg.com/vi/Ec9VGT_UnFA/maxresdefault.jpg",
  "https://i.ytimg.com/vi/LhrlqS9t3jc/sddefault.jpg",
  "https://i.ytimg.com/vi/r8pMENvrT2k/maxresdefault.jpg",
];

// Variables para el carrusel
let slideActual = 0;
const intervalo = 5000; // Cambio automático cada 5 segundos
let intervaloCambio;

// Inicializar el carrusel
function inicializarCarrusel() {
  const carrusel = document.getElementById("carrusel");
  const indicadores = document.getElementById("indicadores");

  // Limpiar contenido existente
  carrusel.innerHTML = "";
  indicadores.innerHTML = "";

  // Crear slides e indicadores
  imagenes.forEach((imagen, index) => {
    // Crear slide
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.style.backgroundImage = `url('${imagen}')`;
    carrusel.appendChild(slide);

    // Crear indicador
    const indicador = document.createElement("div");
    indicador.className = `indicador ${index === 0 ? "activo" : ""}`;
    indicador.dataset.index = index;
    indicador.addEventListener("click", () => {
      irASlide(index);
    });
    indicadores.appendChild(indicador);
  });

  // Iniciar cambio automático
  iniciarCambioAutomatico();
}

// Función para cambiar de slide
function cambiarSlide(direccion) {
  const totalSlides = imagenes.length;

  if (direccion === "siguiente") {
    slideActual = (slideActual + 1) % totalSlides;
  } else if (direccion === "anterior") {
    slideActual = (slideActual - 1 + totalSlides) % totalSlides;
  }

  actualizarCarrusel();
}

// Función para ir a un slide específico
function irASlide(index) {
  slideActual = index;
  actualizarCarrusel();
}

// Actualizar carrusel y indicadores
function actualizarCarrusel() {
  const carrusel = document.getElementById("carrusel");
  const indicadores = document.querySelectorAll(".indicador");

  // Mover carrusel
  carrusel.style.transform = `translateX(-${slideActual * 100}%)`;

  // Actualizar indicadores
  indicadores.forEach((indicador, index) => {
    if (index === slideActual) {
      indicador.classList.add("activo");
    } else {
      indicador.classList.remove("activo");
    }
  });

  // Reiniciar intervalo
  reiniciarIntervalo();
}

// Iniciar cambio automático
function iniciarCambioAutomatico() {
  intervaloCambio = setInterval(() => {
    cambiarSlide("siguiente");
  }, intervalo);
}

// Reiniciar intervalo al interactuar
function reiniciarIntervalo() {
  clearInterval(intervaloCambio);
  iniciarCambioAutomatico();
}

// Configurar video
function configurarVideo() {
  const videoElement = document.getElementById("videoKaraoke");
  const playButton = document.getElementById("playVideo");

  // Configurar fuente del video
  videoElement.innerHTML = `
                <source src="video.mp4" type="video/mp4">
            `;

  // Cargar el video
  videoElement.load();

  // Controlar reproducción con el botón de overlay
  playButton.addEventListener("click", () => {
    if (videoElement.paused) {
      videoElement.play();
      playButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      videoElement.pause();
      playButton.innerHTML = '<i class="fas fa-play"></i>';
    }
  });

  // Actualizar icono cuando el video se pausa
  videoElement.addEventListener("pause", () => {
    playButton.innerHTML = '<i class="fas fa-play"></i>';
  });

  // Actualizar icono cuando el video se reproduce
  videoElement.addEventListener("play", () => {
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
  });
}

// Configurar WhatsApp
function configurarWhatsApp() {
  const whatsappBtn = document.getElementById("whatsappBtn");

  // Mensaje predeterminado que se enviará
  const mensaje = encodeURIComponent("Hola, qué tal?");
  whatsappBtn.href = `https://wa.me/50376013497?text=${mensaje}`;

  // Nota: Recuerda cambiar el número en la línea de arriba por tu número real
}

// Event listeners para controles del carrusel
document.getElementById("btnAnterior").addEventListener("click", () => {
  cambiarSlide("anterior");
});

document.getElementById("btnSiguiente").addEventListener("click", () => {
  cambiarSlide("siguiente");
});

// Pausar carrusel al pasar el mouse
document
  .querySelector(".carrusel-container")
  .addEventListener("mouseenter", () => {
    clearInterval(intervaloCambio);
  });

document
  .querySelector(".carrusel-container")
  .addEventListener("mouseleave", () => {
    iniciarCambioAutomatico();
  });

// Inicializar todo cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  inicializarCarrusel();
  configurarVideo();
  configurarWhatsApp();
});

// Manejar redimensionamiento de ventana
window.addEventListener("resize", () => {
  // Actualizar carrusel si es necesario
  actualizarCarrusel();
});
