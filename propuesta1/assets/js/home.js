const init = () => {
  gsap.registerPlugin("ScrollTrigger");

  general();
  marqueeInit();
  nosotros();
};

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
      trigger: "#proyectos",
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
      trigger: "#proyectos",
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
      trigger: "#proyectos",
      start: "top center",
      endTrigger: "#general",
      end: "80% center",
      markers: false,
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
      endTrigger: "#proyectos",
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
      endTrigger: "#proyectos",
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
    duration: 2,
  });

  nosotrosTL.to("#titulo-nosotros h2", {
    y: 0,
    duration: 4,
    onComplete() {
      nosotrosTL.to("#titulo-nosotros h2", { color: "red" });
    },
  });

  let mySplitText = new SplitType(".txt-nosotros", { type: "words,chars" });
  nosotrosTL.to(".txt-nosotros .word", {
    y: 0,
    duration: 15,
  });

  nosotrosTL.to(".logo-nosotros img", {
    x: 0,
    duration: 100,
    rotationZ: -360,
  });
};

document.addEventListener(
  "DOMContentLoaded",
  () => {
    setTimeout(init, 2000);
  }
  // init
);
