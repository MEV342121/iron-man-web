/* =========================================================
   IRON-MAN - JAVASCRIPT DE LA PÁGINA DE INICIO (Bootstrap 5)
   ========================================================= */
 
/* Año del footer */
const anio = document.getElementById("currentYear");
if (anio) anio.textContent = new Date().getFullYear();
 
 
/* Sombra del navbar al bajar */
const navbar = document.querySelector(".navbar-im");
if (navbar) {
    const marcarScroll = () =>
        navbar.classList.toggle("scrolled", window.scrollY > 10);
    marcarScroll();
    window.addEventListener("scroll", marcarScroll, { passive: true });
}
 
 
/* Cerrar el menú móvil al elegir una opción */
const menu = document.getElementById("menuPrincipal");
if (menu && window.bootstrap) {
    menu.querySelectorAll("a.nav-link, a.btn").forEach(enlace => {
        enlace.addEventListener("click", () => {
            if (menu.classList.contains("show")) {
                bootstrap.Collapse.getOrCreateInstance(menu).hide();
            }
        });
    });
}
 
 
/* Marcar en el menú la sección visible */
const enlacesNav = document.querySelectorAll('.navbar-im .nav-link[href^="#"]');
const secciones = [...enlacesNav]
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
 
if (secciones.length && "IntersectionObserver" in window) {
    const observador = new IntersectionObserver(entradas => {
        entradas.forEach(entrada => {
            if (!entrada.isIntersecting) return;
            enlacesNav.forEach(a =>
                a.classList.toggle(
                    "active",
                    a.getAttribute("href") === "#" + entrada.target.id
                )
            );
        });
    }, { rootMargin: "-45% 0px -50% 0px" });
 
    secciones.forEach(s => observador.observe(s));
}
 
 
/* Filtro del portafolio */
const botonesFiltro = document.querySelectorAll(".filter-btn");
const itemsTrabajo = document.querySelectorAll(".portfolio-item");
 
botonesFiltro.forEach(boton => {
    boton.addEventListener("click", () => {
        botonesFiltro.forEach(b => b.classList.remove("active"));
        boton.classList.add("active");
 
        const filtro = boton.dataset.filter;
 
        itemsTrabajo.forEach(item => {
            const visible =
                filtro === "todos" || item.dataset.category === filtro;
            item.style.display = visible ? "" : "none";
        });
    });
});
 
 
/* Chispas del hero (se omiten si la persona prefiere menos movimiento) */
const hero = document.querySelector(".hero-im");
const sinMovimiento =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 
if (hero && !sinMovimiento) {
    for (let i = 0; i < 16; i++) {
        const chispa = document.createElement("span");
        chispa.className = "chispa";
        chispa.style.left = (45 + Math.random() * 50) + "%";
        chispa.style.setProperty("--dx", (Math.random() * 120 - 60) + "px");
        chispa.style.setProperty("--dy", -(60 + Math.random() * 160) + "px");
        chispa.style.animationDelay = (1.2 + Math.random() * 2.4) + "s";
        chispa.style.animationDuration = (1.6 + Math.random() * 1.6) + "s";
        hero.appendChild(chispa);
    }
}