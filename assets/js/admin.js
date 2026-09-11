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

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const authSection = document.getElementById("authSection");
const adminPanel = document.getElementById("adminPanel");

// Auth state
auth.onAuthStateChanged(user => {
  if (user) {
    authSection.style.display = "none";
    adminPanel.style.display = "block";
    loadAdminFixtures();
    loadAdminResults();
    loadAdminMedia();
  } else {
    authSection.style.display = "block";
    adminPanel.style.display = "none";
  }
});

// Login
document.getElementById("loginForm").addEventListener("submit", async e => {
  e.preventDefault();
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;
  try {
    await auth.signInWithEmailAndPassword(email, password);
    alert("Logged in");
  } catch (err) {
    alert("Login failed: " + err.message);
  }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => auth.signOut());

// Admin tabs
const adminTabs = document.querySelectorAll(".admin-tab");
const adminSections = document.querySelectorAll(".admin-section");
adminTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.adminTab;
    adminTabs.forEach(t => t.classList.remove("active"));
    adminSections.forEach(s => s.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(`admin-${target}`).classList.add("active");
  });
});

// Add fixture
document.getElementById("fixtureForm").addEventListener("submit", async e => {
  e.preventDefault();
  const data = {
    matchId: fixtureMatchId.value,
    teamA: fixtureTeamA.value,
    teamB: fixtureTeamB.value,
    date: fixtureDate.value,
    venue: fixtureVenue.value
  };
  await db.collection("fixtures").add(data);
  alert("Fixture saved");
  fixtureForm.reset();
  loadAdminFixtures();
});

// Add result
document.getElementById("resultForm").addEventListener("submit", async e => {
  e.preventDefault();
  const data = {
    matchId: resultMatchId.value,
    teamA: resultTeamA.value,
    teamB: resultTeamB.value,
    scoreA: Number(resultScoreA.value),
    scoreB: Number(resultScoreB.value),
    status: resultStatus.value
  };
  await db.collection("results").add(data);
  alert("Result saved");
  resultForm.reset();
  loadAdminResults();
});

// Upload media
document.getElementById("mediaForm").addEventListener("submit", async e => {
  e.preventDefault();
  const file = mediaFile.files[0];
  if (!file) {
    alert("Select a file");
    return;
  }
  const ref = storage.ref(`media/${Date.now()}_${file.name}`);
  await ref.put(file);
  const url = await ref.getDownloadURL();
  await db.collection("media").add({
    title: mediaTitle.value,
    type: mediaType.value,
    url,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  alert("Media uploaded");
  mediaForm.reset();
  loadAdminMedia();
});

// Admin lists (simple delete)

async function loadAdminFixtures() {
  const list = document.getElementById("adminFixturesList");
  const snapshot = await db.collection("fixtures").orderBy("date").get();
  list.innerHTML = "";
  snapshot.forEach(doc => {
    const f = doc.data();
    list.innerHTML += `
      <div class="admin-item">
        <span>${f.teamA} vs ${f.teamB} (${f.date})</span>
        <button onclick="deleteFixture('${doc.id}')">Delete</button>
      </div>
    `;
  });
}

async function loadAdminResults() {
  const list = document.getElementById("adminResultsList");
  const snapshot = await db.collection("results").orderBy("matchId").get();
  list.innerHTML = "";
  snapshot.forEach(doc => {
    const r = doc.data();
    list.innerHTML += `
      <div class="admin-item">
        <span>${r.teamA} ${r.scoreA} - ${r.scoreB} ${r.teamB}</span>
        <button onclick="deleteResult('${doc.id}')">Delete</button>
      </div>
    `;
  });
}

async function loadAdminMedia() {
  const list = document.getElementById("adminMediaList");
  const snapshot = await db.collection("media").orderBy("createdAt", "desc").get();
  list.innerHTML = "";
  snapshot.forEach(doc => {
    const m = doc.data();
    list.innerHTML += `
      <div class="admin-item">
        <span>${m.title} (${m.type})</span>
        <button onclick="deleteMedia('${doc.id}')">Delete</button>
      </div>
    `;
  });
}

window.deleteFixture = async id => {
  await db.collection("fixtures").doc(id).delete();
  loadAdminFixtures();
};

window.deleteResult = async id => {
  await db.collection("results").doc(id).delete();
  loadAdminResults();
};

window.deleteMedia = async id => {
  await db.collection("media").doc(id).delete();
  loadAdminMedia();
};
