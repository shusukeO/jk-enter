# JK Enter

検索結果画面でVimライクなキーボードナビゲーションを提供するChrome拡張機能です。

## 配布

https://chromewebstore.google.com/detail/jk-enter/ojkdcnmekahoajljhmilnbmnngfghhbb

## 機能

- `j` キー: 次の検索結果を選択
- `k` キー: 前の検索結果を選択  
- `Enter` キー: 選択中の検索結果を開く
- 選択中の検索結果をハイライト表示
- 自動スクロール機能

## 対応検索エンジン

- Google検索 (google.com, google.co.jp)
- Bing検索 (bing.com)
- Yahoo検索 (search.yahoo.com, search.yahoo.co.jp)

## インストール方法

### 開発モード（手動インストール）

1. Chromeで `chrome://extensions/` を開く
2. 右上の「デベロッパーモード」を有効にする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. このフォルダを選択

### 使用方法

1. 検索エンジンで何かを検索
2. 検索結果画面で以下のキーを使用：
   - `j`: 下の結果を選択
   - `k`: 上の結果を選択
   - `Enter`: 選択中の結果を開く

## 注意事項

- 検索ボックスや他の入力フィールドにフォーカスがある時は動作しません
- `Ctrl+Enter` または `Cmd+Enter` で新しいタブで開くことができます

## ファイル構成

- `manifest.json`: 拡張機能の設定ファイル
- `content.js`: メイン機能のスクリプト
- `styles.css`: ハイライトスタイル
- `icon.svg`: 拡張機能のアイコン

## 技術仕様

- Manifest V3準拠
- コンテンツスクリプトによる実装
- セキュアなisolated world環境で動作
