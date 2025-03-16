// Dynamic Image Gallery with Position Swapping
// Author: Claude
// Date: March 16, 2025

// Constants
const SWAP_INTERVAL = 35000; // Time between position changes in ms (35 seconds)

// Functions
function optimizeLayout() {
  const images = document.querySelectorAll('.project-images img');
  const sizeClasses = ['small', 'medium', 'large', 'featured'];
  
  // Reset all size classes
  images.forEach(img => {
    img.classList.remove('small', 'medium', 'large', 'featured');
  });
  
  // Distribution percentages for better layout - more small and medium for denser packing
  const distribution = {
    small: 0.5,     // 50% small images
    medium: 0.35,   // 35% medium images
    large: 0.1,     // 10% large images
    featured: 0.05   // 5% featured images
  };
  
  // Calculate counts
  const totalImages = images.length;
  const counts = {
    small: Math.floor(totalImages * distribution.small),
    medium: Math.floor(totalImages * distribution.medium),
    large: Math.floor(totalImages * distribution.large),
    featured: Math.floor(totalImages * distribution.featured)
  };
  
  // Adjust counts to ensure all images get a class
  const sumCounts = counts.small + counts.medium + counts.large + counts.featured;
  if (sumCounts < totalImages) {
    counts.small += (totalImages - sumCounts);
  }
  
  // Shuffle the images array for random assignment
  const shuffledIndices = [...Array(totalImages).keys()];
  for (let i = shuffledIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
  }
  
  // Assign size classes based on the distribution
  let currentIndex = 0;
  
  // Assign featured images (ensure they're distributed throughout)
  const featuredIndices = shuffledIndices.slice(0, counts.featured);
  featuredIndices.forEach(index => {
    images[index].classList.add('featured');
  });
  currentIndex += counts.featured;
  
  // Assign large images
  const largeIndices = shuffledIndices.slice(currentIndex, currentIndex + counts.large);
  largeIndices.forEach(index => {
    images[index].classList.add('large');
  });
  currentIndex += counts.large;
  
  // Assign medium images
  const mediumIndices = shuffledIndices.slice(currentIndex, currentIndex + counts.medium);
  mediumIndices.forEach(index => {
    images[index].classList.add('medium');
  });
  currentIndex += counts.medium;
  
  // Assign small images (all remaining images)
  const smallIndices = shuffledIndices.slice(currentIndex);
  smallIndices.forEach(index => {
    images[index].classList.add('small');
  });
}

// Swap positions of images within the gallery
function swapPositions() {
  const gallery = document.querySelector('.project-images');
  const images = Array.from(document.querySelectorAll('.project-images img'));
  
  // Don't swap if there are fewer than 2 images
  if (images.length < 2) return;
  
  // Get current grid layout
  const oldOrder = [];
  images.forEach((img, index) => {
    oldOrder[index] = img.style.order || '0';
  });
  
  // Create a new random order
  const newOrder = [];
  for (let i = 0; i < images.length; i++) {
    newOrder[i] = i;
  }
  
  // Shuffle the new order
  for (let i = newOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newOrder[i], newOrder[j]] = [newOrder[j], newOrder[i]];
  }
  
  // Create a smoother, sliding effect animation
  // First, mark the current positions so we can track movement
  images.forEach(img => {
    // Get current position for reference
    const rect = img.getBoundingClientRect();
    img.dataset.originalX = rect.left;
    img.dataset.originalY = rect.top;
    
    // Add a subtle effect to indicate movement is about to happen
    img.style.opacity = '0.92';
    img.style.transform = 'scale(0.98)';
  });
  
  // Apply the new order
  setTimeout(() => {
    // Apply the new order to images - this triggers the main transition
    images.forEach((img, index) => {
      img.style.order = newOrder[index];
    });
    
    // Add a subtle movement effect as images settle into place
    setTimeout(() => {
      images.forEach(img => {
        // Get new position
        const newRect = img.getBoundingClientRect();
        const moveX = (parseFloat(img.dataset.originalX) - newRect.left) * 0.03;
        const moveY = (parseFloat(img.dataset.originalY) - newRect.top) * 0.03;
        
        // Apply a subtle transform to enhance the sliding effect
        img.style.transform = `translate(${moveX}px, ${moveY}px) scale(0.97)`;
        
        // Reset completely after the full animation time
        setTimeout(() => {
          img.style.transform = 'scale(1)';
          img.style.opacity = '1';
        }, 600);
      });
    }, 50);
    
    // Re-optimize size classes occasionally
    if (Math.random() > 0.7) { // 30% chance to re-optimize sizes
      setTimeout(() => {
        optimizeLayout();
      }, 1300); // Wait for the animation to complete
    }
  }, 200);
}

function setupGallery() {
  // Initial layout optimization
  optimizeLayout();
  
  // Setup position swapping interval
  setInterval(() => {
    swapPositions();
  }, SWAP_INTERVAL);
}

function setupModal() {
  // Get the modal elements
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const captionText = document.getElementById('caption');
  const closeBtn = document.getElementsByClassName('close')[0];
  
  // Get all images in the gallery
  const galleryImages = document.querySelectorAll('.project-images img');
  
  // When any image is clicked, open the modal
  galleryImages.forEach(img => {
    img.addEventListener('click', function() {
      modal.style.display = 'flex';
      modalImg.src = this.src;
      // No caption
    });
  });
  
  // Close modal when X is clicked
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  
  // Close modal when clicking outside the image
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

function main() {
  console.log('Dynamic gallery initialized');
  
  // Add a loading effect
  const gallery = document.querySelector('.project-images');
  const images = document.querySelectorAll('.project-images img');
  
  // Set order property for proper swapping
  images.forEach((img, index) => {
    img.style.order = index;
  });
  
  // Hide all images initially
  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.8)';
    img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    // Ensure images are loaded before revealing them
    img.onload = function() {
      this.dataset.loaded = 'true';
    };
    
    // Set the src attribute to itself to trigger the onload event for cached images
    if (img.complete) {
      img.dataset.loaded = 'true';
    } else {
      const src = img.src;
      img.src = src;
    }
  });
  
  // Reveal images gradually
  setTimeout(() => {
    images.forEach((img, index) => {
      setTimeout(() => {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
      }, index * 40); // Stagger the appearance
    });
  }, 300);
  
  setupGallery();
  setupModal();
  
  // Add resize handler
  window.addEventListener('resize', function() {
    // Re-optimize layout on window resize
    optimizeLayout();
  });
}

// Start when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', main);