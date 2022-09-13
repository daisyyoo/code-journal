var $newEntry = document.querySelector('form');
var $previewPhoto = document.querySelector('img');
var $photoURL = document.querySelector('#photo');
$photoURL.addEventListener('input', photoURLBox);

function photoURLBox(event) {
  $previewPhoto.setAttribute('src', $newEntry.elements.photo.value);
}

function newEntry(event) {
  event.preventDefault();
  var title = $newEntry.elements.title.value;
  var photoURL = $newEntry.elements.photo.value;
  var notes = $newEntry.elements.notes.value;
  var newEntryObject = {
    title,
    photoURL,
    notes,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(newEntryObject);
  $previewPhoto.setAttribute('src', 'images/placeholder-image-square.jpg');
  $newEntry.reset();
}

$newEntry.addEventListener('submit', newEntry);

// function entryDomTree(tagName, attributes, children) {
//   // if (!children) {
//   //   children = [];
//   // }
//   var element = document.createElement('li');
//   for (var key in attributes) {
//     if (key === 'textContent') {
//       element.textContent = attributes.textContent;
//     } else {
//       element.setAttribute(key, attributes[key]);
//     }
//   }
//   for (var i = 0; i < children.length; i++) {
//     element.append(children[i]);
//   }
//   return element;
// }
