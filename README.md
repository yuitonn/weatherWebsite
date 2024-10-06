# weatherWebsite

## サイト説明
  
このサイトは、出かける日の天気を何度も調べることなく、  
最新の天気を取得できるサイトです。
  
  
まずこのサイトにログインすると Search ページが表示されます。  

### Search
Search では検索欄があり、  
ここに県名や都市名を日本語で入力することができます。  
また、日にちをカレンダーから指定できます。(最大13日後まで指定できます)  
必要な情報を入力した状態で表示ボタンを押すと、下記の情報を取得することができます。  

* 天気
* 気温
* 風速
* 最高/最低気温
* 危険予測(発表されている場合)  
※指定した日から３日分のデータ
  
天気を取得した状態では 表示ボタン が 追加ボタン に変わります。   
チェックボックスにチェックをつけた状態で 追加ボタン を押すと、  
{ 都市名, 指定日 } がデータベース上に保存されます。  
  

### MyDate
またこのサイトは MyData ページが存在します。  
その画面に遷移すると、過去に追加したデータを元に自動で天気情報を取得します。  
取得情報の下部には削除ボタンが表示され、このボタンを押すと情報がデータベース上から削除されます。  
  
  
##今後の追加実装
  
出かける日程の前日にLINEで通知するという機能を、設計時点で構想していました。  
  
* LINE Developers ConsoleでLINE公式アカウントを作成し、
* LINE Loginを実装する
* LINE Messaging APIをy取得してLaranelで機能を実装する
  
しかし、開発環境では常時サーバーを建てることはできないため、  
AWSを学んだ後に、より良いUIを考えるとともに実装しようと考えています。  
  
  
  
# 主な使用言語やライブラリなど
  
* PHP 8.3.8
* Laravel 10
* Breeze
* Mysql
* Nginx
* React 1.0.0
* Axios 1.6.4
* Vite 5.0.0
* React-dom 18.3.1
* Styled-components 6.1.13
* Emotion/react 11.7.1
  
  
  
# 初期設定
  
```.yml servis app volumes
- .env:/var/www/html/.env
```

```Laravel bash
cp .env.example .env
php artisan config:clear

composer install
```

```React bash
npm install
```

※環境変数はenv.exampleに書いてあります
※Breezeは開発途中で導入したため、こちらもインストールしてください
  
  
  
# Author
  
吉川唯音




