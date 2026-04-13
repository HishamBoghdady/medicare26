// authService.js
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut as firebaseSignOut,
    getAuth,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
    sendPasswordResetEmail
} from "firebase/auth";

// getDocs(collection
import { doc, setDoc, getDoc, updateDoc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { deleteApp, initializeApp } from "firebase/app";
import { auth, db } from "../firebase/firebase.config";
// import { getPermissionsByRole } from "../guards/permissions";

// async function createUserByAdmin({ name, email, password, role = "client" }) {
//     const secondaryApp = initializeApp(auth.app.options, `secondary-${Date.now()}`);
//     const secondaryAuth = getAuth(secondaryApp);

//     try {
//         const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
//         const user = userCredential.user;

//         const userData = {
//             id: user.uid,
//             name,
//             email: user.email,
//             role,
//             permissions: getPermissionsByRole(role),
//             createdAt: new Date(),
//             createdBy: auth.currentUser?.uid || null,
//         };

//         await setDoc(doc(db, "users", user.uid), userData);
//         return userData;
//     } finally {
//         await firebaseSignOut(secondaryAuth).catch(() => { });
//         await deleteApp(secondaryApp).catch(() => { });
//     }
// }
async function changeMyPassword(currentPassword, newPassword) {
    const user = auth.currentUser;
    if (!user || !user.email) throw new Error("لا يوجد مستخدم مسجل دخول");

    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential); // مطلوب قبل تغيير الباسورد
    await updatePassword(user, newPassword);
}
async function adminSendPasswordReset(email) {
    if (!email) throw new Error("Email is required");
    await sendPasswordResetEmail(auth, email);
}

async function createUserByAdmin(payload) {
    const {
        name,
        email,
        password,
        role = "client",
        permissions = [],
        deniedPermissions = [],
        phone = "",
        department = "",
        isActive = true,
        language = "ar",
        avatarUrl = ""
    } = payload;

    const secondaryApp = initializeApp(auth.app.options, `secondary-${Date.now()}`);
    const secondaryAuth = getAuth(secondaryApp);

    try {
        const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
        const user = userCredential.user;

        const userData = {
            id: user.uid,
            name,
            email: user.email,
            phone,
            department,
            role,
            permissions: [...new Set(permissions)],
            deniedPermissions: [...new Set(deniedPermissions)],
            isActive,
            language,
            avatarUrl,
            createdAt: new Date(),
            createdBy: auth.currentUser?.uid || null,
            updatedAt: new Date(),
            updatedBy: auth.currentUser?.uid || null,
        };

        await setDoc(doc(db, "users", user.uid), userData);
        return userData;
    } finally {
        await firebaseSignOut(secondaryAuth).catch(() => { });
        await deleteApp(secondaryApp).catch(() => { });
    }
}

// =============================
// تسجيل مستخدم جديد
async function signUp(email, password, name) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userData = {
        id: user.uid,
        name,
        email: user.email,
        createdAt: new Date(),
        role: "client", // 👈 default role
        // permissions: [],
        // fullName: "",
        // username: "",
        // token: "",
        // avatarUrl: "",
        // language: ""
    };

    await setDoc(doc(db, "users", user.uid), userData);

    return {
        authUser: user,
        profile: userData,
    };
}
// تسجيل الدخول
async function signIn(email, password) {

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
}
// تسجيل الخروج
async function signOut() {
    await firebaseSignOut(auth);
}
// =============================

// =============================
// جلب بيانات المستخدم من Firestore
// =============================
async function getUserProfile(uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    }

    return null;
}
// =============================
// تحديث بيانات المستخدم
// =============================
async function updateUserProfile(uid, data) {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, data);
}
// =============================
// مراقبة حالة تسجيل الدخول
// =============================
function observeAuthState(callback) {
    return onAuthStateChanged(auth, async (user) => {
        if (user) {
            const profile = await getUserProfile(user.uid);

            callback({
                authUser: user,
                profile: profile
            });
        } else {
            callback(null);
        }
    });
}

///////////////////////////
// دالة تعديل الصلاحيات
async function updateUserPermissions(uid, newPermissions) {
    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
        permissions: newPermissions
    });
}

async function getAllUsers() {
    const snapshot = await getDocs(collection(db, "users"));

    return snapshot.docs.map(doc => ({
        ...doc.data(),
        uid: doc.id
    }));
}
async function deleteUserProfile(uid) {
    await deleteDoc(doc(db, "users", uid));
}

// //usage
// await updateUserPermissions("USER_UID", [
//     "edit_patient",
//     "add_patient"
// ]);

// await updateUserPermissions("USER_UID", []);


//del
// import { arrayRemove } from "firebase/firestore";

// async function removePermission(uid, permission) {
//     const userRef = doc(db, "users", uid);

//     await updateDoc(userRef, {
//         permissions: arrayRemove(permission)
//     });
// }
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {

//     match /users/{userId} {
//       allow read: if request.auth != null;

//       allow update: if request.auth != null
//         && request.auth.token.role == "admin";
//     }
//   }
// }
// const ROLE_PERMISSIONS = {
//     admin: ["create", "read", "update", "delete"],
//     manager: ["read", "update"],
//     client: ["read"]
// };
// const permissions = ROLE_PERMISSIONS[user.role];

//////////////////////////
export {
    signUp, signIn, signOut, getUserProfile, updateUserProfile, observeAuthState,
    updateUserPermissions, createUserByAdmin, getAllUsers, deleteUserProfile, changeMyPassword, adminSendPasswordReset
}
