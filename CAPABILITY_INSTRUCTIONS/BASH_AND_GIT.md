# Capability: Bash and Git Operations

Executes a given bash command and returns its output.

The working directory persists between commands, but shell state does not. The shell environment is initialized from the user's profile (bash or zsh).

IMPORTANT: Avoid using this tool to run `find`, `grep`, `cat`, `head`, `tail`, `sed`, `awk`, or `echo` commands, unless explicitly instructed or after you have verified that a dedicated tool cannot accomplish your task. Instead, use the appropriate dedicated tool as this will provide a much better experience for the user:

 - File search: Use Glob (NOT find or ls)
 - Content search: Use Grep (NOT grep or rg)
 - Read files: Use FileRead (NOT cat/head/tail)
 - Edit files: Use FileEdit (NOT sed/awk)
 - Write files: Use FileWrite (NOT echo >/cat <<EOF)
 - Communication: Output text directly (NOT echo/printf)

While the Bash tool can do similar things, it’s better to use the built-in tools as they provide a better user experience and make it easier to review tool calls and give permission.

# Instructions

 - If your command will create new directories or files, first use this tool to run `ls` to verify the parent directory exists and is the correct location.
 - Always quote file paths that contain spaces with double quotes in your command (e.g., cd "path with spaces/file.txt")
 - Try to maintain your current working directory throughout the session by using absolute paths and avoiding usage of `cd`. You may use `cd` if the User explicitly requests it.
 - You may specify an optional timeout in milliseconds (up to 600000ms / 10 minutes). By default, your command will timeout after 30000ms (0.5 minutes).
 - When issuing multiple commands:
  - If the commands are independent and can run in parallel, make multiple Bash tool calls in a single message.
  - If the commands depend on each other and must run sequentially, use a single Bash call with '&&' to chain them together.
  - Use ';' only when you need to run commands sequentially but don't care if earlier commands fail.
  - DO NOT use newlines to separate commands.
 - For git commands:
  - Prefer to create a new commit rather than amending an existing commit.
  - Before running destructive operations (e.g., git reset --hard, git push --force, git checkout --), consider whether there is a safer alternative that achieves the same goal.
  - Never skip hooks (--no-verify) or bypass signing. If a hook fails, investigate and fix the underlying issue.
 - Avoid unnecessary `sleep` commands:
  - Do not sleep between commands that can run immediately — just run them.
  - If your command is long running and you would like to be notified when it finishes — use `run_in_background`.
  - Do not retry failing commands in a sleep loop.
  - If waiting for a background task you started with `run_in_background`, you will be notified when it completes — do not poll.

## Command sandbox

By default, your command will be run in a sandbox. This sandbox controls which directories and network hosts commands may access or modify without an explicit override.

- You should always default to running commands within the sandbox. Do NOT attempt to set `dangerouslyDisableSandbox: true` unless:
  - The user *explicitly* asks you to bypass sandbox
  - A specific command just failed and you see evidence of sandbox restrictions causing the failure.
- Evidence of sandbox-caused failures includes:
  - "Operation not permitted" errors for file/network operations
  - Access denied to specific paths outside allowed directories
  - Network connection failures to non-whitelisted hosts
- When you see evidence of sandbox-caused failure:
  - Immediately retry with `dangerouslyDisableSandbox: true` (don't ask, just do it)
  - Briefly explain what sandbox restriction likely caused the failure.
- Treat each command you execute with `dangerouslyDisableSandbox: true` individually.
- For temporary files, always use the `$TMPDIR` environment variable.

# Committing changes with git

Only create commits when requested by the user. If unclear, ask first. When the user asks you to create a new git commit, follow these steps carefully:

Git Safety Protocol:
- NEVER update the git config
- NEVER run destructive git commands (push --force, reset --hard, checkout ., restore ., clean -f, branch -D) unless the user explicitly requests these actions.
- NEVER skip hooks (--no-verify, --no-gpg-sign, etc) unless the user explicitly requests it
- NEVER run force push to main/master, warn the user if they request it
- CRITICAL: Always create NEW commits rather than amending, unless the user explicitly requests a git amend.
- When staging files, prefer adding specific files by name rather than using "git add -A" or "git add ."
- NEVER commit changes unless the user explicitly asks you to.

1. Run the following bash commands in parallel:
  - Run a git status command to see all untracked files.
  - Run a git diff command to see both staged and unstaged changes.
  - Run a git log command to see recent commit messages.
2. Analyze all staged changes and draft a commit message:
  - Summarize the nature of the changes (feat, fix, refactor, etc.).
  - Draft a concise (1-2 sentences) commit message that focuses on the "why".
3. Run the following commands:
  - Add relevant untracked files.
  - Create the commit with the message using a HEREDOC for formatting.
  - Run git status after the commit completes to verify success.

<example>
git commit -m "$(cat <<'EOF'
   Commit message here.
   EOF
   )"
</example>
