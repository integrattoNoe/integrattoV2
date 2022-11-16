const init = () => {
  gsap.registerPlugin("ScrollTrigger");
  var inicialTL = gsap.timeline();
  let mySplitText = new SplitType("#texto1", { type: "chars" });

  let myEl = document.querySelector("#texto1 .char");
  let tr = window
    .getComputedStyle(myEl)
    .getPropertyValue("transform")
    .match(/(-?[0-9\.]+)/g);

  let texto1TraslateY = tr[5];
  console.log(texto1TraslateY);

  var scrollTexto1TL = gsap.timeline({
    scrollTrigger: {
      trigger: "#general",
      start: "30% top",
      endTrigger: "#proyectos",
      end: "10% top",
      markers: true,
      scrub: 1,
      /* toggleActions: "play pause restart pause", */
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

  /* scrollTexto1TL.to(mySplitText.chars, {
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
  }); */

  /* scrollTexto1TL.fromTo(
    mySplitText.chars,
    {
      y: 0,
      stagger: { amount: 1 },
      ease: "back.in",
      immediateRender: false,
      onComplete() {
        console.log("FromTo 1 finish");
      },
    },
    {
      y: -800,
      stagger: { amount: 1 },
      ease: "back.out",
      immediateRender: false,
      onComplete() {
        console.log("FromTo 2 finish");
      },
    }
  ); */
};

document.addEventListener("DOMContentLoaded", init);
