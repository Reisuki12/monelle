// Countdown Timer
const timerEl = document.getElementById('timer');
const targetDate = new Date("2025-08-04T00:00:00");

// Pagination variables
let allMessages = [];
let currentPage = 1;
let messagesPerPage = 6;

// Dynamic messages per page based on screen size
function updateMessagesPerPage() {
  if (window.innerWidth <= 768) {
    messagesPerPage = 3;
  } else {
    messagesPerPage = 6;
  }
}

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
      }
    });
  }, { threshold: 0.2 });
  
  document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
  });
}

// Personal Letter functionality
function initPersonalLetter() {
  const trigger = document.getElementById('secretTrigger');
  const letter = document.getElementById('personalLetter');
  const closeBtn = document.getElementById('closeLetter');
  
  if (trigger && letter && closeBtn) {
    trigger.addEventListener('click', () => {
      letter.classList.add('show');
      gsap.from('.letter-content', {
        duration: 0.5,
        scale: 0.5,
        rotation: 5,
        ease: 'back.out(1.7)'
      });
    });
    
    closeBtn.addEventListener('click', () => {
      letter.classList.remove('show');
    });
    
    letter.addEventListener('click', (e) => {
      if (e.target === letter) {
        letter.classList.remove('show');
      }
    });
  }
}

// Simple scroll down indicator
function addScrollHint() {
  const hint = document.createElement('div');
  hint.innerHTML = '↓ Scroll Down ↓';
  hint.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.9);
    color: #2c3e50;
    font-size: 16px;
    font-weight: 700;
    padding: 10px 20px;
    border-radius: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    border: 2px solid #3498db;
    z-index: 1000;
    pointer-events: none;
    backdrop-filter: blur(10px);
  `;
  document.body.appendChild(hint);
  
  gsap.timeline({ repeat: -1 })
    .to(hint, { duration: 1, y: -15, ease: 'power2.inOut' })
    .to(hint, { duration: 1, y: 0, ease: 'power2.inOut' })
    .to(hint, { duration: 0.3, scale: 1.1, ease: 'back.out(1.7)' })
    .to(hint, { duration: 0.3, scale: 1, ease: 'back.out(1.7)' });
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      gsap.to(hint, { duration: 0.5, opacity: 0 });
    }
  });
}

// Initialize everything
initScrollAnimations();
initPersonalLetter();
addScrollHint();

// Start ambient animations
setInterval(createFloatingHeart, 3000);
setInterval(createFloatingBalloon, 4000);
setInterval(createEdgeSparkle, 1500);

updateTimer();
const interval = setInterval(updateTimer, 1000);

function showLoadingCards() {
  const wall = document.getElementById('messagesWall');
  wall.innerHTML = '';
  
  for (let i = 0; i < messagesPerPage; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton-card';
    gsap.set(skeleton, { opacity: 0, y: 20 });
    wall.appendChild(skeleton);
    
    gsap.to(skeleton, {
      duration: 0.4,
      opacity: 1,
      y: 0,
      delay: i * 0.1,
      ease: 'power2.out'
    });
  }
}

function fetchMessages() {
  showLoadingCards();
  
  fetch(`https://opensheet.elk.sh/1Gv9K4j6Xg0w9iN9xNgwyteZiKsL7dNPNmgSOSNjOw88/hi`)
    .then(res => res.json())
    .then(showMessages)
    .catch(err => {
      console.error("Error fetching messages:", err);
      document.getElementById("messagesWall").innerHTML = "<p>Could not load messages 💔</p>";
    });
}

function showMessages(data) {
  allMessages = data.filter(entry => entry["Name pls"] && entry["Name pls"].trim() !== "Anonymous");
  currentPage = 1;
  updateMessagesPerPage();
  
  const wall = document.getElementById('messagesWall');
  gsap.to(wall.children, {
    duration: 0.3,
    opacity: 0,
    scale: 0.9,
    stagger: 0.05,
    ease: 'power2.in',
    onComplete: () => {
      displayPage(currentPage);
      setupPagination();
    }
  });
}

function displayPage(page) {
  const wall = document.getElementById("messagesWall");
  
  // Smooth transition out
  gsap.to(wall.children, {
    duration: 0.3,
    opacity: 0,
    y: -20,
    stagger: 0.05,
    ease: 'power2.in',
    onComplete: () => {
      wall.innerHTML = "";
      renderCards(page, wall);
    }
  });
}

function renderCards(page, wall) {
  const startIndex = (page - 1) * messagesPerPage;
  const endIndex = startIndex + messagesPerPage;
  const pageMessages = allMessages.slice(startIndex, endIndex);
  
  pageMessages.forEach((entry, index) => {
    const msg = document.createElement("div");
    const cardThemes = ['theme-pink', 'theme-blue', 'theme-purple', 'theme-mint', 'theme-peach'];
    const randomTheme = cardThemes[Math.floor(Math.random() * cardThemes.length)];
    msg.className = `messageCard ${randomTheme}`;
    
    const messageId = `msg_${startIndex + index}`;
    const savedReactions = JSON.parse(localStorage.getItem('reactions') || '{}');
    const reactions = savedReactions[messageId] || { heart: 0, laugh: 0, party: 0 };
    
    msg.innerHTML = `
      <div class="card-face card-front">
        <div class="card-name">${entry["Name pls"] || "Anonymous"}</div>
      </div>
    `;
    
    msg.dataset.messageId = messageId;
    msg.dataset.reactions = JSON.stringify(reactions);
    
    gsap.set(msg, { 
      y: 50, 
      opacity: 0, 
      scale: 0.8,
      rotationY: 15
    });
    wall.appendChild(msg);
    
    gsap.to(msg, {
      duration: 0.8,
      y: 0,
      opacity: 1,
      scale: 1,
      rotationY: 0,
      delay: index * 0.15,
      ease: 'back.out(1.7)',
      onComplete: () => {
        gsap.to(msg, {
          duration: 0.3,
          scale: 1.02,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut'
        });
      }
    });
    
    msg.addEventListener('click', () => {
      msg.classList.add('opened');
      const currentReactions = JSON.parse(msg.dataset.reactions || JSON.stringify(reactions));
      showZoomedCard(entry, messageId, currentReactions, msg);
    });
  });
}

function showZoomedCard(entry, messageId, reactions, cardElement) {
  const overlay = document.createElement('div');
  overlay.className = 'card-zoom-overlay';
  
  overlay.innerHTML = `
    <div class="zoomed-card">
      <button class="zoom-close">×</button>
      <div class="zoom-name">${entry["Name pls"] || "Anonymous"}</div>
      <div class="zoom-message">${entry["Lapag niyo na yung bday greetings niyo kay mics"] || ""}</div>
      <div class="zoom-reactions">
        <button class="reactBtn" data-reaction="heart" data-message-id="${messageId}">❤️ <span class="count">${reactions.heart}</span></button>
        <button class="reactBtn" data-reaction="laugh" data-message-id="${messageId}">😂 <span class="count">${reactions.laugh}</span></button>
        <button class="reactBtn" data-reaction="party" data-message-id="${messageId}">🎉 <span class="count">${reactions.party}</span></button>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  gsap.fromTo(overlay, { opacity: 0 }, { duration: 0.3, opacity: 1 });
  gsap.fromTo('.zoomed-card', { scale: 0.5 }, { duration: 0.5, scale: 1, ease: 'back.out(1.7)' });
  
  overlay.classList.add('active');
  
  function closeEnvelope() {
    // Update main card reactions before closing
    const savedReactions = JSON.parse(localStorage.getItem('reactions') || '{}');
    const currentReactions = savedReactions[messageId] || { heart: 0, laugh: 0, party: 0 };
    
    // Find and update main card if it exists
    const mainCard = document.querySelector(`[data-message-id="${messageId}"]`);
    if (mainCard) {
      const mainCardReactions = mainCard.closest('.messageCard');
      if (mainCardReactions) {
        // Store updated reactions for next time card is opened
        mainCardReactions.dataset.reactions = JSON.stringify(currentReactions);
      }
    }
    
    cardElement.classList.remove('opened');
    gsap.to(overlay, { duration: 0.3, opacity: 0, onComplete: () => overlay.remove() });
  }
  
  overlay.querySelector('.zoom-close').addEventListener('click', closeEnvelope);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeEnvelope();
  });
  
  overlay.querySelectorAll('.reactBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const countEl = btn.querySelector('.count');
      const messageId = btn.dataset.messageId;
      const reactionType = btn.dataset.reaction;
      
      let count = parseInt(countEl.textContent, 10);
      countEl.textContent = count + 1;
      btn.classList.add('reacted');
      
      const savedReactions = JSON.parse(localStorage.getItem('reactions') || '{}');
      if (!savedReactions[messageId]) {
        savedReactions[messageId] = { heart: 0, laugh: 0, party: 0 };
      }
      savedReactions[messageId][reactionType] = count + 1;
      localStorage.setItem('reactions', JSON.stringify(savedReactions));
      
      gsap.fromTo(btn, { scale: 1 }, { duration: 0.3, scale: 1.2, ease: "back.out(2)", yoyo: true, repeat: 1 });
    });
  });
}

function setupPagination() {
  const totalPages = Math.ceil(allMessages.length / messagesPerPage);
  const pageInfo = document.getElementById("pageInfo");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
  
  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      updateMessagesPerPage();
      displayPage(currentPage);
      setupPagination();
      document.getElementById('messagesSection').scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  nextBtn.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      updateMessagesPerPage();
      displayPage(currentPage);
      setupPagination();
      document.getElementById('messagesSection').scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Update on window resize
  window.addEventListener('resize', () => {
    updateMessagesPerPage();
    displayPage(currentPage);
    setupPagination();
  });
}