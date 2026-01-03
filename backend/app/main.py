from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.statcan import router as statcan_router

app = FastAPI(title="StatCan API")

app.add_middleware(
    CORSMiddleware,
    # Allow the frontend dev server origins (add more origins as needed)
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173", "https://where-to-live-canada.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(statcan_router, prefix="/api/statcan")