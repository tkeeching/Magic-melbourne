const searchBtn = document.querySelector('.welcome_page__user_dropdown_search_btn');

const handleSearch = (e) => {
  e.preventDefault();
  const userQueryCategory = e.target.form.children[1].value;
  const userQueryBudget = e.target.form.children[3].value;
  // to be added - query to database
}

searchBtn.addEventListener('click', handleSearch);