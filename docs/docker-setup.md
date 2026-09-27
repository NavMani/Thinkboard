# 🐳 Docker Setup Guide

This document explains how to run ThinkBoard using Docker and Docker Compose.

---

# Prerequisites

Make sure the following tools are installed:

- Docker
- Docker Compose Plugin

Verify installation:

```bash
docker --version
docker compose version
```

---

# Project Structure

```bash
Thinkboard/
│
├── Backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│
├── Frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│
├── nginx/
│   └── default.conf
│
└── docker-compose.yml
```

---

# Environment Variables

Create a `.env` file inside the Backend directory.

Example:

```env
PORT=5001

MONGO_URI=your_mongodb_connection_string

UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

NODE_ENV=production
```

---

# Build and Run Containers

From the project root:

```bash
docker compose up -d --build
```

This command:

- Builds frontend image
- Builds backend image
- Starts Nginx container
- Creates Docker network
- Connects all services together

---

# Verify Running Containers

```bash
docker ps
```

Expected output:

```bash
thinkboard-backend
thinkboard-frontend
thinkboard-nginx
```

---

# View Container Logs

Backend:

```bash
docker logs thinkboard-backend
```

Frontend:

```bash
docker logs thinkboard-frontend
```

Nginx:

```bash
docker logs thinkboard-nginx
```

Follow logs in real time:

```bash
docker logs -f thinkboard-backend
```

---

# Stop Containers

```bash
docker compose down
```

---

# Restart Containers

```bash
docker compose restart
```

---

# Rebuild After Changes

Whenever Dockerfile or application code changes:

```bash
docker compose down

docker compose up -d --build
```

---

# Docker Network

Docker Compose automatically creates a network.

Containers communicate internally using service names:

### Frontend

```bash
http://frontend
```

### Backend

```bash
http://backend:5001
```

### Nginx Reverse Proxy

```bash
http://nginx
```

---

# Port Mapping

| Service | Container Port | Host Port |
|----------|---------------|-----------|
| Backend | 5001 | 5001 |
| Frontend | 80 | Internal Only |
| Nginx HTTP | 80 | 80 |
| Nginx HTTPS | 443 | 443 |

---

# Nginx Reverse Proxy

Nginx handles:

- SSL termination
- HTTPS redirection
- Frontend routing
- Backend API proxying

### Frontend Requests

```nginx
location / {
    proxy_pass http://frontend;
}
```

### Backend Requests

```nginx
location /api {
    proxy_pass http://backend:5001/api;
}
```

---

# HTTPS Configuration

SSL certificates are mounted into the Nginx container:

```yaml
volumes:
  - /etc/letsencrypt:/etc/letsencrypt:ro
```

Certificates:

```bash
/etc/letsencrypt/live/thinkboard.navjotsingh.online/fullchain.pem

/etc/letsencrypt/live/thinkboard.navjotsingh.online/privkey.pem
```

---

# Access Application

Local:

```bash
http://localhost
```

Production:

```bash
https://thinkboard.navjotsingh.online
```

---

# Common Commands

### Enter Backend Container

```bash
docker exec -it thinkboard-backend sh
```

### Enter Frontend Container

```bash
docker exec -it thinkboard-frontend sh
```

### Enter Nginx Container

```bash
docker exec -it thinkboard-nginx sh
```

---

# Remove Unused Images

```bash
docker image prune -f
```

Remove everything unused:

```bash
docker system prune -a
```

---

# Troubleshooting

### Check Container Status

```bash
docker ps -a
```

### Check Docker Compose Services

```bash
docker compose ps
```

### Check Nginx Configuration

```bash
docker exec -it thinkboard-nginx nginx -t
```

### Check Backend Health

```bash
curl http://localhost:5001/api/notes
```

### Check HTTPS

```bash
curl -Ik https://thinkboard.navjotsingh.online
```

---

# Deployment Workflow

```text
GitHub Push
      ↓
GitHub Actions
      ↓
SSH into EC2
      ↓
Git Pull
      ↓
Docker Compose Down
      ↓
Docker Compose Up -d --build
      ↓
Production Deployment
```

---

# Author

Navjot Singh

ThinkBoard was built from scratch as a full-stack and DevOps learning project covering:

- React
- Node.js
- MongoDB
- Docker
- Docker Compose
- Nginx
- HTTPS (Let's Encrypt)
- AWS EC2
- GitHub Actions CI/CD