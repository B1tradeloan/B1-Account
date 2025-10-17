// ====== LOGIN CHECK (REMEMBER USER) ======
const savedUser = localStorage.getItem('loggedIn');

window.onload = () => {
  if (savedUser === 'true') {
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('home').classList.remove('hidden');
  }
};

// ====== LOGIN FUNCTION ======
function login() {
  const phone = document.getElementById('phone').value.trim();
  const pass = document.getElementById('password').value.trim();

  if (phone && pass) {
    localStorage.setItem('loggedIn', 'true');
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('menu').classList.remove('hidden');
    showPage('home');
  } else {
    alert('Please enter both phone number and password.');
  }
}

// ====== LOGOUT FUNCTION ======
function logout() {
  localStorage.removeItem('loggedIn');
  document.getElementById('menu').classList.add('hidden');
  document.querySelectorAll('.container').forEach(c => c.classList.add('hidden'));
  document.getElementById('login-page').classList.remove('hidden');
}

// ====== PAGE SWITCHING ======
function showPage(pageId) {
  document.querySelectorAll('.container').forEach(c => c.classList.add('hidden'));
  document.getElementById(pageId).classList.remove('hidden');
}

// ====== LIVE INVESTMENT NUMBER ₱7M–₱10M ======
setInterval(() => {
  let num = 7000000 + Math.random() * 3000000;
  document.getElementById('liveAmount').textContent = '₱' +
    num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}, 1000);

// ====== MEMBERSHIP FLOW ======
function receiptSent() {
  showPage('receipt');
  setTimeout(() => {
    showPage('verification');
  }, 3000);
}
