/* router.js — Portal / Studio / Sandbox mode switcher + mobile drawer */
(function (global) {
  const MODES = ["portal", "studio", "sandbox"];
  let mode = "portal";

  function setMode(next, opts) {
    const target = MODES.includes(next) ? next : "portal";
    mode = target;

    document.body.dataset.mode = target;
    document.querySelectorAll("[data-view]").forEach((panel) => {
      panel.hidden = panel.dataset.view !== target;
    });
    document.querySelectorAll("[data-mode-btn]").forEach((btn) => {
      const active = btn.dataset.modeBtn === target;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    if (!opts || !opts.silentHash) {
      try {
        history.replaceState(null, "", "#" + target);
      } catch (_) {
        /* file:// */
      }
    }

    document.dispatchEvent(new CustomEvent("mp:mode", { detail: { mode: target } }));
  }

  function init() {
    document.querySelectorAll("[data-mode-btn]").forEach((btn) => {
      btn.addEventListener("click", () => setMode(btn.dataset.modeBtn));
    });

    document.querySelectorAll("[data-goto]").forEach((btn) => {
      btn.addEventListener("click", () => {
        setMode(btn.dataset.goto);
        closeDrawer();
      });
    });

    const hash = (location.hash || "").replace("#", "");
    setMode(MODES.includes(hash) ? hash : "portal", { silentHash: true });

    window.addEventListener("hashchange", () => {
      const h = (location.hash || "").replace("#", "");
      if (MODES.includes(h) && h !== mode) setMode(h, { silentHash: true });
    });

    const drawer = document.getElementById("mobile-drawer");
    const openBtn = document.getElementById("drawer-open");
    const closeBtn = document.getElementById("drawer-close");
    if (openBtn) openBtn.addEventListener("click", () => drawer && drawer.classList.add("is-open"));
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    if (drawer) {
      drawer.addEventListener("click", (e) => {
        if (e.target === drawer) closeDrawer();
      });
    }

    document.querySelectorAll("[data-mobile-pane]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pane = btn.dataset.mobilePane;
        document.body.dataset.mobilePane = pane;
        document.querySelectorAll("[data-mobile-pane]").forEach((b) => {
          b.classList.toggle("is-active", b === btn);
        });
      });
    });
  }

  function closeDrawer() {
    const drawer = document.getElementById("mobile-drawer");
    if (drawer) drawer.classList.remove("is-open");
  }

  global.MPRouter = { init, setMode, getMode: () => mode };
})(window);
