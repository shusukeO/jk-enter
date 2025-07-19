(function () {
  "use strict";

  let currentSelectedIndex = 0;
  let searchResults = [];

  // 検索結果の要素を取得する関数
  function getSearchResults() {
    const results = [];
    const seen = new Set();

    // メイン検索結果に限定したセレクタ
    const selectors = [
      '#search a[href*="://"]:has(h3)', // メイン検索エリア内のh3付きリンク
      '#center_col a[href*="://"]:has(h3)', // センターカラム内のh3付きリンク
    ];

    selectors.forEach((selector) => {
      try {
        const elements = document.querySelectorAll(selector);

        elements.forEach((link) => {
          // URL正規化（フラグメント除去）
          const normalizedUrl = normalizeUrl(link.href);

          if (!seen.has(normalizedUrl) && isValidSearchResult(link)) {
            seen.add(normalizedUrl);
            results.push(link);
          }
        });
      } catch (e) {
        // Selector failed silently
      }
    });

    return results;
  }

  // URL正規化関数（フラグメント除去）
  function normalizeUrl(url) {
    try {
      const urlObj = new URL(url);
      // フラグメント（#以降）を除去
      urlObj.hash = "";
      return urlObj.toString();
    } catch {
      return url;
    }
  }

  // 有効な検索結果かを判定する関数
  function isValidSearchResult(link) {
    // Google内部リンクを除外（ただし検索やURL以外は許可）
    if (
      link.href.includes("google.com/search") ||
      link.href.includes("google.com/url") ||
      link.href.includes("accounts.google.com")
    ) {
      return false;
    }

    // 関連質問セクションを除外
    if (link.closest(".related-question-pair, .xpdopen")) {
      return false;
    }

    // 表示状態チェック（非表示要素を除外）
    if (!isElementVisible(link)) {
      return false;
    }

    // 明らかな広告を除外
    if (link.closest("#tads, .ads-ad")) {
      return false;
    }

    // テキストの基本品質チェック
    const linkText = link.textContent.trim();
    if (linkText.length < 1) {
      return false;
    }

    // URLの基本チェック
    try {
      const url = new URL(link.href);
      const isValid = url.protocol === "http:" || url.protocol === "https:";
      return isValid;
    } catch {
      return false;
    }
  }

  // 要素が実際に表示されているかチェック
  function isElementVisible(element) {
    // offsetParentがnullの場合は非表示
    if (!element.offsetParent) {
      return false;
    }

    // 要素のbounding rectを取得
    const rect = element.getBoundingClientRect();

    // 要素が画面外や0サイズの場合は除外
    if (rect.width === 0 || rect.height === 0) {
      return false;
    }

    // computed styleで visibility と display をチェック
    const style = getComputedStyle(element);
    if (style.visibility === "hidden" || style.display === "none") {
      return false;
    }

    return true;
  }

  // ハイライトを更新する関数
  function updateHighlight() {
    // 全ての既存のハイライトを削除
    searchResults.forEach((result) => {
      result.classList.remove("search-enter-open-selected");
    });

    // 現在選択されている要素をハイライト
    if (
      currentSelectedIndex >= 0 &&
      currentSelectedIndex < searchResults.length
    ) {
      const selectedResult = searchResults[currentSelectedIndex];
      selectedResult.classList.add("search-enter-open-selected");
      selectedResult.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  // キーボードイベントを処理する関数
  function handleKeydown(event) {
    // 入力フィールドにフォーカスがある場合は何もしない
    if (
      document.activeElement.tagName === "INPUT" ||
      document.activeElement.tagName === "TEXTAREA"
    ) {
      return;
    }

    if (event.key === "j") {
      event.preventDefault();
      if (currentSelectedIndex < searchResults.length - 1) {
        currentSelectedIndex++;
        updateHighlight();
      }
    } else if (event.key === "k") {
      event.preventDefault();
      if (currentSelectedIndex > 0) {
        currentSelectedIndex--;
        updateHighlight();
      }
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (searchResults[currentSelectedIndex]) {
        window.location.href = searchResults[currentSelectedIndex].href;
      }
    }
  }

  // 初期化関数
  function initialize() {
    searchResults = getSearchResults();

    if (searchResults.length > 0) {
      currentSelectedIndex = 0;
      updateHighlight();
    }

    document.addEventListener("keydown", handleKeydown);
  }

  // ページ読み込み完了後に初期化
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();
