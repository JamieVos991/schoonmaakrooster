export const subtakenPerCategorie = {
  algemeen: ["Stofzuigen","Dweilen","Prullenbak legen","Afval bakken aan de weg zetten"],
  keuken: ["Keukenblad afnemen","Kast deurtjes afnemen","Dweilen","Vloer dweilen"],
  toilet: ["Tegels afnemen","Raamkozijn afnemen","WC schoonmaken","Bleek in de WC", "Dweilen", "Deur afnemen"],
  badkamer: ["Wasbak", "Douche (Glas en tegels) afnemen","Douchekop kalkreinigen","Rooster boven de douche schoonmaken","Schimmel weghalen", "Douche matje en gordijn in de was", "Dweilen", "Deur afnemen"],
};

export function getCategorie(taakNaam) {
  const naam = taakNaam.toLowerCase();

  if (["keuken", "aanrecht", "kookplaat", "vaatwasser"].some(k => naam.includes(k))) 
    return "keuken";

  if (["badkamer", "douche", "wastafel", "wasbak", "handdoek", "rooster", "schimmel"].some(k => naam.includes(k))) 
    return "badkamer";

  if (["toilet", "wc", "fonteintje", "bleek"].some(k => naam.includes(k))) 
    return "toilet";

  return "algemeen";
}

