/**
 * Dynamic Gallery - Reusable gallery component with position swapping animations
 * Author: Claude
 * Date: March 16, 2025
 */

/**
 * Initialize a dynamic gallery with the given selector
 * @param {string} gallerySelector - CSS selector for the gallery container
 * @param {Object} options - Configuration options
 */
function initDynamicGallery(gallerySelector = '.dynamic-gallery', options = {}) {
  // Default options
  const defaults = {
    swapInterval: 35000, // Time between position changes in ms
    sizingRatio: {
      small: 0.5,     // 50% small images
      medium: 0.35,   // 35% medium images
      large: 0.1,     // 10% large images
      featured: 0.05   // 5% featured images
    },
    enableModal: true, // Enable lightbox functionality
    enableSizeClasses: true, // Enable different size classes
    enableAnimations: true, // Enable transition animations
  };

  // Merge default options with user options
  const settings = { ...defaults, ...options };
  
  // Get the gallery container
  const gallery = document.querySelector(gallerySelector);
  if (!gallery) {
    console.warn(`Gallery not found with selector: ${gallerySelector}`);
    return;
  }
  
  // Get all images in the gallery
  const images = Array.from(gallery.querySelectorAll('img'));
  if (images.length === 0) {
    console.warn('No images found in gallery');
    return;
  }
  
  // If using size classes, add them to the relevant classes
  if (settings.enableSizeClasses) {
    optimizeLayout(images, settings.sizingRatio);
  }
  
  // Set up swapping interval
  if (settings.swapInterval > 0) {
    setInterval(() => {
      swapPositions(images, settings.sizingRatio, settings.enableSizeClasses);
    }, settings.swapInterval);
  }
  
  // Set up modal/lightbox if enabled
  if (settings.enableModal) {
    setupModal(images);
  }
  
  // Initial setup with loading animation
  setupInitialState(images);
}

/**
 * Set up the initial state of the gallery with loading animations
 * @param {Array} images - Array of image elements 
 */
function setupInitialState(images) {
  // Set order property for proper swapping
  images.forEach((img, index) => {
    img.style.order = index;
  });
  
  // Hide all images initially
  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.8)';
    img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
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
}

/**
 * Optimize the layout by assigning size classes to images
 * @param {Array} images - Array of image elements
 * @param {Object} sizingRatio - Ratio of image sizes
 */
function optimizeLayout(images, sizingRatio) {
  const sizeClasses = ['small', 'medium', 'large', 'featured'];
  
  // Reset all size classes
  images.forEach(img => {
    img.classList.remove('small', 'medium', 'large', 'featured');
  });
  
  // Calculate counts
  const totalImages = images.length;
  const counts = {
    small: Math.floor(totalImages * sizingRatio.small),
    medium: Math.floor(totalImages * sizingRatio.medium),
    large: Math.floor(totalImages * sizingRatio.large),
    featured: Math.floor(totalImages * sizingRatio.featured)
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
  
  // Assign featured images
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

/**
 * Swap positions of images within the gallery
 * @param {Array} images - Array of image elements
 * @param {Object} sizingRatio - Ratio of image sizes
 * @param {boolean} enableSizeClasses - Whether to use size classes
 */
function swapPositions(images, sizingRatio, enableSizeClasses) {
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
    if (enableSizeClasses && Math.random() > 0.7) { // 30% chance to re-optimize sizes
      setTimeout(() => {
        optimizeLayout(images, sizingRatio);
      }, 1300); // Wait for the animation to complete
    }
  }, 200);
}

/**
 * Set up the modal/lightbox for the gallery
 * @param {Array} images - Array of image elements
 */
function setupModal(images) {
  // Check if modal exists, if not create it
  let modal = document.getElementById('galleryModal');
  let modalImg, closeBtn;
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'galleryModal';
    modal.className = 'modal';
    
    closeBtn = document.createElement('span');
    closeBtn.className = 'close';
    closeBtn.innerHTML = '&times;';
    
    modalImg = document.createElement('img');
    modalImg.className = 'modal-content';
    modalImg.id = 'modalImage';
    
    const caption = document.createElement('div');
    caption.className = 'caption';
    caption.id = 'caption';
    
    modal.appendChild(closeBtn);
    modal.appendChild(modalImg);
    modal.appendChild(caption);
    
    document.body.appendChild(modal);
  } else {
    modalImg = document.getElementById('modalImage');
    closeBtn = modal.querySelector('.close');
  }
  
  // When any image is clicked, open the modal
  images.forEach(img => {
    img.addEventListener('click', function() {
      modal.style.display = 'flex';
      modalImg.src = this.src;
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
  
  // Close on escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'flex') {
      modal.style.display = 'none';
    }
  });
}

// Auto-initialize galleries when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Find all galleries with the default class
  const galleries = document.querySelectorAll('.dynamic-gallery');
  
  if (galleries.length > 0) {
    galleries.forEach((gallery, index) => {
      // Use the data attributes for configuration if available
      const swapInterval = gallery.dataset.swapInterval !== undefined 
        ? parseInt(gallery.dataset.swapInterval, 10) 
        : 35000;
        
      const enableModal = gallery.dataset.enableModal !== undefined 
        ? gallery.dataset.enableModal !== 'false' 
        : true;
        
      const enableSizeClasses = gallery.dataset.enableSizeClasses !== undefined 
        ? gallery.dataset.enableSizeClasses !== 'false' 
        : true;
      
      // Create a unique selector for this gallery
      const selector = gallery.id ? `#${gallery.id}` : `.dynamic-gallery:nth-of-type(${index + 1})`;
      
      // Initialize this gallery
      initDynamicGallery(selector, {
        swapInterval,
        enableModal,
        enableSizeClasses
      });
    });
  }
});