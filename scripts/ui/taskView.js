import { subtakenPerCategorie, getCategorie } from "../subtaken.js";

export function createTask(taak, isHuidigeWeek) {
  const li = document.createElement("li");
  li.className = "taak-item";

  const details = document.createElement("details");
  details.className = "taak-details";
  details.open = isHuidigeWeek;

  const summary = document.createElement("summary");
  summary.className = "taak-summary";
  summary.textContent = `${taak.taakNaam} - ${taak.assignedTo}`;

  const categorie = getCategorie(taak.taakNaam);
  const subtaken = subtakenPerCategorie[categorie] ?? [];

  details.append(summary, createSubtakenList(subtaken, summary));
  li.appendChild(details);

  return li;
}

function createSubtakenList(subtaken, taakSummary) {
  const ul = document.createElement("ul");
  ul.className = "subtaken-lijst";

  const checkboxes = [];

  subtaken.forEach(text => {
    const li = document.createElement("li");
    li.className = "subtaak-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkboxes.push(checkbox);

    checkbox.addEventListener("change", () => {
      const klaar = checkboxes.every(cb => cb.checked);
      taakSummary.classList.toggle("taak-klaar", klaar);
    });

    li.append(checkbox, document.createTextNode(text));
    ul.appendChild(li);
  });

  return ul;
}
