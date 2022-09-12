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

window.addEventListener('beforeunload', stringified);

function stringified(event) {
  var newEntryJSON = JSON.stringify(data.entries);
  localStorage.setItem('new-entry-storage', newEntryJSON);
}

var previousEntryJSON = localStorage.getItem('new-entry-storage');

if (previousEntryJSON !== null) {
  data.entries = JSON.parse(previousEntryJSON);
}
