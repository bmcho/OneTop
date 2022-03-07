FROM python:3.9-slim-buster

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DOCKERIZE_VERSION v0.6.1

WORKDIR /srv/migration
 
COPY . /srv/migration

RUN apt update  && \
    apt install -y \
    gcc cron gfortran musl-dev g++ bash wget

# 의존성 설치
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

ENTRYPOINT ["sh","entrypoint.sh"]