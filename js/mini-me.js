const canvas = document.getElementById('miniMeEyesCanvas');
const ctx = canvas.getContext('2d');

const centerLeftEye = { x: 55, y: 56 };
const centerRightEye = { x: 70, y: 56 };
const eyeRadius = 7; // 白眼球半径
const pupilRadius = 3; // 瞳孔半径

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let eyeScaleY = 1;
let blinking = false;
let blinkTimer = 0;

function drawEyes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const rect = canvas.getBoundingClientRect();
  const centerCanvasX = rect.left + rect.width / 2;
  const centerCanvasY = rect.top + rect.height / 2;
  
  const deltaX = mouseX - centerCanvasX;
  const deltaY = mouseY - centerCanvasY;

  // ✨调整灵敏度
  const eyeMoveScale = 0.003; // 白眼球微微动
  const pupilMoveScale = 0.04; // 瞳孔动得大一点

  let eyeOffsetX = deltaX * eyeMoveScale;
  let eyeOffsetY = deltaY * eyeMoveScale;
  let pupilOffsetX = deltaX * pupilMoveScale;
  let pupilOffsetY = deltaY * pupilMoveScale;

  // ✨限制瞳孔移动半径，不能超过眼白内部
  const maxPupilMove = eyeRadius - pupilRadius - 1; // 留1px安全边界
  const pupilDistance = Math.hypot(pupilOffsetX, pupilOffsetY);
  if (pupilDistance > maxPupilMove) {
    const ratio = maxPupilMove / pupilDistance;
    pupilOffsetX *= ratio;
    pupilOffsetY *= ratio;
  }

  // 左眼
  ctx.save();
  ctx.translate(centerLeftEye.x + eyeOffsetX, centerLeftEye.y + eyeOffsetY);
  ctx.scale(1, eyeScaleY);
  ctx.beginPath();
  ctx.arc(0, 0, eyeRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.arc(centerLeftEye.x + eyeOffsetX + pupilOffsetX, centerLeftEye.y + eyeOffsetY + pupilOffsetY, pupilRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#397bd2';
  ctx.fill();

  // 右眼
  ctx.save();
  ctx.translate(centerRightEye.x + eyeOffsetX, centerRightEye.y + eyeOffsetY);
  ctx.scale(1, eyeScaleY);
  ctx.beginPath();
  ctx.arc(0, 0, eyeRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.arc(centerRightEye.x + eyeOffsetX + pupilOffsetX, centerRightEye.y + eyeOffsetY + pupilOffsetY, pupilRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#397bd2';
  ctx.fill();
}

function updateBlinking() {
  if (!blinking) {
    // ✨提高眨眼频率
    if (Math.random() < 0.005) { // 0.5%的概率，每2~4秒左右眨一次
      blinking = true;
      blinkTimer = 0;
    }
  } else {
    blinkTimer += 1;
    if (blinkTimer <= 10) {
      eyeScaleY = 1 - 0.09 * blinkTimer;
    } else if (blinkTimer <= 20) {
      eyeScaleY = 0.1 + 0.09 * (blinkTimer - 10);
    } else {
      blinking = false;
      eyeScaleY = 1;
    }
  }
}

function animate() {
  updateBlinking();
  drawEyes();
  requestAnimationFrame(animate);
}

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

window.addEventListener('load', () => {
    const miniMe = document.getElementById('miniMeContainer');
  
    setTimeout(() => {
      miniMe.style.opacity = '1';
      miniMe.style.transform = 'scale(1)';
      animate(); // 启动眼睛动画
    }, 4000); // ✨ 延迟0.5秒启动
  });
  
  

animate();


window.addEventListener('load', () => {
    const miniMe = document.getElementById('miniMeContainer');
    const miniMeMessage = document.getElementById('miniMeMessage');
  
    setTimeout(() => {
      miniMe.style.opacity = '1';
      miniMe.style.transform = 'scale(1)';
      animate();
  
      setTimeout(() => {
        miniMeMessage.classList.remove('hidden');
        miniMeMessage.classList.add('show');
      }, 1000); // 2.5秒后出现气泡
  
    }, 4000);
  
    // ✨ 点击气泡自己消失
    miniMeMessage.addEventListener('click', () => {
      miniMeMessage.classList.remove('show');
      miniMeMessage.classList.add('hidden');
    });
  });
  
  