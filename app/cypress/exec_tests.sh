#!/bin/bash

# Test unique nommé en paramètre
test_simple="$1"
DIR=$(dirname "${BASH_SOURCE[0]}")

# Création des données de tests
echo "Création des données de tests"
mysql --default-character-set=utf8 -h $DB_SERVERNAME -uroot -p$DB_PASSWORD $DB_DBNAME < $DIR/./données_de_test.sql || exit 2

# Tests end-to-end
if [ -z "$test_simple" ]
then
	$DIR/../node_modules/.bin/cypress run --spec "$test_simple"  || exit 1
else
	$DIR/../node_modules/.bin/cypress run || exit 1
fi

# Suppression des données de tests
echo "Suppression des données de tests"
mysql --default-character-set=utf8 -h $DB_SERVERNAME -uroot -p$DB_PASSWORD $DB_DBNAME < $DIR/./suppr_données_de_test.sql || exit 2

# Suppression de la BD
#echo Suppression de la BD
#echo "DROP DATABASE $DB_DBNAME" | mysql -h $DB_SERVERNAME -uroot -p$DB_PASSWORD || exit 2