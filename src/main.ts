import { TaskManager } from './TaskManager';
import { SpreadsheetConfig, TaskData } from './types';

// スプレッドシートの設定
const config: SpreadsheetConfig = {
  sheetName: 'Tasks',
  headers: ['id', 'title', 'dueDate', 'status', 'assignee']
};

let taskManager: TaskManager;

// TaskManagerの初期化
function initializeTaskManager() {
  const spreadsheetId = SpreadsheetApp.getActiveSpreadsheet().getId();
  taskManager = new TaskManager(spreadsheetId, config);
}

// 新しいタスクを追加
function addNewTask(title: string, dueDate: string, assignee: string) {
  if (!taskManager) initializeTaskManager();

  const task = taskManager.addTask({
    title,
    dueDate: new Date(dueDate),
    status: 'pending',
    assignee
  });

  return JSON.stringify(task);
}

// 全タスクを取得
function getAllTasks() {
  if (!taskManager) initializeTaskManager();
  
  const tasks = taskManager.getTasks();
  return JSON.stringify(tasks);
}

// タスクのステータスを更新
function updateTaskStatus(taskId: string, status: TaskData['status']) {
  if (!taskManager) initializeTaskManager();
  
  const success = taskManager.updateTaskStatus(taskId, status);
  return JSON.stringify({ success });
}

// グローバルスコープで関数を公開
declare const global: {
  [key: string]: any;
};

global.addNewTask = addNewTask;
global.getAllTasks = getAllTasks;
global.updateTaskStatus = updateTaskStatus;