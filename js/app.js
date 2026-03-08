// App logic
let currentPage = 'home';
let pageHistory = ['home'];

// Update UI based on config
function updateUI() {
  const cfg = typeof config !== 'undefined' ? config : defaultConfig;
  
  const bgColor = cfg.background_color || defaultConfig.background_color;
  const surfaceColor = cfg.surface_color || defaultConfig.surface_color;
  const textColor = cfg.text_color || defaultConfig.text_color;
  const primaryColor = cfg.primary_color || defaultConfig.primary_color;
  const secondaryColor = cfg.secondary_color || defaultConfig.secondary_color;

  document.documentElement.style.setProperty('--color-background', bgColor);
  document.documentElement.style.setProperty('--color-surface', surfaceColor);
  document.documentElement.style.setProperty('--color-text', textColor);
  document.documentElement.style.setProperty('--color-primary', primaryColor);
  document.documentElement.style.setProperty('--color-secondary', secondaryColor);

  // Update text content
  const logoText = document.getElementById('logo-text');
  if (logoText) logoText.textContent = cfg.company_name || defaultConfig.company_name;

  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) {
    const title = cfg.hero_title || defaultConfig.hero_title;
    heroTitle.innerHTML = title.replace('Japan', '<span class="text-primary">Japan</span>').replace('India', '<span class="text-secondary">India</span>');
  }

  const heroSubtitle = document.getElementById('hero-subtitle');
  if (heroSubtitle) heroSubtitle.textContent = cfg.hero_subtitle || defaultConfig.hero_subtitle;

  const contactEmail = document.getElementById('contact-email-display');
  if (contactEmail) contactEmail.textContent = cfg.contact_email || defaultConfig.contact_email;

  const taglineText = document.getElementById('tagline-text');
  if (taglineText) taglineText.textContent = cfg.company_tagline || defaultConfig.company_tagline;

  const footerCompanyName = document.getElementById('footer-company-name');
  if (footerCompanyName) footerCompanyName.textContent = cfg.company_name || defaultConfig.company_name;

  const footerEmail = document.getElementById('footer-email');
  if (footerEmail) footerEmail.textContent = cfg.contact_email || defaultConfig.contact_email;

  const footerPhone = document.getElementById('footer-phone');
  if (footerPhone) footerPhone.textContent = cfg.contact_phone || defaultConfig.contact_phone;

  const contactHours = document.getElementById('contact-hours-display');
  if (contactHours) contactHours.textContent = cfg.office_hours || defaultConfig.office_hours;
}

// Navigation
function navigateTo(page) {
  // Check if we are in a multi-page environment or SPA
  const pageSections = document.querySelectorAll('.page-section');
  if (pageSections.length > 0) {
    // SPA mode
    pageSections.forEach(el => el.classList.add('hidden'));
    const target = document.getElementById(`page-${page}`);
    if (target) {
      target.classList.remove('hidden');
      if (currentPage !== page) {
        pageHistory.push(page);
      }
      currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  } else {
    // Multi-page mode
    const path = page === 'home' ? 'index.html' : `${page}.html`;
    window.location.href = path;
  }
}

function goBack() {
  if (typeof pageHistory !== 'undefined' && pageHistory.length > 1) {
    pageHistory.pop();
    const previousPage = pageHistory[pageHistory.length - 1];
    navigateTo(previousPage);
  } else {
    window.history.back();
  }
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('hidden');
}

// Search functionality
function performSearch() {
  const destination = document.getElementById('search-destination')?.value;
  const theme = document.getElementById('search-theme')?.value;
  sessionStorage.setItem('search_destination', destination || 'all');
  sessionStorage.setItem('search_theme', theme || 'all');
  navigateTo('packages');
}

function filterPackages() {
  const destination = document.getElementById('filter-destination')?.value || sessionStorage.getItem('search_destination') || 'all';
  const duration = document.getElementById('filter-duration')?.value || 'all';
  const price = document.getElementById('filter-price')?.value || 'all';

  let filtered = [...packages];

  if (destination !== 'all') {
    filtered = filtered.filter(p => p.destination === destination || p.destination === 'both');
  }

  if (duration !== 'all') {
    if (duration === 'short') filtered = filtered.filter(p => p.duration <= 5);
    else if (duration === 'medium') filtered = filtered.filter(p => p.duration >= 6 && p.duration <= 9);
    else if (duration === 'long') filtered = filtered.filter(p => p.duration >= 10);
  }

  if (price !== 'all') {
    if (price === 'budget') filtered = filtered.filter(p => p.price < 1500);
    else if (price === 'mid') filtered = filtered.filter(p => p.price >= 1500 && p.price <= 3000);
    else if (price === 'premium') filtered = filtered.filter(p => p.price > 3000);
  }

  renderPackagesHTML(filtered);
}

function resetFilters() {
  const destFilter = document.getElementById('filter-destination');
  const durFilter = document.getElementById('filter-duration');
  const priceFilter = document.getElementById('filter-price');
  
  if (destFilter) destFilter.value = 'all';
  if (durFilter) durFilter.value = 'all';
  if (priceFilter) priceFilter.value = 'all';
  
  sessionStorage.removeItem('search_destination');
  sessionStorage.removeItem('search_theme');
  renderPackagesHTML(packages);
}

function renderPackagesHTML(packageList) {
  const grid = document.getElementById('packages-grid');
  if (!grid) return;

  grid.innerHTML = packageList.map(pkg => `
    <div class="bg-surface rounded-3xl overflow-hidden shadow-lg card-hover relative">
      ${pkg.discount ? `<div class="absolute top-4 left-4 z-10"><span class="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">${pkg.discount}% OFF</span></div>` : ''}
      <div class="aspect-video bg-gradient-to-br ${pkg.gradient} flex items-center justify-center relative">
        <span class="text-6xl">${pkg.emoji}</span>
      </div>
      <div class="p-6">
        <div class="flex items-center gap-2 mb-2">
          <span class="px-2 py-1 ${pkg.destination === 'japan' ? 'bg-pink-100 text-pink-600' : pkg.destination === 'india' ? 'bg-orange-100 text-orange-600' : 'bg-teal-100 text-teal-600'} rounded-full text-xs font-semibold">
            ${pkg.destination === 'both' ? 'Japan + India' : pkg.destination.charAt(0).toUpperCase() + pkg.destination.slice(1)}
          </span>
          <span class="text-gray-400 text-sm">${pkg.duration} Days</span>
        </div>
        <h3 class="font-display text-xl font-bold text-text mb-2">${pkg.name}</h3>
        <p class="text-gray-600 text-sm mb-4">${pkg.description}</p>
        <div class="flex items-center justify-between">
          <div>
            ${pkg.originalPrice ? `<span class="text-gray-400 line-through text-sm">$${pkg.originalPrice}</span>` : ''}
            <span class="text-primary text-xl font-bold ${pkg.originalPrice ? 'ml-1' : ''}">$${pkg.price}</span>
          </div>
          <button onclick="viewPackageDetail('${pkg.id}')" class="btn-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
            View Details
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function viewDestination(destination) {
  sessionStorage.setItem('search_destination', destination);
  navigateTo('packages');
}

function viewThemePackages(theme) {
  sessionStorage.setItem('search_theme', theme);
  navigateTo('packages');
}

function showThemePackages(theme) {
  viewThemePackages(theme);
}

function viewPackageDetail(packageId) {
  const pkg = packages.find(p => p.id === packageId);
  if (!pkg) return;

  const detailPage = document.getElementById('page-package-detail');
  if (detailPage) {
    // SPA mode
    const detailContent = document.getElementById('package-detail-content');
    detailContent.innerHTML = generatePackageDetailHTML(pkg);
    navigateTo('package-detail');
  } else {
    // Multi-page mode
    sessionStorage.setItem('selected_package', packageId);
    window.location.href = 'package-detail.html';
  }
}

function generatePackageDetailHTML(pkg) {
  return `
    <div class="grid lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="bg-surface rounded-3xl overflow-hidden shadow-lg mb-8">
          <div class="aspect-video bg-gradient-to-br ${pkg.gradient} flex items-center justify-center">
            <span class="text-9xl">${pkg.emoji}</span>
          </div>
        </div>
        
        <div class="bg-surface rounded-3xl p-8 shadow-lg mb-8">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-3 py-1 ${pkg.destination === 'japan' ? 'bg-pink-100 text-pink-600' : pkg.destination === 'india' ? 'bg-orange-100 text-orange-600' : 'bg-teal-100 text-teal-600'} rounded-full text-sm font-semibold">
              ${pkg.destination === 'both' ? 'Japan + India' : pkg.destination.charAt(0).toUpperCase() + pkg.destination.slice(1)}
            </span>
            <span class="text-gray-500">${pkg.duration} Days</span>
          </div>
          
          <h1 class="font-display text-3xl md:text-4xl font-bold text-text mb-4">${pkg.name}</h1>
          <p class="text-gray-600 text-lg mb-8">${pkg.description}</p>
          
          <h3 class="font-display text-xl font-bold text-text mb-4">Trip Highlights</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            ${pkg.highlights.map(h => `
              <div class="flex items-center gap-3 p-4 bg-background rounded-xl">
                <span class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">✓</span>
                <span class="text-text">${h}</span>
              </div>
            `).join('')}
          </div>
          
          <h3 class="font-display text-xl font-bold text-text mb-4">What's Included</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center p-4 bg-background rounded-xl">
              <span class="text-3xl mb-2 block">🏨</span>
              <p class="text-sm text-gray-600">Hotels</p>
            </div>
            <div class="text-center p-4 bg-background rounded-xl">
              <span class="text-3xl mb-2 block">✈️</span>
              <p class="text-sm text-gray-600">Flights</p>
            </div>
            <div class="text-center p-4 bg-background rounded-xl">
              <span class="text-3xl mb-2 block">🍽️</span>
              <p class="text-sm text-gray-600">Meals</p>
            </div>
            <div class="text-center p-4 bg-background rounded-xl">
              <span class="text-3xl mb-2 block">🎫</span>
              <p class="text-sm text-gray-600">Activities</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="lg:col-span-1">
        <div class="bg-surface rounded-3xl p-6 shadow-lg sticky top-24">
          <div class="text-center mb-6">
            ${pkg.originalPrice ? `<span class="text-gray-400 line-through text-lg">$${pkg.originalPrice}</span>` : ''}
            <p class="text-primary text-4xl font-bold">$${pkg.price}</p>
            <p class="text-gray-500">per person</p>
          </div>
          
          ${pkg.discount ? `
            <div class="bg-primary/10 rounded-xl p-4 mb-6 text-center">
              <span class="text-primary font-bold">${pkg.discount}% Early Bird Discount</span>
              <p class="text-sm text-gray-600">Limited time offer</p>
            </div>
          ` : ''}
          
          <form onsubmit="handleBookingSubmit(event)" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-2">Travel Date</label>
              <input type="date" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-2">Travelers</label>
              <select class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none bg-white">
                <option value="1">1 Person</option>
                <option value="2" selected>2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5+">5+ People</option>
              </select>
            </div>
            <button type="submit" class="btn-primary text-white py-4 rounded-xl font-semibold text-lg w-full">
              Book Now
            </button>
            <button type="button" onclick="navigateTo('contact')" class="w-full py-4 rounded-xl font-semibold border-2 border-gray-200 text-gray-600 hover:border-primary hover:text-primary transition-all">
              Request Custom Quote
            </button>
          </form>
          
          <div class="mt-6 pt-6 border-t border-gray-100">
            <div class="flex items-center gap-3 text-sm text-gray-600 mb-3">
              <span>✅</span>
              <span>Free cancellation up to 30 days</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-600 mb-3">
              <span>🔒</span>
              <span>Secure payment</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-600">
              <span>📞</span>
              <span>24/7 support included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Form handlers
function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const successMessage = document.getElementById('form-success');
  if (form) form.style.display = 'none';
  if (successMessage) successMessage.classList.remove('hidden');
}

function handleBookingSubmit(event) {
  event.preventDefault();
  navigateTo('contact');
}

// Seasonal packages
function loadSeasonalPackages() {
  const month = new Date().getMonth();
  let season;
  
  if (month >= 2 && month <= 4) season = 'spring';
  else if (month >= 5 && month <= 7) season = 'summer';
  else if (month >= 8 && month <= 10) season = 'autumn';
  else season = 'winter';

  const seasonal = packages.filter(p => p.season === season || p.season === 'all').slice(0, 3);
  const container = document.getElementById('seasonal-packages');
  
  if (!container) return;

  container.innerHTML = seasonal.map(pkg => `
    <div class="bg-surface rounded-3xl overflow-hidden shadow-lg card-hover">
      <div class="aspect-video bg-gradient-to-br ${pkg.gradient} flex items-center justify-center">
        <span class="text-6xl">${pkg.emoji}</span>
      </div>
      <div class="p-6">
        <span class="px-3 py-1 ${pkg.destination === 'japan' ? 'bg-pink-100 text-pink-600' : 'bg-orange-100 text-orange-600'} rounded-full text-xs font-semibold">
          ${pkg.destination.charAt(0).toUpperCase() + pkg.destination.slice(1)}
        </span>
        <h3 class="font-display text-xl font-bold text-text mt-3 mb-2">${pkg.name}</h3>
        <p class="text-gray-600 text-sm mb-4">${pkg.description}</p>
        <div class="flex items-center justify-between">
          <span class="text-primary text-xl font-bold">From $${pkg.price}</span>
          <button onclick="viewPackageDetail('${pkg.id}')" class="text-primary font-semibold text-sm hover:underline">
            View Details →
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Initialization code for the SDK (if present)
function initSDK() {
  if (window.elementSdk) {
    window.elementSdk.init({
      defaultConfig,
      onConfigChange: async (newConfig) => {
        config = { ...defaultConfig, ...newConfig };
        updateUI();
      },
      mapToCapabilities: (cfg) => ({
        recolorables: [
          { get: () => cfg.background_color || defaultConfig.background_color, set: (val) => { cfg.background_color=val; window.elementSdk.setConfig({background_color:val}); } },
          { get: () => cfg.surface_color || defaultConfig.surface_color, set: (val) => { cfg.surface_color=val; window.elementSdk.setConfig({surface_color:val}); } },
          { get: () => cfg.text_color || defaultConfig.text_color, set: (val) => { cfg.text_color=val; window.elementSdk.setConfig({text_color:val}); } },
          { get: () => cfg.primary_color || defaultConfig.primary_color, set: (val) => { cfg.primary_color=val; window.elementSdk.setConfig({primary_color:val}); } },
          { get: () => cfg.secondary_color || defaultConfig.secondary_color, set: (val) => { cfg.secondary_color=val; window.elementSdk.setConfig({secondary_color:val}); } }
        ],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
      }),
      mapToEditPanelValues: (cfg) => new Map([
        ['company_name', cfg.company_name || defaultConfig.company_name],
        ['hero_title', cfg.hero_title || defaultConfig.hero_title],
        ['hero_subtitle', cfg.hero_subtitle || defaultConfig.hero_subtitle],
        ['company_tagline', cfg.company_tagline || defaultConfig.company_tagline],
        ['contact_email', cfg.contact_email || defaultConfig.contact_email],
        ['contact_phone', cfg.contact_phone || defaultConfig.contact_phone],
        ['office_hours', cfg.office_hours || defaultConfig.office_hours]
      ])
    });
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateUI();
  initSDK();
  loadSeasonalPackages();
  
  if (document.getElementById('packages-grid')) {
     filterPackages(); 
  }

  // Handle cross-page package detail
  if (window.location.pathname.includes('package-detail.html')) {
    const pkgId = sessionStorage.getItem('selected_package');
    if (pkgId) {
      const pkg = packages.find(p => p.id === pkgId);
      if (pkg) {
        document.getElementById('package-detail-content').innerHTML = generatePackageDetailHTML(pkg);
      }
    }
  }
});
