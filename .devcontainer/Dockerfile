FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm

# --- Install MongoDB Tools (with curl + gnupg fix) ---
ARG MONGO_TOOLS_VERSION=6.0
ARG VERSION_CODENAME=bookworm

RUN apt-get update && apt-get install -y curl gnupg && \
    curl -sSL "https://www.mongodb.org/static/pgp/server-${MONGO_TOOLS_VERSION}.asc" | gpg --dearmor > /usr/share/keyrings/mongodb-archive-keyring.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg] http://repo.mongodb.org/apt/debian ${VERSION_CODENAME}/mongodb-org/${MONGO_TOOLS_VERSION} main" \
      | tee /etc/apt/sources.list.d/mongodb-org-${MONGO_TOOLS_VERSION}.list && \
    apt-get update && apt-get install -y mongodb-mongosh && \
    if [ "$(dpkg --print-architecture)" = "amd64" ]; then apt-get install -y mongodb-database-tools; fi && \
    apt-get clean && rm -rf /var/lib/apt/lists/*
