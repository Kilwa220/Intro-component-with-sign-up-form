/*
    valide data script
*/

let form = document.forms[0];
let firstName = document.querySelector("[name=firstName]");
let lastName = document.querySelector("[name=lastName]");
let email = document.querySelector("[type=email]");
let password = document.querySelector("[type=password]");
let messageError = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

// CREATE THE ELEMENT OF THE ERROR
let span = document.createElement("span");
span.classList.add("error");

form.onsubmit = function (e) {
  let validData = false;
  let allData = [firstName, lastName, email, password];
  let entries = Object.entries(messageError);

  // RESET EMAIL PLACEHOLDER
  email.classList.remove("change-placeholder-color");
  email.placeholder = "Email adress";

  // REMOVE ALL THE ERRORS BEFORE STARTS CHEKING AGAIN
  let errosSpan = document.querySelectorAll(".error");
  errosSpan.forEach((e) => {
    // RESET THE COLOR OF THE BORDER
    e.previousElementSibling.children[0].style["borderColor"] = "#ddd";
    e.style["borderColor"] = "black";
    e.previousElementSibling.children[1].remove();
    e.remove();
  });

  // CHECKING DATA
  let currentInput = 0;
  do {
    if (!testEmpty(allData[currentInput].value, entries[currentInput][0]))
      validData = true;

    if (entries[currentInput][0] === "email" && messageError.email === "") {
      let regex = /^([^\W]\w+([_|.|-]?\w+)*@\w+[_|.|-]?\w+\.\w{2,})\b/;
      if (!email.value.match(regex)) {
        messageError["email"] = `Looks like this is not an email`;
        validData = true;
      }
    }
  } while (allData[currentInput++] !== password);

  // PRINT IF THERE IS ANY ERROR
  if (validData) {
    e.preventDefault();
    entries = Object.entries(messageError);
    for (let i = 0; i < entries.length; i++) {
      if (entries[i][1] !== "") {
        let spanError = span.cloneNode(true);
        spanError.textContent = entries[i][1];
        allData[i].parentElement.parentElement.append(spanError);

        //  ADD ERROR ICON
        let iconError = document.createElement("i");
        iconError.classList.add("fa-solid", "fa-circle-exclamation");
        allData[i].after(iconError);

        // COLOR THE BORDER OF INVALID DATA
        allData[i].style["borderColor"] = "#c50000bd";

        if (entries[i][1] === "Looks like this is not an email" && i == 2) {
          email.value = "";
          email.placeholder = "email@example/com";
          email.classList.add("change-placeholder-color");
        }
      }
    }
    resetError();
  }
};

function testEmpty(inputValue, nameInput) {
  if (!inputValue) {
    messageError[nameInput] = `${nameInput} cannot be empty`;
    return 0;
  }
  return 1;
}

function resetError() {
  messageError = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
}
