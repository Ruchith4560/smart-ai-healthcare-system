from pydantic import BaseModel
from typing import Optional
from pydantic import BaseModel

class AppointmentCreate(BaseModel):
    doctor_id: int
    problem: str

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str = "patient"
    specialization: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str
