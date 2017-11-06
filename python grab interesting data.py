import csv

#returns first non empty string in a comma sperated list
def extractSingle(stri):
    return stri[0][1:]

#extracts from neighbrohood csv and creates array
def extractNeighborhoods():
    with open('neighbourhoods.csv',newline='') as csvfile:
        nfreader = csv.reader(csvfile,delimiter = '\n')
        array = []
        index = 0
        for row in nfreader:
            if index > 0:
                array.append(extractSingle(row))
            index += 1
        return array

def extractDex(stri, dex):
    splitarr = stri.split(",")
    curdex = 0
    for token in splitarr:
        if curdex == dex:
            return token
        curdex+=1
    return "ERROR"

def matchlongitude():
    with open('listings.csv',newline='\n') as csvfile:
        nfreader = csv.reader(csvfile,delimiter = ',')
        array = []
        accum = 0.0;
        index = 0;
        for row in nfreader:
            if index > 0:
                accum+= float(row[48])
            index += 1
        return accum/(float(index))

def matchlatitude():
    with open('listings.csv',newline='\n') as csvfile:
        nfreader = csv.reader(csvfile,delimiter = ',')
        array = []
        accum = 0.0;
        index = 0;
        for row in nfreader:
            if index > 0:
                accum+= float(row[49])
            index += 1
        return accum/(float(index))

def createpopDict():
    nlist = extractNeighborhoods()
    ndict = dict()
    for neigh in nlist:
        ndict.update([(neigh,(0.0,0))])
    return ndict

def updateDict(ndict):
    with open('listings.csv',newline='\n') as csvfile:
        nfreader = csv.reader(csvfile,delimiter = ',')
        index = 0;
        for row in nfreader:
            if index > 0:
                r = 0
                try:
                    r = float(row[79])
                    ndict[row[39]] = (ndict[row[39]][0]+r,ndict[row[39]][1]+1)
                except ValueError:
                    r = 0
            index += 1
        dict2 = dict()
        for key,value in ndict.items():
            val1,val2 = value
            dict2[key]= val1/val2
        return dict2

def createPopCSV(ndict):
    with open('popular.csv','w') as csvfile:
        pfwriter = csv.writer(csvfile,delimiter = ',')
        for key,value in ndict.items():
            pfwriter.writerow([key,str(value)])

if __name__=="__main__":
    print(matchlongitude())
    print(matchlatitude())
    print(updateDict(createpopDict()))
    createPopCSV(updateDict(createpopDict()))
