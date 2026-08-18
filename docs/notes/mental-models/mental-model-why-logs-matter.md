Before Docker:

node server.js

gave:

Server running on port 3000
[INFO] Home route accessed
[HEALTH] Health check requested

After Docker:

docker compose up --build

gave:

monitoring-app | Server running on port 3000
monitoring-app | [HEALTH] Health check requested
monitoring-app | [INFO] Home route accessed

The logs are exactly the same—but now they're coming from inside the container.

🧠 Mental model: Why logs matter

Imagine you're a DevOps engineer at 2 AM and your boss says:

"The API is down."

Without logs:

🤷

With logs:

[INFO] Request received

[ERROR] Database connection failed

[ERROR] Redis timeout

[HEALTH] unhealthy

Logs are basically the application's diary.
