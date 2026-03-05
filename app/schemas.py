from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str = "patient"
    specialization: Optional[str] = None


class UserLogin(BaseModel):
    email: str
    password: str


class SymptomRequest(BaseModel):
    symptoms: List[str]


class AppointmentCreate(BaseModel):
    doctor_id: int
    appointment_time: datetime


class AppointmentBook(BaseModel):
    doctor_id: int
    appointment_time: datetime


class AvailabilityCreate(BaseModel):
    available_time: datetime


class DiagnosisUpdate(BaseModel):
    diagnosis: str
    notes: str
    prescription: Optional[str] = None


class AppointmentComplete(BaseModel):
    notes: Optional[str] = None


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str