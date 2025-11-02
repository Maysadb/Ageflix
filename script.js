let model, webcam, labelContainer;

async function init() {
  const modelURL = "model/model.json"; // ضع المسار الصحيح للموديل
  const metadataURL = "model/metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  const flip = true;
  webcam = new tmImage.Webcam(300, 225, flip);
  await webcam.setup(); // طلب الوصول للكاميرا
  await webcam.play();
  window.requestAnimationFrame(loop);

  document.getElementById("webcam").srcObject = webcam.webcam.stream;
  labelContainer = document.getElementById("label");
}

async function loop() {
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  const prediction = await model.predict(webcam.canvas);
  let highest = prediction.reduce((prev, current) => (prev.probability > current.probability) ? prev : current);

  labelContainer.innerText = `Detected: ${highest.className} (${(highest.probability * 100).toFixed(1)}%)`;

  if (highest.probability > 0.9) {
    if (highest.className === "Kid") window.location.href = "kids.html";
    else if (highest.className === "Adult") window.location.href = "adult.html";
    else if (highest.className === "Senior") window.location.href = "senior.html";
  }
}

window.onload = init;
