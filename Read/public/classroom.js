const classRoomData = {
  BSIT: {
    classRoomId: 1,
    numberOfStudent: 5
  },
  BSCS: {
    classRoomId: 2,
    numberOfStudent: 7
  },
  BSCE: {
    classRoomId: 3,
    numberOfStudent: 8
  }
};

const showClassData = id => {
  document.getElementById("classInfo").innerHTML = `<div>${id}</div><div>${
    classRoomData[id].classRoomId
  }</div><div>${classRoomData[id].numberOfStudent}</div>`;
};

const infoDiv = document.createElement("div");
infoDiv.id = "classInfo";

const classList = document.createElement("ul");
classList.onclick = e => {
  showClassData(e.target.id);
};

Object.keys(classRoomData).forEach(classId => {
  const classItem = document.createElement("li");
  classItem.id = classId;
  classItem.innerHTML = classId;
  classList.appendChild(classItem);
});

document.body.appendChild(classList);
document.body.appendChild(infoDiv);
