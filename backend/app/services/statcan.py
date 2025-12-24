import requests

STATCAN_URL = "https://www150.statcan.gc.ca/t1/wds/rest/getDataFromVectorsAndLatestNPeriods"

TORONTO_POPULATION_YEARLY_VECTOR = "41690973"

def fetch_toronto_population_yearly():
    payload = [{
        "vectorId": TORONTO_POPULATION_YEARLY_VECTOR,
        "latestN": 100
    }]

    headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
    }

    response = requests.post(STATCAN_URL, json=payload, headers=headers)
    response.raise_for_status()

    data = response.json()[0]["object"]["vectorDataPoint"]

    return data

def normalize_population_data(raw_data):
    normalized = {}

    for point in raw_data:
        
        year = int(point["refPer"].split("-")[0])
        population = int(float(point["value"]))

        normalized[year] = population
    
    return [{"year": y, "population": normalized[y]} for y in sorted(normalized)]

def get_toronto_population_yearly():
    raw_data = fetch_toronto_population_yearly()
    return normalize_population_data(raw_data)

def filter_by_years(data, years):
    if years == "all":
        return data
    
    years = int(years)
    return data[-years:]

def get_toronto_population(years="10"):
    data = get_toronto_population_yearly()
    return filter_by_years(data, years)