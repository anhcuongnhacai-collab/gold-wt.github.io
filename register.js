  let captchaText = "";
 
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

  if (!username || !phone || !password || !confirmPass) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  if (!onlyEnglish(username) || !onlyEnglish(password)) {
    alert("Chỉ dùng chữ và số A-Z / 0-9");
    return;
  }

  if (password !== confirmPass) {
    alert("Mật khẩu không khớp!");
    return;
  }

  if (captchaInput !== captchaText) {
    alert("Sai mã xác nhận!");
    createCaptcha();
    return;
  }

  if(users.find(u => u.phone === phone)){
    alert("Số điện thoại đã tồn tại!");
    return;
  }

  let myRef = phone + Math.floor(Math.random() * 999);

  let newUser = {
    username: username,    // ✅ lưu để admin đồng bộ
    name: username,
    phone: phone,
    password: password,
    money: 10000,
    baseMoney: 10000,
    vip: 0,
    myRef: myRef,
    refBy: refInput || null,
    refCount: 0,
    totalCommission: 0
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(newUser));

  alert("Đăng ký thành công!");
  window.location.href = "index.html";
}

/* ================= VIP + REF SYSTEM ================= */
function upgradeVIP(phone) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.phone === phone);
  if (!user) return;

  user.vip = 1;

  if (user.refBy) {
    let refUser = users.find(u => u.myRef === user.refBy);
    if (refUser && user.vip === 1) {
      refUser.money = (refUser.money || 0) + 20000;
      alert("🎉 Người giới thiệu nhận +20.000đ!");
    }
  }

  localStorage.setItem("users", JSON.stringify(users));
}

window.register = register;
window.upgradeVIP = upgradeVIP;
