function login(){
  function newLoginHappened(user) {
    if(user){
      //User is signed in
      app(user);
    } else{
      var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
    }
  }
      firebase.auth().onAuthStateChanged(newLoginHappened);

  }
  function logout(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

function app(user){
  //user.displayName
  //user.email
  //user.uid
  // var user_roles = document.getElementById('clientStatus');
  // user_roles.style.display = 'none';
  function updateMyStatus(e){
    var myUpdate={};
    myUpdate.email = user.email;
    myUpdate.displayName = user.displayName;
    myUpdate.status = document.getElementById("clientStatus").value;
    fb.child(user.uid).set(myUpdate);

  }
  function receiveUpdate(received){
    var data = received.val();
    console.log( data );
    document.getElementById('role').innerHTML= "";
  }
  document.getElementById('userName').innerHTML = user.displayName;
  var fb = firebase.database().ref('Accounts');
  document.getElementById("clientStatus").addEventListener("input",updateMyStatus);
  // fb.on("value",receiveUpdate);
}

window.onload = login;
