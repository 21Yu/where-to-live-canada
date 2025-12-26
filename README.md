# Where To Live Canada

## Overview
A **full-stack dashboard** that visualizes Canadian economic and demographic data, including population, housing prices, labor statistics, and consumer price index (CPI), using data from [Statistics Canada (STATCAN)](https://www.statcan.gc.ca/en/start) 

Built with React on the frontend, FastAPI on the backend, and connects to STATCAN’s API for live data.

---

**Try it Out**

The app is deployed online! 

[Try Where To Live Canada]()  


## Tech Stack

### Frontend:
- React with functional components and hooks

- Tailwind CSS for responsive UI

- Chart components for data visualization (HousingChart, LaborChart, etc.)

### Backend:
- Python FastAPI

- Requests library to fetch data from STATCAN APIs

- REST API endpoints for population, CPI, labor, and housing data  

### Data Sources:
- [STATCAN WDS API](https://www.statcan.gc.ca/en/microdata/api)
---

## Features

- Dynamic Province Selection: Users can select a province to view corresponding data.

- Multiple Charts:
    - Housing Price Index
    - Labor Statistics (Employment & Unemployment rates)
    - Consumer Price Index
    - Population over time
- Live Data Fetching: Backend fetches the latest data from STATCAN APIs.
- Responsive Layout: Grid layout that adapts for desktop and mobile.
