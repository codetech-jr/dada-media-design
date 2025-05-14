document.querySelectorAll(".pricing-footer details").forEach((detail) => {
    detail.addEventListener("toggle", function () {
        const content = this.querySelector("div");
        
        if (this.open) {
            // Abierto: ajusta la altura a la altura del contenido
            content.style.height = `${content.scrollHeight}px`;
        } else {
            // Cerrado: resetea la altura a 0 para la transición
            content.style.height = "0px";
        }
    });
    
    detail.addEventListener("transitionend", function () {
        const content = this.querySelector("div");
        // Restablece la altura para adaptarse dinámicamente al contenido
        if (this.open) {
            content.style.height = "auto";
        }
    });
});

// segundo acordeón

document.querySelectorAll(".details-faqs").forEach((detail) => {
    detail.addEventListener("toggle", function () {
        const content = this.querySelector(".details-content");
        
        if (this.open) {
            content.style.maxHeight = `${content.scrollHeight}px`;
        } else {
            content.style.maxHeight = "0px";
        }
    });

    detail.addEventListener("transitionend", function () {
        const content = this.querySelector(".details-content");
        if (this.open) {
            content.style.maxHeight = "auto";
        }
    });
});

// Menu
const openMenuBtn = document.getElementById('open-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const menuOverlay = document.getElementById('menu-overlay');
const menuLinks = document.querySelectorAll('.menu-content a'); // Selecciona los enlaces de "Servicios" y "Portafolio"

openMenuBtn.addEventListener('click', () => {
    menuOverlay.classList.add('active');
    openMenuBtn.style.display = 'none';
    closeMenuBtn.style.display = 'block';
});

closeMenuBtn.addEventListener('click', () => {
    closeMenu();
});

// Función para cerrar el menú
function closeMenu() {
    menuOverlay.classList.remove('active');
    openMenuBtn.style.display = 'block';
    closeMenuBtn.style.display = 'none';
}

// Agrega el evento a cada enlace del menú para que cierre el menú al hacer clic
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

// slider

let slider_index = 0;

document.querySelectorAll('.slider-container').forEach((container, index) => {
    let slides = container.querySelectorAll('.slide');
    let dots = container.querySelectorAll('.dot-nav');
    let slider_index = 0;
  
    function show_slide(index) {
      if (index >= slides.length) slider_index = 0;
      if (index < 0) slider_index = slides.length - 1;
  
      slides.forEach((slide, i) => {
        slide.style.display = 'none';
        dots[i]?.classList.remove('active-dot');
      });
  
      slides[slider_index].style.display = 'block';
      dots[slider_index]?.classList.add('active-dot');
    }
  
    show_slide(slider_index);
  
    container.querySelector('.slider-arrow#arrow-prev').addEventListener('click', () => {
      show_slide(--slider_index);
    });
  
    container.querySelector('.slider-arrow#arrow-next').addEventListener('click', () => {
      show_slide(++slider_index);
    });
  
    dots.forEach((dot, dotIndex) => {
      dot.addEventListener('click', () => {
        show_slide(slider_index = dotIndex);
      });
    });
  
    // Autoplay para cada carrusel
    function autoSlide() {
      setTimeout(() => {
        show_slide(++slider_index);
        autoSlide();
      }, 2000);
    }
  
    autoSlide();
  });
  
  
// slider 2

let slider_index_2 = 0;

document.querySelectorAll('.slider-container').forEach((container, index) => {
    let slides = container.querySelectorAll('.slide');
    let dots = container.querySelectorAll('.dot-nav-2');
    let slider_index = 0;
  
    function show_slide(index) {
      if (index >= slides.length) slider_index = 0;
      if (index < 0) slider_index = slides.length - 1;
  
      slides.forEach((slide, i) => {
        slide.style.display = 'none';
        dots[i]?.classList.remove('active-dot-2');
      });
  
      slides[slider_index].style.display = 'block';
      dots[slider_index]?.classList.add('active-dot-2');
    }
  
    show_slide(slider_index);
  
    container.querySelector('.slider-arrow#arrow-prev').addEventListener('click', () => {
      show_slide(--slider_index);
    });
  
    container.querySelector('.slider-arrow#arrow-next').addEventListener('click', () => {
      show_slide(++slider_index);
    });
  
    dots.forEach((dot, dotIndex) => {
      dot.addEventListener('click', () => {
        show_slide(slider_index = dotIndex);
      });
    });
  
    // Autoplay para cada carrusel
    function autoSlide() {
      setTimeout(() => {
        show_slide(++slider_index);
        autoSlide();
      }, 2000);
    }
  
    autoSlide();
  });
  
  

  const services = document.querySelectorAll('.portfolio-container');
window.addEventListener('scroll', () => {
    services.forEach(service => {
        const rect = service.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            service.classList.add('visible');
        }
    });
});


const typed = new Typed('#typed-text', {
        strings: ["Transform your brand with me!"],
        typeSpeed: 80,
        backSpeed: null,
        loop: false
});


  // Botón de alternar tema
  const themeToggle = document.getElementById("theme-toggle");

  // Guardar el tema en localStorage
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme) {
      document.body.classList.add(currentTheme); // Aplica el tema guardado
  }
  
  // Alternar tema y guardar preferencia
  themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
  
      // Guardar en localStorage
      if (document.body.classList.contains("dark-mode")) {
          localStorage.setItem("theme", "dark-mode");
      } else {
          localStorage.setItem("theme", "light-mode");
      }
  });
  
  // Conexión con la base de datos

  document.querySelectorAll('.btn, .menu-links a').forEach((element) => {
    element.addEventListener('click', (event) => {
        const data = {
            user: 'Anonymous', // Cambiar por identificador real si lo tienes
            action: event.target.innerText || 'Interacted',
            timestamp: new Date().toISOString()
        };

        fetch('http://localhost:8080/interactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.error('Error:', error));
    });
});



document.addEventListener('DOMContentLoaded', () => {
  // Registrar la visita a la página
  const data = {
      page: window.location.pathname,
      action: 'page_view',
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent
  };

  fetch('http://localhost:8080/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  });
});

// Registrar clics en botones específicos
document.querySelectorAll('.btn, .menu-links a').forEach((element) => {
  element.addEventListener('click', (event) => {
      const data = {
          page: window.location.pathname,
          action: `click: ${event.target.innerText || event.target.href}`,
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent
      };

      fetch('http://localhost:8080/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      });
  });
});


