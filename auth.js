import {signUpNewUser, signInUser, postAdToDb, getAd, uploadImage} from './config/firebase.js';
 
window.signUp = async function (){
  
    //this is for firebase auth
    const fullname = document.getElementById("fullname").value
    const email = document.getElementById("email").value;

    // all three in firestore database
    // const email = allInputs[0].value   yes this as well
    const password = document.getElementById("password").value;
    const age = document.getElementById("age").value;

    var signupbtn = document.getElementById('signupbtn')

    // signUpNewUser({email, password, fullname, age }); // these curly braces cuz object IF we are passing two or more values to a function
    try{
        await signUpNewUser({email, password,fullname, age})
        signupbtn.setAttribute('data-bs-dismiss',"modal")
        alert('successfully registred')
      }
      catch(e){
        const errorElem = document.getElementById('error')
        errorElem.innerHTML = e.message
        console.log(e.message);
      }
}

window.signIn1 = async function(){
     //1. values get karunga
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value

   try{
    await signInUser(email, password)
    alert ('succy signed inn')
   }
   catch(e){
    const errorElem = document.getElementById('error')
    errorElem.innerHTML = e.message
    console.log(e.message);
  }
}

window.postAd = async function(){
  const adTitle = document.getElementById("ad-title").value
  const description = document.getElementById("description").value
  const price = document.getElementById("price").value
  const image = document.getElementById('images').file[0]

  try{
      const imageUrl = await uploadImage(image)
      await postAdToDb(adTitle,description,price)
      alert('ad posted succy')
  }
  catch(e){
    console.log('e-->', e.message)
  }
}


window.showAd = async function(){
  try{
    await getAd()
    const addds = document.getElementsByClassName('container')
    addds.innerHTML(data)
  }
  catch(e){
    console.log('errorr-->', e.message)
  }
}

window.someting = async function getAds(){
  const ads = await getAdFromDb()
  const adsElem = document.getElementById('ads')

  for(let item of ads){
    adsElem.innerHTML+= `<div onclick = 'goToDetail('${item.id}')' style = 'border': 1px solid gray;
    margin: 5px; display: inline-block; width:120px;'>
    <img src= ${item.imageUrl} width = '120'/>
    <h2>${item.titile}</h2>
    <h3>${itme.price}</h3>
    </div>`
  }
}

/*
Import Export:

1. type="module" ke functions/variables global nahi hotay.
2. Agr hum unko dosri file use karna chahtay hain to us file se export karenge aur
dosri file me import karenge
3. Agr kisi file me import/export use karna hai, to us ke lye type="module" use karna hoga.
4. Agr type="module" ke functions HTML me use karne hain, to us function ko window.functionName
equal karna hoga
*/
