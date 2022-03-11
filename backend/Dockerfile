FROM python:3.9-slim-buster

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DOCKERIZE_VERSION v0.6.1

WORKDIR /srv/server
 
COPY . /srv/server

# RUN apk update \
#     && apk add --virtual build-deps gcc python3-dev musl-dev build-base\
#     && apk add --no-cache bash 

RUN apt update  && \
    apt install -y \
    gcc gfortran musl-dev g++ bash wget

# ENV ALLOWED_HOSTS 127.0.0.1

# 의존성 설치
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# CMD [ "alembic", "upgrade", "head"]
# CMD [ "uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000" ]

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

ENTRYPOINT ["sh","entrypoint.sh"]