const init = () => {
  gsap.registerPlugin("ScrollTrigger");

  // mouse();
  general();
  marqueeInit();
  nosotros();
  proyectos();
  personas();
};

// const mouse = () => {
//   const cursorRounded = document.querySelector(".rounded");
//   const cursorPointed = document.querySelector(".pointed");

//   const moveCursor = (e) => {
//     const mouseY = e.clientY;
//     const mouseX = e.clientX;

//     cursorRounded.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

//     cursorPointed.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
//   };

//   window.addEventListener("mousemove", moveCursor);
// };

const general = () => {
  let mySplitText = new SplitType("#texto1", { type: "words,chars" });
  let mySplitText2 = new SplitType("#texto2", { type: "words,chars" });

  const tl = gsap.timeline();
  tl.to(".loader", {
    opacity: 0,
    duration: 2,
    ease: "back.out",
    display: "none",
  });
  tl.to(".link", {
    opacity: 1,
    stagger: 0.1,
    ease: "sine.in",
  });
  tl.to(mySplitText2.chars, {
    duration: 0.5,
    y: 0,
    ease: "power1.in",
  });
  tl.to("#imagenImg", {
    duration: 1,
    y: 0,
    opacity: 1,
    ease: "elastic.in",
  });

  const inicialTL = gsap.timeline();
  let myEl = document.querySelector("#texto1 .char");
  let tr = window
    .getComputedStyle(myEl)
    .getPropertyValue("transform")
    .match(/(-?[0-9\.]+)/g);

  let texto1TraslateY = tr[5];
  console.log(texto1TraslateY);
  const scrollTexto1TL = gsap.timeline({
    scrollTrigger: {
      trigger: "#general",
      start: "30% top",
      endTrigger: "#proyectos",
      end: "10% top",
      markers: false,
      scrub: 4,
    },
  });
  inicialTL.to(mySplitText.chars, {
    y: 0,
    stagger: { amount: 1 },
    ease: "back.in",
    onComplete() {
      myEl = document.querySelector("#texto1 .char");
      tr = window
        .getComputedStyle(myEl)
        .getPropertyValue("transform")
        .match(/(-?[0-9\.]+)/g);
      texto1TraslateY = tr[5];
      console.log(texto1TraslateY);

      scrollTexto1TL.to(mySplitText.chars, {
        y: texto1TraslateY == 0 ? -800 : 0,
        stagger: { each: 0.1 },
        ease: "back.in",
        immediateRender: false,
        onComplete() {
          myEl = document.querySelector("#texto1 .char");
          tr = window
            .getComputedStyle(myEl)
            .getPropertyValue("transform")
            .match(/(-?[0-9\.]+)/g);
          texto1TraslateY = tr[5];
          console.log(texto1TraslateY);
        },
      });
    },
  });

  const imagenTL = gsap.timeline({
    scrollTrigger: {
      trigger: "#general",
      start: "2% top",
      end: "80% top",
      scrub: 3,
      markers: false,
    },
  });

  imagenTL.to("#imagen", {
    y: "-=600px",
    duration: 1,
  });
};

const marqueeInit = () => {
  const marqueeLine1TL = gsap.timeline({
    scrollTrigger: {
      trigger: "#marca",
      start: "top center",
      endTrigger: "#general",
      end: "bottom center",
      markers: false,
      scrub: 4,
      toggleActions: "play pause restart resume",
    },
  });

  const marqueeLine2TL = gsap.timeline({
    scrollTrigger: {
      trigger: "#marca",
      start: "200px center",
      endTrigger: "#general",
      end: "bottom center",
      markers: false,
      scrub: 4,
      toggleActions: "play pause restart resume",
    },
  });

  marqueeLine1TL.to(".marquee-line1", {
    width: "80%",
    duration: 4,
  });

  marqueeLine2TL.to(".marquee-line2", {
    width: "80%",
    duration: 4,
  });

  console.log("Cargando maruqees");
  const marquee = document.querySelector('[wb-data="marquee"]');
  if (!marquee) {
    console.log("no hay marquee");
    return;
  }
  const marqueeContent = marquee.firstElementChild;
  if (!marqueeContent) {
    console.log("no hay marqueeContent");
    return;
  }

  const marqueeContentClone = marqueeContent.cloneNode(true);
  marquee.append(marqueeContentClone);

  console.log({ marquee, marqueeContent });

  const width = parseInt(
    getComputedStyle(marqueeContent).getPropertyValue("width"),
    10
  );
  gap = 0;

  const distanciaFinal = -1 * (gap + width);

  gsap.fromTo(
    marquee.children,
    { x: 0 },
    {
      x: distanciaFinal,
      duration: 8,
      repeat: -1,
      ease: "none",
    }
  );

  const backgroundTL = gsap.timeline({
    scrollTrigger: {
      trigger: "#marca",
      start: "top center",
      endTrigger: "#general",
      end: "80% center",
      scrub: 3,
      markers: true,
    },
  });

  backgroundTL.to("body", {
    backgroundColor: "blue",
    duration: 2,
  });
};

const nosotros = () => {
  const nosotrosTL = gsap.timeline({
    scrollTrigger: {
      trigger: "#nosotros",
      start: "top center",
      endTrigger: "#marca",
      end: "60% center",
      /* markers: {
        startColor: "purple",
        endColor: "red",
        fontSize: "3rem",
      }, */
      scrub: 5,
    },
  });

  const nosotrosBackgroundTL = gsap.timeline({
    scrollTrigger: {
      trigger: "#nosotros",
      start: "top center",
      endTrigger: "#marca",
      end: "60% top",
      /* markers: {
        startColor: "green",
        endColor: "black",
        fontSize: "3rem",
      }, */
      scrub: 4,
    },
  });

  nosotrosBackgroundTL.to("body", {
    backgroundColor: "white",
    duration: 0.5,
  });

  nosotrosTL.to("#titulo-nosotros h2", {
    y: 0,
    duration: 1,
    onComplete() {
      nosotrosTL.to("#titulo-nosotros h2", { color: "red" });
    },
  });

  let mySplitText = new SplitType(".txt-nosotros", { type: "words,chars" });
  nosotrosTL.to(".txt-nosotros .word", {
    y: 0,
    duration: 1,
  });

  nosotrosTL.to(".logo-nosotros img", {
    x: 0,
    duration: 1,
    rotationZ: -360,
  });
};

const proyectos = () => {
  const proyectoLineTL = gsap.timeline({
    scrollTrigger: {
      trigger: "#proyectos",
      toggleActions: "restart pause restart pause",
    },
  });

  const moverLogoLineTL = gsap.timeline({
    scrollTrigger: {
      trigger: "#proyectos",
      start: "top center",
      scrub: 2,
      // pin: true,
      markers: false,
    },
  });

  const moverProyectosLineTL = gsap.timeline({
    scrollTrigger: {
      trigger: "#proyectos",
      /* endTrigger: "#proyectos",
      end: "bottom bottom", */
      scrub: 1,
      markers: false,
    },
  });

  const proyectosBackgroundTL = gsap.timeline({
    scrollTrigger: {
      trigger: "#proyectos",
      start: "top center",
      endTrigger: "#nosotros",
      end: "60% top",
      scrub: 2,
    },
  });

  const proyectosBackgroundTL2 = gsap.timeline({
    scrollTrigger: {
      trigger: "#proyectos",
      start: "60% center",
      endTrigger: "#proyectos",
      end: "top center",
      scrub: 2,
      markers: false,
    },
  });

  const proyectosBackgroundTL3 = gsap.timeline({
    scrollTrigger: {
      trigger: "#proyectos",
      start: "60% center",
      /* endTrigger: "#p",
      end: "60% top", */
      scrub: 2,
    },
  });

  proyectosBackgroundTL.to("body", {
    backgroundColor: "#f76ed4",
    duration: 2,
  });

  proyectosBackgroundTL2.to("body", {
    backgroundColor: "red",
    duration: 1,
  });

  // proyectosBackgroundTL3.to("body", {
  //   backgroundColor: "#F2BE29",
  //   duration: 2,
  // });

  proyectoLineTL.to(".proyecto1 .line", {
    width: document.querySelector("#proyectos .container").offsetWidth,
    duration: 1,
  });

  proyectoLineTL.to(".proyecto2 .line", {
    width: document.querySelector("#proyectos .container").offsetWidth,
    duration: 1,
  });

  proyectoLineTL.to(".proyecto3 .line", {
    width: document.querySelector("#proyectos .container").offsetWidth,
    duration: 1,
  });

  /* moverLogoLineTL.to(".logo-nosotros", {
    y: document.querySelector("#proyectos").offsetHeight,
  }); */

  moverProyectosLineTL.to(".proyecto .proyecto-body", {
    x: "-=4000",
    // stagger: 0.01,
    stagger: {
      each: 0.01,
      ease: "none",
    },
  });
};

const personas = () => {
  const title = document.querySelector("#personas h2");
  const split = new SplitType(title, { type: "chars" });

  const tl = gsap
    .timeline({ paused: true })
    .to(split.chars, {
      duration: 0.2,
      ease: "power4.in",
      yPercent: -100,
      opacity: 0,
      stagger: {
        each: 0.04,
        from: "random",
      },
    })
    .fromTo(
      split.chars,
      {
        yPercent: 100,
        opacity: 0,
      },
      {
        duration: 0.6,
        ease: "power4",
        yPercent: 0,
        opacity: 1,
        immediateRender: false,
        stagger: {
          each: 0.04,
          from: "random",
        },
      }
    );

  title.addEventListener("mouseenter", () => {
    if (!tl.isActive()) {
      tl.restart();
    }
  });

  const personasBackground1 = gsap.timeline({
    scrollTrigger: {
      trigger: "#proyectos",
      start: "90% center",
      scrub: 2,
      endTrigger: "#proyectos",
      end: "60% top",
      markers: {
        startColor: "green",
        endColor: "black",
        fontSize: "3rem",
      },
    },
  });

  const personasTL = gsap.timeline({
    scrollTrigger: {
      trigger: "#personas",
      start: "top center",
    },
    repeat: -1,
    repeatDelay: 1,
    yoyo: true,
  });

  /* personasTL.to(".persona", {
    y: 100,
    stagger: {
      // wrap advanced options in an object
      each: 0.1,
      from: "center",
      grid: "auto",
      ease: "power2.inOut",
      repeat: -1, // Repeats immediately, not waiting for the other staggered animations to finish
    },
  }); */

  let img1 = true;
  personasBackground1.to("body", { backgroundColor: "#F2BE29", duration: 1 });
  personasTL.to(".persona", {
    duration: 1,
    scale: 0,
    y: 60,
    // yoyo: true,
    // repeat: 0,
    // repeatDelay: 0,
    ease: "power1.inOut",
    // stagger: function (index, target, list) {
    //   // your custom logic here. Return the delay from the start (not between each)
    //   console.log({ index, target, list });
    // },
    stagger: {
      amount: 1.5,
      grid: "auto",
      axis: "none",
      ease: "none",
      from: "random",
    },
    onUpdate: function () {},
    onComplete: function () {
      console.log("finish imagenes render 1");
      if (img1) {
        let boxes = document.getElementsByClassName("img1");
        for (const box of boxes) {
          box.style.display = "none";
        }
        boxes = document.getElementsByClassName("img2");
        for (const box of boxes) {
          box.style.display = "block";
        }
      } else {
        let boxes = document.getElementsByClassName("img1");
        for (const box of boxes) {
          box.style.display = "block";
        }
        boxes = document.getElementsByClassName("img2");
        for (const box of boxes) {
          box.style.display = "none";
        }
      }
      img1 = !img1;
      console.log({ img1 });
    },
  });
  // .to(".persona", {
  //   duration: 1,
  //   scale: 1,
  //   y: 60,
  //   // yoyo: true,
  //   // repeat: -1,
  //   // repeatDelay: 1,
  //   ease: "power1.inOut",
  //   // stagger: function (index, target, list) {
  //   //   // your custom logic here. Return the delay from the start (not between each)
  //   //   console.log({ index, target, list });
  //   // },
  //   stagger: {
  //     amount: 1.5,
  //     grid: "auto",
  //     axis: "none",
  //     ease: "none",
  //     from: "center",
  //   },
  //   onUpdate: function () {},
  //   onComplete: function () {
  //     console.log("finish imagenes render 2");
  //     // if (img1) {
  //     //   let boxes = document.getElementsByClassName("img1");
  //     //   for (const box of boxes) {
  //     //     box.style.display = "none";
  //     //   }
  //     //   boxes = document.getElementsByClassName("img2");
  //     //   for (const box of boxes) {
  //     //     box.style.display = "block";
  //     //   }
  //     // } else {
  //     //   let boxes = document.getElementsByClassName("img1");
  //     //   for (const box of boxes) {
  //     //     box.style.display = "block";
  //     //   }
  //     //   boxes = document.getElementsByClassName("img2");
  //     //   for (const box of boxes) {
  //     //     box.style.display = "none";
  //     //   }
  //     // }
  //     // img1 = !img1;
  //     // console.log({ img1 });
  //   },
  // });
};

document.addEventListener(
  "DOMContentLoaded",
  () => {
    setTimeout(init, 2000);
  }
  // init
);
