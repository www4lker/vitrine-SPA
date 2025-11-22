export interface Project {
  id: string;
  title: string;
  description: string;
  folderName: string; // The exact name of the folder inside 'public/'
  entryFile?: string; // Defaults to 'index.html' if not specified
  tags: string[];
  date: string;
}

export enum ViewMode {
  GRID = 'GRID',
  LIST = 'LIST'
}