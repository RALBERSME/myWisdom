document.addEventListener("DOMContentLoaded", () => {
  const wrappers = document.querySelectorAll(".hover-fullscreen-wrapper");

  wrappers.forEach((wrapper) => {
    const type = wrapper.getAttribute("data-type");
    const contentBox = wrapper.querySelector(".hover-fullscreen-content");
    let iframe = null;

    function activateVollbild() {
      if (wrapper.classList.contains("active")) return;

      wrapper.style.setProperty(
        "--original-height",
        `${wrapper.offsetHeight}px`,
      );
      wrapper.classList.add("active");
      document.body.style.overflow = "hidden";

      if (type === "pdf") {
        const pdfSrc = wrapper.getAttribute("data-src");
        iframe = document.createElement("iframe");

        iframe.src = `${pdfSrc}#toolbar=0&navpanes=0`;

        wrapper.querySelector(".pdf-preview").style.display = "none";
        contentBox.appendChild(iframe);

        setTimeout(() => {
          if (iframe) iframe.style.pointerEvents = "auto";
        }, 100);
      }
    }

    function deaktiviereVollbild() {
      if (!wrapper.classList.contains("active")) return;

      wrapper.classList.remove("active");
      document.body.style.overflow = "";

      if (type === "pdf") {
        if (iframe) {
          iframe.remove();
          iframe = null;
        }

        const preview = wrapper.querySelector(".pdf-preview");
        if (preview) {
          preview.style.display = "flex";
        }
      }
    }

    wrapper.addEventListener("mouseenter", activateVollbild);
    wrapper.addEventListener("mouseleave", deaktiviereVollbild);

    contentBox.addEventListener("click", (e) => {
      if (e.target === contentBox) {
        deaktiviereVollbild();
      }
    });

    wrapper.addEventListener("click", (e) => {
      if (wrapper.classList.contains("active")) {
        if (e.target === contentBox || e.target.closest(".pdf-preview")) {
          deaktiviereVollbild();
          e.stopPropagation();
        }
      } else {
        activateVollbild();
      }
    });
  });
});
