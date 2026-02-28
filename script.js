document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Reveal ---
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                if (!el.classList.contains('active')) {
                    el.classList.add('active');
                    // Trigger skill bar animation if in section
                    if (el.id === 'skills') {
                        const bars = el.querySelectorAll('.fill');
                        bars.forEach(bar => {
                            const width = bar.style.width;
                            bar.style.width = '0';
                            setTimeout(() => {
                                bar.style.width = width;
                            }, 100);
                        });
                    }
                }
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // --- Medium Blog Fetching ---
    const blogContainer = document.getElementById('blog-container');
    const username = '0xacun3tix';
    const rssToUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`;

    fetch(rssToUrl)
        .then(res => res.json())
        .then(data => {
            if (data.status === 'ok') {
                blogContainer.innerHTML = '';
                data.items.slice(0, 6).forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'blog-card';

                    // Extract image from content or use high-quality tech placeholder
                    let img = item.thumbnail;
                    if (!img || img.includes('medium.com')) {
                        img = `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=500&q=80`;
                    }

                    // Better excerpt (remove HTML tags)
                    const temp = document.createElement('div');
                    temp.innerHTML = item.description;
                    let excerpt = temp.textContent || temp.innerText || "";
                    excerpt = excerpt.substring(0, 100) + '...';

                    card.innerHTML = `
                        <div class="blog-img" style="background-image: url('${img}')"></div>
                        <div class="blog-content">
                            <div class="blog-date">${new Date(item.pubDate).toLocaleDateString()}</div>
                            <h4 class="blog-title">${item.title}</h4>
                            <p class="blog-excerpt">${excerpt}</p>
                            <a href="${item.link}" target="_blank" class="btn-link">READ_INTEL</a>
                        </div>
                    `;
                    blogContainer.appendChild(card);
                });
            } else {
                blogContainer.innerHTML = '<div class="error">Failed to fetch intel feeds. Connection lost.</div>';
            }
        })
        .catch(err => {
            console.error(err);
            blogContainer.innerHTML = '<div class="error">CORTEX ERROR: Feed retrieval offline.</div>';
        });

    // --- Navigation active state ---
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        reveals.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Terminal-style loading
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'TRANSMITTING_DATA...';
            submitBtn.disabled = true;
            formStatus.innerHTML = '<span class="loading">ESTABLISHING_ENCRYPTED_TUNNEL...</span>';

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.innerHTML = '<span class="success">SUCCESS: DATA_FLUSH_COMPLETE. TRANSMISSION_RECEIVED.</span>';
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.innerHTML = `<span class="error">ERROR: ${data.errors.map(error => error.message).join(", ")}</span>`;
                    } else {
                        formStatus.innerHTML = '<span class="error">ERROR: UPLINK_INTERRUPTED. PLEASE_RETRY.</span>';
                    }
                }
            } catch (error) {
                formStatus.innerHTML = '<span class="error">CRITICAL_FAILURE: UNABLE_TO_CONNECT_TO_GATEWAY.</span>';
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
