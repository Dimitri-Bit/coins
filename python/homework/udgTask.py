import requests
import csv

from bs4 import BeautifulSoup

BASE_URL = "https://www.udg.edu.me";

def get_faculties():
    response = requests.get(BASE_URL + "/en/faculties/");
    if (response.status_code == 200):
        return response.content;

    return None;

def parse_faculty_links(content):
    soup = BeautifulSoup(content, "html.parser");
    faculty_divs = soup.find_all("div", class_="faculty-item");

    links = [];
    for faculty_div in faculty_divs:
        faculty_link = faculty_div.find("a").get("href");
        links.append(BASE_URL + faculty_link);

    return links;

def get_faculty_website(url):
    response = requests.get(url);
    if (response.status_code == 200):
        return response.content;

    return None;

def parse_faculty_link(content):
    soup = BeautifulSoup(content, "html.parser");
    faculty_link = soup.find("a", class_="faculty-link").get("href");
    return faculty_link;

def get_professors(url):
    response = requests.get(url);
    if (response.status_code == 200):
        return response.content;

    return None;

def parse_faculty_professors(content):
    soup = BeautifulSoup(content, "html.parser");
    teacher_banner = soup.find_all("div", class_="teacher-banner");

    professor_names = [];

    for banner in teacher_banner:
        teacher_name = banner.find("a", class_="teacher-name").text.strip();
        professor_names.append(teacher_name);

    return professor_names;

faculty_content = get_faculties();
faculty_links = parse_faculty_links(faculty_content);
faculty_links.pop();

faculty_titles = [];

for link in faculty_links:
    faculty_name = link.split("/")[-1];
    dr = 0;
    mr = 0;
    prof = 0;
    doc = 0;
    profDr = 0;
    docDr = 0;
    docMr = 0;
    noTitle = 0;

    faculty = get_faculty_website(link);
    faculty_link = parse_faculty_link(faculty);

    professors = get_professors(faculty_link + "/predavaci");

    if (professors is None):
        pass;

    professor_names = parse_faculty_professors(professors);

    for professor in professor_names:
        print(professor);
        if (professor.startswith("Prof. dr")):
            profDr += 1;
        elif (professor.startswith("Dr")):
            dr += 1;
        elif (professor.startswith("mr")):
            mr += 1;
        elif (professor.startswith("Doc. dr")):
            docDr += 1;
        elif (professor.startswith("Doc. mr")):
            docMr += 1;
        else:
            noTitle += 1;

    faculty_titles.append({"Faculty": faculty_name, "Dr": dr, "Mr": mr, "Prof": prof, "Doc": doc, "Prof. Dr": profDr, "Doc. Dr": docDr, "Doc. Mr": docMr, "No Title": noTitle})

print(faculty_titles);

with open("ccc.csv", "w", newline="") as csv_file:
    writer = csv.DictWriter(csv_file, fieldnames=["Faculty", "Dr", "Mr", "Prof", "Doc", "Prof. Dr", "Doc. Dr", "Doc. Mr", "No Title"]);
    writer.writeheader();
    writer.writerows(faculty_titles);