import csv
import requests

from bs4 import BeautifulSoup

BASE_URL = "https://www.realitica.com/nekretnine/"

def get_real_estate(path):
    response = requests.get(BASE_URL + path);
    if (response.status_code == 200):
        return response.content;
    return None;

def parse_real_estate_links(content):
    soup = BeautifulSoup(content, "html.parser");
    real_estate_divs = soup.find_all("div", style="padding:15px 10px;clear:both;white-space: normal; overflow: hidden; text-overflow: ellipsis; border: 1px solid #ccc; ")
    links = [];

    for div in real_estate_divs:
        link = div.find("a").get("href");
        links.append(link);

response = get_real_estate("https://www.realitica.com/hr/listing/3193162");
print(response);
# parse_real_estate(response);