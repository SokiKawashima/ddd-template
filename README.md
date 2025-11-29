# ddd
メモ
ルートでpnpm add -Dw <package>
ルートでpnpm add <パッケージ名> --filter @repo/xxx
ルートでpnpm add -D <パッケージ名> --filter @repo/xxx

/workspace/applications/pkgs/infrastructure/prismaでpnpm prisma generate

docker exec ddd-postgres-1 psql -U postgres -d postgres -c "\l"

psql "$DATABASE_URL" -c "INSERT INTO \"User\" (id, name, email, \"createdAt\", \"updatedAt\") VALUES (gen_random_uuid(), 'テスト太郎' 'test.taro@example.com', NOW(), NOW()) RETURNING *;"

    "@prisma/client-runtime-utils": "catalog:", //https://github.com/prisma/prisma/issues/28581
が解消しないから
pnpm add @prisma/client-runtime-utils --filter @repo/infrastructure してかつ
mise run prisma:generateしたあとに
```
export const DbNull: typeof runtime.DbNull = runtime.DbNull
```
みたに手作業した
prisma7使いたいから一旦許容する

mise setで確認

環境変数はturbo.jsonで指定！！

ログイン後に__sessionで取得可