function register() {
  let usernameElem = document.getElementById("username");
  let emailElem = document.getElementById("email");
  let passwordElem = document.getElementById("password");

  let currentUsername = usernameElem.value;
  let currentEmail = emailElem.value;
  let currentPassword = passwordElem.value;

  let resultSection = document.getElementById("result");

  if (currentUsername != "" && currentEmail.match(/(.+)@(.+).(com|bg)/gm) && currentPassword != "") {
    let currentResultElem1 = document.createElement('h1');
    currentResultElem1.textContent = "Successful Registration!";
    //let currentResultElem2 = document.createTextNode(`Username: ${currentUsername}` + "\r\n" + `Email: ${currentEmail}` + "\r\n" + `Password: ${"*".repeat(currentPassword.length)}`);
    let currentResultElem2 = document.createTextNode(`Username: ${currentUsername}`);
    let currentResultElem3 = document.createTextNode(`Email: ${currentEmail}`);
    let currentResultElem4 = document.createTextNode(`Password: ${"*".repeat(currentPassword.length)}`);
    let newline = document.createElement('br');
    let newline2 = document.createElement('br');
    //let currentResultElem = currentResultElem1 + currentResultElem2;
    resultSection.appendChild(currentResultElem1);
    resultSection.appendChild(currentResultElem2);
    resultSection.appendChild(newline);
    resultSection.appendChild(currentResultElem3);
    resultSection.appendChild(newline2);
    resultSection.appendChild(currentResultElem4);
    //resultSection.innerHTML = `Username: ${currentUsername}<br>Email: ${currentEmail}<br>Password: ${"*".repeat(currentPassword.length)}`;
    setTimeout(function () {
      resultSection.textContent = "";
    }, 5000);
    //  setTimeout(function () { 
    //   location.reload();
    // }, 5000);
  };
  usernameElem.value = "";
  emailElem.value = "";
  passwordElem.value = "";
};