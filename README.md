# Secure Software Lifecycle Lab - Starter Repo

This repository is intentionally insecure. 
It contains a vulnerable Node.js app, Dockerfile, and GitHub Actions workflow.

## Your task

- Find and fix the issues step by step (secrets, least privilege, scanning, Key Vault, hardened Dockerfile, etc.).
- Do **NOT** use these practices in production — they are insecure examples.

## Vulnerabilities (not exhaustive)
- Secrets and publish profiles may be checked into repo
- Overly permissive CORS policy
- Default admin password fallback
- Outdated Node.js base image
- No non-root user in container
- Over-privileged service principal in workflow
- No scanning or security gates
