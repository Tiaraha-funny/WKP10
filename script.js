import faker from "faker";

const tbody = document.querySelector("tbody");

let persons = Array.from({ length: 10 }, () => {
  return {
    id: faker.random.uuid(),
    lastName: faker.name.lastName(),
    firstName: faker.name.firstName(),
    jobTitle: faker.name.jobTitle(),
    jobArea: faker.name.jobArea(),
    phone: faker.phone.phoneNumber(),
    picture: faker.image.avatar(100, 100),
  };
});

const displayList = (data) => {
  tbody.innerHTML = data
    .map(
      (person, index) => `
    <tr data-id="${person.id}" class="${index % 2 ? "even" : ""}">
        <td><img src="${person.picture}" alt="${
        person.firstName + " " + person.lastName
      }"/></td>
        <td class="lastName">${person.lastName}</td>
        <td class="firstName">${person.firstName}</td>
        <td class="jobTitle">${person.jobTitle}</td>
        <td class="jobArea">${person.jobArea}</td>
        <td class="phone">${person.phone}</td>
        <td>
            <button class="edit">
                <svg viewBox="0 0 20 20" fill="currentColor" class="pencil w-6 h-6"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
            </button>
            <button class="delete">
                <svg viewBox="0 0 20 20" fill="currentColor" class="trash w-6 h-6"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            </button>
            </td>
    </tr>
`
    )
    .join("");
};

const editPartner = (e) => {};

function destroyPopup(popup) {
  popup.classList.remove("open");
  popup.remove();
}

const handleClick = (e) => {
  if (e.target.closest("button.edit")) {
    const parent = e.target.closest("tr");
    const id = parent.dataset.id;
    editPartnerPopup(id);
  }

  if (e.target.closest("button.delete")) {
    console.log("delete button is clicked");
    const parent = e.target.closest("tr");
    const id = parent.dataset.id;
    deleteDeletePopup(id);
  }
};

//To handle the click button and show all of these inside the input

const editPartnerPopup = (id) => {
  console.log("Edit is clicked");
  let personToEdit = persons.find((person) => person.id === id);
  console.log(personToEdit);

  return new Promise(function (resolve) {
    const popup = document.createElement("form");
    popup.classList.add("popup");
    popup.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="form">
          <h1>Is this your partner?</h1>
          <fieldset>
            <label>Last Name</labe>
            <input type="text" name="lastName" id="lastname" value="${personToEdit.lastName}">
          </fieldset>
          <fieldset>
            <label>First name</labe>
            <input type="text" name="firstName" id="firstname" value="${personToEdit.firstName}">
          </fieldset>
          <fieldset>
            <label>Job title</labe>
            <input type="text" name="jobTitle" id="title" value="${personToEdit.jobTitle}">
          </fieldset>
          <fieldset>
            <label>Job area</labe>
            <input type="text" name="jobArea" id="jobarea" value="${personToEdit.jobArea}">
          </fieldset>
          <fieldset>
            <label>Phone number</labe>
            <input type="text" name="phone" id="number" value="${personToEdit.phone}">
          </fieldset>
          <div class="buttons">
            <button type="submit">
              Save
            </button>
            <button type="button" name="cancel">
              cancel
            </button>
          </div>
        </div>
      `
    );

    popup.addEventListener(
      "submit",
      (e) => {
        e.preventDefault();

        resolve();

        personToEdit.lastName = popup.lastName.value;
        personToEdit.firstName = popup.firstName.value;
        personToEdit.jobTitle = popup.jobTitle.value;
        personToEdit.jobArea = popup.jobArea.value;
        personToEdit.phone = popup.number.value;

        displayList(persons);

        destroyPopup(popup);
      },
      { once: true }
    );

    if (popup.cancel) {
      console.log("I am canceled by you");
      popup.cancel.addEventListener(
        "click",
        function () {
          resolve(null);
          destroyPopup(popup);
        },
        { once: true }
      );
    }

    resolve(document.body.appendChild(popup));
    popup.classList.add("open");
  });
};

const deleteDeletePopup = (id) => {
  // create confirmation popup here
  console.log("delete btn is clicked");

  let personToDelete = persons.find((person) => person.id === id);
  console.log(personToDelete);

  return new Promise(function (resolve) {
    const popup = document.createElement("form");
    popup.classList.add("popup");
    popup.insertAdjacentHTML(
      "afterbegin",
      `<article>
      <h3>Do you really want to delete it?</h3>
      <button class="yes">YES</button>
      <button class="cancel" type="button" name="cancel">CANCEL</button>
    </article>
      `
    );

    if (popup.cancel) {
      console.log("The cancel button is clicked");
      popup.cancel.addEventListener(
        "click",
        function () {
          resolve(null);
          destroyPopup(popup);
        },
        { once: true }
      );
    }

    resolve(document.body.appendChild(popup));
    popup.classList.add("open");
  });
};

window.addEventListener("click", handleClick);
displayList(persons);
