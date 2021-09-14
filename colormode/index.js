const bodyEl = document.querySelector('body');
let colorMode = 'lightmode'; //デフォルトはライトモード。

// Local Storageに保存されているモードを読み出して、現在の表示と異なる場合は適用する。
const applyStoredMode = () => {
  // 保存されているモードの読み出し
  const storedMode = localStorage.getItem('colormode');

  // 保存されていない場合（null）と、現在の表示と同じ場合は何もしない
  if (storedMode === null || storedMode === colorMode) {
    return;
  }

  // 保存されていたモードで上書き
  colorMode = storedMode;

  // body要素のクラスを付け替え
  bodyEl.classList.remove(...bodyEl.classList);
  bodyEl.classList.add(colorMode);

  // ラジオボタンの選択状態も更新
  document.querySelector(`input[name="colormode"][value="${colorMode}"]`).checked = true;
}

// 他のウィンドウでストレージの中身が変更された際、カラーモードが変更されていれば反映する。
window.addEventListener('storage', () => {
  applyStoredMode();
});

// ラジオボタンでのモード切り替え
document.querySelectorAll('input[name="colormode"]').forEach(el => {
  el.addEventListener('change', () => {
    colorMode = document.querySelector('input[name="colormode"]:checked').value;
    bodyEl.classList.remove(...bodyEl.classList);
    bodyEl.classList.add(colorMode);

    // Local Storageに保存する
    localStorage.setItem('colormode', colorMode);
  });
});

// ページロード時に、すでにLocal Storageにカラーモードが保存されていれば反映する。
applyStoredMode();
