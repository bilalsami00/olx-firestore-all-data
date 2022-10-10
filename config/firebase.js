// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";
import { getFirestore, setDoc, doc, collection, getDocs, addDoc } from 'https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC949SfuqfHq1oW_D3zlcEFjyi71EyV_o0",
  authDomain: "olx-db-eb220.firebaseapp.com",
  projectId: "olx-db-eb220",
  storageBucket: "olx-db-eb220.appspot.com",
  messagingSenderId: "874907797154",
  appId: "1:874907797154:web:0ed08e04ad158c128839fb",
  measurementId: "G-QK4PPNF2WH"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
// for firestore \|/ from https://firebase.google.com/docs/firestore/quickstart
const db = getFirestore(app)

async function signUpNewUser(userInfo){

    const { email, password } = userInfo

   const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
   await addUserToDb(userInfo, userCredentials.user.uid)

  //   .then((userCredential) => {
  //   // Signed in 
  //   const user = userCredential.user;
  //   // ...

  //   addUserToDb(userInfo)

  //   alert('signed in')
    
  //   // alert("Successfully registered ")
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // ..
  //   console.log("Error ---> ", errorMessage);
  // });

}

function signInUser(email, password){
   return signInWithEmailAndPassword(auth, email, password)
  // .then((userCredential) => {
  //   // Signed in 
  //   const user = userCredential.user;
  //   // ...
  //   alert("u signed in")
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   console.log(errorMessage)
  // });
}


function addUserToDb(userInfo,uid) { 

  //                 short form of the object   
  //this is var shit    keys of objects      Object Name
           const    { email, fullname, age } = userInfo
                   // only 3 value out of  4==signUpFirebase({ email, password, fullname, age }) 
           return setDoc (doc(db, "users", uid), {email, fullname, age})
/*function of firestore...addDoc take 2 parameters                             */
    // return addDoc              (collection(db, "users"),      { email, fullname, age })
                  // (db, "users")==>keys of collection i.e 'users'      
      // .then(() => {
      //     alert('Successfully Registered')
      // })
      // .catch(e => {
      //     console.log('Error: ', e.message)
      // })
      
}

function postAdToDb(adTitle,price,description){
  const userId = auth.currentUser.uid
  return addDoc(collection(db, 'ads'), {adTitle,price,description,userId })
}

async function getAd(){
  
    const querySnapshot = await getDocs(collection(db, "ads"));
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
  
}

export {
    signUpNewUser,
    signInUser,
    postAdToDb,
    getAd
}

