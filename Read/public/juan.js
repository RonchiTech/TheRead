var userRef = firebase.database().ref().child('Classes' + '/' + user.uid);
userRef.on('child_added', function(data) {

var roomNames = data.val().TheClass;
var roomTeacher = data.val().Teacher;
var roomID = data.val().ClassID;

var ul = document.createElement('ul');
document.getElementById('myList').appendChild(ul);

var li = document.createElement('li');
  ul.appendChild(li);
  Object.keys(roomNames).forEach(function(key){
     li.innerHTML += '<span onclick="clickDone(this)">'+roomNames[key]+'</span>';

    });


});

function clickDone(thisVar){
   // your code by using thisVar child
}
