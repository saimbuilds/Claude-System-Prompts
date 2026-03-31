import React, { useState, useEffect } from 'react';
import { Sun, Moon, Terminal, Shield, Wrench, Type, Zap, Box, Database, Search, Target, CheckCircle2, Github, Copy, Check, Menu, X } from 'lucide-react';
import { PROMPTS_DATA, PROMPT_CONTENT } from './data';

const App: React.FC = () => {
    const [activeId, setActiveId] = useState('01_role_and_intro');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [copied, setCopied] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    const handleCopy = () => {
        const text = PROMPT_CONTENT[activeId] || '';
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleNavClick = (id: string) => {
        setActiveId(id);
        setIsMenuOpen(false); // Close menu on mobile after selection
    };

    // Simplistic Markdown Rendering (Bold, Codes, Lists)
    const renderContent = (text: string) => {
        const lines = text.split('\n');
        const contentLines = lines[0]?.startsWith('# ') ? lines.slice(1) : lines;
        return contentLines.map((line, i) => {
            if (line.startsWith('```')) return null;

            let processed = line.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
            processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
            processed = processed.replace(/__([^_]+)__/g, '<strong>$1</strong>');

            if (line.startsWith('# ')) return <h1 key={i}>{line.slice(2)}</h1>;
            if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>;
            if (line.startsWith('### ')) return <h3 key={i}>{line.slice(4)}</h3>;

            if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                return <li key={i} dangerouslySetInnerHTML={{ __html: processed.trim().slice(2) }} />;
            }
            if (line.trim() === '') return <br key={i} />;

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
        <div className={`app-container ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className={`sidebar-overlay ${isMenuOpen ? 'visible' : ''}`} onClick={toggleMenu} />

            <header className="app-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button className="mobile-menu-toggle" onClick={toggleMenu}>
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                    <div className="brand">CLAUDE CODE PROMPTS</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div className="made-by-desktop">
                        Made by <a href="https://github.com/saimbuilds" target="_blank" rel="noopener noreferrer">Saim</a>
                    </div>

                    <button className="header-icon-btn" onClick={toggleTheme} aria-label="Toggle Theme">
                        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                    </button>

                    <a href="https://github.com/saimbuilds/claude-code-prompts" target="_blank" rel="noopener noreferrer" className="header-icon-btn" aria-label="Github Repository">
                        <Github size={18} />
                    </a>
                </div>
            </header>

            <aside className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
                <div className="nav-section-title">Global Instructions</div>
                {PROMPTS_DATA.global.map(item => (
                    <div
                        key={item.id}
                        className={`nav-item ${activeId === item.id ? 'active' : ''}`}
                        onClick={() => handleNavClick(item.id)}
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
                        onClick={() => handleNavClick(item.id)}
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
                            <div className="content-header">
                                <div>
                                    <div className="prompt-category">{currentPrompt.category}</div>
                                    <h1 className="prompt-title">{currentPrompt.title}</h1>
                                </div>
                                <button className="copy-btn" onClick={handleCopy}>
                                    {copied ? <Check size={15} /> : <Copy size={15} />}
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                            <div className="markdown-content">
                                {renderContent(PROMPT_CONTENT[activeId] || '')}
                            </div>
                        </>
                    )}
                </div>
                <footer className="mobile-footer">
                    Made by <a href="https://github.com/saimbuilds" target="_blank" rel="noopener noreferrer">Saim</a>
                </footer>
            </main>
        </div>
    );
};

export default App;

