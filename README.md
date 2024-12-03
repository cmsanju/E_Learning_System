# E-Learning System  
### Team Name: **Springular Nexus**

## Project Overview  
The E-Learning System is a comprehensive platform designed to enhance online education. It facilitates seamless interaction between instructors and learners, providing features such as course management, content delivery, assessments, and progress tracking. Built with Angular for the frontend and Spring Boot for the backend, this system ensures a dynamic and robust user experience.  

---

## Technology Stack  

### Frontend  
- **Framework**: Angular  
- **Features**:  
  - Dynamic and responsive UI design.  
  - Component-based architecture.  
  - Real-time interactions using Angular Services.  
  - State management with NgRx.  
  - Data visualization with Angular Material and charts.  

### Backend  
- **Framework**: Spring Boot  
- **Features**:  
  - RESTful API development.  
  - Secure user authentication and authorization (JWT).  
  - Database integration with Hibernate and JPA.  
  - Microservices architecture for scalability.  
  - Exception handling and robust logging.  

---

## Project Structure  

### Frontend (Angular)  
1. **Folder Structure:**  
   - `src/app`: Contains all the core application modules and components.  
     - `components`: Reusable UI components (e.g., navbar, footer).  
     - `pages`: Contains main pages (e.g., Login, Dashboard, Course Details).  
     - `services`: Manages API calls and state management.  
     - `models`: Data models used across the application.  
   - `src/assets`: Contains static files (images, CSS, etc.).  

2. **Key Components:**  
   - **Login Page:** Secure user login using a reactive form.  
   - **Dashboard:** Displays a list of available courses and progress.  
   - **Course Details:** Shows detailed information about a selected course.  
   - **Quiz Module:** Interactive quizzes to assess learner understanding.  

3. **Key Files:**  
   - `src/app/app.module.ts`: Main module defining the application's root module.  
   - `src/app/app-routing.module.ts`: Configures route navigation.  
   - `src/styles.css`: Global styling for the application.  

---

### Backend (Spring Boot)  
1. **Folder Structure:**  
   - `src/main/java/com/springularnexus/elearning`: Root package for the backend.  
     - `controllers`: Manages HTTP requests.  
     - `services`: Business logic layer.  
     - `repositories`: Interfaces for database access.  
     - `models`: Entity classes mapped to database tables.  
     - `config`: Configuration files (e.g., security, CORS).  

2. **Key Endpoints:**  
   - **User Authentication:**  
     - `POST /api/auth/login`  
     - `POST /api/auth/register`  
   - **Courses Management:**  
     - `GET /api/courses`  
     - `POST /api/courses`  

  
3. **Key Files:**  
   - `application.properties`: Contains database and server configurations.  
   - `MainApplication.java`: Entry point of the Spring Boot application.  
   - `SecurityConfig.java`: Defines security filters and authentication mechanisms.  
