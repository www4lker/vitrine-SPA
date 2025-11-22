import { Project } from './types';

/**
 * INSTRUCTIONS FOR THE USER:
 * 
 * 1. Copy your experimental folders into the 'public' directory of this project.
 * 2. Add a new entry to the PROJECTS array below for each folder.
 * 3. 'folderName' must match exactly the name of the folder you copied.
 */

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Legal Document Summarizer',
    description: 'An experimental interface that breaks down complex legal PDFs into digestible interactive cards using AI processing.',
    folderName: 'legal-summary-v1', // Example: assumes public/legal-summary-v1/index.html exists
    tags: ['Law', 'Summary', 'Interactive'],
    date: '2023-10-15'
  },
  {
    id: '2',
    title: 'Medical History Timeline',
    description: 'A visual timeline generated from clinical notes, allowing patients to scroll through their history graphically.',
    folderName: 'med-timeline', // Example: assumes public/med-timeline/index.html exists
    tags: ['Health', 'Visualization', 'Timeline'],
    date: '2023-11-02'
  },
  {
    id: '3',
    title: 'Finance Dashboard Prototype',
    description: 'A simple SPA testing responsive charts for personal finance tracking.',
    folderName: 'finance-dash',
    tags: ['Finance', 'Charts', 'Dashboard'],
    date: '2023-12-10'
  },
  // ADD YOUR NEW PROJECTS HERE
];

export const GEMINI_SYSTEM_PROMPT = `
You are an expert copywriter for a design portfolio. 
Your goal is to take a rough, simple description of a web project and rewrite it to sound professional, intriguing, and concise (under 30 words). 
Focus on the value and the "experimental" nature.
`;