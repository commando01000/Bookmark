var bookmarkName = document.getElementById("bookmarkName");

var bookmarkURL = document.getElementById("SiteURL");

var errorForm = document.getElementById("box");

var closeErrorForm = document.getElementById("closeBtn");

closeErrorForm.addEventListener("click", function () {
  errorForm.className = errorForm.className.replace("d-flex", "d-none");
});

var websites = [];

var check = 0;

if (localStorage.getItem("urls") !== null) {
  websites = JSON.parse(localStorage.getItem("urls"));
  Display();
}

function storeWebsite() {
  if (isValidName() && isValidUrl()) {
    var website = {
      bookmark_name: bookmarkName.value,
      bookmark_URL: bookmarkURL.value,
    };

    if (websites.length > 0) {
      for (var i = 0; i < websites.length; i++) {
        if (websites[i].bookmark_URL !== bookmarkURL.value) {
          check++;
        }
      }
      if (check == websites.length) {
        websites.push(website);
      } else {
        alert("url already exists !");
      }
    } else {
      websites.push(website);
    }

    localStorage.setItem("urls", JSON.stringify(websites));
    Display();
    clearInput();
    check = 0;
  } else if (!isValidName()) {
    // alert("Invalid Name it should be greater than 3 characters !");
    errorForm.className = errorForm.className.replace("d-none", "d-flex");
  }
}

function isValidUrl() {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );

  var valid = pattern.test(bookmarkURL.value);

  if (valid) {
    bookmarkURL.classList.remove("is-invalid");
    bookmarkURL.classList.add("is-valid");
    return true;
  } else {
    bookmarkURL.classList.remove("is-valid");
    bookmarkURL.classList.add("is-invalid");
  }
}

function isValidName() {
  const pattern = /^[a-zA-Z0-9\s]{3,}$/;

  var valid = pattern.test(bookmarkName.value);

  if (valid) {
    bookmarkName.classList.remove("is-invalid");
    bookmarkName.classList.add("is-valid");
    return true;
  } else {
    bookmarkName.classList.remove("is-valid");
    bookmarkName.classList.add("is-invalid");
  }
}

function Display() {
  var records = ``;
  for (var i = 0; i < websites.length; i++) {
    records += `<tr>
        <td>
            ${i + 1}
        </td>
        <td>
            ${websites[i].bookmark_name}
        </td>
        <td>
        <a href="${
          websites[i].bookmark_URL
        }"><button class="btn btn-outline-success">
        <i class="fa-solid fa-eye"></i>
        Visit
        </button></a>
        </td>
        <td>
            <button onclick="Delete(${i})" class="btn btn-outline-danger">
            <i class="fa fa-trash"></i>
            Delete
            </button>
        </td>
        </tr>
          `;
  }
  document.getElementById("tableBody").innerHTML = records;
}

function clearInput() {
  bookmarkName.value = "";
  bookmarkURL.value = "";
}

function Delete(index) {
  websites.splice(index, 1);
  localStorage.setItem("urls", JSON.stringify(websites));
  Display();
}
