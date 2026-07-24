# Employee Management System

A simple full-stack Employee Management System built for academic use.

It helps an administrator manage employees, departments, attendance, leave requests, and payroll records from one dashboard.

## Technologies Used

### Backend

- Java 17
- Spring Boot
- Spring Data JPA
- Spring Security
- MySQL
- Maven

### Frontend

- React
- Vite
- React Router
- Axios
- React Icons
- CSS

## Main Features

- Employee create, view, edit, delete, and search
- Department create, view, edit, and delete
- Dashboard with live employee and department counts
- Attendance marking for Present, Absent, and Leave
- Leave requests with Pending, Approved, and Rejected status
- Monthly payroll generation with salary, bonus, deduction, and net salary
- Live report totals
- Browser-saved application settings

## Project Structure

```text
employee-management-system/
├── backend/       Spring Boot REST API
├── frontend/      React application
└── README.md      Project documentation
```

## Database Setup

1. Open MySQL Workbench or MySQL command line.
2. Create the database:

```sql
CREATE DATABASE ems_db;
```

3. Check the database details in `backend/src/main/resources/application.properties`.

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ems_db
spring.datasource.username=root
spring.datasource.password=root
```

4. Change the username or password if your local MySQL setup is different.

Spring Boot automatically creates the required tables when the backend starts.

## Run the Backend

Open a terminal in the `backend` folder.

```bash
mvn spring-boot:run
```

The backend runs at:

```text
http://localhost:8080
```

If Maven is not available in the terminal, import the `backend` folder into IntelliJ IDEA or Eclipse as a Maven project and run `EmployeeManagementSystemApplication.java`.

## Run the Frontend

Open a second terminal in the `frontend` folder.

```bash
npm install
npm run dev
```

Open the address shown by Vite, normally:

```text
http://localhost:5173
```

## API Endpoints

| Module | Base URL |
| --- | --- |
| Employees | `/employees` |
| Departments | `/departments` |
| Attendance | `/attendance` |
| Leave Requests | `/leaves` |
| Payroll | `/payroll` |

## Basic Usage Order

1. Create departments.
2. Add employees and select their department.
3. Mark employee attendance.
4. Create and approve or reject leave requests.
5. Generate monthly payroll records.
6. Open Dashboard and Reports to view live totals.

## Notes

- Create at least one department before adding an employee.
- Create at least one employee before using Attendance, Leave, or Payroll.
- One attendance record is allowed for each employee on a specific date.
- One payroll record is allowed for each employee in a specific month.
