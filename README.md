🏥 Smart AI Healthcare System

A full-stack AI-powered healthcare management platform that enables patients to book appointments, interact with an AI medical assistant, and connect with specialized doctors through an intelligent recommendation system.

Built using FastAPI, React (Vite), TailwindCSS, and SQLite, the platform demonstrates modern SaaS architecture with role-based dashboards, AI integration, and responsive UI.

🚀 Features
👤 Authentication & Roles

Secure JWT-based authentication

Role-based access control

Separate dashboards for patients and doctors

🤖 AI Medical Assistant

AI chatbot for symptom interaction

Intelligent doctor specialization recommendation

Chat history tracking for patients

🩺 Appointment Management

Patients can book appointments with doctors

Doctors can confirm or manage appointment requests

Patients can cancel appointments

View complete appointment history

👨‍⚕️ Doctor Tools

Set availability time slots

Manage patient appointment requests

Access patient symptom history

Add diagnosis and prescription

💻 Modern Frontend

Built with React + Vite

Styled with TailwindCSS

Responsive layout with sidebar navigation

Dark mode support

Professional dashboard 

🏗️ Tech Stack

| Layer           | Technology                          |
| --------------- | ----------------------------------- |
| Backend         | FastAPI, SQLAlchemy, SQLite         |
| Frontend        | React (Vite), TailwindCSS           |
| Authentication  | JWT                                 |
| AI Logic        | Custom Python AI Engine             |
| Deployment      | Render (Backend), Vercel (Frontend) |
| Version Control | Git & GitHub                        |



📂 Project Structure
smart-ai-healthcare-system
│
├── app/                 # FastAPI backend
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── auth.py
│   ├── ai_engine.py
│   └── database.py
│
├── frontend/            # React frontend
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
└── README.md



⚙️ Local Setup
git clone https://github.com/Ruchith4560/smart-ai-healthcare-system.git
cd smart-ai-healthcare-system

Backend Setup
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

Backend will run at:

http://localhost:8000

API Documentation:

http://localhost:8000/docs

Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173


🌐 Deployment
Backend

Deploy using Render

Start Command:

uvicorn app.main:app --host 0.0.0.0 --port 10000



📸 Key Modules

Patient Dashboard

Doctor Dashboard

Appointment Booking

AI Chat Assistant

Symptom-Based Doctor Recommendation

Profile Management


🎯 Future Enhancements

AI model integration (Gemini / OpenAI)

Real-time chat system

Video consultation support

Payment integration

Admin analytics dashboard

Notification system 


👨‍💻 Author

Ruchith Macha

GitHub
https://github.com/Ruchith4560





⭐ If You Like This Project

Give the repository a star to support the project and future improvements.
