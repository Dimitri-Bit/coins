class Student:
    def __init__(self, name, surname, year):
        self.__name = name
        self.__surname = surname
        self.__year = year
        self.__subjects = []

    def __str__(self):
        return f"{self.__name} {self.__surname} Year: {self.__year} Subjects: {self.__subjects}";

    def getName(self):
        return self.__name;

    def setName(self, name):
        self.__name = name;

    def getSurname(self):
        return self.__surname;

    def setSurname(self, surname):
        self.__surname = surname;

    def getYear(self):
        return self.__year;

    def setYear(self, year):
        if (year > 0 and year < 8):
            self.__year = year;

    def getSubjects(self):
        return self.__subjects

    def addSubject(self, subject):
        self.__subjects.append(subject);

    def removeSubject(self, subjectName):
        for i in self.__subjects:
            if i.get("naziv") == subjectName:
                self.__subjects.remove(i);

    def computeAverage(self):
        grades = {"A": 10, "B": 9, "C": 8, "D": 7, "E": 6, "F": 0};
        sum = 0;

        for i in self.__subjects:
            grade = i.get("ocjena")
            print(grades.get(grade))

        print(sum)

student1 = Student("Bob", "Smith", 3);
# student1.setName("Alex")
student1.addSubject({"naziv": "OOP1", "ocjena:": "A", "brojKredita": 6});
# print(student1.getName())
# print(student1.getSubjects())
# student1.removeSubject("OOP1");
# print(student1.getSubjects())
student1.computeAverage();