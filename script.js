// ======= Hero load animation trigger (play on load / pageshow) =======
function startHeroAnimation() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  // Remove then re-add to force animation on repeated loads
  hero.classList.remove('animate');
  // small delay to allow paint, then add
  setTimeout(() => hero.classList.add('animate'), 80);
}

// Run on initial load
window.addEventListener('DOMContentLoaded', startHeroAnimation);

// Also run on pageshow (handles back/forward / bfcache)
window.addEventListener('pageshow', (e) => {
  startHeroAnimation();
});

// ======= Comment system (per post) =======
document.querySelectorAll('.comment-form').forEach(form => {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.querySelector('input[name="name"]').value.trim();
    const message = this.querySelector('textarea[name="message"]').value.trim();
    const postId = this.dataset.post;
    const commentList = document.getElementById(`comments-${postId}`);

    if (name && message && commentList) {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${escapeHtml(name)}:</strong> ${escapeHtml(message)}`;
      li.style.animation = "fadeUp 0.5s ease";
      commentList.appendChild(li);
      this.reset();
    }
  });
});

// Tiny helper to avoid simple HTML injection
function escapeHtml(str){
  return str.replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]);
}

// ======= Smooth nav scrolling =======
document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ======= Scroll reveal for blog posts (IntersectionObserver) =======
const posts = document.querySelectorAll('.blog-post');
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view'); // can add CSS effects if desired
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  posts.forEach(p => obs.observe(p));
}

// ======= Button click feedback =======
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.style.transform = 'scale(0.96)';
    setTimeout(() => btn.style.transform = '', 140);
  });
});