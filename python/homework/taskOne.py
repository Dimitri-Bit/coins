import csv

csv_file_name = "Chocolate Sales.csv"

fields = []
rows = []

numerical_columns = []
string_columns =[]

with open(csv_file_name, "r") as csv_file:
    csvreader = csv.reader(csv_file);
    fields = next(csvreader);

    for row in csvreader:
        rows.append(row)

    print(f"Loaded \"{csvreader.line_num}\" rows from {csv_file_name}");

def load_columns():
    row = rows[0];
    for column in range(len(row)):
        if (row[column].isnumeric()):
            numerical_columns.append({"name": fields[column], "index": column});
        else:
            string_columns.append({"name": fields[column], "index": column});

def inputNumericalField():
    for i in range(len(numerical_columns)):
        print(f"{i+1}. {numerical_columns[i]["name"]}")
    print();

    field_column = int(input("Column Num:"))
    if (field_column > len(numerical_columns)):
        print("Invalid index")
        return;

    field_column -= 1;
    return numerical_columns[field_column]["index"];

def inputHighLow():
    print("Which field would you like to get the high/low values from?");
    field_index = inputNumericalField();
    print(getHighLow(field_index));

def inputAverage():
    print("Which field would you like to get the average value from?");
    field_index = inputNumericalField();
    print(getAverage(field_index));

def inputDifference():
    print("Which field would you like to get the average value from?");
    field_index = inputNumericalField();

    average = getAverage(field_index)["average"];
    lowest = getHighLow(field_index)["lowest"];
    difference = (abs(lowest - average) / average) * 100.0;

    print(f"Difference {difference}")

def inputNormalization():
    print("Which field would you like to normalize?");
    field_index = inputNumericalField();

    normalize(field_index);

def normalize(field_index):
    highLow = getHighLow(field_index);
    lowest = highLow["lowest"];
    highest = highLow["highest"];
    normalized_rows = [];

    for row in rows:
        column = int(row[field_index]);
        normalized_column = (column - lowest) / (highest - lowest);
        normalized_row = row;
        normalized_row[field_index] = normalized_column;
        normalized_rows.append(normalized_row);

    data = [];
    for i in range(len(normalized_rows)):
        data_row = {};
        for j in range(len(fields)):
            data_row.update({fields[j]: normalized_rows[i][j]});
        data.append(data_row);

    with open("normalized_" + csv_file_name + ".csv", "w", newline="\n") as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=fields)
        writer.writeheader();
        writer.writerows(data);

def getHighLow(field_index):
    lowest = float("inf");
    highest = float("-inf");

    for row in rows:
        column = int(row[field_index]);
        if column < lowest:
            lowest = column;

        if column > highest:
            highest = column;

    return {"lowest": lowest, "highest": highest};

def getAverage(field_index):
    total = 0;

    for row in rows:
        column = int(row[field_index]);
        total += column;

    return {"average": total / len(rows)};

load_columns();
inputNormalization();