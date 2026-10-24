# AWS Account Setup and Cost Safeguards

**Project:** DevSecOps Learning Lab  
**Related Project:** [SmartFlood V5 — AWS Migration](../../../../../../Smart-Flood-V5-AWS)  
**Phase:** AWS Account Preparation  
**Status:** In Progress  
**Last Updated:** October 24, 2026

## 1. Overview

This practice documents the preparation of an AWS account for hands-on cloud engineering and the SmartFlood V5 AWS migration.

The objective is to establish a secure, cost-conscious environment before deploying application infrastructure.

Rather than immediately provisioning production-like resources, this practice focuses on understanding AWS account access, billing, credits, EC2 configuration, networking, storage, and resource lifecycle management.

## 2. Objectives

- Understand AWS account and billing fundamentals.
- Review available AWS credits and their expiration.
- Establish visibility into cloud spending.
- Launch a temporary EC2 instance for learning purposes.
- Understand SSH access, security groups, and public IP addresses.
- Make deliberate decisions about compute, storage, and networking.
- Document configuration choices, trade-offs, and cleanup procedures.
- Prepare for subsequent Terraform and AWS staging infrastructure work.

## 3. Relationship to SmartFlood V5

SmartFlood V5 is being prepared for an AWS-based deployment architecture.

This practice establishes foundational AWS knowledge before infrastructure is provisioned through Terraform.

The intended progression is:

1. AWS account setup and cost safeguards.
2. SmartFlood containerization.
3. Local integration testing.
4. Terraform-based staging infrastructure.
5. Secure CI/CD implementation.
6. Staging deployment and validation.

**Important:** Account preparation is a prerequisite for the migration, not a replacement for containerization or infrastructure-as-code implementation.

## 4. Account and Billing Baseline

The following values were observed in the AWS console on October 24, 2026.

| Item                                | Observed Value                          |
| ----------------------------------- | --------------------------------------- |
| AWS region selected for the EC2 lab | Asia Pacific (Sydney), `ap-southeast-2` |
| Active AWS credits                  | $100 USD                                |
| Credits used                        | $0.00                                   |
| Credit expiration                   | August 10, 2027                         |
| Additional EC2 activity reward      | Not yet confirmed                       |
| AWS Budget                          | Pending verification                    |
| Billing alerts                      | Pending verification                    |

### Credit management

AWS credits can help offset eligible AWS charges, subject to their terms and applicable services.

The available $100 credit is treated as a limited learning budget, not as permission to provision resources without cost controls.

The additional $20 EC2 activity reward must not be included in the available budget until its completion and credit issuance are confirmed.

Credit balances and estimated usage should be checked periodically because console estimates may not update immediately.

## 5. EC2 Test Instance Configuration

The EC2 launch wizard was configured for a temporary learning instance.

| Setting              | Selected Configuration | Reason                                                                   |
| -------------------- | ---------------------- | ------------------------------------------------------------------------ |
| Operating system     | Amazon Linux 2023      | AWS-oriented Linux environment suitable for introductory cloud exercises |
| Architecture         | 64-bit x86             | Selected architecture for the lab                                        |
| Instance type        | `t3.micro`             | Small instance suitable for basic Linux and EC2 exercises                |
| Instance count       | 1                      | Limits unnecessary resource consumption                                  |
| Root volume          | 8 GiB                  | Sufficient starting capacity for a minimal test instance                 |
| Volume type          | `gp3`                  | General-purpose SSD storage                                              |
| Additional volumes   | None                   | No additional persistent storage required                                |
| File systems         | None                   | EFS, FSx, and S3 Files are unnecessary for this exercise                 |
| Public IP assignment | Enabled                | Allows external connectivity for the intended SSH exercise               |
| Advanced details     | Defaults retained      | Avoids introducing unnecessary configuration variables                   |

### Why use a small instance?

The objective is to learn how EC2 instances are created, accessed, monitored, and terminated.

A small instance is preferable to a larger instance when the workload does not require additional CPU or memory.

The `t3.micro` instance has limited memory and is not intended to host the complete SmartFlood application stack.

### Why use an 8 GiB root volume?

The root EBS volume contains the operating system and associated system files.

An 8 GiB volume keeps the initial configuration simple and limits storage allocation. It may be insufficient for a container-heavy workload, in which case capacity must be evaluated before deployment.

### Why leave advanced details unchanged?

Advanced settings introduce additional decisions involving IAM instance profiles, shutdown behavior, recovery, hibernation, and termination protection.

For this introductory exercise, default settings reduce complexity. These defaults must not automatically be carried into production infrastructure without reviewing their security and operational implications.

## 6. Network and Security Group Decisions

A security group acts as a stateful virtual firewall controlling traffic to and from the EC2 instance.

The intended configuration for this lab is:

| Protocol |    Port | Intended Source                   | Purpose                           |
| -------- | ------: | --------------------------------- | --------------------------------- |
| SSH      |  TCP 22 | Current public IP address (`/32`) | Administrative access             |
| HTTP     |  TCP 80 | Not enabled                       | No web server required            |
| HTTPS    | TCP 443 | Not enabled                       | No public HTTPS endpoint required |

### Why restrict SSH to My IP?

The EC2 launch tutorial offers an SSH rule using `0.0.0.0/0`, which permits connection attempts from any IPv4 address.

For this practice, restricting SSH to the current public IP address reduces the number of hosts that can attempt to connect.

This is a more appropriate default for a personal learning instance.

**Operational consideration:** If the public IP address changes, the security group rule may need to be updated.

### Why disable HTTP and HTTPS?

The current exercise focuses on instance creation and administrative access rather than serving an application.

Opening ports that are not required increases unnecessary network exposure.

HTTP and HTTPS should be introduced later when an application endpoint is intentionally deployed and its ingress requirements have been reviewed.

### Important security note

A restricted security group is only one layer of protection. Secure key management, operating system updates, least-privilege access, and resource monitoring remain necessary.

## 7. SSH Key Pair Management

The selected key pair name is:

`smartflood-ec2-lab-key`

The key pair is intended for securely authenticating to the EC2 instance.

The private key must be stored securely on the local machine and must not be committed to Git.

Recommended handling:

- Store the private key outside the project repository.
- Restrict local file permissions.
- Never upload the private key to GitHub.
- Never include private key contents in documentation or screenshots.
- Keep a secure backup if the key is required for future access.

For OpenSSH-compatible private keys, the file commonly uses the `.pem` extension.

## 8. Storage and Encryption Considerations

The launch configuration shows an 8 GiB `gp3` root volume marked as not encrypted.

This is the observed configuration, not a recommendation to leave production volumes unencrypted.

For this disposable learning instance, no sensitive data should be stored.

For production or persistent staging infrastructure, review EBS encryption requirements and encryption defaults before provisioning. Encryption at rest is a sensible baseline for protecting stored application data.

The absence of additional EBS volumes does not mean the instance has no storage; the root volume remains attached.

## 9. Cost Management Strategy

AWS resources can incur charges even when an application is not actively being used.

The learning workflow should include:

1. Review the applicable AWS pricing before provisioning a service.
2. Configure an AWS Budget and billing notifications.
3. Verify the services eligible for the available credits.
4. Monitor estimated usage and remaining credits.
5. Stop instances when they are not needed, where appropriate.
6. Terminate disposable instances after completing the exercise.
7. Review EBS volumes, snapshots, Elastic IP addresses, load balancers, and other resources that may remain billable.

**Important:** Stopping an EC2 instance does not necessarily eliminate every associated cost. For example, attached EBS volumes can continue to incur storage charges.

Budgets and alerts provide visibility; they do not automatically prevent all spending.

## 10. Verification Checklist

### Account and billing

- [x] Confirmed $100 in active AWS credits.
- [x] Confirmed no credit usage was displayed at the time of inspection.
- [ ] Verify AWS Budget configuration.
- [ ] Verify billing notifications.
- [ ] Confirm which AWS services are eligible for the credits.
- [ ] Confirm whether the EC2 activity reward has been issued.

### EC2 configuration

- [x] Selected Amazon Linux 2023.
- [x] Selected `t3.micro`.
- [x] Selected one instance.
- [x] Selected an 8 GiB `gp3` root volume.
- [x] Left additional file systems unconfigured.
- [ ] Verify the selected key pair.
- [ ] Verify SSH is restricted to the current public IP.
- [ ] Review the final configuration before launch.
- [ ] Confirm the instance reaches `Running`.
- [ ] Complete the EC2 tutorial and verify the activity reward status.

### Cleanup

- [ ] Confirm the instance is no longer needed.
- [ ] Terminate the disposable test instance.
- [ ] Check for remaining billable resources.
- [ ] Review billing and credit usage after cleanup.

## 11. Lessons Learned

This practice introduces the following AWS concepts:

- AWS accounts, regions, and service availability.
- AWS credits and billing visibility.
- EC2 instances and Amazon Machine Images.
- Instance families and compute sizing.
- Security groups and inbound network rules.
- SSH key pairs and private key handling.
- Public IP addresses and remote connectivity.
- EBS root volumes and storage allocation.
- Encryption at rest.
- Cloud resource lifecycle management.
- Cost awareness and cleanup procedures.

These concepts form the foundation for the subsequent infrastructure-as-code, CI/CD, and staging deployment exercises.

## 12. Next Steps

1. Complete and verify the EC2 learning activity.
2. Establish cost alerts and verify the AWS Budget configuration.
3. Finish the local SmartFlood containerization and integration testing stages.
4. Review the required AWS architecture and region before deploying staging infrastructure.
5. Implement Terraform configuration for the approved architecture.
6. Apply least-privilege IAM and security group policies.
7. Deploy and validate the staging environment.
8. Document teardown and cost verification.

## 13. References

- [Amazon EC2 User Guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)
- [EC2 Security Groups](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html)
- [Amazon EBS Volumes](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes.html)
- [AWS Budgets User Guide](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html)
- [AWS Pricing](https://aws.amazon.com/pricing/)

---

**Practice principle:** Every AWS resource should have a documented purpose, an understood cost, a justified security configuration, and a defined cleanup procedure.
