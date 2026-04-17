# FixMyLogic

FixMyLogic is a modern, interactive coding platform inspired by top competitive programming sites, built to help users seamlessly practice algorithms and master their logical problem solving skills. It features a fully-functional embedded code execution engine, user authentication, and persistent progress tracking.

## 🚀 Key Features

- **Code Execution Environment:** Write and execute JavaScript code directly in the browser safely. It dynamically tests your code against pre-defined test cases and evaluates the runtime logic.
- **Firebase Integration:** 
  - **Authentication:** Secure user login and registration using Firebase Auth.
  - **Cloud Firestore:** Real-time database to track and persist user progress (Starred, Liked, Disliked, and Solved problems).
- **Interactive UI/UX:**
  - Modern dark-themed user interface designed to be easy on the eyes, featuring VS Code aesthetics.
  - Interactive split-pane layouts (resizable problem descriptions and code editors) using `react-split`.
  - Highly customizable Settings Modal (adjust editor font-sizes, full-screen modes, syntax languages).
- **Rewarding Feedback & Learning:**
  - Satisfying confetti animations celebrating successful code submissions.
  - Integrated YouTube video solutions directly in the problem tables for visual learning and breakdowns.
- **Robust Tech Stack:** Built with blazing fast React, Next.js, Tailwind CSS, TypeScript, and Firebase.

## 🛠️ Tech Stack

- **Framework:** Next.js (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend & Database:** Firebase (Authentication, Cloud Firestore)
- **Code Editor:** `@uiw/react-codemirror` (with VSCode Dark Theme)
- **Noteworthy Libraries:** `react-icons`, `react-toastify`, `react-split`, `react-confetti`, `react-youtube`

## 💻 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and `npm` installed on your machine.
You will also need to configure a Firebase project.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Immonn/FixMyLogic.git
   cd FixMyLogic
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env.local` file in the root directory and securely add your Firebase configuration variables:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to immerse yourself in the platform.

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check out the [issues page](https://github.com/Immonn/FixMyLogic/issues) if you want to contribute.
