const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const closeLogin = document.getElementById('close-login');
const closeSignup = document.getElementById('close-signup');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');
const loginButtons = document.querySelectorAll('.login-btn');
const signupButtons = document.querySelectorAll('.signup-btn');

const dropdownMenu = document.getElementById('dropdown-menu');
const profileBtn = document.getElementById('profile-btn');
const mobileAuthLinks = document.getElementById('mobile-auth-links');

let isLoggedIn = false;

// Show login modal
loginButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.remove('hidden');
        signupModal.classList.add('hidden');
    });
});

// // Show signup modal
// signupButtons.forEach(button => {
//     button.addEventListener('click', (e) => {
//         e.preventDefault();
//         signupModal.classList.remove('hidden');
//         loginModal.classList.add('hidden');
//     });
// });

// Close modals
closeLogin.addEventListener('click', () => loginModal.classList.add('hidden'));
closeSignup.addEventListener('click', () => signupModal.classList.add('hidden'));

showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.add('hidden');
    signupModal.classList.remove('hidden');
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.classList.add('hidden');
    loginModal.classList.remove('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) loginModal.classList.add('hidden');
    if (e.target === signupModal) signupModal.classList.add('hidden');
});

// Update dropdowns
function updateAuthDropdown() {
    dropdownMenu.innerHTML = '';
    mobileAuthLinks.innerHTML = '';

    if (isLoggedIn) {
        const logoutDesktop = document.createElement('button');
        logoutDesktop.textContent = 'Logout';
        logoutDesktop.className = 'block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100';
        logoutDesktop.onclick = () => {
            isLoggedIn = false;
            updateAuthDropdown();
            alert('Logged out successfully.');
        };
        dropdownMenu.appendChild(logoutDesktop);

        const logoutMobile = document.createElement('button');
        logoutMobile.textContent = 'Logout';
        logoutMobile.className = 'block w-full text-left py-2 text-red-600 hover:bg-blue-700';
        logoutMobile.onclick = () => {
            isLoggedIn = false;
            updateAuthDropdown();
            alert('Logged out successfully.');
        };
        mobileAuthLinks.appendChild(logoutMobile);
    } else {
        const loginDesktop = document.createElement('button');
        loginDesktop.textContent = 'Login';
        loginDesktop.className = 'block w-full text-left px-4 py-2 hover:bg-gray-100';
        loginDesktop.onclick = () => loginModal.classList.remove('hidden');

        const signupDesktop = document.createElement('button');
        signupDesktop.textContent = 'Signup';
        signupDesktop.className = 'block w-full text-left px-4 py-2 hover:bg-gray-100';
        signupDesktop.onclick = () => signupModal.classList.remove('hidden');

        dropdownMenu.appendChild(loginDesktop);
        dropdownMenu.appendChild(signupDesktop);

        const loginMobile = document.createElement('button');
        loginMobile.textContent = 'Login';
        loginMobile.className = 'block w-full text-left py-2 hover:bg-blue-700';
        loginMobile.onclick = () => loginModal.classList.remove('hidden');

        const signupMobile = document.createElement('button');
        signupMobile.textContent = 'Signup';
        signupMobile.className = 'block w-full text-left py-2 hover:bg-blue-700';
        signupMobile.onclick = () => signupModal.classList.remove('hidden');

        mobileAuthLinks.appendChild(loginMobile);
        mobileAuthLinks.appendChild(signupMobile);
    }
}

// Toggle profile dropdown
if (profileBtn) {
    profileBtn.addEventListener('click', () => {
        dropdownMenu.classList.toggle('hidden');
    });
}

// Simulate login/signup actions
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    isLoggedIn = true;
    updateAuthDropdown();
    alert('Login successful!');
    loginModal.classList.add('hidden');
    e.target.reset();
});

document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    isLoggedIn = true;
    updateAuthDropdown();
    alert('Account created successfully!');
    signupModal.classList.add('hidden');
    e.target.reset();
});

document.getElementById('newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks for subscribing to our newsletter!');
    e.target.reset();
});

// Initial auth UI setup
updateAuthDropdown();