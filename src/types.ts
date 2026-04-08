export type Role = "admin" | "doctor" | "patient"

export type UserAuthInfo = {
    accessToken: string
    tokenType: string
    role: Role
    profileId: string | null
}

export type TokenRequest = {
    username: string
    password: string
}

export type TokenResponse = {
    access_token: string
    token_type: string
    role: Role
    profile_id: string | null
}

export type DoctorCreateRequest = {
    full_name: string
    specialization: string
    phone: string
    email: string
    username: string
    password: string
}

export type DoctorResponse = {
    id: string
    user_id: string
    full_name: string
    specialization: string
    phone: string
    email: string
    created_at: string
}

export type PatientCreateRequest = {
    full_name: string
    date_of_birth: string
    gender: string
    phone: string
    email: string
    address: string
    insurance_number: string
    username: string
    password: string
}

export type PatientUpdateRequest = {
    phone?: string | null
    email?: string | null
    address?: string | null
}

export type PatientResponse = {
    id: string
    user_id: string
    full_name: string
    date_of_birth: string
    gender: string
    phone: string
    email: string
    address: string
    insurance_number: string
    created_at: string
}

export type PatientSummaryResponse = {
    id: string
    full_name: string
    date_of_birth: string
    insurance_number: string
    assigned_doctor_id: string | null
    status: string
    last_visit_at: string | null
}

export type MedicalRecordCreateRequest = {
    visit_date: string
    complaints: string
    diagnosis: string
    examination_results: string
    doctor_comment: string
}

export type MedicalRecordResponse = {
    id: string
    patient_id: string
    doctor_id: string
    visit_date: string
    complaints: string
    diagnosis: string
    examination_results: string
    doctor_comment: string
    created_at: string
}

export type PrescriptionCreateRequest = {
    prescribed_at: string
    title: string
    dosage: string
    treatment_period: string
    doctor_comment: string
}

export type PrescriptionResponse = {
    id: string
    patient_id: string
    doctor_id: string
    prescribed_at: string
    title: string
    dosage: string
    treatment_period: string
    doctor_comment: string
    created_at: string
}

export type AssignmentResponse = {
    id: string
    doctor_id: string
    patient_id: string
    assigned_at: string
}

export type PatientCardResponse = {
    personal_data: PatientResponse
    assigned_doctor_id: string | null
    medical_records: MedicalRecordResponse[]
    prescriptions: PrescriptionResponse[]
    last_visit_at: string | null
}

export type HealthcheckResponse = Record<string, string>

export type MetricsResponse = unknown
