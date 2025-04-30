const cursor = document.getElementById('custom-cursor');

// 监听鼠标移动事件
document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// 可选：监听鼠标进入离开页面，显示/隐藏cursor（增强体验）
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = 1;
});

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = 0;
});

