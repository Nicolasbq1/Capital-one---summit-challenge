import csv

#returns first non empty string in a comma sperated list
def extractSingle(stri):
    splitarr = stri.split(",")
    for token in splitarr:
        if len(token) > 1:
            return token
    return "ERROR: ALL EMPTY"

#extracts from neighbrohood csv and creates array
def extractNeighborhoods(filename):
    with open('neighbourhoods.csv',newline='') as csvfile
        nfreader = csv.reader(csvfile,delimiter = '')
        array = []
        index = 0;
        for row in nfreader:
            if index > 0:
                array.append(extractSingle(row))
        return array