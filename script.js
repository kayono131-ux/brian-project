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
