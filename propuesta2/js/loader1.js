const init = () => {
  gsap.registerPlugin("ScrollTrigger");
  loader();
};

const loader = () => {
  let mySplitText = new SplitType("#integrattoText h1", {
    type: "words,chars",
  });

  const tl = gsap.timeline();

  tl.to("#integrattoText h1", {
    opacity: 1,
  })
    .to(mySplitText.chars, {
      x: 0,
      duration: 2,
      // stagger: {
      //   amount: 1,
      // },
    })
    .to(
      "#counter",
      {
        opacity: 1,
      },
      "<"
    )
    .to(
      "#mascara",
      {
        scaleX: 1,
        duration: 5,
        transformOrigin: "left",
        onUpdate: function () {
          progreso = parseInt(this.progress() * 100);
          document.querySelector("#counter").innerHTML = progreso;
        },
      },
      "<0.5"
    )
    .to(
      "#progreso",
      {
        x: "120vw",
        duration: 0.8,
      },
      ">0.5"
    )
    .to(
      "#integrattoText",
      {
        y: "100vh",
        duration: 1,
      },
      "<"
    )
    .to("#integrattoLogo img", {
      y: 0,
      duration: 0.7,
      // ease: "bounce.in",
    })
    .fromTo(
      "#loader",
      {
        y: 0,
      },
      {
        // transformOrigin: "100% 50% 0",
        y: () => -1 * document.querySelector("#loader").offsetHeight,
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

document.addEventListener("DOMContentLoaded", init);
