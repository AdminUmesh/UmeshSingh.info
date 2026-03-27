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
    if (document.getElementById("ppStoryViewer") &&
        document.getElementById("ppStoryViewer").style.display !== "none") {
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
  { type: "img",   src: "assets/images/DP_UmeshSingh.jpg",           likes: "1.2K", caption: "Late night coding sessions 🌙 #dev" },
  // { type: "img",   src: "https://res.cloudinary.com/dozkhfxnn/image/upload/v1774516208/Umesh_Kr_Singh_efz2ag.jpg", likes: "843", caption: "UI explorations ✨ #design" },
  { type: "img",   src: "https://picsum.photos/seed/tech3/400/400",   likes: "2.1K", caption: "New desk setup 🖥️ #workspace" },
  { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4", poster: "https://picsum.photos/seed/reel1/400/400", likes: "5.4K", caption: "Short reel 🎬 #coding" },
  { type: "img",   src: "https://picsum.photos/seed/city5/400/400",   likes: "967",  caption: "City vibes 🏙️ #travel" },
  { type: "img",   src: "https://picsum.photos/seed/coffee6/400/400", likes: "1.8K", caption: "Coffee + code = perfection ☕" },
  { type: "img",   src: "https://picsum.photos/seed/nature7/400/400", likes: "3.3K", caption: "Disconnect to reconnect 🌿" },
  { type: "video", src: "https://www.w3schools.com/html/movie.mp4",   poster: "https://picsum.photos/seed/reel2/400/400", likes: "7.1K", caption: "Tutorial drop! 🎥 #webdev" },
  { type: "img",   src: "https://picsum.photos/seed/abstract8/400/400", likes: "2.7K", caption: "Generative art experiment 🎨" },
  { type: "img",   src: "https://picsum.photos/seed/coffee6/400/400", likes: "1.8K", caption: "Coffee + code = perfection ☕" },
  { type: "img",   src: "https://picsum.photos/seed/nature7/400/400", likes: "3.3K", caption: "Disconnect to reconnect 🌿" },
  { type: "video", src: "https://www.w3schools.com/html/movie.mp4",   poster: "https://picsum.photos/seed/reel2/400/400", likes: "7.1K", caption: "Tutorial drop! 🎥 #webdev" },
  { type: "img",   src: "https://picsum.photos/seed/coffee6/400/400", likes: "1.8K", caption: "Coffee + code = perfection ☕" },
  { type: "img",   src: "https://picsum.photos/seed/nature7/400/400", likes: "3.3K", caption: "Disconnect to reconnect 🌿" },
  { type: "video", src: "https://www.w3schools.com/html/movie.mp4",   poster: "https://picsum.photos/seed/reel2/400/400", likes: "7.1K", caption: "Tutorial drop! 🎥 #webdev" },
];

const _ppReels  = _ppPosts.filter(p => p.type === "video");
const _ppTagged = _ppPosts.slice(0, 4);


/* ===== STORY / HIGHLIGHT DATA ===== */
// Index 0 = "New Post" (no slides), index 1 = owner's story (avatar click also opens this)
const _ppStories = [
  {
    name: "New Post",
    emoji: "➕",
    slides: []
  },
  {
    name: "Umesh",
    isOwner: true,
    img: "assets/images/DP_UmeshSingh.jpg",
    slides: [
      { type: "img",   src: "assets/images/DP_UmeshSingh.jpg",           caption: "Hey there! 👋 I'm Umesh" },
      // { type: "img",   src: "https://res.cloudinary.com/dozkhfxnn/image/upload/v1774516208/Umesh_Kr_Singh_efz2ag.jpg", caption: "Full-stack dev 💻 #code" },
      { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4", caption: "Short clip 🎬" },
    ]
  },
  {
    name: "Work",
    img: "https://picsum.photos/seed/work1/100/100",
    slides: [
      { type: "img", src: "https://picsum.photos/seed/office1/600/900", caption: "Office vibes 🏢" },
      { type: "img", src: "https://picsum.photos/seed/office2/600/900", caption: "Sprint planning 📋" },
    ]
  },
  {
    name: "Travel",
    img: "https://picsum.photos/seed/travel1/100/100",
    slides: [
      { type: "img",   src: "https://picsum.photos/seed/city5/600/900",   caption: "City vibes 🏙️" },
      { type: "img",   src: "https://picsum.photos/seed/nature7/600/900", caption: "Disconnect 🌿" },
      { type: "video", src: "https://www.w3schools.com/html/movie.mp4",   caption: "Beautiful place 🌍" },
    ]
  },
  {
    name: "Code",
    img: "https://picsum.photos/seed/code1/100/100",
    slides: [
      { type: "img", src: "https://picsum.photos/seed/tech3/600/900",     caption: "New setup 🖥️" },
      { type: "img", src: "https://picsum.photos/seed/abstract8/600/900", caption: "Generative art 🎨" },
    ]
  },
  {
    name: "Food",
    img: "https://picsum.photos/seed/food1/100/100",
    slides: [
      { type: "img", src: "https://picsum.photos/seed/coffee6/600/900", caption: "Coffee ☕ always" },
      { type: "img", src: "https://picsum.photos/seed/food2/600/900",   caption: "Fuel for coding 🍕" },
    ]
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
              ? `<img src="${s.img}" alt="${s.name}" draggable="false">`
              : `<span style="font-size:20px">${s.emoji || "?"}</span>`
          }
        </div>
      </div>
      <div class="profilePopup-story-name">${s.name}</div>
    `;

    el.onclick = (e) => {
      e.stopPropagation();
      // Small delay to ensure drag didn't happen
      setTimeout(() => {
        if (s.name === "New Post" || !hasSlides) {
          alert("📸 New post feature coming soon!");
        } else {
          openStoryViewer(i);
        }
      }, 10);
    };

    row.appendChild(el);
  });

  // Avatar click also opens owner story
  const avatarRing = document.querySelector(".profilePopup-avatar-ring");
  if (avatarRing) {
    avatarRing.style.cursor = "pointer";
    avatarRing.onclick = () => openStoryViewer(1);
  }
  
  // Initialize drag scrolling after stories are built
  initStoriesDragScroll();
}


/* ===== STORY VIEWER STATE ===== */
let _svStoryIndex   = 0;
let _svSlideIndex   = 0;
let _svTimer        = null;
let _svProgressAnim = null;
let _svVideoPlaybackCheck = null;
const _svDuration   = 5000;

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
  if (vid) {
    vid.pause();
    vid.currentTime = 0;
  }
  if (_svVideoPlaybackCheck) {
    clearInterval(_svVideoPlaybackCheck);
    _svVideoPlaybackCheck = null;
  }
}

function _svClearTimer() {
  if (_svTimer)        { clearTimeout(_svTimer); _svTimer = null; }
  if (_svProgressAnim) { cancelAnimationFrame(_svProgressAnim); _svProgressAnim = null; }
  if (_svVideoPlaybackCheck) { clearInterval(_svVideoPlaybackCheck); _svVideoPlaybackCheck = null; }
}

function _renderStoryViewer() {
  const story  = _ppStories[_svStoryIndex];
  const slide  = story.slides[_svSlideIndex];
  const viewer = document.getElementById("ppStoryViewer");

  // Progress bars
  const barsHtml = story.slides.map((_, i) => `
    <div class="pp-sv-bar-wrap">
      <div class="pp-sv-bar-fill" id="pp-sv-bar-${i}"
           style="width:${i < _svSlideIndex ? '100%' : '0%'}"></div>
    </div>
  `).join("");

  // Media
  let mediaHtml = "";
  if (slide.type === "video") {
    mediaHtml = `<video src="${slide.src}" autoplay muted playsinline id="ppSvMedia"
                        style="width:100%;height:100%;object-fit:cover;display:block;border-radius:16px;"></video>`;
  } else {
    mediaHtml = `<img src="${slide.src}" id="ppSvMedia" alt="story" draggable="false"
                      style="width:100%;height:100%;object-fit:cover;display:block;border-radius:16px;">`;
  }

  viewer.innerHTML = `
    <div class="pp-sv-inner">
      <div class="pp-sv-bars">${barsHtml}</div>
      <div class="pp-sv-header">
        <div class="pp-sv-user">
          <div class="pp-sv-avatar-ring">
            <div class="pp-sv-avatar">
              ${story.img ? `<img src="${story.img}" alt="" draggable="false">` : `<span>${story.emoji || "?"}</span>`}
            </div>
          </div>
          <span class="pp-sv-name">${story.name}</span>
          <span class="pp-sv-time">Just now</span>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="pp-sv-download" onclick="downloadStoryMedia()" style="background: rgba(0,0,0,0.4); border: none; color: #fff; font-size: 16px; width: 30px; height: 30px; border-radius: 50%; cursor: pointer;">⬇️</button>
          <button class="pp-sv-close" onclick="closeStoryViewer()">✕</button>
        </div>
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
  const bar   = document.getElementById(`pp-sv-bar-${_svSlideIndex}`);
  if (!bar) return;

  if (slide.type === "video") {
    const vid = document.getElementById("ppSvMedia");
    if (!vid) return;
    
    const startVideoProgress = () => {
      const dur = (vid.duration && vid.duration > 0 && isFinite(vid.duration)) ? vid.duration * 1000 : 8000;
      _svAnimateBar(bar, dur);
      _svTimer = setTimeout(_svGoNext, dur);
      
      // Monitor video playback to handle edge cases
      _svVideoPlaybackCheck = setInterval(() => {
        if (vid.ended) {
          clearInterval(_svVideoPlaybackCheck);
          _svVideoPlaybackCheck = null;
          if (_svTimer) {
            clearTimeout(_svTimer);
            _svGoNext();
          }
        }
      }, 100);
    };
    
    if (vid.readyState >= 1) { 
      startVideoProgress(); 
    } else { 
      vid.addEventListener("loadedmetadata", startVideoProgress, { once: true });
      // Fallback in case loadedmetadata never fires
      setTimeout(() => {
        if (vid.readyState < 1) startVideoProgress();
      }, 500);
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
    const elapsed = ts - start;
    const pct = Math.min((elapsed / duration) * 100, 100);
    bar.style.width = pct + "%";
    if (pct < 100) _svProgressAnim = requestAnimationFrame(step);
  }
  _svProgressAnim = requestAnimationFrame(step);
}

function _svGoNext() {
  _svClearTimer();
  const story = _ppStories[_svStoryIndex];
  if (!story || !story.slides) {
    closeStoryViewer();
    return;
  }
  if (_svSlideIndex < story.slides.length - 1) {
    _svSlideIndex++;
    _renderStoryViewer();
  } else {
    // Move to next story that has slides
    let next = _svStoryIndex + 1;
    while (next < _ppStories.length && (!_ppStories[next].slides || _ppStories[next].slides.length === 0)) next++;
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
  const story = _ppStories[_svStoryIndex];
  if (!story || !story.slides) {
    closeStoryViewer();
    return;
  }
  if (_svSlideIndex > 0) {
    _svSlideIndex--;
    _renderStoryViewer();
  } else {
    // Move to prev story that has slides
    let prev = _svStoryIndex - 1;
    while (prev >= 0 && (!_ppStories[prev].slides || _ppStories[prev].slides.length === 0)) prev--;
    if (prev >= 0 && _ppStories[prev].slides && _ppStories[prev].slides.length > 0) {
      _svStoryIndex = prev;
      _svSlideIndex = _ppStories[prev].slides.length - 1;
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
  document.querySelectorAll(".profilePopup-tab").forEach((t, j) =>
    t.classList.toggle("active", i === j)
  );
  document.getElementById("igGrid").innerHTML = "";
  renderGrid(getCurrentData());
}


/* ===== GRID + LAZY LOAD ===== */
const _ppBATCH = 12;
let   _ppLoaded = 0;
let   _ppBusy   = false;

function renderGrid(data) {
  const grid  = document.getElementById("igGrid");
  const batch = data.slice(_ppLoaded, _ppLoaded + _ppBATCH);

  batch.forEach(p => {
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
        <img src="${p.src}" alt="post" loading="lazy" draggable="false">
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
  modal.addEventListener("scroll", () => {
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
  }, { passive: true });
}


/* ===== LIGHTBOX ===== */
function openLightbox(p) {
  const lb    = document.getElementById("igLightbox");
  const media = document.getElementById("lbMedia");

  document.getElementById("lbCaption").textContent = p.caption || "";

  if (p.type === "video") {
    media.innerHTML = `<video src="${p.src}" poster="${p.poster}" controls autoplay muted></video>`;
  } else {
    media.innerHTML = `<img src="${p.src}" alt="post" draggable="false">`;
  }

  lb.style.display = "flex";
  document.getElementById("igModal").classList.add("lb-open");
}

function closeLightbox() {
  const lb = document.getElementById("igLightbox");
  const media = document.getElementById("lbMedia");
  const video = media.querySelector("video");
  if (video) video.pause();
  lb.style.display = "none";
  media.innerHTML = "";
  document.getElementById("igModal").classList.remove("lb-open");
}


/* ===== IMPROVED SCROLL TRAP & STORIES DRAG SCROLL ===== */
function setupScrollTrap() {
  const modal   = document.getElementById("igModal");
  const stories = document.getElementById("storiesRow");
  
  if (!modal || !stories) return;

  /* ── vertical trap on modal (prevent background page scroll) ── */
  modal.addEventListener("wheel", function (e) {
    const atTop    = modal.scrollTop === 0;
    const atBottom = modal.scrollTop + modal.clientHeight >= modal.scrollHeight - 1;
    if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
      e.preventDefault();
    }
    e.stopPropagation();
  }, { passive: false });

  /* ── horizontal wheel scroll for stories (smooth) ── */
  stories.addEventListener("wheel", function (e) {
    e.preventDefault();
    e.stopPropagation();
    // Use deltaX if available, otherwise convert vertical delta to horizontal
    const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
    stories.scrollLeft += delta;
  }, { passive: false });

  /* ── touch scroll trap (vertical modal) ── */
  let _touchStartY = 0;
  let _touchStartX = 0;
  let _touchScrollLock = false;
  
  modal.addEventListener("touchstart", function (e) {
    _touchStartY = e.touches[0].clientY;
    _touchStartX = e.touches[0].clientX;
    _touchScrollLock = false;
  }, { passive: true });

  modal.addEventListener("touchmove", function (e) {
    const dy = _touchStartY - e.touches[0].clientY;
    const dx = Math.abs(_touchStartX - e.touches[0].clientX);
    const atTop = modal.scrollTop === 0;
    const atBottom = modal.scrollTop + modal.clientHeight >= modal.scrollHeight - 1;
    
    // If horizontal swipe is dominant, let stories handle it (don't block)
    if (dx > Math.abs(dy) && !_touchScrollLock) {
      return;
    }
    
    if ((atTop && dy < 0) || (atBottom && dy > 0)) {
      e.preventDefault();
    }
    e.stopPropagation();
  }, { passive: false });
}

// Initialize drag-to-scroll for stories row with proper event handling
function initStoriesDragScroll() {
  const stories = document.getElementById("storiesRow");
  if (!stories) return;
  
  let _dragActive = false;
  let _dragStartX = 0;
  let _dragScrollLeft = 0;
  
  const startDrag = (e) => {
    _dragActive = true;
    _dragStartX = (e.pageX || e.touches[0].pageX) - stories.offsetLeft;
    _dragScrollLeft = stories.scrollLeft;
    stories.style.cursor = "grabbing";
    stories.style.userSelect = "none";
    e.preventDefault();
  };
  
  const stopDrag = () => {
    if (!_dragActive) return;
    _dragActive = false;
    stories.style.cursor = "grab";
    stories.style.userSelect = "";
  };
  
  const doDrag = (e) => {
    if (!_dragActive) return;
    e.preventDefault();
    const pageX = e.pageX || (e.touches && e.touches[0] ? e.touches[0].pageX : 0);
    if (!pageX) return;
    const x = pageX - stories.offsetLeft;
    const walk = (x - _dragStartX) * 1.2;
    stories.scrollLeft = _dragScrollLeft - walk;
  };
  
  // Mouse events
  stories.addEventListener("mousedown", startDrag);
  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("mousemove", doDrag);
  
  // Touch events for mobile
  stories.addEventListener("touchstart", startDrag, { passive: false });
  document.addEventListener("touchend", stopDrag);
  document.addEventListener("touchmove", doDrag, { passive: false });
  
  stories.style.cursor = "grab";
  
  // Add inertia scrolling effect for smoother experience
  let _scrollTimeout = null;
  stories.addEventListener("scroll", function() {
    if (_scrollTimeout) clearTimeout(_scrollTimeout);
    _scrollTimeout = setTimeout(() => {
      // Just to ensure scroll events don't conflict
    }, 50);
  });
}


/* ===== FOLLOW TOGGLE ===== */
let _ppFollowed = false;

function toggleFollow() {
  // _ppFollowed = !_ppFollowed;
  // const btn = document.getElementById("followBtn");
  // btn.textContent            = _ppFollowed ? "Following" : "Follow";
  // btn.style.background       = _ppFollowed ? "#262626"   : "#3797f0";
  // btn.style.border           = _ppFollowed ? "0.5px solid #3a3a3a" : "none";
  // if (_ppFollowed) alert("✅ You are now following Umesh Kumar Singh!");

  window.open(
    "https://www.instagram.com/umesh.kr.singh?igsh=bTdmbWtqOHZiMXJm",
    "_blank"
  );
}

/* ===== DOWNLOAD MEDIA FUNCTION ===== */
function downloadCurrentMedia() {
  const mediaContainer = document.getElementById("lbMedia");
  const media = mediaContainer.querySelector("img, video");
  
  if (!media) {
    alert("No media to download");
    return;
  }
  
  let mediaUrl = "";
  let fileType = "";
  
  if (media.tagName === "IMG") {
    mediaUrl = media.src;
    fileType = "image";
  } else if (media.tagName === "VIDEO") {
    mediaUrl = media.src;
    fileType = "video";
  }
  
  if (!mediaUrl) {
    alert("Media URL not found");
    return;
  }
  
  // Fetch the media and download it
  fetch(mediaUrl)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      
      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
      const extension = media.tagName === "IMG" ? "jpg" : "mp4";
      a.download = `instagram_${fileType}_${timestamp}.${extension}`;
      
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      alert("✅ Download started!");
    })
    .catch(error => {
      console.error("Download failed:", error);
      alert("❌ Download failed. Please try again.");
    });
}

/* ===== DOWNLOAD STORY MEDIA ===== */
function downloadStoryMedia() {
  const viewer = document.getElementById("ppStoryViewer");
  const media = viewer.querySelector("#ppSvMedia");
  
  if (!media) {
    alert("No story media to download");
    return;
  }
  
  let mediaUrl = "";
  
  if (media.tagName === "IMG") {
    mediaUrl = media.src;
  } else if (media.tagName === "VIDEO") {
    mediaUrl = media.src;
  }
  
  if (!mediaUrl) {
    alert("Media URL not found");
    return;
  }
  
  fetch(mediaUrl)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      
      const story = _ppStories[_svStoryIndex];
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
      const extension = media.tagName === "IMG" ? "jpg" : "mp4";
      a.download = `story_${story.name}_${timestamp}.${extension}`;
      
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      alert("✅ Story downloaded!");
    })
    .catch(error => {
      console.error("Download failed:", error);
      alert("❌ Download failed. Please try again.");
    });
}