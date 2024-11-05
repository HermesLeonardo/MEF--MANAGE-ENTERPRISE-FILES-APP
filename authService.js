import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

export async function registerUser(cnpj, password, role) {
    const userCredential = await createUserWithEmailAndPassword(auth, cnpj, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
    cnpj: user.cnpj,
    role: role
    });
}

export async function signInUser(cnpj, password) {
    const userCredential = await signInWithEmailAndPassword(auth, cnpj, password);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
    return userDoc.data().role;
    } else {
    throw new Error("User role not found!");
    }
}
