//ranom user api, nationalities:australia, canada, great britian, united states
// Get the employee div container
const randomUserUrl = "https://randomuser.me/api/?results=12&nat=au,ca,gb,us";
let employeeDiv = document.getElementById("employee-div");
// Get the modal
let modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
// Get all users
let users = document.getElementsByClassName("user-widget");
// Get modal previous img
let prev = document.getElementById("prev");
// Get modal next img
let next = document.getElementById("next");
//get modal div
let modalDescDiv = document.getElementById("user-desc-box");
// get currentUser
let currentUser;

/* ---------------------------
       Functions
------------------------------*/
// user input search
function search() {
  const input = document.getElementById("search").value;
  const userNames = document.querySelectorAll("h1");
  userNames.forEach((element) => {
    if (element.textContent.toLocaleLowerCase().includes(input)) {
      element.parentElement.parentElement.parentElement.style.display = "block";
    } else {
      element.parentElement.parentElement.parentElement.style.display = "none";
    }
  });
}

//get and parse api request
async function fetchUsers(url) {
  const user = await fetch(url);
  const userJson = await user.json();
  return userJson;
}

//generate user html
function generateUser(data) {
  const users = data.results
    .map(
      (user) =>
        `<div class='user-widget'>
      <a 
         data-title="${dataTitle(user)}" >
        <div class="user-img">
          <img src="${user.picture.large}" alt="" />
        </div>
        <div class="user-desc">
          <h1>${user.name.first} ${user.name.last}</h1>
          <p>${user.email}</p>
          <p>${user.location.city}</p>
        </div>
      </a>
    </div>`
    )
    .join(""); //remove commas;
  employeeDiv.innerHTML = users;
  return data;
}
//when user clicks on employee modal pops up
function popUp(element) {
  let userDetails = element.firstElementChild.getAttribute("data-title");
  modal.style.display = "block";
  modalDescDiv.innerHTML = userDetails;
}
// Modal layout
function dataTitle(user) {
  const birthday = user.dob.date;
  const month = birthday.slice(5, 7);
  const day = birthday.slice(8, 10);
  const year = birthday.slice(0, 4);
  const data = `
  <img src='${user.picture.large}' />
  <h3 style='color:black;font-size:24px;margin-bottom:0px;margin-top:16px'>${user.name.first} ${user.name.last}</h3>
  <p class='userDesc'  style='margin-top:8px;margin-bottom:0px'>${user.email}</p>
  <p class='userDesc' style='margin-bottom:30px;margin-top:8px'>${user.location.city}</p>
  <div style='border-top: rgb(220, 220, 220) solid 2px;'>
  <p class='userDesc' style='margin-top:30px' >${user.phone}</p>
  <p class='userDesc' style='margin:24px 0'>${user.location.street.number} ${user.location.street.name}, ${user.nat} ${user.location.postcode}</p>
  <p class='userDesc'>Birthday: ${month}/${day}/${year}</p></div>
  `;
  return data;
}

/* ---------------------------
       Run
------------------------------*/
fetchUsers(randomUserUrl).then(generateUser);
/* ---------------------------
      Event Listeners
------------------------------*/
// When the user clicks on <span> (x), close the modal
span.addEventListener("click", () => {
  modal.style.display = "none";
});
// when user clicks on employee, show modal popup
employeeDiv.addEventListener("click", (event) => {
  for (let i = 0; i < users.length; i++) {
    const image = users[i].firstElementChild.firstElementChild.firstElementChild;
    if (
      event.target === image ||
      event.target === image.closest("div") ||
      event.target === users[i] ||
      event.target === users[i].firstElementChild.lastElementChild
    ) {
      console.log(event.target);
      popUp(users[i]);
      currentUser = users[i];
    }
  }
});
// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
// when user clicks prev, show prev employee
prev.addEventListener("click", (e) => {
  next.style.pointerEvents = "auto";
  modalDescDiv.innerHTML = ``;
  modalDescDiv.innerHTML = `${currentUser.previousSibling.firstElementChild.getAttribute("data-title")}`;
  currentUser = currentUser.previousSibling;
  if (currentUser === currentUser.parentElement.firstElementChild) {
    prev.style.pointerEvents = "none";
  }
});
// when user clicks next, show next employee
next.addEventListener("click", () => {
  prev.style.pointerEvents = "auto";
  modalDescDiv.innerHTML = ``;
  modalDescDiv.innerHTML = `${currentUser.nextSibling.firstElementChild.getAttribute("data-title")}`;
  currentUser = currentUser.nextSibling;
  if (currentUser === currentUser.parentElement.lastElementChild) {
    next.style.pointerEvents = "none";
  }
});
