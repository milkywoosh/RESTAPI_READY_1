
const RootBtn = document.getElementById("getRoot");
const DataBtn = document.getElementById("getData");
const InsertBtn = document.getElementById("btn");
const InputValue = document.getElementById("getvalue");

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

DataBtn.addEventListener("click", () => {
  fetch("http://localhost:3333/api/data")
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
