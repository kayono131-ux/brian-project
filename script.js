"use strict";

/* =========================================================
   SAVE FOR A GIFT
   BLOOM ENGINE
   STEP 1 + STEP 2
   LAYERS 1 TO 12
   ========================================================= */

const TOTAL_LAYERS = 40;

/* ---------------------------------------------------------
   HTML ELEMENTS
--------------------------------------------------------- */

const worldCard = document.getElementById("worldCard");
const worldImage = document.getElementById("worldImage");
const weatherCanvas = document.getElementById("weatherCanvas");
const context = weatherCanvas.getContext("2d");

const darkOverlay = document.getElementById("darkOverlay");
const sunLight = document.getElementById("sunLight");
const rainbow = document.getElementById("rainbow");

const layerSlider = document.getElementById("layerSlider");
const layerNumber = document.getElementById("layerNumber");
const percentText = document.getElementById("percentText");

const storyPanel = document.querySelector(".story-panel");
const storyTitle = document.getElementById("storyTitle");
const storyDescription =
  document.getElementById("storyDescription");

const previousButton =
  document.getElementById("previousButton");

const resetButton =
  document.getElementById("resetButton");

const nextButton =
  document.getElementById("nextButton");

/* ---------------------------------------------------------
   STATE
--------------------------------------------------------- */

let currentLayer = 1;
let previousLayer = 1;
let animationTime = 0;

let lightningOpacity = 0;
let lightningTimer = 0;

const rainDrops = [];
const clouds = [];
const birds = [];
const butterflies = [];
const driftingLeaves = [];
const lightParticles = [];
const fireflies = [];
/* ---------------------------------------------------------
   STORY DATA
--------------------------------------------------------- */

const stories = {
  1: {
    title: "A storm covers the world.",
    description:
      "Heavy rain and thunder hide what is waiting underneath."
  },

  2: {
    title: "The rain begins to weaken.",
    description:
      "The storm is still here, but the world can finally breathe."
  },

  3: {
    title: "The rain stops.",
    description:
      "Only drops of water remain on the quiet landscape."
  },

  4: {
    title: "The clouds begin to move.",
    description:
      "The dark sky opens and something bright waits beyond it."
  },

  5: {
    title: "Sunlight reaches the world.",
    description:
      "A warm beam of light touches the trees and water."
  },

  6: {
    title: "A rainbow appears.",
    description:
      "Color returns to the sky after the long storm."
  },

  7: {
    title: "The little birds return.",
    description:
      "They cross the bright sky and call the world home again."
  },

  8: {
    title: "The first flower blooms.",
    description:
      "A tiny flower opens where the storm once covered the ground."
  },

  9: {
    title: "A butterfly begins to dance.",
    description:
      "New life floats gently through the warm air."
  },

  10: {
    title: "The waterfalls begin to shine.",
    description:
      "Light moves through the falling water like silver and gold."
  },

  11: {
    title: "The leaves wake in the wind.",
    description:
      "The forest begins to move, breathe and whisper."
  },

  12: {
    title: "The great tree begins to glow.",
    description:
      "A warm light awakens inside the heart of the world."
  }
};

/* ---------------------------------------------------------
   UTILITIES
--------------------------------------------------------- */

function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}

function randomBetween(minimum, maximum) {
  return Math.random() * (maximum - minimum) + minimum;
}

function getCanvasWidth() {
  return weatherCanvas.clientWidth;
}

function getCanvasHeight() {
  return weatherCanvas.clientHeight;
}

/* ---------------------------------------------------------
   CANVAS SETUP
--------------------------------------------------------- */

function resizeCanvas() {
  const rectangle = worldCard.getBoundingClientRect();
  const pixelRatio = window.devicePixelRatio || 1;

  weatherCanvas.width =
    Math.floor(rectangle.width * pixelRatio);

  weatherCanvas.height =
    Math.floor(rectangle.height * pixelRatio);

  weatherCanvas.style.width =
    `${rectangle.width}px`;

  weatherCanvas.style.height =
    `${rectangle.height}px`;

  context.setTransform(
    pixelRatio,
    0,
    0,
    pixelRatio,
    0,
    0
  );

  createRain();
  createClouds();
  createBirds();
  createButterflies();
  createLeaves();
  createLightParticles();
   createFireflies();
}

/* ---------------------------------------------------------
   CREATE WEATHER
--------------------------------------------------------- */

function createRain() {
  rainDrops.length = 0;

  for (let index = 0; index < 180; index += 1) {
    rainDrops.push({
      x: randomBetween(-100, getCanvasWidth() + 100),
      y: randomBetween(-getCanvasHeight(), getCanvasHeight()),
      length: randomBetween(12, 31),
      speed: randomBetween(10, 22),
      thickness: randomBetween(0.7, 1.7),
      opacity: randomBetween(0.22, 0.78)
    });
  }
}

function createClouds() {
  clouds.length = 0;

  for (let index = 0; index < 8; index += 1) {
    clouds.push({
      x: randomBetween(-250, getCanvasWidth()),
      y: randomBetween(25, 230),
      width: randomBetween(190, 390),
      height: randomBetween(55, 115),
      speed: randomBetween(0.08, 0.32),
      opacity: randomBetween(0.16, 0.42)
    });
  }
}

/* ---------------------------------------------------------
   CREATE STEP 2 LIFE
--------------------------------------------------------- */

function createBirds() {
  birds.length = 0;

  for (let index = 0; index < 7; index += 1) {
    birds.push({
      x: randomBetween(-400, getCanvasWidth()),
      y: randomBetween(
        getCanvasHeight() * 0.12,
        getCanvasHeight() * 0.4
      ),
      size: randomBetween(8, 16),
      speed: randomBetween(0.55, 1.15),
      phase: randomBetween(0, Math.PI * 2)
    });
  }
}

function createButterflies() {
  butterflies.length = 0;

  for (let index = 0; index < 5; index += 1) {
    butterflies.push({
      x: randomBetween(40, getCanvasWidth() - 40),
      y: randomBetween(
        getCanvasHeight() * 0.35,
        getCanvasHeight() * 0.72
      ),
      size: randomBetween(5, 9),
      speed: randomBetween(0.25, 0.55),
      phase: randomBetween(0, Math.PI * 2),
      direction: Math.random() > 0.5 ? 1 : -1
    });
  }
}

function createLeaves() {
  driftingLeaves.length = 0;

  for (let index = 0; index < 34; index += 1) {
    driftingLeaves.push({
      x: randomBetween(0, getCanvasWidth()),
      y: randomBetween(0, getCanvasHeight()),
      size: randomBetween(3, 8),
      speedX: randomBetween(0.15, 0.55),
      speedY: randomBetween(0.08, 0.28),
      rotation: randomBetween(0, Math.PI * 2),
      rotationSpeed: randomBetween(-0.025, 0.025),
      phase: randomBetween(0, Math.PI * 2),
      opacity: randomBetween(0.35, 0.78)
    });
  }
}

function createLightParticles() {
  lightParticles.length = 0;

  for (let index = 0; index < 50; index += 1) {
    lightParticles.push({
      x: randomBetween(
        getCanvasWidth() * 0.2,
        getCanvasWidth() * 0.8
      ),
      y: randomBetween(
        getCanvasHeight() * 0.18,
        getCanvasHeight() * 0.82
      ),
      radius: randomBetween(1, 3.8),
      phase: randomBetween(0, Math.PI * 2),
      speed: randomBetween(0.006, 0.02),
      opacity: randomBetween(0.25, 0.9)
    });
  }
}

/* ---------------------------------------------------------
   WEATHER STRENGTH
--------------------------------------------------------- */

function getRainStrength() {
  if (currentLayer === 1) {
    return 1;
  }

  if (currentLayer === 2) {
    return 0.42;
  }

  if (currentLayer === 3) {
    return 0.06;
  }

  return 0;
}

function getCloudStrength() {
  if (currentLayer === 1) {
    return 1;
  }

  if (currentLayer === 2) {
    return 0.9;
  }

  if (currentLayer === 3) {
    return 0.7;
  }

  if (currentLayer === 4) {
    return 0.52;
  }

  if (currentLayer === 5) {
    return 0.25;
  }

  if (currentLayer >= 6) {
    return 0.12;
  }

  return 0;
}

/* ---------------------------------------------------------
   DRAW RAIN
--------------------------------------------------------- */

function drawRain() {
  const strength = getRainStrength();

  if (strength <= 0) {
    return;
  }

  context.save();
  context.lineCap = "round";

  for (const drop of rainDrops) {
    drop.x += drop.speed * 0.28;
    drop.y += drop.speed;

    if (
      drop.y > getCanvasHeight() + 40 ||
      drop.x > getCanvasWidth() + 80
    ) {
      drop.x = randomBetween(-100, getCanvasWidth());
      drop.y = randomBetween(-300, -30);
    }

    context.beginPath();

    context.strokeStyle =
      `rgba(205, 230, 255, ${
        drop.opacity * strength
      })`;

    context.lineWidth = drop.thickness;

    context.moveTo(drop.x, drop.y);

    context.lineTo(
      drop.x + drop.length * 0.28,
      drop.y + drop.length
    );

    context.stroke();
  }

  context.restore();
}

/* ---------------------------------------------------------
   DRAW CLOUDS
--------------------------------------------------------- */

function drawCloudShape(cloud) {
  context.beginPath();

  context.ellipse(
    cloud.x,
    cloud.y,
    cloud.width * 0.29,
    cloud.height * 0.42,
    0,
    0,
    Math.PI * 2
  );

  context.ellipse(
    cloud.x + cloud.width * 0.2,
    cloud.y - cloud.height * 0.14,
    cloud.width * 0.24,
    cloud.height * 0.52,
    0,
    0,
    Math.PI * 2
  );

  context.ellipse(
    cloud.x + cloud.width * 0.42,
    cloud.y,
    cloud.width * 0.3,
    cloud.height * 0.44,
    0,
    0,
    Math.PI * 2
  );

  context.fill();
}

function drawClouds() {
  const strength = getCloudStrength();

  if (strength <= 0) {
    return;
  }

  for (const cloud of clouds) {
    let movementMultiplier = 0.25;

    if (currentLayer >= 4) {
      movementMultiplier = 2.2;
    }

    cloud.x += cloud.speed * movementMultiplier;

    if (cloud.x > getCanvasWidth() + cloud.width) {
      cloud.x = -cloud.width;
      cloud.y = randomBetween(20, 230);
    }

    context.save();

    const cloudLightness =
      currentLayer >= 4
        ? "190, 205, 216"
        : "42, 53, 70";

    context.fillStyle =
      `rgba(${cloudLightness}, ${
        cloud.opacity * strength
      })`;

    context.filter =
      currentLayer >= 4
        ? "blur(12px)"
        : "blur(18px)";

    drawCloudShape(cloud);

    context.restore();
  }
}

/* ---------------------------------------------------------
   LIGHTNING
--------------------------------------------------------- */

function triggerLightning() {
  if (currentLayer !== 1) {
    lightningOpacity = 0;
    return;
  }

  lightningTimer -= 1;

  if (
    lightningTimer <= 0 &&
    Math.random() < 0.018
  ) {
    lightningOpacity = 0.9;
    lightningTimer = randomBetween(25, 90);
  }

  if (lightningOpacity > 0) {
    lightningOpacity *= 0.82;
  }
}

function drawLightningFlash() {
  if (lightningOpacity <= 0.01) {
    return;
  }

  context.save();

  context.fillStyle =
    `rgba(220, 235, 255, ${lightningOpacity})`;

  context.fillRect(
    0,
    0,
    getCanvasWidth(),
    getCanvasHeight()
  );

  context.restore();
}

function drawLightningBolt() {
  if (
    currentLayer !== 1 ||
    lightningOpacity < 0.4
  ) {
    return;
  }

  const startX = getCanvasWidth() * 0.7;

  context.save();

  context.strokeStyle =
    `rgba(240, 247, 255, ${lightningOpacity})`;

  context.lineWidth = 3;
  context.shadowColor =
    "rgba(205, 225, 255, 0.95)";
  context.shadowBlur = 18;

  context.beginPath();
  context.moveTo(startX, 0);

  context.lineTo(
    startX - 35,
    getCanvasHeight() * 0.18
  );

  context.lineTo(
    startX + 8,
    getCanvasHeight() * 0.3
  );

  context.lineTo(
    startX - 50,
    getCanvasHeight() * 0.5
  );

  context.stroke();
  context.restore();
}

/* ---------------------------------------------------------
   LAYER 7 — BIRDS
--------------------------------------------------------- */

function drawBirds() {
  if (currentLayer < 7) {
    return;
  }

  context.save();
  context.lineWidth = 2.2;
  context.lineCap = "round";

  for (const bird of birds) {
    bird.x += bird.speed;

    bird.y +=
      Math.sin(animationTime * 0.018 + bird.phase) * 0.2;

    if (bird.x > getCanvasWidth() + 50) {
      bird.x = randomBetween(-300, -40);
      bird.y = randomBetween(
        getCanvasHeight() * 0.12,
        getCanvasHeight() * 0.4
      );
    }

    const wingMovement =
      Math.sin(animationTime * 0.12 + bird.phase) *
      bird.size *
      0.32;

    context.strokeStyle =
      "rgba(28, 37, 42, 0.88)";

    context.beginPath();

    context.moveTo(
      bird.x - bird.size,
      bird.y + wingMovement
    );

    context.quadraticCurveTo(
      bird.x - bird.size * 0.45,
      bird.y - bird.size * 0.4,
      bird.x,
      bird.y
    );

    context.quadraticCurveTo(
      bird.x + bird.size * 0.45,
      bird.y - bird.size * 0.4,
      bird.x + bird.size,
      bird.y + wingMovement
    );

    context.stroke();
  }

  context.restore();
}

/* ---------------------------------------------------------
   LAYER 8 — FIRST FLOWER
--------------------------------------------------------- */

function drawFirstFlower() {
  if (currentLayer < 8) {
    return;
  }

  const centerX = getCanvasWidth() * 0.23;
  const groundY = getCanvasHeight() * 0.72;

  const bloomProgress =
    clamp((currentLayer - 7) + 0.15, 0, 1);

  const pulse =
    1 + Math.sin(animationTime * 0.025) * 0.035;

  context.save();

  context.strokeStyle =
    "rgba(82, 137, 70, 0.96)";
  context.lineWidth = 4;
  context.lineCap = "round";

  context.beginPath();
  context.moveTo(centerX, groundY + 58);
  context.quadraticCurveTo(
    centerX - 5,
    groundY + 28,
    centerX,
    groundY
  );
  context.stroke();

  context.fillStyle =
    "rgba(85, 158, 77, 0.92)";

  context.beginPath();
  context.ellipse(
    centerX - 10,
    groundY + 29,
    11,
    5,
    -0.45,
    0,
    Math.PI * 2
  );
  context.fill();

  context.translate(centerX, groundY);
  context.scale(
    bloomProgress * pulse,
    bloomProgress * pulse
  );

  const petalCount = 7;

  for (
    let petalIndex = 0;
    petalIndex < petalCount;
    petalIndex += 1
  ) {
    const angle =
      (Math.PI * 2 * petalIndex) / petalCount;

    context.save();
    context.rotate(angle);

    const petalGradient =
      context.createRadialGradient(
        0,
        -8,
        1,
        0,
        -10,
        18
      );

    petalGradient.addColorStop(
      0,
      "rgba(255, 255, 235, 1)"
    );

    petalGradient.addColorStop(
      0.45,
      "rgba(255, 185, 222, 0.98)"
    );

    petalGradient.addColorStop(
      1,
      "rgba(239, 104, 184, 0.88)"
    );

    context.fillStyle = petalGradient;

    context.beginPath();
    context.ellipse(
      0,
      -14,
      7,
      16,
      0,
      0,
      Math.PI * 2
    );
    context.fill();

    context.restore();
  }

  context.fillStyle =
    "rgba(255, 226, 92, 1)";

  context.shadowColor =
    "rgba(255, 223, 102, 0.95)";
  context.shadowBlur = 16;

  context.beginPath();
  context.arc(0, 0, 7, 0, Math.PI * 2);
  context.fill();

  context.restore();
}

/* ---------------------------------------------------------
   LAYER 9 — BUTTERFLIES
--------------------------------------------------------- */

function drawButterflies() {
  if (currentLayer < 9) {
    return;
  }

  for (const butterfly of butterflies) {
    butterfly.x +=
      butterfly.speed * butterfly.direction;

    butterfly.y +=
      Math.sin(
        animationTime * 0.025 + butterfly.phase
      ) * 0.42;

    if (butterfly.x > getCanvasWidth() + 30) {
      butterfly.x = -30;
    }

    if (butterfly.x < -30) {
      butterfly.x = getCanvasWidth() + 30;
    }

    const wingScale =
      0.25 +
      Math.abs(
        Math.sin(
          animationTime * 0.11 + butterfly.phase
        )
      ) * 0.9;

    context.save();
    context.translate(butterfly.x, butterfly.y);

    if (butterfly.direction < 0) {
      context.scale(-1, 1);
    }

    context.fillStyle =
      "rgba(255, 160, 224, 0.9)";

    context.shadowColor =
      "rgba(255, 173, 229, 0.8)";
    context.shadowBlur = 9;

    context.beginPath();
    context.ellipse(
      -butterfly.size * 0.55,
      0,
      butterfly.size * wingScale,
      butterfly.size * 0.72,
      -0.38,
      0,
      Math.PI * 2
    );
    context.fill();

    context.fillStyle =
      "rgba(133, 202, 255, 0.9)";

    context.beginPath();
    context.ellipse(
      butterfly.size * 0.55,
      0,
      butterfly.size * wingScale,
      butterfly.size * 0.72,
      0.38,
      0,
      Math.PI * 2
    );
    context.fill();

    context.fillStyle =
      "rgba(55, 45, 72, 0.9)";

    context.fillRect(
      -1,
      -butterfly.size * 0.45,
      2,
      butterfly.size * 0.9
    );

    context.restore();
  }
}

/* ---------------------------------------------------------
   LAYER 10 — WATERFALL LIGHT
--------------------------------------------------------- */

function drawWaterfallGlow() {
  if (currentLayer < 10) {
    return;
  }

  const waterfallPositions = [
    {
      x: getCanvasWidth() * 0.48,
      y: getCanvasHeight() * 0.29,
      width: getCanvasWidth() * 0.035,
      height: getCanvasHeight() * 0.34
    },
    {
      x: getCanvasWidth() * 0.62,
      y: getCanvasHeight() * 0.25,
      width: getCanvasWidth() * 0.025,
      height: getCanvasHeight() * 0.28
    }
  ];

  for (const waterfall of waterfallPositions) {
    const shimmer =
      0.62 +
      Math.sin(animationTime * 0.04 + waterfall.x) *
        0.14;

    const waterfallGradient =
      context.createLinearGradient(
        waterfall.x,
        waterfall.y,
        waterfall.x,
        waterfall.y + waterfall.height
      );

    waterfallGradient.addColorStop(
      0,
      `rgba(255, 250, 202, ${shimmer})`
    );

    waterfallGradient.addColorStop(
      0.35,
      `rgba(174, 235, 255, ${shimmer * 0.9})`
    );

    waterfallGradient.addColorStop(
      1,
      "rgba(190, 230, 255, 0)"
    );

    context.save();

    context.fillStyle = waterfallGradient;
    context.shadowColor =
      "rgba(188, 239, 255, 0.95)";
    context.shadowBlur = 22;

    context.beginPath();

    context.roundRect(
      waterfall.x - waterfall.width / 2,
      waterfall.y,
      waterfall.width,
      waterfall.height,
      waterfall.width / 2
    );

    context.fill();

    for (
      let sparkleIndex = 0;
      sparkleIndex < 7;
      sparkleIndex += 1
    ) {
      const sparkleY =
        waterfall.y +
        (
          animationTime * 1.2 +
          sparkleIndex * waterfall.height * 0.18
        ) %
          waterfall.height;

      context.fillStyle =
        "rgba(255, 255, 242, 0.88)";

      context.beginPath();

      context.arc(
        waterfall.x +
          Math.sin(
            animationTime * 0.04 + sparkleIndex
          ) *
            waterfall.width *
            0.3,
        sparkleY,
        1.8,
        0,
        Math.PI * 2
      );

      context.fill();
    }

    context.restore();
  }
}

/* ---------------------------------------------------------
   LAYER 11 — WIND AND LEAVES
--------------------------------------------------------- */

function drawLeaves() {
  if (currentLayer < 11) {
    return;
  }

  for (const leaf of driftingLeaves) {
    leaf.x +=
      leaf.speedX +
      Math.sin(animationTime * 0.018 + leaf.phase) *
        0.42;

    leaf.y +=
      leaf.speedY +
      Math.cos(animationTime * 0.014 + leaf.phase) *
        0.12;

    leaf.rotation += leaf.rotationSpeed;

    if (
      leaf.x > getCanvasWidth() + 20 ||
      leaf.y > getCanvasHeight() + 20
    ) {
      leaf.x = randomBetween(-70, -10);
      leaf.y = randomBetween(
        getCanvasHeight() * 0.12,
        getCanvasHeight() * 0.68
      );
    }

    context.save();
    context.translate(leaf.x, leaf.y);
    context.rotate(leaf.rotation);

    context.fillStyle =
      `rgba(108, 190, 93, ${leaf.opacity})`;

    context.beginPath();

    context.ellipse(
      0,
      0,
      leaf.size,
      leaf.size * 0.43,
      0,
      0,
      Math.PI * 2
    );

    context.fill();

    context.strokeStyle =
      `rgba(221, 245, 173, ${
        leaf.opacity * 0.7
      })`;

    context.lineWidth = 0.8;
    context.beginPath();
    context.moveTo(-leaf.size * 0.75, 0);
    context.lineTo(leaf.size * 0.75, 0);
    context.stroke();

    context.restore();
  }
}

/* ---------------------------------------------------------
   LAYER 12 — TREE AWAKENING
--------------------------------------------------------- */

function drawTreeGlow() {
  if (currentLayer < 12) {
    return;
  }

  const treeX = getCanvasWidth() * 0.5;
  const treeY = getCanvasHeight() * 0.43;

  const pulse =
    0.86 +
    Math.sin(animationTime * 0.022) * 0.12;

  const glowRadius =
    getCanvasWidth() * 0.19 * pulse;

  const treeGradient =
    context.createRadialGradient(
      treeX,
      treeY,
      0,
      treeX,
      treeY,
      glowRadius
    );

  treeGradient.addColorStop(
    0,
    "rgba(255, 250, 184, 0.5)"
  );

  treeGradient.addColorStop(
    0.22,
    "rgba(203, 255, 168, 0.28)"
  );

  treeGradient.addColorStop(
    0.58,
    "rgba(144, 225, 190, 0.1)"
  );

  treeGradient.addColorStop(
    1,
    "rgba(120, 220, 180, 0)"
  );

  context.save();
  context.globalCompositeOperation = "screen";
  context.fillStyle = treeGradient;

  context.beginPath();

  context.arc(
    treeX,
    treeY,
    glowRadius,
    0,
    Math.PI * 2
  );

  context.fill();

  for (const particle of lightParticles) {
    particle.phase += particle.speed;

    const particlePulse =
      0.3 +
      Math.abs(Math.sin(particle.phase)) * 0.7;

    const distanceFromTree =
      Math.hypot(
        particle.x - treeX,
        particle.y - treeY
      );

    if (distanceFromTree > glowRadius * 1.25) {
      continue;
    }

    particle.y -= 0.08;

    if (particle.y < treeY - glowRadius * 0.85) {
      particle.y =
        treeY + randomBetween(0, glowRadius * 0.7);

      particle.x =
        treeX +
        randomBetween(
          -glowRadius * 0.65,
          glowRadius * 0.65
        );
    }

    context.fillStyle =
      `rgba(255, 246, 169, ${
        particle.opacity * particlePulse
      })`;

    context.shadowColor =
      "rgba(255, 245, 170, 0.95)";

    context.shadowBlur = 9;

    context.beginPath();

    context.arc(
      particle.x,
      particle.y,
      particle.radius,
      0,
      Math.PI * 2
    );

    context.fill();
  }

  context.restore();
}

/* ---------------------------------------------------------
   STORY TRANSITION
--------------------------------------------------------- */

function playStoryTransition() {
  worldCard.classList.remove("story-change");
  storyPanel.classList.remove("story-change");

  void worldCard.offsetWidth;

  worldCard.classList.add("story-change");
  storyPanel.classList.add("story-change");
}

/* ---------------------------------------------------------
   VISUAL STATE
--------------------------------------------------------- */

function renderVisualState() {
  const percentage =
    (currentLayer / TOTAL_LAYERS) * 100;

  layerSlider.value = String(currentLayer);
  layerNumber.textContent = String(currentLayer);

  percentText.textContent =
    `${percentage.toFixed(1)}%`;

  previousButton.disabled =
    currentLayer <= 1;

  nextButton.disabled =
    currentLayer >= TOTAL_LAYERS;

  if (stories[currentLayer]) {
    storyTitle.textContent =
      stories[currentLayer].title;

    storyDescription.textContent =
      stories[currentLayer].description;
  } else {
    storyTitle.textContent =
      `Layer ${currentLayer}`;

    storyDescription.textContent =
      "The next story will be added in the next build.";
  }

  let brightness = 0.42;
  let saturation = 0.55;
  let blur = 9;
  let contrast = 1.08;
  let overlayOpacity = 0.78;

  if (currentLayer === 2) {
    brightness = 0.5;
    saturation = 0.62;
    blur = 8;
    overlayOpacity = 0.66;
  }

  if (currentLayer === 3) {
    brightness = 0.59;
    saturation = 0.7;
    blur = 7;
    overlayOpacity = 0.54;
  }

  if (currentLayer === 4) {
    brightness = 0.68;
    saturation = 0.78;
    blur = 6;
    overlayOpacity = 0.42;
  }

  if (currentLayer === 5) {
    brightness = 0.82;
    saturation = 0.9;
    blur = 4;
    overlayOpacity = 0.23;
  }

  if (currentLayer === 6) {
    brightness = 0.96;
    saturation = 1.04;
    blur = 2;
    overlayOpacity = 0.1;
  }

  if (currentLayer === 7) {
    brightness = 0.99;
    saturation = 1.07;
    blur = 1.8;
    overlayOpacity = 0.08;
  }

  if (currentLayer === 8) {
    brightness = 1.01;
    saturation = 1.1;
    blur = 1.5;
    overlayOpacity = 0.06;
  }

  if (currentLayer === 9) {
    brightness = 1.03;
    saturation = 1.13;
    blur = 1.2;
    overlayOpacity = 0.05;
  }

  if (currentLayer === 10) {
    brightness = 1.05;
    saturation = 1.16;
    blur = 0.9;
    overlayOpacity = 0.04;
  }

  if (currentLayer === 11) {
    brightness = 1.07;
    saturation = 1.18;
    blur = 0.6;
    overlayOpacity = 0.03;
  }

  if (currentLayer >= 12) {
    brightness = 1.1;
    saturation = 1.22;
    blur = 0;
    contrast = 1.04;
    overlayOpacity = 0;
  }

  worldImage.style.filter = `
    blur(${blur}px)
    brightness(${brightness})
    saturate(${saturation})
    contrast(${contrast})
  `;

  darkOverlay.style.opacity =
    String(overlayOpacity);

  sunLight.classList.toggle(
    "is-visible",
    currentLayer >= 5
  );

  rainbow.classList.toggle(
    "is-visible",
    currentLayer >= 6
  );

  if (currentLayer !== previousLayer) {
    playStoryTransition();
  }

  previousLayer = currentLayer;
}

/* ---------------------------------------------------------
   SET LAYER
--------------------------------------------------------- */

function setLayer(layer) {
  currentLayer = clamp(
    Math.round(Number(layer) || 1),
    1,
    TOTAL_LAYERS
  );

  renderVisualState();
}

/* ---------------------------------------------------------
   MAIN ANIMATION LOOP
--------------------------------------------------------- */

function animate() {
  animationTime += 1;

  context.clearRect(
    0,
    0,
    getCanvasWidth(),
    getCanvasHeight()
  );

  drawClouds();
  drawRain();

  triggerLightning();
  drawLightningFlash();
  drawLightningBolt();

  drawTreeGlow();
   drawFireflies();
  drawWaterfallGlow();
  drawLeaves();
  drawFirstFlower();
  drawButterflies();
  drawBirds();

  drawLayer14Fireflies();
  drawLayer15Fish();
  drawLayer16Flowers();
  drawLayer17Animals();
  drawLayer18Seeds();
  drawLayer19Trees();
  drawLayer20Atmosphere();

  requestAnimationFrame(animate);
}

/* ---------------------------------------------------------
   CONTROLS
--------------------------------------------------------- */

nextButton.addEventListener("click", function () {
  setLayer(currentLayer + 1);
});

previousButton.addEventListener("click", function () {
  setLayer(currentLayer - 1);
});

resetButton.addEventListener("click", function () {
  setLayer(1);
});

layerSlider.addEventListener("input", function () {
  setLayer(layerSlider.value);
});

window.addEventListener("resize", function () {
  resizeCanvas();
});

/* ---------------------------------------------------------
   START
--------------------------------------------------------- */

resizeCanvas();
setLayer(1);
requestAnimationFrame(animate);
/* =========================================================
   LAYER 13 — FIREFLIES
========================================================= */

function createFireflies() {
  fireflies.length = 0;

  for (let i = 0; i < 45; i += 1) {
    fireflies.push({
      x: randomBetween(getCanvasWidth() * 0.15, getCanvasWidth() * 0.85),
      y: randomBetween(getCanvasHeight() * 0.25, getCanvasHeight() * 0.85),
      radius: randomBetween(1.5, 3.5),
      phase: randomBetween(0, Math.PI * 2),
      speed: randomBetween(0.01, 0.03),
      driftX: randomBetween(-0.3, 0.3),
      driftY: randomBetween(-0.2, 0.2)
    });
  }
}

function drawFireflies() {
  if (currentLayer < 13) {
    return;
  }

  context.save();

  for (const firefly of fireflies) {
    firefly.phase += firefly.speed;

    firefly.x += firefly.driftX;
    firefly.y += firefly.driftY;

    firefly.x += Math.sin(firefly.phase) * 0.35;
    firefly.y += Math.cos(firefly.phase) * 0.25;

    if (firefly.x < 0) firefly.x = getCanvasWidth();
    if (firefly.x > getCanvasWidth()) firefly.x = 0;
    if (firefly.y < 0) firefly.y = getCanvasHeight();
    if (firefly.y > getCanvasHeight()) firefly.y = 0;

    const alpha =
      0.25 + Math.abs(Math.sin(firefly.phase)) * 0.75;

    context.shadowColor = "rgba(255,245,170,1)";
    context.shadowBlur = 15;

    context.fillStyle =
  "rgba(255,245,170," + alpha + ")";

    context.beginPath();
    context.arc(
      firefly.x,
      firefly.y,
      firefly.radius,
      0,
      Math.PI * 2
    );
    context.fill();
  }

  context.restore();
}
// ============================================================
// Layer 14 — ホタルが現れる
// ============================================================

const layer14Fireflies = [];

function createLayer14Fireflies() {
    layer14Fireflies.length = 0;

    const fireflyCount = Math.max(
        12,
        Math.floor(getCanvasWidth() / 90)
    );

    for (let i = 0; i < fireflyCount; i++) {
        const x = Math.random() * getCanvasWidth();
        const y =
            getCanvasHeight() * 0.35 +
            Math.random() * getCanvasHeight() * 0.55;

        layer14Fireflies.push({
            x,
            y,
            baseX: x,
            baseY: y,

            radius: 1.4 + Math.random() * 1.8,

            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.018 + Math.random() * 0.025,

            driftPhase: Math.random() * Math.PI * 2,
            driftSpeed: 0.002 + Math.random() * 0.004,

            horizontalRange: 14 + Math.random() * 28,
            verticalRange: 8 + Math.random() * 18,

            directionX: Math.random() < 0.5 ? -1 : 1,

            wingPhase: Math.random() * Math.PI * 2,
            wingSpeed: 0.12 + Math.random() * 0.08,

            opacity: 0,
            targetOpacity: 0.45 + Math.random() * 0.5,

            delay: Math.floor(Math.random() * 40),
            age: 0
        });
    }
}

function drawLayer14Fireflies() {
    if (currentLayer < 14) {
        return;
    }

    context.save();

    for (const firefly of layer14Fireflies) {
        firefly.age += 1;

        if (firefly.age < firefly.delay) {
            continue;
        }

        firefly.pulsePhase += firefly.pulseSpeed;
        firefly.driftPhase += firefly.driftSpeed;
        firefly.wingPhase += firefly.wingSpeed;

        firefly.baseX += 0.035 * firefly.directionX;

        if (firefly.baseX < -40) {
            firefly.baseX = -40;
            firefly.directionX = 1;
        }

        if (firefly.baseX > getCanvasWidth() + 40) {
            firefly.baseX = getCanvasWidth() + 40;
            firefly.directionX = -1;
        }

        firefly.x =
            firefly.baseX +
            Math.sin(firefly.driftPhase * 2.1) *
                firefly.horizontalRange;

        firefly.y =
            firefly.baseY +
            Math.cos(firefly.driftPhase * 1.6) *
                firefly.verticalRange +
            Math.sin(firefly.pulsePhase * 0.7) * 3;

        if (firefly.opacity < firefly.targetOpacity) {
            firefly.opacity = Math.min(
                firefly.targetOpacity,
                firefly.opacity + 0.03
            );
        }

        const pulse =
            0.35 +
            ((Math.sin(firefly.pulsePhase) + 1) / 2) * 0.65;

        const glowOpacity = firefly.opacity * pulse;

        const wingOpen =
            0.5 +
            Math.abs(Math.sin(firefly.wingPhase)) * 0.8;

        context.save();
        context.translate(firefly.x, firefly.y);

        // 左の羽
        context.shadowBlur = 0;
        context.fillStyle =
            `rgba(225,240,210,${0.16 * firefly.opacity})`;

        context.beginPath();
        context.ellipse(
            -firefly.radius * 1.25,
            -firefly.radius * 0.25,
            firefly.radius * 1.45,
            firefly.radius * 0.55 * wingOpen,
            -0.45,
            0,
            Math.PI * 2
        );
        context.fill();

        // 右の羽
        context.beginPath();
        context.ellipse(
            firefly.radius * 1.25,
            -firefly.radius * 0.25,
            firefly.radius * 1.45,
            firefly.radius * 0.55 * wingOpen,
            0.45,
            0,
            Math.PI * 2
        );
        context.fill();

        // 胴体
        context.fillStyle =
            `rgba(45,38,24,${0.72 * firefly.opacity})`;

        context.beginPath();
        context.ellipse(
            0,
            0,
            firefly.radius * 0.65,
            firefly.radius * 1.45,
            0,
            0,
            Math.PI * 2
        );
        context.fill();

        // 発光
        const glowY = firefly.radius * 0.85;

        const glowGradient = context.createRadialGradient(
            0,
            glowY,
            0,
            0,
            glowY,
            firefly.radius * 7
        );

        glowGradient.addColorStop(
            0,
            `rgba(255,255,185,${glowOpacity})`
        );

        glowGradient.addColorStop(
            0.25,
            `rgba(235,255,125,${glowOpacity * 0.65})`
        );

        glowGradient.addColorStop(
            0.6,
            `rgba(190,245,75,${glowOpacity * 0.22})`
        );

        glowGradient.addColorStop(
            1,
            "rgba(170,230,60,0)"
        );

        context.fillStyle = glowGradient;

        context.beginPath();
        context.arc(
            0,
            glowY,
            firefly.radius * 7,
            0,
            Math.PI * 2
        );
        context.fill();

        // 発光部分の中心
        context.shadowColor = "rgba(245,255,145,1)";
        context.shadowBlur = 10 + pulse * 16;

        context.fillStyle =
            `rgba(255,255,185,${Math.min(
                1,
                glowOpacity + 0.25
            )})`;

        context.beginPath();
        context.arc(
            0,
            glowY,
            firefly.radius,
            0,
            Math.PI * 2
        );
        context.fill();

        context.restore();
    }

    context.restore();
}

// Layer 14のデータを作成
createLayer14Fireflies();
// ============================================================
// Layer 15 — 小川に魚が泳ぎ始める
// ============================================================

const layer15Fish = [];

function createLayer15Fish() {
    layer15Fish.length = 0;

    const fishCount = Math.max(
        7,
        Math.floor(getCanvasWidth() / 170)
    );

    for (let i = 0; i < fishCount; i++) {
        const direction = Math.random() < 0.5 ? -1 : 1;

        const baseY =
            getCanvasHeight() * 0.68 +
            Math.random() * getCanvasHeight() * 0.18;

        const size = 5 + Math.random() * 7;

        layer15Fish.push({
            x: Math.random() * getCanvasWidth(),
            y: baseY,
            baseY,

            size,
            direction,

            speed: 0.18 + Math.random() * 0.32,

            swimPhase: Math.random() * Math.PI * 2,
            swimSpeed: 0.035 + Math.random() * 0.035,

            tailPhase: Math.random() * Math.PI * 2,
            tailSpeed: 0.12 + Math.random() * 0.08,

            verticalRange: 2 + Math.random() * 5,

            opacity: 0,
            targetOpacity: 0.35 + Math.random() * 0.4,

            delay: Math.floor(Math.random() * 40),

            colorType: Math.floor(Math.random() * 4),

            age: 0
        });
    }
}

function drawLayer15Fish() {
    if (currentLayer < 15) {
        return;
    }

    context.save();

    for (const fish of layer15Fish) {
        fish.age += 1;

        if (fish.age < fish.delay) {
            continue;
        }

        fish.swimPhase += fish.swimSpeed;
        fish.tailPhase += fish.tailSpeed;

        fish.x += fish.speed * fish.direction;

        fish.y =
            fish.baseY +
            Math.sin(fish.swimPhase) * fish.verticalRange;

        if (fish.direction === 1 && fish.x > getCanvasWidth() + 40) {
            fish.x = -40;
            fish.baseY =
                getCanvasHeight() * 0.68 +
                Math.random() * getCanvasHeight() * 0.18;
        }

        if (fish.direction === -1 && fish.x < -40) {
            fish.x = getCanvasWidth() + 40;
            fish.baseY =
                getCanvasHeight() * 0.68 +
                Math.random() * getCanvasHeight() * 0.18;
        }

        if (fish.opacity < fish.targetOpacity) {
            fish.opacity = Math.min(
                fish.targetOpacity,
                fish.opacity + 0.02
            );
        }

        const tailMovement =
            Math.sin(fish.tailPhase) * fish.size * 0.35;

        const bodyScale =
            1 + Math.sin(fish.swimPhase * 1.5) * 0.03;

        context.save();

        context.translate(fish.x, fish.y);
        context.scale(fish.direction, 1);
        context.scale(bodyScale, 1);

        let bodyColor;
        let highlightColor;
        let finColor;

        if (fish.colorType === 0) {
            bodyColor = `rgba(95,145,120,${fish.opacity})`;
            highlightColor = `rgba(185,220,165,${fish.opacity * 0.65})`;
            finColor = `rgba(65,110,90,${fish.opacity * 0.8})`;
        } else if (fish.colorType === 1) {
            bodyColor = `rgba(130,125,85,${fish.opacity})`;
            highlightColor = `rgba(220,205,140,${fish.opacity * 0.65})`;
            finColor = `rgba(95,90,60,${fish.opacity * 0.8})`;
        } else if (fish.colorType === 2) {
            bodyColor = `rgba(90,125,150,${fish.opacity})`;
            highlightColor = `rgba(175,210,225,${fish.opacity * 0.65})`;
            finColor = `rgba(60,90,115,${fish.opacity * 0.8})`;
        } else {
            bodyColor = `rgba(145,105,80,${fish.opacity})`;
            highlightColor = `rgba(225,180,135,${fish.opacity * 0.65})`;
            finColor = `rgba(110,75,55,${fish.opacity * 0.8})`;
        }

        // 魚の影
        context.fillStyle =
            `rgba(20,45,45,${fish.opacity * 0.12})`;

        context.beginPath();
        context.ellipse(
            0,
            fish.size * 1.2,
            fish.size * 1.8,
            fish.size * 0.42,
            0,
            0,
            Math.PI * 2
        );
        context.fill();

        // 尾びれ
        context.fillStyle = finColor;

        context.beginPath();
        context.moveTo(-fish.size * 1.2, 0);
        context.lineTo(
            -fish.size * 2.15,
            -fish.size * 0.8 + tailMovement
        );
        context.lineTo(
            -fish.size * 1.9,
            tailMovement
        );
        context.lineTo(
            -fish.size * 2.15,
            fish.size * 0.8 + tailMovement
        );
        context.closePath();
        context.fill();

        // 胴体
        const bodyGradient = context.createLinearGradient(
            -fish.size,
            -fish.size,
            fish.size * 1.4,
            fish.size
        );

        bodyGradient.addColorStop(0, bodyColor);
        bodyGradient.addColorStop(0.55, highlightColor);
        bodyGradient.addColorStop(1, bodyColor);

        context.fillStyle = bodyGradient;

        context.beginPath();
        context.moveTo(-fish.size * 1.15, 0);

        context.bezierCurveTo(
            -fish.size * 0.55,
            -fish.size * 0.75,
            fish.size * 0.55,
            -fish.size * 0.7,
            fish.size * 1.25,
            -fish.size * 0.12
        );

        context.bezierCurveTo(
            fish.size * 1.42,
            0,
            fish.size * 1.3,
            fish.size * 0.22,
            fish.size * 1.05,
            fish.size * 0.35
        );

        context.bezierCurveTo(
            fish.size * 0.2,
            fish.size * 0.85,
            -fish.size * 0.65,
            fish.size * 0.7,
            -fish.size * 1.15,
            0
        );

        context.closePath();
        context.fill();

        // 上びれ
        context.fillStyle = finColor;

        context.beginPath();
        context.moveTo(-fish.size * 0.25, -fish.size * 0.55);
        context.quadraticCurveTo(
            fish.size * 0.1,
            -fish.size * 1.15,
            fish.size * 0.5,
            -fish.size * 0.5
        );
        context.closePath();
        context.fill();

        // 横びれ
        context.fillStyle =
            `rgba(210,225,185,${fish.opacity * 0.38})`;

        context.beginPath();
        context.moveTo(fish.size * 0.05, fish.size * 0.1);
        context.quadraticCurveTo(
            fish.size * 0.4,
            fish.size * 0.85,
            fish.size * 0.75,
            fish.size * 0.3
        );
        context.quadraticCurveTo(
            fish.size * 0.35,
            fish.size * 0.25,
            fish.size * 0.05,
            fish.size * 0.1
        );
        context.fill();

        // エラ
        context.strokeStyle =
            `rgba(40,65,60,${fish.opacity * 0.45})`;

        context.lineWidth = Math.max(0.5, fish.size * 0.08);

        context.beginPath();
        context.arc(
            fish.size * 0.72,
            0,
            fish.size * 0.32,
            Math.PI * 0.55,
            Math.PI * 1.45
        );
        context.stroke();

        // 目
        context.fillStyle =
            `rgba(20,25,20,${fish.opacity * 0.9})`;

        context.beginPath();
        context.arc(
            fish.size * 0.92,
            -fish.size * 0.18,
            Math.max(0.65, fish.size * 0.09),
            0,
            Math.PI * 2
        );
        context.fill();

        // 目の反射
        context.fillStyle =
            `rgba(245,250,225,${fish.opacity * 0.75})`;

        context.beginPath();
        context.arc(
            fish.size * 0.95,
            -fish.size * 0.22,
            Math.max(0.22, fish.size * 0.03),
            0,
            Math.PI * 2
        );
        context.fill();

        // 水面下の柔らかな光
        const waterGlow = context.createRadialGradient(
            0,
            0,
            0,
            0,
            0,
            fish.size * 3.2
        );

        waterGlow.addColorStop(
            0,
            `rgba(190,225,210,${fish.opacity * 0.08})`
        );

        waterGlow.addColorStop(
            1,
            "rgba(190,225,210,0)"
        );

        context.globalCompositeOperation = "screen";
        context.fillStyle = waterGlow;

        context.beginPath();
        context.arc(
            0,
            0,
            fish.size * 3.2,
            0,
            Math.PI * 2
        );
        context.fill();

        context.restore();
    }

    context.restore();
}

// Layer 15のデータを作成
createLayer15Fish();
// ============================================================
// Layer 16 — 花畑が広がる
// ============================================================

const layer16Flowers = [];

function createLayer16Flowers() {
    layer16Flowers.length = 0;

    const canvasWidth = getCanvasWidth();
    const canvasHeight = getCanvasHeight();

    const flowerCount = Math.max(
        90,
        Math.floor(canvasWidth / 7)
    );

    const flowerColors = [
        {
            petal: [255, 220, 225],
            center: [238, 190, 72]
        },
        {
            petal: [232, 218, 255],
            center: [225, 178, 70]
        },
        {
            petal: [255, 245, 205],
            center: [220, 165, 55]
        },
        {
            petal: [215, 235, 255],
            center: [235, 190, 72]
        },
        {
            petal: [255, 205, 180],
            center: [225, 170, 55]
        },
        {
            petal: [245, 245, 238],
            center: [232, 185, 65]
        }
    ];

    for (let i = 0; i < flowerCount; i++) {
        const depth = Math.random();

        const baseY =
            canvasHeight * 0.62 +
            depth * canvasHeight * 0.34;

        const size =
            1.8 +
            depth * 4.6 +
            Math.random() * 2.2;

        const stemHeight =
            size * (2.4 + Math.random() * 2.8);

        const color =
            flowerColors[
                Math.floor(Math.random() * flowerColors.length)
            ];

        layer16Flowers.push({
            x: Math.random() * canvasWidth,
            baseY,

            size,
            stemHeight,

            depth,

            petalCount:
                5 + Math.floor(Math.random() * 4),

            petalLength:
                size * (0.85 + Math.random() * 0.45),

            petalWidth:
                size * (0.42 + Math.random() * 0.25),

            petalRotation:
                Math.random() * Math.PI * 2,

            headTilt:
                -0.18 + Math.random() * 0.36,

            windPhase:
                Math.random() * Math.PI * 2,

            windSpeed:
                0.008 + Math.random() * 0.012,

            windAmount:
                0.8 + depth * 2.6,

            bloom:
                0,

            bloomSpeed:
                0.02 + Math.random() * 0.02,

            delay:
                Math.floor(
                    Math.random() * 40
                ),

            opacity:
                0,

            targetOpacity:
                0.45 + depth * 0.45,

            petalColor: color.petal,
            centerColor: color.center,

            leafSide:
                Math.random() < 0.5 ? -1 : 1,

            leafPosition:
                0.35 + Math.random() * 0.35,

            age: 0
        });
    }

    layer16Flowers.sort(
        (flowerA, flowerB) =>
            flowerA.baseY - flowerB.baseY
    );
}

function drawLayer16Flowers() {
    if (currentLayer < 16) {
        return;
    }

    context.save();

    for (const flower of layer16Flowers) {
        flower.age += 1;

        if (flower.age < flower.delay) {
            continue;
        }

        flower.windPhase += flower.windSpeed;

        if (flower.bloom < 1) {
            flower.bloom = Math.min(
                1,
                flower.bloom + flower.bloomSpeed
            );
        }

        if (flower.opacity < flower.targetOpacity) {
            flower.opacity = Math.min(
                flower.targetOpacity,
                flower.opacity + 0.02
            );
        }

        const bloomEase =
            1 -
            Math.pow(
                1 - flower.bloom,
                3
            );

        const wind =
            Math.sin(flower.windPhase) *
            flower.windAmount;

        const stemTopX =
            flower.x + wind;

        const stemTopY =
            flower.baseY -
            flower.stemHeight * bloomEase;

        const stemControlX =
            flower.x + wind * 0.35;

        const stemControlY =
            flower.baseY -
            flower.stemHeight * 0.55 *
                bloomEase;

        const stemOpacity =
            flower.opacity *
            (0.45 + flower.depth * 0.4);

        context.save();

        context.lineCap = "round";
        context.lineJoin = "round";

        // 茎
        context.strokeStyle =
            `rgba(55,112,62,${stemOpacity})`;

        context.lineWidth =
            Math.max(
                0.65,
                flower.size * 0.16
            );

        context.beginPath();
        context.moveTo(
            flower.x,
            flower.baseY
        );

        context.quadraticCurveTo(
            stemControlX,
            stemControlY,
            stemTopX,
            stemTopY
        );

        context.stroke();

        // 葉
        const leafT =
            flower.leafPosition;

        const leafX =
            flower.x +
            wind * leafT * 0.55;

        const leafY =
            flower.baseY -
            flower.stemHeight *
                leafT *
                bloomEase;

        const leafLength =
            flower.size *
            (1.1 + flower.depth * 0.7) *
            bloomEase;

        const leafWidth =
            flower.size *
            0.42 *
            bloomEase;

        context.save();
        context.translate(
            leafX,
            leafY
        );

        context.rotate(
            flower.leafSide *
            (
                0.55 +
                Math.sin(
                    flower.windPhase + 1.2
                ) * 0.08
            )
        );

        context.fillStyle =
            `rgba(67,132,72,${stemOpacity * 0.86})`;

        context.beginPath();
        context.moveTo(0, 0);

        context.quadraticCurveTo(
            flower.leafSide * leafLength * 0.52,
            -leafWidth,
            flower.leafSide * leafLength,
            0
        );

        context.quadraticCurveTo(
            flower.leafSide * leafLength * 0.5,
            leafWidth,
            0,
            0
        );

        context.fill();
        context.restore();

        // 花の頭
        context.save();
        context.translate(
            stemTopX,
            stemTopY
        );

        context.rotate(
            flower.headTilt +
            wind * 0.006
        );

        context.scale(
            bloomEase,
            bloomEase
        );

        const petalR =
            flower.petalColor[0];

        const petalG =
            flower.petalColor[1];

        const petalB =
            flower.petalColor[2];

        // 花の柔らかな光
        const flowerGlow =
            context.createRadialGradient(
                0,
                0,
                0,
                0,
                0,
                flower.size * 3.5
            );

        flowerGlow.addColorStop(
            0,
            `rgba(${petalR},${petalG},${petalB},${flower.opacity * 0.13})`
        );

        flowerGlow.addColorStop(
            1,
            `rgba(${petalR},${petalG},${petalB},0)`
        );

        context.fillStyle =
            flowerGlow;

        context.beginPath();
        context.arc(
            0,
            0,
            flower.size * 3.5,
            0,
            Math.PI * 2
        );
        context.fill();

        // 花びら
        for (
            let petalIndex = 0;
            petalIndex < flower.petalCount;
            petalIndex++
        ) {
            const petalAngle =
                flower.petalRotation +
                (
                    Math.PI * 2 *
                    petalIndex
                ) /
                    flower.petalCount;

            context.save();
            context.rotate(
                petalAngle
            );

            const petalGradient =
                context.createLinearGradient(
                    0,
                    0,
                    0,
                    -flower.petalLength
                );

            petalGradient.addColorStop(
                0,
                `rgba(${petalR},${petalG},${petalB},${flower.opacity * 0.7})`
            );

            petalGradient.addColorStop(
                1,
                `rgba(255,255,255,${flower.opacity * 0.92})`
            );

            context.fillStyle =
                petalGradient;

            context.beginPath();
            context.moveTo(0, 0);

            context.bezierCurveTo(
                -flower.petalWidth,
                -flower.petalLength * 0.28,
                -flower.petalWidth * 0.7,
                -flower.petalLength * 0.82,
                0,
                -flower.petalLength
            );

            context.bezierCurveTo(
                flower.petalWidth * 0.7,
                -flower.petalLength * 0.82,
                flower.petalWidth,
                -flower.petalLength * 0.28,
                0,
                0
            );

            context.closePath();
            context.fill();

            context.restore();
        }

        // 花の中心
        const centerR =
            flower.centerColor[0];

        const centerG =
            flower.centerColor[1];

        const centerB =
            flower.centerColor[2];

        const centerGradient =
            context.createRadialGradient(
                -flower.size * 0.12,
                -flower.size * 0.12,
                0,
                0,
                0,
                flower.size * 0.72
            );

        centerGradient.addColorStop(
            0,
            `rgba(255,240,145,${flower.opacity})`
        );

        centerGradient.addColorStop(
            0.55,
            `rgba(${centerR},${centerG},${centerB},${flower.opacity * 0.95})`
        );

        centerGradient.addColorStop(
            1,
            `rgba(135,95,35,${flower.opacity * 0.8})`
        );

        context.fillStyle =
            centerGradient;

        context.beginPath();
        context.arc(
            0,
            0,
            flower.size * 0.68,
            0,
            Math.PI * 2
        );
        context.fill();

        // 中心の小さな花粉
        const pollenCount =
            flower.depth > 0.45 ? 5 : 3;

        for (
            let pollenIndex = 0;
            pollenIndex < pollenCount;
            pollenIndex++
        ) {
            const pollenAngle =
                (
                    Math.PI * 2 *
                    pollenIndex
                ) /
                    pollenCount +
                flower.petalRotation;

            const pollenDistance =
                flower.size * 0.31;

            context.fillStyle =
                `rgba(255,235,130,${flower.opacity * 0.72})`;

            context.beginPath();
            context.arc(
                Math.cos(pollenAngle) *
                    pollenDistance,
                Math.sin(pollenAngle) *
                    pollenDistance,
                Math.max(
                    0.35,
                    flower.size * 0.07
                ),
                0,
                Math.PI * 2
            );
            context.fill();
        }

        context.restore();
        context.restore();
    }

    context.restore();
}

// Layer 16のデータを作成
createLayer16Flowers();
// ============================================================
// Layer 17 — 森の動物が姿を見せる
// ============================================================

const layer17Animals = [];

function createLayer17Animals() {
    layer17Animals.length = 0;

    const canvasWidth = getCanvasWidth();
    const canvasHeight = getCanvasHeight();

    const deerCount = Math.max(
        2,
        Math.floor(canvasWidth / 520)
    );

    const rabbitCount = Math.max(
        4,
        Math.floor(canvasWidth / 260)
    );

    for (let i = 0; i < deerCount; i++) {
        const direction =
            Math.random() < 0.5 ? -1 : 1;

        const depth =
            0.35 + Math.random() * 0.55;

        const size =
            18 + depth * 19;

        const baseY =
            canvasHeight * 0.66 +
            depth * canvasHeight * 0.25;

        const x =
            canvasWidth *
                (
                    0.12 +
                    Math.random() * 0.76
                );

        layer17Animals.push({
            type: "deer",

            x,
            baseX: x,

            y: baseY,
            baseY,

            size,
            depth,
            direction,

            age: 0,

            delay:
                Math.floor(
                    Math.random() * 40
                ),

            opacity: 0,

            targetOpacity:
                0.42 + depth * 0.38,

            appearSpeed:
                0.02 + Math.random() * 0.02,

            breathPhase:
                Math.random() * Math.PI * 2,

            breathSpeed:
                0.012 +
                Math.random() * 0.008,

            earPhase:
                Math.random() * Math.PI * 2,

            earSpeed:
                0.018 +
                Math.random() * 0.018,

            headPhase:
                Math.random() * Math.PI * 2,

            headSpeed:
                0.004 +
                Math.random() * 0.005,

            blinkTimer:
                Math.floor(
                    90 +
                    Math.random() * 180
                ),

            blinkDuration: 0,

            stepPhase:
                Math.random() * Math.PI * 2,

            stepSpeed:
                0.006 +
                Math.random() * 0.007,

            wanderRange:
                8 + Math.random() * 18,

            bodyColor:
                Math.random() < 0.5
                    ? [126, 91, 59]
                    : [142, 103, 67],

            hasAntlers:
                Math.random() < 0.45
        });
    }

    for (let i = 0; i < rabbitCount; i++) {
        const direction =
            Math.random() < 0.5 ? -1 : 1;

        const depth =
            0.4 + Math.random() * 0.55;

        const size =
            7 + depth * 9;

        const baseY =
            canvasHeight * 0.68 +
            depth * canvasHeight * 0.25;

        const x =
            canvasWidth *
                (
                    0.08 +
                    Math.random() * 0.84
                );

        const rabbitColors = [
            [150, 137, 117],
            [179, 164, 142],
            [118, 108, 95],
            [196, 187, 168]
        ];

        layer17Animals.push({
            type: "rabbit",

            x,
            baseX: x,

            y: baseY,
            baseY,

            size,
            depth,
            direction,

            age: 0,

            delay:
                Math.floor(
                    Math.random() * 40
                ),

            opacity: 0,

            targetOpacity:
                0.45 + depth * 0.42,

            appearSpeed:
                0.02 + Math.random() * 0.02,

            breathPhase:
                Math.random() * Math.PI * 2,

            breathSpeed:
                0.016 +
                Math.random() * 0.012,

            earPhase:
                Math.random() * Math.PI * 2,

            earSpeed:
                0.014 +
                Math.random() * 0.02,

            hopPhase:
                Math.random() * Math.PI * 2,

            hopSpeed:
                0.004 +
                Math.random() * 0.006,

            wanderRange:
                5 + Math.random() * 14,

            blinkTimer:
                Math.floor(
                    80 +
                    Math.random() * 170
                ),

            blinkDuration: 0,

            bodyColor:
                rabbitColors[
                    Math.floor(
                        Math.random() *
                            rabbitColors.length
                    )
                ]
        });
    }

    layer17Animals.sort(
        (animalA, animalB) =>
            animalA.baseY - animalB.baseY
    );
}

function updateLayer17AnimalBlink(animal) {
    animal.blinkTimer -= 1;

    if (
        animal.blinkTimer <= 0 &&
        animal.blinkDuration <= 0
    ) {
        animal.blinkDuration = 8;

        animal.blinkTimer =
            Math.floor(
                120 +
                Math.random() * 220
            );
    }

    if (animal.blinkDuration > 0) {
        animal.blinkDuration -= 1;
    }
}

function drawLayer17Animals() {
    if (currentLayer < 17) {
        return;
    }

    context.save();

    for (const animal of layer17Animals) {
        animal.age += 1;

        if (animal.age < animal.delay) {
            continue;
        }

        animal.breathPhase +=
            animal.breathSpeed;

        animal.earPhase +=
            animal.earSpeed;

        updateLayer17AnimalBlink(
            animal
        );

        if (
            animal.opacity <
            animal.targetOpacity
        ) {
            animal.opacity = Math.min(
                animal.targetOpacity,
                animal.opacity +
                    animal.appearSpeed
            );
        }

        if (animal.type === "deer") {
            animal.headPhase +=
                animal.headSpeed;

            animal.stepPhase +=
                animal.stepSpeed;

            animal.x =
                animal.baseX +
                Math.sin(
                    animal.stepPhase
                ) *
                    animal.wanderRange;

            animal.y =
                animal.baseY +
                Math.sin(
                    animal.stepPhase * 0.8
                ) *
                    0.8;

            drawLayer17Deer(animal);
        }

        if (animal.type === "rabbit") {
            animal.hopPhase +=
                animal.hopSpeed;

            animal.x =
                animal.baseX +
                Math.sin(
                    animal.hopPhase
                ) *
                    animal.wanderRange;

            const hopValue =
                Math.max(
                    0,
                    Math.sin(
                        animal.hopPhase * 1.7
                    )
                );

            animal.y =
                animal.baseY -
                hopValue *
                    animal.size *
                    0.16;

            drawLayer17Rabbit(animal);
        }
    }

    context.restore();
}

function drawLayer17Deer(deer) {
    const size = deer.size;

    const bodyR =
        deer.bodyColor[0];

    const bodyG =
        deer.bodyColor[1];

    const bodyB =
        deer.bodyColor[2];

    const breath =
        1 +
        Math.sin(
            deer.breathPhase
        ) *
            0.018;

    const headMovement =
        Math.sin(
            deer.headPhase
        ) *
            size *
            0.045;

    const earMovement =
        Math.sin(
            deer.earPhase
        ) *
            0.14;

    const eyeClosed =
        deer.blinkDuration > 0;

    context.save();

    context.translate(
        deer.x,
        deer.y
    );

    context.scale(
        deer.direction,
        1
    );

    context.scale(
        breath,
        1
    );

    const shadowGradient =
        context.createRadialGradient(
            0,
            size * 0.3,
            0,
            0,
            size * 0.3,
            size * 1.7
        );

    shadowGradient.addColorStop(
        0,
        `rgba(25,40,28,${deer.opacity * 0.18})`
    );

    shadowGradient.addColorStop(
        1,
        "rgba(25,40,28,0)"
    );

    context.fillStyle =
        shadowGradient;

    context.beginPath();
    context.ellipse(
        -size * 0.1,
        size * 0.32,
        size * 1.65,
        size * 0.34,
        0,
        0,
        Math.PI * 2
    );
    context.fill();

    context.strokeStyle =
        `rgba(74,55,39,${deer.opacity * 0.9})`;

    context.lineWidth =
        Math.max(
            1,
            size * 0.09
        );

    context.lineCap = "round";

    const legSwing =
        Math.sin(
            deer.stepPhase * 1.5
        ) *
            size *
            0.03;

    const legPositions = [
        {
            x: -size * 0.62,
            swing: legSwing
        },
        {
            x: -size * 0.34,
            swing: -legSwing
        },
        {
            x: size * 0.48,
            swing: -legSwing
        },
        {
            x: size * 0.7,
            swing: legSwing
        }
    ];

    for (
        const leg of legPositions
    ) {
        context.beginPath();

        context.moveTo(
            leg.x,
            size * 0.08
        );

        context.quadraticCurveTo(
            leg.x +
                leg.swing,
            size * 0.48,
            leg.x +
                leg.swing * 1.4,
            size * 0.95
        );

        context.stroke();

        context.beginPath();

        context.moveTo(
            leg.x +
                leg.swing * 1.4,
            size * 0.95
        );

        context.lineTo(
            leg.x +
                leg.swing * 1.4 +
                size * 0.1,
            size * 0.98
        );

        context.stroke();
    }

    const bodyGradient =
        context.createLinearGradient(
            -size,
            -size * 0.5,
            size,
            size * 0.5
        );

    bodyGradient.addColorStop(
        0,
        `rgba(${bodyR - 18},${bodyG - 14},${bodyB - 10},${deer.opacity})`
    );

    bodyGradient.addColorStop(
        0.45,
        `rgba(${bodyR + 18},${bodyG + 14},${bodyB + 10},${deer.opacity})`
    );

    bodyGradient.addColorStop(
        1,
        `rgba(${bodyR - 8},${bodyG - 8},${bodyB - 6},${deer.opacity})`
    );

    context.fillStyle =
        bodyGradient;

    context.beginPath();

    context.ellipse(
        -size * 0.05,
        -size * 0.18,
        size * 1.02,
        size * 0.57,
        -0.04,
        0,
        Math.PI * 2
    );

    context.fill();

    context.fillStyle =
        `rgba(${bodyR + 26},${bodyG + 22},${bodyB + 16},${deer.opacity * 0.76})`;

    context.beginPath();

    context.ellipse(
        -size * 0.1,
        size * 0.03,
        size * 0.7,
        size * 0.27,
        0,
        0,
        Math.PI * 2
    );

    context.fill();

    context.fillStyle =
        `rgba(${bodyR - 7},${bodyG - 6},${bodyB - 4},${deer.opacity})`;

    context.beginPath();

    context.moveTo(
        size * 0.56,
        -size * 0.28
    );

    context.quadraticCurveTo(
        size * 0.73,
        -size * 0.74,
        size * 0.92,
        -size * 1.08 +
            headMovement
    );

    context.lineTo(
        size * 1.28,
        -size * 0.96 +
            headMovement
    );

    context.quadraticCurveTo(
        size * 1.13,
        -size * 0.58,
        size * 0.82,
        -size * 0.14
    );

    context.closePath();
    context.fill();

    context.save();

    context.translate(
        size * 1.15,
        -size * 1.03 +
            headMovement
    );

    context.rotate(
        Math.sin(
            deer.headPhase
        ) *
            0.025
    );

    context.fillStyle =
        bodyGradient;

    context.beginPath();

    context.ellipse(
        0,
        0,
        size * 0.48,
        size * 0.34,
        -0.08,
        0,
        Math.PI * 2
    );

    context.fill();

    context.fillStyle =
        `rgba(${bodyR + 34},${bodyG + 28},${bodyB + 21},${deer.opacity * 0.82})`;

    context.beginPath();

    context.ellipse(
        size * 0.3,
        size * 0.07,
        size * 0.29,
        size * 0.19,
        0,
        0,
        Math.PI * 2
    );

    context.fill();

    context.save();

    context.translate(
        -size * 0.2,
        -size * 0.24
    );

    context.rotate(
        -0.55 +
            earMovement
    );

    context.fillStyle =
        `rgba(${bodyR - 9},${bodyG - 8},${bodyB - 5},${deer.opacity})`;

    context.beginPath();

    context.ellipse(
        0,
        -size * 0.22,
        size * 0.13,
        size * 0.34,
        0,
        0,
        Math.PI * 2
    );

    context.fill();

    context.fillStyle =
        `rgba(204,154,132,${deer.opacity * 0.55})`;

    context.beginPath();

    context.ellipse(
        0,
        -size * 0.22,
        size * 0.055,
        size * 0.23,
        0,
        0,
        Math.PI * 2
    );

    context.fill();

    context.restore();

    context.save();

    context.translate(
        size * 0.02,
        -size * 0.28
    );

    context.rotate(
        0.45 -
            earMovement
    );

    context.fillStyle =
        `rgba(${bodyR - 9},${bodyG - 8},${bodyB - 5},${deer.opacity})`;

    context.beginPath();

    context.ellipse(
        0,
        -size * 0.22,
        size * 0.13,
        size * 0.34,
        0,
        0,
        Math.PI * 2
    );

    context.fill();

    context.fillStyle =
        `rgba(204,154,132,${deer.opacity * 0.55})`;

    context.beginPath();

    context.ellipse(
        0,
        -size * 0.22,
        size * 0.055,
        size * 0.23,
        0,
        0,
        Math.PI * 2
    );

    context.fill();

    context.restore();

    if (deer.hasAntlers) {
        context.strokeStyle =
            `rgba(85,65,46,${deer.opacity * 0.82})`;

        context.lineWidth =
            Math.max(
                0.8,
                size * 0.045
            );

        context.lineCap =
            "round";

        const antlerBases = [
            -size * 0.12,
            size * 0.03
        ];

        for (
            const antlerBase of antlerBases
        ) {
            context.beginPath();

            context.moveTo(
                antlerBase,
                -size * 0.25
            );

            context.quadraticCurveTo(
                antlerBase -
                    size * 0.05,
                -size * 0.65,
                antlerBase -
                    size * 0.18,
                -size * 0.86
            );

            context.stroke();

            context.beginPath();

            context.moveTo(
                antlerBase -
                    size * 0.08,
                -size * 0.57
            );

            context.lineTo(
                antlerBase -
                    size * 0.27,
                -size * 0.7
            );

            context.stroke();

            context.beginPath();

            context.moveTo(
                antlerBase -
                    size * 0.13,
                -size * 0.73
            );

            context.lineTo(
                antlerBase -
                    size * 0.08,
                -size * 0.94
            );

            context.stroke();
        }
    }

    context.strokeStyle =
        `rgba(26,23,19,${deer.opacity * 0.92})`;

    context.fillStyle =
        `rgba(26,23,19,${deer.opacity * 0.92})`;

    if (eyeClosed) {
        context.lineWidth =
            Math.max(
                0.7,
                size * 0.035
            );

        context.beginPath();

        context.moveTo(
            size * 0.12,
            -size * 0.05
        );

        context.lineTo(
            size * 0.23,
            -size * 0.04
        );

        context.stroke();
    } else {
        context.beginPath();

        context.arc(
            size * 0.18,
            -size * 0.06,
            Math.max(
                0.8,
                size * 0.038
            ),
            0,
            Math.PI * 2
        );

        context.fill();

        context.fillStyle =
            `rgba(245,235,210,${deer.opacity * 0.75})`;

        context.beginPath();

        context.arc(
            size * 0.195,
            -size * 0.075,
            Math.max(
                0.22,
                size * 0.012
            ),
            0,
            Math.PI * 2
        );

        context.fill();
    }

    context.fillStyle =
        `rgba(44,35,29,${deer.opacity * 0.88})`;

    context.beginPath();

    context.ellipse(
        size * 0.55,
        size * 0.08,
        size * 0.095,
        size * 0.065,
        0,
        0,
        Math.PI * 2
    );

    context.fill();

    context.restore();

    context.fillStyle =
        `rgba(238,225,198,${deer.opacity * 0.72})`;

    context.beginPath();

    context.ellipse(
        -size * 1.02,
        -size * 0.24,
        size * 0.2,
        size * 0.17,
        -0.4,
        0,
        Math.PI * 2
    );

    context.fill();

    context.restore();
}

function drawLayer17Rabbit(rabbit) {
    const size =
        rabbit.size;

    const bodyR =
        rabbit.bodyColor[0];

    const bodyG =
        rabbit.bodyColor[1];

    const bodyB =
        rabbit.bodyColor[2];

    const breath =
        1 +
        Math.sin(
            rabbit.breathPhase
        ) *
            0.025;

    const earMovement =
        Math.sin(
            rabbit.earPhase
        ) *
            0.12;

    const eyeClosed =
        rabbit.blinkDuration > 0;

    context.save();

    context.translate(
        rabbit.x,
        rabbit.y
    );

    context.scale(
        rabbit.direction,
        1
    );

    const shadowGradient =
        context.createRadialGradient(
            0,
            size * 0.45,
            0,
            0,
            size * 0.45,
            size * 1.6
        );

    shadowGradient.addColorStop(
        0,
        `rgba(25,38,27,${rabbit.opacity * 0.17})`
    );

    shadowGradient.addColorStop(
        1,
        "rgba(25,38,27,0)"
    );

    context.fillStyle =
        shadowGradient;

    context.beginPath();

    context.ellipse(
        0,
        size * 0.45,
        size * 1.55,
        size * 0.33,
        0,
        0,
        Math.PI * 2
    );

    context.fill();

    context.scale(
        breath,
        1
    );

    context.fillStyle =
        `rgba(${bodyR - 12},${bodyG - 11},${bodyB - 10},${rabbit.opacity})`;

    context.beginPath();

    context.ellipse(
        -size * 0.25,
        0,
        size * 0.95,
        size * 0.62,
        -0.08,
        0,
        Math.PI * 2
    );

    context.fill();

    context.fillStyle =
        `rgba(${bodyR + 18},${bodyG + 17},${bodyB + 15},${rabbit.opacity * 0.82})`;

    context.beginPath();

    context.ellipse(
        -size * 0.08,
        size * 0.16,
        size * 0.63,
        size * 0.35,
        0,
        0,
        Math.PI * 2
    );

    context.fill();

    context.fillStyle =
        `rgba(${bodyR - 5},${bodyG - 5},${bodyB - 4},${rabbit.opacity})`;

    context.beginPath();

    context.ellipse(
        size * 0.58,
        -size * 0.32,
        size * 0.55,
        size * 0.48,
        -0.08,
        0,
        Math.PI * 2
    );

    context.fill();

    context.save();

    context.translate(
        size * 0.38,
        -size * 0.63
    );

    context.rotate(
        -0.22 +
            earMovement
    );

    context.fillStyle =
        `rgba(${bodyR - 8},${bodyG - 8},${bodyB - 7},${rabbit.opacity})`;

    context.beginPath();

    context.ellipse(
        0,
        -size * 0.58,
        size * 0.2,
        size * 0.72,
        -0.05,
        0,
        Math.PI * 2
    );

    context.fill();

    context.fillStyle =
        `rgba(215,164,158,${rabbit.opacity * 0.52})`;

    context.beginPath();

    context.ellipse(
        0,
        -size * 0.58,
        size * 0.08,
        size * 0.53,
        -0.05,
        0,
        Math.PI * 2
    );

    context.fill();

    context.restore();

    context.save();

    context.translate(
        size * 0.72,
        -size * 0.61
    );

    context.rotate(
        0.15 -
            earMovement * 0.75
    );

    context.fillStyle =
        `rgba(${bodyR - 8},${bodyG - 8},${bodyB - 7},${rabbit.opacity})`;

    context.beginPath();

    context.ellipse(
        0,
        -size * 0.54,
        size * 0.19,
        size * 0.68,
        0.04,
        0,
        Math.PI * 2
    );

    context.fill();

    context.fillStyle =
        `rgba(215,164,158,${rabbit.opacity * 0.52})`;

    context.beginPath();

    context.ellipse(
        0,
        -size * 0.54,
        size * 0.075,
        size * 0.49,
        0.04,
        0,
        Math.PI * 2
    );

    context.fill();

    context.restore();

    context.fillStyle =
        `rgba(239,232,214,${rabbit.opacity * 0.88})`;

    context.beginPath();

    context.arc(
        -size * 1.05,
        -size * 0.06,
        size * 0.29,
        0,
        Math.PI * 2
    );

    context.fill();

    context.fillStyle =
        `rgba(${bodyR - 20},${bodyG - 19},${bodyB - 17},${rabbit.opacity})`;

    context.beginPath();

    context.ellipse(
        -size * 0.63,
        size * 0.38,
        size * 0.53,
        size * 0.22,
        -0.13,
        0,
        Math.PI * 2
    );

    context.fill();

    context.beginPath();

    context.ellipse(
        size * 0.38,
        size * 0.37,
        size * 0.42,
        size * 0.18,
        0.04,
        0,
        Math.PI * 2
    );

    context.fill();

    context.strokeStyle =
        `rgba(32,29,26,${rabbit.opacity * 0.9})`;

    context.fillStyle =
        `rgba(32,29,26,${rabbit.opacity * 0.9})`;

    if (eyeClosed) {
        context.lineWidth =
            Math.max(
                0.6,
                size * 0.05
            );

        context.beginPath();

        context.moveTo(
            size * 0.67,
            -size * 0.42
        );

        context.lineTo(
            size * 0.83,
            -size * 0.4
        );

        context.stroke();
    } else {
        context.beginPath();

        context.arc(
            size * 0.76,
            -size * 0.43,
            Math.max(
                0.7,
                size * 0.065
            ),
            0,
            Math.PI * 2
        );

        context.fill();

        context.fillStyle =
            `rgba(248,242,225,${rabbit.opacity * 0.78})`;

        context.beginPath();

        context.arc(
            size * 0.78,
            -size * 0.46,
            Math.max(
                0.2,
                size * 0.018
            ),
            0,
            Math.PI * 2
        );

        context.fill();
    }

    context.fillStyle =
        `rgba(88,64,59,${rabbit.opacity * 0.92})`;

    context.beginPath();

    context.ellipse(
        size * 1.08,
        -size * 0.22,
        size * 0.11,
        size * 0.075,
        0,
        0,
        Math.PI * 2
    );

    context.fill();

    context.strokeStyle =
        `rgba(225,218,202,${rabbit.opacity * 0.58})`;

    context.lineWidth =
        Math.max(
            0.45,
            size * 0.025
        );

    const whiskerY =
        -size * 0.15;

    for (
        let whiskerIndex = -1;
        whiskerIndex <= 1;
        whiskerIndex++
    ) {
        context.beginPath();

        context.moveTo(
            size * 0.98,
            whiskerY +
                whiskerIndex *
                    size *
                    0.08
        );

        context.lineTo(
            size * 1.55,
            whiskerY +
                whiskerIndex *
                    size *
                    0.16
        );

        context.stroke();
    }

    context.restore();
}

// Layer 17のデータを作成
createLayer17Animals();
// ============================================================
// Layer 18 — 風に乗って綿毛や種が飛ぶ
// ============================================================

const layer18Seeds = [];

function createLayer18Seeds() {
    layer18Seeds.length = 0;

    const canvasWidth = getCanvasWidth();
    const canvasHeight = getCanvasHeight();

    const seedCount = Math.max(
        28,
        Math.floor(canvasWidth / 42)
    );

    for (let i = 0; i < seedCount; i++) {
        const seedType =
            Math.random() < 0.72
                ? "dandelion"
                : "wingedSeed";

        layer18Seeds.push({
            type: seedType,

            x:
                Math.random() *
                canvasWidth,

            y:
                canvasHeight * 0.16 +
                Math.random() *
                    canvasHeight *
                    0.72,

            size:
                seedType === "dandelion"
                    ? 1.5 + Math.random() * 2.4
                    : 2.3 + Math.random() * 3.2,

            speedX:
                0.12 + Math.random() * 0.28,

            speedY:
                -0.025 + Math.random() * 0.05,

            driftPhase:
                Math.random() * Math.PI * 2,

            driftSpeed:
                0.008 + Math.random() * 0.014,

            driftAmount:
                0.18 + Math.random() * 0.42,

            rotation:
                Math.random() * Math.PI * 2,

            rotationSpeed:
                -0.012 + Math.random() * 0.024,

            opacity: 0,

            targetOpacity:
                0.35 + Math.random() * 0.5,

            appearSpeed:
                0.02 + Math.random() * 0.02,
            delay:
                Math.floor(
                    Math.random() * 40
                ),

            age: 0
        });
    }
}

function drawLayer18Seeds() {
    if (currentLayer < 18) {
        return;
    }

    context.save();

    for (const seed of layer18Seeds) {
        seed.age += 1;

        if (seed.age < seed.delay) {
            continue;
        }

        seed.driftPhase +=
            seed.driftSpeed;

        seed.rotation +=
            seed.rotationSpeed;

        seed.x +=
            seed.speedX +
            Math.sin(seed.driftPhase) *
                seed.driftAmount;

        seed.y +=
            seed.speedY +
            Math.cos(
                seed.driftPhase * 0.75
            ) *
                0.08;

        if (
            seed.opacity <
            seed.targetOpacity
        ) {
            seed.opacity = Math.min(
                seed.targetOpacity,
                seed.opacity +
                    seed.appearSpeed
            );
        }

        if (
            seed.x >
            getCanvasWidth() + 30
        ) {
            seed.x = -30;

            seed.y =
                getCanvasHeight() *
                    0.15 +
                Math.random() *
                    getCanvasHeight() *
                    0.72;
        }

        if (seed.y < -30) {
            seed.y =
                getCanvasHeight() + 20;
        }

        if (
            seed.y >
            getCanvasHeight() + 30
        ) {
            seed.y = -20;
        }

        if (
            seed.type ===
            "dandelion"
        ) {
            drawLayer18DandelionSeed(
                seed
            );
        } else {
            drawLayer18WingedSeed(
                seed
            );
        }
    }

    context.restore();
}

function drawLayer18DandelionSeed(seed) {
    const size = seed.size;

    context.save();

    context.translate(
        seed.x,
        seed.y
    );

    context.rotate(
        seed.rotation
    );

    context.lineCap = "round";

    context.strokeStyle =
        `rgba(225,230,214,${seed.opacity * 0.8})`;

    context.lineWidth =
        Math.max(
            0.35,
            size * 0.15
        );

    context.beginPath();

    context.moveTo(
        0,
        size * 0.2
    );

    context.quadraticCurveTo(
        size * 0.14,
        size * 1.55,
        size * 0.06,
        size * 2.6
    );

    context.stroke();

    const tuftY =
        -size * 0.1;

    const threadCount = 10;

    for (
        let threadIndex = 0;
        threadIndex < threadCount;
        threadIndex++
    ) {
        const angle =
            (
                Math.PI * 2 *
                threadIndex
            ) /
                threadCount;

        const spread =
            size *
            (
                1.15 +
                Math.sin(
                    seed.driftPhase +
                        threadIndex
                ) *
                    0.08
            );

        context.strokeStyle =
            `rgba(245,247,235,${seed.opacity * 0.68})`;

        context.lineWidth =
            Math.max(
                0.25,
                size * 0.085
            );

        context.beginPath();

        context.moveTo(
            0,
            tuftY
        );

        context.quadraticCurveTo(
            Math.cos(angle) *
                spread *
                0.45,
            Math.sin(angle) *
                spread *
                0.45,
            Math.cos(angle) *
                spread,
            Math.sin(angle) *
                spread
        );

        context.stroke();
    }

    context.fillStyle =
        `rgba(205,190,145,${seed.opacity * 0.86})`;

    context.beginPath();

    context.ellipse(
        0,
        size * 2.7,
        size * 0.26,
        size * 0.48,
        0,
        0,
        Math.PI * 2
    );

    context.fill();

    context.restore();
}

function drawLayer18WingedSeed(seed) {
    const size = seed.size;

    context.save();

    context.translate(
        seed.x,
        seed.y
    );

    context.rotate(
        seed.rotation
    );

    context.fillStyle =
        `rgba(176,143,88,${seed.opacity * 0.82})`;

    context.beginPath();

    context.ellipse(
        0,
        size * 0.72,
        size * 0.34,
        size * 0.62,
        -0.18,
        0,
        Math.PI * 2
    );

    context.fill();

    const wingGradient =
        context.createLinearGradient(
            0,
            0,
            size * 2.2,
            -size * 0.9
        );

    wingGradient.addColorStop(
        0,
        `rgba(218,196,145,${seed.opacity * 0.7})`
    );

    wingGradient.addColorStop(
        1,
        `rgba(245,234,198,${seed.opacity * 0.16})`
    );

    context.fillStyle =
        wingGradient;

    context.beginPath();

    context.moveTo(
        0,
        size * 0.45
    );

    context.bezierCurveTo(
        size * 0.75,
        -size * 0.2,
        size * 1.45,
        -size * 0.9,
        size * 2.25,
        -size * 0.75
    );

    context.bezierCurveTo(
        size * 1.58,
        -size * 0.18,
        size * 0.92,
        size * 0.35,
        0,
        size * 0.45
    );

    context.closePath();
    context.fill();

    context.strokeStyle =
        `rgba(155,126,78,${seed.opacity * 0.48})`;

    context.lineWidth =
        Math.max(
            0.35,
            size * 0.09
        );

    context.beginPath();

    context.moveTo(
        size * 0.1,
        size * 0.35
    );

    context.quadraticCurveTo(
        size * 1.05,
        -size * 0.15,
        size * 2.05,
        -size * 0.68
    );

    context.stroke();

    context.restore();
}

// Layer 18のデータを作成
createLayer18Seeds();
// ============================================================
// Layer 19 — 木々がさらに成長し、森が深くなる
// ============================================================

const layer19Trees = [];

function createLayer19Trees() {
    layer19Trees.length = 0;

    const canvasWidth = getCanvasWidth();
    const canvasHeight = getCanvasHeight();

    const treeCount = Math.max(
        18,
        Math.floor(canvasWidth / 65)
    );

    for (let i = 0; i < treeCount; i++) {
        const depth = Math.random();

        const baseY =
            canvasHeight * 0.47 +
            depth * canvasHeight * 0.42;

        const height =
            70 +
            depth * 150 +
            Math.random() * 80;

        const trunkWidth =
            4 +
            depth * 9 +
            Math.random() * 5;

        const x =
            Math.random() * canvasWidth;

        layer19Trees.push({
            x,
            baseY,
            height,
            trunkWidth,
            depth,

            growth: 0,

            growthSpeed:
                0.012 + Math.random() * 0.012,

            delay:
                Math.floor(
                    Math.random() * 40
                ),

            opacity: 0,

            targetOpacity:
                0.35 + depth * 0.55,

            swayPhase:
                Math.random() * Math.PI * 2,

            swaySpeed:
                0.002 +
                Math.random() * 0.004,

            swayAmount:
                1.5 +
                Math.random() * 4,

            branchSeed:
                Math.random() * 1000,

            crownWidth:
                height *
                (
                    0.22 +
                    Math.random() * 0.16
                ),

            crownHeight:
                height *
                (
                    0.28 +
                    Math.random() * 0.18
                ),

            colorType:
                Math.floor(
                    Math.random() * 3
                ),

            age: 0
        });
    }

    layer19Trees.sort(
        (treeA, treeB) =>
            treeA.baseY - treeB.baseY
    );
}

function drawLayer19Trees() {
    if (currentLayer < 19) {
        return;
    }

    context.save();

    for (const tree of layer19Trees) {
        tree.age += 1;

        if (tree.age < tree.delay) {
            continue;
        }

        tree.swayPhase +=
            tree.swaySpeed;

        if (tree.growth < 1) {
            tree.growth = Math.min(
                1,
                tree.growth +
                    tree.growthSpeed
            );
        }

        if (
            tree.opacity <
            tree.targetOpacity
        ) {
            tree.opacity = Math.min(
                tree.targetOpacity,
                tree.opacity + 0.02
            );
        }

        const growthEase =
            1 -
            Math.pow(
                1 - tree.growth,
                3
            );

        const sway =
            Math.sin(tree.swayPhase) *
            tree.swayAmount *
            growthEase;

        drawLayer19Tree(
            tree,
            growthEase,
            sway
        );
    }

    context.restore();
}

function drawLayer19Tree(
    tree,
    growth,
    sway
) {
    const height =
        tree.height * growth;

    const trunkWidth =
        tree.trunkWidth *
        (
            0.35 +
            growth * 0.65
        );

    const topX =
        tree.x + sway;

    const topY =
        tree.baseY - height;

    context.save();

    context.lineCap = "round";
    context.lineJoin = "round";

    // 地面の影
    const groundShadow =
        context.createRadialGradient(
            tree.x,
            tree.baseY,
            0,
            tree.x,
            tree.baseY,
            tree.crownWidth * 0.7
        );

    groundShadow.addColorStop(
        0,
        `rgba(12,35,22,${tree.opacity * 0.22})`
    );

    groundShadow.addColorStop(
        1,
        "rgba(12,35,22,0)"
    );

    context.fillStyle =
        groundShadow;

    context.beginPath();

    context.ellipse(
        tree.x,
        tree.baseY,
        tree.crownWidth * 0.7,
        trunkWidth * 1.5,
        0,
        0,
        Math.PI * 2
    );

    context.fill();

    // 幹
    const trunkGradient =
        context.createLinearGradient(
            tree.x - trunkWidth,
            0,
            tree.x + trunkWidth,
            0
        );

    trunkGradient.addColorStop(
        0,
        `rgba(58,44,31,${tree.opacity})`
    );

    trunkGradient.addColorStop(
        0.5,
        `rgba(112,82,54,${tree.opacity})`
    );

    trunkGradient.addColorStop(
        1,
        `rgba(47,38,29,${tree.opacity})`
    );

    context.strokeStyle =
        trunkGradient;

    context.lineWidth =
        trunkWidth;

    context.beginPath();

    context.moveTo(
        tree.x,
        tree.baseY
    );

    context.bezierCurveTo(
        tree.x - sway * 0.15,
        tree.baseY - height * 0.35,
        tree.x + sway * 0.45,
        tree.baseY - height * 0.72,
        topX,
        topY
    );

    context.stroke();

    drawLayer19Branches(
        tree,
        growth,
        sway,
        height,
        trunkWidth
    );

    drawLayer19Crown(
        tree,
        growth,
        sway,
        topX,
        topY
    );

    context.restore();
}

function drawLayer19Branches(
    tree,
    growth,
    sway,
    height,
    trunkWidth
) {
    const branchCount =
        5 +
        Math.floor(tree.depth * 4);

    for (
        let i = 0;
        i < branchCount;
        i++
    ) {
        const branchPosition =
            0.28 +
            (
                i /
                branchCount
            ) *
                0.58;

        const side =
            i % 2 === 0
                ? -1
                : 1;

        const randomFactor =
            Math.sin(
                tree.branchSeed +
                i * 13.7
            );

        const startX =
            tree.x +
            sway *
                branchPosition *
                0.7;

        const startY =
            tree.baseY -
            height *
                branchPosition;

        const branchLength =
            tree.crownWidth *
            (
                0.45 +
                Math.abs(
                    randomFactor
                ) *
                    0.35
            ) *
            growth;

        const endX =
            startX +
            side *
                branchLength +
            sway * 0.3;

        const endY =
            startY -
            branchLength *
                (
                    0.28 +
                    Math.abs(
                        randomFactor
                    ) *
                        0.24
                );

        context.strokeStyle =
            `rgba(70,52,35,${tree.opacity * 0.85})`;

        context.lineWidth =
            Math.max(
                0.8,
                trunkWidth *
                    (
                        0.28 -
                        branchPosition *
                            0.12
                    )
            );

        context.beginPath();

        context.moveTo(
            startX,
            startY
        );

        context.quadraticCurveTo(
            startX +
                side *
                    branchLength *
                    0.42,
            startY -
                branchLength *
                    0.08,
            endX,
            endY
        );

        context.stroke();
    }
}

function drawLayer19Crown(
    tree,
    growth,
    sway,
    topX,
    topY
) {
    const crownWidth =
        tree.crownWidth * growth;

    const crownHeight =
        tree.crownHeight * growth;

    let darkColor;
    let middleColor;
    let lightColor;

    if (tree.colorType === 0) {
        darkColor = [28, 70, 43];
        middleColor = [55, 108, 61];
        lightColor = [92, 139, 76];
    } else if (
        tree.colorType === 1
    ) {
        darkColor = [24, 61, 48];
        middleColor = [46, 96, 69];
        lightColor = [82, 130, 87];
    } else {
        darkColor = [38, 67, 37];
        middleColor = [68, 106, 52];
        lightColor = [105, 139, 69];
    }

    const clusterCount =
        8 +
        Math.floor(tree.depth * 7);

    for (
        let i = 0;
        i < clusterCount;
        i++
    ) {
        const angle =
            (
                Math.PI * 2 *
                i
            ) /
                clusterCount +
            tree.branchSeed;

        const radiusX =
            crownWidth *
            (
                0.2 +
                Math.random() * 0.28
            );

        const radiusY =
            crownHeight *
            (
                0.22 +
                Math.random() * 0.28
            );

        const clusterX =
            topX +
            Math.cos(angle) *
                crownWidth *
                0.48 +
            sway * 0.15;

        const clusterY =
            topY +
            crownHeight * 0.4 +
            Math.sin(angle) *
                crownHeight *
                0.48;

        const leafGradient =
            context.createRadialGradient(
                clusterX -
                    radiusX * 0.22,
                clusterY -
                    radiusY * 0.25,
                0,
                clusterX,
                clusterY,
                Math.max(
                    radiusX,
                    radiusY
                )
            );

        leafGradient.addColorStop(
            0,
            `rgba(${lightColor[0]},${lightColor[1]},${lightColor[2]},${tree.opacity})`
        );

        leafGradient.addColorStop(
            0.55,
            `rgba(${middleColor[0]},${middleColor[1]},${middleColor[2]},${tree.opacity})`
        );

        leafGradient.addColorStop(
            1,
            `rgba(${darkColor[0]},${darkColor[1]},${darkColor[2]},${tree.opacity})`
        );

        context.fillStyle =
            leafGradient;

        context.beginPath();

        context.ellipse(
            clusterX,
            clusterY,
            radiusX,
            radiusY,
            angle * 0.18,
            0,
            Math.PI * 2
        );

        context.fill();
    }

    // 森の奥行きを出す暗い葉
    context.fillStyle =
        `rgba(16,48,30,${tree.opacity * 0.18})`;

    context.beginPath();

    context.ellipse(
        topX,
        topY + crownHeight * 0.52,
        crownWidth * 0.76,
        crownHeight * 0.55,
        0,
        0,
        Math.PI * 2
    );

    context.fill();
}

// Layer 19のデータを作成
createLayer19Trees();
// ============================================================
// Layer 20-A — 世界全体が生命に満ち、空気まで輝く
// 大気の光・生命のオーラ粒子
// ============================================================

const layer20AtmosphereParticles = [];
const layer20LightWaves = [];
const layer20LifeGlows = [];

function createLayer20Atmosphere() {
    layer20AtmosphereParticles.length = 0;
    layer20LightWaves.length = 0;
    layer20LifeGlows.length = 0;

    const canvasWidth = getCanvasWidth();
    const canvasHeight = getCanvasHeight();

    const atmosphereParticleCount = Math.max(
        45,
        Math.floor(canvasWidth / 24)
    );

    const lightWaveCount = Math.max(
        5,
        Math.floor(canvasWidth / 260)
    );

    const lifeGlowCount = Math.max(
        9,
        Math.floor(canvasWidth / 130)
    );

    // --------------------------------------------------------
    // 空気中を漂う生命の光
    // --------------------------------------------------------

    for (
        let i = 0;
        i < atmosphereParticleCount;
        i++
    ) {
        const depth =
            0.15 + Math.random() * 0.85;

        const particleTypeRoll =
            Math.random();

        let particleType;

        if (particleTypeRoll < 0.58) {
            particleType = "softLight";
        } else if (
            particleTypeRoll < 0.84
        ) {
            particleType = "spark";
        } else {
            particleType = "mistGlow";
        }

        layer20AtmosphereParticles.push({
            type: particleType,

            x:
                Math.random() *
                canvasWidth,

            y:
                canvasHeight * 0.08 +
                Math.random() *
                    canvasHeight *
                    0.84,

            baseX: 0,
            baseY: 0,

            depth,

            size:
                particleType === "mistGlow"
                    ? 12 +
                      depth * 25 +
                      Math.random() * 18
                    : 0.8 +
                      depth * 2.6 +
                      Math.random() * 1.8,

            opacity: 0,

            targetOpacity:
                particleType === "mistGlow"
                    ? 0.035 +
                      Math.random() * 0.075
                    : 0.18 +
                      depth * 0.32 +
                      Math.random() * 0.24,

            appearSpeed:
                0.02 + Math.random() * 0.02,

            pulsePhase:
                Math.random() *
                Math.PI *
                2,

            pulseSpeed:
                0.006 +
                Math.random() * 0.016,

            driftPhaseX:
                Math.random() *
                Math.PI *
                2,

            driftPhaseY:
                Math.random() *
                Math.PI *
                2,

            driftSpeedX:
                0.002 +
                Math.random() * 0.006,

            driftSpeedY:
                0.0015 +
                Math.random() * 0.004,

            driftAmountX:
                5 +
                depth * 18 +
                Math.random() * 12,

            driftAmountY:
                3 +
                depth * 10 +
                Math.random() * 8,

            risingSpeed:
                particleType === "spark"
                    ? 0.018 +
                      Math.random() * 0.04
                    : 0.004 +
                      Math.random() * 0.018,

            rotation:
                Math.random() *
                Math.PI *
                2,

            rotationSpeed:
                -0.006 +
                Math.random() * 0.012,

            hueType:
                Math.floor(
                    Math.random() * 4
                ),

            delay:
                Math.floor(
                    Math.random() * 40
                ),

            age: 0
        });

        const particle =
            layer20AtmosphereParticles[
                layer20AtmosphereParticles.length -
                    1
            ];

        particle.baseX =
            particle.x;

        particle.baseY =
            particle.y;
    }

    // --------------------------------------------------------
    // 世界をゆっくり横切る光の波
    // --------------------------------------------------------

    for (
        let i = 0;
        i < lightWaveCount;
        i++
    ) {
        const depth =
            0.25 + Math.random() * 0.75;

        layer20LightWaves.push({
            x:
                -canvasWidth * 0.35 +
                Math.random() *
                    canvasWidth *
                    1.7,

            y:
                canvasHeight * 0.18 +
                Math.random() *
                    canvasHeight *
                    0.68,

            width:
                canvasWidth *
                (
                    0.22 +
                    Math.random() * 0.32
                ),

            height:
                20 +
                depth * 45 +
                Math.random() * 35,

            depth,

            opacity: 0,

            targetOpacity:
                0.018 +
                depth * 0.035 +
                Math.random() * 0.025,

            appearSpeed:
                0.01 + Math.random() * 0.01,

            speed:
                0.035 +
                Math.random() * 0.08,

            wavePhase:
                Math.random() *
                Math.PI *
                2,

            waveSpeed:
                0.002 +
                Math.random() * 0.004,

            waveAmount:
                5 +
                Math.random() * 16,

            rotation:
                -0.14 +
                Math.random() * 0.28,

            colorType:
                Math.floor(
                    Math.random() * 3
                ),

            delay:
                Math.floor(
                    Math.random() * 40
                ),

            age: 0
        });
    }

    // --------------------------------------------------------
    // 森・小川・花畑から立ち上がる生命のオーラ
    // --------------------------------------------------------

    for (
        let i = 0;
        i < lifeGlowCount;
        i++
    ) {
        const zoneRoll =
            Math.random();

        let zone;
        let x;
        let y;

        if (zoneRoll < 0.35) {
            zone = "forest";

            x =
                Math.random() *
                canvasWidth;

            y =
                canvasHeight * 0.43 +
                Math.random() *
                    canvasHeight *
                    0.27;
        } else if (
            zoneRoll < 0.65
        ) {
            zone = "stream";

            x =
                Math.random() *
                canvasWidth;

            y =
                canvasHeight * 0.68 +
                Math.random() *
                    canvasHeight *
                    0.17;
        } else {
            zone = "flowers";

            x =
                Math.random() *
                canvasWidth;

            y =
                canvasHeight * 0.64 +
                Math.random() *
                    canvasHeight *
                    0.3;
        }

        layer20LifeGlows.push({
            zone,

            x,
            y,

            baseX: x,
            baseY: y,

            radiusX:
                35 +
                Math.random() * 85,

            radiusY:
                18 +
                Math.random() * 52,

            opacity: 0,

            targetOpacity:
                0.025 +
                Math.random() * 0.065,

            appearSpeed:
                0.015 + Math.random() * 0.015,

            pulsePhase:
                Math.random() *
                Math.PI *
                2,

            pulseSpeed:
                0.003 +
                Math.random() * 0.007,

            driftPhase:
                Math.random() *
                Math.PI *
                2,

            driftSpeed:
                0.0015 +
                Math.random() * 0.003,

            driftAmount:
                4 +
                Math.random() * 14,

            riseAmount:
                3 +
                Math.random() * 12,

            colorType:
                zone === "stream"
                    ? 1
                    : zone === "flowers"
                    ? 2
                    : 0,

            delay:
                Math.floor(
                    Math.random() * 40
                ),

            age: 0
        });
    }
}

function updateLayer20AtmosphereParticle(
    particle
) {
    particle.age += 1;

    if (
        particle.age <
        particle.delay
    ) {
        return false;
    }

    particle.pulsePhase +=
        particle.pulseSpeed;

    particle.driftPhaseX +=
        particle.driftSpeedX;

    particle.driftPhaseY +=
        particle.driftSpeedY;

    particle.rotation +=
        particle.rotationSpeed;

    particle.baseY -=
        particle.risingSpeed;

    particle.x =
        particle.baseX +
        Math.sin(
            particle.driftPhaseX
        ) *
            particle.driftAmountX;

    particle.y =
        particle.baseY +
        Math.cos(
            particle.driftPhaseY
        ) *
            particle.driftAmountY;

    if (
        particle.opacity <
        particle.targetOpacity
    ) {
        particle.opacity = Math.min(
            particle.targetOpacity,
            particle.opacity +
                particle.appearSpeed
        );
    }

    if (
        particle.y < -50
    ) {
        particle.baseY =
            getCanvasHeight() + 35;

        particle.baseX =
            Math.random() *
            getCanvasWidth();

        particle.opacity = 0;
    }

    if (
        particle.x < -80
    ) {
        particle.baseX =
            getCanvasWidth() + 40;
    }

    if (
        particle.x >
        getCanvasWidth() + 80
    ) {
        particle.baseX = -40;
    }

    return true;
}

function updateLayer20LightWave(
    wave
) {
    wave.age += 1;

    if (
        wave.age <
        wave.delay
    ) {
        return false;
    }

    wave.wavePhase +=
        wave.waveSpeed;

    wave.x +=
        wave.speed;

    if (
        wave.opacity <
        wave.targetOpacity
    ) {
        wave.opacity = Math.min(
            wave.targetOpacity,
            wave.opacity +
                wave.appearSpeed
        );
    }

    if (
        wave.x >
        getCanvasWidth() +
            wave.width
    ) {
        wave.x =
            -wave.width;

        wave.y =
            getCanvasHeight() *
                0.16 +
            Math.random() *
                getCanvasHeight() *
                0.7;

        wave.opacity = 0;
    }

    return true;
}

function updateLayer20LifeGlow(
    glow
) {
    glow.age += 1;

    if (
        glow.age <
        glow.delay
    ) {
        return false;
    }

    glow.pulsePhase +=
        glow.pulseSpeed;

    glow.driftPhase +=
        glow.driftSpeed;

    glow.x =
        glow.baseX +
        Math.sin(
            glow.driftPhase
        ) *
            glow.driftAmount;

    glow.y =
        glow.baseY -
        (
            (
                Math.sin(
                    glow.driftPhase * 0.7
                ) +
                1
            ) /
            2
        ) *
            glow.riseAmount;

    if (
        glow.opacity <
        glow.targetOpacity
    ) {
        glow.opacity = Math.min(
            glow.targetOpacity,
            glow.opacity +
                glow.appearSpeed
        );
    }

    return true;
}
// ============================================================
// Layer 20-B — 世界全体が生命に満ち、空気まで輝く
// 描画処理
// ============================================================

function drawLayer20Atmosphere() {
    if (currentLayer < 20) {
        return;
    }

    context.save();

    context.globalCompositeOperation =
        "screen";

    drawLayer20LifeGlows();
    drawLayer20LightWaves();
    drawLayer20AtmosphereParticles();

    context.restore();
}

function drawLayer20LifeGlows() {
    for (
        const glow of layer20LifeGlows
    ) {
        const isActive =
            updateLayer20LifeGlow(
                glow
            );

        if (!isActive) {
            continue;
        }

        const pulse =
            0.72 +
            (
                (
                    Math.sin(
                        glow.pulsePhase
                    ) +
                    1
                ) /
                2
            ) *
                0.28;

        const opacity =
            glow.opacity *
            pulse;

        let centerColor;
        let middleColor;

        if (
            glow.colorType === 1
        ) {
            centerColor = [
                180,
                235,
                245
            ];

            middleColor = [
                115,
                205,
                220
            ];
        } else if (
            glow.colorType === 2
        ) {
            centerColor = [
                255,
                230,
                190
            ];

            middleColor = [
                235,
                185,
                135
            ];
        } else {
            centerColor = [
                195,
                245,
                175
            ];

            middleColor = [
                120,
                205,
                115
            ];
        }

        context.save();

        context.translate(
            glow.x,
            glow.y
        );

        const gradient =
            context.createRadialGradient(
                0,
                0,
                0,
                0,
                0,
                Math.max(
                    glow.radiusX,
                    glow.radiusY
                )
            );

        gradient.addColorStop(
            0,
            `rgba(${centerColor[0]},${centerColor[1]},${centerColor[2]},${opacity})`
        );

        gradient.addColorStop(
            0.42,
            `rgba(${middleColor[0]},${middleColor[1]},${middleColor[2]},${opacity * 0.52})`
        );

        gradient.addColorStop(
            1,
            `rgba(${middleColor[0]},${middleColor[1]},${middleColor[2]},0)`
        );

        context.fillStyle =
            gradient;

        context.beginPath();

        context.ellipse(
            0,
            0,
            glow.radiusX *
                pulse,
            glow.radiusY *
                pulse,
            0,
            0,
            Math.PI * 2
        );

        context.fill();

        context.restore();
    }
}

function drawLayer20LightWaves() {
    for (
        const wave of layer20LightWaves
    ) {
        const isActive =
            updateLayer20LightWave(
                wave
            );

        if (!isActive) {
            continue;
        }

        const verticalOffset =
            Math.sin(
                wave.wavePhase
            ) *
            wave.waveAmount;

        let color;

        if (
            wave.colorType === 0
        ) {
            color = [
                210,
                245,
                195
            ];
        } else if (
            wave.colorType === 1
        ) {
            color = [
                205,
                235,
                250
            ];
        } else {
            color = [
                255,
                230,
                185
            ];
        }

        context.save();

        context.translate(
            wave.x,
            wave.y +
                verticalOffset
        );

        context.rotate(
            wave.rotation
        );

        const gradient =
            context.createLinearGradient(
                -wave.width / 2,
                0,
                wave.width / 2,
                0
            );

        gradient.addColorStop(
            0,
            `rgba(${color[0]},${color[1]},${color[2]},0)`
        );

        gradient.addColorStop(
            0.22,
            `rgba(${color[0]},${color[1]},${color[2]},${wave.opacity * 0.45})`
        );

        gradient.addColorStop(
            0.5,
            `rgba(${color[0]},${color[1]},${color[2]},${wave.opacity})`
        );

        gradient.addColorStop(
            0.78,
            `rgba(${color[0]},${color[1]},${color[2]},${wave.opacity * 0.45})`
        );

        gradient.addColorStop(
            1,
            `rgba(${color[0]},${color[1]},${color[2]},0)`
        );

        context.fillStyle =
            gradient;

        context.beginPath();

        context.ellipse(
            0,
            0,
            wave.width / 2,
            wave.height / 2,
            0,
            0,
            Math.PI * 2
        );

        context.fill();

        context.restore();
    }
}

function drawLayer20AtmosphereParticles() {
    for (
        const particle of
            layer20AtmosphereParticles
    ) {
        const isActive =
            updateLayer20AtmosphereParticle(
                particle
            );

        if (!isActive) {
            continue;
        }

        const pulse =
            0.45 +
            (
                (
                    Math.sin(
                        particle.pulsePhase
                    ) +
                    1
                ) /
                2
            ) *
                0.55;

        const opacity =
            particle.opacity *
            pulse;

        if (
            particle.type ===
            "softLight"
        ) {
            drawLayer20SoftLight(
                particle,
                opacity
            );
        } else if (
            particle.type ===
            "spark"
        ) {
            drawLayer20Spark(
                particle,
                opacity
            );
        } else {
            drawLayer20MistGlow(
                particle,
                opacity
            );
        }
    }
}

function getLayer20ParticleColor(
    hueType
) {
    if (hueType === 0) {
        return {
            center: [
                255,
                250,
                190
            ],
            outer: [
                205,
                240,
                120
            ]
        };
    }

    if (hueType === 1) {
        return {
            center: [
                220,
                250,
                255
            ],
            outer: [
                140,
                220,
                235
            ]
        };
    }

    if (hueType === 2) {
        return {
            center: [
                255,
                225,
                205
            ],
            outer: [
                240,
                170,
                145
            ]
        };
    }

    return {
        center: [
            235,
            220,
            255
        ],
        outer: [
            180,
            155,
            235
        ]
    };
}

function drawLayer20SoftLight(
    particle,
    opacity
) {
    const color =
        getLayer20ParticleColor(
            particle.hueType
        );

    const glowRadius =
        particle.size * 7;

    context.save();

    context.translate(
        particle.x,
        particle.y
    );

    const gradient =
        context.createRadialGradient(
            0,
            0,
            0,
            0,
            0,
            glowRadius
        );

    gradient.addColorStop(
        0,
        `rgba(${color.center[0]},${color.center[1]},${color.center[2]},${opacity})`
    );

    gradient.addColorStop(
        0.2,
        `rgba(${color.center[0]},${color.center[1]},${color.center[2]},${opacity * 0.65})`
    );

    gradient.addColorStop(
        0.58,
        `rgba(${color.outer[0]},${color.outer[1]},${color.outer[2]},${opacity * 0.18})`
    );

    gradient.addColorStop(
        1,
        `rgba(${color.outer[0]},${color.outer[1]},${color.outer[2]},0)`
    );

    context.fillStyle =
        gradient;

    context.beginPath();

    context.arc(
        0,
        0,
        glowRadius,
        0,
        Math.PI * 2
    );

    context.fill();

    context.fillStyle =
        `rgba(${color.center[0]},${color.center[1]},${color.center[2]},${Math.min(
            1,
            opacity + 0.2
        )})`;

    context.beginPath();

    context.arc(
        0,
        0,
        particle.size,
        0,
        Math.PI * 2
    );

    context.fill();

    context.restore();
}

function drawLayer20Spark(
    particle,
    opacity
) {
    const color =
        getLayer20ParticleColor(
            particle.hueType
        );

    const size =
        particle.size;

    context.save();

    context.translate(
        particle.x,
        particle.y
    );

    context.rotate(
        particle.rotation
    );

    context.shadowColor =
        `rgba(${color.center[0]},${color.center[1]},${color.center[2]},1)`;

    context.shadowBlur =
        8 + size * 4;

    context.strokeStyle =
        `rgba(${color.center[0]},${color.center[1]},${color.center[2]},${opacity})`;

    context.lineWidth =
        Math.max(
            0.5,
            size * 0.22
        );

    context.lineCap =
        "round";

    context.beginPath();

    context.moveTo(
        -size * 2.2,
        0
    );

    context.lineTo(
        size * 2.2,
        0
    );

    context.moveTo(
        0,
        -size * 2.2
    );

    context.lineTo(
        0,
        size * 2.2
    );

    context.stroke();

    context.strokeStyle =
        `rgba(${color.outer[0]},${color.outer[1]},${color.outer[2]},${opacity * 0.58})`;

    context.lineWidth =
        Math.max(
            0.35,
            size * 0.12
        );

    context.beginPath();

    context.moveTo(
        -size * 1.45,
        -size * 1.45
    );

    context.lineTo(
        size * 1.45,
        size * 1.45
    );

    context.moveTo(
        size * 1.45,
        -size * 1.45
    );

    context.lineTo(
        -size * 1.45,
        size * 1.45
    );

    context.stroke();

    context.fillStyle =
        `rgba(${color.center[0]},${color.center[1]},${color.center[2]},${Math.min(
            1,
            opacity + 0.28
        )})`;

    context.beginPath();

    context.arc(
        0,
        0,
        size * 0.72,
        0,
        Math.PI * 2
    );

    context.fill();

    context.restore();
}

function drawLayer20MistGlow(
    particle,
    opacity
) {
    const color =
        getLayer20ParticleColor(
            particle.hueType
        );

    context.save();

    context.translate(
        particle.x,
        particle.y
    );

    context.rotate(
        particle.rotation
    );

    const radius =
        particle.size;

    const gradient =
        context.createRadialGradient(
            -radius * 0.18,
            -radius * 0.12,
            0,
            0,
            0,
            radius
        );

    gradient.addColorStop(
        0,
        `rgba(${color.center[0]},${color.center[1]},${color.center[2]},${opacity})`
    );

    gradient.addColorStop(
        0.45,
        `rgba(${color.outer[0]},${color.outer[1]},${color.outer[2]},${opacity * 0.42})`
    );

    gradient.addColorStop(
        1,
        `rgba(${color.outer[0]},${color.outer[1]},${color.outer[2]},0)`
    );

    context.fillStyle =
        gradient;

    context.beginPath();

    context.ellipse(
        0,
        0,
        radius,
        radius * 0.58,
        0,
        0,
        Math.PI * 2
    );

    context.fill();

    context.restore();
}

// Layer 20のデータを作成
createLayer20Atmosphere()