from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import engine, get_db
from .models import Base, User
from .schemas import UserCreate, UserLogin
from .auth import hash_password, verify_password, create_access_token
from .auth import get_current_user

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "Smart AI Healthcare System Running 🚀"}

@app.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash password
    hashed_pw = hash_password(user.password)

    # Create new user
    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_pw,
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}

@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    access_token = create_access_token(
        data={"user_id": db_user.id, "role": db_user.role}
    )

    return {"access_token": access_token, "token_type": "bearer"}
@app.get("/profile")
def get_profile(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role
    }
from .auth import require_role

@app.get("/doctor/dashboard")
def doctor_dashboard(user: User = Depends(require_role("doctor"))):
    return {"message": f"Welcome Doctor {user.name}"}


@app.get("/patient/dashboard")
def patient_dashboard(user: User = Depends(require_role("patient"))):
    return {"message": f"Welcome Patient {user.name}"}