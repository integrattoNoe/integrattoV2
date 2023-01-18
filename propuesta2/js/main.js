const init = () => {
  gsap.registerPlugin("ScrollTrigger");
  loader();
};

const loader = () => {
  const tl = gsap.timeline({ repeat: -1, repeatRefresh: true, repeatDelay: 2 });
  let progresoIzq = 0;
  let progresoDer = 0;

  // const images = gsap.utils.toArray("img");
  // const loader = document.querySelector(".loader--text");
  // const updateProgress = (instance) =>
  //   (loader.textContent = `${Math.round(
  //     (instance.progressedCount * 100) / images.length
  //   )}%`);

  tl.fromTo(
    ".left-wrap .loader",
    {
      rotationZ: "0",
      ease: "none",
    },
    {
      rotationZ: "180",
      duration: 2,
      ease: "none",
      transformOrigin: "0 50% 0",
      onUpdate: function () {
        progresoIzq = parseInt((this.progress() / 2) * 100);
        document.querySelector("#progresoCount").innerHTML = progresoIzq;
      },
    }
  )
    .fromTo(
      ".right-wrap .loader",
      {
        rotationZ: "0",
        ease: "none",
      },
      {
        rotationZ: "180",
        duration: 2,
        ease: "none",
        transformOrigin: "100% 50% 0",
        onUpdate: function () {
          progresoDer = parseInt((this.progress() / 2) * 100 + progresoIzq);
          document.querySelector("#progresoCount").innerHTML = progresoDer;
        },
      }
    )
    .fromTo(
      "#logoLoader",
      { scale: 0 },
      {
        scale: 1,
        duration: 2.5,
        // ease: "none",
        ease: "back.out(2)",
      },
      "< 1.2"
    )
    .fromTo("#progresoCount", { scale: 1 }, { scale: 0 }, "<")
    .fromTo(
      "#loader",
      {
        x: 0,
      },
      {
        // transformOrigin: "100% 50% 0",
        x: () => document.querySelector("#loader").offsetWidth,
        ease: "bounce.out",
        // ease: "elastic.out(1, 0.3)",
        // ease: "elastic.inOut(1, 0.3)",
        duration: 2.5,
        onComplete: function () {
          console.log(-1 * document.querySelector("#loader").offsetHeight);
          document.querySelector("body").style.overflowY = "auto";
        },
      },
      "<2"
    );
};

const seccion1 = () => {
  const tl = gsap.timeline({
    scrollTrigger: {},
  });
};

document.addEventListener("DOMContentLoaded", init);

// imagesLoaded(images).on("progress", updateProgress).on("always", showDemo);
