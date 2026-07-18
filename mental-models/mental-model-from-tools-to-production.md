Let me tighten a few parts so your mental model becomes even sharper.

✅ Redis

You got the core idea right.

The only tweak I'd make is this:

Redis doesn't cache prompts by itself. Your application decides what to cache.

A more precise flow is:

User #1
↓
Backend
↓
Redis: "Do I already have this?"
↓
Cache miss
↓
PostgreSQL
↓
Save result in Redis (TTL = 60s)
↓
Return result

Users #2–#10000
↓
Backend
↓
Redis
↓
Cache hit ⚡
↓
Return cached result

The biggest insight is:

Redis reduces repeated expensive work.

✅ Volumes

Perfect.

The only terminology correction:

Containers are ephemeral, not "empherical" 😆.

Your understanding is correct:

Container dies ❌

Volume survives ✅

That's why Docker separates:

Compute → container
Data → volume
⚠️ HTTPS

You are partly right, but there is an important distinction.

HTTPS is not primarily there "to avoid hacking websites."

HTTPS provides:

Encryption → other people can't read the traffic.
Authentication → the certificate proves you are really talking to google.com.
Integrity → nobody changed the data in transit.

The certificate authority (CA) system creates trust:

Browser
↓ trusts

Certificate Authority
↓ verifies

Website certificate

Without HTTPS:

You → Wi-Fi attacker → Bank website

With HTTPS:

You → 🔒 encrypted tunnel → Bank website
✅ Migrations

Yep, exactly.

It's basically:

"Git for database schemas."

Instead of sending your coworker:

"Bro, add a column called phone_number."

You commit:

003_add_phone_number.sql

and everyone applies the same change.

⚠️ CI failures

You mixed CI and security scanners a little.

CI fails builds for any automated check, such as:

Unit tests ❌
Linting ❌
Formatting ❌
Semgrep ❌
CodeQL ❌
Trivy ❌
Build errors ❌

The scanner itself doesn't fail the build. The workflow decides:

exit-code: 1

which means:

"If this step detects something serious, stop everything."
