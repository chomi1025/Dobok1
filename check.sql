SELECT migration_name, finished_at, rolled_back_at
FROM "_prisma_migrations"
WHERE migration_name='20260603005830_fix_order_id_type';