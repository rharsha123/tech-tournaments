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

auth.onAuthStateChanged(user => {
  document.getElementById("authSection").style.display = user ? "none" : "block";
  document.getElementById("adminPanel").style.display = user ? "block" : "none";
  if (user) {
    loadAdminFixtures();
    loadAdminResults();
    loadAdminMedia();
  }
});

// Login
loginForm.addEventListener("submit", async e => {
  e.preventDefault();
  try {
    await auth.signInWithEmailAndPassword(adminEmail.value, adminPassword.value);
    alert("Logged in");
  } catch (err) {
    alert(err.message);
  }
});

// Logout
logoutBtn.onclick = () => auth.signOut();

// Admin tabs
document.querySelectorAll(".admin-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.adminTab;
    document.querySelectorAll(".admin-tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".admin-section").forEach(s => s.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(`admin-${target}`).classList.add("active");
  });
});

// Add fixture
fixtureForm.addEventListener("submit", async e => {
  e.preventDefault();
  await db.collection("fixtures").add({
    matchId: fixtureMatchId.value,
    teamA: fixtureTeamA.value,
    teamB: fixtureTeamB.value,
    date: fixtureDate.value,
    venue: fixtureVenue.value
  });
  alert("Fixture saved");
  fixtureForm.reset();
  loadAdminFixtures();
});

// Add result
resultForm.addEventListener("submit", async e => {
  e.preventDefault();
  await db.collection("results").add({
    matchId: resultMatchId.value,
    teamA: resultTeamA.value,
    teamB: resultTeamB.value,
    scoreA: Number(resultScoreA.value),
    scoreB: Number(resultScoreB.value),
    status: resultStatus.value
  });
  alert("Result saved");
  resultForm.reset();
  loadAdminResults();
});

// Upload media
mediaForm.addEventListener("submit", async e => {
  e.preventDefault();
  const file = mediaFile.files[0];
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

// Load admin lists
async function loadAdminFixtures() {
  const list = adminFixturesList;
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
  const list = adminResultsList;
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
  const list = adminMediaList;
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

// Delete functions
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
