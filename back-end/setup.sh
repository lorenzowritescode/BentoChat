#!/bin/bash
. config.sh

echo "Do you want to connect to the local database?"
select yn in "Yes" "No"; do
	case $yn in
		Yes ) export RDB_HOST=$IP_LOCAL_VM; break;;
        No ) export RDB_HOST=$IP_LORENZOS_PIZZA; export RDB_PORT=32780; break;;
    esac
done

nodemon scripts/index.js