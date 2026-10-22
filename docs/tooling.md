# Tooling and shared skills

Node 24 LTS is installed at `/opt/homebrew/opt/node@24/bin`; .nvmrc and package engines pin the project to 24. The machine's default Node was not changed.
GitHub CLI uses the existing authenticated account. The skills CLI is installed globally.

Shared skills installed with skills.sh for Codex:

```sh
skills add anthropics/skills -g -a codex -s frontend-design -y
skills add vercel-labs/agent-skills -g -a codex -s vercel-react-best-practices web-design-guidelines -y
```

Canonical files are in `~/.agents/skills/`. They are shared across projects and available on the next Codex turn.
Next best practices now ship with version-matched framework docs in `node_modules/next/dist/docs/`; the old `vercel-labs/next-skills` package has moved.

Track release decisions in GitHub issues/PRs.

Commits use the user's Git identity and omit Codex/ChatGPT/co-author attribution.
