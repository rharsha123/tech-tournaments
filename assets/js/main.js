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

// Load Fixtures
async function loadFixtures() {
  const container = document.getElementById("fixturesContainer");
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

// Load Results
async function loadResults() {
  const container = document.getElementById("resultsContainer");
  const snapshot = await db.collection("results").get();
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

// Load Media
async function loadMedia() {
  const container = document.getElementById("mediaContainer");
  const snapshot = await db.collection("media").orderBy("createdAt", "desc").get();
  container.innerHTML = "";

  snapshot.forEach(doc => {
    const m = doc.data();

    if (m.type === "photo") {
      container.innerHTML += `
        <div class="media-item">
          <img src="${m.url}" />
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
