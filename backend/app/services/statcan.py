import requests

STATCAN_URL_CUBE = "https://www150.statcan.gc.ca/t1/wds/rest/getCubeMetadata"
STATCAN_URL_SERIES = "https://www150.statcan.gc.ca/t1/wds/rest/getDataFromCubePidCoordAndLatestNPeriods"

def fetch_cube_metadata(pid):
    payload = [{
        "productId":pid
    }]

    response = requests.post(STATCAN_URL_CUBE, json=payload)
    response.raise_for_status()

    return response.json()

def fetch_population(latestN=10, memberId: int = None):

    if memberId is not None:
        # put memberId in the first segment as requested
        parts = [str(memberId), "1", "1", "0", "0", "0", "0", "0", "0", "0"]
        coord = ".".join(parts)
    else:
        coord = "1.1.1.0.0.0.0.0.0.0"

    payload = [{
        "productId": 17100005,
        "coordinate": coord,
        "latestN": latestN
    }]

    response = requests.post(STATCAN_URL_SERIES, json=payload)
    response.raise_for_status()

    raw = response.json()

    if not raw or "object" not in raw[0] or raw[0]["object"] is None:
        return []
    
    vector = raw[0]["object"]["vectorDataPoint"]

    if not vector:
        return []
    
    return [
        {"year": int(dp["refPerRaw"].split("-")[0]), "population": int(dp["value"]) }
        for dp in vector
    ]

def fetch_CPI(latestN=6, memberId: int = None):

    if memberId is not None:
        parts = [str(memberId), "2"] + ["0"] * 8
        coord = ".".join(parts)
    else:
        coord = "2.2.0.0.0.0.0.0.0.0"

    payload = [{
        "productId": 18100004,
        "coordinate": coord,
        "latestN": latestN
    }]

    response = requests.post(STATCAN_URL_SERIES, json=payload)
    response.raise_for_status()

    raw = response.json()

    if not raw or "object" not in raw[0] or raw[0]["object"] is None:
        return []
    
    vector = raw[0]["object"]["vectorDataPoint"]

    if not vector:
        return []
    
    return [
        {"date": dp["refPerRaw"], "Consumer Price Index": dp["value"]}
        for dp in vector
    ]

def fetch_labour_force(latestN=6, memberId: int = None, umn=9):

    if memberId is not None:
        # put memberId in the first segment as requested
        parts = [str(memberId), str(umn), "1", "1", "1", "1", "0", "0", "0", "0"]
        coord = ".".join(parts)
    else:
        coord = "1.9.1.1.1.1.0.0.0.0"

    payload = [{
        "productId": 14100287,
        "coordinate": coord,
        "latestN": latestN
    }]

    response = requests.post(STATCAN_URL_SERIES, json=payload)
    response.raise_for_status()

    raw = response.json()

    if not raw or "object" not in raw[0] or raw[0]["object"] is None:
        return []
    
    vector = raw[0]["object"]["vectorDataPoint"]

    if not vector:
        return []
    
    if umn == 9:
        return [
            {"date": dp["refPerRaw"], "employment rate": dp["value"]}
            for dp in vector
        ]
    else:
        return [
            {"date": dp["refPerRaw"], "unemployment rate": dp["value"]}
            for dp in vector
        ] 
    
def fetch_housing_price(latestN=6, memberId: int = None):

    if memberId is not None:
        parts = [str(memberId), "1", "0", "0", "0", "0", "0", "0", "0", "0"]
        coord = ".".join(parts)
    else:
        coord = "1.1.0.0.0.0.0.0.0.0"

    payload = [{
        "productId": 18100205,
        "coordinate": coord,
        "latestN": latestN
    }]

    response = requests.post(STATCAN_URL_SERIES, json=payload)
    response.raise_for_status()

    raw = response.json()

    if not raw or "object" not in raw[0] or raw[0]["object"] is None:
        return []
    
    vector = raw[0]["object"]["vectorDataPoint"]

    if not vector:
        return []
    
    return [
        {"date": dp["refPerRaw"], "housing price index": dp["value"]}
        for dp in vector
    ]