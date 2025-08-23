# Cloudy Requirements Document

## Introduction

Cloudyは「Claude Code CLIの完全なインタラクティブGUIラッパー」として、既存のCLI機能を完全に保持しながら、Claudiaスタイルの視覚的優しさを統合したデスクトップアプリケーションです。「6畳の質素な空間に観葉植物を置く」というコンセプトのもと、開発者の日常使いに最適化された統一UXを提供します。

本ドキュメントでは、EARS（Easy Approach to Requirements Syntax）形式を用いて、システムの振る舞いを明確に定義します。

## Requirements

### Requirement 1: アプリケーション起動・初期化

**User Story:** 開発者として、Cloudyを起動してプロジェクトを選択し、新規または既存のセッションで作業を開始したい。

#### Acceptance Criteria

1. WHEN アプリケーションが起動される THEN システム SHALL Claudiaスタイルのプロジェクト選択画面を3秒以内に表示する
2. WHEN プロジェクト選択画面が表示される THEN システム SHALL Recent Projectsリストを表示する
3. WHEN ユーザーが「Open Project」ボタンをクリックする THEN システム SHALL ディレクトリ選択ダイアログを開く
4. WHEN ユーザーがプロジェクトディレクトリを選択する THEN システム SHALL プロジェクトパスを画面に表示する
5. WHEN プロジェクトが選択される THEN システム SHALL セッション選択画面に遷移する

### Requirement 2: セッション管理・権限設定

**User Story:** 開発者として、過去のセッションから継続するか新規セッションを開始し、権限設定を簡単に制御したい。

#### Acceptance Criteria

1. WHEN セッション選択画面が表示される THEN システム SHALL 選択プロジェクトの過去セッション一覧を表示する
2. WHEN ユーザーが既存セッションを選択する THEN システム SHALL `ccode -r`相当のセッション復元を実行する
3. WHEN ユーザーが新規セッションボタンをクリックする THEN システム SHALL 新規セッション作成画面を表示する
4. WHEN 新規セッション画面が表示される THEN システム SHALL 「skip mode」チェックボックスを表示する
5. WHEN ユーザーが「skip mode」チェックボックスを選択する THEN システム SHALL 内部的に`--dangerously-skip-permissions`フラグを適用する
6. WHEN 権限設定が変更される THEN システム SHALL 設定を永続化して次回起動時に復元する
7. WHEN セッションが開始される THEN システム SHALL メインの対話画面に遷移する

### Requirement 3: ターミナル統合・CLI互換性

**User Story:** 開発者として、GUI内で既存のClaude Code CLIのすべての機能とコマンドを使用したい。

#### Acceptance Criteria

1. WHEN 対話画面が表示される THEN システム SHALL xterm.js + node-ptyによるターミナルエミュレーションを提供する
2. WHEN ユーザーがターミナルにコマンドを入力する THEN システム SHALL Claude Code CLIとのリアルタイム双方向通信を50ms以内で実行する
3. WHEN ユーザーが`ccode`エイリアスを使用する THEN システム SHALL ローカル環境のエイリアス設定を継承して実行する
4. WHEN ユーザーが`shift+tab`を押す THEN システム SHALL モード切り替え（accept edits on/off、plan mode on/off等）を実行する
5. WHEN ユーザーが`/model`、`/permissions`、`/status`等のビルトインコマンドを実行する THEN システム SHALL すべてのコマンドを正常に処理する
6. WHEN システムが起動する THEN システム SHALL 既存のCLI設定・MCP設定を自動継承する
7. WHEN ユーザーがテキストを選択する THEN システム SHALL コピー&ペースト機能を提供する

### Requirement 4: 視覚的GUI・チャットインターフェース

**User Story:** 開発者として、Claudeとの対話を親しみやすいカード型UIで体験し、目に優しいテーマで長時間作業したい。

#### Acceptance Criteria

1. WHEN Claudeからの返答が受信される THEN システム SHALL ロボットアイコン付きのカード型UIで表示する
2. WHEN ユーザーが入力欄にテキストを入力する THEN システム SHALL 画面下部の入力欄でチャット風の対話を提供する
3. WHEN ユーザーがテーマ選択を行う THEN システム SHALL 朝テーマ（水色〜ピンクグラデーション）と夕テーマ（紫〜ピンクグラデーション）を提供する
4. WHEN テーマが選択される THEN システム SHALL ライト/ダークモードの両方を各テーマで提供する
5. WHEN テーマが変更される THEN システム SHALL 和紙のような優しい背景色を適用する（真っ黒を避ける）
6. WHEN テーマ設定が変更される THEN システム SHALL 設定を保存して次回起動時に復元する
7. WHEN 対話画面が表示される THEN システム SHALL Tailwind CSS + Radix UIベースのコンポーネントを使用する

### Requirement 5: シンプル設計・パフォーマンス

**User Story:** 開発者として、複雑な機能に邪魔されることなく、1セッションずつシンプルに集中して作業したい。

#### Acceptance Criteria

1. WHEN システムが設計される THEN システム SHALL 1セッションずつの処理に特化する
2. WHEN UI画面が表示される THEN システム SHALL サイドバーなしのクリーンなレイアウトを提供する
3. WHEN ユーザーがアプリを操作する THEN システム SHALL ドラッグ&ドロップ等の複雑操作を実装しない
4. IF 使用状況分析やグラフ表示の要求がある THEN システム SHALL これらの機能を実装しない
5. IF 複数セッション並行実行の要求がある THEN システム SHALL この機能を実装しない
6. IF MCP管理画面の要求がある THEN システム SHALL 既存設定の自動継承のみを提供する
7. WHEN パフォーマンス要件が評価される THEN システム SHALL 以下を満たす：
   - アプリケーション起動時間: 3秒以内
   - メモリ使用量: 300MB以下（アイドル状態）
   - UI反応時間: 200ms以内

### Requirement 6: セキュリティ・データ保護

**User Story:** 開発者として、APIキーや機密情報が安全に管理され、データが適切に保護されたい。

#### Acceptance Criteria

1. WHEN APIキーやトークンが保存される THEN システム SHALL OS keychain storageで暗号化保存する
2. WHEN セッションデータが保存される THEN システム SHALL 機密情報を含まないlocalStorageに保存する
3. WHEN ファイルシステムアクセスが発生する THEN システム SHALL Electronのsandbox制限内で実行する
4. WHEN 外部通信が発生する THEN システム SHALL HTTPS通信のみを許可する
5. WHEN システムが実行される THEN システム SHALL リモートコード実行を禁止する
6. WHEN プロセス実行が要求される THEN システム SHALL Claude Code CLI以外の外部プロセス実行を禁止する

### Requirement 7: プラットフォーム互換性・可用性

**User Story:** 開発者として、使用しているプラットフォームでCloudyが安定動作し、長時間の作業でも問題なく使用したい。

#### Acceptance Criteria

1. WHEN システムがmacOS 11.0以降で実行される THEN システム SHALL 完全な機能を提供する（優先プラットフォーム）
2. WHEN システムがWindows 10以降で実行される THEN システム SHALL 基本機能を提供する
3. WHEN システムがUbuntu 20.04以降で実行される THEN システム SHALL 基本機能を提供する
4. WHEN Claude Code CLI最新版がリリースされる THEN システム SHALL 完全互換性を維持する
5. WHEN システムが24時間連続動作する THEN システム SHALL 99.9%以上のアップタイムを維持する
6. WHEN システムがクラッシュする THEN システム SHALL 自動復旧・セッション保持機能を実行する
7. WHEN セッションデータが作成される THEN システム SHALL 自動バックアップを実行する

## Non-Functional Requirements

### Performance Requirements

1. WHEN ターミナルコマンドが実行される THEN システム SHALL 50ms以内でレスポンスを返す
2. WHEN プロジェクト選択画面が要求される THEN システム SHALL 500ms以内で表示する
3. WHEN CPU使用率が測定される THEN システム SHALL アイドル状態で5%以下を維持する
4. WHEN ディスク使用量が計測される THEN システム SHALL インストール後500MB以下を維持する

### Usability Requirements

1. WHEN Claude Code CLIユーザーがCloudyを初回使用する THEN システム SHALL 5分以内で基本操作習得を可能にする
2. WHEN 主要機能にアクセスする THEN システム SHALL キーボードショートカットでのアクセスを提供する
3. WHEN 設定値が変更される THEN システム SHALL 自動保持・復元機能を提供する

### Maintainability Requirements

1. WHEN システムアップデートが利用可能になる THEN システム SHALL 自動アップデート機能を提供する
2. WHEN エラーが発生する THEN システム SHALL 詳細なエラーログ・診断情報を出力する
3. WHEN 設定・データ形式が変更される THEN システム SHALL 下位互換性を保持する

---

**Document Version:** 3.0  
**Created:** 2025-08-21  
**Updated:** 2025-08-23  
**Format:** EARS (Easy Approach to Requirements Syntax)  
**Status:** Generated, Pending Approval