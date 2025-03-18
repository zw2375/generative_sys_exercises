// Array to store faces
let faces = [];
const NUM_FACES = 5;

// This function runs once at the start
function setup() {
    createCanvas(800, 600);
    background(26, 26, 26);
    
    // Create faces
    for (let i = 0; i < NUM_FACES; i++) {
        faces.push({
            x: random(width),
            y: random(height),
            size: random(50, 100),
            speedX: random(-3, 3),
            speedY: random(-3, 3),
            rotation: random(TWO_PI),
            rotationSpeed: random(-0.05, 0.05),
            expression: random(['happy', 'sad', 'crazy', 'surprised']),
            color: color(random(255), random(255), random(255)),
            eyeSize: random(10, 20),
            mouthSize: random(20, 40),
            // Animation parameters
            eyeStretch: 0,
            eyeStretchSpeed: random(0.02, 0.05),
            eyeStretchDirection: 1,
            mouthStretch: 0,
            mouthStretchSpeed: random(0.02, 0.05),
            mouthStretchDirection: 1,
            animationOffset: random(TWO_PI) // Offset for different animation timing
        });
    }
}

// This function runs continuously after setup
function draw() {
    // Fade background for trail effect
    background(26, 26, 26, 50);
    
    // Update and draw faces
    for (let face of faces) {
        // Update position
        face.x += face.speedX;
        face.y += face.speedY;
        face.rotation += face.rotationSpeed;
        
        // Update animation parameters
        face.eyeStretch += face.eyeStretchSpeed * face.eyeStretchDirection;
        face.mouthStretch += face.mouthStretchSpeed * face.mouthStretchDirection;
        
        // Reverse direction when reaching limits
        if (face.eyeStretch > 1 || face.eyeStretch < 0) {
            face.eyeStretchDirection *= -1;
        }
        if (face.mouthStretch > 1 || face.mouthStretch < 0) {
            face.mouthStretchDirection *= -1;
        }
        
        // Bounce off edges
        if (face.x < face.size/2 || face.x > width - face.size/2) {
            face.speedX *= -1;
        }
        if (face.y < face.size/2 || face.y > height - face.size/2) {
            face.speedY *= -1;
        }
        
        // Draw face
        push();
        translate(face.x, face.y);
        rotate(face.rotation);
        
        // Face body
        fill(face.color);
        noStroke();
        circle(0, 0, face.size);
        
        // Animated eyes
        fill(255);
        let eyeStretchX = lerp(face.eyeSize, face.eyeSize * 2, face.eyeStretch);
        let eyeStretchY = lerp(face.eyeSize, face.eyeSize * 0.5, face.eyeStretch);
        ellipse(-face.size/4, -face.size/6, eyeStretchX, eyeStretchY);
        ellipse(face.size/4, -face.size/6, eyeStretchX, eyeStretchY);
        
        // Pupils with stretch effect
        fill(0);
        let pupilX = map(mouseX, 0, width, -face.size/8, face.size/8);
        let pupilY = map(mouseY, 0, height, -face.size/8, face.size/8);
        let pupilStretchX = lerp(face.eyeSize/2, face.eyeSize, face.eyeStretch);
        let pupilStretchY = lerp(face.eyeSize/2, face.eyeSize/4, face.eyeStretch);
        ellipse(-face.size/4 + pupilX, -face.size/6 + pupilY, pupilStretchX, pupilStretchY);
        ellipse(face.size/4 + pupilX, -face.size/6 + pupilY, pupilStretchX, pupilStretchY);
        
        // Animated mouth based on expression
        fill(255, 150, 150);
        let mouthWidth = lerp(face.mouthSize, face.mouthSize * 2, face.mouthStretch);
        let mouthHeight = lerp(face.mouthSize, face.mouthSize * 0.5, face.mouthStretch);
        
        switch(face.expression) {
            case 'happy':
                arc(0, face.size/6, mouthWidth, mouthHeight, 0, PI);
                break;
            case 'sad':
                arc(0, face.size/6, mouthWidth, mouthHeight, PI, TWO_PI);
                break;
            case 'crazy':
                arc(0, face.size/6, mouthWidth, mouthHeight, 0, TWO_PI);
                // Add crazy eyes
                push();
                rotate(PI/4);
                line(-face.size/4, -face.size/4, face.size/4, face.size/4);
                pop();
                break;
            case 'surprised':
                ellipse(0, face.size/6, mouthWidth, mouthHeight);
                break;
        }
        
        pop();
    }

    // Draw instruction text
    push();
    fill(255);
    textAlign(CENTER);
    textSize(24);
    textStyle(BOLD);
    text('Click anywhere to add more faces!', width/2, 50);
    textSize(16);
    textStyle(NORMAL);
    text('Move your mouse to make eyes follow', width/2, 80);
    pop();
}

// This function runs when the mouse is pressed
function mousePressed() {
    // Add a new face at mouse position
    faces.push({
        x: mouseX,
        y: mouseY,
        size: random(50, 100),
        speedX: random(-3, 3),
        speedY: random(-3, 3),
        rotation: random(TWO_PI),
        rotationSpeed: random(-0.05, 0.05),
        expression: random(['happy', 'sad', 'crazy', 'surprised']),
        color: color(random(255), random(255), random(255)),
        eyeSize: random(10, 20),
        mouthSize: random(20, 40),
        // Animation parameters
        eyeStretch: 0,
        eyeStretchSpeed: random(0.02, 0.05),
        eyeStretchDirection: 1,
        mouthStretch: 0,
        mouthStretchSpeed: random(0.02, 0.05),
        mouthStretchDirection: 1,
        animationOffset: random(TWO_PI)
    });
} 