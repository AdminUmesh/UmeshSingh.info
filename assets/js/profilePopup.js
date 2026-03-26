/* ===== OPEN / CLOSE ===== */
function profilePopupOpen() {
  document.getElementById("profilePopup").style.display = "block";
  document.getElementById("profilePopup-overlay").classList.add("active");
  if (!window._ppInitialized) {
    buildStories();
    renderGrid(getCurrentData());
    setupScrollLoad();
    setupScrollTrap();
    window._ppInitialized = true;
  }
}

function profilePopupClose() {
  document.getElementById("profilePopup-overlay").classList.remove("active");
  setTimeout(() => {
    document.getElementById("profilePopup").style.display = "none";
  }, 300);
  closeLightbox();
  closeStoryViewer();
}

function profilePopupOverlayClick(e) {
  if (e.target.id === "profilePopup-overlay") {
    profilePopupClose();
  }
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (
      document.getElementById("ppStoryViewer") &&
      document.getElementById("ppStoryViewer").style.display !== "none"
    ) {
      closeStoryViewer();
    } else if (document.getElementById("igLightbox").style.display !== "none") {
      closeLightbox();
    } else {
      profilePopupClose();
    }
  }
});

/* ===== DUMMY POSTS DATA ===== */
const _ppPosts = [
  {
    type: "img",
    src: "assets/images/DP_UmeshSingh.jpg",
    likes: "1.2K",
    caption: "Late night coding sessions 🌙 #dev",
  },
  {
    type: "img",
    src: "https://res.cloudinary.com/dozkhfxnn/image/upload/v1774516208/Umesh_Kr_Singh_efz2ag.jpg",
    likes: "843",
    caption: "UI explorations ✨ #design",
  },
  {
    type: "img",
    src: "https://picsum.photos/seed/tech3/400/400",
    likes: "2.1K",
    caption: "New desk setup 🖥️ #workspace",
  },
  {
    type: "video",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://picsum.photos/seed/reel1/400/400",
    likes: "5.4K",
    caption: "Short reel 🎬 #coding",
  },
  {
    type: "img",
    src: "https://picsum.photos/seed/city5/400/400",
    likes: "967",
    caption: "City vibes 🏙️ #travel",
  },
  {
    type: "img",
    src: "https://picsum.photos/seed/coffee6/400/400",
    likes: "1.8K",
    caption: "Coffee + code = perfection ☕",
  },
  {
    type: "img",
    src: "https://picsum.photos/seed/nature7/400/400",
    likes: "3.3K",
    caption: "Disconnect to reconnect 🌿",
  },
  {
    type: "video",
    src: "https://www.w3schools.com/html/movie.mp4",
    poster: "https://picsum.photos/seed/reel2/400/400",
    likes: "7.1K",
    caption: "Tutorial drop! 🎥 #webdev",
  },
  {
    type: "img",
    src: "https://picsum.photos/seed/abstract8/400/400",
    likes: "2.7K",
    caption: "Generative art experiment 🎨",
  },
  {
    type: "img",
    src: "https://picsum.photos/seed/coffee6/400/400",
    likes: "1.8K",
    caption: "Coffee + code = perfection ☕",
  },
  {
    type: "img",
    src: "https://picsum.photos/seed/nature7/400/400",
    likes: "3.3K",
    caption: "Disconnect to reconnect 🌿",
  },
  {
    type: "video",
    src: "https://www.w3schools.com/html/movie.mp4",
    poster: "https://picsum.photos/seed/reel2/400/400",
    likes: "7.1K",
    caption: "Tutorial drop! 🎥 #webdev",
  },
  {
    type: "img",
    src: "https://picsum.photos/seed/coffee6/400/400",
    likes: "1.8K",
    caption: "Coffee + code = perfection ☕",
  },
  {
    type: "img",
    src: "https://picsum.photos/seed/nature7/400/400",
    likes: "3.3K",
    caption: "Disconnect to reconnect 🌿",
  },
  {
    type: "video",
    src: "https://www.w3schools.com/html/movie.mp4",
    poster: "https://picsum.photos/seed/reel2/400/400",
    likes: "7.1K",
    caption: "Tutorial drop! 🎥 #webdev",
  },
];

const _ppReels = _ppPosts.filter((p) => p.type === "video");
const _ppTagged = _ppPosts.slice(0, 4);

/* ===== STORY / HIGHLIGHT DATA ===== */
// Index 0 = "New Post" (no slides), index 1 = owner's story (avatar click also opens this)
const _ppStories = [
  {
    name: "New Post",
    emoji: "➕",
    slides: [],
  },
  {
    name: "Umesh",
    isOwner: true,
    img: "assets/images/DP_UmeshSingh.jpg",
    slides: [
      {
        type: "img",
        src: "assets/images/DP_UmeshSingh.jpg",
        caption: "Hey there! 👋 I'm Umesh",
      },
      {
        type: "img",
        src: "https://res.cloudinary.com/dozkhfxnn/image/upload/v1774516208/Umesh_Kr_Singh_efz2ag.jpg",
        caption: "Full-stack dev 💻 #code",
      },
      {
        type: "video",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        caption: "Short clip 🎬",
      },
    ],
  },
  {
    name: "Work",
    img: "https://picsum.photos/seed/work1/100/100",
    slides: [
      {
        type: "img",
        src: "https://picsum.photos/seed/office1/600/900",
        caption: "Office vibes 🏢",
      },
      {
        type: "img",
        src: "https://picsum.photos/seed/office2/600/900",
        caption: "Sprint planning 📋",
      },
    ],
  },
  {
    name: "Travel",
    img: "https://picsum.photos/seed/travel1/100/100",
    slides: [
      {
        type: "img",
        src: "https://picsum.photos/seed/city5/600/900",
        caption: "City vibes 🏙️",
      },
      {
        type: "img",
        src: "https://picsum.photos/seed/nature7/600/900",
        caption: "Disconnect 🌿",
      },
      {
        type: "video",
        src: "https://www.w3schools.com/html/movie.mp4",
        caption: "Beautiful place 🌍",
      },
    ],
  },
  {
    name: "Code",
    img: "https://picsum.photos/seed/code1/100/100",
    slides: [
      {
        type: "img",
        src: "https://picsum.photos/seed/tech3/600/900",
        caption: "New setup 🖥️",
      },
      {
        type: "img",
        src: "https://picsum.photos/seed/abstract8/600/900",
        caption: "Generative art 🎨",
      },
    ],
  },
  {
    name: "Food",
    img: "https://picsum.photos/seed/food1/100/100",
    slides: [
      {
        type: "img",
        src: "https://picsum.photos/seed/coffee6/600/900",
        caption: "Coffee ☕ always",
      },
      {
        type: "img",
        src: "https://picsum.photos/seed/food2/600/900",
        caption: "Fuel for coding 🍕",
      },
    ],
  },
];

/* ===== BUILD STORIES ROW ===== */
function buildStories() {
  const row = document.getElementById("storiesRow");
  row.innerHTML = "";

  _ppStories.forEach((s, i) => {
    const el = document.createElement("div");
    el.className = "profilePopup-story";

    const hasSlides = s.slides && s.slides.length > 0;
    const ringClass = hasSlides
      ? "profilePopup-story-ring"
      : "profilePopup-story-ring pp-no-story";

    el.innerHTML = `
      <div class="${ringClass}">
        <div class="profilePopup-story-img">
          ${
            s.img
              ? `<img src="${s.img}" alt="${s.name}">`
              : `<span style="font-size:20px">${s.emoji || "?"}</span>`
          }
        </div>
      </div>
      <div class="profilePopup-story-name">${s.name}</div>
    `;

    el.onclick = () => {
      if (s.isNewPost || !hasSlides) {
        alert("📸 New post feature coming soon!");
      } else {
        openStoryViewer(i);
      }
    };

    row.appendChild(el);
  });

  // Avatar click also opens owner story
  const avatarRing = document.querySelector(".profilePopup-avatar-ring");
  if (avatarRing) {
    avatarRing.style.cursor = "pointer";
    avatarRing.onclick = () => openStoryViewer(1);
  }
}

/* ===== STORY VIEWER STATE ===== */
let _svStoryIndex = 0;
let _svSlideIndex = 0;
let _svTimer = null;
let _svProgressAnim = null;
const _svDuration = 5000;

function openStoryViewer(storyIdx) {
  const story = _ppStories[storyIdx];
  if (!story || !story.slides || story.slides.length === 0) {
    alert("📸 No stories yet!");
    return;
  }
  _svStoryIndex = storyIdx;
  _svSlideIndex = 0;
  _renderStoryViewer();
  document.getElementById("ppStoryViewer").style.display = "flex";
  document.getElementById("igModal").classList.add("lb-open");
}

function closeStoryViewer() {
  const viewer = document.getElementById("ppStoryViewer");
  if (!viewer) return;
  _svClearTimer();
  viewer.style.display = "none";
  document.getElementById("igModal").classList.remove("lb-open");
  const vid = viewer.querySelector("video");
  if (vid) vid.pause();
}

function _svClearTimer() {
  if (_svTimer) {
    clearTimeout(_svTimer);
    _svTimer = null;
  }
  if (_svProgressAnim) {
    cancelAnimationFrame(_svProgressAnim);
    _svProgressAnim = null;
  }
}

function _renderStoryViewer() {
  const story = _ppStories[_svStoryIndex];
  const slide = story.slides[_svSlideIndex];
  const viewer = document.getElementById("ppStoryViewer");

  // Progress bars
  const barsHtml = story.slides
    .map(
      (_, i) => `
    <div class="pp-sv-bar-wrap">
      <div class="pp-sv-bar-fill" id="pp-sv-bar-${i}"
           style="width:${i < _svSlideIndex ? "100%" : "0%"}"></div>
    </div>
  `,
    )
    .join("");

  // Media
  let mediaHtml = "";
  if (slide.type === "video") {
    mediaHtml = `<video src="${slide.src}" autoplay muted playsinline id="ppSvMedia"
                        style="width:100%;height:100%;object-fit:cover;display:block;border-radius:16px;"></video>`;
  } else {
    mediaHtml = `<img src="${slide.src}" id="ppSvMedia" alt="story"
                      style="width:100%;height:100%;object-fit:cover;display:block;border-radius:16px;">`;
  }

  viewer.innerHTML = `
    <div class="pp-sv-inner">
      <div class="pp-sv-bars">${barsHtml}</div>
      <div class="pp-sv-header">
        <div class="pp-sv-user">
          <div class="pp-sv-avatar-ring">
            <div class="pp-sv-avatar">
              ${story.img ? `<img src="${story.img}" alt="">` : `<span>${story.emoji || "?"}</span>`}
            </div>
          </div>
          <span class="pp-sv-name">${story.name}</span>
          <span class="pp-sv-time">Just now</span>
        </div>
        <button class="pp-sv-close" onclick="closeStoryViewer()">✕</button>
      </div>
      <div class="pp-sv-media-wrap">${mediaHtml}</div>
      ${slide.caption ? `<div class="pp-sv-caption">${slide.caption}</div>` : ""}
      <div class="pp-sv-tap pp-sv-tap-left"  onclick="_svGoPrev()"></div>
      <div class="pp-sv-tap pp-sv-tap-right" onclick="_svGoNext()"></div>
    </div>
  `;

  _svClearTimer();
  _svStartProgress();
}

function _svStartProgress() {
  const story = _ppStories[_svStoryIndex];
  const slide = story.slides[_svSlideIndex];
  const bar = document.getElementById(`pp-sv-bar-${_svSlideIndex}`);
  if (!bar) return;

  if (slide.type === "video") {
    const vid = document.getElementById("ppSvMedia");
    if (!vid) return;
    const kick = () => {
      const dur = (vid.duration && vid.duration > 0 ? vid.duration : 8) * 1000;
      _svAnimateBar(bar, dur);
      _svTimer = setTimeout(_svGoNext, dur);
    };
    if (vid.readyState >= 1) {
      kick();
    } else {
      vid.addEventListener("loadedmetadata", kick, { once: true });
    }
  } else {
    _svAnimateBar(bar, _svDuration);
    _svTimer = setTimeout(_svGoNext, _svDuration);
  }
}

function _svAnimateBar(bar, duration) {
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const pct = Math.min(((ts - start) / duration) * 100, 100);
    bar.style.width = pct + "%";
    if (pct < 100) _svProgressAnim = requestAnimationFrame(step);
  }
  _svProgressAnim = requestAnimationFrame(step);
}

function _svGoNext() {
  _svClearTimer();
  const story = _ppStories[_svStoryIndex];
  if (_svSlideIndex < story.slides.length - 1) {
    _svSlideIndex++;
    _renderStoryViewer();
  } else {
    // Move to next story that has slides
    let next = _svStoryIndex + 1;
    while (
      next < _ppStories.length &&
      (!_ppStories[next].slides || _ppStories[next].slides.length === 0)
    )
      next++;
    if (next < _ppStories.length) {
      _svStoryIndex = next;
      _svSlideIndex = 0;
      _renderStoryViewer();
    } else {
      closeStoryViewer();
    }
  }
}

function _svGoPrev() {
  _svClearTimer();
  if (_svSlideIndex > 0) {
    _svSlideIndex--;
    _renderStoryViewer();
  } else {
    // Move to prev story that has slides
    let prev = _svStoryIndex - 1;
    while (
      prev >= 0 &&
      (!_ppStories[prev].slides || _ppStories[prev].slides.length === 0)
    )
      prev--;
    if (
      prev >= 0 &&
      _ppStories[prev].slides &&
      _ppStories[prev].slides.length > 0
    ) {
      _svStoryIndex = prev;
      _svSlideIndex = 0;
      _renderStoryViewer();
    }
  }
}

/* ===== TABS ===== */
let _ppCurrentTab = 0;

function getCurrentData() {
  if (_ppCurrentTab === 0) return _ppPosts;
  if (_ppCurrentTab === 1) return _ppReels;
  return _ppTagged;
}

function switchTab(i) {
  _ppCurrentTab = i;
  _ppLoaded = 0;
  document
    .querySelectorAll(".profilePopup-tab")
    .forEach((t, j) => t.classList.toggle("active", i === j));
  document.getElementById("igGrid").innerHTML = "";
  renderGrid(getCurrentData());
}

/* ===== GRID + LAZY LOAD ===== */
const _ppBATCH = 6;
let _ppLoaded = 0;
let _ppBusy = false;

function renderGrid(data) {
  const grid = document.getElementById("igGrid");
  const batch = data.slice(_ppLoaded, _ppLoaded + _ppBATCH);

  batch.forEach((p) => {
    const div = document.createElement("div");
    div.className = "profilePopup-post";

    if (p.type === "video") {
      div.innerHTML = `
        <video src="${p.src}" poster="${p.poster}" muted preload="none"></video>
        <div class="pp-reel-badge">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
            <polygon points="5,3 19,12 5,21"/>
          </svg>
        </div>
        <div class="pp-likes">♥ ${p.likes}</div>
      `;
    } else {
      div.innerHTML = `
        <img src="${p.src}" alt="post" loading="lazy">
        <div class="pp-likes">♥ ${p.likes}</div>
      `;
    }

    div.onclick = () => openLightbox(p);
    grid.appendChild(div);
  });

  _ppLoaded += batch.length;
  document.getElementById("igLoader").style.display =
    _ppLoaded < data.length ? "flex" : "none";
}

function setupScrollLoad() {
  const modal = document.getElementById("igModal");
  modal.addEventListener(
    "scroll",
    () => {
      const data = getCurrentData();
      if (_ppBusy || _ppLoaded >= data.length) return;
      if (modal.scrollTop + modal.clientHeight >= modal.scrollHeight - 80) {
        _ppBusy = true;
        document.getElementById("igLoader").style.display = "flex";
        setTimeout(() => {
          renderGrid(data);
          _ppBusy = false;
        }, 800);
      }
    },
    { passive: true },
  );
}

/* ===== LIGHTBOX ===== */
function openLightbox(p) {
  const lb = document.getElementById("igLightbox");
  const media = document.getElementById("lbMedia");

  document.getElementById("lbCaption").textContent = p.caption || "";

  if (p.type === "video") {
    media.innerHTML = `<video src="${p.src}" poster="${p.poster}" controls autoplay muted></video>`;
  } else {
    media.innerHTML = `<img src="${p.src}" alt="post">`;
  }

  lb.style.display = "flex";
  document.getElementById("igModal").classList.add("lb-open");
}

function closeLightbox() {
  document.getElementById("igLightbox").style.display = "none";
  document.getElementById("lbMedia").innerHTML = "";
  document.getElementById("igModal").classList.remove("lb-open");
}

function setupScrollTrap() {
  const modal = document.getElementById("igModal");
  const stories = document.getElementById("storiesRow");

  /* ── vertical trap on modal (prevent background page scroll) ── */
  modal.addEventListener(
    "wheel",
    function (e) {
      const atTop = modal.scrollTop === 0;
      const atBottom =
        modal.scrollTop + modal.clientHeight >= modal.scrollHeight - 1;
      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
      e.stopPropagation();
    },
    { passive: false },
  );

  /* ── horizontal trap on stories row ── */
  stories.addEventListener(
    "wheel",
    function (e) {
      // If scrolling mostly horizontal, take it; don't let modal eat it
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.stopPropagation();
        return;
      }
      // Convert vertical wheel to horizontal scroll on this row
      if (e.deltaY !== 0) {
        e.preventDefault();
        e.stopPropagation();
        stories.scrollLeft += e.deltaY;
      }
    },
    { passive: false },
  );

  /* ── touch scroll trap (vertical modal) ── */
  let _touchStartY = 0;
  modal.addEventListener(
    "touchstart",
    function (e) {
      _touchStartY = e.touches[0].clientY;
    },
    { passive: true },
  );

  modal.addEventListener(
    "touchmove",
    function (e) {
      const dy = _touchStartY - e.touches[0].clientY;
      const atTop = modal.scrollTop === 0;
      const atBottom =
        modal.scrollTop + modal.clientHeight >= modal.scrollHeight - 1;
      if ((atTop && dy < 0) || (atBottom && dy > 0)) {
        e.preventDefault();
      }
      e.stopPropagation();
    },
    { passive: false },
  );
}

/* ===== FOLLOW TOGGLE ===== */
let _ppFollowed = false;

function toggleFollow() {
  _ppFollowed = !_ppFollowed;
  const btn = document.getElementById("followBtn");
  btn.textContent = _ppFollowed ? "Following" : "Follow";
  btn.style.background = _ppFollowed ? "#262626" : "#3797f0";
  btn.style.border = _ppFollowed ? "0.5px solid #3a3a3a" : "none";
  if (_ppFollowed) alert("✅ You are now following Umesh Kumar Singh!");
}
