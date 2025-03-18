// Array to store points for drawing
let points = [];
let symmetry = 8; // Number of symmetry lines
let currentColor; // Global variable for color
let rotationAngle = 0; // Track rotation angle
let speedSlider; // Slider for rotation speed
let symmetrySlider; // Slider for symmetry number

// This function runs once at the start
function setup() {
    // Create a canvas that's 400x400 pixels in WEBGL mode
    createCanvas(400, 400, WEBGL);
    
    // Set the background color to white
    background(255);
    
    // Set initial drawing style
    strokeWeight(2);
    currentColor = color(random(255), random(255), random(255));
    
    // Create sliders
    createSliders();
}

// Function to create sliders
function createSliders() {
    // Create speed slider
    speedSlider = createSlider(0, 0.1, 0.02, 0.001);
    speedSlider.position(10, 10);
    speedSlider.style('width', '100px');
    
    // Create symmetry slider
    symmetrySlider = createSlider(2, 16, 8, 1);
    symmetrySlider.position(10, 30);
    symmetrySlider.style('width', '100px');
    
    // Add labels
    let speedLabel = createP('Rotation Speed');
    speedLabel.position(120, 10);
    speedLabel.style('font-size', '12px');
    
    let symmetryLabel = createP('Symmetry');
    symmetryLabel.position(120, 30);
    symmetryLabel.style('font-size', '12px');
}

// This function runs when the mouse is pressed
function mousePressed() {
    // Clear the points array when starting a new drawing
    points = [];
    currentColor = color(random(255), random(255), random(255));
}

// This function runs when the mouse is dragged
function mouseDragged() {
    // Add current point to the array with z-coordinate
    points.push({
        x: mouseX - width/2,
        y: mouseY - height/2,
        z: random(-50, 50) // Random depth for 3D effect
    });
}

// This function runs continuously after setup
function draw() {
    // Fade background for trail effect
    background(255, 10);
    
    // Update symmetry from slider
    symmetry = symmetrySlider.value();
    
    // Set up 3D environment
    ambientLight(60);
    directionalLight(255, 255, 255, 0, 0, -1);
    
    // Draw symmetry lines
    stroke(200);
    strokeWeight(1);
    for (let i = 0; i < symmetry; i++) {
        let angle = (TWO_PI / symmetry) * i;
        line(0, 0, 0, cos(angle) * width, sin(angle) * width, 0);
    }
    
    // Draw the pattern
    if (points.length > 0) {
        // Draw for each symmetry line
        for (let i = 0; i < symmetry; i++) {
            push();
            // Add rotation animation
            rotateZ((TWO_PI / symmetry) * i + rotationAngle);
            
            // Draw the points with 3D effect
            stroke(currentColor);
            strokeWeight(2);
            
            beginShape();
            for (let p of points) {
                vertex(p.x, p.y, p.z);
            }
            endShape();
            
            // Add depth lines
            stroke(currentColor, 100);
            for (let j = 0; j < points.length - 1; j++) {
                let p1 = points[j];
                let p2 = points[j + 1];
                line(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
            }
            
            pop();
        }
        
        // Update rotation angle using slider value
        rotationAngle += speedSlider.value();
    }
    
    // Add some text
    push();
    translate(-width/2, -height/2);
    fill(0);
    textAlign(CENTER);
    textSize(16);
    text('Draw to create 3D symmetric patterns!', width/2, 70);
    text('Click to start a new pattern', width/2, 90);
    pop();
} 