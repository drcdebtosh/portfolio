/* ==========================================================================
   DEBATOSH ROYCHOWDHURY PORTFOLIO — MINIMALIST INTERACTIVE ENGINE (JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. STATE & DATA STORE ---
    const SKILLS_DATA = [
        { name: 'Python', category: 'languages', icon: 'fa-brands fa-python', color: '#3776ab' },
        { name: 'Java', category: 'languages', icon: 'fa-brands fa-java', color: '#f89820' },
        { name: 'JavaScript', category: 'languages', icon: 'fa-brands fa-js', color: '#f7df1e' },
        { name: 'SQL', category: 'languages', icon: 'fa-solid fa-database', color: '#336791' },
        
        { name: 'OpenCV & MediaPipe', category: 'ai', icon: 'fa-solid fa-eye', color: '#6366f1' },
        { name: 'YOLO (v8/11/26 Pose)', category: 'ai', icon: 'fa-solid fa-microchip', color: '#6366f1' },
        { name: 'PyTorch & TensorFlow', category: 'ai', icon: 'fa-solid fa-brain', color: '#ee4c2c' },
        { name: '3D CNN Pipelines', category: 'ai', icon: 'fa-solid fa-diagram-project', color: '#6366f1' },
        
        { name: 'Node.js & Express.js', category: 'web', icon: 'fa-brands fa-node-js', color: '#68a063' },
        { name: 'Flask (Python)', category: 'web', icon: 'fa-solid fa-pepper-hot', color: '#64748b' },
        { name: 'MongoDB', category: 'web', icon: 'fa-solid fa-leaf', color: '#47a248' },
        { name: 'REST APIs Design', category: 'web', icon: 'fa-solid fa-network-wired', color: '#3b82f6' },

        { name: 'Data Structures & Algorithms', category: 'cs', icon: 'fa-solid fa-sitemap', color: '#10b981' },
        { name: 'Object-Oriented Programming (OOP)', category: 'cs', icon: 'fa-solid fa-cubes', color: '#6366f1' },
        { name: 'DBMS & Query Optimization', category: 'cs', icon: 'fa-solid fa-server', color: '#f59e0b' },
        { name: 'Operating Systems & Networks', category: 'cs', icon: 'fa-solid fa-hard-drive', color: '#64748b' }
    ];

    const PROJECTS_DATA = [
        {
            id: 'yolo-fall-detection',
            title: 'Human Fall Detection using Lightweight YOLO-Pose',
            category: 'ai',
            categoryName: 'Computer Vision & AI (Final Year Project)',
            image: 'assets/images/project-fall.jpg',
            description: 'Camera-only real-time fall detection benchmark utilizing YOLO-Pose backbones with CA-EMA keypoint smoothing and a 5-stage Finite State Machine.',
            tags: ['Python', 'Ultralytics YOLO', 'OpenCV', 'PyTorch', 'NumPy', 'Flask'],
            metrics: ['96.67% Precision', '100% Recall', '98.31% F1-Score @ ~34 FPS'],
            github: 'https://github.com/drcdebtosh',
            demo: 'https://github.com/drcdebtosh',
            details: 'Led research benchmarking three lightweight YOLO-Pose backbones (v8n/11n/26n-Pose) on the UR Fall Detection dataset. Designed Confidence-Aware Exponential Moving Average (CA-EMA) keypoint smoothing to boost precision by +3.12 points. Implemented a 5-stage FSM with multi-feature motion fusion (velocity, acceleration, torso angle, aspect ratio, ground proximity) for caregiver triage.'
        },
        {
            id: 'deepfake-detection',
            title: 'Deepfake Detection using 3D CNN & MediaPipe',
            category: 'ai',
            categoryName: 'SIH Hackathon Winner Project 🏆',
            image: 'assets/images/project-deepfake.jpg',
            description: 'Real-time deepfake video analysis pipeline combining 3D Convolutional Neural Networks and Google MediaPipe facial landmarks.',
            tags: ['Python', 'TensorFlow', 'Google MediaPipe', 'OpenCV', 'Flask', 'Matplotlib'],
            metrics: ['1st Place SIH Hackathon', '30+ FPS Inference', 'Flask Analytics Dashboard'],
            github: 'https://github.com/drcdebtosh',
            demo: 'https://github.com/drcdebtosh',
            details: 'Secured 1st place out of 123 teams in SIH 2024. Built a 3D CNN model to extract temporal video features and integrated MediaPipe facial landmark mesh extraction. Developed a Flask web application with Matplotlib analytical dashboards to visualize frame-by-frame video manipulation scores.'
        },
        {
            id: 'job-portal-codesoft',
            title: 'Full-Stack Job Portal Platform',
            category: 'fullstack',
            categoryName: 'Internship Work @ CodeSoft',
            image: 'assets/images/project-job.jpg',
            description: 'Full-stack recruitment and job search web platform with optimized MongoDB database queries and responsive user dashboard.',
            tags: ['Node.js', 'Express.js', 'JavaScript', 'MongoDB', 'REST APIs', 'HTML5/CSS3'],
            metrics: ['CodeSoft Internship', 'Agile Milestones', 'Optimized Database APIs'],
            github: 'https://github.com/drcdebtosh',
            demo: 'https://github.com/drcdebtosh',
            details: 'Developed and enhanced frontend candidate workflows and backend API controllers during a remote internship at CodeSoft. Optimized MongoDB queries to improve endpoint latency and structured clear RESTful API contracts.'
        }
    ];

    // --- 2. MINIMAL PARTICLE BACKDROP CANVAS ---
    function initCanvas() {
        const canvas = document.getElementById('bgCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = Math.min(Math.floor(width / 25), 40);

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.radius = Math.random() * 1.5 + 0.5;
                this.alpha = Math.random() * 0.3 + 0.1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(156, 163, 175, ${this.alpha})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(156, 163, 175, ${0.08 * (1 - dist / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });
    }

    // --- 3. TYPING EFFECT IN HERO ---
    function initTypingEffect() {
        const target = document.getElementById('typingText');
        if (!target) return;

        const roles = [
            'AI & Computer Vision',
            'YOLO Pose Estimation',
            '3D CNN Deepfake Detectors',
            'Full-Stack Web Systems'
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                target.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                target.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2200;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 400;
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }

    // --- 4. COUNTER ANIMATION ---
    function initCounters() {
        const counters = document.querySelectorAll('.metric-value');
        let hasAnimated = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    counters.forEach(counter => {
                        const target = parseFloat(counter.getAttribute('data-target'));
                        const isDecimal = target % 1 !== 0;
                        const duration = 1500;
                        const stepTime = 20;
                        const steps = duration / stepTime;
                        const increment = target / steps;
                        let current = 0;

                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                counter.textContent = isDecimal ? target.toFixed(1) : Math.round(target);
                                clearInterval(timer);
                            } else {
                                counter.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
                            }
                        }, stepTime);
                    });
                }
            });
        }, { threshold: 0.5 });

        const metricsSection = document.querySelector('.hero-metrics');
        if (metricsSection) observer.observe(metricsSection);
    }

    // --- 5. THEME SWITCHER ---
    function initThemeToggle() {
        const themeBtn = document.getElementById('themeToggleBtn');
        const themeIcon = document.getElementById('themeIcon');
        if (!themeBtn) return;

        const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);

        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio_theme', newTheme);
            updateIcon(newTheme);
            showToast(`Theme switched to ${newTheme.toUpperCase()} mode`);
        });

        function updateIcon(theme) {
            if (themeIcon) {
                themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
            }
        }
    }

    // --- 6. RENDER SKILLS & TABS ---
    function initSkills() {
        const grid = document.getElementById('skillsGrid');
        const tabs = document.querySelectorAll('.skill-tab');
        if (!grid) return;

        function renderSkills(categoryFilter = 'all') {
            grid.innerHTML = '';
            const filtered = categoryFilter === 'all' 
                ? SKILLS_DATA 
                : SKILLS_DATA.filter(s => s.category === categoryFilter);

            filtered.forEach(skill => {
                const card = document.createElement('div');
                card.className = 'skill-card glass-card';
                card.innerHTML = `
                    <div class="skill-card-icon" style="color: ${skill.color}">
                        <i class="${skill.icon}"></i>
                    </div>
                    <div class="skill-card-info">
                        <span class="skill-name">${skill.name}</span>
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        renderSkills('all');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderSkills(tab.getAttribute('data-category'));
            });
        });
    }

    // --- 7. INTERACTIVE SYSTEM ARCHITECTURE PIPELINE ---
    function initPipelineDiagram() {
        const nodes = document.querySelectorAll('.pipeline-node');
        const detailCard = document.getElementById('nodeDetailCard');
        if (!detailCard || !nodes.length) return;

        const PIPELINE_DATA = {
            input: {
                step: 'STEP 01 — INPUT STREAM ACQUISITION',
                title: 'RTSP Camera / Video Feed Ingestion',
                icon: 'fa-solid fa-video',
                color: '#38bdf8',
                summary: 'Real-time multi-threaded frame capture engine decoding 1080p@30FPS video streams using OpenCV hardware-accelerated backend.',
                highlights: [
                    { label: 'Input Format', value: '1920x1080 RGB Video Stream' },
                    { label: 'Target Latency', value: '< 5ms Frame Buffering' },
                    { label: 'Thread Safety', value: 'Non-blocking Ring Buffer Queue' }
                ],
                metricsValue: '30 FPS Ingestion'
            },
            yolo: {
                step: 'STEP 02 — POSE ESTIMATION BACKBONE',
                title: 'Lightweight YOLO-Pose Keypoint Extraction',
                icon: 'fa-solid fa-microchip',
                color: '#6366f1',
                summary: 'Benchmarked YOLOv8n-Pose, YOLO11n-Pose, and YOLO26n-Pose neural networks for extraction of 17 COCO human body joint coordinates.',
                highlights: [
                    { label: 'Keypoints Detected', value: '17 Joints (Nose, Shoulders, Hips, Ankles)' },
                    { label: 'Backbone Model', value: 'YOLO11n-Pose (Lightweight Edge Model)' },
                    { label: 'Inference Speed', value: '~29.1ms per frame on GPU' }
                ],
                metricsValue: '96.67% COCO mAP'
            },
            caema: {
                step: 'STEP 03 — ADAPTIVE NOISE FILTERING',
                title: 'Confidence-Aware Exponential Moving Average (CA-EMA)',
                icon: 'fa-solid fa-wave-square',
                color: '#10b981',
                summary: 'Novel confidence-based temporal smoothing filter that dynamically adjusts joint smoothing factors based on per-joint detection confidence score.',
                highlights: [
                    { label: 'Core Formula', value: 'alpha = alpha_base * confidence (alpha_base = 0.40)' },
                    { label: 'Jitter Suppression', value: '64.2% Reduction in Joint Noise Jitter' },
                    { label: 'Accuracy Gain', value: '+3.12 Precision Points Boost over Raw YOLO' }
                ],
                metricsValue: '+3.12% Precision Boost'
            },
            fsm: {
                step: 'STEP 04 — STATE CLASSIFICATION & TRIAGE',
                title: '5-Stage Finite State Machine (FSM) Decision Engine',
                icon: 'fa-solid fa-triangle-exclamation',
                color: '#ef4444',
                summary: 'State machine tracking multi-feature motion fusion (torso inclination angle, vertical velocity, aspect ratio, and ground proximity) across 5 distinct states.',
                highlights: [
                    { label: 'Tracked States', value: 'STANDING -> BENDING -> FALLING -> GROUND IMPACT -> RECOVERY' },
                    { label: 'Triaging Trigger', value: 'Ground Impact + Inactivity > 3.0s = Emergency Dispatch' },
                    { label: 'False Alarm Rate', value: '< 0.8% across UR Fall Dataset' }
                ],
                metricsValue: '98.31% F1-Score'
            }
        };

        function renderNodeDetail(nodeKey) {
            const data = PIPELINE_DATA[nodeKey];
            if (!data) return;

            detailCard.innerHTML = `
                <div class="node-detail-header">
                    <div class="node-detail-title-group">
                        <span class="node-detail-step" style="color:${data.color}">${data.step}</span>
                        <h4 class="node-detail-title"><i class="${data.icon}" style="color:${data.color}"></i> ${data.title}</h4>
                    </div>
                    <div class="node-detail-metric-pill" style="border-color:${data.color}; color:${data.color}">
                        <span class="metric-pill-val">${data.metricsValue}</span>
                    </div>
                </div>
                <p class="node-detail-summary">${data.summary}</p>
                <div class="node-detail-grid">
                    ${data.highlights.map(h => `
                        <div class="node-highlight-item">
                            <span class="highlight-label">${h.label}</span>
                            <span class="highlight-value">${h.value}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        nodes.forEach(node => {
            node.addEventListener('click', () => {
                nodes.forEach(n => n.classList.remove('active'));
                node.classList.add('active');
                renderNodeDetail(node.getAttribute('data-node'));
            });
        });

        renderNodeDetail('input');
    }

    // --- 8. RENDER PROJECTS ---
    function initProjects() {
        const grid = document.getElementById('projectsGrid');
        const searchInput = document.getElementById('projectSearch');
        const clearBtn = document.getElementById('clearSearchBtn');
        const filterBtns = document.querySelectorAll('.filter-btn');

        if (!grid) return;

        let currentCategory = 'all';
        let currentSearch = '';

        function renderProjects() {
            grid.innerHTML = '';

            const filtered = PROJECTS_DATA.filter(proj => {
                const matchesCategory = currentCategory === 'all' || proj.category === currentCategory;
                const searchLower = currentSearch.toLowerCase();
                const matchesSearch = !currentSearch || 
                    proj.title.toLowerCase().includes(searchLower) ||
                    proj.description.toLowerCase().includes(searchLower) ||
                    proj.tags.some(t => t.toLowerCase().includes(searchLower));

                return matchesCategory && matchesSearch;
            });

            if (filtered.length === 0) {
                grid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;" class="glass-card">
                        <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
                        <h3>No projects found matching "${currentSearch}"</h3>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">Try adjusting search query or category filter.</p>
                    </div>
                `;
                return;
            }

            filtered.forEach(proj => {
                const card = document.createElement('div');
                card.className = 'project-card glass-card';
                card.innerHTML = `
                    <div class="project-image-wrapper">
                        <img src="${proj.image}" alt="${proj.title}" class="project-img">
                        <span class="project-category-badge">${proj.categoryName}</span>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">${proj.title}</h3>
                        <p class="project-description">${proj.description}</p>
                        <div class="project-tech-tags">
                            ${proj.tags.map(t => `<span class="project-tech-tag">${t}</span>`).join('')}
                        </div>
                        <div class="project-footer">
                            <button class="btn-sm btn-outline view-details-btn" data-id="${proj.id}">
                                <i class="fa-solid fa-circle-info"></i> Project Details
                            </button>
                            <button class="btn-sm btn-primary view-details-btn" data-id="${proj.id}">
                                <i class="fa-solid fa-chart-line"></i> View Metrics
                            </button>
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            });

            document.querySelectorAll('.view-details-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const projId = btn.getAttribute('data-id');
                    openProjectModal(projId);
                });
            });
        }

        renderProjects();

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentSearch = e.target.value;
                if (clearBtn) {
                    if (currentSearch) clearBtn.classList.add('active');
                    else clearBtn.classList.remove('active');
                }
                renderProjects();
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (searchInput) searchInput.value = '';
                currentSearch = '';
                clearBtn.classList.remove('active');
                renderProjects();
            });
        }

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = btn.getAttribute('data-filter');
                renderProjects();
            });
        });
    }

    // --- 9. PROJECT MODAL ---
    function openProjectModal(projectId) {
        const modal = document.getElementById('projectModal');
        const modalBody = document.getElementById('modalBody');
        const proj = PROJECTS_DATA.find(p => p.id === projectId);

        if (!modal || !modalBody || !proj) return;

        modalBody.innerHTML = `
            <div style="margin-bottom: 1.25rem;">
                <span class="project-category-badge" style="position: static; display: inline-block; margin-bottom: 0.5rem;">${proj.categoryName}</span>
                <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 0.5rem;">${proj.title}</h2>
                <p style="color: var(--text-secondary); font-size: 0.975rem; line-height: 1.65;">${proj.details}</p>
            </div>

            <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.25rem; border: 1px solid var(--border-color);">
                <img src="${proj.image}" alt="${proj.title}" style="width: 100%; height: 300px; object-fit: cover; display: block;">
            </div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin-bottom: 1.25rem;">
                ${proj.metrics.map(m => `
                    <div style="padding: 0.85rem; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-md); text-align: center;">
                        <span style="font-family: var(--font-mono); font-weight: 600; color: var(--accent-primary); font-size: 0.875rem;">${m}</span>
                    </div>
                `).join('')}
            </div>

            <div style="margin-bottom: 1.25rem;">
                <h4 style="font-size: 0.9rem; margin-bottom: 0.5rem; color: var(--text-secondary);">Tech Stack & Libraries</h4>
                <div class="project-tech-tags">
                    ${proj.tags.map(t => `<span class="project-tech-tag" style="font-size: 0.8rem; padding: 3px 8px;">${t}</span>`).join('')}
                </div>
            </div>

            <div style="display: flex; gap: 0.75rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                <button class="btn btn-primary" onclick="alert('Contact Debatosh at debatoshofficial85@gmail.com for repository access or live demo preview!')" style="flex: 1; justify-content: center;">
                    <i class="fa-solid fa-code"></i> Request Code / Demo Access
                </button>
                <a href="#contact" class="btn btn-outline" onclick="document.getElementById('modalCloseBtn').click()">
                    <i class="fa-solid fa-envelope"></i> Contact Developer
                </a>
            </div>
        `;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');

        const closeBtn = document.getElementById('modalCloseBtn');
        if (closeBtn) {
            closeBtn.onclick = () => closeModal();
        }

        modal.onclick = (e) => {
            if (e.target === modal) closeModal();
        };
    }

    function closeModal() {
        const modal = document.getElementById('projectModal');
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    }

    // --- 10. INTERACTIVE CLI TERMINAL ---
    function initTerminal() {
        const drawer = document.getElementById('terminalDrawer');
        const toggleBtn = document.getElementById('terminalToggleBtn');
        const heroBtn = document.getElementById('heroTerminalBtn');
        const closeBtn = document.getElementById('terminalCloseBtn');
        const clearBtn = document.getElementById('terminalClearBtn');
        const matrixBtn = document.getElementById('terminalMatrixBtn');
        const input = document.getElementById('terminalInput');
        const output = document.getElementById('terminalOutput');

        if (!drawer || !input || !output) return;

        function toggleDrawer(show) {
            if (show === undefined) show = !drawer.classList.contains('active');
            if (show) {
                drawer.classList.add('active');
                drawer.setAttribute('aria-hidden', 'false');
                setTimeout(() => input.focus(), 100);
            } else {
                drawer.classList.remove('active');
                drawer.setAttribute('aria-hidden', 'true');
            }
        }

        if (toggleBtn) toggleBtn.addEventListener('click', () => toggleDrawer());
        if (heroBtn) heroBtn.addEventListener('click', () => toggleDrawer(true));
        if (closeBtn) closeBtn.addEventListener('click', () => toggleDrawer(false));

        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === '`') {
                e.preventDefault();
                toggleDrawer();
            }
        });

        if (clearBtn) {
            clearBtn.addEventListener('click', () => { output.innerHTML = ''; });
        }

        if (matrixBtn) {
            matrixBtn.addEventListener('click', () => {
                printLine('cmd-user', 'debatosh@kolkata:~$ matrix');
                printLine('cmd-result', '01000100 01000101 01000010 01000001 01010100 01001111 01000011 01001000');
                printLine('cmd-result', '[YOLO-Pose & 3D-CNN Neural Stream Activated...]');
                showToast('Matrix Rain Mode Initialized!');
            });
        }

        function printLine(className, text) {
            const line = document.createElement('div');
            line.className = `terminal-line ${className}`;
            line.textContent = text;
            output.appendChild(line);
            output.parentElement.scrollTop = output.parentElement.scrollHeight;
        }

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = input.value.trim();
                if (!command) return;

                printLine('cmd-user', `debatosh@kolkata:~$ ${command}`);
                input.value = '';
                processCommand(command.toLowerCase());
            }
        });

        function processCommand(cmd) {
            switch (cmd) {
                case 'help':
                    printLine('cmd-result', 'Available Commands:');
                    printLine('cmd-result', '  about        - Bio & core specialization');
                    printLine('cmd-result', '  skills       - Tech stack summary');
                    printLine('cmd-result', '  projects     - List of engineering projects');
                    printLine('cmd-result', '  education    - Academic degree details');
                    printLine('cmd-result', '  experience   - Internship & hackathon wins');
                    printLine('cmd-result', '  contact      - Phone, email & location');
                    printLine('cmd-result', '  theme        - Toggle light/dark theme');
                    printLine('cmd-result', '  clear        - Clear console output');
                    printLine('cmd-result', '  sudo hire    - Direct recruiter contact trigger');
                    break;

                case 'about':
                    printLine('cmd-result', 'Debatosh Roychowdhury — B.Tech Computer Science Engineering Graduate (2022–2026).');
                    printLine('cmd-result', 'Specializing in Computer Vision (YOLO Pose, 3D CNN), AI/ML, and Full-Stack Development.');
                    break;

                case 'skills':
                    printLine('cmd-result', 'Languages : Java, Python, JavaScript, SQL');
                    printLine('cmd-result', 'AI/Vision : OpenCV, MediaPipe, YOLO (v8/11/26), TensorFlow, PyTorch, 3D CNN');
                    printLine('cmd-result', 'Web/Back  : Node.js, Express.js, REST APIs, Flask, MongoDB');
                    printLine('cmd-result', 'CS Core   : OOP, Data Structures & Algorithms, DBMS, OS, Networks');
                    break;

                case 'projects':
                    PROJECTS_DATA.forEach(p => {
                        printLine('cmd-result', `• ${p.title} [${p.metrics[0]}]`);
                    });
                    break;

                case 'education':
                    printLine('cmd-result', 'B.Tech CSE | Techno International Newtown, Kolkata (CGPA: 7.84)');
                    printLine('cmd-result', 'Class XII  | Gobardanga Khantura High School (85%)');
                    printLine('cmd-result', 'Class X    | Gobardanga Khantura High School (91%)');
                    break;

                case 'experience':
                    printLine('cmd-result', '• Full Stack Intern @ CodeSoft (Remote | Jun 2025 - Jul 2025)');
                    printLine('cmd-result', '• 🏆 SIH Hackathon Winner 2024 (1st Place among 123 Teams)');
                    break;

                case 'contact':
                    printLine('cmd-result', 'Email    : debatoshofficial85@gmail.com');
                    printLine('cmd-result', 'Phone    : +91 6297856449');
                    printLine('cmd-result', 'Location : Kolkata, West Bengal, India');
                    break;

                case 'theme':
                    const themeBtn = document.getElementById('themeToggleBtn');
                    if (themeBtn) themeBtn.click();
                    printLine('cmd-result', 'Theme updated!');
                    break;

                case 'clear':
                    output.innerHTML = '';
                    break;

                case 'sudo hire':
                case 'hire':
                    printLine('cmd-result', '🎉 [ACCESS GRANTED] Redirecting to contact section...');
                    setTimeout(() => {
                        toggleDrawer(false);
                        window.location.hash = '#contact';
                    }, 800);
                    break;

                default:
                    printLine('cmd-result', `Command not recognized: '${cmd}'. Type 'help' for available commands.`);
                    break;
            }
        }
    }

    // --- 11. CONTACT FORM & COPY EMAIL ---
    function initContactForm() {
        const form = document.getElementById('contactForm');
        const copyBtn = document.getElementById('copyEmailBtn');
        const messageInput = document.getElementById('message');
        const charCount = document.getElementById('charCount');

        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText('debatoshofficial85@gmail.com').then(() => {
                    showToast('Email (debatoshofficial85@gmail.com) copied to clipboard!');
                });
            });
        }

        if (messageInput && charCount) {
            messageInput.addEventListener('input', () => {
                charCount.textContent = messageInput.value.length;
            });
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const name = document.getElementById('name');
                const email = document.getElementById('email');
                const message = document.getElementById('message');
                let isValid = true;

                if (!name.value.trim()) { showError(name, 'nameError'); isValid = false; }
                else hideError(name, 'nameError');

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email.value.trim() || !emailRegex.test(email.value)) { showError(email, 'emailError'); isValid = false; }
                else hideError(email, 'emailError');

                if (!message.value.trim()) { showError(message, 'messageError'); isValid = false; }
                else hideError(message, 'messageError');

                if (isValid) {
                    const submitBtn = document.getElementById('submitBtn');
                    const subject = document.getElementById('subject');
                    const originalBtnText = submitBtn.innerHTML;
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Transmitting Message...`;

                    fetch('https://formsubmit.co/ajax/debatoshofficial85@gmail.com', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            name: name.value.trim(),
                            email: email.value.trim(),
                            subject: subject.value.trim() || 'Portfolio Inquiry from ' + name.value.trim(),
                            message: message.value.trim()
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                        if (data.success === "true" || data.success === true) {
                            form.reset();
                            if (charCount) charCount.textContent = '0';
                            showToast('✨ Message transmitted! Debatosh will receive it in his email shortly.');
                        } else {
                            showToast('⚠️ FormSubmit: ' + (data.message || 'Please check your spam folder for FormSubmit activation.'));
                        }
                    })
                    .catch(error => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                        showToast('⚠️ Transmission error. Opening your email app...');
                        window.location.href = `mailto:debatoshofficial85@gmail.com?subject=${encodeURIComponent(subject.value.trim() || 'Portfolio Inquiry')}&body=${encodeURIComponent('From: ' + name.value.trim() + ' (' + email.value.trim() + ')\n\n' + message.value.trim())}`;
                    });
                }
            });
        }

        function showError(input, errorId) {
            input.classList.add('error');
            const err = document.getElementById(errorId);
            if (err) err.classList.add('visible');
        }

        function hideError(input, errorId) {
            input.classList.remove('error');
            const err = document.getElementById(errorId);
            if (err) err.classList.remove('visible');
        }
    }

    // --- 12. TOAST UTILITY ---
    function showToast(message) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-primary);"></i> ${message}`;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    }

    // --- 13. HEADER SCROLL EFFECT & MOBILE MENU ---
    function initHeaderScroll() {
        const header = document.getElementById('header');
        const progressBar = document.getElementById('progressBar');
        const mobileBtn = document.getElementById('mobileToggleBtn');
        const nav = document.getElementById('mainNav');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            if (progressBar) progressBar.style.width = scrolled + '%';
        });

        if (mobileBtn && nav) {
            mobileBtn.addEventListener('click', () => {
                nav.classList.toggle('active');
            });

            nav.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => nav.classList.remove('active'));
            });
        }
    }

    // --- INITIALIZATION ---
    initCanvas();
    initTypingEffect();
    initCounters();
    initThemeToggle();
    initSkills();
    initPipelineDiagram();
    initProjects();
    initTerminal();
    initContactForm();
    initHeaderScroll();

});
