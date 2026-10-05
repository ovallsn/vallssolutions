(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-nav");
  const isEnglish = document.documentElement.lang === "en";

  if (menuButton && navigation) {
    const menuLabel = menuButton.querySelector(".sr-only");
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
      if (menuLabel) menuLabel.textContent = isEnglish ? "Open menu" : "Abrir menú";
    };

    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      navigation.classList.toggle("is-open", !isOpen);
      if (menuLabel) menuLabel.textContent = isOpen ? (isEnglish ? "Open menu" : "Abrir menú") : (isEnglish ? "Close menu" : "Cerrar menú");
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  const video = document.querySelector("[data-hero-video]");
  const media = document.querySelector("[data-hero-media]");
  const toggle = document.querySelector("[data-video-toggle]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const saveData = navigator.connection && navigator.connection.saveData;
  let userPaused = false;
  let wasPlayingBeforeHidden = false;

  const showStaticHero = () => {
    if (media) media.classList.remove("is-playing");
    if (toggle) toggle.hidden = true;
  };

  if (video && media && toggle && !reduceMotion.matches && !saveData) {
    const pauseLabel = isEnglish ? "Pause video" : "Pausar vídeo";
    const resumeLabel = isEnglish ? "Resume video" : "Reanudar vídeo";
    const pauseDescription = isEnglish ? "Pause background video" : "Pausar vídeo de fondo";
    const resumeDescription = isEnglish ? "Resume background video" : "Reanudar vídeo de fondo";
    const startVideo = async () => {
      if (document.hidden || reduceMotion.matches || userPaused || video.src) return;
      video.src = video.dataset.src;
      video.addEventListener("error", showStaticHero, { once: true });
      video.addEventListener("playing", () => {
        media.classList.add("is-playing");
        toggle.hidden = false;
        toggle.textContent = pauseLabel;
        toggle.setAttribute("aria-label", pauseDescription);
      }, { once: true });
      try {
        await video.play();
      } catch {
        showStaticHero();
      }
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          window.setTimeout(startVideo, 500);
        }
      });
      observer.observe(media);
    } else {
      window.setTimeout(startVideo, 500);
    }

    toggle.addEventListener("click", async () => {
      if (video.paused) {
        userPaused = false;
        try {
          await video.play();
          toggle.textContent = pauseLabel;
          toggle.setAttribute("aria-label", pauseDescription);
        } catch {
          showStaticHero();
        }
      } else {
        userPaused = true;
        video.pause();
        toggle.textContent = resumeLabel;
        toggle.setAttribute("aria-label", resumeDescription);
      }
    });

    reduceMotion.addEventListener("change", () => {
      if (reduceMotion.matches) {
        video.pause();
        showStaticHero();
      }
    });

    document.addEventListener("visibilitychange", async () => {
      if (document.hidden) {
        wasPlayingBeforeHidden = !video.paused;
        video.pause();
      } else if (wasPlayingBeforeHidden && !userPaused && !reduceMotion.matches) {
        try {
          await video.play();
        } catch {
          showStaticHero();
        }
      }
    });
  } else {
    showStaticHero();
  }
})();
