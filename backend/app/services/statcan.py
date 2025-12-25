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
    vector = raw[0]["object"]["vectorDataPoint"]
    return [
        {"year": int(dp["refPerRaw"].split("-")[0]), "population": int(dp["value"]) }
        for dp in vector
    ]


def fetch_CPI(latestN=6, memberId: int = None):
    """Fetch series data from product 18100004.

    The coordinate format places the `memberId` in the first segment and
    the second segment is always `2`. Remaining segments are `0`.
    Example coord: "14.2.0.0.0.0.0.0.0.0" for Ontario (memberId=14).
    """

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
    vector = raw[0]["object"]["vectorDataPoint"]
    return [
        {"date": dp["refPerRaw"], "Consumer Price Index": dp["value"]}
        for dp in vector
    ]