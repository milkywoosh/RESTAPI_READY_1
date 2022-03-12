fetch("http://localhost:3333/api/data", {
  method: 'GET'
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

fetch("http://localhost:3333/api/")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));


  
