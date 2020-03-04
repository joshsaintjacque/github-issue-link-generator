document
  .querySelectorAll('input, textarea')
  .forEach(input => input.addEventListener('keyup', onChange));
document.querySelector('.card_action__button--copy').addEventListener('click', onCopy);
document.addEventListener('DOMContentLoaded', function() {
  const elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
});

function onChange() {
  setOutputLink();
}

function setOutputLink() {
  const outputField = document.querySelector('#output');
  const root = 'https://github.com';
  const fields = {};
  document.querySelectorAll('input, textarea').forEach(input => {
    if (['repo', 'org'].includes(input.id)) return;

    fields[input.id] = input.value;
  });

  const issuesPath = 'issues/new';

  const org = document.querySelector('#org').value;
  const repo = document.querySelector('#repo').value;
  const urlString = [root, org, repo, issuesPath].join('/');
  const url = new URL(urlString);

  Object.keys(fields).forEach(field => {
    if (['repo', 'org'].includes(field)) return;

    fields[field] && url.searchParams.set(field, fields[field]);
  });

  outputField.innerText = url.href;

  document
    .querySelectorAll('.card_action__button')
    .forEach(button => button.classList.remove('disabled'));

  document.querySelector('.card_action__button--open').href = url.href;
}

function onCopy() {
  copyToLinkClipboard();
  M.toast({ html: 'Copied!' });
}

function copyToLinkClipboard() {
  const link = document.querySelector('#output').innerText;
  const textarea = document.createElement('textarea');
  textarea.value = link;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}
