from fastapi import APIRouter, Query, HTTPException
from app.services.statcan import get_toronto_population

router = APIRouter()

@router.get("/population")
def population(
    years: str = Query(
        "10",
        description="Number of years: 5, 10, or 'all'"
    )
):
    if years not in ["5", "10", "all"]:
        raise HTTPException(
            status_code=400,
            detail="years must be 5, 10, or all"
        )
    
    return get_toronto_population(years)