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
  // document.getElementById('role')
//   var userId = firebase.auth().currentUser.uid;
//   return firebase.database().ref('/Accounts/' + userId).on('value').then(function(snapshot) {
//   var statuz = (snapshot.val() && snapshot.val().status);
// });
  // document.getElementById("useROLE").innerHTML = user.status;
  document.getElementById('userName').innerHTML = user.displayName;
  document.getElementById("clientStatus").addEventListener("input",updateMyStatus);
  document.getElementById("useROLE").innerHTML = user.status;
  var useROLE = document.getElementById("useROLE");
  var fb = firebase.database().ref('Accounts');
  var fbstat = firebase.database().ref().child('Accounts/' + user.uid +'/status');
  fbstat.on('value',function(datasnapshot){
    useROLE.innerHTML = datasnapshot.val();

    if (useROLE.innerHTML != "" && useROLE.innerHTML != null){
      window.location.href = 'home.html';
    }
    // } else {
    //   window.location.href = 'index.html';
    // }



  });

  function updateMyStatus(e){
    var myUpdate={};
    myUpdate.email = user.email;
    myUpdate.displayName = user.displayName;
    myUpdate.status = document.getElementById("clientStatus").value;
    fb.child(user.uid).set(myUpdate);

  }


}

window.onload = login;
