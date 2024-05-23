
# Educational App Backend

This repository contains the backend for an educational app designed to manage and deliver lessons, articles, assignments, and personality tests. The backend also supports course purchases, user progress tracking, and role-based access control through a comprehensive admin panel.

## Features

- **Lessons and Articles**: Create and manage educational content.
- **Assignments**: Assign tasks to users and track their submissions.
- **Course Purchase Functionality**: Allow users to buy courses.
- **Sequentially Aligned Lessons**: Organize lessons in a specific order.
- **Progress Tracking**: Monitor users' progress through courses.
- **Course Enrollment**: Users can enroll in available courses.
- **Lesson Access**: Grant users access to lessons based on their enrollment.
- **Assignment Submission**: Users can submit assignments for review.
- **Progress History View**: Users can view their learning history and progress.
- **Content Creation and Management**: Admins can create and edit courses, lessons, and articles.
- **Course Management**: Oversee the organization and availability of courses.
- **Assignment Management**: Manage assignment creation, distribution, and grading.
- **User Management (Roles, Permissions)**: Control user roles and permissions.
- **User Authentication (Sign-up, Login)**: Secure user login and registration.
- **Role-Based Access Control**: Different access levels for admins, managers, and students.
- **Secure Access**: Ensure users can only access content appropriate for their role.
- **Personality Tests**: Administer and track personality assessments.

## Technologies Used

- **Node.js**: Backend runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: ODM for MongoDB
- **JWT**: JSON Web Tokens for authentication
- **Passport.js**: Authentication middleware

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/rehanmm/educational-app-backend.git
    cd educational-app-backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory
    - Add the following variables:
        ```env
        PORT=3000
        MONGO_URI=your_mongodb_uri
        JWT_SECRET=your_jwt_secret
        ```
  Note: these keys for only basic functionality and you may need other key for other functionality
  
4. Start the server:
    ```bash
    npm start
    ```

## Usage

- Access the API at `http://localhost:3000`

## Contact

For any inquiries or feedback, please contact [rehankhan.jgr@gmail.com](mailto:rehankhan.jgr@gmail.com).
