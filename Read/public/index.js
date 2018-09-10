function login(){
  function newLoginHappened(user) {
    if(user){
      //User is signed in
      app(user);
    } else{
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
  }
      firebase.auth().onAuthStateChanged(newLoginHappened);
  }

function app(user){
  //user.displayName
  //user.email
  //user.uid

  function updateMyStatus(e){
    var myUpdate={};
    myUpdate.email = user.email;
    myUpdate.displayName = user.displayName;
    myUpdate.status = document.getElementById("clientStatus").value;
    fb.child(user.uid).set(myUpdate);

  }
  // function receiveUpdate(received){
  //   var data = received.val();
  //   console.log( data );
  //   document.getElementById('role').innerHTML= "";
  // }
  document.getElementById('userName').innerHTML = user.displayName;
  var fb = firebase.database().ref('Accounts');
  document.getElementById("clientStatus").addEventListener("input",updateMyStatus);
  // fb.on("value",receiveUpdate);
}

window.onload = login;
