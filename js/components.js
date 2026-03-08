function injectHeader() {
  const headerHTML = `
    <header id="header" class="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 md:h-20">
          <!-- Logo -->
          <div class="flex items-center gap-2 cursor-pointer" onclick="navigateTo('home')">
            <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span class="text-white font-bold text-lg md:text-xl">K</span>
            </div>
            <div>
              <h1 id="logo-text" class="font-display font-bold text-lg md:text-xl text-text">KNI Global Tours</h1>
              <p id="tagline-text" class="text-xs text-primary hidden sm:block">Your Gateway to Unforgettable Asian Experiences</p>
            </div>
          </div>
          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center gap-8">
            <a onclick="navigateTo('home')" class="nav-link text-text hover:text-primary cursor-pointer font-medium">Home</a>
            <a onclick="navigateTo('about')" class="nav-link text-text hover:text-primary cursor-pointer font-medium">About Us</a>
            <!-- Holiday Packages Dropdown -->
            <div class="relative group">
              <a onclick="navigateTo('packages')" class="nav-link text-text hover:text-primary cursor-pointer font-medium flex items-center gap-1">
                Holiday Packages
                <svg class="w-4 h-4 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewbox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
              <div class="absolute left-0 top-full pt-2 w-56 bg-surface rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="p-4 space-y-2">
                  <a onclick="viewDestination('japan');" class="block px-4 py-2.5 text-gray-700 hover:text-primary hover:bg-background rounded-lg cursor-pointer transition-colors">
                    <span class="font-semibold">🗾 Japan Packages</span>
                    <p class="text-xs text-gray-500">Tokyo, Kyoto & Beyond</p>
                  </a>
                  <a onclick="viewDestination('india');" class="block px-4 py-2.5 text-gray-700 hover:text-primary hover:bg-background rounded-lg cursor-pointer transition-colors">
                    <span class="font-semibold">🇮🇳 India Packages</span>
                    <p class="text-xs text-gray-500">Taj Mahal & Heritage</p>
                  </a>
                </div>
              </div>
            </div>
            <!-- Theme Packages Dropdown -->
            <div class="relative group">
              <a onclick="navigateTo('themes')" class="nav-link text-text hover:text-primary cursor-pointer font-medium flex items-center gap-1">
                Theme Packages
                <svg class="w-4 h-4 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewbox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
              <div class="absolute left-0 top-full pt-2 w-64 bg-surface rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="p-4 space-y-2">
                  <a onclick="showThemePackages('honeymoon');" class="block px-4 py-2.5 text-gray-700 hover:text-primary hover:bg-background rounded-lg cursor-pointer transition-colors">
                    <span class="font-semibold">💑 Honeymoon</span>
                    <p class="text-xs text-gray-500">Romantic Escapes</p>
                  </a>
                  <a onclick="showThemePackages('family');" class="block px-4 py-2.5 text-gray-700 hover:text-primary hover:bg-background rounded-lg cursor-pointer transition-colors">
                    <span class="font-semibold">👨‍👩‍👧‍👦 Family Tours</span>
                    <p class="text-xs text-gray-500">Fun for All Ages</p>
                  </a>
                  <a onclick="showThemePackages('solo');" class="block px-4 py-2.5 text-gray-700 hover:text-primary hover:bg-background rounded-lg cursor-pointer transition-colors">
                    <span class="font-semibold">🎒 Solo Travel</span>
                    <p class="text-xs text-gray-500">Self Discovery</p>
                  </a>
                  <a onclick="showThemePackages('group');" class="block px-4 py-2.5 text-gray-700 hover:text-primary hover:bg-background rounded-lg cursor-pointer transition-colors">
                    <span class="font-semibold">👥 Group Tours</span>
                    <p class="text-xs text-gray-500">Travel Together</p>
                  </a>
                  <a onclick="showThemePackages('multi-country');" class="block px-4 py-2.5 text-gray-700 hover:text-primary hover:bg-background rounded-lg cursor-pointer transition-colors">
                    <span class="font-semibold">🌏 Japan + India</span>
                    <p class="text-xs text-gray-500">Epic Combo</p>
                  </a>
                </div>
              </div>
            </div>
            <a onclick="navigateTo('blogs')" class="nav-link text-text hover:text-primary cursor-pointer font-medium">Blogs</a>
            <a onclick="navigateTo('contact')" class="nav-link text-text hover:text-primary cursor-pointer font-medium">Contact Us</a>
          </nav>
          <!-- CTA Button -->
          <div class="hidden md:block">
            <button onclick="navigateTo('contact')" class="btn-primary px-6 py-2.5 rounded-full font-semibold text-sm"> Plan Your Trip </button>
          </div>
          <!-- Mobile Menu Button -->
          <button id="mobile-menu-btn" onclick="toggleMobileMenu()" class="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg class="w-6 h-6 text-text" fill="none" stroke="currentColor" viewbox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      <!-- Mobile Menu -->
      <div id="mobile-menu" class="hidden lg:hidden bg-surface border-t">
        <div class="px-4 py-4 space-y-3">
          <a onclick="navigateTo('home'); toggleMobileMenu()" class="block py-2 text-text hover:text-primary cursor-pointer font-medium">Home</a>
          <a onclick="navigateTo('about'); toggleMobileMenu()" class="block py-2 text-text hover:text-primary cursor-pointer font-medium">About Us</a>
          <a onclick="navigateTo('packages'); toggleMobileMenu()" class="block py-2 text-text hover:text-primary cursor-pointer font-medium">Holiday Packages</a>
          <a onclick="navigateTo('themes'); toggleMobileMenu()" class="block py-2 text-text hover:text-primary cursor-pointer font-medium">Theme Packages</a>
          <a onclick="navigateTo('blogs'); toggleMobileMenu()" class="block py-2 text-text hover:text-primary cursor-pointer font-medium">Blogs</a>
          <a onclick="navigateTo('contact'); toggleMobileMenu()" class="block py-2 text-text hover:text-primary cursor-pointer font-medium">Contact Us</a>
          <button onclick="navigateTo('contact'); toggleMobileMenu()" class="w-full btn-primary px-6 py-3 rounded-full font-semibold mt-4"> Plan Your Trip </button>
        </div>
      </div>
    </header>
  `;
  const headerContainer = document.getElementById('header-placeholder');
  if (headerContainer) headerContainer.innerHTML = headerHTML;
}

function injectFooter() {
  const footerHTML = `
    <footer class="bg-text text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <!-- Company Info -->
          <div>
            <div class="flex items-center gap-2 mb-6">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span class="text-white font-bold text-lg">K</span>
              </div>
              <h3 id="footer-company-name" class="font-display font-bold text-xl">KNI Global Tours</h3>
            </div>
            <p class="text-gray-400 mb-6">Your trusted partner for unforgettable journeys to Japan and India. Creating memories since 2010.</p>
            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"> <span class="text-lg">📘</span> </a>
              <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"> <span class="text-lg">📸</span> </a>
              <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"> <span class="text-lg">🐦</span> </a>
              <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"> <span class="text-lg">▶️</span> </a>
            </div>
          </div>
          <!-- Quick Links -->
          <div>
            <h4 class="font-semibold text-lg mb-6">Quick Links</h4>
            <ul class="space-y-3">
              <li><a onclick="navigateTo('home')" class="text-gray-400 hover:text-white cursor-pointer transition-colors">Home</a></li>
              <li><a onclick="navigateTo('about')" class="text-gray-400 hover:text-white cursor-pointer transition-colors">About Us</a></li>
              <li><a onclick="navigateTo('packages')" class="text-gray-400 hover:text-white cursor-pointer transition-colors">Holiday Packages</a></li>
              <li><a onclick="navigateTo('themes')" class="text-gray-400 hover:text-white cursor-pointer transition-colors">Theme Packages</a></li>
              <li><a onclick="navigateTo('blogs')" class="text-gray-400 hover:text-white cursor-pointer transition-colors">Travel Blog</a></li>
              <li><a onclick="navigateTo('contact')" class="text-gray-400 hover:text-white cursor-pointer transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <!-- Destinations -->
          <div>
            <h4 class="font-semibold text-lg mb-6">Destinations</h4>
            <ul class="space-y-3">
              <li><a onclick="viewDestination('japan')" class="text-gray-400 hover:text-white cursor-pointer transition-colors">Japan Packages</a></li>
              <li><a onclick="viewDestination('india')" class="text-gray-400 hover:text-white cursor-pointer transition-colors">India Packages</a></li>
              <li><a onclick="showThemePackages('honeymoon')" class="text-gray-400 hover:text-white cursor-pointer transition-colors">Honeymoon Tours</a></li>
              <li><a onclick="showThemePackages('family')" class="text-gray-400 hover:text-white cursor-pointer transition-colors">Family Tours</a></li>
              <li><a onclick="showThemePackages('group')" class="text-gray-400 hover:text-white cursor-pointer transition-colors">Group Tours</a></li>
            </ul>
          </div>
          <!-- Contact -->
          <div>
            <h4 class="font-semibold text-lg mb-6">Contact Us</h4>
            <ul class="space-y-3 text-gray-400">
              <li class="flex items-center gap-2"><span>📧</span> <span id="footer-email">info@kniglobaltours.com</span></li>
              <li class="flex items-center gap-2"><span>📞</span> <span id="footer-phone">+1 234 567 8900</span></li>
              <li class="flex items-center gap-2"><span>⏰</span> <span>Mon-Fri: 9AM-6PM EST</span></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-gray-400 text-sm">© 2024 KNI Global Tours. All rights reserved.</p>
          <div class="flex gap-6 text-sm text-gray-400">
            <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" class="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  `;
  const footerContainer = document.getElementById('footer-placeholder');
  if (footerContainer) footerContainer.innerHTML = footerHTML;
}

document.addEventListener('DOMContentLoaded', () => {
  injectHeader();
  injectFooter();
});
