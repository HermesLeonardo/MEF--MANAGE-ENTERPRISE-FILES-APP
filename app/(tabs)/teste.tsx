/*const getUserData = async () => {
    const user = firebase.auth().currentUser;
    if (user) {
        const uid = user.uid;
        const doc = await firebase.firestore().collection('users').doc(uid).get();
        if (doc.exists) {
        return doc.data();
        }
    }
    return null;
    };

    const getUserData = async () => {
        const user = firebase.auth().currentUser;
        if (user) {
            const uid = user.uid;
            const doc = await firebase.firestore().collection('users').doc(uid).get();
            if (doc.exists) {
            return doc.data();
            }
        }
        return null;
        }; */