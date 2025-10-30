// === app.js ===

// مسار مجلد الموديل على GitHub
const URL = "model/"; // تأكدي أن هذا المجلد بجانب index.html

let model, webcam;

// تحميل الموديل والتأكد من نجاحه
async function loadModel() {
  try {
    model = await tmImage.load(URL + "model.json", URL + "metadata.json");
    console.log("Model loaded successfully");
  } catch (error) {
    console.error("Failed to load the model:", error);
    alert("❌ Error loading model. Check that the 'model' folder exists with model.json, metadata.json, and weights.bin");
  }
}

// إعداد الكاميرا وتشغيل التنبؤ
async function init() {
  await loadModel(); // تحميل الموديل أولاً

  try {
    webcam = new tmImage.Webcam(320, 240, true); // width, height, flip
    await webcam.setup(); // طلب إذن الكاميرا
    webcam.play();
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    window.requestAnimationFrame(loop);
  } catch (err) {
    console.error("Webcam not accessible:", err);
    alert("❌ Could not access webcam. Make sure you are using HTTPS or localhost.");
  }
}

// حلقة التنبؤ المستمرة
async function loop() {
  webcam.update(); // تحديث الصورة
  const prediction = await model.predict(webcam.canvas);

  // أخذ أعلى احتمال
  const top = prediction.reduce((prev, curr) => (prev.probability > curr.probability ? prev : curr));

  // عرض النتيجة
  document.getElementById("ageResult").innerText = `Detected Age: ${top.className}`;

  window.requestAnimationFrame(loop); // استدعاء التكرار
}

// ربط الزر
document.getElementById("startCamera").addEventListener("click", () => {
  init();
});
