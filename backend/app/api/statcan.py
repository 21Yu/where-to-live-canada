from fastapi import APIRouter, Query, HTTPException
from app.services.statcan import fetch_cube_metadata, fetch_population, fetch_CPI, fetch_labour_force, fetch_housing_price

router = APIRouter()

@router.get("/table/{pid}")
def table(pid: int):
    return fetch_cube_metadata(pid)

@router.get("/population")
def population(latestN: int = Query(10, ge=1, le=100), memberId: int = Query(None, description="Geography memberId")):
    try:
        return fetch_population(latestN=latestN, memberId=memberId)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/CPI")
def CPI(latestN: int = Query(6, ge=1, le=100), memberId: int = Query(None, description="Geography memberId")):
    try:
        return fetch_CPI(latestN=latestN, memberId=memberId)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/labor")
def labor(latestN: int = Query(6, ge=1, le=100), memberId: int = Query(None, description="Geography memberId"), umn: int = Query(9, description="9 = employment rate, 7 = unemployment rate")):
    try:
        return fetch_labour_force(latestN=latestN, memberId=memberId, umn=umn)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/housing")
def housing(latestN: int = Query(6, ge=1, le=100), memberId: int = Query(None, description="Geography memberId")):
    try:
        return fetch_housing_price(latestN=latestN, memberId=memberId)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))