document.addEventListener('DOMContentLoaded', () => {
    var themeStylesheet = document.getElementById('theme');
    var storedTheme = localStorage.getItem('theme');
    if(storedTheme){
        themeStylesheet.href = storedTheme;
    }
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        if(themeStylesheet.href.includes('light')){
            themeStylesheet.href = 'dark-theme.css';
            themeToggle.innerText = 'Switch to light mode';
        } else {
            themeStylesheet.href = 'light-theme.css';
            themeToggle.innerText = 'Switch to dark mode';
        }
        localStorage.setItem('theme',themeStylesheet.href)
    })
})



button.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    localStorage.setItem(
      'theme',
      document.body.classList.contains('dark') ? 'dark' : 'light'
    )
  })
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark')
  }