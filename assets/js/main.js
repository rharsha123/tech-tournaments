const firebaseConfig = {
  apiKey: "AIzaSyDkxS_ndUIA4AJU493QuwLoFapT1tvKOdg",
  authDomain: "tech-tournments.firebaseapp.com",
  projectId: "tech-tournments",
  storageBucket: "tech-tournments.firebasestorage.app",
  messagingSenderId: "713038759061",
  appId: "1:713038759061:web:51cea2182d63757e91079c",
  measurementId: "G-7H5HDD4SPK"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById("year").textContent = new Date().getFullYear();

// Tabs
const tabs = document.querySelectorAll(".nav-tab");
const tabSections = document.querySelectorAll(".tab-section");
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;
    tabs.forEach(t => t.classList.remove("active"));
    tabSections.forEach(s => s.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(`tab-${target}`).classList.add("active");
  });
});

// Fixtures
async function loadFixtures() {
  const container = document.getElementById("fixturesContainer");
  container.innerHTML = "<p>Loading fixtures...</p>";
  const snapshot = await db.collection("fixtures").orderBy("date").get();
  container.innerHTML = "";
  snapshot.forEach(doc => {
    const f = doc.data();
    container.innerHTML += `
      <article class="card">
        <h3>${f.teamA} vs ${f.teamB}</h3>
        <p><strong>Date:</strong> ${f.date}</p>
        <p><strong>Venue:</strong> ${f.venue}</p>
      </article>
    `;
  });
}

// Results
async function loadResults() {
  const container = document.getElementById("resultsContainer");
  container.innerHTML = "<p>Loading results...</p>";
  const snapshot = await db.collection("results").orderBy("matchId").get();
  container.innerHTML = "";
  snapshot.forEach(doc => {
    const r = doc.data();
    container.innerHTML += `
      <article class="card">
        <h3>${r.teamA} ${r.scoreA} - ${r.scoreB} ${r.teamB}</h3>
        <p><strong>Status:</strong> ${r.status}</p>
      </article>
    `;
  });
}

// Media
async function loadMedia() {
  const container = document.getElementById("mediaContainer");
  container.innerHTML = "<p>Loading media...</p>";
  const snapshot = await db.collection("media").orderBy("createdAt", "desc").get();
  container.innerHTML = "";
  snapshot.forEach(doc => {
    const m = doc.data();
    if (m.type === "photo") {
      container.innerHTML += `
        <div class="media-item">
          <img src="${m.url}" alt="${m.title}" />
          <p>${m.title}</p>
        </div>
      `;
    } else {
      container.innerHTML += `
        <div class="media-item">
          <video controls src="${m.url}"></video>
          <p>${m.title}</p>
        </div>
      `;
    }
  });
}

loadFixtures();
loadResults();
loadMedia();
