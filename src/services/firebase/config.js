import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyBu0CCToizQh2SORCP-4dAmXHJpzB6tU6k",
    authDomain: "theorb-f3a48.firebaseapp.com",
    databaseURL: "https://theorb-f3a48.firebaseio.com",
    projectId: "theorb-f3a48",
    storageBucket: "theorb-f3a48.appspot.com",
    messagingSenderId: "1073451047758",
    appId: "1:1073451047758:web:7389fd0497fa5d4c071c1f",
    measurementId: "G-YMC4WY6W9H"
};

initializeApp(firebaseConfig);

const projectAuth = getAuth();

export { projectAuth }