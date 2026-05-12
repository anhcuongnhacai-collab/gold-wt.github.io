let captchaText = "";

/* ================= CAPTCHA ================= */
function createCaptcha() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  captchaText = "";

  for (let i = 0; i < 6; i++) {
    captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const cap = document.getElementById("captcha");
  if (cap) cap.innerText = captchaText;
}

window.onload = createCaptcha;
/* ================= AUTO REF ================= */
function getRefFromURL(){
  const params = new URLSearchParams(window.location.search);
  return params.get("ref");
}

window.addEventListener("load", function(){
  createCaptcha();

  let ref = getRefFromURL();
  if(ref && document.getElementById("refCodeInput")){
    document.getElementById("refCodeInput").value = ref;
  }
});

/* ================= CHECK CHỮ + SỐ ================= */
function onlyEnglish(text) {
  return /^[A-Za-z0-9]+$/.test(text);
}

/* ================= REGISTER ================= */
function register() {

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let username = document.getElementById("registerUser").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let password = document.getElementById("registerPass").value.trim();
  let confirmPass = document.getElementById("confirmPass").value.trim();
  let captchaInput = document.getElementById("captchaInput").value.trim();
  let refInput = document.getElementById("refCodeInput")?.value.trim() || "";

  /* ===== CHECK RỖNG ===== */
  if (!username || !phone || !password || !confirmPass) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  /* ===== CHECK CHỮ ===== */
  if (!onlyEnglish(username) || !onlyEnglish(password)) {
    alert("Chỉ dùng chữ và số A-Z / 0-9");
    return;
  }

  /* ===== CHECK PASSWORD ===== */
  if (password !== confirmPass) {
    alert("Mật khẩu không khớp!");
    return;
  }

  /* ===== CHECK CAPTCHA ===== */
  if (captchaInput !== captchaText) {
    alert("Sai mã xác nhận!");
    createCaptcha();
    return;
  }

  /* ===== CHECK TRÙNG SĐT ===== */
  let exist = users.find(u => u.phone === phone);
  if (exist) {
    alert("Số điện thoại đã tồn tại!");
    return;
  }

  /* ===== TẠO USER ===== */
  let myRef = phone + Math.floor(Math.random() * 999);

  let newUser = {
    name: username,
    phone: phone,
    password: password,

    money: 10000,     // 🎁 mặc định 10k

    vip: 0,           // chưa VIP
    myRef: myRef,    // mã giới thiệu riêng
    refBy: refInput || null,
refCount: 0,
totalCommission: 0
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Đăng ký thành công!");
  window.location.href = "index.html";
}

/* ================= VIP + REF SYSTEM ================= */

/*
  RULE:
  - Người A giới thiệu B
  - A chỉ được +20k khi B:
    + nạp tiền
    + mua VIP1
*/

function upgradeVIP(phone) {

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(u => u.phone === phone);
  if (!user) return;

  user.vip = 1;

  /* ===== THƯỞNG NGƯỜI GIỚI THIỆU ===== */
  if (user.refBy) {

    let refUser = users.find(u => u.myRef === user.refBy);

    if (refUser && user.vip === 1) {

      refUser.money = (refUser.money || 0) + 20000;

      alert("🎉 Người giới thiệu nhận +20.000đ!");

    }
  }

  localStorage.setItem("users", JSON.stringify(users));
}