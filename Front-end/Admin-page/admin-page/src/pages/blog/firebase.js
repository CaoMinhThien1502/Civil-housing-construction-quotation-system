    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    import { getFirestore } from "firebase/firestore";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
    apiKey: "AIzaSyB4rdKqrO6ioJzd_YoAsm_bKBCSucX9ouE",
    authDomain: "sample-blog-637bd.firebaseapp.com",
    projectId: "sample-blog-637bd",
    storageBucket: "sample-blog-637bd.appspot.com",
    messagingSenderId: "84110601988",
    appId: "1:84110601988:web:12c361f7538648d4532a51",
    measurementId: "G-LL07Q091TW"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    export default db;