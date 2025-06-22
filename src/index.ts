// main.tsの関数をインポート
import './main';

// test.tsの関数をインポート
import './test';

// duplicate_test.tsの関数をインポート
import './duplicate_test';

// グローバルスコープで関数を公開
declare global {
  // main.tsの関数
  function addNewTask(title: string, dueDate: string, assignee: string): string;
  function getAllTasks(): string;
  function updateTaskStatus(taskId: string, status: 'pending' | 'completed'): string;

  // test.tsの関数
  function runAllTests(): void;
  function testAddNewTask(): void;
  function testGetAllTasks(): void;
  function testUpdateTaskStatus(): void;

  // duplicate_test.tsの関数
  function testDuplicateFunction(): void;
} 