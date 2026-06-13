// ==========================================
// 1. DARK MODE TOGGLE LOGIC
// ==========================================
const toggleBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (toggleBtn) {
        toggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }
}

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        toggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
}

// ==========================================
// 2. LIGHTBOX MODAL LOGIC (Multi-page Safe)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('image-modal');
    const modalTargetImg = document.getElementById('modal-target-img');
    const closeModalBtn = document.querySelector('.close-modal');
    const zoomableImages = document.querySelectorAll('.zoomable-img');
    const rawToggleBtn = document.getElementById('raw-toggle');

    if (zoomableImages.length > 0 && modal && modalTargetImg) {
        zoomableImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                modal.style.display = 'flex';
                modalTargetImg.src = img.src;
            });
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});

// ==========================================
// 3. CORE SKILL FILTERING SYSTEM
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const tags = document.querySelectorAll('.skill-tag');
    const cards = document.querySelectorAll('.project-card');

    tags.forEach(tag => {
        // Skip tags inside the "Future Goals" section on about.html
        if (tag.closest('#goals')) return;

        tag.addEventListener('click', () => {
            const selectedSkill = tag.getAttribute('data-skill');
            if (!selectedSkill) return;

            if (tag.classList.contains('active')) {
                tag.classList.remove('active');
                cards.forEach(card => card.classList.remove('hidden'));
                return;
            }

            tags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');

            cards.forEach(card => {
                const cardSkills = card.getAttribute('data-skills') || '';
                if (cardSkills.split(' ').includes(selectedSkill.toLowerCase())) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
});

// ==========================================
// 4. RUN COMPILATION SIMULATOR
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const runButtons = document.querySelectorAll('.run-btn');

    runButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const destination = button.getAttribute('data-target');
            const card = button.closest('.project-card');
            const overlay = card.querySelector('.project-terminal-overlay');
            
            if (!overlay) return;

            overlay.innerHTML = '';
            overlay.classList.add('active');

            const scriptLines = [
                'guest@kernel:~$ ./run_demo --verbose',
                '[INFO] Allocating secure multi-thread socket buffer...',
                '[OK] Bind socket descriptor successful (Port 443)',
                '[EXEC] Running local compilation integrity vectors...',
                '[SUCCESS] Handshake complete. Routing to target codebase...'
            ];

            scriptLines.forEach((text, index) => {
                setTimeout(() => {
                    const line = document.createElement('p');
                    line.className = 'terminal-line';
                    line.textContent = text;
                    
                    if (index === 0) line.style.color = '#94a3b8';
                    if (index === 4) line.style.color = '#4ade80'; 
                    
                    overlay.appendChild(line);
                }, index * 400); 
            });

            setTimeout(() => {
                window.open(destination, '_blank');
                setTimeout(() => { overlay.classList.remove('active'); }, 1000);
            }, scriptLines.length * 400 + 300);
        });
    });
});

// ==========================================
// BACKEND PORTFOLIO EXPANSIONS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dual Action Clipboard Function
    const copyBtn = document.getElementById('copy-email-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const emailAddress = "marcgilbertlim1@gmail.com";
            navigator.clipboard.writeText(emailAddress).then(() => {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = "📋 Copied!";
                copyBtn.style.color = "#22c55e";
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.style.color = "";
                }, 2000);
            }).catch(err => {
                console.error('Could not copy string text: ', err);
            });
        });
    }

    // 2. Dynamic Metric Modulations for Health Bar
    const pingMetric = document.getElementById('system-ping');
    if (pingMetric) {
        setInterval(() => {
            const variantPing = Math.floor(Math.random() * (24 - 14 + 1)) + 14;
            pingMetric.textContent = `${variantPing}ms`;
        }, 3000);
    }

    // 3. API Interactive Sandbox Handler
    const apiButtons = document.querySelectorAll('.api-tab-btn');
    const apiDisplay = document.getElementById('api-json-render');
    
    const datasets = {
        profile: {
            status: 200,
            endpoint: "/api/v1/profile/marclim",
            payload: {
                name: "Marc Gilbert Lim",
                role: "Computer Engineer / Backend Specialist",
                regional_node: "Manila, PH",
                security_clearance: "Level_4_Consultant",
                active_sockets: ["Python", "Django", "PostgreSQL", "Linux"]
            }
        },
        metrics: {
            status: 200,
            endpoint: "/api/v1/system/metrics",
            payload: {
                uptime_percentage: 99.982,
                resolved_database_deadlocks: 0,
                api_contract_compliance: "100%",
                active_cron_jobs: ["vulnerability_scanner", "ledger_sync"]
            }
        },
        routing: {
            status: 200,
            endpoint: "/api/v1/network/topology",
            payload: {
                gateway: "10.0.4.1",
                firewall_status: "Active (OWASP Rulesets Enforced)",
                listeners: [
                    { port: 443, traffic: "HTTPS/REST" },
                    { port: 8000, traffic: "Django-WSGI" }
                ]
            }
        }
    };

    apiButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            apiButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const targetKey = btn.getAttribute('data-endpoint');
            const selectedData = datasets[targetKey];
            
            if (selectedData && apiDisplay) {
                apiDisplay.textContent = JSON.stringify(selectedData, null, 4);
            }
        });
    });
});

// QoL: Auto-highlight active page in navigation links
const currentFile = window.location.pathname.split('/').pop() || 'home.html';
document.querySelectorAll('nav div a').forEach(link => {
    if (link.getAttribute('href') === currentFile) {
        link.style.color = 'var(--accent-color)';
        link.style.fontWeight = 'bold';
        link.style.borderBottom = '2px solid var(--accent-color)';
        link.style.paddingBottom = '4px';
    }
});

// QoL: Show Back to Top button ONLY at the bottom of the page
const scrollTopBtn = document.getElementById('scroll-top-btn');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        const scrolledFromTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
        const viewportHeight = window.innerHeight;
        const totalDocumentHeight = document.documentElement.scrollHeight;
        
        // Triggers when the user is within 150px of the absolute bottom
        if ((scrolledFromTop + viewportHeight) >= (totalDocumentHeight - 150)) {
            scrollTopBtn.style.setProperty('display', 'block', 'important');
        } else {
            scrollTopBtn.style.setProperty('display', 'none', 'important');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        const scrollOptions = { top: 0, behavior: 'smooth' };
        window.scrollTo(scrollOptions);
        document.documentElement.scrollTo(scrollOptions);
        document.body.scrollTo(scrollOptions);
    });
}