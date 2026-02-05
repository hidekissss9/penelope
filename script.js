const dataInicio = new Date("2026-02-04T00:00:00"); // MUDE se quiser

const fio = document.getElementById("fio");
const tempoEl = document.getElementById("tempo");
const fraseEl = document.getElementById("fraseRecomeco");

const ALTURA_MAX = 200;

const frases = [
  "Desfaço o que fiz hoje para poder esperar amanhã.",
  "Hoje desatei os fios. Amanhã, volto a tecer.",
  "A espera não acaba. Ela apenas recomeça.",
  "Enquanto você navega, eu permaneço.",
  "O amor também sabe recomeçar."
];

let ultimoDia = null;

function atualizar() {
  const agora = new Date();

  // contador geral
  const diff = agora - dataInicio;
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  tempoEl.innerText = `${dias} dias, ${horas}h ${minutos}m ${segundos}s`;

  // lógica do dia atual
  const inicioDoDia = new Date(
    agora.getFullYear(),
    agora.getMonth(),
    agora.getDate()
  );

  const fimDoDia = new Date(inicioDoDia);
  fimDoDia.setDate(fimDoDia.getDate() + 1);

  const progressoDia = (agora - inicioDoDia) / (fimDoDia - inicioDoDia);
  const alturaFio = progressoDia * ALTURA_MAX;

  fio.classList.remove("desfazendo");
  fio.style.height = `${alturaFio}px`;

  // detecta virada do dia
  if (ultimoDia !== inicioDoDia.getTime()) {
    if (ultimoDia !== null) {
      desfazerFio();
    }
    ultimoDia = inicioDoDia.getTime();
  }
}

function desfazerFio() {
  fio.classList.add("desfazendo");
  fio.style.height = "0px";

  const frase = frases[Math.floor(Math.random() * frases.length)];
  fraseEl.innerText = frase;

  fraseEl.classList.remove("mostrar");
  setTimeout(() => {
    fraseEl.classList.add("mostrar");
  }, 500);
}

setInterval(atualizar, 1000);
atualizar();
