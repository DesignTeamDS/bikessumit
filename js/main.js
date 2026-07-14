/* ============================================================
   BIKES SUMMIT — interações do protótipo
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Nav: fundo ao fazer scroll ---------- */
  var nav = document.getElementById("nav");
  var onScroll = function () {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobileMenu");
  var toggle = function (open) {
    var isOpen = open !== undefined ? open : !menu.classList.contains("open");
    menu.classList.toggle("open", isOpen);
    burger.classList.toggle("open", isOpen);
    nav.classList.toggle("menu-open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  };
  burger.addEventListener("click", function () { toggle(); });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { toggle(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("open")) toggle(false);
  });

  /* ---------- Reveal on scroll ---------- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll("[data-reveal]");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Fallback gracioso para imagens ---------- */
  /* Se uma foto de banco não carregar, aplica um gradiente da marca
     para nunca mostrar ícone de imagem partida. */
  var GRADS = [
    "linear-gradient(135deg,#0B5040,#01140E)",
    "linear-gradient(135deg,#219F80,#042D23)",
    "linear-gradient(135deg,#16765F,#01140E)",
    "linear-gradient(135deg,#2CC9A3,#0B5040)"
  ];
  document.querySelectorAll("img[data-img]").forEach(function (img, i) {
    img.addEventListener("error", function () {
      var holder = img.parentElement;
      img.style.display = "none";
      holder.style.background = GRADS[i % GRADS.length];
    });
    /* melhora a performance de imagens abaixo da dobra */
    if (!img.closest(".hero")) img.loading = "lazy";
    img.decoding = "async";
    img.referrerPolicy = "no-referrer";
  });

  /* ---------- Página Programa: tabs de dia + filtros ---------- */
  var dayTabs = document.querySelectorAll(".day-tab");
  if (dayTabs.length) {
    var panels = document.querySelectorAll(".day-panel");
    var chips = document.querySelectorAll(".filter-chip");
    var currentFilter = "all";

    var emptyEl = document.querySelector(".prog-empty");
    var applyFilter = function () {
      var active = document.querySelector(".day-panel.is-active");
      if (!active) return;
      var visible = 0;
      active.querySelectorAll(".ses").forEach(function (s) {
        var show = currentFilter === "all" || s.getAttribute("data-track") === currentFilter;
        s.style.display = show ? "" : "none";
        if (show) visible++;
      });
      if (emptyEl) emptyEl.hidden = visible > 0;
    };

    dayTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        dayTabs.forEach(function (t) { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");
        var day = tab.getAttribute("data-day");
        panels.forEach(function (p) { p.classList.toggle("is-active", p.getAttribute("data-day") === day); });
        applyFilter();
      });
    });

    chips.forEach(function (c) {
      c.addEventListener("click", function () {
        chips.forEach(function (x) { x.classList.remove("is-active"); });
        c.classList.add("is-active");
        currentFilter = c.getAttribute("data-filter");
        applyFilter();
      });
    });
  }

  /* ---------- Filtros por categoria (Oradores / Diretório) ---------- */
  function setupFilter(chipSel, itemSel, emptySel) {
    var chips = document.querySelectorAll(chipSel);
    if (!chips.length) return;
    var items = document.querySelectorAll(itemSel);
    var empty = emptySel ? document.querySelector(emptySel) : null;
    chips.forEach(function (c) {
      c.addEventListener("click", function () {
        chips.forEach(function (x) { x.classList.remove("is-active"); });
        c.classList.add("is-active");
        var f = c.getAttribute("data-filter");
        var visible = 0;
        items.forEach(function (s) {
          var show = f === "all" || s.getAttribute("data-cat") === f;
          s.style.display = show ? "" : "none";
          if (show) { s.classList.add("in"); visible++; }
        });
        if (empty) empty.hidden = visible > 0;
      });
    });
  }
  setupFilter(".spk-filter .filter-chip", ".speaker[data-cat]", ".prog-empty");
  setupFilter(".dir-filter .filter-chip", ".dir-card[data-cat]", ".dir-empty");

  /* ---------- Formulários (candidaturas) ---------- */
  document.querySelectorAll(".js-form").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var success = f.querySelector(".form__success");
      if (!success) return;
      f.querySelectorAll(".field, .btn, .form__note").forEach(function (el) { el.style.display = "none"; });
      success.hidden = false;
    });
  });

  /* ---------- Realce do link de navegação da secção ativa ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = {};
  document.querySelectorAll('.nav__menu a[href^="#"]').forEach(function (a) {
    navLinks[a.getAttribute("href").slice(1)] = a;
  });
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = navLinks[entry.target.id];
        if (link && entry.isIntersecting) {
          Object.keys(navLinks).forEach(function (k) {
            navLinks[k].style.color = "";
          });
          link.style.color = "var(--mint)";
        }
      });
    }, { threshold: 0.5 });
    sections.forEach(function (s) { spy.observe(s); });
  }
})();
