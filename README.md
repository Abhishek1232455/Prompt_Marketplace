# PromptForge: Enterprise AI Prompt Marketplace & Development Hub 🚀

PromptForge is a wide-scale, secure, full-stack prompt engineering marketplace designed for composing, playtesting, purchasing, and managing high-grade AI prompt blueprints. Built on the MERN stack with high-contrast warm aesthetics and advanced CSS 3D interactivity, this workspace provides developers and prompt engineers with a commercial-ready portal to trade, test, and decrypt industrial prompt configurations.

---

## 🌟 Key System Features & Highlights

*   **3D Prompt Synthesizer Panel**: Interactive virtual sandbox on the homepage containing a simulated variable-binding parser, text-stream typers, and code console views.
*   **Security & Decryption Engine**: Prompts are stored in encrypted form using AES encryption (`crypto-js`). Decryption keys and raw prompt definitions are restricted to users who have completed credit transactions.
*   **Advanced UI Aesthetics**: Styled around a modern **Warm Sand & Emerald** light theme, utilizing custom glassmorphism components, interactive grid scanner layers, and fluid micro-animations.
*   **Performance Optimization**: Utilizes CSS layout-isolation strategies (`contain: layout paint`) and compositor promotions (`will-change: top`) to ensure animations run at 60 FPS without layout reflows or parent recalculations.
*   **Secured Authentication**: Robust user management powered by JWT (JSON Web Tokens) with automated route protection and client-side Redux synchronization.
*   **Integrated Credit Ledger**: Virtual wallet architecture facilitating mock Stripe checkout payments, dynamic product purchasing, and transaction logging.
*   **Administrative Utilities**: Command-line administrative interface (`give_credits.js`) enabling developers and moderators to configure user balances instantly from the shell.

---

## 🛠️ Technology Stack & Frameworks

### Frontend (Client-side Portal)
*   **React 18**: Dynamic single-page client layout with modular, reusable functional components.
*   **Redux Toolkit**: Centralized state management for authentication profiles, credentials, and persistent shopping states.
*   **React Router DOM v6**: Multi-page client-side router with conditional admin routing and page transitions.
*   **Tailwind CSS & DaisyUI**: Utility-first styling framework modified for the Warm Sand (`#FAF8F5`) and Emerald palette.
*   **React Icons**: Rich glyph icons providing standard workspace visuals.

### Backend (Server REST API)
*   **Node.js & Express.js**: Asynchronous event-driven REST API serving authentication, catalogs, and transaction endpoints.
*   **MongoDB & Mongoose ODM**: NoSQL document store with strict Mongoose schema models, indexing, and seed configurations.
*   **JWT & Bcrypt**: Secure session management and salted cryptographic password hashing.
*   **Crypto-js**: Advanced AES encryption for securing prompt variables in the database.
*   **Stripe SDK**: Payment processing server-side validation.

---

## 🎓 Engineering Skills Demonstrated

*   **Full-Stack Software Architecture**: End-to-end implementation of the MERN stack with decoupled concerns (REST endpoints, React views, and Redux data syncs).
*   **Cryptographic Security Design**: Safe-keeping of intellectual properties (AI prompts) using database-level field-level encryption, ensuring data remains unreadable until payment verification.
*   **High-Fidelity Animations & 3D Styling**: Advanced perspective modeling (`perspective(1200px)`) and transition transformations for fluid interface interactions.
*   **Rendering & Layout Optimization**: Resolving browser sub-pixel rendering bugs and preventing Flexbox parent recalculations during complex CSS animations.
*   **Database Management & Migrations**: Creating automated data seeding configurations and automated diagnostic utilities (`test_images.js` and `check_db.js`) to guarantee database asset integrity.
*   **State Management Architecture**: Constructing predictable global store designs with localized authentication persistence.

---

## 📁 System Architecture

```text
Prompt_Marketplace/
├── backend/
│   ├── models/            # Mongoose Schemas (Users, Prompts)
│   ├── routes/            # Express Endpoint Routers
│   ├── seed.js            # Automated Database Seed Utility (69 Prompts)
│   ├── give_credits.js    # CLI Credit Administration Tool
│   ├── check_db.js        # DB Verification Script
│   └── server.js          # REST API entry point
└── frontend/
    ├── public/            # Static HTML assets & Favicons
    └── src/
        ├── components/    # Reusable UI Blocks (Headers, Sliders, Modals)
        ├── pages/         # Page Views (Home, About, MyCollection, Contact)
        ├── redux/         # Redux Toolkit Slices (authSlice, store config)
        └── index.css      # Core Design System, Animations & Keyframes
```

---

## 🚀 Installation & Local Environment Setup

This project requires **Node.js** (v14 or higher) and a running instance of **MongoDB** (locally on `mongodb://127.0.0.1:27017` or Atlas).

### 1. Repository Clone
```bash
git clone https://github.com/Abhishek1232455/Prompt_Marketplace.git
cd Prompt_Marketplace
```

### 2. Backend Server Initialization
Open a new terminal at the root:
```bash
cd backend
npm install
npm start
```
*The REST API server will run at `http://localhost:8000`.*

### 3. Frontend Web Application Initialization
Open a second terminal at the root:
```bash
cd frontend
npm install --legacy-peer-deps
npm start
```
*The React application will compile and launch at `http://localhost:3000`.*

---

## ⚙️ Environment Configurations

Create `.env` files in their respective folders prior to running in production:

**Backend Setup (`backend/.env`):**
```env
MONGO_URL=mongodb://127.0.0.1:27017/prompt_marketplace
JWT_SECRET=your_secret_session_token_key
PROMPT_KEY=your_aes_encryption_key_string
PORT=8000
```

**Frontend Setup (`frontend/.env`):**
```env
REACT_APP_SERVER_URL=http://localhost:8000
```

---

## 🔧 Administrative CLI Commands

We provide a direct command-line script to easily manage user balances inside MongoDB without opening database GUI tools.

Navigate to the `backend` folder and execute:
```bash
node give_credits.js <user_email> <credits_amount>
```

**Examples:**
*   To give `1000` credits to the default user `abhishek1232455@gmail.com`:
    ```bash
    node give_credits.js abhishek1232455@gmail.com 1000
    ```
*   To give `500` credits to the first user registered in the database:
    ```bash
    node give_credits.js
    ```

---

## 🤝 Developer Credits & Spotlight

Designed and built as a full-stack engineering showcase by **Abhishek**. 

For questions, collaborations, or feature proposals:
*   **Developer Info**: Abhishek
*   **Web Portal**: [PromptForge Homepage](http://localhost:3000)
*   **Contact Section**: [Feedback & Messages Portal](http://localhost:3000/contact)
*   **License**: ISC Licensed.
