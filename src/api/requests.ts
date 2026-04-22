import instance from "./axios.ts";
import type {
	AssignmentResponse,
	DoctorCreateRequest,
	DoctorResponse,
	HealthcheckResponse,
	MedicalRecordCreateRequest,
	MedicalRecordResponse,
	MetricsResponse,
	PatientCardResponse,
	PatientCreateRequest,
	PatientResponse,
	PatientSummaryResponse,
	PatientUpdateRequest,
	PrescriptionCreateRequest,
	PrescriptionResponse,
	TokenRequest,
	TokenResponse,
} from "../types.ts";

const request = <T>(promise: Promise<unknown>): Promise<T> => promise as Promise<T>;

export function login(payload: TokenRequest) {
	return request<TokenResponse>(instance.post("/v1/auth/login", payload));
}

export function createDoctor(payload: DoctorCreateRequest) {
	return request<DoctorResponse>(instance.post("/v1/admin/doctors", payload));
}

export function createPatient(payload: PatientCreateRequest) {
	return request<PatientResponse>(instance.post("/v1/admin/patients", payload));
}

export function listPatients() {
	return request<PatientSummaryResponse[]>(instance.get("/v1/doctors/me/patients"));
}

export function listAvailablePatients() {
	return request<PatientSummaryResponse[]>(instance.get("/v1/doctors/me/patients/available"));
}

export function assignPatient(patientId: string) {
	return request<AssignmentResponse>(instance.post(`/v1/doctors/me/patients/${encodeURIComponent(patientId)}/assign`));
}

export function getPatientCard(patientId: string) {
	return request<PatientCardResponse>(instance.get(`/v1/doctors/me/patients/${encodeURIComponent(patientId)}`));
}

export function addMedicalRecord(patientId: string, payload: MedicalRecordCreateRequest) {
	return request<MedicalRecordResponse>(instance.post(`/v1/doctors/me/patients/${encodeURIComponent(patientId)}/medical-records`, payload));
}

export function addPrescription(patientId: string, payload: PrescriptionCreateRequest) {
	return request<PrescriptionResponse>(instance.post(`/v1/doctors/me/patients/${encodeURIComponent(patientId)}/prescriptions`, payload));
}

export function getMyCard() {
	return request<PatientCardResponse>(instance.get("/v1/patients/me"));
}

export function updateMyProfile(payload: PatientUpdateRequest) {
	return request<PatientResponse>(instance.patch("/v1/patients/me", payload));
}

export function healthcheck() {
	return request<HealthcheckResponse>(instance.get("/healthz"));
}

export function metrics() {
	return request<MetricsResponse>(instance.get("/metrics"));
}

void [
	login,
	createDoctor,
	createPatient,
	listPatients,
	listAvailablePatients,
	assignPatient,
	getPatientCard,
	addMedicalRecord,
	addPrescription,
	getMyCard,
	updateMyProfile,
	healthcheck,
	metrics,
];







