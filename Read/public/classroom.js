function login(){
    function newLoginHappened(user){
        if(user){
          app(user);
        } else{
          var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider).then(function(result){
              // This gives you a Google Access Token. You can use it to access the Google API.
              var token = result.credential.accessToken;

              // The signed-in user info.
              var user = result.user;

            }).catch(function(error){
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
            })
        }
    }

    firebase.auth().onAuthStateChanged(newLoginHappened);
}

  function logout(){
      firebase.auth().signOut().then(function(){
        // Sign-out successful.
      }).catch(function(error) {
          // An error happened.
      })

  }

  function app(user){
    document.getElementById("IDss").style.display="none";
    document.getElementById("teacher_btn").style.display="none";
    document.getElementById("stud_btn").style.display="none";
    document.getElementById("classroomName").style.display = "none";
    document.getElementById("classroomID").style.display = "none";
    document.getElementById("ListClass").style.display = "none";
    document.getElementById('ListClass').innerHTML = "Classroom:";
    document.getElementById('homeName').innerHTML = user.displayName;
    document.getElementById('homeID').innerHTML = user.uid;
    document.getElementById("homeRole").innerHTML = user.status;

    var classuid = generateId();
    var useROLE = document.getElementById("homeRole");
    var fbclass = firebase.database().ref().child('Classes');
    var fbstat = firebase.database().ref().child('Accounts/' + user.uid +'/status');
    fbstat.on('value',function(datasnapshot){
    homeRole.innerHTML = datasnapshot.val();

      if(homeRole.innerHTML == "Teacher"){
        document.getElementById("IDss").style.display="none";
        document.getElementById("teacher_btn").style.display="initial";
        document.getElementById("stud_btn").style.display="none";
        document.getElementById('jobRole').innerHTML = "Create Classroom";
        document.getElementById("classroomName").style.display = "initial";
        document.getElementById("classroomID").style.display = "none";
        document.getElementById("ListClass").style.display = "initial";
        document.getElementById("creat_classBTN").addEventListener("click",classcreation);
      }else if(homeRole.innerHTML == "Student"){
        document.getElementById("IDss").style.display="initial";
        document.getElementById("teacher_btn").style.display="none";
        document.getElementById("stud_btn").style.display="initial";
        document.getElementById('jobRole').innerHTML = "Add Classroom";
        document.getElementById("classroomName").style.display = "none";
        document.getElementById("classroomID").style.display = "initial";
        document.getElementById("ListClass").style.display = "initial";
        document.getElementById("add_classBTN").addEventListener("click",addclass);
      }else{
          window.location.href = 'index.html';
      }

  })

  function addclass(){
    if (document.getElementById("classroomID").value == null && document.getElementById("classroomID").value =="" && document.getElementById("teachID").value == null && document.getElementById("teachID").value == "" ){
         window.alert("Empty Input Field!");
    }else{
      var addclassID = document.getElementById("classroomID").value;
      var teacherUID =document.getElementById("teachID").value;
      var studentUID = user.uid;
      var studentName = user.displayName;
      var classRef = firebase.database().ref().child('Classes').child(teacherUID);
      classRef.orderByChild("ClassID").equalTo(addclassID).once("child_added", function(snapshot) {
      var studentsRef = snapshot.ref.child("MyStudents");
      studentsRef.child(studentUID).set({ Studentname: studentName });
    })

  }
  document.getElementById("classroomID").value = "";
  document.getElementById("teachID").value = "";

}
  function classcreation(q){
      if(document.getElementById('classroomName').value == ""  &&  document.getElementById('classroomName').value== null){
          window.alert("Empty Class Name!!");
      }else{
        var usuid = generateId();
        var myClasses={};
        myClasses.TheClass = document.getElementById('classroomName').value;
        myClasses.Teacher = user.displayName;
        myClasses.TeacherID = user.uid;
        myClasses.ClassID = usuid;
        fbclass.child(user.uid).push().set(myClasses);
      }
      document.getElementById('classroomName').value = "";

  }
    var userRef = firebase.database().ref().child('Classes' + '/' + user.uid);
    userRef.on('child_added', function(data){

      var roomNames = data.val().TheClass;
      var Studentx = data.val().MyStudents;

      var studentRawList = '';
      for (var key in Studentx) {
          studentRawList += ('['+Studentx[key].Studentname + ']');
      }

      var classD = data.val().ClassID;
      var ul = document.createElement('ul');
      document.getElementById('myList').appendChild(ul);
      var li = document.createElement('li');
      ul.appendChild(li);

          Object.keys(roomNames).forEach(function(key){
            li.innerHTML += '<span onclick="clickDone(this)">'+roomNames[key]+'</span><ul style="display:none"><li>Class Id : '+classD+'</li><li><span onclick="clickDone(this)">Students :</span><ul style="display:none"><li>'+studentRawList+'</li></ul></li></ul>';
          })
        })

        var studentRef = firebase.database().ref().child('Classes' + '/' + user.uid);
          studentRef.on('child_added', function(data){

            var roomNamess = data.val().TheClass;
            var Studentxx = data.val().MyStudents;

            var studentRawLists = '';
            for (var keys in Studentxx) {
              if(studentxx[keys].Studentname  == user.displayName){
                studentRawLists += ('['+Studentxx[keys].Studentname + ']');

            }
          }
          var classDD = data.val().ClassID;
          var ull = document.createElement('ul');
          document.getElementById('myLista').appendChild(ull);
          var lii = document.createElement('li');
          ull.appendChild(lii);

          Object.keys(roomNamess).forEach(function(key){
          lii.innerHTML += "hi";
            })

          })

          function errData(err)
           {
              console.log('Error!');
              console.log(err);

            }

            function generateId()
            {
              return '' + Math.random().toString(36).substr(2, 7);
            }

            function reload_page()
            {
              window.location.reload();
            }
    }

    window.onload = login;

      function clickDone(thisVar){
          var is = thisVar.nextSibling.style.display;
            if(is == 'none'){
                thisVar.nextSibling.style.display = 'initial';
            }else{
                thisVar.nextSibling.style.display = 'none';
            }
      }
