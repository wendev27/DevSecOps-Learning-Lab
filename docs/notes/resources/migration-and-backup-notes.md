# Why backups are dangerous

Imagine a company stores backups containing:

Usernames
Emails
Phone numbers
Password hashes
API keys
Credit card tokens
Internal business data

A hacker might not even bother attacking the live database if they find this:

backups/
├── backup_2026_07_18.sql
├── backup_2026_07_17.sql
└── backup_2026_07_16.sql

because stealing a backup is often easier than breaking into a running database.

What companies do in production

Good backup systems usually follow three rules:

1. Encrypt the backup

Instead of:

backup.sql

they store:

backup.sql.gpg

or:

backup.enc

using encryption tools such as:

GPG
OpenSSL
Cloud provider encryption

Without the decryption key, the file is useless.

2. Restrict access

Not everyone in the company can access backups.

For example:

Junior Developer ❌
Intern ❌
Database Admin ✅
Security Team ✅

This follows the principle of least privilege.

3. Store backups separately

A common rule is:

3 copies
2 different media
1 off-site copy

For example:

Production DB
↓
Encrypted backup
↓
AWS S3
↓
Another region

because if the server dies or ransomware encrypts everything, you still have another copy.

There's also a funny saying among DevOps engineers:

Backups are just "future restores."

A backup is only valuable if:

It exists.
It's encrypted.
You can restore it.
You've actually tested the restore.

And here's the uncomfortable truth: many companies discover that their backups are broken only after they desperately need them. 😅
