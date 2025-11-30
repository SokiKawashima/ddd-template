#!/bin/zsh

# awsume
echo "alias awsume='. awsume'" >> ~/.zshrc

# miseの設定
echo 'PATH="/root/.local/share/mise/shims:$PATH"' >> ~/.zshenv
echo 'eval "$(mise activate zsh)"' >> ~/.zshenv
mkdir -p ~/.zsh/completion/_mise
mise completion zsh > ~/.zsh/completion/_mise

# miseのインストール
set -e
mise trust /workspace/.mise.toml
mise install
# mise run install