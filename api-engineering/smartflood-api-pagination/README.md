# SmartFlood API Pagination & Safe API Change Lab

> A real-world DevSecOps learning lab based on the SmartFlood V3.2 Capstone.

This lab documents how a real Capstone API endpoint was inspected, improved, verified, and prepared for review without unnecessarily changing the surrounding system.

The goal was not simply to "add pagination."

The goal was to practice a disciplined engineering workflow:

```text
Inspect
  ↓
Understand existing behavior
  ↓
Identify API problems
  ↓
Make one scoped change
  ↓
Validate input
  ↓
Preserve security boundaries
  ↓
Verify behavior
  ↓
Review the diff
  ↓
Commit
  ↓
Push
  ↓
Prepare evidence
```

---

## 1. Case Study

### Project

**SmartFlood V3.2**

SmartFlood is a flood monitoring and emergency relief management system with:

- Next.js frontend
- Next.js API routes / backend services
- Supabase
- MongoDB sensor data
- AI-assisted relief recommendations
- AHP / Fuzzy / ILP decision logic
- Role-based access control
- Barangay-scoped operations
- Emergency relief campaign lifecycle management

For this lab, the focus was intentionally limited to the API layer.

---

# 2. Learning Objectives

After completing this lab, you should understand how to:

- [ ] Inventory real API endpoints
- [ ] Evaluate REST API naming
- [ ] Choose appropriate HTTP methods
- [ ] Use meaningful HTTP status codes
- [ ] Design consistent API error responses
- [ ] Implement page/offset pagination
- [ ] Validate pagination parameters
- [ ] Prevent unbounded list queries
- [ ] Preserve authentication and authorization
- [ ] Preserve tenant/barangay data isolation
- [ ] Review changes using Git
- [ ] Compare behavior before and after a change
- [ ] Use Git worktrees for safe historical testing
- [ ] Verify changes with real build/typecheck commands
- [ ] Keep changes small and reviewable
- [ ] Prepare evidence for a code review or technical submission

---

# 3. Real API Being Studied

The main endpoint used in this lab was:

```http
GET /api/emergency/distribution/history
```

Its purpose is to retrieve emergency relief distribution records.

Before the change, pagination was optional.

After the change, pagination is standardized.

---

# 4. API Inventory

The SmartFlood API contains several emergency relief endpoints.

Examples include:

```text
GET   /api/emergency/distribution/history
GET   /api/emergency/distribution/beneficiary-status
GET   /api/emergency/distribution/not-received
GET   /api/emergency/distribution/report

POST  /api/emergency/distribution/confirm
POST  /api/emergency/distribution/verify

GET   /api/emergency/campaigns/history

POST  /api/emergency/campaigns/[batchId]/start
POST  /api/emergency/campaigns/[batchId]/close

GET   /api/emergency/notifications
```

When auditing an API, record:

| Property      | Question                                             |
| ------------- | ---------------------------------------------------- |
| Method        | Is GET/POST/PATCH/etc. appropriate?                  |
| Path          | Does the URL clearly represent the resource?         |
| Purpose       | What does the endpoint actually do?                  |
| Status codes  | Does the response communicate the outcome correctly? |
| Pagination    | Can the endpoint return an unbounded amount of data? |
| Validation    | Are external parameters validated?                   |
| Authorization | Who is allowed to access it?                         |
| Scope         | Can users access data outside their allowed scope?   |

---

# 5. REST Naming Review

During the audit, several paths were identified as candidates for clearer naming.

These were proposed only as documentation exercises.

### Example 1

Current:

```text
/api/emergency/distribution/history
```

Proposed:

```text
/api/emergency/distributions
```

Reason:

The endpoint represents distribution records. `history` describes a view of the data rather than the resource itself.

### Example 2

Current:

```text
/api/emergency/distribution/not-received
```

Proposed:

```text
/api/emergency/distribution-beneficiaries?status=not_received
```

Reason:

"Not received" represents a beneficiary status/filter rather than a separate resource.

### Example 3

Current:

```text
/api/emergency/allocation/current
```

Proposed:

```text
/api/emergency/allocations/current
```

Reason:

This provides more consistent plural resource naming.

These paths were **not renamed as part of this lab**.

The purpose was to practice API design analysis without introducing unnecessary breaking changes.

---

# 6. Problem Identified

The original distribution history endpoint had several issues.

### Before

```http
GET /api/emergency/distribution/history
```

Pagination was only activated when pagination parameters were supplied.

Without pagination parameters, the endpoint could return a large number of records and did not provide useful pagination metadata.

Invalid values could also be silently normalized.

For example:

```text
?page=abc
```

could be converted into a default page rather than being rejected.

Similarly:

```text
?limit=101
```

could be silently capped.

---

# 7. Improvement Implemented

The endpoint was changed to always use pagination.

### New defaults

```text
page  = 1
limit = 10
```

### Maximum limit

```text
100
```

### Valid request

```http
GET /api/emergency/distribution/history?page=1&limit=10
```

### Successful response

```json
{
  "success": true,
  "data": {
    "distributions": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 0,
      "totalPages": 1
    }
  }
}
```

The existing response structure was preserved while adding predictable pagination metadata.

---

# 8. Pagination Strategy

The implementation uses page/offset pagination.

Conceptually:

```text
offset = (page - 1) × limit
```

Example:

```text
page 1 → records 1–10
page 2 → records 11–20
page 3 → records 21–30
```

The backend uses Supabase range queries:

```text
.range(from, to)
```

The endpoint also obtains the total number of records so that it can calculate:

```text
totalPages
```

### Why page/offset?

The existing API already used `page` and `limit`, so retaining this model minimized API contract changes and kept the implementation compatible with the existing frontend.

---

# 9. Input Validation

Pagination parameters are external input and must not be blindly trusted.

### Invalid page

```http
GET /api/emergency/distribution/history?page=abc
```

Returns:

```http
400 Bad Request
```

```json
{
  "success": false,
  "error": "page must be a positive integer."
}
```

### Invalid limit

```http
GET /api/emergency/distribution/history?limit=101
```

Returns:

```http
400 Bad Request
```

This prevents the API from silently accepting malformed or excessive pagination requests.

---

# 10. Error Contract

The endpoint follows a consistent application-level error shape:

```json
{
  "success": false,
  "error": "Human-readable error message"
}
```

This gives frontend consumers a predictable structure.

The important principle is:

```text
Invalid request
      ↓
Correct 4xx status
      ↓
Consistent JSON error
```

rather than:

```text
Invalid request
      ↓
200 OK
      ↓
silently changed input
```

---

# 11. Security Considerations

The pagination change was deliberately scoped so that it did not bypass existing security controls.

The following were preserved:

### Authentication

The endpoint continues using the existing dashboard viewer/session mechanism.

### RBAC

Existing role-based authorization remains intact.

### Barangay scoping

Users cannot use pagination parameters to bypass their authorized barangay scope.

### Campaign isolation

The existing:

```text
batchId / batch_id
```

filter remains supported.

Pagination changes **how many records are returned**, not **which records the user is authorized to access**.

---

# 12. Database Safety

Pagination should happen as close to the database as practical.

Avoid:

```text
Database
   ↓
5000 records
   ↓
API
   ↓
Frontend
   ↓
slice first 10
```

Prefer:

```text
Frontend
   ↓
?page=1&limit=10
   ↓
API
   ↓
Database range query
   ↓
10 records
```

This reduces:

- database result size
- network traffic
- backend memory usage
- frontend processing
- response size

It also provides a predictable upper bound for list responses.

---

# 13. Git Workflow

The change was developed on a dedicated branch:

```text
phase-2-api-pagination
```

The workflow was:

```text
main
 │
 └── phase-2-api-pagination
          │
          ├── inspect
          ├── modify
          ├── verify
          ├── review diff
          ├── commit
          └── push
```

The final commit was:

```text
7240ef0 feat(api): standardize distribution history pagination
```

The final change was intentionally small:

```text
2 backend files
```

No unrelated frontend, AI, database, or infrastructure changes were included.

---

# 14. Git Worktrees

A Git worktree was used to safely inspect the previous implementation.

Example:

```bash
git worktree add ../SmartFloodV3.2-act4-before HEAD^
```

This allowed the previous version to run separately without replacing files in the current working tree.

After verification:

```bash
git worktree remove ../SmartFloodV3.2-act4-before
```

### Why this matters

Git worktrees are useful for:

- before/after testing
- regression investigation
- comparing releases
- reproducing historical behavior
- safely inspecting old versions

---

# 15. Verification

The implementation was verified using the real project.

### TypeScript

```bash
npx tsc --noEmit
```

### Production build

```bash
npm run build
```

The production build completed successfully.

Formal automated backend tests were not available because the backend package did not contain a test script.

Therefore:

```text
Build verification ≠ full automated test coverage
```

This distinction should always be reported honestly.

---

# 16. Before / After Evidence

A proper API change should be demonstrated rather than simply claimed.

### BEFORE

```http
GET /api/emergency/distribution/history
```

Expected behavior:

```text
200 OK
distributions present
pagination metadata absent
```

### AFTER

```http
GET /api/emergency/distribution/history
```

Expected behavior:

```text
200 OK
distributions present
pagination metadata present
page = 1
limit = 10
```

### Pagination test

```http
GET /api/emergency/distribution/history?limit=5
```

### Validation test

```http
GET /api/emergency/distribution/history?page=abc
```

Expected:

```text
400 Bad Request
```

### Campaign filter

```http
GET /api/emergency/distribution/history?batchId=<REAL_BATCH_ID>&page=1&limit=5
```

This demonstrates that filtering continues to work together with pagination.

---

# 17. AI-Assisted Development

AI coding agents were used as engineering assistants rather than autonomous authorities.

The workflow was:

```text
Human defines scope
        ↓
AI inspects repository
        ↓
AI proposes implementation
        ↓
Human reviews
        ↓
AI verifies
        ↓
Human checks diff
        ↓
Git commit / PR
```

Important principle:

> AI-generated code is not evidence that the implementation works.

Evidence comes from:

- source inspection
- typechecking
- builds
- tests
- manual API verification
- Git diff review
- human review

---

# 18. Repository Guardrails

The SmartFlood V3.2 repository also uses AI-agent guardrails to reduce accidental changes to protected areas.

A protected backend workflow can require an explicit authorization phrase before backend modifications are allowed.

The broader principle is:

```text
Default deny
     ↓
Explicit authorization
     ↓
Scoped modification
     ↓
Verification
```

This is an example of applying least-privilege thinking to AI-assisted development.

---

# 19. DevSecOps Lessons

This lab demonstrates several DevSecOps principles.

### Secure change management

Keep changes small and reviewable.

### Input validation

Treat API parameters as untrusted input.

### Least privilege

Preserve existing authentication and authorization boundaries.

### Data isolation

Ensure pagination cannot become an authorization bypass.

### Resource protection

Prevent unbounded database/API responses.

### Traceability

Use Git history and commits to establish exactly what changed.

### Verification

Use actual command output and API behavior rather than assumptions.

### Human oversight

Require human review for security-sensitive changes.

---

# 20. What I Learned

The main lesson from this exercise was that backend engineering is not only about making an endpoint "work."

A good change should also be:

```text
Correct
+
Secure
+
Bounded
+
Backward-compatible
+
Observable
+
Testable
+
Reviewable
+
Traceable
```

The pagination change was small, but it required thinking about API contracts, validation, database queries, authorization, data isolation, Git history, testing, and evidence.

That is the mindset I want to carry into future backend and DevSecOps work.

---

# 21. Key Commands

```bash
# Inspect repository state
git status
git status --short

# Inspect changes
git diff
git diff --stat
git diff --check
git diff --name-status

# Inspect Git history
git show HEAD
git show HEAD^
git show --stat HEAD

# Create a temporary historical worktree
git worktree add ../before HEAD^

# Remove it
git worktree remove ../before

# Verify
npx tsc --noEmit
npm run build

# Commit
git add <files>
git commit -m "feat(api): standardize distribution history pagination"

# Push
git push origin <branch>
```

---

# 22. Suggested Exercises

After completing this lab, reproduce the concepts on a small practice API.

### Exercise 1 — Inventory

Find 8–10 endpoints and document:

- method
- path
- purpose
- status codes

### Exercise 2 — Pagination

Take an unbounded list endpoint and implement:

```text
page
limit
total
totalPages
```

### Exercise 3 — Validation

Make the endpoint reject:

```text
page=abc
page=0
limit=abc
limit=0
limit=1000
```

### Exercise 4 — Error Contract

Standardize errors:

```json
{
  "success": false,
  "error": "..."
}
```

### Exercise 5 — Security

Verify that pagination cannot bypass:

- authentication
- authorization
- tenant/barangay scope

### Exercise 6 — Git

Create a feature branch, make one scoped change, review the diff, commit it, and create a PR.

### Exercise 7 — Historical Verification

Use Git worktrees to compare the old and new behavior.

---

# 23. Takeaway

A production-minded API change is not:

```text
"I added pagination."
```

It is:

```text
"I identified an API problem,
implemented a bounded solution,
validated external input,
preserved authorization and data scope,
verified the behavior,
reviewed the exact diff,
and left an auditable Git trail."
```

That workflow is the real lesson of this lab.
