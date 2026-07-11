export const profile = {
  name: "Sanjana Shetti",
  initials: "SS",
  roles: ["Full-Stack Developer", "AI & GenAI Engineer", "Systems Builder"],
  heroTitle: "AI & Full Stack Developer",
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
    tech: [],
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
    tech: [],
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
    tech: [],
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
  | "Course Project"
  | "Internship"
  | "Freelance";

export type HighlightPillVariant = "default" | "award" | "research" | "accent";

export type ProjectHighlightPill = {
  label: string;
  variant?: HighlightPillVariant;
};

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
  cardDescription: string;
  highlights: string[];
  highlightPills: ProjectHighlightPill[];
  highlightNote?: string;
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
  role: string;
  status: string;
  problem: string;
  solution: string;
  impact: string;
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
      "Manual expense tracking falls apart across currencies and busy daily routines. Built a full-stack finance platform with AI budgeting insights and containerized monitoring — making logging streamlined and spending visible in production.",
    cardDescription: "Full-stack finance app with AI budgeting and production deployment.",
    highlights: [
      "Designed multi-currency expense logging with structured categorization and PostgreSQL storage",
      "Built FastAPI + PostgreSQL services with secure auth and Dockerized deployment",
      "Shipped Grafana dashboards for real-time API and infrastructure observability",
      "Delivered LLM-powered budgeting recommendations from transaction history",
    ],
    highlightPills: [
      { label: "Dockerized" },
      { label: "Kubernetes" },
      { label: "Cloud Deployment" },
      { label: "Multi-Currency" },
      { label: "LLM Budgeting" },
      { label: "Production Ready", variant: "accent" },
    ],
    stack: ["React", "Node.js", "FastAPI", "Python", "Docker", "PostgreSQL", "Grafana"],
    github: "https://github.com/Pavan-Sanjana-KLE/MoneyFlowAI",
    demo: null,
    paper: null,
    metrics: ["Expense Tracking", "Docker + Grafana", "Multi-Currency", "Production Deployment"],
    featured: false,
    imageUrl: null,
    role: "Full-Stack Developer",
    status: "Completed",
    badge: null,
    year: "2026",
    teamSize: 2,
    context: "Personal Project",
    problem:
      "People skip expense tracking because manual entry is slow, error-prone, and gets harder when spending spans multiple currencies and payment methods.",
    solution:
      "Built a full-stack finance platform with FastAPI services, PostgreSQL storage, secure authentication, Docker deployment, and Grafana monitoring — with an LLM layer for budgeting guidance.",
    impact:
      "Delivered reliable expense tracking with production-grade deployment and observability, making daily spending easier to log and analyze across currencies.",
    challenges:
      "Designing accurate expense categorization and multi-currency normalization required careful API design. Containerizing the React, Node.js, and FastAPI services while keeping Grafana metrics reliable added real deployment complexity.",
    learnings:
      "Learned to treat observability as a first-class requirement and to keep expense data models flexible enough for multi-currency workflows without sacrificing reporting clarity.",
    timeline: "Jan 2026 – Mar 2026",
    screenshots: [],
  },
  {
    slug: "multimodal-research-paper-copilot",
    section: "production",
    typeBadge: "AI",
    typeLabel: "Generative AI · Course Project",
    filters: ["AI", "Research"],
    category: "AI",
    tag: "Generative AI",
    title: "Multimodal Research Paper Copilot",
    description:
      "Researchers lose hours pulling insights from dense papers while keeping citations accurate. Built a citation-grounded RAG assistant with semantic search, diagram generation, and voice queries — every answer traceable to source material.",
    cardDescription: "Citation-grounded RAG assistant for research papers with voice queries.",
    highlights: [
      "Indexed research corpora with FAISS and LlamaIndex for fast semantic retrieval",
      "Engineered LangChain pipelines with conversational memory and citation grounding",
      "Automated diagram synthesis from paper content for faster visual comprehension",
      "Integrated Groq speech recognition for hands-free literature review",
    ],
    highlightPills: [
      { label: "RAG Pipeline", variant: "research" },
      { label: "FastAPI" },
      { label: "FAISS Search" },
      { label: "LangChain" },
      { label: "Diagram Generation" },
      { label: "Voice Interface" },
    ],
    stack: ["Python", "FastAPI", "RAG", "FAISS", "LlamaIndex", "LangChain", "Groq"],
    github: "https://github.com/sanjanashetti13/langchain1-project",
    demo: null,
    paper: "/research%20ppers/Gen_AI_Paper_IEEE.pdf",
    metrics: ["Citation-Grounded RAG", "FAISS Semantic Search", "Multimodal Output", "IEEE Publication"],
    featured: false,
    imageUrl: null,
    role: "AI Engineer",
    status: "Published",
    badge: null,
    year: "2025",
    teamSize: 1,
    context: "Course Project",
    problem:
      "Literature review is slow when researchers must cross-reference dense papers, diagrams, and prior context while ensuring every claim stays citation-accurate.",
    solution:
      "Engineered a RAG pipeline with FAISS semantic search, LlamaIndex indexing, LangChain orchestration, diagram synthesis, and voice-driven queries behind a FastAPI service.",
    impact:
      "Enabled citation-grounded Q&A and multimodal research assistance that cuts time spent hunting through papers, published as IEEE research.",
    challenges:
      "Balancing retrieval precision with conversational memory without hallucinating citations was the core engineering challenge. Multimodal outputs added another layer of validation to keep generated diagrams aligned with source content.",
    learnings:
      "Strengthened my approach to grounding LLM outputs in retrieved evidence and designing RAG systems where traceability matters as much as answer quality.",
    timeline: "Sep 2025 – Jan 2026",
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
      "Academic credentials are easy to forge and slow to verify manually. Deployed an on-chain verification system with hashed certificates on Ethereum and documents on IPFS — giving institutions tamper-proof proof in seconds.",
    cardDescription: "Tamper-proof academic certificate verification on Ethereum and IPFS.",
    highlights: [
      "Wrote Solidity smart contracts for immutable certificate registration and lookup",
      "Implemented SHA-256 hashing to bind document integrity to on-chain records",
      "Connected MetaMask authentication and Web3.js for wallet-based issuer and verifier flows",
      "Stored certificate files on IPFS for decentralized, tamper-resistant document access",
    ],
    highlightPills: [
      { label: "Ethereum" },
      { label: "Solidity" },
      { label: "IPFS" },
      { label: "MetaMask" },
      { label: "Web3" },
      { label: "Tamper Proof", variant: "accent" },
    ],
    stack: ["Solidity", "Ethereum", "React", "Node.js", "IPFS", "MetaMask", "Web3.js"],
    github: "https://github.com/sanjanashetti13/EduChainGuard-with-geth",
    demo: null,
    paper: null,
    metrics: ["On-Chain Verification", "IPFS Storage", "SHA-256 Hashing", "MetaMask Auth"],
    featured: false,
    imageUrl: null,
    role: "Full-Stack Developer",
    status: "Completed",
    badge: null,
    year: "2025",
    teamSize: 3,
    context: "Personal Project",
    problem:
      "Universities and employers lack a fast, transparent way to confirm whether an academic certificate is authentic and unaltered.",
    solution:
      "Deployed Ethereum smart contracts with SHA-256 certificate hashing, MetaMask-based authentication, and IPFS document storage behind a React and Node.js application.",
    impact:
      "Delivered tamper-proof certificate verification where document integrity is cryptographically tied to an on-chain record employers can trust.",
    challenges:
      "Getting smart contract state, IPFS uploads, and wallet authentication to work reliably across issuer and verifier roles required tight coordination between on-chain and off-chain components.",
    learnings:
      "Gained hands-on experience bridging Web3 primitives with a usable product flow — where security properties only matter if the UX makes verification straightforward.",
    timeline: "Aug 2025 – Nov 2025",
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
      "Telecom teams couldn't see why customers churned across fragmented billing and usage data. Built using Informatica Intelligent Cloud Services (IICS) with an end-to-end ETL pipeline into a star schema and Power BI dashboards — surfacing churn drivers leadership could act on.",
    cardDescription: "IICS-powered churn analytics with ETL pipelines and Power BI dashboards.",
    highlights: [
      "Designed Python ETL pipelines ingesting and cleaning 1,500+ customer records",
      "Modeled a star schema separating dimensions from churn fact tables for fast analytics",
      "Built Power BI executive dashboards with drill-downs on retention and revenue risk",
      "Standardized data quality checks to catch anomalies before dashboard refresh",
    ],
    highlightPills: [
      { label: "Informatica Cloud", variant: "accent" },
      { label: "Data Integration" },
      { label: "ETL Pipeline" },
      { label: "Power BI" },
      { label: "Star Schema" },
      { label: "Data Engineering" },
    ],
    highlightNote: "Built with Informatica Intelligent Cloud Services (IICS) for enterprise data integration.",
    stack: ["Informatica Cloud", "Python", "SQL", "Power BI", "ETL", "Pandas", "Star Schema"],
    github: null,
    demo: null,
    paper: null,
    report: "/reports/IIMDC-report.pdf",
    metrics: ["1,500+ Records", "Star Schema Modeling", "Power BI Dashboards", "End-to-End ETL"],
    imageUrl: null,
    role: "Data Engineer",
    status: "Completed",
    badge: null,
    year: "2025",
    teamSize: 2,
    context: "Research",
    problem:
      "Customer churn signals were buried across disconnected billing, contract, and usage datasets — making proactive retention nearly impossible.",
    solution:
      "Built Python ETL pipelines processing 1,500+ records into a star schema dimensional model, then delivered Power BI dashboards for churn analysis and executive reporting.",
    impact:
      "Turned raw telecom data into actionable churn intelligence with dimensional modeling and executive-ready visualizations leadership could use for retention decisions.",
    challenges:
      "Reconciling inconsistent field formats and missing values across source tables before modeling required disciplined cleaning rules. Designing the star schema for both analyst flexibility and dashboard performance took iteration.",
    learnings:
      "Learned that strong analytics starts with modeling decisions — the ETL and schema work determines whether dashboards answer real business questions or just look polished.",
    timeline: "Jul 2025 – Oct 2025",
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
      "Alumni and students had no single place for mentorship, referrals, or real-time conversation. Built a full-stack networking platform with JWT auth, role-based access, and live messaging — connecting both sides securely.",
    cardDescription: "Alumni–student platform with real-time messaging, JWT auth, and RBAC.",
    highlights: [
      "Architected React and Node.js REST APIs with Prisma ORM over PostgreSQL",
      "Implemented JWT authentication with role-based access for alumni, students, and admins",
      "Integrated Ably for real-time messaging with persistent conversation history",
      "Designed mentorship matching flows linking students to relevant alumni mentors",
    ],
    highlightPills: [
      { label: "Ably Realtime", variant: "accent" },
      { label: "React" },
      { label: "Node.js" },
      { label: "Prisma ORM" },
      { label: "PostgreSQL" },
      { label: "JWT Auth" },
    ],
    stack: ["React", "Node.js", "Prisma", "PostgreSQL", "JWT", "Ably", "REST APIs"],
    github: "https://github.com/Pavan-Sanjana-KLE/alumni-setu",
    demo: null,
    paper: null,
    metrics: ["Real-Time Messaging", "JWT + RBAC", "Team of 4", "PostgreSQL + Prisma"],
    imageUrl: null,
    role: "Full-Stack Developer",
    status: "Completed",
    badge: null,
    year: "2025",
    teamSize: 4,
    context: "Personal Project",
    problem:
      "Institutions lose alumni engagement because mentorship, job referrals, and student outreach happen across scattered channels with no secure, role-aware platform.",
    solution:
      "Developed a networking platform with JWT authentication, role-based access control, Prisma-backed data modeling, and Ably-powered real-time messaging.",
    impact:
      "Enabled secure alumni–student communication and mentorship matching in one platform instead of fragmented email chains and informal groups.",
    challenges:
      "Designing RBAC that felt simple to users while enforcing strict permissions across messaging and profile data was non-trivial. Real-time delivery with Ably had to stay consistent with persisted chat history in PostgreSQL.",
    learnings:
      "Reinforced how auth, data modeling, and real-time infrastructure decisions shape product trust — especially in community platforms where access boundaries matter.",
    timeline: "Mar 2025 – Jun 2025",
    screenshots: [],
  },
  {
    slug: "smartquote",
    section: "production",
    typeBadge: "Full Stack",
    typeLabel: "Freelance · Production",
    filters: ["Full Stack"],
    category: "Full Stack",
    tag: "Full Stack",
    title: "SmartQuote",
    description:
      "Klean Tech Systems relied on manual spreadsheets for quotations and GST invoicing across 1,000+ products. Built and deployed a production platform with Excel bulk import, automated tax logic, and CI/CD on Vercel — cutting quotation prep time by 80%.",
    cardDescription: "Production quoting platform — Excel import, GST automation, 1,000+ products.",
    highlights: [
      "Deployed a production platform managing 1,000+ products with Excel bulk imports",
      "Automated GST calculations and invoice generation for client billing workflows",
      "Shipped CI/CD on Vercel with PostgreSQL-backed product and quotation management",
      "Reduced quotation preparation time by 80% for the operations team",
    ],
    highlightPills: [
      { label: "Production Software", variant: "accent" },
      { label: "Excel Import" },
      { label: "GST Automation" },
      { label: "CI/CD" },
      { label: "1000+ Products" },
      { label: "Vercel Deployment" },
    ],
    stack: ["Next.js", "React", "Node.js", "PostgreSQL", "Vercel", "CI/CD"],
    github: "https://github.com/flynnrapunzel913-ship-it/smartquotation-app",
    demo: "https://smartquotation-app-teal.vercel.app/",
    paper: null,
    metrics: ["1,000+ Products", "80% Faster", "Production Ready", "CI/CD"],
    featured: false,
    imageUrl: null,
    role: "Freelance Full-Stack Developer",
    status: "Production",
    badge: null,
    year: "2026",
    teamSize: 1,
    context: "Freelance",
    problem:
      "Klean Tech Systems managed over 1,000 products with manual spreadsheets, slowing quotations and introducing GST calculation errors.",
    solution:
      "Built a Next.js and Node.js platform with PostgreSQL, Excel bulk import, automated GST invoicing, and Vercel CI/CD for production deployment.",
    impact:
      "Cut quotation preparation time by 80% and gave the client a production-ready system for 1,000+ products.",
    challenges:
      "Migrating messy spreadsheet data into a normalized schema without breaking existing product catalogs required careful import validation. Automating GST rules while keeping invoices flexible for edge cases added business-logic complexity under a tight freelance timeline.",
    learnings:
      "Learned to ship production software for a real client where reliability, deployment automation, and domain-specific tax logic matter as much as the UI.",
    timeline: "May 2026 – Present",
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
      "Meeting platforms struggle to identify who spoke and summarize discussions accurately. Built a hybrid CNN-GRU verification model with Whisper transcription and BART summarization — achieving 5.96% equal error rate on speaker ID.",
    cardDescription: "Speaker verification + meeting summaries — 5.96% EER with Whisper and BART.",
    highlights: [
      "Trained hybrid CNN-GRU embeddings reaching 5.96% equal error rate on speaker verification",
      "Pipelined Whisper transcription to convert verified speaker segments into text",
      "Generated meeting summaries with BART from diarized, speaker-labeled transcripts",
      "Exposed inference through FastAPI for modular real-time processing",
    ],
    highlightPills: [
      { label: "GRU" },
      { label: "Whisper AI", variant: "accent" },
      { label: "BART" },
      { label: "FastAPI" },
      { label: "Speaker Verification" },
      { label: "Meeting Summaries" },
    ],
    stack: ["Python", "PyTorch", "Whisper", "BART", "CNN", "GRU", "FastAPI"],
    github: "https://github.com/Pavan-Sanjana-KLE/Speaker-Identification-and-summarization",
    demo: null,
    paper: null,
    metrics: ["5.96% EER", "Whisper + BART Pipeline", "Hybrid CNN-GRU", "FastAPI Inference"],
    imageUrl: null,
    role: "ML Engineer",
    status: "Completed",
    badge: null,
    year: "2025",
    teamSize: 2,
    context: "Research",
    problem:
      "Multi-speaker meetings need reliable speaker identification before transcription and summarization can be trusted — especially in noisy, real-time environments.",
    solution:
      "Designed a hybrid CNN-GRU speaker verification model integrated with Whisper for transcription and BART for summarization, served through a FastAPI inference layer.",
    impact:
      "Achieved 5.96% EER on speaker verification and automated meeting summaries from verified speaker segments — a pipeline that ties identity to content.",
    challenges:
      "Tuning the CNN-GRU model for low EER while keeping inference fast enough for practical use required careful trade-offs on embedding size and audio preprocessing. Chaining verification, transcription, and summarization without error propagation was equally demanding.",
    learnings:
      "Learned how to compose specialized models into a pipeline where each stage's accuracy directly affects downstream output quality.",
    timeline: "Feb 2025 – May 2025",
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
      "Miners pick mempool transactions without data-driven fee optimization at scale. Trained XGBoost on 11M+ Bitcoin transactions and deployed a FastAPI inference service — published as IEEE research on smarter candidate block selection.",
    cardDescription: "IEEE-published ML research optimizing Bitcoin blocks from 11M+ transactions.",
    highlights: [
      "Processed and feature-engineered 11M+ mempool transactions for model training",
      "Trained XGBoost models predicting high-fee transaction inclusion in candidate blocks",
      "Deployed FastAPI inference service for real-time block composition recommendations",
      "Published findings as IEEE research on AI-driven mempool optimization",
    ],
    highlightPills: [
      { label: "Novel Research", variant: "research" },
      { label: "Published Journal", variant: "research" },
      { label: "XGBoost" },
      { label: "Blockchain ML" },
      { label: "11M Transactions", variant: "accent" },
      { label: "Bitcoin Analytics" },
    ],
    stack: ["Python", "XGBoost", "FastAPI", "Pandas", "Scikit-learn", "Bitcoin"],
    github: "https://github.com/Pavan-Sanjana-KLE/AIML-blockchain-project",
    demo: null,
    paper: "/research%20ppers/mempool%20blockchain-paper.pdf",
    metrics: ["11M+ Transactions", "XGBoost ML Pipeline", "FastAPI Service", "IEEE Publication"],
    imageUrl: null,
    role: "Research Engineer",
    status: "Published",
    badge: null,
    year: "2025",
    teamSize: 2,
    context: "Research",
    problem:
      "Bitcoin miners lack data-driven tools to optimize candidate block selection when mempools contain millions of transactions with varying fee priorities.",
    solution:
      "Trained XGBoost models on 11M+ blockchain transactions and wrapped inference in a FastAPI service for real-time candidate block optimization recommendations.",
    impact:
      "Demonstrated ML-driven mempool optimization at scale and published the work as IEEE research — bridging blockchain domain knowledge with production ML engineering.",
    challenges:
      "Feature engineering across 11M+ transactions demanded efficient pipelines and careful handling of class imbalance in fee-priority signals. Making the inference service responsive enough for practical block composition scenarios added another engineering layer.",
    learnings:
      "Strengthened my ability to take research from raw blockchain data through model training to a deployable API — where scale and latency constraints shape every design choice.",
    timeline: "Jan 2025 – Apr 2025",
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
      "5G edge networks face DDoS, mobility attacks, and rogue devices — hard to study without a realistic testbed. Built a full 5G SA simulation with edge load balancing and layered mitigations — validating threat response under production-like load.",
    cardDescription: "5G SA security testbed — DDoS, rogue UE detection, and edge mitigations.",
    highlights: [
      "Deployed a full 5G SA testbed with Open5GS, UERANSIM, and dual NGINX edge servers",
      "Simulated DDoS at 500 concurrent HTTP requests with iptables firewall mitigation",
      "Detected rogue UE attempts through Open5GS subscriber authentication controls",
      "Validated ~3s wireless reassociation recovery under Mininet-WiFi mobility attacks",
    ],
    highlightPills: [
      { label: "Open5GS", variant: "research" },
      { label: "UERANSIM" },
      { label: "Edge Computing" },
      { label: "5G Security", variant: "accent" },
      { label: "DDoS Mitigation" },
      { label: "Mininet-WiFi" },
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
    github: null,
    demo: null,
    paper: "/reports/5g-edge-network-paper.pdf",
    featured: true,
    imageUrl: "/projects/5g-network.png",
    role: "Network Security Researcher",
    status: "Published",
    badge: "Research Project",
    year: "2025",
    teamSize: 2,
    context: "Research",
    problem:
      "5G edge deployments are exposed to DDoS floods, wireless mobility disruption, and unauthorized subscriber access — threats that are difficult to reproduce and measure without a realistic standalone network.",
    solution:
      "Built a complete 5G SA simulation with Open5GS and UERANSIM, NGINX edge load balancing, iptables DDoS mitigation, Mininet-WiFi mobility testing, and Open5GS rogue UE detection.",
    impact:
      "Validated threat detection and mitigation across 500 concurrent requests, rogue UE identification, ~3s wireless recovery, and secure PDU session routing on two edge servers.",
    challenges:
      "Integrating Open5GS, UERANSIM, and Mininet-WiFi into one coherent testbed required deep troubleshooting across Linux networking stacks. Reproducing attack scenarios without destabilizing the core 5G control plane demanded careful isolation and rollback procedures.",
    learnings:
      "Built practical experience designing security experiments on real network stacks — where success means measurable mitigation under load, not just theoretical threat models.",
    timeline: "Aug 2025 – Dec 2025",
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
      "Urban water distribution wastes supply when allocation ignores zone-level demand. Built an ML-driven distribution system that routes water by zone demand — achieving 90% allocation accuracy and Top 3 at Samved Hackathon 2026 among 500+ teams.",
    cardDescription: "ML water distribution — Top 3 All India, 90% allocation accuracy.",
    highlights: [
      "Ranked Top 3 of 500+ teams at Samved Hackathon 2026 (All India)",
      "Built ML zone-allocation engine reaching 90% distribution accuracy across regions",
      "Designed FastAPI backend with REST APIs for real-time allocation decisions",
      "Delivered React dashboard for operators to monitor zone supply and demand",
    ],
    highlightPills: [
      { label: "Top 3 All India", variant: "award" },
      { label: "Hackathon Winner", variant: "award" },
      { label: "IoT + ML" },
      { label: "Smart Water" },
      { label: "90% Accuracy", variant: "accent" },
      { label: "Solapur Deployment" },
    ],
    stack: ["Python", "FastAPI", "Machine Learning", "React", "IoT", "REST APIs"],
    github: "https://github.com/Team-HydroOps/HydroOps",
    demo: null,
    paper: null,
    report: "/reports/HydroOps-report.pdf",
    metrics: ["Top 3 Nationwide", "90% Accuracy", "500+ Teams", "Samved Hackathon 2026"],
    featured: false,
    imageUrl: null,
    role: "Full-Stack Developer",
    status: "Hackathon — Top 3 Nationwide",
    badge: "#3 All India",
    year: "2026",
    teamSize: 4,
    context: "Personal Project",
    problem:
      "Municipal water systems distribute supply inefficiently when allocation ignores real-time zone demand, leading to shortages in high-need areas and waste elsewhere.",
    solution:
      "Built HydroOps with ML-driven zone allocation logic, a FastAPI backend for real-time routing decisions, and a React operator dashboard — integrating IoT demand signals into the allocation engine.",
    impact:
      "Achieved 90% allocation accuracy and placed Top 3 nationally at Samved Hackathon 2026 among 500+ competing teams.",
    challenges:
      "Translating IoT sensor inputs into reliable demand signals for the ML allocator required handling noisy, uneven data across zones. Building a demo-ready system under hackathon time pressure meant prioritizing the allocation engine over peripheral features.",
    learnings:
      "Learned to ship an end-to-end ML product under tight deadlines — where model accuracy and a usable operator interface both had to work on stage.",
    timeline: "Jan 2026 – Feb 2026",
    screenshots: [],
  },
];

export const skills = [
  { category: "Languages", items: ["Python", "C++", "JavaScript", "HTML", "CSS"] },
  { category: "Frameworks & Libraries", items: ["React.js", "Node.js", "FastAPI", "LangChain", "Flutter"] },
  { category: "AI / Machine Learning", items: ["Machine Learning", "Generative AI", "LLMs", "RAG", "EDA"] },
  { category: "Backend & Architecture", items: ["REST APIs", "Microservices", "Full-Stack Dev", "Blockchain"] },
  { category: "Databases", items: ["MongoDB", "MSSQL", "Schema Design", "Prisma", "PostgreSQL", "MYSQL"] },
  { category: "Tools & Platforms", items: ["Git", "Linux", "Ansible", "CI/CD", "Vercel"] },
];

export type AchievementEntry = {
  rank: string;
  scope: string;
  title: string;
  description: string;
  prize: string;
  github?: string | null;
  paper?: string | null;
};

export const achievements: AchievementEntry[] = [
  {
    rank: "#3",
    scope: "All India",
    title: "Samved Hackathon 2026",
    description:
      "Placed in the top 3 of 500+ teams nationwide with an AI-driven smart water distribution system — improving allocation accuracy to 90% across zones.",
    prize: "₹50,000 Award",
    github: "https://github.com/Team-HydroOps/HydroOps",
    paper: "/reports/HydroOps-report.pdf",
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
