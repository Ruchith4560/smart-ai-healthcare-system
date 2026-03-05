from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    password = Column(String, nullable=False)
    role = Column(String, default="patient")
    specialization = Column(String, nullable=True)

    symptom_histories = relationship("SymptomHistory", back_populates="patient")

    appointments = relationship(
        "Appointment",
        back_populates="patient",
        foreign_keys="[Appointment.patient_id]",
    )

    doctor_appointments = relationship(
        "Appointment",
        back_populates="doctor",
        foreign_keys="[Appointment.doctor_id]",
    )

    availabilities = relationship("DoctorAvailability", back_populates="doctor")

    chats = relationship("ChatHistory", back_populates="patient")

    def __repr__(self):
        return f"<User(id={self.id}, email={self.email}, role={self.role})>"


class SymptomHistory(Base):
    __tablename__ = "symptom_history"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("users.id"))
    symptoms = Column(Text)
    predicted_specialization = Column(String)
    diagnosis = Column(Text, nullable=True)
    prescription = Column(Text, nullable=True)

    patient = relationship("User", back_populates="symptom_histories")

    def __repr__(self):
        return f"<SymptomHistory(id={self.id}, patient_id={self.patient_id})>"


class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("users.id"))
    doctor_id = Column(Integer, ForeignKey("users.id"))
    appointment_time = Column(DateTime, nullable=False)
    status = Column(String, default="booked")
    doctor_notes = Column(Text, nullable=True)

    patient = relationship(
        "User",
        foreign_keys=[patient_id],
        back_populates="appointments",
    )

    doctor = relationship(
        "User",
        foreign_keys=[doctor_id],
        back_populates="doctor_appointments",
    )

    def __repr__(self):
        return f"<Appointment(id={self.id}, patient={self.patient_id}, doctor={self.doctor_id})>"


class DoctorAvailability(Base):
    __tablename__ = "doctor_availability"

    id = Column(Integer, primary_key=True, index=True)
    doctor_id = Column(Integer, ForeignKey("users.id"))
    available_time = Column(DateTime, nullable=False)
    is_booked = Column(Boolean, default=False)

    doctor = relationship("User", back_populates="availabilities")

    def __repr__(self):
        return f"<DoctorAvailability(id={self.id}, doctor_id={self.doctor_id}, booked={self.is_booked})>"


class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("users.id"))
    message = Column(Text)
    bot_reply = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    patient = relationship(
        "User",
        foreign_keys=[patient_id],
        back_populates="chats",
    )

    def __repr__(self):
        return f"<ChatHistory(id={self.id}, patient_id={self.patient_id})>"