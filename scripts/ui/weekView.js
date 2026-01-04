import {
    getMondayOfISOWeek,
    formatDate,
    getAfvalDataInWeek,
    capitalize,
    afvalSchema
  } from "../helpers.js";
  
  export function createWeek(week, taken, today, createTask) {
    const start = getMondayOfISOWeek(week);
    if (!start) return null;
  
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
  
    const isHuidigeWeek = today >= start && today <= end;
  
    const details = document.createElement("details");
    details.open = isHuidigeWeek;
  
    const summary = document.createElement("summary");
    summary.textContent = `Week ${week} (${formatDate(start)} – ${formatDate(end)})`;
    details.appendChild(summary);
  
    const ul = document.createElement("ul");
  
    const afval = getAfvalDataInWeek(week, afvalSchema);
    Object.entries(afval).forEach(([soort, date]) => {
      const li = document.createElement("li");
      li.className = `taak-item afval-item ${soort}`;
  
      const datum = capitalize(
        date.toLocaleDateString("nl-NL", {
          weekday: "long",
          day: "numeric",
          month: "long"
        })
      );
  
      li.textContent = `${soort.toUpperCase()} – ${datum}`;
      ul.appendChild(li);
    });
  
    taken.forEach(taak => {
      ul.appendChild(createTask(taak, isHuidigeWeek));
    });
  
    details.appendChild(ul);
    return details;
  }
  