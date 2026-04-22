## Project Overview

This project is built using **Vue.js** with **Vue Router** for routing, **Tanstack Query** and **Axios** for API requests, **Pinia** for state management, and **Tailwind** & **DaisyUI** for styling. The system is designed to handle user roles such as **doctor**, **admin**, and **patient**, with functionality divided accordingly.

### Roles:

1. **Doctor**
2. **Admin**
3. **Patient**

### Key Requirements:

* **Responsiveness**: All pages must be responsive and adapt to various screen sizes using **Tailwind** and **DaisyUI**.
* **Custom Hooks**: Custom hooks must be used for API calls and any reusable logic.
* **State Management**: **Pinia** should be used for managing shared states, especially for complex states that are accessed across multiple components.
* **Functional API Integration**: Implement all functionality defined in the API specification.

### Routes:

* **Login Page**: `/login`
* **Admin Dashboard**: `/admin`
* **Doctor Dashboard**: `/doctor`
* **Patient Dashboard**: `/patient`

---

## 1. **Doctor Functionality**

### Overview:

* Doctors should be able to manage their patients, add medical records, assign prescriptions, and handle their patient assignments.

### API Endpoints:

* **List Patients**: `GET /api/v1/doctors/me/patients`
* **Assign Patient**: `POST /api/v1/doctors/me/patients/{patient_id}/assign`
* **Patient Medical Records**: `POST /api/v1/doctors/me/patients/{patient_id}/medical-records`
* **Patient Prescriptions**: `POST /api/v1/doctors/me/patients/{patient_id}/prescriptions`

### Suggested Implementation:

* **Pinia Store**: You already have a store for user authentication. For doctor-specific data, you can create another store called `useDoctorStore`.
* **Custom Hooks**: Reusable hooks for doctor-related actions.

    * `usePatientList`: Fetch all patients assigned to the doctor.
    * `useAssignPatient`: Handle patient assignment.
    * `useAddMedicalRecord`: Add a new medical record for a patient.
    * `useAddPrescription`: Add a prescription for a patient.

Example of fetching patients:

```js
import { useQuery } from '@tanstack/vue-query'
import axios from '../axios'

const usePatientList = () => {
  return useQuery('patients', () => axios.get('/api/v1/doctors/me/patients'))
}
```

---

## 2. **Admin Functionality**

### Overview:

* Admins should be able to create and manage doctors and patients.

### API Endpoints:

* **Create Doctor**: `POST /api/v1/admin/doctors`
* **Create Patient**: `POST /api/v1/admin/patients`

### Suggested Implementation:

* **Pinia Store**: Create a `useAdminStore` to handle the list of doctors and patients, as well as the creation process.
* **Custom Hooks**: Reusable hooks for doctor and patient creation.

    * `useCreateDoctor`: Create a new doctor via the API.
    * `useCreatePatient`: Create a new patient via the API.

Example of doctor creation:

```js
import { useMutation } from '@tanstack/vue-query'
import axios from '../axios'

const useCreateDoctor = () => {
  return useMutation((doctorData) => axios.post('/api/v1/admin/doctors', doctorData))
}
```

---

## 3. **Patient Functionality**

### Overview:

* Patients should be able to view and update their profile and access their medical records.

### API Endpoints:

* **Get Patient Card**: `GET /api/v1/patients/me`
* **Update Patient Profile**: `PATCH /api/v1/patients/me`

### Suggested Implementation:

* **Pinia Store**: Create a `usePatientStore` to manage patient data, including profile details and medical records.
* **Custom Hooks**: Reusable hooks for fetching and updating patient data.

    * `usePatientProfile`: Fetch the profile details of the logged-in patient.
    * `useUpdatePatientProfile`: Update patient profile data.

Example of fetching the patient profile:

```js
import { useQuery } from '@tanstack/vue-query'
import axios from '../axios'

const usePatientProfile = () => {
  return useQuery('patientProfile', () => axios.get('/api/v1/patients/me'))
}
```

---

## Existing Pinia Store (User Authentication)

### Store Setup (`useUserStore`):

You already have the user store for handling authentication state. Ensure that this store is initialized at the app's entry point, and the login logic is handled correctly in the `/login` page.

```js
import { defineStore } from "pinia"
import { ref, computed } from "vue"
import type { UserAuthInfo } from "../types.ts"

export const useUserStore = defineStore("user", () => {
    const user = ref<UserAuthInfo | null>(null)
    const isInitialized = ref(false)

    const token = computed(() => user.value?.accessToken)
    const isAuthenticated = computed(() => !!token.value)

    function init() {
        if (isInitialized.value) return

        const storedUser = localStorage.getItem("user")

        if (storedUser) user.value = JSON.parse(storedUser) as UserAuthInfo

        isInitialized.value = true
    }

    function setUser(newUser: UserAuthInfo) {
        user.value = newUser
        localStorage.setItem("user", JSON.stringify(newUser))
    }

    function login(newUser: UserAuthInfo) {
        setUser(newUser)
    }

    function logout() {
        user.value = null
        localStorage.removeItem("user")
    }

    return {
        user,
        token,
        isInitialized,
        isAuthenticated,
        init,
        setUser,
        login,
        logout
    }
})
```

### Axios Instance:

Since the axios instance is already configured, ensure that the authorization token is passed in headers for authenticated requests. 


