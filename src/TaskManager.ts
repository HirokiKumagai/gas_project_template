import { format } from 'date-fns';
import { TaskData, SpreadsheetConfig } from './types';

export class TaskManager {
  private sheet: GoogleAppsScript.Spreadsheet.Sheet;
  private config: SpreadsheetConfig;

  constructor(spreadsheetId: string, config: SpreadsheetConfig) {
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    this.sheet = spreadsheet.getSheetByName(config.sheetName) || spreadsheet.insertSheet(config.sheetName);
    this.config = config;
    this.initializeSheet();
  }

  private initializeSheet(): void {
    if (this.sheet.getLastRow() === 0) {
      this.sheet.getRange(1, 1, 1, this.config.headers.length)
        .setValues([this.config.headers]);
    }
  }

  addTask(task: Omit<TaskData, 'id'>): TaskData {
    const newTask: TaskData = {
      ...task,
      id: Utilities.getUuid()
    };

    const rowData = [
      newTask.id,
      newTask.title,
      format(newTask.dueDate, 'yyyy-MM-dd'),
      newTask.status,
      newTask.assignee
    ];

    this.sheet.appendRow(rowData);
    return newTask;
  }

  getTasks(): TaskData[] {
    const data = this.sheet.getDataRange().getValues();
    const [headers, ...rows] = data;
    
    return rows.map(row => ({
      id: row[0],
      title: row[1],
      dueDate: new Date(row[2]),
      status: row[3] as TaskData['status'],
      assignee: row[4]
    }));
  }

  updateTaskStatus(taskId: string, status: TaskData['status']): boolean {
    const tasks = this.getTasks();
    const rowIndex = tasks.findIndex(task => task.id === taskId);
    
    if (rowIndex === -1) return false;

    const statusColumnIndex = this.config.headers.indexOf('status') + 1;
    this.sheet.getRange(rowIndex + 2, statusColumnIndex).setValue(status);
    return true;
  }
} 