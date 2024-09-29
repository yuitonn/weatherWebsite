# ReactのベースとなるNode.jsイメージ
FROM node:16

# 作業ディレクトリの設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package.json package-lock.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションソースをコピー
COPY . .

# ポートを開放
EXPOSE 3000

# Reactアプリケーションの起動（開発環境）
CMD ["npm", "run", "dev"]