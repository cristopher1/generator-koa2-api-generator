#!/usr/bin/env bash

./wait-for-it.sh ${DB_HOST}:${DB_PORT} --timeout=300 -- npx sequelize-cli db:migrate

exec "$@"
