# Questions explored

- What is Continuous Deployment?
- How does a server receive new Docker images?
- What is the difference between CI and CD?
- How does Docker Hub fit into the pipeline?
- How does a server update an application?
- Why do deployment scripts exist?

# One important note

This:
./deploy.sh

is not yet fully automatic CD.

In real companies, GitHub Actions triggers the server automatically after a successful build. We are simulating that step first because it teaches the architecture without introducing AWS, SSH keys, or Kubernetes too early.
