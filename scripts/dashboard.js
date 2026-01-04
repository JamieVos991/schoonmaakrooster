import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

const form = document.getElementById("taak-form");
const bericht = document.getElementById("bericht");

const taakSelects = [
  document.getElementById("taak1"),
  document.getElementById("taak2"),
  document.getElementById("taak3"),
  document.getElementById("taak4")
];

const persoonSelects = [
  document.getElementById("persoon1"),
  document.getElementById("persoon2"),
  document.getElementById("persoon3"),
  document.getElementById("persoon4")
];

function updateOptions() {
  const selectedTaaks = taakSelects.map(select => select.value).filter(v => v);
  const selectedPersons = persoonSelects.map(select => select.value).filter(v => v);

  taakSelects.forEach(select => {
    for (const option of select.options) {
      if (option.value === "") continue; 
      option.disabled = selectedTaaks.includes(option.value) && select.value !== option.value;
    }
  });

  persoonSelects.forEach(select => {
    for (const option of select.options) {
      if (option.value === "") continue;
      option.disabled = selectedPersons.includes(option.value) && select.value !== option.value;
    }
  });
}

[...taakSelects, ...persoonSelects].forEach(select => {
  select.addEventListener("change", updateOptions);
});

updateOptions();

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const weekNumber = parseInt(document.getElementById("weekNumber").value);

  try {
    for (let i = 0; i < 4; i++) {
      const taakNaam = taakSelects[i].value;
      const assignedTo = persoonSelects[i].value;

      await addDoc(collection(db, "taken"), {
        weekNumber,
        taakNaam,
        assignedTo,
        createdAt: serverTimestamp()
      });
    }

    bericht.textContent = "Alle taken succesvol toegevoegd!";
    bericht.style.color = "green";
    form.reset();
    updateOptions(); 
  } catch (error) {
    console.error("Fout bij toevoegen van taken:", error);
    bericht.textContent = "Er is een fout opgetreden. Probeer opnieuw.";
    bericht.style.color = "red";
  }
});
