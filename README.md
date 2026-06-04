### ** BACKEND REPOSITORY (README.md)**

```markdown
# Food Rescue Hub - Backend Engine ⚙️🧠

The robust server-side engine and REST API infrastructure for the **Food Rescue Hub**. This backend handles core computational business logic, secure authorization, route protection, database operations, and data validation.

## 🚀 Core Functionalities
* **RESTful API Architecture:** Modular and secure endpoints structure parsing clean JSON communication payloads.
* **Secure Authentication Engine:** User passwords safely hashed using **Bcrypt** before persistence, combined with secure stateless session authorization via **JSON Web Tokens (JWT)**.
* **Robust Form & Server Validations:** Server-side guards blocking faulty payload shapes (e.g., preventing empty fields, duplicate email registrations, or invalid data types).
* **Automated Expiry Assessment Logic:** Specialized time-comparison computational modules enforcing validity constraints (e.g., evaluating food viability and the 3-hour decay rules).
* **CORS Management:** Fully configured cross-origin policies enabling trusted communication channels with separate frontend domains.

## 🛠️ Tech Stack Used
* **Runtime Environment:** Node.js
* **Framework:** Express.js (High-performance backend web framework)
* **Database Platform:** MongoDB Atlas (Cloud-hosted NoSQL cluster)
* **Object Data Modeling (ODM):** Mongoose (For reliable schema modeling and validation rules)
* **Security & Utility Libraries:** `bcryptjs`, `jsonwebtoken`, `cors`, `dotenv`


## 💻 Local Installation & Setup
Clone the repository:

   git clone https://github.com/NishuRajput12/FoodRescueHubBackend.git
   cd backend
Install backend dependencies:

   npm install
Setup Environment Credentials:
Create a secure .env file in the root backend folder and fill in the configuration details:

Code snippet
   PORT=8000
   
   npm start
