# Claude Code Verbatim System Prompts & Logic

> **The ultimate blueprint for building AI agents.** 100% Verbatim system prompts, capability instructions, and tool logic extracted directly from the Claude Code open-source repository. Organized into a professional docs interface for researchers and developers.

## [Docs Web App](https://saimbuilds.github.io/Claude-System-Prompts/) (Syncing to GitHub Pages)

This repository contains the exact, verbatim system prompts and capability instructions extracted directly from the **Claude Code** open-source repository.

## Structure

### Global Instructions ([prompts/](prompts/))
1. **[Role and Introduction](prompts/01_role_and_intro.md)**: Core persona and safety boundaries.
2. **[System Rules](prompts/02_system_rules.md)**: UI, tool interaction, and conversation management.
3. **[Coding Standards](prompts/03_coding_standards.md)**: Engineering philosophy and task execution rules.
4. **[Safety Guidelines](prompts/04_safety_guidelines.md)**: Reversibility and blast radius protocols.
5. **[Tool Usage](prompts/05_tool_usage.md)**: Guidelines for using specialized tools vs. Bash.
6. **[Tone and Style](prompts/06_tone_and_style.md)**: Formatting, conciseness, and communication style.
7. **[Autonomous Mode](prompts/07_autonomous_mode.md)**: Behavior and pacing for proactive work.
8. **[Output Efficiency](prompts/08_output_efficiency.md)**: Strategies for ultra-concise communication.

### Capability Instructions ([CAPABILITY_INSTRUCTIONS/](CAPABILITY_INSTRUCTIONS/))
- **[Bash and Git Operations](CAPABILITY_INSTRUCTIONS/BASH_AND_GIT.md)**: Safe git protocols and sandbox restrictions.
- **[Agent Orchestration](CAPABILITY_INSTRUCTIONS/AGENT_ORCHESTRATION.md)**: Managing subagents and forking.
- **[File Editing](CAPABILITY_INSTRUCTIONS/FILE_EDITING.md)**: Precision editing and uniqueness constraints.
- **[Session Memory](CAPABILITY_INSTRUCTIONS/SESSION_MEMORY.md)**: The four-type memory taxonomy and indexing.
- **[Web Search](CAPABILITY_INSTRUCTIONS/WEB_SEARCH.md)**: Knowledge retrieval and source attribution.
- **[Content Search (Grep)](CAPABILITY_INSTRUCTIONS/GREP_SEARCH.md)**: Optimization for ripgrep-based search.
- **[File Discovery (Glob)](CAPABILITY_INSTRUCTIONS/GLOB_DISCOVERY.md)**: codebase-wide pattern matching.
- **[Task Management](CAPABILITY_INSTRUCTIONS/TASK_MANAGEMENT.md)**: Proactive task tracking and status updates.

## Web Application
A modern, minimalist web application to browse these prompts is available in the `prompts-web` directory.

### Features
- **Minimalist Design**: Greyscale aesthetic with Inter & Outfit typography.
- **Dark Mode**: High-contrast theme toggle.
- **Verbatim Content**: No summarization; exact strings from the source code.
- **Markdown Support**: High-fidelity rendering of bold text and code blocks.

## For Developers
These prompts represent the "state-of-the-art" in AI agentic engineering. Use them to understand:
- How to constrain an agent's "thinking" for safety.
- How to enforce professional engineering standards.
- How to build complex, multi-agent systems with shared state.
