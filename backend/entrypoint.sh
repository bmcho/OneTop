echo ---------------wait database-------------------------------
dockerize -wait tcp://database:3306 -timeout 30s

echo ---------------alembic start-------------------------------
alembic revision --autogenerate -m 'init_alembic'
alembic upgrade head

echo ---------------start server-------------------------------
uvicorn main:app --reload --host 0.0.0.0 --port 8000
