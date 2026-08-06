export type Certificate = {
  label: string;
  type: "image" | "pdf";
  path: string;
  alt: string;
};

export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  duration: string;
  bullets: string[];
  certificate: Certificate;
  note?: string;
};

export const experienceEntries: ExperienceEntry[] = [
  {
    id: "ineubytes",
    role: "AI/ML Engineer Intern",
    company: "iNeuBytes",
    duration: "29 Jun 2026 – 29 Jul 2026",
    bullets: [
      "Three end-to-end ML projects (course AIINB10626): CIFAR-10 CNN, IMDB sentiment analysis, production RAG chatbot",
      "Custom CNN with BatchNorm/Dropout/augmentation beat the AlexNet-style baseline by +11pp (74.57% → 85.57%) on CIFAR-10",
      "Showed a tuned TF-IDF Logistic Regression beats an LSTM by ~1pt F1 while training 100× faster on IMDB",
      "Built and deployed a RAG chatbot (Flask + ChromaDB + fastembed + Groq) on Render",
    ],
    certificate: {
      label: "iNeuBytes internship certificate",
      type: "image",
      path: "certificates/ineubytes.jpeg",
      alt: "iNeuBytes internship certificate",
    },
  },
  {
    id: "thiranex",
    role: "Data Science Intern",
    company: "Thiranex",
    duration: "23 May 2026 – 22 Jun 2026",
    bullets: [
      "Netflix dataset analysis",
      "AAPL stock price prediction model",
      "Heart disease prediction model",
    ],
    certificate: {
      label: "Thiranex internship certificate",
      type: "pdf",
      path: "certificates/thiranex.pdf",
      alt: "Thiranex internship certificate",
    },
  },
];
