var $photoURL = document.querySelector('#photo-url');
$photoURL.addEventListener('input', insertPhoto);

function insertPhoto(event) {
  $photoURL.setAttribute('src', event.target.value);

}
