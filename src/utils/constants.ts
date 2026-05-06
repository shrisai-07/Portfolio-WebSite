// =============================================
// SPIDER-MAN 2099 PORTFOLIO — CONSTANTS
// =============================================

export const COLORS = {
  void: '#0a0a0a',
  electricBlue: '#1a8fe3',
  sharpRed: '#e31a1a',
  coldWhite: '#f0f0f0',
  coldMuted: '#8899aa',
  deepPurple: '#7F77DD',
  electricMagenta: '#D4537E',
} as const;

export interface Project {
  title: string;
  soundEffect: string;
  description: string;
  link?: string;
  tags: string[];
  isHero?: boolean;
}

export const PROJECTS: Project[] = [
  {
    title: 'Risk-Based Authentication Simulator',
    soundEffect: 'ACCESS DENIED!',
    description:
      'A rule-based authentication risk engine that replicates the decision logic used by modern identity platforms. After credentials are verified, the system evaluates contextual signals — device trust, location anomalies, behavioral patterns — to determine whether to grant access, trigger MFA, or block the attempt entirely. Built to demonstrate how post-password risk reasoning actually works.',
    link: 'https://github.com/shrisai-07/Risk-based-AuthN-Simulator',
    tags: ['Python', 'Identity Security', 'Risk Engine'],
    isHero: true,
  },
  {
    title: 'PassWarden — Secure Password Manager',
    soundEffect: 'ENCRYPTED!',
    description:
      'A web-based password manager that demonstrates real-world credential protection — hashing, encryption at rest, and strict access control enforcement. Built to show how sensitive data stays protected from the moment a user submits it, all the way through storage and retrieval.',
    tags: ['Web Security', 'Cryptography', 'Access Control'],
  },
  {
    title: 'Phishing Detection System',
    soundEffect: 'THREAT DETECTED!',
    description:
      'A rule-based detection engine that analyzes messages, calls, and emails for phishing indicators. The system maps attacker behavior patterns and assigns a safety score to each input — giving users a clear signal on whether to trust or flag the communication.',
    link: 'https://github.com/shrisai-07/phishing-detection-system',
    tags: ['Python', 'Threat Analysis', 'Rule Engine'],
  },
];

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const SKILLS: SkillCategory[] = [
  {
    title: 'LANGUAGES',
    skills: ['Python', 'C++', 'Java'],
  },
  {
    title: 'CYBERSECURITY TOOLS & DOMAINS',
    skills: [
      'Cryptography',
      'Network Security',
      'Digital Forensics',
      'Web Exploitation',
      'Malware Analysis',
      'OSINT',
      'SOC Alert Triage',
      'Hash Cracking',
      'IoT Security',
      'Linux & Windows Fundamentals',
    ],
  },
  {
    title: 'CERTIFICATIONS',
    skills: [
      'Google Cybersecurity Certificate (Coursera)',
      'Microsoft Cybersecurity Analyst Professional Certificate',
      'TryHackMe — Advent of Cyber (Completed)',
    ],
  },
  {
    title: 'PRACTICE',
    skills: [
      'CTF Competitions',
      'Threat Intelligence & Historical Attack Analysis',
      'Hands-on Lab Environments (TryHackMe)',
    ],
  },
];

export const SOCIAL_LINKS = {
  github: 'https://github.com/shrisai-07',
  linkedin: 'https://linkedin.com/in/shrisai-kolkondi-326781324',
} as const;

export const NAV_ITEMS = ['About', 'Projects', 'Skills', 'Contact'] as const;
