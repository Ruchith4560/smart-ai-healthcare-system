import re

def medical_chatbot_response(message: str):
    message_lower = message.lower()

    # -------------------------
    # Greeting Handling
    # -------------------------
    if any(word in message_lower for word in ["hello", "hi", "hey"]):
        return (
            "Hello 👋 I'm your Smart AI Healthcare Assistant. "
            "You can tell me your symptoms or ask health-related questions.",
            None
        )

    if any(word in message_lower for word in ["how are you"]):
        return (
            "I'm here to help you with your health concerns 😊 "
            "Please describe your symptoms or ask a medical question.",
            None
        )

    if any(word in message_lower for word in ["thank", "thanks"]):
        return (
            "You're welcome! If you have any more health concerns, feel free to ask.",
            None
        )

    # -------------------------
    # Symptom Detection
    # -------------------------

    # Cardiology
    if any(word in message_lower for word in ["chest pain", "heart pain", "shortness of breath"]):
        return (
            "Chest pain or breathing issues can be serious. "
            "I recommend consulting a Cardiologist as soon as possible.",
            "cardiologist"
        )

    # Neurology
    if any(word in message_lower for word in ["headache", "migraine", "dizziness", "seizure"]):
        return (
            "Frequent headaches or neurological symptoms should be evaluated. "
            "You may consider visiting a Neurologist.",
            "neurologist"
        )

    # Dermatology
    if any(word in message_lower for word in ["skin rash", "itching", "acne", "allergy"]):
        return (
            "Skin-related issues can be treated effectively. "
            "You may consult a Dermatologist.",
            "dermatologist"
        )

    # Orthopedic
    if any(word in message_lower for word in ["joint pain", "knee pain", "back pain", "fracture"]):
        return (
            "Bone or joint pain should be evaluated properly. "
            "You may consider visiting an Orthopedic specialist.",
            "orthopedic"
        )

    # General Fever
    if any(word in message_lower for word in ["fever", "cold", "cough", "flu"]):
        return (
            "It sounds like a general infection. "
            "You may consult a General Physician if symptoms persist.",
            "general physician"
        )

    # Diabetes
    if any(word in message_lower for word in ["diabetes", "high sugar", "blood sugar"]):
        return (
            "Diabetes management is important. "
            "You may consult an Endocrinologist for proper guidance.",
            "endocrinologist"
        )

    # -------------------------
    # Health Education Answers
    # -------------------------

    if "what is diabetes" in message_lower:
        return (
            "Diabetes is a chronic condition where the body cannot properly regulate blood sugar levels. "
            "It requires lifestyle management and sometimes medication.",
            None
        )

    if "what is blood pressure" in message_lower:
        return (
            "Blood pressure is the force of blood pushing against the walls of your arteries. "
            "High blood pressure can increase the risk of heart disease.",
            None
        )

    # -------------------------
    # Default Response
    # -------------------------

    return (
        "I'm sorry, I couldn't fully understand your concern. "
        "Please describe your symptoms clearly so I can assist you better.",
        None
    )
def suggest_specialization(symptoms: list):
    symptoms_text = " ".join(symptoms).lower()

    if any(word in symptoms_text for word in ["chest pain", "heart", "breathing"]):
        return "cardiologist"

    if any(word in symptoms_text for word in ["headache", "migraine", "dizziness"]):
        return "neurologist"

    if any(word in symptoms_text for word in ["skin", "rash", "itching"]):
        return "dermatologist"

    if any(word in symptoms_text for word in ["knee", "joint", "back pain"]):
        return "orthopedic"

    if any(word in symptoms_text for word in ["fever", "cold", "cough"]):
        return "general physician"

    return "general physician"