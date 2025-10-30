// === app.js ===

// الملفات موجودة في نفس المجلد مع index.html
const URL = "";
const URL = "";
model = await tmImage.load(URL + "model.json", URL + "metadata.json");

let model, webcam;

// تحميل الموديل
async function loadModel() {
  try {
    model = await tmImage.load(URL + "model.json", URL + "metadata.json");
    console.log("Model loaded successfully");
  } catch (error) {
    console.error("Failed to load the model:", error);
    alert("❌ Error loading model. تأكد أن model.json وmetadata.json وweights.bin موجودة في نفس المجلد مع index.html");
  }
}

// تشغيل الكاميرا والتنبؤ
async function init() {
  await loadModel();

  try {
    webcam = new tmImage.Webcam(320, 240, true);
    await webcam.setup();
    webcam.play();
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    window.requestAnimationFrame(loop);
  } catch (err) {
    console.error("Webcam not accessible:", err);
    alert("❌ Could not access webcam. تأكد من استخدام HTTPS أو localhost.");
  }
}

// حلقة التنبؤ المستمرة
async function loop() {
  webcam.update();
  const prediction = await model.predict(webcam.canvas);

  const top = prediction.reduce((prev, curr) => (prev.probability > curr.probability ? prev : curr));
  document.getElementById("ageResult").innerText = `Detected Age: ${top.className}`;

  window.requestAnimationFrame(loop);
}

// ربط الزر
document.getElementById("startCamera").addEventListener("click", () => {
  init();
});

