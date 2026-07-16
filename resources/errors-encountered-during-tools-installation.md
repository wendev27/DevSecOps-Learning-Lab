# Errors Encountered During Tool Installation on Ubuntu

## Cause

Ubuntu 24 uses PEP 668 to protect the system Python environment.

This prevents users from installing packages directly into the operating system using pip, which could break system dependencies and tools.
hyoukasterben@hyoukasterben-Legion-5-15IMH6:~$ python3 -m pip install --user semgrep
error: externally-managed-environment

× This environment is externally managed
╰─> To install Python packages system-wide, try apt install
python3-xyz, where xyz is the package you are trying to
install.

    If you wish to install a non-Debian-packaged Python package,
    create a virtual environment using python3 -m venv path/to/venv.
    Then use path/to/venv/bin/python and path/to/venv/bin/pip. Make
    sure you have python3-full installed.

    If you wish to install a non-Debian packaged Python application,
    it may be easiest to use pipx install xyz, which will manage a
    virtual environment for you. Make sure you have pipx installed.

    See /usr/share/doc/python3.12/README.venv for more information.

note: If you believe this is a mistake, please contact your Python installation or OS distribution provider. You can override this, at the risk of breaking your Python installation or OS, by passing --break-system-packages.
hint: See PEP 668 for the detailed specification.

# fix and alternative

Step 1 — Check if pipx exists

Run:

pipx --version

If it says "command not found", install it:

sudo apt update

sudo apt install pipx
Step 2 — Install Semgrep safely

Now install Semgrep:

pipx install semgrep

Unlike:

pip install ...

pipx creates an isolated mini-environment:

Ubuntu System Python
↑
protected

Semgrep
↓
own virtual environment

This is actually another DevSecOps lesson:

apt → system packages
npm → JavaScript packages
pip → Python packages
pipx → standalone Python tools
Step 3 — Verify installation

Run:

semgrep --version
Quick bonus lesson 🧠

Ubuntu suggested three choices:

Option 1 (bad idea)
pip install --break-system-packages

Translation:

"I know what I'm doing. Let me touch the operating system."

We avoid this.

Option 2 (good for projects)
python3 -m venv venv

Used for:

Django
FastAPI
AI projects
Backend apps
Option 3 (best for tools)
pipx install semgrep

Used for:

Semgrep
Black
Poetry
HTTPie

And I want to point out something cool: the error message itself already taught you an important DevSecOps principle—

Protect the operating system.
Isolate dependencies.
Don't let tools modify critical environments.

That's the same mindset behind:

Docker containers
Kubernetes pods
CI/CD runners
Virtual environments
GitHub Actions

## Lessons Learned

- Protect the operating system.
- Isolate dependencies.
- Use the right package manager for the right ecosystem.
- Document installation problems and solutions.
