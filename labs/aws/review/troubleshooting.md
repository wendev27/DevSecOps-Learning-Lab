# Troubleshooting

When a lab fails, record the command or action, the exact error, and the
relevant logs before changing configuration. Check these areas first:

- AWS account, Region, and active identity
- IAM permissions and resource policies
- Container build output, image tags, and application logs
- VPC routes, security groups, and health checks
- Terraform plan output and state/backend configuration
- CI/CD identity claims and role trust policy
