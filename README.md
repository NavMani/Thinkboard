# 🚀 ThinkBoard

ThinkBoard is a modern full-stack note-taking application built with the MERN stack. Users can create, update, delete, and manage notes through a clean and responsive interface.

The application is containerized using Docker, reverse proxied through Nginx, secured with HTTPS using Let's Encrypt SSL certificates, and automatically deployed to AWS EC2 using GitHub Actions CI/CD.

---

## 🌐 Live Demo

https://thinkboard.navjotsingh.online

---

## ✨ Features

- Create Notes
- Edit Notes
- Delete Notes
- Responsive UI
- RESTful API
- Dockerized Application
- Nginx Reverse Proxy
- HTTPS with Let's Encrypt SSL
- Automated Deployment using GitHub Actions
- AWS EC2 Hosting

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### DevOps
- Docker
- Docker Compose
- Nginx
- AWS EC2
- Let's Encrypt SSL
- GitHub Actions

---

## 📂 Project Structure

```bash
Thinkboard/
│
├── Frontend/
│   ├── src/
│   ├── public/
│   └── Dockerfile
│
├── Backend/
│   ├── src/
│   ├── .env
│   └── Dockerfile
│
├── nginx/
│   └── default.conf
│
├── docker-compose.yml
│
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## 🐳 Docker Deployment

Build and start all services:

```bash
docker compose up -d --build
```

Stop services:

```bash
docker compose down
```

---

## 🔒 HTTPS Setup

SSL certificates are generated using Let's Encrypt:

```bash
sudo certbot certonly \
--standalone \
-d thinkboard.navjotsingh.online
```

Nginx handles:

- HTTP → HTTPS redirection
- SSL termination
- Reverse proxying requests

---

## ⚙️ CI/CD Pipeline

Deployment is fully automated using GitHub Actions.

### Workflow

```text
Developer Push
        ↓
GitHub Repository
        ↓
GitHub Actions
        ↓
SSH into EC2
        ↓
Git Pull Latest Code
        ↓
Docker Compose Down
        ↓
Docker Compose Up --build
        ↓
Production Deployment
```

### GitHub Secrets

```text
EC2_HOST
EC2_USER
EC2_SSH_KEY
```

---

## ☁️ AWS Infrastructure

- AWS EC2 Ubuntu Instance
- Docker Engine
- Docker Compose
- Nginx Reverse Proxy
- Let's Encrypt SSL
- GitHub Actions Deployment

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/NavMani/Thinkboard.git
cd Thinkboard
```

### Backend Setup

```bash
cd Backend
npm install
```

### Frontend Setup

```bash
cd Frontend
npm install
```

### Start Development

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm run dev
```

---



---

## 👨‍💻 Author

### Navjot Singh

B.Tech Student | Full Stack Developer | DevOps Enthusiast

LinkedIn:
https://www.linkedin.com/in/navjot-mani-66028b359/

GitHub:
https://github.com/NavMani

---

## 📜 License

This project is licensed under the MIT License.