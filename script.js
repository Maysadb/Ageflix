// سلايدر تلقائي لكل عناصر .movies-slider و .team-slider
function autoSlideSliders() {
  const sliders = document.querySelectorAll('.movies-slider, .team-slider');
  sliders.forEach(slider => {
    let scrollAmount = 0;
    let step = 1.5; // سرعة الحركة
    function slide() {
      if (!slider) return;
      scrollAmount += step;
      if (scrollAmount >= slider.scrollWidth - slider.clientWidth || scrollAmount <= 0) step = -step;
      slider.scrollLeft = scrollAmount;
      requestAnimationFrame(slide);
    }
    slide();
  });
}

window.addEventListener('load', autoSlideSliders);
