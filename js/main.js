var $entry = document.querySelector('form');
var $previewPhoto = document.querySelector('img');
var $photoURL = document.querySelector('#photo');
$photoURL.addEventListener('input', photoURLBox);

// preview photo in box

function photoURLBox(event) {
  $previewPhoto.setAttribute('src', $entry.elements.photo.value);
}

// submit new entry and load into entry page

function newEntry(event) {
  var title = $entry.elements.title.value;
  var photoURL = $entry.elements.photo.value;
  var notes = $entry.elements.notes.value;

  if (data.editing === null) {
    // make new entry
    var newEntryObject = {
      title,
      photoURL,
      notes,
      entryId: data.nextEntryId
    };
    data.nextEntryId++;
    data.entries.unshift(newEntryObject);
    var newEntry = newEntryDomTree(newEntryObject);
    $unorderedList.prepend(newEntry);

  } else {
    // update entry
    var editedEntryObject = {
      title,
      photoURL,
      notes,
      entryId: data.editing
    };

    var allEntries = document.querySelectorAll('li');
    for (var i = 0; i < allEntries.length; i++) {
      if (data.editing === allEntries[i].getAttribute('data-entry-id')) {
        var $findLi = allEntries[i];
        var editedEntry = newEntryDomTree(editedEntryObject);
        $findLi.replaceWith(editedEntry);
      }
    }

    for (var j = 0; j < data.entries.length; j++) {
      if (data.editing === data.entries[j].entryId.toString()) {
        data.entries.splice(j, 1, editedEntryObject);
      }
    }
    data.editing = null;
  }
  $entry.reset();
  $previewPhoto.setAttribute('src', 'images/placeholder-image-square.jpg');
  switchPage(event);
}

$entry.addEventListener('submit', newEntry);

// make new dom tree per entry

function newEntryDomTree(entry) {
  var $list = document.createElement('li');
  $list.setAttribute('class', 'entry-post');
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

// load entry list on page

var $unorderedList = document.querySelector('.entries-list');

function handleDomContentLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var newEntryLog = newEntryDomTree(data.entries[i]);
    $unorderedList.appendChild(newEntryLog);
  }
}

document.addEventListener('DOMContentLoaded', handleDomContentLoaded);

// make all buttons work

var $viewElements = document.querySelectorAll('.view');
var $entriesNav = document.querySelector('a');
var buttons = document.querySelectorAll('button');
var $newEntryButton = buttons[1];
$entriesNav.addEventListener('click', entriesPage);
$newEntryButton.addEventListener('click', switchPage);

function switchPage(event) {
  whichPage(data.view);
  for (var i = 0; i < $viewElements.length; i++) {
    if ($viewElements[i].className === 'view') {
      data.view = $viewElements[i].getAttribute('data-view');
    }
  }
}

function entriesPage(event) {
  if (event.target === $entriesNav && data.view !== 'entries') {
    whichPage(data.view);
    for (var i = 0; i < $viewElements.length; i++) {
      if ($viewElements[i].className === 'view') {
        data.view = $viewElements[i].getAttribute('data-view');
      }
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

// show edit page

$unorderedList.addEventListener('click', showEntryForm);

function showEntryForm(event) {
  switchPage(event);

  var $editHeader = document.querySelector('h1');
  $editHeader.textContent = 'Edit Entry';

  var currentEntry = event.target.closest('.entry-post');
  data.editing = currentEntry.getAttribute('data-entry-id');
  var allEntries = document.querySelectorAll('li');

  for (var i = 0; i < allEntries.length; i++) {
    if (data.editing === allEntries[i].getAttribute('data-entry-id')) {
      var $currentLi = allEntries[i];
      var $titleContent = $currentLi.querySelector('h3');
      var $imageContent = $currentLi.querySelector('img');
      var $mainContent = $currentLi.querySelector('p');

      $entry.elements.title.value = $titleContent.textContent;
      $entry.elements.photo.value = $imageContent.getAttribute('src');
      $entry.elements.notes.value = $mainContent.textContent;
      $previewPhoto.setAttribute('src', $imageContent.getAttribute('src'));
    }
  }

  // delete button in edit page
  var $deleteButtonRow = document.querySelector('.form-actions');
  var $deleteModalButton = document.createElement('button');
  $deleteButtonRow.prepend($deleteModalButton);
  $deleteModalButton.setAttribute('type', 'button');
  $deleteModalButton.setAttribute('class', 'modal');
  $deleteModalButton.textContent = 'Delete Entry';
  $deleteButtonRow.setAttribute('class', 'form-actions-edit column-full');

  // delete button hovering
  $deleteModalButton.addEventListener('mouseover', mouseoverModal);
  $deleteModalButton.addEventListener('mouseout', mouseoutModal);

  function mouseoverModal(event) {
    $deleteModalButton.className = 'modal-hovered';
  }

  function mouseoutModal(event) {
    $deleteModalButton.className = 'modal';
  }

  // show modal
  $deleteModalButton.addEventListener('click', showModal);

  var deleteModalShowing = false;
  var $modalBackground = document.querySelector('.modal-background');

  function showModal(event) {
    if (deleteModalShowing === true) {
      $modalBackground.className = 'modal-background hidden';
      deleteModalShowing = false;
    } else {
      $modalBackground.className = 'modal-background';
      deleteModalShowing = true;
    }
  }

  // cancel and confirm button functions
  var $cancelButton = document.querySelector('.cancel-button');
  var $confirmButton = document.querySelector('.confirm-button');

  $cancelButton.addEventListener('click', showModal);
  $confirmButton.addEventListener('click', confirmButton);

  function confirmButton(event) {
    for (var i = 0; i < allEntries.length; i++) {
      if (data.editing === allEntries[i].getAttribute('data-entry-id')) {
        var $currentLi = allEntries[i];
        $currentLi.remove();
      }
    }

    for (var j = 0; j < data.entries.length; j++) {
      if (data.editing === data.entries[j].entryId.toString()) {
        data.entries.splice(j, 1);
      }
    }
    showModal(event);
    switchPage(event);
  }
}
