const studenti = [
  { ime: "Marko", prezime: "Petrović", godina: 3, ocjene: [9, 8, 7, 10, 9] },
  { ime: "Ana", prezime: "Jovanović", godina: 1, ocjene: [7, 6, 8, 6, 7] },
  { ime: "Luka", prezime: "Simić", godina: 2, ocjene: [10, 9, 10, 8, 9] },
  { ime: "Maja", prezime: "Nikolić", godina: 4, ocjene: [6, 5, 7, 6, 6] },
  { ime: "Ivana", prezime: "Stanković", godina: 1, ocjene: [9, 10, 9, 8, 9] },
];

function calcAvgGrade() {
  for (let i = 0; i < studenti.length; i++) {
    let sGrade = 0;
    for (let j = 0; j < studenti[i].ocjene.length; j++) {
      sGrade = sGrade + studenti[i].ocjene[j];
    }

    console.log("Ime: " + studenti[i].ime + " prosjek: " + sGrade);
  }
}

function getAboveAverageStudents() {
  let avgGrade = calcAvgGrade();
  for (let i = 0; i < studenti.length; i++) {
    let sGrade = 0;
    for (let j = 0; j < studenti[i].ocjene.length; j++) {
      sGrade = sGrade + studenti[i].ocjene[j];
    }

    if (sGrade >= 8.5) {
      console.log(studenti[i]);
    }
  }
}

function getBestStudent() {
  let bestStudent;
  let bestGrade = 0;

  for (let i = 0; i < studenti.length; i++) {
    let sGrade = 0;
    for (let j = 0; j < studenti[i].ocjene.length; j++) {
      sGrade = sGrade + studenti[i].ocjene[j];
    }

    if (sGrade > bestGrade) {
      bestStudent = studenti[i];
    }
  }

  console.log(bestStudent);
}

function avg(grades) {
  let averageGrade = 0;
  for (let i = 0; i < grades.length; i++) {
    averageGrade += grades[i];
  }

  return averageGrade / grades.length;
}

function sortStudents() {
  let sortedStudents = [];
  for (let i = 0; i < studenti.length; i++) {
    sortedStudents[i] = studenti[i];
  }

  for (let i = 0; i < sortedStudents.length - 1; i++) {
    for (let j = 0; j < sortedStudents.length - 1; j++) {
      if (avg(sortedStudents[j].ocjene) < avg(sortedStudents[j + 1].ocjene)) {
        let temp = sortedStudents[j];
        sortedStudents[j] = sortedStudents[j + 1];
        sortedStudents[j + 1] = temp;
      }
    }
  }

  console.log(sortedStudents);
}

function addAvgKey() {
  for (let i = 0; i < studenti.length; i++) {
    let avgGrade = avg(studenti[i].ocjene);
    studenti[i].average = avgGrade;
  }

  console.log(studenti);
}

addAvgKey();
