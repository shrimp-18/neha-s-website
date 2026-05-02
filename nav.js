(function () {
  const nav = document.querySelector(".navbar");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".navbar-menu");
  if (!nav || !toggle || !menu) return;

  function isMobileNav() {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (!open) {
      document.body.classList.remove("nav-menu-open");
    } else if (isMobileNav()) {
      document.body.classList.add("nav-menu-open");
    }
    if (isMobileNav()) {
      menu.setAttribute("aria-hidden", open ? "false" : "true");
    }
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
    }
  });

  window.addEventListener("resize", function () {
    if (!isMobileNav()) {
      setOpen(false);
      menu.removeAttribute("aria-hidden");
      document.body.classList.remove("nav-menu-open");
    } else if (!nav.classList.contains("is-open")) {
      menu.setAttribute("aria-hidden", "true");
    }
  });

  if (isMobileNav() && !nav.classList.contains("is-open")) {
    menu.setAttribute("aria-hidden", "true");
  }
})();
