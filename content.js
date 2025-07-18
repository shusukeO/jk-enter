(function () {
  "use strict";

  console.log("Search Enter Open extension loaded");

  let currentSelectedIndex = 0;
  let searchResults = [];

  // 検索結果の要素を取得する関数
  function getSearchResults() {
    const results = [];
    const elements = document.querySelectorAll('a[href^="http"]');

    elements.forEach((link) => {
      const h3 =
        link.querySelector("h3") || link.closest("*").querySelector("h3");
      if (
        h3 &&
        !link.href.includes("google.com/search") &&
        !link.href.includes("google.com/url")
      ) {
        results.push(link);
      }
    });

    console.log("Found", results.length, "search results");
    return results;
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
      console.log("Extension initialized");
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
