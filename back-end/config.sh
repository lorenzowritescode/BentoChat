#!/bin/bash
export IP_LORENZOS_PIZZA="178.62.82.220"
export IP_DOCKER_VM=$(boot2docker ip)
export RDB_HOST=$IP_DOCKER_VM
export RETHINK_CLUSTER_PORT="29015"
export RDB_PORT="28015"
export RDB_DB="bentodb"
export RETHINK_ADMIN_PORT="8080"
export LOCAL_DB_CONSOLE="$IP_DOCKER_VM:$RETHINK_ADMIN_PORT"
alias open_rdb="open http://$LOCAL_DB_CONSOLE"
alias remote_rdb="open http://$IP_LORENZOS_PIZZA:$RETHINK_ADMIN_PORT"
