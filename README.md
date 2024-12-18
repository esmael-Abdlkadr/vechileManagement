# Vehicle Management System

A demo Vehicle Management System built using **React** + **TypeScript (TSX)**, **Tailwind CSS**, **Zustand**, **React Query (Tanstack)** for the frontend, and **MongoDB** with **Express** for the backend. The API documentation is provided using **Swagger** for easy testing and exploration.

## Technologies

### Frontend:

- **React** + **TypeScript (TSX)**
- **Tailwind CSS**
- **Zustand** (State management)
- **React Query (Tanstack)** for data fetching
- **Package Manager**: **pnpm**

### Backend:

- **Node.js** + **Express**
- **MongoDB**
- **Package Manager**: **yarn**

### API Documentation:

- **Swagger** for documenting and testing the API endpoints

## Features

### Vehicle Management:

- Add, update, list, and delete vehicles.
- Manage vehicle details such as name, model, license plate, fuel type, status, and mileage.
- Available fuel types: **Petrol**, **Diesel**, **Electric**, **Hybrid**.
- Available vehicle status: **Active**, **In Maintenance**, **Inactive**.

### User Management:

- **User Registration**: Users can register with a unique email and password.
- **User Login**: Users can log in with their credentials to access protected resources.
- **Sign Up**: Users can sign up by providing their email and password.
- **Forgot Password**: Users can reset their password by providing their email.
- **Edit User**: Users can update their information such as name, email, and password.

## Setup

### 1. Clone the repository:

```bash
git clone https://github.com/esmael-Abdlkadr/vechileManagement
```

```
cd vehicle-management-system
```

### 2. Install dependencies for Frontend:

- Navigate to the frontend directory:

```bash
cd frontend
```

- Install dependencies using pnpm:

```bash
pnpm install
```

### 3. Install dependencies for Backend:

- Navigate to the backend directory:

```bash
cd backend
```

- Install dependencies using yarn:

```bash
yarn install
```

### 4. Set up environment variables:

- Create a `.env` file in the backend folder and add:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/vehicle_management
JWT_SECRET=your_jwt_secret
```

### 5. Start the application:

- **Frontend**: Run the frontend with pnpm:

```bash
pnpm run dev
```

Frontend will run on [http://localhost:5173/](http://localhost:5173/).

- **Backend**: Run the backend with yarn:

```bash
yarn run dev
```

Backend will run on [http://localhost:5000/](http://localhost:5000/).

## Swagger API Documentation

- **Base URL**: [http://localhost:5000/api](http://localhost:5000/api)
- **API Documentation**: Swagger UI available at [http://localhost:5000/api-docs](http://localhost:5000/api-docs).
- **Authentication**: JWT required for all endpoints except registration, login, and password reset.

### Example Endpoints:

#### User Management:

- **User Registration**: `POST /api/auth/register`
- **User Login**: `POST /api/auth/login`
- **Forgot Password**: `POST /api/auth/forgot-password`
- **Edit User**: `PATCH /api/auth/edit-user`

#### Vehicle Management:

- **Create Vehicle**: `POST /api/vehicles`
- **Get Vehicles**: `GET /api/vehicles`
- **Update Vehicle**: `PUT /api/vehicles/:id`
- **Delete Vehicle**: `DELETE /api/vehicles/:id`

### Example of Vehicle Data:

```json
{
  "name": "Toyota Corolla",
  "status": "Active",
  "licensePlate": "AA 1234",
  "fuelType": "Petrol",
  "vehicleModel": "Sedan"
}
```

### Example of User Data (for Registration/Editing):

```json
{
  "email": "user@example.com",
  "password": "strongPassword123",
  "name": "John Doe"
}
```

## Contributing

Feel free to fork the repo, make changes, and submit a pull request!
