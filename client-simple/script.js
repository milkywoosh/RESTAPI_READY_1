const RootBtn = document.getElementById("getRoot");
const DataBtn = document.getElementById("getData");

RootBtn.addEventListener("click", () => {
  fetch("http://localhost:3333/api")
    .then((data) => data.json())
    .then( data => console.log(data))
    .catch((err) => console.log(err));
});

DataBtn.addEventListener("click", () => {
  fetch("http://localhost:3333/api/data")
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});


