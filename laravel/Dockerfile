# LaravelのベースとなるPHPイメージ
FROM php:8.1-fpm

# Node.jsのインストール
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs

# Composerのインストール
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# 必要なPHP拡張機能のインストール
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    libssl-dev  # opensslのヘッダーをインストール

# PHP拡張機能のインストール
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# 作業ディレクトリの設定
WORKDIR /var/www/html

# Laravelプロジェクトを自動作成
RUN composer create-project --prefer-dist laravel/laravel . "10.*"

# パーミッションの設定
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

RUN chown www-data:www-data /var/www/html/.env \
    && chmod 644 /var/www/html/.env
# Laravelのキャッシュクリア
RUN php artisan config:cache

# ポートの開放
EXPOSE 9000

CMD ["php-fpm"]