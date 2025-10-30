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

async function init() {
  try {
    model = await tmImage.load(URL + "model.json", URL + "metadata.json");
    console.log("Model loaded successfully");
  } catch (error) {
    console.error("Failed to load the model:", error);
    alert("Error loading model. Check console.");
  }

  webcam = new tmImage.Webcam(320, 240, true);
  await webcam.setup();
  webcam.play();
  document.getElementById("webcam-container").appendChild(webcam.canvas);
  window.requestAnimationFrame(loop);
}
