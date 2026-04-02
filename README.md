# EduFlow LMS - Premium Learning Management System

[![Next.js](https://img.shields.io/badge/Next.js-16+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-5.0-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

**EduFlow** is a high-performance, full-stack Learning Management System (LMS) designed for modern educational experiences. Built with a focus on scalability, user engagement, and seamless e-commerce integration, it provides an all-in-one solution for creators, schools, and corporate training.

## 🚀 Key Features

### 🎓 Learning Experience
*   **Interactive Courses:** Structured modules, lessons, and multi-media content support.
*   **Advanced Assessments:** Integrated exam engine with automated results tracking.
*   **Student Progress:** Personal dashboards to track course completion and performance.
*   **Instructor Tools:** Easy course management and student interaction.

### 💰 E-Commerce & Monetization
*   **Integrated Marketplace:** Buy and sell courses with ease.
*   **Membership Plans:** Recurring revenue models for premium content.
*   **Coupons & Discounts:** Robust promotional engine to drive sales.
*   **Order Management:** Secure checkout, order history, and digital invoicing.

### 🛠️ Technical Excellence
*   **Multi-language Support (i18n):** Ready for global audiences with RTL/LTR support.
*   **Modern UI/UX:** Built with Tailwind 4 and Framer Motion for buttery-smooth animations.
*   **Dark Mode:** Built-in theme switching for better accessibility.
*   **API Excellence:** Fully documented API with Swagger UI.
*   **Scalable Backend:** Express 5 architecture with JWT authentication and secure cookie handling.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest)
- **Styling:** Tailwind CSS 4.0
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

### Backend
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express 5](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** [Zod](https://zod.dev/)
- **Image Processing:** [Sharp](https://sharp.pixelplumbing.com/)

---

## 🧭 Real-World Use Cases

1.  **Online Marketplace:** Create a platform like Udemy or Coursera where multiple instructors can host and sell courses.
2.  **Corporate Training:** Use the membership and exam features to onboard employees and track their certification progress.
3.  **Language Schools:** Leverage the i18n support to build a language-learning portal that scales across borders.
4.  **Internal Knowledge Bases:** Deploy for schools to manage lessons, grades, and student-teacher communication securely.

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v20+)
- MongoDB Atlas or local MongoDB instance

### 1. Clone the repository
```bash
git clone https://github.com/your-username/eduflow-lms.git
cd eduflow-lms
```

### 2. Backend Setup
```bash
cd backend
npm install
# Configure your .env or config.env
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

The application will be available at `http://localhost:3000` and the API documentation at `http://localhost:5000/api-docs`.

---

## 📖 API Documentation
The API is fully documented using Swagger. Once the backend is running, you can explore the endpoints at:
`http://localhost:5000/api-docs`

## 🤝 Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---
Built with ❤️ for the future of education.
