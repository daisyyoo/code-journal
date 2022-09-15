var $newEntry = document.querySelector('form');
var $previewPhoto = document.querySelector('img');
var $photoURL = document.querySelector('#photo');
$photoURL.addEventListener('input', photoURLBox);

function photoURLBox(event) {
  $previewPhoto.setAttribute('src', $newEntry.elements.photo.value);
}

function newEntry(event) {
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
  switchPage(event);
  var newEntry = newEntryDomTree(newEntryObject);
  $unorderedList.prepend(newEntry);
}

$newEntry.addEventListener('submit', newEntry);

function newEntryDomTree(entry) {
  var $list = document.createElement('li');
  $list.setAttribute('class', 'entries-test');
  $list.setAttribute('data-entry-id', entry.entryId);

  var $div = $list.appendChild(document.createElement('div'));
  $div.setAttribute('class', 'image-spacing column-half');

  var $imgUrl = $div.appendChild(document.createElement('img'));
  $imgUrl.setAttribute('src', entry.photoURL);
  $imgUrl.setAttribute('class', 'image');
  $imgUrl.setAttribute('alt', 'insert picture here');

  var $content = $list.appendChild(document.createElement('div'));
  $content.setAttribute('class', 'content-size column-half');

  var $entryTitleRow = $content.appendChild(document.createElement('div'));
  $entryTitleRow.setAttribute('class', 'entry-header');

  var $entryTitle = $entryTitleRow.appendChild(document.createElement('h3'));
  $entryTitle.textContent = entry.title;

  var $editPencil = $entryTitleRow.appendChild(document.createElement('i'));
  $editPencil.setAttribute('class', 'fa-solid fa-pencil');
  $editPencil.setAttribute('data-view', 'entry-form');

  var $entryContent = $content.appendChild(document.createElement('p'));
  $entryContent.textContent = entry.notes;

  return $list;
}

var $unorderedList = document.querySelector('.entries-list');

function handleDomContentLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var newEntryLog = newEntryDomTree(data.entries[i]);
    $unorderedList.appendChild(newEntryLog);
  }
}

document.addEventListener('DOMContentLoaded', handleDomContentLoaded);

var $viewElements = document.querySelectorAll('.view');

var $entriesNav = document.querySelector('a');
var buttons = document.querySelectorAll('button');
var $newEntryButton = buttons[1];
$entriesNav.addEventListener('click', switchPage);
$newEntryButton.addEventListener('click', switchPage);

function switchPage(event) {
  whichPage(data.view);
  for (var i = 0; i < $viewElements.length; i++) {
    if ($viewElements[i].className === 'view') {
      data.view = $viewElements[i].getAttribute('data-view');
    }
  }
}

function whichPage(name) {
  for (var i = 0; i < $viewElements.length; i++) {
    if (data.view === $viewElements[i].getAttribute('data-view')) {
      $viewElements[i].className = 'view hidden';
    } else if (data.view !== $viewElements[i].getAttribute('data-view')) {
      $viewElements[i].className = 'view';
    }
  }
}

function refreshPage(event) {
  for (var i = 0; i < $viewElements.length; i++) {
    if (data.view === $viewElements[i].getAttribute('data-view')) {
      $viewElements[i].className = 'view';
    } else if (data.view !== $viewElements[i].getAttribute('data-view')) {
      $viewElements[i].className = 'view hidden';
    }
  }
}

document.addEventListener('DOMContentLoaded', refreshPage);

$unorderedList.addEventListener('click', showEntryForm);

function showEntryForm(event) {
  switchPage(event);

  var $editHeader = document.querySelector('h1');
  $editHeader.textContent = 'Edit Entry';

  data.editing = event.target.getAttribute('data-entry-id');
}
