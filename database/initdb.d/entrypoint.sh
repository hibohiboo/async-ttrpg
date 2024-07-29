#!/bin/bash

# SQL Serverをフォアグラウンドで実行
echo "Waiting for SQL Server to start..."
/opt/mssql/bin/sqlservr & MSSQL_PID=$!

# SQL Serverの起動を待機. 起動中はログインに失敗するため、ログインに成功するまで待機する必要がある。 https://github.com/Microsoft/mssql-docker/issues/203
while ! /opt/mssql-tools18/bin/sqlcmd -S $HOST_NAME -U sa -P $MSSQL_SA_PASSWORD -C -Q "SELECT 1" > /dev/null 2>&1; do
    sleep 1
done
echo "SQL Server started."

# 初期化用SQLを実行
echo "Initializing database..."
# hostnameでもlocalhostでもどちらでもアクセスできることのテスト
/opt/mssql-tools18/bin/sqlcmd -S $HOST_NAME -U sa -P $MSSQL_SA_PASSWORD -C -d master -Q "CREATE DATABASE test;"
/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P $MSSQL_SA_PASSWORD -C -d test -Q "CREATE SCHEMA atrpg;"
/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P $MSSQL_SA_PASSWORD -C -d test -i /docker-initdb.d/ddl.sql
echo "Database initialized."

# バックグラウンドで実行中のSQL Serverのプロセスを待機
wait $MSSQL_PID
