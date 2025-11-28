#!/bin/zsh

# session-manager-pluginをインストール
# export arch=$(if [ "$(uname -m)" = "x86_64" ]; then echo 64bit; else echo arm64; fi) \
#     && curl https://s3.amazonaws.com/session-manager-downloads/plugin/latest/ubuntu_${arch}/session-manager-plugin.deb \
#     -o "session-manager-plugin.deb" \
#     && dpkg -i session-manager-plugin.deb \
#     && rm session-manager-plugin.deb

# psqlをインストール
echo "deb https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list \
    && wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - \
    && apt update \
    && apt install -y postgresql-client-17 \
    && rm /etc/apt/sources.list.d/pgdg.list
