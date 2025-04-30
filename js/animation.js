import { gsap } from "https://cdn.skypack.dev/gsap";

// 页面加载动画 timeline
window.addEventListener('load', () => {
  const pageTimeline = gsap.timeline(); // ✅重新命名，不冲突！

  // Step 1: Loading Bar 动画
  pageTimeline.to("#loadingBar", {
    width: "100%",
    duration: 1,
    ease: "power2.out"
  })

  // Step 2: Header 渐现
  .to(".header", {
    opacity: 1,
    duration: 1,
    ease: "power2.out"
  }, "-=0.5") 

  // Step 3: 其他 fade-in-line 元素依次出现
  .to(".fade-in-line:not(.header)", {
    opacity: 1,
    y: 0,
    stagger: 0.2,
    duration: 1,
    ease: "power2.out"
  }, "-=0.2")

  // Step 4: 页面加载完以后，logo跳动一次！
  .add(() => {
    logoJumpTimeline.restart();
  });
});

// logo跳动 timeline（只跳一次）
const logoSpans = document.querySelectorAll(".logo span");

const logoJumpTimeline = gsap.timeline({ paused: true });

logoJumpTimeline.to(logoSpans, {
  y: -8,
  stagger: 0.035,
  duration: 0.15,
  ease: "power2.out"
})
.to(logoSpans, {
  y: 0,
  stagger: 0.015,
  duration: 0.035,
  ease: "power1.out"
});

// 鼠标hover时，再跳一次
const logo = document.querySelector(".logo");

logo.addEventListener("mouseenter", () => {
  logoJumpTimeline.restart();
});

window.addEventListener('load', () => {
  setTimeout(() => {
    const miniMe = document.querySelector('.mini-me');
    if (miniMe) {
      miniMe.classList.add('visible'); // ✨ 加上visible class，触发弹出动画
    }
  }, 4000); // 这里4000ms = 4s，可以按你的main fade-in时间调整
});

 

window.addEventListener('load', () => {
  gsap.fromTo(".work-box", 
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1.8, delay: 0.8, ease: "power2.out" }
  );
});

const projectRows = document.querySelectorAll('.project-row');
const workBoxImage = document.getElementById('workBoxImage');

projectRows.forEach(row => {
  const imageUrl = row.getAttribute('data-image');
  row.addEventListener('mouseenter', () => {
    workBoxImage.src = imageUrl;
  });
  row.addEventListener('mouseleave', () => {
    workBoxImage.src = ''; // 可改为默认图
  });
});
