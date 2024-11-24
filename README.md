
# **Chart Rendering Application**

This is a web-based application for dynamically rendering charts. The frontend is built with **React** and **Vite**, and the backend is powered by **Express.js**. The entire application is containerized using Docker for seamless deployment and development.

---

## **Features**

- Interactive frontend for chart configuration and rendering.
- Backend API for serving data and handling requests.
- Fully containerized for easy setup and deployment using Docker Compose.

---

## **Project Structure**

```
chart/
├── front/          # Frontend application (React + Vite)
├── back/           # Backend application (Express.js)
├── docker-compose.yml  # Docker Compose configuration
```

---

## **Technologies Used**

- **Frontend**:
  - React
  - Vite
  - Chart.js
- **Backend**:
  - Express.js
  - Node.js
- **Docker**:
  - Dockerfile for frontend and backend services
  - Docker Compose for managing multi-container setup

---

## **Prerequisites**

Before running the application, ensure you have the following installed on your system:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## **Getting Started**

### 1. Build and Run the App with Docker Compose
Run the following command from the root of the project (where the `docker-compose.yml` file is located):

```bash
docker-compose up --build
```

### 3. Access the Application
- **Frontend**: Open [http://localhost:5173](http://localhost:5173) in your browser.
- **Backend**: Access the API at [http://localhost:3000](http://localhost:3000).

---

## **Stopping the Application**

To stop and remove the containers, run:
```bash
docker-compose down
```

---

## **Development Workflow**

### **Frontend Development**
Navigate to the `front/` directory:
```bash
cd front
```

Run the development server:
```bash
npm install
npm run dev
```

The frontend will be available at [http://localhost:5173](http://localhost:5173).

---

### **Backend Development**
Navigate to the `back/` directory:
```bash
cd back
```

Run the development server:
```bash
npm install
node server.js
```

The backend will be available at [http://localhost:3000](http://localhost:3000).

## **Customization**

### Adding Charts
- Update the frontend React components to include new chart types or configurations.
- Modify the backend API to serve additional data endpoints as needed.

---

## **Known Issues**

- If you encounter issues with Docker network connectivity, ensure your Docker service is running and accessible.
- Use `docker logs <container_name>` to debug container issues.

