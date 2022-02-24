#!/bin/bash

echo ---------------wait database-------------------------------
dockerize -wait tcp://database:3306 -timeout 30s

echo ---------------start server-------------------------------
alembic upgrade head

uvicorn main:app --reload --host 0.0.0.0 --port 8000