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

// 1. Fitur Validasi dan Notifikasi Formulir Kontak
const contactForm = document.querySelector('.contact form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameInput = contactForm.querySelector('input[placeholder="nama"]');
    const emailInput = contactForm.querySelector('input[placeholder="email"]');
    const phoneInput = contactForm.querySelector('input[placeholder="no hp"]');

    if (!nameInput.value.trim() || !emailInput.value.trim() || !phoneInput.value.trim()) {
      alert('Mohon lengkapi semua data formulir kontak sebelum mengirim pesan!');
      return;
    }

    alert(`Terima kasih, ${nameInput.value}! Pesan Anda berhasil dikirim.`);
    contactForm.reset();
  });
}

// 2. Fitur Interaktif Menghapus Item dari Shopping Cart
const cartItemsContainer = document.querySelector('.shopping-cart');
if (cartItemsContainer) {
  cartItemsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
      const cartItem = e.target.closest('.cart-item');
      if (cartItem) {
        cartItem.style.transition = 'all 0.3s ease';
        cartItem.style.opacity = '0';
        cartItem.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
          cartItem.remove();
          const remainingItems = cartItemsContainer.querySelectorAll('.cart-item');
          if (remainingItems.length === 0) {
            cartItemsContainer.innerHTML = '<p style="padding: 2rem; text-align: center; font-size: 1.4rem;">Keranjang belanja Anda kosong.</p>';
          }
        }, 300);
      }
    }
  });
}