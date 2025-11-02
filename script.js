const URL = "model/"; // تأكد أن هذا المجلد موجود فعلاً في root أو داخل public في Vercel
let model, webcam, labelContainer, maxPredictions;

async function init() {
  try {
    console.log("🔹 Initializing model...");
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    console.log("✅ Model loaded, setting up webcam...");
    const flip = true;
    webcam = new tmImage.Webcam(300, 225, flip);

    await webcam.setup(); // هنا بيطلب إذن الكاميرا
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById("webcam").srcObject = webcam.webcam.stream;
    labelContainer = document.getElementById("label");
    labelContainer.innerText = "Model loaded! Detecting...";
  } catch (err) {
    console.error("❌ Error initializing:", err);
    document.getElementById("label").innerText = "Error: " + err.message;
  }
}

async function loop() {
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  const prediction = await model.predict(webcam.canvas);
  let highest = prediction.reduce((a, b) => a.probability > b.probability ? a : b);
  document.getElementById("label").innerText = `Detected: ${highest.className} (${(highest.probability * 100).toFixed(1)}%)`;

  if (highest.probability > 0.9) {
    if (highest.className === "Kid") window.location.href = "kids.html";
    else if (highest.className === "Adult") window.location.href = "adult.html";
    else if (highest.className === "Senior") window.location.href = "senior.html";
  }
}

window.onload = init;
