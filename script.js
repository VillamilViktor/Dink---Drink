import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAROSSAUXVxpryNIhlYYVRVXhSVWWrI3Ls",
    authDomain: "test-project-f9e1d.firebaseapp.com",
    projectId: "test-project-f9e1d",
    storageBucket: "test-project-f9e1d.firebasestorage.app",
    messagingSenderId: "355473801444",
    appId: "1:355473801444:web:82fdc2eff84ff82aed6cf1",
    measurementId: "G-WT66SMWGMB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form and error elements
const form = document.querySelector("form");
const errors = document.querySelectorAll(".error");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    errors.forEach(error => error.innerHTML = "");

    const nameValue = form.name.value.trim();
    const emailValue = form.email.value.trim();
    const numberValue = form.number.value.trim();
    const messageValue = form.message.value.trim();

    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const numberPattern = /^09[0-9]{9}$/;
    const messagePattern = /^.{5,127}$/;

    let valid = true;

    // VALIDATION
    if (nameValue === "" || !namePattern.test(nameValue)) {
        errors[0].innerHTML = "Enter a valid name.";
        valid = false;
    }
    if (emailValue === "" || !emailPattern.test(emailValue)) {
        errors[1].innerHTML = "Enter a valid email.";
        valid = false;
    }
    if (numberValue === "" || !numberPattern.test(numberValue)) {
        errors[2].innerHTML = "Phone must start with 09 and be 11 digits.";
        valid = false;
    }
    if (messageValue === "" || !messagePattern.test(messageValue)) {
        errors[3].innerHTML = "Message must be 5–127 characters.";
        valid = false;
    }

    // If form is valid → SAVE TO FIREBASE
    if (valid) {

        try {
            await addDoc(collection(db, "messages"), {
                name: nameValue,
                email: emailValue,
                phone: numberValue,
                message: messageValue,
                created_at: new Date()
            });

            alert("Submitted successfully!");
            form.reset();
            console.log("Saved to Firebase!");

        } catch (error) {
            console.error("Error saving to Firebase:", error);
        }
    }
});