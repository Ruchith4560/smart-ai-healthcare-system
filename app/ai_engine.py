def suggest_specialization(symptoms: list[str]) -> str:
    symptoms = [s.lower() for s in symptoms]

    cardiology_keywords = ["chest pain", "shortness of breath", "heart", "palpitation"]
    neurology_keywords = ["headache", "dizziness", "seizure", "migraine"]
    orthopedics_keywords = ["joint pain", "back pain", "fracture", "bone"]

    for symptom in symptoms:
        if symptom in cardiology_keywords:
            return "Cardiologist"
        if symptom in neurology_keywords:
            return "Neurologist"
        if symptom in orthopedics_keywords:
            return "Orthopedic"

    return "General Physician"