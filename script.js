// Example of redirect based on detected age group
// (You'll connect this with Teachable Machine output later)
function redirectByAge(ageGroup) {
  if (ageGroup === 'Kid') {
    window.location.href = "kids.html";
  } else if (ageGroup === 'Adult') {
    window.location.href = "adult.html";
  } else if (ageGroup === 'Senior') {
    window.location.href = "senior.html";
  }
}
