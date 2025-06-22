export interface TaskData {
  id: string;
  title: string;
  dueDate: Date;
  status: 'pending' | 'completed';
  assignee: string;
}

export interface SpreadsheetConfig {
  sheetName: string;
  headers: string[];
} 