export const personalInfo = {
  name: "Felia Nadia Fikarda",
  title: "Data Analyst · Front-End Developer · Back-End Developer",
  badge: "Open to entry-level opportunities",
  bio: "Informatics graduate from Universitas Ahmad Dahlan with hands-on experience in Python, SQL, MySQL, Excel, data cleaning, preprocessing, data visualization, and database management. I am passionate about turning data into meaningful insights while also building responsive and functional web applications using modern web technologies.",
  location: "Yogyakarta, ID",
  gpa: "3.94",
  maxGpa: "4.00",
  studentsMentored: "100+",
  email: "felianadiafikarda@gmail.com",
  linkedin: "https://www.linkedin.com/in/felia-nadia-fikarda",
  github: "https://github.com/felianadiafikarda",
  whatsapp: "https://wa.me/6285265416588",
  cvPath: "/CV_Felia_Nadia_Fikarda_IT_Focused",
  profileImg: "/profile.JPEG",
  uadImg: "/images/uad.jpg",
  aboutText1: "I'm an Informatics graduate from Universitas Ahmad Dahlan with an interest in data analysis and web development. I have hands-on experience working with Python, SQL, MySQL, Excel, data cleaning, preprocessing, visualization, and database management through academic projects, internships, and practical experiences.",
  aboutText2: "Alongside data-related work, I have experience developing responsive web interfaces and functional back-end systems using Laravel, PHP, JavaScript, Next.js, and database technologies. I enjoy analyzing problems, transforming data into useful information, and building practical digital solutions."
};

export const profileCards = [
  {
    id: "education",
    title: "Education",
    description: "Bachelor of Informatics,\nUniversitas Ahmad Dahlan",
    icon: "GraduationCap"
  },
  {
    id: "focus",
    title: "Focus",
    description: "Data Analysis, Front-End and\nBack-End Development",
    icon: "Target"
  },
  {
    id: "strengths",
    title: "Strengths",
    description: "Analytical thinking,\nproblem solving,\nattention to detail",
    icon: "Sparkles"
  }
];

export const experiences = [
  {
    id: "exp-1",
    title: "Back-End Developer — Journal Submission System",
    category: "internship",
    company: "ASCEE — Association for Scientific Computing, Electronics, and Engineering",
    period: "Aug – Dec 2025",
    description: "Developed back-end functionality for an online journal submission platform, including Author and Editor modules, while managing the database to support journal data processing and workflow.",
    tags: ["Laravel", "PHP", "MySQL", "JavaScript"],
    link: "https://github.com/felianadiafikarda/projekmagang2.git",
    images: [
      { src: "/images/meeting-with-internship-supervisor.jpeg", alt: "Meeting with Internship Supervisor" },
      { src: "/images/list-paper-for-author-section.png", alt: "Journal Submission System — Author Paper List" },
      { src: "/images/form-send-paper.png", alt: "Journal Submission System — Send Paper Form" },
      { src: "/images/form-article-revision.png", alt: "Journal Submission System — Article Revision Form" },
      { src: "/images/list-paper-for-editor-section.png.png", alt: "Journal Submission System — Editor Paper List" },
      { src: "/images/assign-reviewer-section-editor.png", alt: "Journal Submission System — Assign Reviewer" }
    ]
  },
  {
    id: "exp-2",
    title: "Back-End Developer — Conference Website",
    category: "internship",
    company: "ASCEE — Association for Scientific Computing, Electronics, and Engineering",
    period: "Aug – Dec 2025",
    description: "Developed back-end functionality for conference website pages including Home, Call for Paper, and Contact, with database integration to support the admin panel.",
    tags: ["Laravel", "PHP", "MySQL", "JavaScript"],
    link: "https://events.ascee.org/",
    images: [
      { src: "/images/First-Meeting-with-Internship-Supervisor.jpeg", alt: "First Meeting with Internship Supervisor" },
      { src: "/images/home-page.png", alt: "Conference Website — Home" },
      { src: "/images/contact-page.png", alt: "Conference Website — Contact" },
      { src: "/images/home-admin.png", alt: "Conference Website — Admin Home" },
      { src: "/images/contact-admin.png", alt: "Conference Website — Admin Contact" }
    ]
  },
  {
    id: "exp-3",
    title: "Artificial Intelligence Lab Assistant",
    category: "lab",
    company: "Informatics Lab, Universitas Ahmad Dahlan",
    period: "Apr – Aug 2025",
    description: "Guided 25 students through Python-based Artificial Intelligence practicums, covering search algorithms such as DFS and BFS, while evaluating practical assignments.",
    tags: ["Python"],
    link: null,
    images: [
      { src: "/images/Sertifikat SA-KCB.jpg", alt: "AI Practicum Certificate 1" },
      { src: "/images/Sertifikat SA-KCB2.jpg", alt: "AI Practicum Certificate 2" }
    ]
  },
  {
    id: "exp-4",
    title: "Algorithm Strategy Lab Assistant",
    category: "lab",
    company: "Informatics Lab, Universitas Ahmad Dahlan",
    period: "Apr – Aug 2025",
    description: "Guided 35 students in learning algorithm strategies such as Divide and Conquer, Brute Force, and Greedy using C++, while conducting practical evaluations.",
    tags: ["C++"],
    link: null,
    images: [
      { src: "/images/Sertifikat SA-KCB.jpg", alt: "Algorithm Strategy Certificate 1" },
      { src: "/images/Sertifikat SA-KCB2.jpg", alt: "Algorithm Strategy Certificate 2" }
    ]
  },
  {
    id: "exp-5",
    title: "Database Lab Assistant",
    category: "lab",
    company: "Informatics Lab, Universitas Ahmad Dahlan",
    period: "Sept 2024 – Jan 2025",
    description: "Prepared practicum materials covering SQL, ERD, normalization, and database management, while guiding 40 students through hands-on database sessions.",
    tags: ["SQL", "ERD", "MySQL"],
    link: null,
    images: [
      { src: "/images/Sertifikat-basdat.jpg", alt: "Database Practicum Certificate 1" },
      { src: "/images/Sertifikat-basdat2.jpg", alt: "Database Practicum Certificate 2" }
    ]
  }
];

export const projects = [
  {
    id: "proj-1",
    title: "Aspect-Based Sentiment Analysis on X Data",
    role: "Data Analyst · Data Analysis Project",
    description: "Conducted an Aspect-Based Sentiment Analysis project using data collected from X. The workflow covered data crawling, data preprocessing, aspect-based sentiment analysis, and data visualization to identify sentiment patterns and insights.",
    tags: ["Python", "X Data", "Data Crawling", "Data Preprocessing", "ABSA", "Data Visualization"],
    link: "https://github.com/felianadiafikarda/Analisis-Sentimen-Berbasis-Aspek-terhadap-Topik-Kecerdasan-Buatan-dalam-Pendidikan.git",
    images: [
      { src: "/images/training-grafik.png", alt: "Aspect-Based Sentiment Analysis — Main Result" },
      { src: "/images/data-crawling.png", alt: "Aspect-Based Sentiment Analysis — Data Crawling" },
      { src: "/images/preprocessing.png", alt: "Aspect-Based Sentiment Analysis — Data Preprocessing" },
      { src: "/images/confusion-matrix.png", alt: "Aspect-Based Sentiment Analysis — Confusion Matrix" },
      { src: "/images/Distribusi-smote.png", alt: "Aspect-Based Sentiment Analysis — SMOTE" }
    ]
  },
  {
    id: "proj-2",
    title: "Village Information Management System — Karangtengah",
    role: "Backend Developer · Karangtengah Village · KKN",
    description: "Developed a web-based village information management system during the KKN community service program. The system supports village staff in managing information and administrative data through a centralized digital platform.",
    tags: ["Next.js", "PostgreSQL", "CSS"],
    link: "https://karangtengah-rho.vercel.app/user",
    images: [
      { src: "/images/profile-page.png", alt: "Profile Karangtengah" },
      { src: "/images/video-profile-page.png", alt: "Video Profile Page" },
      { src: "/images/cultural-potential-page.png", alt: "Cultural Potential Page" },
      { src: "/images/facilities-page.png", alt: "Facilities Page" },
      { src: "/images/Penyerahan-Web.jpeg", alt: "Penyerahan Website" }
    ]
  },
  {
    id: "proj-3",
    title: "Management Information System — CV Kembar Jaya",
    role: "Full Stack Developer · Klaten",
    description: "Developed a Management Information System consisting of a user-facing website and admin panel connected through a MySQL database. The system was designed to support company information management and digital content administration.",
    tags: ["HTML", "CSS", "PHP", "JavaScript", "MySQL"],
    link: "https://github.com/felianadiafikarda/cv-kembar-jaya.git",
    images: [
      { src: "/images/drilling-cv-kembar-jaya.png", alt: "Management Information System CV Kembar Jaya" },
      { src: "/images/galeri-cv-kembar-jaya.png", alt: "CV Kembar Jaya Gallery" },
      { src: "/images/pemesanan-cv-kembar-jaya.png", alt: "CV Kembar Jaya Reservation" },
      { src: "/images/edit-admin-about-us.png", alt: "CV Kembar Jaya Admin" }
    ]
  }
];

export const trainingCertifications = [
  {
    id: "cert-1",
    title: "Data Analytics Essentials",
    issuer: "Cisco Networking Academy",
    category: "certification",
    period: "Aug 2026",
    year: "2025",
    description: "Completed Data Analytics Essentials by Cisco Networking Academy, developing practical skills in data preparation, cleaning, transformation, statistical analysis, and visualization. Applied Excel for data manipulation, calculations, pivot tables, and visualizations, SQL for querying and combining relational data, and Tableau for creating dashboards and presenting data insights. Strengthened understanding of data storytelling, analytical problem solving, and ethical data use through hands-on labs and projects.",
    tags: ["Dashboard", "Data Analysis", "Data Visualization", "Data Storytelling", "Excel", "SQL", "Tableau"],
    images: [
      { src: "/images/Data_Analytics_Essentials_certificate.jpg", alt: "Data Analytics Essentials Certificate" }
    ]
  },
  {
    id: "cert-2",
    title: "JavaScript Essentials 1",
    issuer: "Cisco Networking Academy",
    category: "certification",
    period: "Aug 2026",
    year: "2026",
    description: "Completed JavaScript Essentials 1 by Cisco Networking Academy in collaboration with the JS Institute, developing a strong foundation in JavaScript programming for web and application development. Gained practical knowledge of variables, data types, type casting, operators, conditional execution, loops, functions, and recursion. Strengthened programming and problem-solving skills through error and exception handling, code debugging, and troubleshooting.",
    tags: ["Conditional Execution", "Control Flow", "Data Types", "Debugging", "User Interactions"],
    images: [
      { src: "/images/JavaScript_Essentials_1_certificate_felianadiafikarda.jpg", alt: "JavaScript Essentials 1 Certificate" }
    ]
  },
  {
    id: "train-1",
    title: "Guide to Learn Python with AI at DQLab",
    issuer: "DQLab",
    category: "training",
    period: "Aug 2026",
    year: "2026",
    description: "This training provided a foundational understanding of Python programming with AI technology as a learning support tool. It covered AI-assisted learning methods, the use of a Live Code Editor, hands-on Python programming with AI assistance, and using errors as part of the process of understanding and improving code. The training strengthened my understanding of programming fundamentals, Python coding, debugging, and problem-solving skills.",
    tags: ["Python", "AI-Assisted Learning", "Debugging", "Problem Solving", "Data Storytelling"],
    images: [
      { src: "/images/guide to Learn Python with AI at DQLab.jpg", alt: "Guide to Learn Python with AI at DQLab" }
    ]
  },
  {
    id: "train-2",
    title: "Introduction to Data Science with Python",
    issuer: "DQLab",
    category: "training",
    period: "Aug 2026",
    year: "2026",
    description: "This training provided an understanding of fundamental programming concepts using Python. It covered Python syntax and basic structures, statements, variables, comments, and the application of Python in Data Science. The training also covered various Python data types and the use of libraries to support programming tasks. Through practical exercises and assignments, the training strengthened my ability to write, understand, and implement Python code to solve programming problems systematically.",
    tags: ["Python Programming", "Python Syntax", "Variables & Data Types", "Python Libraries", "Python for Data Science"],
    images: [
      { src: "/images/introduction to data science swith python.jpg", alt: "Introduction to Data Science with Python" }
    ]
  }
];

export const skills = {
  hardSkills: [
    "Data Cleaning", "Data Preprocessing", "Data Visualization", "Database Management",
    "Python", "SQL", "MySQL", "PostgreSQL",
    "HTML", "CSS", "Tailwind", "JavaScript", "PHP", "Laravel", "Next.js", "ERD"
  ],
  softSkills: [
    "Analytical Thinking", "Problem Solving", "Attention to Detail", "Communication",
    "Teamwork", "Time Management", "Responsibility", "Adaptability", "Fast Learner"
  ]
};

export const tools = [
  { name: "Microsoft Excel", icon: "/images/excel.png", type: "local" },
  { name: "Tableau", icon: "/images/tableau.png", type: "local", wide: true },
  { name: "Laragon", icon: "https://cdn.simpleicons.org/laragon", type: "cdn" },
  { name: "phpMyAdmin", icon: "https://cdn.simpleicons.org/phpmyadmin", type: "cdn" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql", type: "cdn" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git", type: "cdn" },
  { name: "GitHub", icon: "/images/github.png", type: "local" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma", type: "cdn" },
  { name: "Visual Studio Code", icon: "/images/vsdoce.png", type: "local" }
];
