console.log('JS loaded');

document.addEventListener('DOMContentLoaded', () => {
  const deleteBtns = document.querySelectorAll('.delete');

  deleteBtns.forEach(button => {
    button.addEventListener('click', (e) => {
      if(!confirm('Are you sure?')) e.preventDefault();
    });
  });

  const burger = document.querySelector('.burger');
  const nav = document.querySelector('#'+burger.dataset.target);
  burger.addEventListener('click', function(){
    burger.classList.toggle('is-active');
    nav.classList.toggle('is-active');
  });
});
