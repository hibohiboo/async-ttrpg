
echo "wait $WAIT_TIME_FOR_LOGIN seconds setup script"
sleep $WAIT_TIME_FOR_LOGIN

echo "running setup script"
/opt/mssql-tools18/bin/sqlcmd -S $HOST_NAME -U sa -P $MSSQL_SA_PASSWORD -C -d master -Q "CREATE DATABASE test;"
# /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P $MSSQL_SA_PASSWORD -C -d test -Q "CREATE SCHEMA atrpg;"
# /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P $MSSQL_SA_PASSWORD -C -d test -i ddl.sql
