function login(){

  let phone =
  document.getElementById("loginPhone").value.trim();

  let password =
  document.getElementById("loginPassword").value.trim();

  // Lấy dữ liệu user
  let users =
  JSON.parse(localStorage.getItem("users")) || [];

  // Kiểm tra tài khoản
  let foundUser = users.find(function(user){

    return (
      user.phone === phone
      &&
      user.password === password
    );

  });

  // Nếu đúng
  if(foundUser){

    // Lưu tài khoản đang login
    localStorage.setItem(
      "currentUser",
      JSON.stringify(foundUser)
    );

    alert("Đăng nhập thành công 🚀");

    window.location.href = "home.html";

  }else{

    alert("Sai số điện thoại hoặc mật khẩu!");

  }

}