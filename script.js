let strokes, arrows, circles, labels;
let currentStrokeIndex = 0;
let currentLetterIndex = 0;
let strokePoints = [];
const strokeAnimationDuration = 2; // 2 seconds
const LETTERS = ["ܐ", "ܒ", "ܓ", "ܕ", "ܗ", "ܘ", "ܙ", "ܚ", "ܛ", "ܝ", "ܟـ", "ܠ", "ܡـ", "ܢـ", "ܣ", "ܥ", "ܦ", "ܨ", "ܩ", "ܪ", "ܫ", "ܬ"];
const STROKES_STEPS = [
    ["M140,150 L61,150", "M80,40 Q130,40 60,150", "M60,150 Q65,155 70,158"], // letter 1 Alap ܐ
    ["M 162.9584 139.5422 V 80.9413", "M 162.9584 80.9413 H 132.1594 q -12.299 0 -23.151 -0.9302 q -10.852 -0.9302 -15.5029 -2.1704", "M 162.9584 139.5422 H 84 q -12 0.4578 -22.0141 -2.5838 q -8.9859 -2.9584 -13.6425 -10.6453"], // letter 2 Beth ܒ
    ["M 121.4444 131.3953 l -31.7809 -61.7531", "M 121.4444 131.3953 h -41.4444 q -5 -0.3953 -6.8213 -2.2193", "M 121.4444 131.3953 l 12.5666 23.9039"], // letter 3 Gamal ܓ
    ["M138.024 155.5618q.31-3.7206.31-7.8548v-7.4414q0-39.3772-12.5056-57.5672-12.4024-18.19-38.4472-18.19-7.648 0-14.366 1.8604-6.6146 1.8602-11.3688 4.6508", "M138.024 155.5618h-78.858", "M99.8222 175.3022h-4.3149"], // letter 4 Dalath ܕ
    ["M164.2238 161.9696v-98.1848", "M164.2238 63.7848q-2.9972.7234-17.1564 1.2402-14.1594.4134-29.7656.4134l-51.1596 0", "M66.1422 65.4384q-14.7794 0-23.8744 12.609-8.9916 12.609-8.9916 29.7656 0 21.2906 11.4722 34.623 11.5754 13.3326 30.5922 13.3326 22.4276 0 33.4862-13.6426 11.0588-13.6426 11.0588-47.9556-1.8856-18.1704-11.8856-28.732"], // letter 5 Heh ܗ
    ["M98.6984 156.6986q22.6342 0 34.8298-11.9888 12.2988-12.0922 12.2988-33.4862 0-23.151-12.5056-37.6204-12.4022-14.4694-33.6928-14.4694-21.7042 0-34.83 14.7796-13.1256 14.676-13.1256 37.3102 0 21.394 12.1956 33.4862 12.2988 11.9888 34.8298 11.9888"], // letter 6 Waw ܘ
    ["M117.736 162.7226Q86.8855 145.2044 81.1495 129.0815 75.5683 112.9583 75.5683 90.1691 75.5683 66.2948 81.7696 55.2878 87.9706 44.1257 99.2878 44.1257 110.6047 44.1257 115.5658 54.3575 120.6817 64.4345 120.6817 87.8438 120.6817 107.6873 119.9065 126.7559 119.1313 145.6694 117.736 162.7226L115.7209 187.9922"], // letter 7 Zain ܙ
    ["M165.2784 117.825l-24.4169-27.7309", "M140.8614 90.0941l-1.3081 26.1611q-1.0464.2616-2.5289.3488-1.4824.0872-2.9649.0872-4.9705 0-9.2437-3.1393-4.1856-3.1394-17.3533-17.9641l-5.058-5.7553", "M102.4044 89.8326l-1.3079 26.4227-39.4161 0q-13.8654 0-22.5857-3.7498-8.7205-3.7496-11.5109-10.2028"], // letter 8 Heth ܚ
    ["M136.943 127.7809H56.2764Q48.0598 127.7809 42.8922 125.5588 37.7246 123.3368 36.0709 119.5127", "M136.943 127.7809 120.3033 157.9599 68.8337 58.018"], // letter 9 Teth ܛ
    ["M162.6484 117.4222l-29.7656-29.7656", "M132.8828 87.6566l-.7234 27.9052h-48.7824q-16.433 0-26.7684-4.4442-10.3352-4.444-13.6424-12.0922"], // letter 10 Yodh ܝ
    ["M159.2219 145.5618l-16.6785-34.2096q-11.9888-24.598-22.1174-33.4862-10.1284-8.8884-22.4274-8.8884-9.095 0-14.4694 3.1006-5.271 2.9972-6.8212 8.8882", "M159.2219 145.5618h-117.6539"], // letter 11 Kap ܟ
    ["M138.5831 142.2261l-44.855-87.2036", "M138.5831 142.2261h-60.5516q-10.2706 0-16.7303-2.7776-6.4595-2.7775-8.5265-7.5576"], // letter 12 Lamedh ܠ
    ["M154.1932 135.2967q9.9477-9.3147 9.9477-25.9544 0-18.5388-10.1285-30.4761-10.1287-11.9372-27.0396-11.9372-11.666 0-20.7093 5.9687-9.0433 5.9685-13.7459 16.8206l-17.2727-13.2034q-11.1234-8.5008-16.6399-13.4744-5.426-4.9739-8.772-8.3201", "M154.1932 135.2967q-9.8573 9.3146-27.9439 9.3146-9.3147 0-16.3684-2.4416-6.9634-2.4418-11.7563-7.1442-16.8797-17.2755-5.607-45.3072-11.2727 28.0317 5.607 45.3072h-69.453"], // letter 13 Meem ܡ
    ["M134.1482 144.193q-6.3044-13.229-10.3352-32.3492-3.9274-19.2236-3.9274-34.83v-11.5754h-16.3298", "M134.1482 144.193h-70.7964"], // letter 14 Noon ܢ
    ["M 158.6323 127.6022 q 10.4644 -9.4568 10.4644 -27.5951 q 0 -11.2396 -7.2864 -18.3709 q -7.2863 -7.2089 -17.7507 -7.2089 q -6.7438 0 -11.3946 2.0928 q -4.5734 2.0929 -7.9841 6.2011", "M 158.6323 127.6022 q -10.4644 9.4568 -29.9205 9.4568 q -7.0539 0 -13.8752 -1.2402 q -6.8212 -1.3177 -13.1773 -3.6432 q -8.294 -3.4494 -14.6504 -7.2864 q -9.7668 -5.5811 -14.4951 -13.6425 q -4.6509 -8.139 -4.6509 -19.456 q 0 -12.2474 8.5266 -21.4716 q 8.5266 -9.2241 20.2313 -9.2241 q 12.3247 0 19.6887 5.736 q 7.4413 5.7362 8.3715 15.8904 q -9.681 28.7787 -29.5329 53.95 h -35.8117 q -12.3248 0 -20.0762 -3.333 q -7.7515 -3.3332 -10.232 -9.0693"], // letter15 Samketh ܣ
    ["M 145.8037 131.6713 q -3.2556 0 -6.5112 -1.7827 q -3.178 -1.7829 -6.5888 -5.5036 l -3.8757 -4.7283 q -1.3177 -1.5503 -3.0231 -3.6432 q -1.7054 -2.1704 -3.0231 -4.1082 l -38.3695 -55.0353", "M 132.7037 124.385 h -0.31 l -3.0231 7.2864 h -46.7412 q -12.3247 0 -20.0761 -3.3332 q -7.7514 -3.333 -10.2319 -9.0692"], // letter16 'eh ܥ
    ["M 160.7296 153.6166 l -29.222 -109.0628", "M 131.5075 44.5538 l -13.3842 4.3409 q -21.9753 3.7982 -33.5508 13.7459 q -11.5754 9.8572 -11.5754 24.5075 q 0 13.6554 8.9528 21.6136 q 8.953 7.9581 24.7788 7.9581 h 44.1224", "M 160.7296 153.6166 h -85.0195 q -14.3789 0 -23.4222 -3.8887 q -9.0433 -3.8885 -11.9373 -10.5807"], // letter17 Peh ܦ
    ["M 155.323 70.5618 q -8.475 0 -13.9526 -4.0308 q -5.4778 -4.0306 -9.4052 -12.7122 l -2.5838 -4.961", "M 129.3814 48.8578 q -4.134 11.4722 -11.472 16.6398 q -7.3382 5.0642 -19.017 5.0642 q -10.6452 0 -18.9134 -6.4078 q -8.165 -6.5112 -11.3688 -17.2598", "M 68.6102 46.8942 l 63.1484 104.2826 h -79.5816"], // letter18 Tsadeh ܨ
    ["M 162.9501 136.6713 v -69.6079 q -2.9456 0.6977 -9.9993 1.3953 q -7.0539 0.6201 -14.3402 0.6201 h -18.6034 q -7.2864 0 -14.3403 -0.6201 q -7.0538 -0.6977 -9.9993 -1.3953", "M 162.9501 136.6713 h -48.834 q -5.7362 0 -9.5343 -1.8603 q -3.7208 -1.9378 -5.8911 -5.4261 q -1.5406 -2.8849 -2.0154 -4.7283 q -1.0077 -3.5656 -1.0077 -8.3715 v -49.2217", "M 98.6907 129.385 h -0.31 l -2.7906 7.2864 h -24.107 q -12.3248 0 -20.0762 -3.3331 q -7.7515 -3.333 -10.232 -9.0692"], // letter19 Qop ܩ
    ["M 138.024 155.5618 q 0.31 -3.7206 0.31 -7.8548 v -7.4414 q 0 -39.3772 -12.5056 -57.5674 q -12.4024 -18.19 -38.4472 -18.19 q -7.648 0 -14.366 1.8604 q -6.6146 1.8604 -11.3688 4.6508", "M 138.024 155.5618 h -78.858", "M 97.6519 45.078 h -4.315"], // letter20 Resh ܪ
    ["M 169.3216 131.6713 H 140.9513 Q 135.2929 131.6713 130.952 130.0435 Q 126.6112 128.3382 123.8207 124.385 Q 122.15 122.25 121.1852 119.6567 Q 119.0922 114.2305 119.0922 105.7041 V 77.6437", "M 159.2447 73.1479 Q 155.9117 74.9309 147.6176 76.2486 Q 139.3235 77.4888 130.7195 77.6437 H 119.0922 H 107.465 Q 98.861 77.4888 90.5669 76.2486 Q 82.2728 74.9309 78.9398 73.1479", "M 123.8207 124.385 H 123.5106 L 120.72 131.6713 H 61.1115 Q 48.7868 131.6713 41.0352 128.3382 Q 33.2839 125.0052 30.8034 119.269"], // letter21 Sheen ܫ
    ["M 150.3482 150.8466 L 73.6606 45.6338 L 47.8226 150.8466", "M 47.8226 150.8466 L 55.1438 121 L 72 150.8466"] // letter22 Taw ܬ
];
const STEP_LABEL_POSITIONS = [
    [["142", "145"], ["78", "30"], ["40", "150"]], // letter 1 Alap ܐ
    [["170", "140"], ["170", "80"], ["155", "160"]], // letter 2 Beth ܒ
    [["120", "120"], ["100", "150"], ["135", "145"]], // letter 3 Gamal ܓ
    [["150", "155"], ["130", "175"], ["105", "195"]], // letter 4 Dalath ܕ
    [["175", "160"], ["175", "63"], ["66", "55"]], // letter 5 Heh ܗ
    [["98", "176"]], // letter 6 Waw ܘ
    [["127", "162"]], // letter 7 Zain ܙ
    [["175", "117"], ["140", "80"], ["102", "80"]], // letter 8 Heth ܚ
    [["130", "117"], ["140", "150"]], // letter 9 Teth ܛ
    [["172", "117"], ["132", "77"]], // letter10 Yodh ܝ
    [["160", "135"], ["150", "165"]], // letter11 Kap ܟ
    [["138", "132"], ["128", "162"]], // letter12 Lamedh ܠ
    [["170", "130"], ["145", "160"]], // letter13 Meem ܡ
    [["140", "135"], ["125", "165"]], // letter14 Noon ܢ
    [["173", "125"], ["150", "151"]], // letter15 Samketh ܣ
    [["155", "138"], ["137", "118"]], // letter16 'eh ܥ
    [["167", "145"], ["140", "45"], ["150", "175"]], // letter17 Peh ܦ
    [["165", "74"], ["126", "37"], ["63", "36"]], // letter18 Tsadeh ܨ
    [["173", "130"], ["152", "157"], ["96", "158"]], // letter19 Qop ܩ
    [["148", "148"], ["125", "177"], ["110", "45"]], // letter20 Resh ܪ
    [["180", "140"], ["170", "73"], ["123", "155"]], // letter21 Sheen ܫ
    [["162", "155"], ["28", "155"]] // letter22 Taw ܬ
];
let soundEnabled = true; // global flag to control sound
const POINT_SAMPLING_DISTANCE = 2; // px
const TRACE_THRESHOLD = 20; // max distance in px to count as traced
const COVERAGE_REQUIRED = 0.8; // 80% coverage to complete stroke
let strokeCompletedFlags = [];

function animateStrokes() {
  let delay = 0;

  strokes.forEach((stroke, i) => {
    const length = stroke.getTotalLength();
    const arrow = arrows[i];
    const circle = circles[i];
    const label = labels[i];

    stroke.style.strokeDasharray = length;
    stroke.style.strokeDashoffset = length;
    stroke.style.transition = 'none';
    stroke.style.stroke = '#FF9800';
    stroke.style.opacity = '1';

    arrow.style.visibility = 'hidden';
    arrow.style.opacity = '0';
    arrow.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
      stroke.style.transition = `stroke-dashoffset ${strokeAnimationDuration}s ease`; // remove this line to display the stroke immediately
      stroke.style.strokeDashoffset = '0';
      document.getElementById(`animateMotion${i}`).beginElement();
      label.style.visibility = 'visible';

      setTimeout(() => {
        arrow.style.visibility = 'visible';
        arrow.style.opacity = '1';

        // Animation is done — move circle back to starting point
        const startPoint = stroke.getPointAtLength(0);
        circle.setAttribute('cx', startPoint.x);
        circle.setAttribute('cy', startPoint.y);

        // remove this timeout block to keep the arrow visible
        setTimeout(() => {
          arrow.style.opacity = '0';
        }, 500);

      }, strokeAnimationDuration * 1000); // wait for the stroke animation to finish

    }, delay);

    delay += strokeAnimationDuration * 1000; // total time per stroke (1s draw + arrow show/fade)
  });
}

function sampleStrokePoints() {
  strokePoints = strokes.map(stroke => {
    const len = stroke.getTotalLength();
    const points = [];
    for (let dist = 0; dist <= len; dist += POINT_SAMPLING_DISTANCE) {
      const pt = stroke.getPointAtLength(dist);
      points.push({ x: pt.x, y: pt.y, covered: false });
    }
    return points;
  });
  strokeCompletedFlags = new Array(strokes.length).fill(false);
}

function distance(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function findClosestStrokePoint(userPoint, points) {
  let minDist = Infinity;
  let minIndex = -1;
  for (let i = 0; i < points.length; i++) {
    if (!points[i].covered) {
      const d = distance(userPoint, points[i]);
      if (d < minDist) {
        minDist = d;
        minIndex = i;
      }
    }
  }
  return { minDist, minIndex };
}

function setupTracing() {
  const canvas = document.getElementById('traceCanvas');
  const ctx = canvas.getContext('2d');
  const svg = document.getElementById('canvasSvg');
  const rect = svg.getBoundingClientRect();

  canvas.width = rect.width;
  canvas.height = rect.height;

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 25;
  ctx.strokeStyle = '#ffffff';

  let drawing = false;

  function getPointerPos(evt) {
    const rect = canvas.getBoundingClientRect();
    let x, y;
    if (evt.touches && evt.touches.length > 0) {
      x = evt.touches[0].clientX - rect.left;
      y = evt.touches[0].clientY - rect.top;
    } else {
      x = evt.clientX - rect.left;
      y = evt.clientY - rect.top;
    }
    return { x, y };
  }

  function startDraw(evt) {
    evt.preventDefault();
    drawing = true;
    const pos = getPointerPos(evt);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function draw(evt) {
    if (!drawing) return;
    evt.preventDefault();
    const pos = getPointerPos(evt);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    if (currentStrokeIndex >= strokes.length) return;

    const points = strokePoints[currentStrokeIndex];
    let closest = findClosestStrokePoint(pos, points);

    if (
      closest.minDist <= TRACE_THRESHOLD &&
      closest.minIndex !== -1 &&
      !strokeCompletedFlags[currentStrokeIndex]
    ) {
      points[closest.minIndex].covered = true;
      const coveredCount = points.filter(p => p.covered).length;
      const coverage = coveredCount / points.length;

      if (coverage >= COVERAGE_REQUIRED) {
        strokeCompletedFlags[currentStrokeIndex] = true;
        const completedIndex = currentStrokeIndex;

        // Change SVG stroke to green
        strokes[completedIndex].style.stroke = 'green';

        // Flash traced path on canvas green
        ctx.strokeStyle = 'rgba(0, 200, 0, 0.7)';
        ctx.beginPath();

        // Redraw the current canvas contents in green
        setTimeout(() => {
          // Reset styles after flash
          ctx.strokeStyle = '#ffffff';
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          strokes[completedIndex].style.stroke = '#FF9800'; // Reset stroke color to original
          currentStrokeIndex++;

          if (currentStrokeIndex < strokes.length) {
            arrows[currentStrokeIndex].style.visibility = 'visible';
            arrows[currentStrokeIndex].style.opacity = '1';

            setTimeout(() => {
              arrows[currentStrokeIndex].style.opacity = '0';
            }, 1000);
          }
        }, 300);
      }
    }
  }


  function endDraw(evt) {
    if (!drawing) return;
    evt.preventDefault();
    drawing = false;
  }

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', endDraw);
  canvas.addEventListener('mouseout', endDraw);

  canvas.addEventListener('touchstart', startDraw, { passive: false });
  canvas.addEventListener('touchmove', draw, { passive: false });
  canvas.addEventListener('touchend', endDraw);
  canvas.addEventListener('touchcancel', endDraw);
}

function selectLetter(letterIndex) {
  updateLetter(letterIndex);
}

function clearCanvas() {
  playLetterSound();
  switchCanvasLetter();
  sampleStrokePoints();
}

function previousLetter() {
  updateLetter(currentLetterIndex - 1);
}

function nextLetter() {
  updateLetter(currentLetterIndex + 1);
}

function updateLetter(letterIndex) {
  switchHighlightLetterButton(letterIndex);
  scrollLetterButtonIntoView();
  playLetterSound();
  switchHeaderLetter();
  switchCanvasLetter();
}

function switchHighlightLetterButton(letterIndex) {
  document.querySelectorAll('.letter-list button')[currentLetterIndex].classList.remove('active');
  currentLetterIndex = letterIndex < 0 ? LETTERS.length - 1 : letterIndex >= LETTERS.length ? 0 : letterIndex;
  document.querySelectorAll('.letter-list button')[currentLetterIndex].classList.add('active');
}

function scrollLetterButtonIntoView() {
  document.querySelectorAll('.letter-list button')[currentLetterIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

function playLetterSound() {
  if (!soundEnabled) return;
  const audio = new Audio(`sounds/${currentLetterIndex}.mp3`);
  audio.play();
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  const button = document.getElementById('soundToggle');
  button.textContent = soundEnabled ? '🔊' : '🔇';
}

function switchHeaderLetter() {
const header = document.getElementById('letterHeader');

  let stepChar = LETTERS[currentLetterIndex];

  header.textContent = `Trace the Letter: ${stepChar}`;
}

function switchCanvasLetter() {
    const canvas = document.getElementById('traceCanvas');
    const ctx = canvas.getContext('2d');
    const svg = document.getElementById('canvasSvg');
    const rect = svg.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switchLetterStrokes();

    animateStrokes();

    // Reset current strokes
    resetCurrentStrokes();
    
    setupTracing();
}

function switchLetterStrokes() {
    // Remove all existing strokes and arrows
    deleteCurrentLetterStrokes();

    // Create new strokes and arrows for the new letter
    createNewLetterStrokes();

    // Reset current strokes
    resetCurrentStrokes();
}

function createNewLetterStrokes() {
    // Create new strokes and arrows for the current letter
    const letterStrokes = STROKES_STEPS[currentLetterIndex];
    letterStrokes.forEach((path, index) => {
        // Create stroke path
        const stroke = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        stroke.setAttribute('d', path);
        stroke.classList.add('stroke');
        stroke.setAttribute('id', `stroke${index}`);
        document.getElementById('canvasSvg').appendChild(stroke);

        // Create guide path
        const guidePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        guidePath.setAttribute('d', path);
        guidePath.classList.add('guidePath');
        guidePath.setAttribute('id', `guidePath${index}`);
        document.getElementById('canvasSvg').appendChild(guidePath);

        // Get starting point of the stroke
        const startingPoint = findStartingPoint(path);

        // Create circle at start of stroke
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.classList.add('startCircle');
        circle.setAttribute('id', `startCircle${index}`);
        /* circle.setAttribute('cx', startingPoint.x);
        circle.setAttribute('cy', startingPoint.y); */
        circle.setAttribute('r', 3);

        // Create the animation motion for the circle
        const circleAnimation = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
        circleAnimation.setAttribute('id', `animateMotion${index}`);
        circleAnimation.setAttribute('dur', `${strokeAnimationDuration}s`);
        if (index > 0) {
            circleAnimation.setAttribute('begin', `${index * strokeAnimationDuration}s`);
        }
        circleAnimation.setAttribute('repeatCount', '1');
        circle.appendChild(circleAnimation);

        const mpath = document.createElementNS('http://www.w3.org/2000/svg', 'mpath');
        mpath.setAttribute('href', `#stroke${index}`);
        circleAnimation.appendChild(mpath);
        document.getElementById('canvasSvg').appendChild(circle);

        // Create arrow for the stroke
        const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arrow.classList.add('arrow');
        arrow.setAttribute('id', `arrow${index}`);
        arrow.setAttribute('d', path);
        arrow.style.markerEnd = 'url(#arrow)';
        document.getElementById('canvasSvg').appendChild(arrow);

        // Create label for the stroke
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.classList.add('label');
        label.setAttribute('id', `label${index}`);
        label.textContent = index+1;
        label.setAttribute('x', STEP_LABEL_POSITIONS[currentLetterIndex][index][0]);
        label.setAttribute('y', STEP_LABEL_POSITIONS[currentLetterIndex][index][1]);
        document.getElementById('canvasSvg').appendChild(label);
    });

    // Reset current stroke index
    currentStrokeIndex = 0;
}

function deleteCurrentLetterStrokes() {
    // Delete all existing strokes and arrows and create new ones for the new letter
    strokes.forEach(stroke => stroke.remove());
    document.querySelectorAll('.guidePath').forEach(guide => guide.remove());
    circles.forEach(circle => circle.remove());
    arrows.forEach(arrow => arrow.remove());
    document.querySelectorAll('.label').forEach(label => label.remove());
}

function findStartingPoint(path) {
    // Matches: "M10 20", "M 10 20", "M 10.20,30.40", or "M10,20"
    const match = path.match(/M\s*([\d.]+),?\s*([\d.]+)/);

    if (match) {
        return { x: parseInt(match[1]), y: parseInt(match[2]) };
    } else {
        return null; // No valid starting point found
    }
}

function resetCurrentStrokes() {
    strokes = Array.from(document.querySelectorAll('.stroke'));
    arrows = Array.from(document.querySelectorAll('.arrow'));
    circles = Array.from(document.querySelectorAll('.startCircle'));
    labels = Array.from(document.querySelectorAll('.label'));
}

window.onload = () => {
  createNewLetterStrokes();
  resetCurrentStrokes();

  currentLetterIndex = 0;
  currentStrokeIndex = 0;
  animateStrokes();
  sampleStrokePoints();
  setupTracing();

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      document.querySelector("#nextButton")?.click();
    } else if (event.key === "ArrowLeft") {
      document.querySelector("#previousButton")?.click();
    } else if (event.key.toLowerCase() === "c") {
      document.querySelector("#clearButton")?.click();
    }
  });
};