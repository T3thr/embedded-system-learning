/* theme.js — light/dark toggle with localStorage */
(function (global) {
  const KEY = "mp-theme";
  const root = document.documentElement;

  function current() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function apply(theme) {
    const next = theme === "dark" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(KEY, next);
    } catch (_) {
      /* private mode */
    }
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.setAttribute("aria-label", next === "dark" ? "สลับเป็นโหมดสว่าง" : "สลับเป็นโหมดมืด");
      btn.textContent = next === "dark" ? "☀" : "☾";
      btn.title = next === "dark" ? "Light mode" : "Dark mode";
    });
  }

  function toggle() {
    apply(current() === "dark" ? "light" : "dark");
  }

  function init() {
    let saved = "light";
    try {
      saved = localStorage.getItem(KEY) || "light";
    } catch (_) {
      saved = "light";
    }
    if (!saved && window.matchMedia) {
      saved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    apply(saved);
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.addEventListener("click", toggle);
    });
  }

  global.MPTheme = { init, toggle, apply, current };
})(window);
