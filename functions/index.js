
// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
// const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
// const {onDocumentCreated} = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore, FieldValue} = require("firebase-admin/firestore");

initializeApp();

// Neue Funktion incrementVersion zum Inkrementieren der Version
exports.incrementVersion = onRequest(async (req, res) => {
  // Aktualisiere update_data/global_info/current_version um 0.1 inkrementieren
  await getFirestore().doc("update_data/global_info").update({
    current_version: FieldValue.increment(0.1),
  });
  res.json({result: "Version incremented."});
});