gsap.registerPlugin(ScrollTrigger);

const images = gsap.utils.toArray('img');
const loader = document.querySelector('.loader--text');
const updateProgress = (instance) => 
  loader.textContent = `${Math.round(instance.progressedCount * 100 / images.length)}%`;

const showDemo = () => {
  document.body.style.overflow = 'auto';
  document.scrollingElement.scrollTo(0, 0);
  gsap.to(document.querySelector('.loader'), { autoAlpha: 0 });
  
  gsap.utils.toArray('section').forEach((section, index) => {
    if (section.classList.contains("hero")) {
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          scrub: true,
          pin: true,
          start: "center center",
          end: "bottom -100%",
          toggleClass: "active",
          ease: "power2"
        }
      });
    
      gsap.to(".hero__image", {
        scrollTrigger: {
          trigger: section,
          scrub: 0.5,
          start: "top bottom",
          end: "bottom -300%",
          ease: "power2"
        },
        y: "-30%"
      });
    } else {
      const w = section.querySelector('.wrapper');
      const [x, xEnd] = (index % 2) ? ['100%', (w.scrollWidth - section.offsetWidth) * -1] : [w.scrollWidth * -1, 0];
      gsap.fromTo(w, {  x  }, {
        x: xEnd,
        scrollTrigger: { 
          trigger: section, 
          scrub: 0.5 
        }
      });
    }
  });
}

imagesLoaded(images).on('progress', updateProgress).on('always', showDemo);
