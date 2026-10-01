(function () {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-nav");

  function closeMenu() {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("open");
    document.body.classList.remove("menu-open");
  }

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      navigation.classList.toggle("open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = lightbox ? lightbox.querySelector("img") : null;
  const lightboxCaption = lightbox ? lightbox.querySelector("p") : null;
  const lightboxClose = lightbox ? lightbox.querySelector(".lightbox-close") : null;
  const transparentPixel = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

  function closeLightbox() {
    if (!lightbox || !lightbox.open) return;
    lightbox.close();
    document.body.classList.remove("lightbox-open");
  }

  document.querySelectorAll(".image-button").forEach(function (button) {
    button.addEventListener("click", function () {
      if (!lightbox || !lightboxImage || !lightboxCaption) return;
      const image = button.querySelector("img");
      const figure = button.closest("figure");
      const caption = figure ? figure.querySelector("figcaption") : null;

      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = caption ? caption.textContent : image.alt;
      lightbox.showModal();
      document.body.classList.add("lightbox-open");
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });

    lightbox.addEventListener("close", function () {
      document.body.classList.remove("lightbox-open");
      if (lightboxImage) lightboxImage.src = transparentPixel;
    });
  }
})();
