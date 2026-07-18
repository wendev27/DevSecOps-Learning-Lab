Step 0 — Reset our mental model

Right now, your database looks something like this:

devsecops_lab

├── users
│ ├── id
│ ├── username
│ ├── email
│ └── created_at
│
└── tasks
├── id
├── title
├── completed
└── created_at

Imagine six months later, SmartFlood needs phone numbers:

users

├── id
├── username
├── email
├── phone
└── created_at

How do you tell:

your teammates,
the CI/CD pipeline,
the production server,

to make the exact same change?

Migrations are the answer.
