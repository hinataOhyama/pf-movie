# 1. 概要

**プロジェクト名:** pf-movie

**自己紹介:**  
氏名: 大山陽和太  
得意な技術: React, Next.js, TypeScript

**ポートフォリオ概要:**  
このアプリは、動画配信プラットフォームアプリです。`React`と`TypeScript`を使用して構築されており、`Firebase`をバックエンドとして利用しています。ユーザー認証やデータ管理機能を備え、レスポンシブなデザインで様々なデバイスに対応しています。

**URL:** https://pf-movie-rdtvvjvyr-hinataohyamas-projects.vercel.app/

# 2. 開発技術

**使用技術:**  
- `HTML`
- `CSS`
- `TypeScript`

**ライブラリ/フレームワーク:**  
- `React`
- `Next.js`
- `Yamada UI`
- `Firebase`

**ツール:**  
- `Git`
- `VSCode`
- `Vercel`
- `TMDB API`

# 3. ポートフォリオ詳細

**概要:**  
`TMDB API`を利用して動画情報を取得し、詳細情報やクレジット、ビデオを表示するアプリケーションを作成しました。

**開発期間:**  
2025年1月23日 ～ 2025年1月30日

**工夫した点:**  
- `Next.js v15`, `React v19`を使って新機能のキャッチアップも兼ねた。
- 有名なコンポーネントライブラリ(`MUI`, `Chakra UI` etc...)ではなく、あまり浸透していないライブラリ(`Yamada UI`)を使用することで、自走力アピールの一助になると判断した。

**フォルダ構成:**
- **`components/`**
  - **`feature/`**
    - ユーザー認証機能などの機能コンポーネントの格納。
  - **`ui/`**
    - 共通コンポーネントの格納。
  
- **`app/`**
  - Next.js のルーティングページ。

- **`_app/`**
  - ルーティングページからcontainerとpresentationに切り分けたものを格納する。
  
- **`services/`**
  - API クライアントやビジネスロジックなどのサービス層のコード。
  
- **`themes/`**
  - Yamada UIのthemeConfigを格納。
  
- **`utils/`**
  - ユーティリティ関数やヘルパー関数を格納。
