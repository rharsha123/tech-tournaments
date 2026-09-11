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
});

// LOGIN
document.getElementById("loginForm").addEventListener("submit", async e => {
  e.preventDefault();
  const email = adminEmail.value;
  const password = adminPassword.value;

  try {
    await auth.signInWithEmailAndPassword(email, password);
    alert("Logged in");
  } catch (err) {
    alert(err.message);
  }
});

// LOGOUT
logoutBtn.onclick = () => auth.signOut();

// ADD FIXTURE
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
});

// ADD RESULT
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
});

// UPLOAD MEDIA
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
});
