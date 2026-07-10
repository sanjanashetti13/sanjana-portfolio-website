export const profile = {
  name: "Sanjana Shetti",
  initials: "SS",
  roles: ["Full-Stack Developer", "AI & GenAI Engineer", "Systems Builder"],
  heroTitle: "AI Engineer & Full Stack Developer",
  tagline:
    "Software Engineer building full-stack platforms and production AI systems — from RAG pipelines to microservices architecture.",
  location: "Hubli, Karnataka, India",
  email: "sanjanashetti13@gmail.com",
  phone: "9538840123",
  github: "https://github.com/sanjanashetti13",
  linkedin: "https://www.linkedin.com/in/sanjana-shetti-8bb8072ab",
  resumeUrl: "/resume.pdf",
  avatarImageUrl: "/avatar/robot.png",
  aboutPhotoUrl: "/avatar/sanjana.jpg",
};

export const about = {
  eyebrow: "Get to know me",
  intro:
    "I'm Sanjana Shetti, a Computer Science Engineering undergraduate at KLE Technological University. From freelancing and AI research to production-ready systems, I enjoy creating software that solves real problems while continuously learning, collaborating, and making a meaningful impact.",
  quote: "I believe the best lessons aren't found in books, they're built through real-world problems.",
};

export const experienceMarquee = [
  "Traction Layer AI",
  "Infosys",
  "Freelance",
  "Klean Tech Systems",
  "Beckn Protocol",
];

export const experienceSubtitle =
  "";

export type ExperienceEntry = {
  date: string;
  yearLabel: string;
  role: string;
  org: string;
  company: string;
  tag: string;
  projectTitle: string;
  initials: string;
  logoUrl?: string;
  points: string[];
  tech: string[];
  metrics: string[];
  githubLink?: string | null;
  websiteLink?: string | null;
  reportLink?: string | null;
  paperLink?: string | null;
  projectLink?: string | null;
  projectLabel?: string;
};

export const experience: ExperienceEntry[] = [
  {
    date: "May 2026",
    yearLabel: "2026",
    role: "Freelance Full-Stack Developer",
    org: "Freelance — Klean Tech Systems",
    company: "Freelance",
    tag: "Klean Tech Systems",
    projectTitle: "Quotation & Invoice Automation Platform",
    initials: "FL",
    logoUrl: "/logos/freelance.png",
    points: [
      "Deployed a production platform managing 1,000+ products with Excel bulk imports.",
      "Automated GST calculations and CI/CD on Vercel — cutting quotation prep time by 80%.",
    ],
    tech: ["Next.js", "React", "Node.js", "PostgreSQL", "Vercel", "CI/CD"],
    metrics: ["1,000+ Products", "80% Faster", "Production Ready", "CI/CD"],
    githubLink: "https://github.com/flynnrapunzel913-ship-it/smartquotation-app",
    websiteLink: "https://smartquotation-app-teal.vercel.app/",
  },
  {
    date: "Sep 2025 – Mar 2026",
    yearLabel: "2025",
    role: "AI Research Intern",
    org: "Traction Layer AI — Ambient AI",
    company: "Traction Layer AI",
    tag: "Traction Layer AI",
    projectTitle: "Ambient AI Clinical Documentation",
    initials: "TL",
    logoUrl: "/logos/traction-layer-ai.png",
    points: [
      "Built multilingual speech-to-text pipelines and RAG-based clinical documentation systems.",
      "Implemented multi-agent RAG architecture for context-aware SOAP notes with privacy compliance.",
    ],
    tech: ["Python", "FastAPI", "Groq", "RAG", "Postgres", "Docker"],
    metrics: ["Multi-Agent RAG", "Multilingual", "Production Ready"],
    githubLink: "https://github.com/Pavan-Sanjana-KLE/Ambient-AI",
    paperLink: "/research%20ppers/Ambient-ai%20paper.pdf",
  },
  {
    date: "Aug 2025 – Jan 2026",
    yearLabel: "2025",
    role: "Project Intern",
    org: "Infosys — Decentralized Slot Booking",
    company: "Infosys",
    tag: "Infosys",
    projectTitle: "Decentralized Slot Booking System",
    initials: "IN",
    logoUrl: "/logos/infosys.png",
    points: [
      "Architected Beckn-compliant microservices across Gateway, BAP, BPP, and AI Service.",
      "Built distributed async workflows orchestrating inter-service communication to protocol standards.",
    ],
    tech: ["Python", "FastAPI", "Microservices", "Docker", "PostgreSQL", "REST APIs"],
    metrics: ["Distributed Architecture", "Production Ready", "Async Communication"],
    githubLink: "https://github.com/Pavan-Sanjana-KLE/Beckn-dapp-infosys",
  },
];

export const projectsSubtitle =
  "A collection of production software, AI systems, blockchain applications, research, and data engineering projects built to solve real-world problems.";

export const projectFilters = [
  "All",
  "AI",
  "Full Stack",
  "Blockchain",
  "Research",
  "ML",
  "Data Engineering",
] as const;

export type ProjectFilter = (typeof projectFilters)[number];
export type ProjectCategory = Exclude<ProjectFilter, "All">;

export type ProjectTypeBadge =
  | "AI"
  | "Full Stack"
  | "Blockchain"
  | "Research"
  | "Data Engineering"
  | "IoT"
  | "Machine Learning";

export type ProjectSection = "featured" | "production" | "research";

export type ProjectContext =
  | "Personal Project"
  | "Research"
  | "Internship"
  | "Freelance";

export type Project = {
  slug: string;
  section: ProjectSection;
  typeBadge: ProjectTypeBadge;
  typeLabel?: string;
  filters: ProjectCategory[];
  category: ProjectCategory;
  tag: string;
  title: string;
  description: string;
  highlights: string[];
  stack: string[];
  github: string | null;
  demo: string | null;
  paper: string | null;
  report?: string | null;
  reportLabel?: string;
  tags?: string[];
  metrics?: string[];
  featured?: boolean;
  imageUrl?: string | null;
  problem?: string;
  solution?: string;
  impact?: string;
  badge: string | null;
  year: string;
  teamSize: number;
  context: ProjectContext;
  challenges: string;
  learnings: string;
  timeline: string;
  screenshots: string[];
};

export const projects: Project[] = [
  {
    slug: "moneyflow-ai",
    section: "production",
    typeBadge: "AI",
    typeLabel: "AI + Full Stack",
    filters: ["AI", "Full Stack"],
    category: "AI",
    tag: "AI + Full Stack",
    title: "MoneyFlow AI",
    description:
      "AI-powered personal finance platform with voice expense tracking, multi-currency analytics, AI budgeting assistant, secure authentication, automated deployment, and infrastructure monitoring.",
    highlights: [
      "AI-powered voice expense tracking",
      "LLM financial insights and budgeting",
      "Docker deployment with Grafana monitoring",
      "Groq Whisper speech recognition",
    ],
    stack: ["React", "Node.js", "FastAPI", "Python", "Docker", "PostgreSQL", "Grafana", "Groq"],
    github: "https://github.com/Pavan-Sanjana-KLE/MoneyFlowAI",
    demo: null,
    paper: null,
    featured: false,
    imageUrl: null,
    badge: null,
    year: "2026",
    teamSize: 2,
    context: "Personal Project",
    problem:
      "Manual expense tracking is slow, error-prone, and lacks intelligent budgeting guidance across multiple currencies.",
    solution:
      "Built a full-stack finance platform with voice input, LLM-powered insights, secure auth, containerized deployment, and real-time monitoring.",
    impact: "Delivered AI-powered voice expense tracking with production-grade deployment and observability.",
    challenges: "[PLACEHOLDER]",
    learnings: "[PLACEHOLDER]",
    timeline: "2026",
    screenshots: [],
  },
  {
    slug: "multimodal-research-paper-copilot",
    section: "production",
    typeBadge: "AI",
    typeLabel: "Generative AI",
    filters: ["AI", "Research"],
    category: "AI",
    tag: "Generative AI",
    title: "Multimodal Research Paper Copilot",
    description:
      "Research paper assistant powered by Retrieval-Augmented Generation, semantic search, conversational memory, diagram synthesis, and voice interaction.",
    highlights: [
      "Citation-grounded RAG assistant",
      "FAISS semantic search with LlamaIndex",
      "Automated diagram generation",
      "Speech recognition for hands-free queries",
    ],
    stack: ["Python", "FastAPI", "RAG", "FAISS", "LlamaIndex", "LangChain", "Groq"],
    github: "https://github.com/sanjanashetti13/langchain1-project",
    demo: null,
    paper: "/research%20ppers/Gen_AI_Paper_IEEE.pdf",
    featured: false,
    imageUrl: null,
    badge: null,
    year: "2025",
    teamSize: 1,
    context: "Internship",
    problem:
      "Researchers struggle to extract insights from dense papers while maintaining citation accuracy across multimodal content.",
    solution:
      "Engineered a RAG pipeline with semantic retrieval, conversational memory, diagram synthesis, and voice-driven interaction.",
    impact: "Enabled citation-grounded Q&A and multimodal research assistance with semantic search.",
    challenges: "[PLACEHOLDER]",
    learnings: "[PLACEHOLDER]",
    timeline: "2025 – 2026",
    screenshots: [],
  },
  {
    slug: "blockchain-certificate-verification",
    section: "production",
    typeBadge: "Blockchain",
    filters: ["Blockchain"],
    category: "Blockchain",
    tag: "Blockchain",
    title: "Blockchain Academic Certificate Verification",
    description:
      "Tamper-proof academic certificate verification platform using Ethereum smart contracts, SHA-256 hashing, MetaMask authentication, and IPFS storage.",
    highlights: [
      "Ethereum smart contracts with Solidity",
      "SHA-256 certificate hashing",
      "MetaMask wallet authentication",
      "IPFS decentralized document storage",
    ],
    stack: ["Solidity", "Ethereum", "React", "Node.js", "IPFS", "MetaMask", "Web3.js"],
    github: "https://github.com/Pavan-Sanjana-KLE/AIML-blockchain-project",
    demo: null,
    paper: null,
    featured: false,
    imageUrl: null,
    badge: null,
    year: "2025",
    teamSize: 3,
    context: "Personal Project",
    problem:
      "Academic credentials are vulnerable to forgery and lack a transparent, tamper-proof verification mechanism.",
    solution:
      "Deployed Ethereum smart contracts with SHA-256 hashing, MetaMask auth, and IPFS for immutable certificate storage.",
    impact: "Delivered tamper-proof on-chain certificate verification with decentralized document storage.",
    challenges: "[PLACEHOLDER]",
    learnings: "[PLACEHOLDER]",
    timeline: "2025",
    screenshots: [],
  },
  {
    slug: "telecom-churn-intelligence",
    section: "production",
    typeBadge: "Data Engineering",
    typeLabel: "IIDMC + Power BI",
    filters: ["Data Engineering", "Research"],
    category: "Data Engineering",
    tag: "Data Engineering",
    title: "Telecom Customer Churn Intelligence",
    description:
      "End-to-end data engineering pipeline analyzing telecom customer churn with star-schema modeling and interactive Power BI dashboards.",
    highlights: [
      "End-to-end ETL pipeline",
      "1,500+ telecom records analyzed",
      "Star schema dimensional modeling",
      "Power BI executive dashboard",
    ],
    stack: ["Python", "SQL", "Power BI", "ETL", "Pandas", "Star Schema"],
    github: "https://github.com/sanjanashetti13", // [PLACEHOLDER: churn intelligence repo URL]
    demo: null,
    paper: null,
    report: "/reports/IIMDC-report.pdf",
    imageUrl: null,
    badge: null,
    year: "2025",
    teamSize: 2,
    context: "Research",
    problem:
      "Telecom operators need actionable churn insights from fragmented customer data across billing and usage records.",
    solution:
      "Built an ETL pipeline processing 1,500+ records into a star schema with Power BI dashboards for churn analysis.",
    impact: "Analyzed 1,500+ telecom records with dimensional modeling and executive-ready visualizations.",
    challenges: "[PLACEHOLDER]",
    learnings: "[PLACEHOLDER]",
    timeline: "2025",
    screenshots: [],
  },
  {
    slug: "alumni-setu",
    section: "production",
    typeBadge: "Full Stack",
    typeLabel: "Networking Platform",
    filters: ["Full Stack"],
    category: "Full Stack",
    tag: "Full Stack",
    title: "AlumniSetu",
    description:
      "Full-stack alumni networking platform enabling mentorship, job referrals, and real-time messaging with role-based access control.",
    highlights: [
      "Real-time messaging with Ably",
      "JWT authentication and RBAC",
      "Prisma ORM with PostgreSQL",
      "Alumni–student mentorship matching",
    ],
    stack: ["React", "Node.js", "Prisma", "PostgreSQL", "JWT", "Ably", "REST APIs"],
    github: "https://github.com/Pavan-Sanjana-KLE/alumni-setu",
    demo: null,
    paper: null,
    imageUrl: null,
    badge: null,
    year: "2025",
    teamSize: 4,
    context: "Personal Project",
    problem:
      "Alumni and students lack a centralized platform for mentorship, referrals, and institutional engagement.",
    solution:
      "Developed a networking platform with real-time messaging, JWT auth, RBAC, and Prisma-backed data modeling.",
    impact: "Enabled real-time alumni–student communication with secure role-based access.",
    challenges: "[PLACEHOLDER]",
    learnings: "[PLACEHOLDER]",
    timeline: "2025",
    screenshots: [],
  },
  {
    slug: "smartquote",
    section: "production",
    typeBadge: "Full Stack",
    typeLabel: "Quotation Automation",
    filters: ["Full Stack"],
    category: "Full Stack",
    tag: "Full Stack",
    title: "SmartQuote",
    description:
      "Production quotation and invoice automation platform with GST compliance, Excel bulk imports, and CI/CD deployment.",
    highlights: [
      "Automated invoice generation",
      "GST calculation automation",
      "Excel bulk product import",
      "CI/CD deployment on Vercel",
    ],
    stack: ["Next.js", "React", "Node.js", "PostgreSQL", "Vercel", "CI/CD"],
    github: "https://github.com/sanjanashetti13", // [PLACEHOLDER: SmartQuote repo URL]
    demo: null,
    paper: null,
    imageUrl: null,
    badge: null,
    year: "2026",
    teamSize: 1,
    context: "Freelance",
    problem:
      "Retail teams spent hours manually preparing quotations across 1,000+ products with error-prone GST calculations.",
    solution:
      "Built a full-stack platform with Excel bulk imports, automated GST logic, product management, and CI/CD on Vercel.",
    impact: "Cut quotation preparation time by 80% while supporting 1,000+ products in production.",
    challenges: "[PLACEHOLDER]",
    learnings: "[PLACEHOLDER]",
    timeline: "2026",
    screenshots: [],
  },
  {
    slug: "real-time-speaker-verification",
    section: "research",
    typeBadge: "Machine Learning",
    filters: ["ML", "Research", "AI"],
    category: "ML",
    tag: "Machine Learning",
    title: "Real-Time Speaker Verification",
    description:
      "Hybrid CNN-GRU speaker verification system with Whisper transcription and BART-powered meeting summaries achieving 5.96% equal error rate.",
    highlights: [
      "Hybrid CNN-GRU architecture",
      "Whisper speech transcription",
      "BART meeting summary generation",
      "5.96% equal error rate (EER)",
    ],
    stack: ["Python", "PyTorch", "Whisper", "BART", "CNN", "GRU", "FastAPI"],
    github: "https://github.com/Pavan-Sanjana-KLE/Speaker-Identification-and-summarization",
    demo: null,
    paper: null, // [PLACEHOLDER: research paper URL]
    imageUrl: null,
    badge: null,
    year: "2025",
    teamSize: 2,
    context: "Research",
    problem:
      "Meeting platforms need reliable speaker identification and automated summaries in real-time multi-speaker environments.",
    solution:
      "Designed a hybrid CNN-GRU verification model integrated with Whisper and BART for transcription and summarization.",
    impact: "Achieved 5.96% EER with automated meeting summaries from verified speaker segments.",
    challenges: "[PLACEHOLDER]",
    learnings: "[PLACEHOLDER]",
    timeline: "2025",
    screenshots: [],
  },
  {
    slug: "ai-bitcoin-block-optimization",
    section: "research",
    typeBadge: "Research",
    filters: ["Research", "ML", "Blockchain", "AI"],
    category: "Research",
    tag: "Research",
    title: "AI Bitcoin Candidate Block Optimization",
    description:
      "IEEE research on AI-driven Bitcoin mempool optimization using XGBoost to analyze 11M+ transactions for candidate block selection.",
    highlights: [
      "IEEE research publication",
      "11M+ blockchain transactions processed",
      "XGBoost mempool prediction",
      "FastAPI inference service",
    ],
    stack: ["Python", "XGBoost", "FastAPI", "Pandas", "Scikit-learn", "Bitcoin"],
    github: "https://github.com/sanjanashetti13", // [PLACEHOLDER: Bitcoin optimization repo URL]
    demo: null,
    paper: "/research%20ppers/mempool%20blockchain-paper.pdf",
    imageUrl: null,
    badge: null,
    year: "2025",
    teamSize: 2,
    context: "Research",
    problem:
      "Bitcoin miners lack data-driven tools to optimize candidate block selection from massive mempool transaction volumes.",
    solution:
      "Trained XGBoost models on 11M+ transactions with a FastAPI service for real-time candidate block optimization.",
    impact: "Processed 11M+ blockchain transactions with ML-driven mempool optimization published as IEEE research.",
    challenges: "[PLACEHOLDER]",
    learnings: "[PLACEHOLDER]",
    timeline: "2025",
    screenshots: [],
  },
  {
    slug: "5g-edge-network-security",
    section: "research",
    typeBadge: "Research",
    typeLabel: "Networking · Cybersecurity",
    filters: ["Research"],
    category: "Research",
    tag: "5G · Edge Computing",
    title: "Detection and Mitigation of Security Threats in Simulated 5G Edge Networks",
    description:
      "Designed and simulated a complete 5G Standalone (SA) network using Open5GS and UERANSIM to detect and mitigate real-world security threats including DDoS attacks, wireless mobility disruption, and unauthorized subscriber access.",
    highlights: [
      "Simulated a complete 5G Standalone network using Open5GS and UERANSIM.",
      "Built an edge computing environment with NGINX load balancing.",
      "Simulated DDoS attacks with firewall-based mitigation using iptables.",
      "Demonstrated wireless mobility disruption and automatic reassociation using Mininet-WiFi.",
      "Implemented subscriber authentication and rogue UE detection using Open5GS.",
      "Validated secure PDU session establishment and traffic routing.",
    ],
    tags: [
      "5G",
      "Cybersecurity",
      "Wireless Networks",
      "Open5GS",
      "Edge Computing",
      "Network Security",
    ],
    stack: [
      "Open5GS",
      "UERANSIM",
      "Mininet-WiFi",
      "NGINX",
      "Python",
      "Linux",
      "Ubuntu",
      "iptables",
      "TCP/IP",
      "5G",
      "Edge Computing",
    ],
    metrics: [
      "500 Concurrent HTTP Requests",
      "Successful Rogue UE Detection",
      "~3s Wireless Recovery",
      "Two Edge Servers",
      "Complete 5G SA Simulation",
    ],
    github: "https://github.com/sanjanashetti13", // [PLACEHOLDER: 5G edge network repo URL]
    demo: null,
    paper: "/reports/5g-edge-network-paper.pdf",
    featured: true,
    imageUrl: "/projects/5g-network.png",
    badge: "Research Project",
    year: "2025",
    teamSize: 2,
    context: "Research",
    problem:
      "5G edge networks face DDoS floods, wireless mobility attacks, and unauthorized subscriber access that are difficult to study without a realistic standalone testbed.",
    solution:
      "Built a full 5G SA simulation with Open5GS and UERANSIM, edge load balancing via NGINX, iptables mitigation, Mininet-WiFi mobility testing, and Open5GS rogue UE detection.",
    impact:
      "Validated threat detection and mitigation across 500 concurrent requests, rogue UE identification, ~3s wireless recovery, and secure PDU session routing on two edge servers.",
    challenges: "[PLACEHOLDER]",
    learnings: "[PLACEHOLDER]",
    timeline: "2025",
    screenshots: [],
  },
  {
    slug: "hydroops",
    section: "production",
    typeBadge: "AI",
    typeLabel: "Smart Water Systems",
    filters: ["AI", "Full Stack"],
    category: "AI",
    tag: "AI + IoT",
    title: "HydroOps",
    description:
      "AI-driven smart water distribution system that placed top 3 nationally at Samved Hackathon 2026 — improving allocation accuracy to 90% across zones.",
    highlights: [
      "Top 3 of 500+ teams — All India",
      "AI-driven zone allocation",
      "90% allocation accuracy",
      "Samved Hackathon 2026",
    ],
    stack: ["Python", "FastAPI", "Machine Learning", "React", "IoT", "REST APIs"],
    github: "https://github.com/Team-HydroOps/HydroOps",
    demo: null,
    paper: null,
    report: "/reports/HydroOps-report.pdf",
    featured: false,
    imageUrl: null,
    badge: "#3 All India",
    year: "2026",
    teamSize: 4,
    context: "Personal Project",
    problem:
      "Urban water distribution lacks intelligent zone-based allocation, leading to inefficiency and supply imbalances.",
    solution:
      "Built HydroOps with ML-driven allocation logic to optimize water distribution across zones in real time.",
    impact: "Achieved 90% allocation accuracy and placed #3 nationally at Samved Hackathon 2026.",
    challenges: "[PLACEHOLDER]",
    learnings: "[PLACEHOLDER]",
    timeline: "2026",
    screenshots: [],
  },
];

export const skills = [
  { category: "Languages", items: ["Python", "C++", "JavaScript", "HTML", "CSS"] },
  { category: "Frameworks & Libraries", items: ["React.js", "Node.js", "FastAPI", "LangChain", "Flutter"] },
  { category: "AI / Machine Learning", items: ["Machine Learning", "Generative AI", "LLMs", "RAG", "EDA"] },
  { category: "Backend & Architecture", items: ["REST APIs", "Microservices", "Full-Stack Dev", "Blockchain"] },
  { category: "Databases", items: ["MongoDB", "MSSQL", "Schema Design", "ORM"] },
  { category: "Tools & Platforms", items: ["Git", "Linux", "Ansible", "CI/CD", "Vercel"] },
];

export type AchievementEntry = {
  rank: string;
  scope: string;
  title: string;
  description: string;
  prize: string;
};

export const achievements: AchievementEntry[] = [
  {
    rank: "#3",
    scope: "All India",
    title: "Samved Hackathon 2026",
    description:
      "Placed in the top 3 of 500+ teams nationwide with an AI-driven smart water distribution system — improving allocation accuracy to 90% across zones.",
    prize: "₹50,000 Award",
  },
  {
    rank: "96%",
    scope: "PUC II Board",
    title: "Board Examination",
    description:
      "Scored 96% in the PUC II board examination at Vidyaniketan PU Science College, Hubli, Karnataka.",
    prize: "Distinction",
  },
];

export const education = [
  {
    years: "2023 – 2027",
    school: "KLE Technological University",
    degree: "Bachelor of Engineering, Computer Science — Hubli, Karnataka",
  },
  {
    years: "2021 – 2023",
    school: "Vidyaniketan PU Science College",
    degree: "Pre-University Course — Hubli, Karnataka",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};

// [PLACEHOLDER: no posts yet — ship the index with an empty-state message]
export const blogPosts: BlogPost[] = [];
