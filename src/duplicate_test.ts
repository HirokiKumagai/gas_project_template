// 意図的に main.ts と同じ関数名を使用
function addNewTask(title: string, dueDate: string, assignee: string) {
  return `Duplicate function called with: ${title}, ${dueDate}, ${assignee}`;
}

// テスト用の新しい関数
function testDuplicateFunction() {
  Logger.log('🔍 関数名の競合テストを開始します...');
  
  try {
    // 1. ローカルスコープでの関数定義の確認
    Logger.log('1️⃣ ローカルスコープでの関数定義をテスト:');
    const localResult = addNewTask('ローカル関数テスト', '2024-03-25', 'テストユーザー');
    Logger.log(`ローカル関数の結果: ${localResult}`);
    
    if (localResult.includes('Duplicate function called with:')) {
      Logger.log('✅ ローカル関数が正しく定義されています');
    } else {
      throw new Error('ローカル関数が期待通りに動作していません');
    }

    // 2. グローバルスコープでの関数呼び出し
    Logger.log('\n2️⃣ グローバルスコープでの関数呼び出しをテスト:');
    // @ts-ignore (グローバルスコープの関数を直接呼び出し)
    const globalResult = (globalThis as any).addNewTask('グローバルテスト', '2024-03-25', 'テストユーザー');
    const task = JSON.parse(globalResult);
    
    if (task.title === 'グローバルテスト' && task.assignee === 'テストユーザー') {
      Logger.log('✅ グローバル関数（main.tsのaddNewTask）が正しく呼び出されました');
    } else {
      throw new Error('グローバル関数が期待通りに動作していません');
    }

    // 3. 関数の参照を確認
    Logger.log('\n3️⃣ 関数の参照を確認:');
    const localFuncString = addNewTask.toString();
    const globalFuncString = (globalThis as any).addNewTask.toString();
    
    Logger.log('ローカル関数の定義:');
    Logger.log(localFuncString.slice(0, 100) + '...'); // 長すぎる場合は省略
    
    Logger.log('\nグローバル関数の定義:');
    Logger.log(globalFuncString.slice(0, 100) + '...'); // 長すぎる場合は省略
    
    if (localFuncString !== globalFuncString) {
      Logger.log('✅ ローカル関数とグローバル関数は異なる実装です');
    } else {
      throw new Error('ローカル関数とグローバル関数が同じ実装になっています');
    }

    // 4. 利用可能な関数の一覧を表示
    Logger.log('\n4️⃣ グローバルスコープで利用可能な関数一覧:');
    const globalFunctions = Object.keys(globalThis as any).filter(key => 
      typeof (globalThis as any)[key] === 'function'
    );
    globalFunctions.forEach(funcName => {
      Logger.log(`  - ${funcName}`);
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      Logger.log(`❌ テスト失敗: ${error.message}`);
    } else {
      Logger.log('❌ テスト失敗: 不明なエラー');
    }
    throw error;
  }
}

// グローバルスコープで関数を公開
(globalThis as any).testDuplicateFunction = testDuplicateFunction; 