FROM mongo:6.0.5

ARG DATABASE_URI
ARG USERNAME
ARG PASSWORD

ENV DATABASE_URI ${DATABASE_URI}
ENV USERNAME ${USERNAME}
ENV PASSWORD ${PASSWORD}

COPY churches.json /churches.json
COPY groups.json /groups.json
COPY posts.json /posts.json

CMD mongoimport --username ${USERNAME} --password ${PASSWORD} --uri ${DATABASE_URI} --collection churches --drop --file /churches.json --type=json && \
    mongoimport --username ${USERNAME} --password ${PASSWORD} --uri ${DATABASE_URI} --collection groups --drop --file /groups.json --type=json && \
    mongoimport --username ${USERNAME} --password ${PASSWORD} --uri ${DATABASE_URI} --collection posts --drop --file /posts.json --type=json