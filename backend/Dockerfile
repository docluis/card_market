# syntax=docker/dockerfile:1.4
FROM python:3.12-alpine AS base

WORKDIR /code
COPY requirements.txt /code
RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt

COPY . .

ENV FLASK_APP=hello.py
ENV FLASK_ENV=development
ENV FLASK_RUN_PORT=8000
ENV FLASK_RUN_HOST=0.0.0.0

EXPOSE 8000

# Use the flask run command with the --reload flag for development
CMD ["flask", "run", "--reload"]

FROM base AS dev-envs

RUN apk update && apk add git

RUN addgroup -S docker && adduser -S --shell /bin/bash --ingroup docker vscode

# Install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

CMD ["flask", "run", "--reload"]
