
const RootBtn = document.getElementById("getRoot");
const GetAllEmail = document.getElementById("getData");
const InsertBtn = document.getElementById("btn");

async function InsertValueTxtArea(event)  {
  event.preventDefault();

  console.log(InputValue.value);
  fetch("http://localhost:3333/api/many_emails", {
    method: "POST",
    body: JSON.stringify({ emails: InputValue.value}),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}


InsertBtn.addEventListener("click", InsertValueTxtArea)

RootBtn.addEventListener("click", () => {
  fetch("http://localhost:3333/api")
    .then((data) => data.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});

GetAllEmail.addEventListener("click", () => {
  fetch("http://localhost:3333/api/email")
    .then((data) => data.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});


byFirstName

