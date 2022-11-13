const root = document.getElementById("root");

const searchInput = document.createElement('input');
searchInput.type = "search";
searchInput.id = "site-search";
searchInput.placeholder = "Search";
root.append(searchInput);

const usersDiv = document.createElement("div");
usersDiv.id = "users";
root.append(usersDiv);

const loadingP = document.createElement('p');
loadingP.innerText = "Loading...";
usersDiv.append(loadingP);

let data = [];

const getData = async () => {
  const response = await fetch('https://api.github.com/users');
  data = await response.json();
  view(data);
};

function view(data) {
  usersDiv.innerHTML = ""

  if (data.length === 0) {
    const nothingP = document.createElement('p');
    nothingP.id = "nothing-p"
    nothingP.innerText = "Nothing found";
    usersDiv.append(nothingP);
  } else {
    for (user of data) {
      const userDiv = document.createElement('div');
      userDiv.setAttribute("class", "oneUser");
      // userDiv.className = "oneUser";
      const userAvatar = document.createElement('img');
      userAvatar.className = "user_avatar";
      userAvatar.src = user.avatar_url;
      const userName = document.createElement('h3');
      userName.innerText = user.login;
      const showButton = document.createElement('button');
      showButton.innerText = "Show more";
      const showDiv = document.createElement('div');
      showDiv.className = "showDiv";
      const userType = document.createElement('p');
      userType.innerText = "Rank: " + user.type;
      const userAdmin = document.createElement('p');
      userAdmin.innerText = "Admin: " + user.site_admin;
      showDiv.style.display = "none";
      usersDiv.appendChild(userDiv);
      userDiv.appendChild(userAvatar);
      userDiv.appendChild(userName);
      userDiv.appendChild(showButton);
      userDiv.appendChild(showDiv);
      showDiv.appendChild(userType);
      showDiv.appendChild(userAdmin);
    }
  }
  showButtonsHandler()
}

getData()

const searchData = (e) => {
  const filterData = data.filter(d => {
    return d.login.indexOf(e.target.value) == 0
  });
    
  view(filterData) 
};

const showMore = (e) => {
  const button = e.target;
  if (button.innerText === "Show more") {
    button.innerText = "Show less";
    button.nextSibling.style.display = "block";
  } else {
    button.innerText = "Show more";
    button.nextSibling.style.display = "none";
  }
}

const showButtonsHandler = () => {
  const showButtons = document.querySelectorAll('button');
  showButtons.forEach((btn) => {
    btn.addEventListener('click', showMore)
  })
};

searchInput.addEventListener('input', (e) => {
  searchData(e)
});