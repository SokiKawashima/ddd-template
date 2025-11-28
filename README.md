# ddd
メモ
ルートでpnpm add -Dw <package>
ルートでpnpm add <パッケージ名> --filter @repo/xxx
ルートでpnpm add -D <パッケージ名> --filter @repo/xxx

/workspace/applications/pkgs/infrastructure/prismaでpnpm prisma generate

docker exec ddd-postgres-1 psql -U postgres -d postgres -c "\l"