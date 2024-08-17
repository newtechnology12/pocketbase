FROM alpine:latest

ARG PB_VERSION=0.21.3

RUN apk add --no-cache \
    unzip \
    ca-certificates \
    curl

# download and unzip PocketBase
RUN curl -L -o /tmp/pb.zip https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip && \
    unzip /tmp/pb.zip -d /pocketbase && \
    chmod +x /pocketbase/pocketbase

COPY ./pb_hooks /pocketbase/pb_hooks
COPY ./pb_migrations /pocketbase/pb_migrations
COPY ./pb_public /pocketbase/pb_public

WORKDIR /pocketbase

RUN ./pocketbase migrate --migrations=/pocketbase/pb_migrations --hooks=/pocketbase/pb_hooks

EXPOSE 8090

# start PocketBase
CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090", "--indexFallback"]
