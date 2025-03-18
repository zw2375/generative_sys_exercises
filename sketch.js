// Array to store points for drawing
let points = [];
let symmetry = 8; // Number of symmetry lines
let currentColor; // Global variable for color
let rotationAngle = 0; // Track rotation angle
let speedSlider; // Slider for rotation speed
let symmetrySlider; // Slider for symmetry number

// This function runs once at the start
function setup() {
    // Create a canvas that's 400x400 pixels
    createCanvas(400, 400);
    
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
    
    // Add labels
    let speedLabel = createP('Rotation Speed');
    speedLabel.position(120, 10);
    speedLabel.style('font-size', '12px');
}

// This function runs when the mouse is pressed
function mousePressed() {
    // Clear the points array when starting a new drawing
    points = [];
    currentColor = color(random(255), random(255), random(255));
}

// This function runs when the mouse is dragged
function mouseDragged() {
    // Add current point to the array
    points.push({
        x: mouseX - width/2,
        y: mouseY - height/2
    });
}

// This function runs continuously after setup
function draw() {
    // Translate to center of canvas
    translate(width/2, height/2);
    
    
    // Draw the pattern
    if (points.length > 0) {
        // Draw for each symmetry line
        for (let i = 0; i < symmetry; i++) {
            push();
            // Add rotation animation
            rotate((TWO_PI / symmetry) * i + rotationAngle);
            
            // Random stroke width for each segment
            strokeWeight(random(1, 5));
            // Use the current color
            stroke(currentColor);
            
            beginShape();
            for (let p of points) {
                vertex(p.x, p.y);
            }
            endShape();
            
            pop();
        }
        
        // Update rotation angle using slider value
        rotationAngle += speedSlider.value();
    }
    
} 