from fastapi import FastAPI ,status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests

app = FastAPI()

origins = ['http://localhost:5173']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

url = "http://api.weatherapi.com/v1/current.json"

class Weather(BaseModel):
    q:str

@app.post("/weather",status_code=status.HTTP_200_OK)
async def weather(user:Weather):
    params = {
        "key":"Your API Key",
        "q":user.q,
        "aqi":"yes"
    }
    try:
        response = requests.post(url,params=params)
        data = response.json()
        return {"name":data["location"]["name"],"country":data["location"]["country"],"localtime":data["location"]["localtime"],"last_updated":data["current"]["last_updated"],"temp_c":data["current"]["temp_c"],"temp_f":data["current"]["temp_f"],"is_day":data["current"]["is_day"],"condition":data["current"]["condition"]["text"],"wind":data["current"]["wind_kph"],"humidity":data["current"]["humidity"],"cloud":data["current"]["cloud"],"co":data["current"]["air_quality"]["co"],"no2":data["current"]["air_quality"]["no2"],"o3":data["current"]["air_quality"]["o3"],"so2":data["current"]["air_quality"]["so2"],"pm2_5":data["current"]["air_quality"]["pm2_5"],"pm10":data["current"]["air_quality"]["pm10"]}

    except requests.RequestException as e:
        raise HTTPException(status_code=500,detail="Error in getting data")