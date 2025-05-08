

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

// Step 3.5: about 页面专属内容渐入
.fromTo([".about-main", ".about-right"],
  { opacity: 0 },
  { opacity: 1, duration: 3, ease: "power2.out" },
  "-=0.8" // 和上一段动画略微重叠
)



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



const tabs = document.querySelectorAll('.tab');
const allProjects = document.querySelectorAll('.project-row');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // 切换 tab 高亮样式
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.getAttribute('data-filter');

    allProjects.forEach(project => {
      const raw = project.getAttribute('data-category') || '';
      const categoryList = raw.trim().split(/\s+/); // 用空格切分多个标签

      if (filter === 'all') {
        project.style.display = 'flex';
      } else {
        const match = categoryList.includes(filter);
        project.style.display = match ? 'flex' : 'none';
      }
    });
  });
});

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.getAttribute('data-filter');

    // Step 1: 所有项目淡出
    const fadeOutRows = [...allProjects].filter(p => p.style.display !== 'none');
    gsap.to(fadeOutRows, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        // Step 2: 全部隐藏（设置 display）
        allProjects.forEach(project => {
          const raw = project.getAttribute('data-category') || '';
          const categoryList = raw.trim().split(/\s+/);
          const match = filter === 'all' || categoryList.includes(filter);
          project.style.display = match ? 'flex' : 'none';
        });

        // Step 3: 新项目立即设为透明再淡入
        const fadeInRows = [...allProjects].filter(p => p.style.display !== 'none');
        gsap.fromTo(fadeInRows,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" }
        );
      }
    });
  });
});

window.addEventListener("load", () => {
  gsap.to("#contact-section", {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power2.out",
    delay: 0.5, // 可选：延迟 0.5 秒出现
  });
});

