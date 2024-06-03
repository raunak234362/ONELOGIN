Sure, here's a detailed README for One-Login:

---

# One-Login

One-Login is a centralized authentication and user management system designed to streamline and secure access to various applications. This initial base variant features dashboards for both users and administrators, with functionalities for adding user groups, setting fields according to departments, and managing permissions.

## Features

- **User Dashboard**: View personal information and access permissions.
- **Admin Dashboard**: Manage users, departments, and user groups.
- **User Groups**: Admins can create and manage user groups, specifying fields and permissions based on department requirements.
- **Notifications**: System notifications can be manually triggered via a script.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (hosted on MongoDB Atlas)
- **Deployment**: Render

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- MongoDB Atlas account
- Render account for deployment

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/one-login.git
   cd one-login
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the root directory and add the following environment variables:

   ```env
   MONGO_URI=your-mongodb-atlas-uri
   JWT_SECRET=your-jwt-secret
   ```

4. **Run the application locally**
   ```sh
   npm start
   ```

   The application will be available at `http://localhost:3000`.

### Deployment

1. **Deploy to Render**

   Follow Render's deployment instructions to deploy both the frontend and backend.

2. **Set environment variables on Render**

   Make sure to set `MONGO_URI` and `JWT_SECRET` in your Render environment settings.

## Usage

### Admin Functionalities

- **Add New User Group**: Navigate to the User Group tab in the side navigation bar to create new user groups and set fields based on department requirements.
- **Manage Users**: Add, edit, and delete users as needed.

### User Functionalities

- **View Dashboard**: Users can view their personal information and permissions.

### Notifications

- **Manual Trigger**: Notifications are currently triggered manually by executing a script. Automation will be implemented in future updates.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## Roadmap

- Automate notification system
- Enhance user interface and user experience
- Implement advanced security features
- Add multi-language support
- Integrate with additional applications
