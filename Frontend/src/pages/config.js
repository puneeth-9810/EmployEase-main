import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfXggnQZNOf6BZp3Q1KsS3iQbGnJasVTg",
  authDomain: "employease-27c0c.firebaseapp.com",
  projectId: "employease-27c0c",
  storageBucket: "employease-27c0c.appspot.com",
  messagingSenderId: "204261469669",
  appId: "1:204261469669:web:0af53efe3b8663340c130c",
  measurementId: "G-RVBJ1F07ME"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider1 = new GoogleAuthProvider();
const provider2 = new GithubAuthProvider();

export { auth, provider1,provider2 };
