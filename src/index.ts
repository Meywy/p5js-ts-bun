import "p5"; 

interface MenuItem { 
  index: number; 
  name: string; 
} 

const menuItems: MenuItem[] = [ 
  { index: 1, name: "Linky" }, 
  { index: 2, name: "Čáry máry" }, 
  { index: 3, name: "Šachovnice" }, 
  { index: 4, name: "Čtverec" }, 
  { index: 5, name: "Hodiny" }, 
  { index: 6, name: "Tečny" } 
]; 

const effectKeys: string[] = menuItems.map(item => item.index.toString()); 

let selectedEffect: number = 0; 

const squareConfig = { 
  maxSize: 300, 
  minSize: 30, 
  rotationSpeed: 2 
}; 

const checkerBoardConfig = { 
  rows: 12, 
  cols: 12 
}; 

const squareState = { 
  x: 300, 
  y: 300, 
  size: 100, 
  angle: 0, 
  direction: 1, 
  color: null as any, 
  strokeWeight: 1 
}; 

let angle = 0;

function setup(): void { 
  createCanvas(600, 600); 
  background(220); 
  angleMode(DEGREES); 
  
  squareState.x = width / 2; 
  squareState.y = height / 2; 
  squareState.color = color(255, 255, 255); 
} 

function draw(): void { 
  switch (selectedEffect) { 
    case 0: 
      background(220); 
      drawMenu(); 
      break; 
    case 1: 
      drawLines(); 
      break; 
    case 2: 
      drawMagic(); 
      break; 
    case 3: 
      drawCheckerBoard(); 
      break; 
    case 4: 
      drawSquare(); 
      break; 
    case 5: 
      drawClock(); 
      break; 
    case 6: 
      drawTangent(); 
      break; 
  } 
} 

function keyPressed(): void { 
  if (effectKeys.includes(key)) { 
    selectedEffect = Number(key); 
    background(220); 
    return; 
  } 
  
  if (selectedEffect === 4 && (key === '+' || key === '-')) { 
    squareState.size += key === '+' ? 10 : -10; 
    squareState.size = constrain(squareState.size, squareConfig.minSize, squareConfig.maxSize); 
    return; 
  } 
  
  selectedEffect = 0; 
} 

function mousePressed(): void { 
  if (selectedEffect !== 4) return; 
  
  squareState.x = mouseX; 
  squareState.y = mouseY; 
  squareState.color = color(random(255), random(255), random(255), 180); 
  squareState.strokeWeight = random(1, 10); 
} 

function drawMenu(): void { 
  fill(150, 100, 200, 100); 
  stroke(125); 
  strokeWeight(5); 
  rect(20, 20, 250, 180, 10); 
  
  fill(0); 
  noStroke(); 
  textSize(15); 
  text("MENU - Vyber efekt", 40, 50); 
  
  stroke(0); 
  strokeWeight(1); 
  line(40, 60, 170, 60); 
  
  noStroke(); 
  menuItems.forEach((item, i) => { 
    text(`${item.index} - ${item.name}`, 40, 80 + i * 20); 
  }); 
} 

function drawLines(): void { 
  if (frameCount % 10 !== 0) return; 
  
  for (let i = 0; i < 5; i++) { 
    const x = random(width); 
    
    stroke(0); 
    strokeWeight(random(1, 10)); 
    line(x, 0, x, height); 
  } 
} 

function drawMagic(): void { 
  for (let i = 0; i < 2; i++) { 
    const x1 = random(width); 
    const y1 = random(height); 
    const x2 = random(width); 
    const y2 = random(height); 

    stroke(random(255), random(255), random(255), 180); 
    strokeWeight(random(1, 4)); 
    line(x1, y1, x2, y2); 
  } 
} 

function drawCheckerBoard(): void { 
  const tileSize = width / checkerBoardConfig.cols; 
  
  noStroke(); 
  for (let r = 0; r < checkerBoardConfig.rows; r++) { 
    for (let c = 0; c < checkerBoardConfig.cols; c++) { 
      fill((r + c) % 2 === 0 ? 255 : 0); 
      rect(c * tileSize, r * tileSize, tileSize, tileSize); 
    } 
  } 
} 

function drawSquare(): void { 
  background(220); 

  fill(0); 
  noStroke(); 
  textSize(12); 
  text(frameCount, 10, 20); 
  
  squareState.angle += squareConfig.rotationSpeed * squareState.direction; 
  if (frameCount % 100 === 0) { 
    squareState.direction *= -1; 
  } 
  
  push(); 
  rectMode(CENTER); 
  translate(squareState.x, squareState.y); 
  rotate(squareState.angle); 
  
  fill(squareState.color); 
  stroke(0); 
  strokeWeight(squareState.strokeWeight); 
  square(0, 0, squareState.size); 
  pop(); 
} 

function drawClock(): void { 
  background(220); 

  const r = 200; 
  const sc = second(); 
  const mn = minute() + sc / 60; 
  const hr = (hour() % 12) + mn / 60; 

  push(); 
  translate(width / 2, height / 2); 

  stroke(0); 
  strokeWeight(4); 
  fill(255); 
  circle(0, 0, r * 2); 

  strokeWeight(3); 
  for (let a = 0; a < 12; a++) { 
    rotate(30); 
    line(r - 15, 0, r - 5, 0); 
  } 

  noStroke(); 
  fill(0); 
  textSize(18); 
  textAlign(CENTER, CENTER); 
  for (let i = 1; i <= 12; i++) { 
    const a = i * 30 - 90; 
    text(i, cos(a) * (r - 35), sin(a) * (r - 35)); 
  } 

  const drawHand = (deg: number, len: number, weight: number, col: any, tail = 0): void => { 
    push(); 
    rotate(deg); 
    stroke(col); 
    strokeWeight(weight); 
    line(-tail, 0, len, 0); 
    pop(); 
  }; 

  drawHand(hr * 30 - 90, r * 0.5, 6, 0); 
  drawHand(mn * 6 - 90, r * 0.75, 4, 0); 
  drawHand(sc * 6 - 90, r * 0.85, 2, color(220, 0, 0), 20); 

  fill(0); 
  noStroke(); 
  circle(0, 0, 10); 

  pop(); 
} 

function tendon(angleVal: number): void { 
  const polomer = min(width, height) / 2 - 5; 
  const stredX = width / 2; 
  const stredY = height / 2; 

  const x1 = Math.cos(angleVal * Math.PI / 180) * polomer + stredX; 
  const y1 = Math.sin(angleVal * Math.PI / 180) * polomer + stredY; 

  const x2 = Math.cos((angleVal + 60) * Math.PI / 180) * polomer + stredX; 
  const y2 = Math.sin((angleVal + 60) * Math.PI / 180) * polomer + stredY; 
  
  colorMode(HSB); 
  stroke(angleVal * 255 / 360, 255, 255); 
  line(x1, y1, x2, y2); 
} 

function drawTangent(): void { 
  background(255); 
  stroke(0); 
  strokeWeight(10); 

  for (let angleTendon = angle; angleTendon < angle + 360; angleTendon += 10) { 
    tendon(angleTendon); 
  } 

  angle += 5; 
  angle %= 360; 
  colorMode(RGB); 
} 

Object.assign(window, { setup, draw, keyPressed, mousePressed });
