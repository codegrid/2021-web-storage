const bodyEl = document.querySelector('body');

// Local Storageに保存されている色を読み出して適用する。
const applyStoredColor = () => {
  // 保存されている色の読み出し
  const storedColor = localStorage.getItem('bgColor');

  // 保存されていない場合（null）は何もしない
  if (storedColor === null) {
    return;
  }

  // body要素の背景色を変更
  bodyEl.style.backgroundColor = storedColor;

  // ラジオボタンの選択状態も更新
  document.querySelector(`input[name="bgColor"][value="${storedColor}"]`).checked = true;
}

// 他のウィンドウで色が変更された場合
window.addEventListener('storage', (e) => {
  if (e.key !== 'bgColor') { // `bgColor`キー以外の変更の場合は無視する。
    return;
  }

  applyStoredColor();
});

// ラジオボタンでの色の切り替え
document.querySelectorAll('input[name="bgColor"]').forEach(el => {
  el.addEventListener('change', () => {
    const bgColor = document.querySelector('input[name="bgColor"]:checked').value;
    bodyEl.style.backgroundColor = bgColor;

    // Local Storageに保存する
    localStorage.setItem('bgColor', bgColor);
  });
});

// ページロード時に、すでにLocal Storageに色が保存されていれば反映する。
applyStoredColor();
