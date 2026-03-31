import React, { useState, useEffect } from 'react';
import { Sun, Moon, Terminal, Shield, Wrench, Type, Zap, Box, Database, Search, Target, CheckCircle2, Github } from 'lucide-react';
import { PROMPTS_DATA, PROMPT_CONTENT } from './data';

const App: React.FC = () => {
    const [activeId, setActiveId] = useState('01_role_and_intro');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

    // Simplistic Markdown Rendering (Bold, Codes, Lists)
    const renderContent = (text: string) => {
        return text.split('\n').map((line, i) => {
            // Code blocks
            if (line.startsWith('```')) return null; // Logic for full code blocks would go here

            // Inline code
            let processed = line.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

            // Bold (Bold instead of wrapping in 88 or **)
            processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
            processed = processed.replace(/__([^_]+)__/g, '<strong>$1</strong>');

            // Headings
            if (line.startsWith('# ')) return <h1 key={i}>{line.slice(2)}</h1>;
            if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>;
            if (line.startsWith('### ')) return <h3 key={i}>{line.slice(4)}</h3>;

            // Lists
            if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                return <li key={i} dangerouslySetInnerHTML={{ __html: processed.trim().slice(2) }} />;
            }

            return <p key={i} dangerouslySetInnerHTML={{ __html: processed }} />;
        });
    };

    const getIcon = (id: string) => {
        const icons: Record<string, any> = {
            '01_role_and_intro': Terminal,
            '02_system': Shield,
            '03_doing_tasks': Target,
            '04_executing_actions': Shield,
            '05_using_tools': Wrench,
            '06_tone_and_style': Type,
            '07_output_efficiency': Zap,
            '08_proactive_mode': Box,
            'BASH_AND_GIT': Terminal,
            'AGENT_ORCHESTRATION': Zap,
            'FILE_EDITING': Wrench,
            'SESSION_MEMORY': Database,
            'WEB_SEARCH': Search,
            'GREP_SEARCH': Search,
            'GLOB_DISCOVERY': Box,
            'TASK_MANAGEMENT': CheckCircle2
        };
        const Icon = icons[id] || Terminal;
        return <Icon size={16} />;
    };

    const currentPrompt = [...PROMPTS_DATA.global, ...PROMPTS_DATA.capabilities].find(p => p.id === activeId);

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="brand">CLAUDE CODE PROMPTS</div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div className="made-by">
                        Made by <a href="https://github.com/saimbuilds" target="_blank" rel="noopener noreferrer">Saim</a>
                    </div>

                    <button className="theme-toggle" onClick={toggleTheme}>
                        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                    </button>

                    <a href="https://github.com/saimbuilds" target="_blank" rel="noopener noreferrer" className="theme-toggle">
                        <Github size={18} />
                    </a>
                </div>
            </header>

            <aside className="sidebar">
                <div className="nav-section-title">Global Instructions</div>
                {PROMPTS_DATA.global.map(item => (
                    <div
                        key={item.id}
                        className={`nav-item ${activeId === item.id ? 'active' : ''}`}
                        onClick={() => setActiveId(item.id)}
                    >
                        {getIcon(item.id)}
                        {item.title}
                    </div>
                ))}

                <div className="nav-section-title">Capabilities</div>
                {PROMPTS_DATA.capabilities.map(item => (
                    <div
                        key={item.id}
                        className={`nav-item ${activeId === item.id ? 'active' : ''}`}
                        onClick={() => setActiveId(item.id)}
                    >
                        {getIcon(item.id)}
                        {item.title}
                    </div>
                ))}
            </aside>

            <main className="main-content">
                <div className="content-wrapper">
                    {currentPrompt && (
                        <>
                            <div className="prompt-category">{currentPrompt.category}</div>
                            <h1 className="prompt-title">{currentPrompt.title}</h1>
                            <div className="markdown-content">
                                {renderContent(PROMPT_CONTENT[activeId] || '')}
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;
