/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', stringified);

function stringified(event) {
  var newEntryJSON = JSON.stringify(data);
  localStorage.setItem('new-entry-storage', newEntryJSON);
}

var previousEntryJSON = localStorage.getItem('new-entry-storage');

if (previousEntryJSON !== null) {
  data = JSON.parse(previousEntryJSON);
}
