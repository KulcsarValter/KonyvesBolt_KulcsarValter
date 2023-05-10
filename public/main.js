const vasarloIdInput=document.getElementById('vasarloid');
const vasarloNevInput=document.getElementById('nev');
const vasarloEmailCimInput = document.getElementById('emailcim');
const felhasznaloInput = document.getElementById('felhasznalonev');
const jelszoInput = document.getElementById('jelszo');
const vasarloCards = document.getElementById('vasarlo');

const listazButton = document.getElementById('kilistaz');
const torolButton = document.getElementById('torol');
const bevitellButton = document.getElementById('bevitel');
const frissitButton = document.getElementById('Frissit');

function Adatok() {
    const adatok = {
      vasarloid: vasarloIdInput.value,
      nev: vasarloNevInput.value,
      emailcim: vasarloEmailCimInput.value,
      felhasznalonev: felhasznaloInput.value,
      jelszo: jelszoInput.value
    };
    return adatok;
  }
  
  bevitellButton.addEventListener('click', () => {
    const adatok = Adatok();
    fetch('/vasarlo/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adatok)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  });

  torolButton.addEventListener('click', () => {
    const adatok = getAdatok();
    fetch(`/vasarlo/${adatok.nev}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  });

  listazButton.addEventListener("click", async function () {
  
    const response = await fetch("http://localhost:3000/vasarlo");
    const jsonData = response.json();
    vasarloCards.innerHTML = "";
    for (let index = 0; index < jsonData.length; index++) {
      const element = jsonData[index];
      const vasarloCards = document.createElement("div");
      vasarloCards.innerHTML = `<div class="card">
      <p class="card-header">${element.nev}</p>
    </div>`;
    vasarloCards.appendChild(vasarloCards);
    }
  });