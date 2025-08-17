// Countdown Timer
    const timerEl = document.getElementById('timer');
    const targetDate = new Date("2025-08-04T00:00:00");


    function animateFlip(id, value) {
      const el = document.getElementById(id);
      if (el && el.textContent !== value.toString()) {
        const timeUnit = el.closest('.time-unit');
        
        gsap.to(timeUnit, {
          duration: 0.3,
          rotationX: 90,
          transformOrigin: "center bottom",
          ease: "power2.in",
          onComplete: () => {
            el.textContent = value;
            gsap.fromTo(timeUnit, 
              { rotationX: -90 },
              { 
                duration: 0.3,
                rotationX: 0,
                ease: "power2.out"
              }
            );
          }
        });
      }
    }

    function updateTimer() {
      const now = new Date();
      const diff = targetDate - now;
      const revealBtn = document.getElementById('revealBtn');
      const typeform = document.getElementById('typeform'); 
      const messagesSection = document.getElementById('messagesSection');
      const headers = document.getElementById('headers');

      if (diff < 0) {
        headers.textContent = "HAPPY BIRTHDAY MICAAA!!!"
        timerEl.innerHTML = "🎉 It's time to celebrate!";
        
        // GSAP animations for birthday reveal
        gsap.to("#messagesSection", {
          duration: 0.8,
          opacity: 1,
          y: 0,
          ease: "power2.out"
        });
        
        gsap.to("#messagesWall", {
          duration: 0.8,
          opacity: 1,
          delay: 0.3,
          ease: "power2.out"
        });

        if (revealBtn) {
          revealBtn.style.display = "inline-block";
          gsap.fromTo(revealBtn, 
            { scale: 0, rotation: 180, opacity: 0 },
            {
              duration: 1,
              scale: 1,
              rotation: 0,
              opacity: 1,
              ease: "elastic.out(1, 0.5)"
            }
          );
        }
        if (typeform) {
          typeform.style.display = "none";
        }
        clearInterval(interval);
        return;
      } else {
        headers.textContent = "Konti na lang,,,";
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      animateFlip("days", days);
      animateFlip("hours", hours);
      animateFlip("minutes", minutes);
      animateFlip("seconds", seconds);
    }

    // GSAP header animation with fallback
    if (typeof gsap !== 'undefined') {
      gsap.to("#headers", {
        duration: 1.2,
        y: 0,
        opacity: 1,
        ease: "bounce.out"
      });
    } else {
      // Fallback if GSAP is blocked
      document.getElementById('headers').style.opacity = '1';
      document.getElementById('headers').style.transform = 'translateY(0)';
    }

    // Initialize timer on first run
    updateTimer();
    
    // GSAP timer entrance animation with fallback
    if (typeof gsap !== 'undefined') {
      gsap.to("#timer", {
        duration: 1,
        opacity: 1,
        scale: 1,
        delay: 0.5,
        ease: "back.out(1.5)"
      });
    } else {
      // Fallback if GSAP is blocked
      setTimeout(() => {
        document.getElementById('timer').style.opacity = '1';
        document.getElementById('timer').style.transform = 'scale(1)';
      }, 500);
    }
    
    const interval = setInterval(updateTimer, 1000);

    // Reveal Surprise + Confetti
    document.getElementById('revealBtn').addEventListener('click', () => {
      const surpriseMsg = document.getElementById('surpriseMessage');
      
      if (surpriseMsg.classList.contains('hidden')) {
        surpriseMsg.classList.remove('hidden');
        gsap.fromTo(surpriseMsg, 
          { opacity: 0, scale: 0.5, y: 20 },
          { 
            duration: 0.6,
            opacity: 1,
            scale: 1,
            y: 0,
            ease: "back.out(1.7)"
          }
        );
      } else {
        gsap.to(surpriseMsg, {
          duration: 0.3,
          opacity: 0,
          scale: 0.5,
          y: -20,
          ease: "power2.in",
          onComplete: () => surpriseMsg.classList.add('hidden')
        });
      }
      
      // Enhanced confetti
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
        }, i * 150);
      }
    });

    // Birthday Messages from OpenSheet
    const SHEET_ID = '1Gv9K4j6Xg0w9iN9xNgwyteZiKsL7dNPNmgSOSNjOw88';
    const TAB_NAME = 'hi';

    function fetchMessages() {
      fetch(`https://opensheet.elk.sh/${SHEET_ID}/${TAB_NAME}`)
        .then(res => res.json())
        .then(showMessages)
        .catch(err => {
          console.error("Error fetching messages:", err);
          document.getElementById("messagesWall").innerHTML =
            "<p>Could not load messages 💔</p>";
        });
    }

    function showMessages(data) {
  const wall = document.getElementById("messagesWall");
  wall.innerHTML = "";

  data.forEach(entry => {
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

  // GSAP staggered animation for message cards
  gsap.fromTo(".messageCard", 
    { y: 30, opacity: 0, scale: 0.9 },
    {
      duration: 0.6,
      y: 0,
      opacity: 1,
      scale: 1,
      stagger: 0.1,
      ease: "back.out(1.2)"
    }
  );

  // Attach click listeners after all cards are created
  document.querySelectorAll(".reactBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const countEl = btn.querySelector(".count");
      let count = parseInt(countEl.textContent, 10);
      countEl.textContent = count + 1;
      btn.classList.add("reacted");
      
      // GSAP heart animation
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

  window.addEventListener('DOMContentLoaded', fetchMessages);