import "./scss/app.scss";

//// MODULE IMPORTS

/// GSAP
import { CSSPlugin, Expo, gsap, Linear } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin, CSSPlugin, Expo, Linear);

//// CODE BELOW

// Reveal on scroll
document.addEventListener("DOMContentLoaded", () => {
  const options = {
    threshold: 0,
    rootMargin: "0px 0px -50px 0px",
  };

  document.body.style.opacity = "1";

  const types = {
    fadeInUp: [
      ".s-content h1",
      ".s-content p",
      ".s-content .form-subscribe, .privacyPolicy",
    ],
    scaleIn: [],
    horizontalToLeft: [],
    horizontalToRight: [],
    fadeIn: [".s-background", ".s-media", ".presented-by"],
  };

  // merge all elements
  const elementsList = [
    ...types.fadeInUp,
    ...types.fadeIn,
    ...types.horizontalToLeft,
    ...types.horizontalToRight,
    ...types.scaleIn,
  ];

  // properties
  const itemDelay = 0.15;
  let itemLoad = 0;

  const onEntry = (entry) => {
    itemLoad = 0;

    entry.forEach((change, i) => {
      if (change.isIntersecting) {
        itemLoad++;

        gsap
          .to(change.target, {
            opacity: 1,
            translateY: 0,
            translateX: 0,
            scale: 1,
            ease: Expo.easeOut,
            duration: 2,
            delay: itemLoad * itemDelay,
          })
          .then(function () {
            observer.unobserve(change.target);

            change.target.style.transform = "";
            change.target.style.opacity = "";
            change.target.style.willChange = "";
          });
      }
    });
  };

  // instantiate a new Intersection Observer
  let observer = new IntersectionObserver(onEntry, options);

  // list of cards
  let elements = document.querySelectorAll(elementsList);

  // set properties based on 'type'
  const setProperties = (e, type) => {
    switch (type) {
      case "horizontalToRight":
        e.style.transform = "translate3d(-8rem, 0, 0)";
        e.style.opacity = "0";
        e.style.willChange = "transform, opacity";
        break;
      case "horizontalToLeft":
        e.style.transform = "translate3d(8rem, 0, 0)";
        e.style.opacity = "0";
        e.style.willChange = "transform, opacity";
        break;
      case "fadeInUp":
        e.style.transform = "translate3d(0, 2rem, 0)";
        e.style.opacity = "0";
        e.style.willChange = "transform, opacity";
        break;
      case "fadeIn":
        e.style.opacity = "0";
        e.style.willChange = "opacity";
        break;
      case "scaleIn":
        e.style.transform = "scale(1.25)";
        e.style.opacity = "0";
        e.style.willChange = "transform, opacity";
        break;
    }
  };

  // set properties to each element accordingly
  for (let type in types) {
    for (let elem of types[type]) {
      const elements = document.querySelectorAll(elem);

      elements.forEach((elm) => {
        setProperties(elm, type);
      });
    }
  }

  // loop through all elements
  // pass each element to observe method
  for (let elm of elements) {
    observer.observe(elm);
  }

  // AWeber stuff
  /** @description Special handling for in-app browsers that don't always support new windows */
  (function () {
    function browserSupportsNewWindows(userAgent) {
      var rules = [
        "FBIOS",
        "Twitter for iPhone",
        "WebView",
        "(iPhone|iPod|iPad)(?!.*Safari/)",
        "Android.*(wv|.0.0.0)",
      ];
      var pattern = new RegExp("(" + rules.join("|") + ")", "ig");
      return !pattern.test(userAgent);
    }

    if (
      !browserSupportsNewWindows(
        navigator.userAgent || navigator.vendor || window.opera
      )
    ) {
      document.getElementById("af-form-1076426184").removeAttribute("target");
    }
  })();
});
