import { db } from "../scripts/firebase.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { subtakenPerCategorie, getCategorie } from "./subtaken.js";
import {
  getMondayOfISOWeek,
  formatDate,
  getAfvalDataInWeek,
  capitalize,
  isTodayInRange,
  afvalSchema
} from "./helpers.js";

const lijst = document.getElementById("taken-lijst");
const spinner = document.getElementById("loading-spinner");

/* =========================
   SUBTAKEN
========================= */
function createSubtakenList(subtaken, taakSummary) {
  const ul = document.createElement("ul");
  ul.className = "subtaken-lijst";

  const checkboxes = [];

  subtaken.forEach(sub => {
    const li = document.createElement("li");
    li.className = "subtaak-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkboxes.push(checkbox);

    checkbox.addEventListener("change", () => {
      const allesKlaar = checkboxes.every(cb => cb.checked);
      taakSummary.classList.toggle("taak-klaar", allesKlaar);
      // ❌ GEEN details.open, we don’t auto-close
    });

    li.append(checkbox, document.createTextNode(sub));
    ul.appendChild(li);
  });

  return ul;
}

/* =========================
   HOOFDLOGICA
========================= */
async function laadTaken() {
  spinner.style.display = "block";
  lijst.innerHTML = "";

  try {
    const q = query(collection(db, "taken"), orderBy("weekNumber"), orderBy("createdAt"));
    const snapshot = await getDocs(q);
    spinner.style.display = "none";

    const takenPerWeek = {};
    snapshot.forEach(doc => {
      const taak = doc.data();
      (takenPerWeek[taak.weekNumber] ??= []).push(taak);
    });

    const today = new Date();

    Object.keys(takenPerWeek).sort((a, b) => a - b).forEach(weekStr => {
      const week = Number(weekStr);
      const start = getMondayOfISOWeek(week);
      if (!start) return;

      const end = new Date(start);
      end.setDate(start.getDate() + 6);

      const isHuidigeWeek = isTodayInRange(start, end);

      /* -------- WEEK -------- */
      const weekDetails = document.createElement("details");
      weekDetails.open = isHuidigeWeek;

      const weekSummary = document.createElement("summary");
      weekSummary.textContent = `Week ${week} (${formatDate(start)} – ${formatDate(end)})`;
      weekDetails.appendChild(weekSummary);

      const ul = document.createElement("ul");

      /* -------- AFVAL (met datum) -------- */
      const afvalInWeek = getAfvalDataInWeek(week, afvalSchema);

      Object.entries(afvalInWeek).forEach(([soort, date]) => {
        const li = document.createElement("li");
        li.className = `taak-item afval-item ${soort}`;

        const datum = capitalize(
          date.toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" })
        );

        li.textContent = `${soort.toUpperCase()} – ${datum}`;
        ul.appendChild(li);
      });

      /* -------- TAKEN -------- */
      takenPerWeek[week].forEach(taak => {
        const li = document.createElement("li");
        li.className = "taak-item";
      
        const taakDetails = document.createElement("details");
        taakDetails.className = "taak-details";
      
        const taskId = `${taak.weekNumber}-${taak.taakNaam}`;
        const manuallyClosed = localStorage.getItem(taskId) === "closed";
      
        // ✅ Only open this specific task if it's the current week AND not manually closed
        const isHuidigeWeek = today >= start && today <= end;
        taakDetails.open = isHuidigeWeek && !manuallyClosed;
      
        const summary = document.createElement("summary");
        summary.className = "taak-summary";
        summary.textContent = `${taak.taakNaam} - ${taak.assignedTo}`;
      
        const categorie = getCategorie(taak.taakNaam);
        const subtaken = subtakenPerCategorie[categorie] ?? [];
      
        taakDetails.append(summary, createSubtakenList(subtaken, summary));
      
        li.appendChild(taakDetails);
        ul.appendChild(li);
      
        // Save open/closed state
        taakDetails.addEventListener("toggle", () => {
          localStorage.setItem(taskId, taakDetails.open ? "open" : "closed");
        });
      });
      

      weekDetails.appendChild(ul);
      lijst.appendChild(weekDetails);
    });

  } catch (err) {
    console.error(err);
    lijst.innerHTML = "<p>Fout bij laden van taken.</p>";
    spinner.style.display = "none";
  }
}

laadTaken();
