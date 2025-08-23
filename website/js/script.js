// Countdown Timer
const timerEl = document.getElementById('timer');
const targetDate = new Date("2025-08-04T00:00:00");

function flipNumber(id, newValue) {
  const element = document.getElementById(id);
  if (element.textContent !== newValue.toString()) {
    gsap.to(element, {
      duration: 0.15,
      rotationX: 90,
      ease: "power2.in",
      onComplete: () => {
        element.textContent = newValue;
        gsap.fromTo(element, 
          { rotationX: -90 },
          { duration: 0.15, rotationX: 0, ease: "power2.out" }
        );
      }
    });
  }
}

function updateTimer() {
  const now = new Date();
  const diff = targetDate - now;

  const messageSection = document.getElementById('message');
  const headers = document.getElementById('headers');

  if (diff < 0) {
    console.log('Birthday mode activated!');
    headers.textContent = "HAPPY BIRTHDAY MICAAA!!!"
    timerEl.innerHTML = "🎉 yeheyyy";

    document.body.classList.add('birthday-mode');
    document.body.classList.remove('countdown-mode');

    gsap.to("#messagesSection", {
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: "power2.out"
    });

    document.getElementById("messagesSection").style.display = "block";
    document.getElementById("messagesWall").style.display = "grid";

    fetchMessages();

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: {
            x: Math.random(),
            y: Math.random() * 0.5 + 0.3
          },
          colors: ['#3498db', '#a3c9f7', '#e6f0ff', '#ff69b4']
        });
      }, i * 200);
    }

    clearInterval(interval);
    return;
  } else {
    console.log('Countdown mode');
    headers.textContent = "Malapit na...";

    document.body.classList.add('countdown-mode');
    document.body.classList.remove('birthday-mode');
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  flipNumber("days", days);
  flipNumber("hours", hours);
  flipNumber("minutes", minutes);
  flipNumber("seconds", seconds);
}

gsap.from("#headers", {
  duration: 1.2,
  y: -50,
  scale: 0.5,
  opacity: 0,
  ease: "bounce.out"
});

gsap.from("#timer", {
  duration: 1,
  scale: 0.8,
  opacity: 0,
  delay: 0.5,
  ease: "back.out(1.5)"
});

// Cute hover message
const cuteMessages = ['hehe', 'hihi', 'teehee', 'mwa'];

document.getElementById('headers').addEventListener('mouseenter', () => {
  const popup = document.createElement('div');
  popup.id = 'cutePopup';
  popup.textContent = cuteMessages[Math.floor(Math.random() * cuteMessages.length)];
  popup.style.cssText = `
    position: absolute;
    background: #ff69b4;
    color: white;
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 14px;
    pointer-events: none;
    z-index: 1000;
    opacity: 0;
    transform: translateY(10px);
  `;
  
  const header = document.getElementById('headers');
  const rect = header.getBoundingClientRect();
  
  const randomX = (Math.random() - 0.5) * 200;
  const randomY = (Math.random() - 0.5) * 100;
  
  popup.style.left = rect.left + rect.width/2 + randomX + 'px';
  popup.style.top = rect.bottom + 10 + randomY + 'px';
  
  document.body.appendChild(popup);
  
  gsap.to(popup, {
    duration: 0.3,
    opacity: 1,
    y: 0,
    ease: 'back.out(1.7)'
  });
});

document.getElementById('headers').addEventListener('mouseleave', () => {
  const popup = document.getElementById('cutePopup');
  if (popup) {
    gsap.to(popup, {
      duration: 0.2,
      opacity: 0,
      y: -10,
      onComplete: () => popup.remove()
    });
  }
});

// Floating hearts animation
function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.innerHTML = '💖';
  heart.style.cssText = `
    position: fixed;
    font-size: ${15 + Math.random() * 10}px;
    pointer-events: none;
    z-index: 100;
    left: ${Math.random() * window.innerWidth}px;
    top: ${window.innerHeight + 50}px;
  `;
  document.body.appendChild(heart);
  
  gsap.to(heart, {
    duration: 8 + Math.random() * 4,
    y: -window.innerHeight - 100,
    x: `+=${(Math.random() - 0.5) * 200}`,
    rotation: 360,
    opacity: 0,
    ease: 'power1.out',
    onComplete: () => heart.remove()
  });
}

// Floating Balloons
function createFloatingBalloon() {
  const balloons = ['🎈', '🎆', '🎉'];
  const balloon = document.createElement('div');
  balloon.innerHTML = balloons[Math.floor(Math.random() * balloons.length)];
  balloon.className = 'floating-balloon';
  balloon.style.left = Math.random() * window.innerWidth + 'px';
  balloon.style.top = window.innerHeight + 50 + 'px';
  document.body.appendChild(balloon);
  
  gsap.to(balloon, {
    duration: 10 + Math.random() * 5,
    y: -window.innerHeight - 100,
    x: `+=${(Math.random() - 0.5) * 100}`,
    rotation: (Math.random() - 0.5) * 180,
    ease: 'power1.out',
    onComplete: () => balloon.remove()
  });
}

// Edge Sparkles
function createEdgeSparkle() {
  const sparkle = document.createElement('div');
  sparkle.innerHTML = '✨';
  sparkle.className = 'floating-sparkle';
  
  const edge = Math.floor(Math.random() * 4);
  switch(edge) {
    case 0:
      sparkle.style.left = Math.random() * window.innerWidth + 'px';
      sparkle.style.top = '0px';
      break;
    case 1:
      sparkle.style.left = window.innerWidth + 'px';
      sparkle.style.top = Math.random() * window.innerHeight + 'px';
      break;
    case 2:
      sparkle.style.left = Math.random() * window.innerWidth + 'px';
      sparkle.style.top = window.innerHeight + 'px';
      break;
    case 3:
      sparkle.style.left = '0px';
      sparkle.style.top = Math.random() * window.innerHeight + 'px';
      break;
  }
  
  document.body.appendChild(sparkle);
  
  gsap.fromTo(sparkle,
    { scale: 0, opacity: 1 },
    {
      duration: 3,
      scale: 1.5,
      opacity: 0,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      rotation: 360,
      ease: 'power2.out',
      onComplete: () => sparkle.remove()
    }
  );
}

// Scroll animations
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Special animation for message cards
        if (entry.target.id === 'messagesSection') {
          setTimeout(() => {
            const cards = document.querySelectorAll('.messageCard');
            cards.forEach((card, index) => {
              gsap.from(card, {
                duration: 0.6,
                y: 30,
                opacity: 0,
                scale: 0.9,
                delay: index * 0.1,
                ease: 'back.out(1.2)'
              });
            });
          }, 300);
        }
      }
    });
  }, { threshold: 0.2 });
  
  document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
  });
}

// Initialize everything
initScrollAnimations();

// Start ambient animations
setInterval(createFloatingHeart, 3000);
setInterval(createFloatingBalloon, 4000);
setInterval(createEdgeSparkle, 1500);

updateTimer();
const interval = setInterval(updateTimer, 1000);

function fetchMessages() {
  fetch(`https://opensheet.elk.sh/1Gv9K4j6Xg0w9iN9xNgwyteZiKsL7dNPNmgSOSNjOw88/hi`)
    .then(res => res.json())
    .then(showMessages)
    .catch(err => {
      console.error("Error fetching messages:", err);
      document.getElementById("messagesWall").innerHTML = "<p>Could not load messages 💔</p>";
    });
}

function showMessages(data) {
  const wall = document.getElementById("messagesWall");
  wall.innerHTML = "";

  data.forEach((entry, index) => {
    const msg = document.createElement("div");
    msg.className = "messageCard";
    msg.innerHTML = `
      <strong>${entry["Name pls"] || "Anonymous"}</strong><br>
      <p>${entry["Lapag niyo na yung bday greetings niyo kay mics"] || ""}</p>
      <div class="reactions">
        <button class="reactBtn">❤️ <span class="count">0</span></button>
      </div>
    `;
    wall.appendChild(msg);
  });

  document.querySelectorAll(".reactBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const countEl = btn.querySelector(".count");
      let count = parseInt(countEl.textContent, 10);
      countEl.textContent = count + 1;
      btn.classList.add("reacted");

      gsap.fromTo(btn, 
        { scale: 1 },
        {
          duration: 0.3,
          scale: 1.2,
          ease: "back.out(2)",
          yoyo: true,
          repeat: 1
        }
      );
    });
  });
}
