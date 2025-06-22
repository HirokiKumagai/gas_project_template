// テスト用のヘルパー関数
function assertEquals(expected: any, actual: any, message: string) {
  if (JSON.stringify(expected) !== JSON.stringify(actual)) {
    throw new Error(`${message}\n期待値: ${JSON.stringify(expected)}\n実際の値: ${JSON.stringify(actual)}`);
  }
  Logger.log(`✅ テスト成功: ${message}`);
}

function runAllTests() {
  try {
    testAddNewTask();
    testGetAllTasks();
    testUpdateTaskStatus();
    Logger.log('🎉 全てのテストが成功しました！');
  } catch (error) {
    Logger.log(`❌ テスト失敗: ${error.message}`);
  }
}

function testAddNewTask() {
  // テストデータ
  const title = 'テストタスク1';
  const dueDate = '2024-03-20';
  const assignee = 'テストユーザー1';

  // タスクを追加
  const result = addNewTask(title, dueDate, assignee);
  const task = JSON.parse(result);

  // 検証
  assertEquals(title, task.title, 'タイトルが正しく設定されていること');
  assertEquals('pending', task.status, '初期ステータスがpendingであること');
  assertEquals(assignee, task.assignee, '担当者が正しく設定されていること');
  
  // 日付のフォーマットを検証
  const expectedDate = new Date(dueDate);
  const actualDate = new Date(task.dueDate);
  assertEquals(
    expectedDate.toISOString().split('T')[0],
    actualDate.toISOString().split('T')[0],
    '期日が正しく設定されていること'
  );
}

function testGetAllTasks() {
  // 複数のタスクを追加
  const task1 = JSON.parse(addNewTask('テストタスク2', '2024-03-21', 'テストユーザー2'));
  const task2 = JSON.parse(addNewTask('テストタスク3', '2024-03-22', 'テストユーザー3'));

  // 全タスクを取得
  const result = getAllTasks();
  const tasks = JSON.parse(result);

  // 検証
  assertEquals(true, tasks.length >= 2, '少なくとも2つのタスクが存在すること');
  assertEquals(
    true,
    tasks.some((t: any) => t.id === task1.id),
    'タスク1が取得できること'
  );
  assertEquals(
    true,
    tasks.some((t: any) => t.id === task2.id),
    'タスク2が取得できること'
  );
}

function testUpdateTaskStatus() {
  // タスクを追加
  const task = JSON.parse(addNewTask('テストタスク4', '2024-03-23', 'テストユーザー4'));
  
  // ステータスを更新
  const updateResult = JSON.parse(updateTaskStatus(task.id, 'completed'));
  assertEquals(true, updateResult.success, 'ステータスの更新が成功すること');

  // 更新されたタスクを確認
  const tasks = JSON.parse(getAllTasks());
  const updatedTask = tasks.find((t: any) => t.id === task.id);
  assertEquals('completed', updatedTask.status, 'ステータスが正しく更新されていること');
}

// グローバルスコープで関数を公開
declare const global: {
  [key: string]: any;
};

global.runAllTests = runAllTests;
global.testAddNewTask = testAddNewTask;
global.testGetAllTasks = testGetAllTasks;
global.testUpdateTaskStatus = testUpdateTaskStatus; 