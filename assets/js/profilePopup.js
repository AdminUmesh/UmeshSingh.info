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
}

function profilePopupOverlayClick(e) {
  if (e.target.id === "profilePopup-overlay") {
    profilePopupClose();
  }
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (document.getElementById("igLightbox").style.display !== "none") {
      closeLightbox();
    } else {
      profilePopupClose();
    }
  }
});


/* ===== DUMMY DATA ===== */
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

const _ppReels   = _ppPosts.filter(p => p.type === "video");
const _ppTagged  = _ppPosts.slice(0, 4);

const _ppStories = [
  { name: "New Post", emoji: "➕" },
  { img: "https://i.pravatar.cc/100?img=32", name: "Sarah" },
  { img: "https://i.pravatar.cc/100?img=15", name: "Jordan" },
  { img: "https://i.pravatar.cc/100?img=22", name: "Mia" },
  { img: "https://i.pravatar.cc/100?img=5",  name: "Ryan" },
  { img: "https://i.pravatar.cc/100?img=47", name: "Priya" },
];


/* ===== STORIES ===== */
function buildStories() {
  const row = document.getElementById("storiesRow");
  row.innerHTML = "";
  _ppStories.forEach(s => {
    const el = document.createElement("div");
    el.className = "profilePopup-story";
    el.innerHTML = `
      <div class="profilePopup-story-ring">
        <div class="profilePopup-story-img">
          ${s.img
            ? `<img src="${s.img}" alt="${s.name}">`
            : `<span style="font-size:22px">${s.emoji}</span>`}
        </div>
      </div>
      <div class="profilePopup-story-name">${s.name}</div>
    `;
    el.onclick = () => alert(`📸 Viewing ${s.name}'s story`);
    row.appendChild(el);
  });
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
const _ppBATCH = 6;
let   _ppLoaded  = 0;
let   _ppBusy    = false;

function renderGrid(data) {
  const grid = document.getElementById("igGrid");
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
    media.innerHTML = `<img src="${p.src}" alt="post">`;
  }

  // lb is now a direct child of the overlay (position:fixed, inset:0)
  // so absolute inset:0 on lb fills the whole overlay — always centered, no scroll issue
  lb.style.display = "flex";
  document.getElementById("igModal").classList.add("lb-open");
}

function closeLightbox() {
  document.getElementById("igLightbox").style.display = "none";
  document.getElementById("lbMedia").innerHTML = "";
  document.getElementById("igModal").classList.remove("lb-open");
}


/* ===== SCROLL TRAP — prevent background page scrolling ===== */
function setupScrollTrap() {
  const modal = document.getElementById("igModal");

  modal.addEventListener("wheel", function (e) {
    const atTop    = modal.scrollTop === 0;
    const atBottom = modal.scrollTop + modal.clientHeight >= modal.scrollHeight - 1;

    // Block scroll propagating to background when modal hits its boundary
    if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
      e.preventDefault();
    }
    e.stopPropagation();
  }, { passive: false });

  // Touch scroll trap
  let _touchStartY = 0;
  modal.addEventListener("touchstart", function (e) {
    _touchStartY = e.touches[0].clientY;
  }, { passive: true });

  modal.addEventListener("touchmove", function (e) {
    const dy       = _touchStartY - e.touches[0].clientY;
    const atTop    = modal.scrollTop === 0;
    const atBottom = modal.scrollTop + modal.clientHeight >= modal.scrollHeight - 1;

    if ((atTop && dy < 0) || (atBottom && dy > 0)) {
      e.preventDefault();
    }
    e.stopPropagation();
  }, { passive: false });
}


/* ===== FOLLOW TOGGLE ===== */
let _ppFollowed = false;

function toggleFollow() {
  _ppFollowed = !_ppFollowed;
  const btn = document.getElementById("followBtn");
  btn.textContent = _ppFollowed ? "Following" : "Follow";
  btn.style.background    = _ppFollowed ? "#262626" : "#3797f0";
  btn.style.border        = _ppFollowed ? "0.5px solid #3a3a3a" : "none";
  if (_ppFollowed) alert("✅ You are now following Alex Mercer!");
}