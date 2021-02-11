this.responseAvailable = false;

function fetchapi(){
  fetch("https://fb21cf46-76f2-4f2c-ae0d-2d2aa69baf67.mock.pstmn.io/retroaction", {
    "method": "GET"
  })
  .then(response => {
    if(response.ok){
      return response.json()
    } else{
      alert("Server returned " + response.status + " : " + response.statusText);
    }
  })
  .then(response => {
    this.result = response.body;
    this.responseAvailable = true;
  })
  .catch(err => {
    console.log(err);
  });
}
