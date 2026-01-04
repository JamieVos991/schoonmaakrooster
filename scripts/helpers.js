export const afvalSchema = {
    gft: ["2026-01-12","2026-01-26","2026-02-09","2026-02-23","2026-03-09","2026-03-23","2026-04-11","2026-04-20","2026-05-18","2026-06-01","2026-06-15","2026-06-29","2026-07-13","2026-07-27","2026-08-10","2026-08-24","2026-09-07","2026-09-21","2026-10-05","2026-10-19","2026-11-02","2026-11-16","2026-11-30","2026-12-14","2026-12-28"],
    plastic: ["2026-01-03","2026-01-22","2026-02-12","2026-03-05","2026-03-26","2026-04-16","2026-05-07","2026-05-28","2026-06-18","2026-07-09","2026-07-30","2026-08-20","2026-09-10","2026-10-01","2026-10-22","2026-11-12","2026-12-03","2026-12-24"],
    papier: ["2026-01-09","2026-02-06","2026-03-06","2026-04-03","2026-05-01","2026-05-29","2026-06-26","2026-07-24","2026-08-21","2026-09-18","2026-10-16","2026-11-13","2026-12-11"]
  };

  export function getAfvalDataInWeek(week, afvalSchema) {
    const start = getMondayOfISOWeek(week);
    if (!start) return {};
  
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
  
    const result = {};
  
    for (const soort in afvalSchema) {
      const match = afvalSchema[soort].find(d => {
        const date = new Date(d);
        return date >= start && date <= end;
      });
  
      if (match) result[soort] = new Date(match);
    }
  
    return result;
  }

  export function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  
  
  export function getMondayOfISOWeek(week, year = new Date().getFullYear()) {
    if (!week || isNaN(week)) return null;
    const simple = new Date(year, 0, 1 + (week - 1) * 7);
    const dow = simple.getDay();
    const start = new Date(simple);
    if (dow <= 4) start.setDate(simple.getDate() - simple.getDay() + 1);
    else start.setDate(simple.getDate() + 8 - simple.getDay());
    return start;
  }
  
  export function formatDate(date) {
    return date.toLocaleDateString("nl-NL", { day: "numeric", month: "long" });
  }

  export function checkAfvalInWeek(week) {
    const start = getMondayOfISOWeek(week);
    if (!start) return {};
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
  
    const result = {};
    for (const soort in afvalSchema) {
      result[soort] = afvalSchema[soort].some(d => {
        const date = new Date(d);
        return date >= start && date <= end;
      });
    }
    return result;
  }
  
  export function isTodayInRange(start, end) {
    const today = new Date();
    today.setHours(0,0,0,0);
    start.setHours(0,0,0,0);
    end.setHours(0,0,0,0);
    return today >= start && today <= end;
  }
  