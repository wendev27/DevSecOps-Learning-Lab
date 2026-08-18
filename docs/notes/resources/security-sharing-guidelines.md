🔐 Security Sharing Guidelines
✅ Usually safe to share
pwd
ls
tree .
docker ps
docker images
docker network ls
docker compose ps
git status
git log

Examples:

Docker containers
Docker images
Port mappings
CI/CD screenshots
Git history
Project structure
⚠️ Review before sharing
ls -la ~
tree ~
find ~

These may expose:

~/.ssh
~/.aws
~/.config
~/.git-credentials
.env
❌ Never share
cat ~/.ssh/\*
cat ~/.git-credentials
cat .env
env
printenv

Never expose:

API keys
JWT secrets
MongoDB URIs
Supabase keys
AWS credentials
Docker tokens
SSH private keys
