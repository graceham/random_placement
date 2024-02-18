document.addEventListener('DOMContentLoaded', function () {
  const textContainer = document.getElementById('textContainer');
  const linesOfText = [
    'Wim Crouwel',
    'A Graphic Odyssey',
    'The Design Museum',
     '7 November 2016 – 3 July 2017',
    '224–238 Kensington High Street',
    'London',
    'W8 6AG',
    'High Street Kensington',
    'Open daily 10am – 6pm',
    'Last admission 5pm',
    '+44 20 3862 5900',
    'www.designmuseum.org',
  ];

  
  function getRandomCoordinate(element) {
    // Measure the element's dimensions
    const rect = element.getBoundingClientRect();

    // Adjust coordinates to keep the element within the viewport
    const x = Math.floor(Math.random() * (window.innerWidth - rect.width));
    const y = Math.floor(Math.random() * (window.innerHeight - rect.height));
    
    return { x, y };
  }

  function getRandomFontSize() {
    const fontSizes = ['16px', '35px', '60px'];
    const randomIndex = Math.floor(Math.random() * fontSizes.length);
    return fontSizes[randomIndex];
  }

  function checkCollision(element, otherElements) {
    const rect1 = element.getBoundingClientRect();
    for (let i = 0; i < otherElements.length; i++) {
      const rect2 = otherElements[i].getBoundingClientRect();
      if (!(rect1.right < rect2.left || 
            rect1.left > rect2.right || 
            rect1.bottom < rect2.top || 
            rect1.top > rect2.bottom)) {
        return true; // Collision detected
      }
    }
    return false; // No collision
  }

  function updateTextPositions() {
    const elements = Array.from(document.getElementsByClassName('text-line'));
    elements.forEach((element, index) => {
      let coordinate, fontSize, collision;
      do {
        fontSize = getRandomFontSize();
        element.style.fontSize = fontSize;

        // Temporarily add to the DOM for measurement
        textContainer.appendChild(element);
        coordinate = getRandomCoordinate(element);

        element.style.left = `${coordinate.x}px`;
        element.style.top = `${coordinate.y}px`;

        collision = checkCollision(element, elements.slice(0, index));
      } while (collision); // Keep trying until no collision
    });
  }

  function createTextElements() {
    linesOfText.forEach((line, index) => {
      const textElement = document.createElement('div');
      textElement.textContent = line;
      textElement.className = 'text-line';
      textElement.id = `text${index}`;
      textContainer.appendChild(textElement);
    });
  }

  createTextElements();
  setTimeout(updateTextPositions, 100); // Delay to ensure text is rendered for size measurements

  setInterval(updateTextPositions, 6000); // Update positions every 6 seconds
});
