# 💸 Expense Sharing App – Backend API

A minimal backend for an **Expense Sharing Application** built using **Node.js**, **Express**, and **MongoDB**. It allows users to create groups, record shared expenses, track balances, and settle debts.

---

## 🔧 Features

### ✅ Core Functionalities
- Group creation and user invitations
- Adding expenses with automatic split
- Real-time balance tracking
- Settlement transactions
- View expense history and net balances

### 🔐 Authentication (Optional)
- JWT-based protected routes (planned
- User registration and login with bcrypt

---

## 📦 Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- RESTful API
- JWT (planned)
- Email tokens (for group joining)

---


---

## 🗃️ MongoDB Collections

| Collection      | Purpose                                  |
|----------------|-------------------------------------------|
| `users`         | Registered users (email, passwordHash)   |
| `groups`        | Group metadata (name, ownerId)           |
| `group_members` | Link between users and groups            |
| `expenses`      | Expense data with title, amount, shares  |
| `balances`      | Running balance between users in a group |
| `settlements`   | Record of payments made to settle debts  |

---

## 📮 API Endpoints

### 🔐 Auth (Optional)
- `POST /api/auth/register`
- `POST /api/auth/login`

### 👥 Groups
- `POST /api/groups` – Create group
- `DELETE /api/groups/:groupId` – Delete group
- `POST /api/groups/:groupId/invite` – Invite via email
- `POST /api/groups/:groupId/join` – Join via invite token
- `GET /api/users/:userId/groups` – List user’s groups

### 💸 Expenses
- `POST /api/groups/:groupId/expenses` – Create expense
- `GET /api/groups/:groupId/expenses` – List expenses in group

### 💳 Balances & Settlements
- `GET /api/groups/:groupId/balances` – View balances
- `POST /api/groups/:groupId/settlements` – Record settlement
- `GET /api/users/:userId/settlements` – View user settlements

---

## 🧪 Sample Expense Flow

1. **Create Group**
2. **Invite Users**
3. **Join Group**
4. **Add Expenses** → auto-shared
5. **View Balances**
6. **Settle Payments**

---

## 🚀 Getting Started

### 📥 Installation

```bash
git clone https://github.com/your-username/expense-sharing-backend.git
cd expense-sharing-backend
npm install

