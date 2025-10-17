// ====== LOGIN SYSTEM ======
window.onload = () => {
  const loggedIn = localStorage.getItem("loggedIn");
  if (loggedIn === "true") {
    showDashboard();
  }
};

function login() {
  const phone = document.getElementById("phone").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (phone && pass) {
    localStorage.setItem("loggedIn", "true");
    showDashboard();
  } else {
    alert("⚠️ Please enter both phone number and password.");
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  document.getElementById("menu").classList.add("hidden");
  document.querySelectorAll(".container").forEach(c => c.classList.add("hidden"));
  document.getElementById("login-page").classList.remove("hidden");
}

function showDashboard() {
  document.getElementById("login-page").classList.add("hidden");
  document.getElementById("menu").classList.remove("hidden");
  showPage("home");
}

// ====== PAGE SWITCHING ======
function showPage(pageId) {
  document.querySelectorAll(".container").forEach(c => c.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");
}

// ====== LIVE INVESTMENT VALUE ======
function randomInvestmentValue() {
  const num = 7000000 + Math.random() * 3000000;
  return "₱" + num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

setInterval(() => {
  const amountElement = document.getElementById("liveAmount");
  if (amountElement) {
    amountElement.textContent = randomInvestmentValue();
  }
}, 1200);

// ====== MEMBERSHIP FLOW ======
function receiptSent() {
  showPage("receipt");

  // Simulate verification delay
  setTimeout(() => {
    showPage("verification");
    startVerificationProcess();
  }, 2500);
}

// ====== VERIFICATION SIMULATION ======
function startVerificationProcess() {
  const verify = document.querySelector("#verification .verification");
  verify.textContent = "⏳ Verifying your payment, please wait...";
  
  setTimeout(() => {
    verify.textContent = "✅ Your membership has been verified!";
    verify.style.color = "#27ae60";
    
    // Give ₱1000 bonus after verification
    const balanceElement = document.querySelector(".balance");
    if (balanceElement) {
      balanceElement.textContent = "₱1,000.00";
    }
  }, 4000);
}
