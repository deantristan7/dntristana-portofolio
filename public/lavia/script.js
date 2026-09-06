/**
 * Romantic Birthday Landing Page - Lavia Meiras Putri
 * Handcrafted Mobile-First JavaScript for iPhone 16 Safari Mobile
 * Clean, artisanal & bespoke (Zero AI emojis)
 */

(function () {
  'use strict';

  // --- DOM References ---
  const introStage = document.getElementById('intro-stage');
  const mainStage = document.getElementById('main-stage');
  const btnOpenGift = document.getElementById('btn-open-gift');
  const bgAudio = document.getElementById('bg-audio');
  const musicToggle = document.getElementById('music-toggle');
  const cakeInteractiveArea = document.getElementById('cake-interactive-area');
  const btnBlowCandle = document.getElementById('btn-blow-candle');
  const blowLabel = document.getElementById('blow-label');
  const candleFlame = document.getElementById('candle-flame-group');
  const candleSmoke = document.getElementById('candle-smoke');
  const wishBanner = document.getElementById('wish-banner');
  const btnSendLove = document.getElementById('btn-send-love');
  const loveCounter = document.getElementById('love-counter');
  const toastContainer = document.getElementById('toast-container');
  const ambientCanvas = document.getElementById('ambient-canvas');

  let isAudioPlaying = false;
  let isCandleLit = true;
  let loveCount = 0;
  let webAudioSynthRunning = false;
  let webAudioContext = null;
  let toastTimer = null;

  // --------------------------------------------------------------------------
  // 1. STAGE 1 REVEAL & AUDIO PLAYBACK (Safari Mobile Safe)
  // --------------------------------------------------------------------------
  btnOpenGift.addEventListener('click', onOpenGift);
  btnOpenGift.addEventListener('touchend', function (e) {
    e.preventDefault();
    onOpenGift();
  });

  function onOpenGift() {
    // Attempt to play MP3 audio immediately within user gesture
    playAudioSafely();

    // Fade out intro stage
    introStage.classList.add('fade-out');

    // Reveal main celebration
    setTimeout(() => {
      introStage.classList.add('hidden');
      mainStage.classList.remove('hidden');
      mainStage.classList.add('fade-in');
      musicToggle.classList.remove('hidden');
      musicToggle.classList.add('playing');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Trigger a gentle sparkle celebration burst
      spawnSparkleBurst(window.innerWidth / 2, window.innerHeight * 0.45);
    }, 450);
  }

  // --------------------------------------------------------------------------
  // 2. AUDIO PLAYBACK & FALLBACK SYNTHESIZER
  // --------------------------------------------------------------------------
  function playAudioSafely() {
    if (!bgAudio) return;

    bgAudio.volume = 0.85;
    const playPromise = bgAudio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isAudioPlaying = true;
          musicToggle.classList.add('playing');
        })
        .catch((err) => {
          console.warn('HTML5 audio play blocked or error, activating 8-bit Web Audio fallback:', err);
          startWebAudioChiptune();
          isAudioPlaying = true;
          musicToggle.classList.add('playing');
        });
    }
  }

  // Floating Music Controller Toggle
  musicToggle.addEventListener('click', toggleMusicState);

  function toggleMusicState() {
    if (webAudioSynthRunning) {
      if (webAudioContext && webAudioContext.state === 'running') {
        webAudioContext.suspend();
        isAudioPlaying = false;
        musicToggle.classList.remove('playing');
      } else if (webAudioContext) {
        webAudioContext.resume();
        isAudioPlaying = true;
        musicToggle.classList.add('playing');
      }
      return;
    }

    if (!bgAudio) return;

    if (bgAudio.paused) {
      bgAudio.play().then(() => {
        isAudioPlaying = true;
        musicToggle.classList.add('playing');
      });
    } else {
      bgAudio.pause();
      isAudioPlaying = false;
      musicToggle.classList.remove('playing');
    }
  }

  // Web Audio API 8-bit Chiptune Fallback for "Happy Birthday"
  function startWebAudioChiptune() {
    if (webAudioSynthRunning) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      webAudioContext = new AudioCtx();
      webAudioSynthRunning = true;

      // Happy Birthday Melody in C (8-bit notes: frequency, duration in beats)
      const notes = [
        { f: 261.63, d: 0.75 }, // C4
        { f: 261.63, d: 0.25 }, // C4
        { f: 293.66, d: 1.0 },  // D4
        { f: 261.63, d: 1.0 },  // C4
        { f: 349.23, d: 1.0 },  // F4
        { f: 329.63, d: 2.0 },  // E4

        { f: 261.63, d: 0.75 }, // C4
        { f: 261.63, d: 0.25 }, // C4
        { f: 293.66, d: 1.0 },  // D4
        { f: 261.63, d: 1.0 },  // C4
        { f: 392.00, d: 1.0 },  // G4
        { f: 349.23, d: 2.0 },  // F4

        { f: 261.63, d: 0.75 }, // C4
        { f: 261.63, d: 0.25 }, // C4
        { f: 523.25, d: 1.0 },  // C5
        { f: 440.00, d: 1.0 },  // A4
        { f: 349.23, d: 1.0 },  // F4
        { f: 329.63, d: 1.0 },  // E4
        { f: 293.66, d: 2.0 },  // D4

        { f: 466.16, d: 0.75 }, // Bb4
        { f: 466.16, d: 0.25 }, // Bb4
        { f: 440.00, d: 1.0 },  // A4
        { f: 349.23, d: 1.0 },  // F4
        { f: 392.00, d: 1.0 },  // G4
        { f: 349.23, d: 2.5 },  // F4
      ];

      const tempo = 120; // BPM
      const beatSec = 60 / tempo;

      function playMelodyLoop() {
        if (!webAudioSynthRunning || !webAudioContext) return;
        let currentTime = webAudioContext.currentTime + 0.1;

        notes.forEach((note) => {
          const osc = webAudioContext.createOscillator();
          const gain = webAudioContext.createGain();

          osc.type = 'square'; // Classic 8-bit sound
          osc.frequency.setValueAtTime(note.f, currentTime);

          const dur = note.d * beatSec;
          gain.gain.setValueAtTime(0.08, currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, currentTime + dur * 0.95);

          osc.connect(gain);
          gain.connect(webAudioContext.destination);

          osc.start(currentTime);
          osc.stop(currentTime + dur);

          currentTime += dur;
        });

        // Loop after song ends
        setTimeout(playMelodyLoop, (currentTime - webAudioContext.currentTime) * 1000 + 800);
      }

      playMelodyLoop();
    } catch (e) {
      console.error('Web Audio Synth failed:', e);
    }
  }

  // --------------------------------------------------------------------------
  // 3. INTERACTIVE CANDLE & CAKE
  // --------------------------------------------------------------------------
  cakeInteractiveArea.addEventListener('click', toggleCandle);
  btnBlowCandle.addEventListener('click', toggleCandle);

  function toggleCandle(e) {
    if (e) e.stopPropagation();

    if (isCandleLit) {
      // Blow out the candle
      isCandleLit = false;
      candleFlame.classList.add('hidden');
      candleSmoke.classList.remove('hidden');
      wishBanner.classList.remove('hidden');

      blowLabel.textContent = 'Nyalain Lagi Lilin-nya';

      // Sparkle explosion at the cake
      const rect = cakeInteractiveArea.getBoundingClientRect();
      spawnSparkleBurst(rect.left + rect.width / 2, rect.top + 50);

      showToast('Semoga semua harapan dan impian kamu terkabul ya sayang.');
    } else {
      // Relight candle
      isCandleLit = true;
      candleFlame.classList.remove('hidden');
      candleSmoke.classList.add('hidden');
      wishBanner.classList.add('hidden');

      blowLabel.textContent = 'Tiup Lilin';
      showToast('Lilin-nya udah nyala lagi');
    }
  }

  // --------------------------------------------------------------------------
  // 4. MICRO-INTERACTION: SEND LOVE TO DEAN
  // --------------------------------------------------------------------------
  btnSendLove.addEventListener('click', function (e) {
    loveCount++;
    loveCounter.textContent = loveCount;

    // Trigger cute floating hearts
    const rect = btnSendLove.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top;

    for (let i = 0; i < 5; i++) {
      createFloatingHeart(originX, originY);
    }

    // Sweet milestone notes
    if (loveCount === 5) {
      showToast('Lavia sayanggggg bgttt sama Dean.');
    } else if (loveCount === 12) {
      showToast('Pelukannyaa nyampee sampe siniiii');
    } else if (loveCount === 25) {
      showToast('Sayanggg bgt bgt bgt bgtttt, HABEDE SAYANGGGGGG LOVEE YOUUU');
    }
  });

  function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart-particle';

    const colors = ['#D44E60', '#E27B88', '#B23A4B', '#F8A5B8', '#D4AF37'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.floor(Math.random() * 8) + 16;

    heart.innerHTML = `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    `;

    const randomX = (Math.random() - 0.5) * 120;
    const randomDeg = (Math.random() - 0.5) * 40;

    heart.style.left = `${x + (Math.random() - 0.5) * 40}px`;
    heart.style.top = `${y}px`;
    heart.style.setProperty('--rx', `${randomX}px`);
    heart.style.setProperty('--rdeg', `${randomDeg}deg`);

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1600);
  }

  function spawnSparkleBurst(x, y) {
    for (let i = 0; i < 14; i++) {
      createFloatingHeart(x, y);
    }
  }

  // --------------------------------------------------------------------------
  // 5. TOAST NOTIFICATION
  // --------------------------------------------------------------------------
  function showToast(message) {
    if (!toastContainer) return;

    if (toastTimer) clearTimeout(toastTimer);

    toastContainer.textContent = message;
    toastContainer.classList.remove('hidden');

    toastTimer = setTimeout(() => {
      toastContainer.classList.add('hidden');
    }, 3200);
  }

  // --------------------------------------------------------------------------
  // 6. GENTLE AMBIENT CANVAS (Slow Drifting Petals & Warm Stardust)
  // Low battery consumption, silky smooth 60fps on Safari iPhone 16
  // --------------------------------------------------------------------------
  function initAmbientCanvas() {
    if (!ambientCanvas) return;
    const ctx = ambientCanvas.getContext('2d');
    let width = (ambientCanvas.width = window.innerWidth);
    let height = (ambientCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = ambientCanvas.width = window.innerWidth;
      height = ambientCanvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 20;

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -20;
        this.size = Math.random() * 7 + 4;
        this.speedY = Math.random() * 0.75 + 0.35;
        this.speedX = (Math.random() - 0.5) * 0.45;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = Math.random() * 0.45 + 0.2;
        this.type = Math.random() > 0.45 ? 'petal' : 'sparkle';
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.angle) * 0.35;
        this.angle += this.angleSpeed;

        if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.globalAlpha = this.opacity;

        if (this.type === 'petal') {
          // Soft pink petal
          ctx.fillStyle = '#F8A5B8';
          ctx.beginPath();
          ctx.moveTo(0, -this.size);
          ctx.bezierCurveTo(this.size * 0.8, -this.size * 0.5, this.size * 0.8, this.size * 0.5, 0, this.size);
          ctx.bezierCurveTo(-this.size * 0.8, this.size * 0.5, -this.size * 0.8, -this.size * 0.5, 0, -this.size);
          ctx.fill();
        } else {
          // Warm champagne stardust
          ctx.fillStyle = '#FFD54F';
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();
  }

  // Initialize ambient canvas
  initAmbientCanvas();
})();
