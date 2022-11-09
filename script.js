const root = document.getElementById("root");
const usersDiv = document.getElementById("users");
const searchInput = document.getElementById("site-search");
// root.appendChild(searchInput)

let data = [];

const getData = async () => {
  const response = await fetch('https://api.github.com/users');
  data = await response.json()
  console.log(data);

  view(data)

};

function view(data) {
  for (user of data) {
    const userDiv = document.createElement('div');
    userDiv.id = "oneUser"
    const userAvatar = document.createElement('img');
    userAvatar.id = "user_avatar"
    const userName = document.createElement('h3');
    const showButton = document.createElement('button');
    const userType = document.createElement('p');
    const userAdmin = document.createElement('p');
    usersDiv.appendChild(userDiv);
    userDiv.appendChild(userAvatar);
    userAvatar.src = user.avatar_url;
    userDiv.appendChild(userName);
    userName.innerText = user.login;
    userDiv.appendChild(showButton);
    showButton.innerText = "Show more";
    userDiv.appendChild(userType);
    userType.innerText = "Rank: " + user.type;
    userDiv.appendChild(userAdmin);
    userAdmin.innerText = "Admin: " + user.site_admin;
  }
}

getData()



const searchData = (e) => {
  console.log(e);
  const searchValue = e.target.value;
  console.log(searchValue);
  const filterData = data.filter(function(data) {
    data.login.indexOf(e.target.value) == 0
  })
  console.log(filterData);
  
}


searchInput.addEventListener('input', (e) => {
  searchData(e)
});