# 🌐 Checkpoint 20 — HTTPS and SSL Certificates

## 🎯 Objective

Understand how modern web applications securely communicate over the internet using HTTPS and SSL certificates.

This checkpoint focused on answering an important question:

> "How does a browser know that a website is authentic and secure?"

To answer that question, I explored:

- Nginx reverse proxies
- HTTP and HTTPS
- SSL certificates
- Self-signed certificates
- Certificate Authorities
- Let's Encrypt
- Automatic certificate renewal

---

# 📚 Topics Covered

- Nginx
- Reverse Proxy
- HTTP vs HTTPS
- SSL Certificates
- Self-signed certificates
- Certificate Authorities (CA)
- Let's Encrypt
- Certbot
- Automatic certificate renewal

---

# 🤔 Questions Explored

- How does Nginx route traffic to different services?
- Why do applications use reverse proxies?
- What is the difference between HTTP and HTTPS?
- Why does Chrome trust Google but not localhost?
- What is an SSL certificate?
- Why are private keys secret?
- Who issues trusted certificates?
- How are certificates renewed in production?

---

# 🔬 Labs and Experiments

## Reverse Proxy Lab

Created:

```text
labs/networking/reverse-proxy-lab/
```

Project structure:

```text
reverse-proxy-lab/
├── backend/
│   ├── app.js
│   └── Dockerfile
├── frontend/
│   └── index.html
├── ssl/
│   ├── nginx.crt
│   └── nginx.key
├── compose.yaml
├── nginx.conf
└── README.md
```

---

## Backend Service

Created a simple Node.js API:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello from the backend API 🔥');
});

server.listen(4000, () => {
  console.log('Backend running on port 4000');
});
```

---

## Nginx Reverse Proxy

Configured Nginx to route requests:

```nginx
server {
    listen 80;

    location / {
        proxy_pass http://frontend:80;
    }

    location /api {
        proxy_pass http://backend:4000;
    }
}
```

Traffic flow:

```text
Browser
    ↓
Nginx
    ↓
Frontend (/)

Browser
    ↓
Nginx
    ↓
Backend (/api)
```

---

## HTTPS Configuration

Configured HTTPS using a self-signed SSL certificate:

```nginx
server {
    listen 80;

    return 301 https://localhost:8443$request_uri;
}

server {
    listen 443 ssl;

    ssl_certificate /etc/nginx/ssl/nginx.crt;
    ssl_certificate_key /etc/nginx/ssl/nginx.key;

    location / {
        proxy_pass http://frontend:80;
    }

    location /api {
        proxy_pass http://backend:4000;
    }
}
```

---

## SSL Certificate Generation

Generated local certificates using OpenSSL:

```bash
openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout ssl/nginx.key \
  -out ssl/nginx.crt
```

Learned:

- `nginx.crt` contains the public certificate.
- `nginx.key` contains the private key.
- Private keys should never be committed to Git.

---

## Browser Security Warning

Observed the browser warning:

```text
NET::ERR_CERT_AUTHORITY_INVALID
```

Learned that:

- HTTPS encryption was working.
- The browser could not verify the certificate issuer.
- Self-signed certificates are not trusted by browsers.

---

## Certificate Authorities

Explored trusted Certificate Authorities:

- Let's Encrypt
- DigiCert
- Sectigo
- GlobalSign

Learned that browsers trust websites because Certificate Authorities verify domain ownership and sign certificates.

---

## Automatic Certificate Renewal

Learned that production environments commonly use:

```text
Nginx + Certbot + Let's Encrypt
```

to automatically renew certificates every 90 days.

---

# 🧠 Key Concepts

## Reverse Proxy

A reverse proxy receives incoming traffic and forwards requests to the correct service.

Example:

```text
localhost:8443/
        ↓
Frontend container

localhost:8443/api
        ↓
Backend container
```

---

## HTTPS

HTTPS encrypts communication between the browser and the server.

```text
Browser
    ↓
Encrypted connection 🔒
    ↓
Server
```

---

## SSL Certificate

An SSL certificate proves the identity of a website.

```text
Certificate (.crt)
```

---

## Private Key

The private key is used to decrypt encrypted traffic.

```text
Private Key (.key)
```

Private keys must remain secret.

---

## Certificate Authority

Certificate Authorities verify ownership of domains and sign certificates that browsers trust.

---

# 💭 Reflection

Before this checkpoint, HTTPS felt like a feature that browsers automatically provided.

After building a reverse proxy and generating my own SSL certificates, I now understand that HTTPS depends on trust relationships between browsers, Certificate Authorities, reverse proxies, and servers.

I also learned that encryption and trust are different concepts:

- Encryption protects data.
- Certificates verify identity.

Modern platforms such as Vercel, GitHub, and Google automate these processes, but the underlying infrastructure follows the same principles.

---

# 🚀 Next Checkpoint

☁️ Phase 6 — Cloud & Orchestration

Upcoming topics:

- Kubernetes
- Pods
- Deployments
- Services
- Ingress
- Scaling
- Cloud infrastructure