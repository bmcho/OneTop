#!/bin/bash
echo ---------------wait database-------------------------------
dockerize -wait tcp://database:3306 -timeout 30s
echo ---------------wait server-------------------------------
dockerize -wait tcp://server:8000 -timeout 30s
echo ---------------start data_migration-------------------------------
python3 etl_main.py
