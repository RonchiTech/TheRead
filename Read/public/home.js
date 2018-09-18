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
  // document.getElementById("createClassRoom").style.display = "none";

  // document.getElementById("createClassRoom").style.display = "none";
  document.getElementById("classroomName").style.display = "none";
  document.getElementById("ListClass").style.display = "none";
  document.getElementById('ListClass').innerHTML = "Classroom:";
  document.getElementById('homeName').innerHTML = user.displayName;
  document.getElementById("homeRole").innerHTML = user.status;
  var classuid = generateId();
  var useROLE = document.getElementById("homeRole");
  var fbclass = firebase.database().ref().child('Classes');
  var fbstat = firebase.database().ref().child('Accounts/' + user.uid +'/status');
  fbstat.on('value',function(datasnapshot){
    homeRole.innerHTML = datasnapshot.val();

if(homeRole.innerHTML == "Teacher"){
  document.getElementById('jobRole').innerHTML = "Create Classroom";
  document.getElementById("classroomName").style.display = "initial";
  document.getElementById("ListClass").style.display = "initial";
  document.getElementById("creat_classBTN").addEventListener("click",classcreation);

  // document.getElementById("createClassRoom").style.display = "initial";
} else if(homeRole.innerHTML == "" && homeRole.innerHTML ==null) {
  window.location.href = 'index.html';
}   else {
  document.getElementById('jobRole').innerHTML = "View Classroom";
}

  });




  function classcreation(q) {
    var checkcn = document.getElementById('classroomName').value;
    if(checkcn == "" && checkcn == null){
      alert("Empty Class Name!!");
    }else {
    var usuid = generateId();
    var myClasses={};
    myClasses.TheClass = document.getElementById('classroomName').value;
    myClasses.Teacher = user.displayName;
    myClasses.TeacherEmail = user.email;
    fbclass.child(usuid).set(myClasses);
    // var xx = document.getElementById('classroomName').value;
    // document.getElementById('ListClass').innerHTML = x;
}
  }

  function generateId(){
    return 'xxxx-xxxx-xxxx'.replace(/[x]/g, function(){
      return (Math.random() * 9 | 0 ).toString();
    })
  }

  function reload_page(){
   window.location.reload();
  }

}

window.onload = login;
