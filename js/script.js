// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');
// ketika hamburger menu di klik
document.querySelector('#hamburger-menu').onclick = () => {
  navbarNav.classList.toggle('active');
};

// Toggle class active untuk search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = (e) => {
  searchForm.classList.toggle('active');
  searchBox.focus();
  e.preventDefault();
};

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
  shoppingCart.classList.toggle('active');
  e.preventDefault();
};

// Klik di luar elemen
const hm = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove('active');
  }

  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove('active');
  }
});

// Modal Box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = 'flex';
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector('.modal .close-icon').onclick = (e) => {
  itemDetailModal.style.display = 'none';
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = 'none';
  }
};

const menuRow = document.querySelector('.menu .row');
const menuSection = document.querySelector('.menu');

if (menuRow && menuSection) {
  const scrollAmount = 250; 

  menuSection.addEventListener('click', function (e) {
    const rect = menuSection.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    if (clickX < rect.width * 0.08) {
      menuRow.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }

    else if (clickX > rect.width * 0.92) {
      menuRow.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  });
}

// ==========================================================================
// KODE TAMBAHAN BARU (UNTUK PENAMBAHAN FITUR TANPA MENGUBAH KODE DI ATAS)
// ==========================================================================

// 1. INISIALISASI: AOS Animation
AOS.init({
  once: true, 
  offset: 120,
});

// 2. INTERAKSI: Logika Switch Dark Mode & Light Mode
const darkModeBtn = document.querySelector('#dark-mode-button');
if (darkModeBtn) {
  darkModeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    document.body.classList.toggle('light-theme');
    
    // Ganti Ikon Dinamis saat Diklik
    const icon = darkModeBtn.querySelector('i');
    if (document.body.classList.contains('light-theme')) {
      icon.setAttribute('data-feather', 'sun');
    } else {
      icon.setAttribute('data-feather', 'moon');
    }
    feather.replace();
  });
}

// 3. INTERAKSI: Logika FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
  question.addEventListener('click', function() {
    this.classList.toggle('active');
    const answer = this.nextElementSibling;
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// 4. INTERAKSI: Logika Tombol Back to Top
const backToTopBtn = document.querySelector('#backToTop');
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}

backToTopBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// 5. INTERAKSI: Logika Counter Animation (Statistik Dinamis)
const counters = document.querySelectorAll('.counter-number');
const speed = 200;

const startCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target + "+";
      }
    };
    updateCount();
  });
};

// Memicu Counter hanya saat Section terlihat dilayar
const counterSectionObserver = document.querySelector('#counter');
if (counterSectionObserver) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(counterSectionObserver);
}

// 6. Penanganan Form Kontak & Shopping Cart lama
// const contactForm = document.querySelector('.contact form');
// if (contactForm) {
//   contactForm.addEventListener('submit', function (e) {
//     e.preventDefault();
//     const nameInput = contactForm.querySelector('input[placeholder="nama"]');
//     if (!nameInput.value.trim()) {
//       alert('Mohon lengkapi data!');
//       return;
//     }
//     alert(`Terima kasih, ${nameInput.value}! Pesan Anda dikirim.`);
//     contactForm.reset();
//   });
// }

const cartItemsContainer = document.querySelector('.shopping-cart');
if (cartItemsContainer) {
  cartItemsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
      const cartItem = e.target.closest('.cart-item');
      if (cartItem) {
        cartItem.remove();
      }
    }
  });
}