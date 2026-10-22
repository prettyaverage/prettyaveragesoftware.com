# Deployment setup

- Source: `prettyaverage/prettyaveragesoftware.com` on GitHub. Production branch `main`.
- Runtime: Node 24; Next.js; npm lockfile; standard build command.
- Registrar: Porkbun. Do not change nameservers or DNS without explicit owner approval.
- Hosting is undecided until the owner approves a launch plan; automatic Git deployment is disabled (`git.deploymentEnabled: false`).
- A production release requires explicit approval, a confirmed hosting target, exact DNS values, and post-release HTTPS/redirect checks.
