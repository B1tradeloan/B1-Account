// === SIMPLE LOGIN SYSTEM (remembers user) ===
document.addEventListener("DOMContentLoaded", () => {
  // Simulate login check
  const userLoggedIn = localStorage.getItem("b1_user_loggedin");

  if (!userLoggedIn) {
    const phone = prompt("Enter your phone number:");
    const password = prompt("Enter your password:");
    if (phone && password) {
      localStorage.setItem("b1_user_loggedin", "true");
      localStorage.setItem("b1_user_phone", phone);
      alert("Welcome to B1 Member Portal!");
    } else {
      alert("Login failed. Please refresh and try again.");
    }
  }

  // Start random number update
  updateLiveNumber();
  setInterval(updateLiveNumber, 1000);

  // Check verification status
  checkVerificationStatus();
});

// === LOGOUT FUNCTION ===
function logout() {
  localStorage.removeItem("b1_user_loggedin");
  localStorage.removeItem("proofData");
  window.location.reload();
}

// === PAGE SWITCHING ===
function showPage(pageId) {
  const sections = document.querySelectorAll(".container");
  sections.forEach(sec => sec.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");
}

// Redirect membership button
function goToVerification() {
  showPage("verification");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// === RANDOM NUMBER (₱7M–₱10M) ===
function updateLiveNumber() {
  const num = Math.floor(Math.random() * (10000000 - 7000000 + 1)) + 7000000;
  document.getElementById("liveNumber").textContent = "₱" + num.toLocaleString();
}

// === VERIFICATION LOGIC ===
const verifyForm = document.getElementById("verifyForm");
const proofUpload = document.getElementById("proofUpload");
const verifyStatus = document.getElementById("verifyStatus");

verifyForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const file = proofUpload.files[0];
  if (!file) {
    verifyStatus.innerHTML = "<p style='color:red;'>Please upload an image proof first.</p>";
    return;
  }

  const reader = new FileReader();
  reader.onload = function() {
    const proofData = {
      image: reader.result,
      submittedAt: new Date().getTime()
    };
    localStorage.setItem("proofData", JSON.stringify(proofData));
    verifyStatus.innerHTML = "<p style='color:green;'>✅ Proof uploaded! Verification will complete within 24 hours.</p>";
  };
  reader.readAsDataURL(file);
});

function checkVerificationStatus() {
  const data = JSON.parse(localStorage.getItem("proofData"));
  const membershipBtn = document.getElementById("membershipBtn");
  const balanceDisplay = document.getElementById("balance");

  if (!data) return;

  const now = new Date().getTime();
  const elapsed = now - data.submittedAt;
  const oneDay = 24 * 60 * 60 * 1000;

  if (elapsed >= oneDay) {
    verifyStatus.innerHTML = "<p style='color:green;'>✅ Verification complete! You are now a verified member.</p>";
    membershipBtn.disabled = true;
    membershipBtn.innerText = "✅ Verified Member";
    balanceDisplay.textContent = "₱1,000.00 Bonus";
    balanceDisplay.style.color = "green";
  } else {
    const remaining = Math.ceil((oneDay - elapsed) / (60 * 60 * 1000));
    verifyStatus.innerHTML = `<p style='color:orange;'>⏳ Verification pending. Please wait ${remaining} more hour(s).</p>`;
    membershipBtn.innerText = "Verification Pending...";
    membershipBtn.disabled = true;
  }
}
