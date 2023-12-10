const collapse = document.getElementById('collapse')
const menu = document.getElementById('menu')
const body = document.getElementById('body')

collapse.addEventListener('click', () => {
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
    menu.classList.add('show');
    body.classList.remove('close');
    body.classList.add('open');
    // Trigger li fade in after a short delay
    setTimeout(() => {
      document.querySelectorAll('.show li').forEach((li) => {
        li.classList.add('show');
      });
    }, 100);
  } else {
    menu.classList.remove('show');
    menu.classList.add('hidden');
    body.classList.remove('open');
    body.classList.add('close');
    // Reset li styles when closing the menu
    document.querySelectorAll('.show li').forEach((li) => {
      li.classList.remove('show');
    });
  }
});
