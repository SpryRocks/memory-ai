import {migration} from "./migration";

async function main() {
  const command = process.argv[2];

  if (command === 'up') {
    await migration.up();
    console.log('🎉 Все таблицы LanceDB успешно обновлены!');
  } else if (command === 'down') {
    await migration.down();
    console.log('↩️ Последний шаг успешно отменен!');
  } else {
    console.log('Использование: ts-node scripts/migrate-lance.ts [up|down]');
  }
}

main().catch(err => {
  console.error('❌ Ошибка миграции:', err);
  process.exit(1);
});
