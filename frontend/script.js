const resultsList = document.querySelector('.resultsList');
const input = document.querySelector('.input');
const searchBtn = document.querySelector('.searchBtn');
let results = [];

//Search query and display results
searchBtn.addEventListener('click', () => {
  const searchQuerry = input.value.toLowerCase();

  fetch("https://snippets-json-server.vercel.app/results")
  .then(response => response.json())
  .then(data => {
    // Filter the data based on the search query
    const filteredData = data.filter(function(item) {
      return item.keywords.toLowerCase().includes(searchQuerry);
    });

    // Display the filtered data in the results list
    resultsList.innerHTML = "";
    filteredData.forEach(function(result) {
      resultsList.innerHTML += 
           `<li data-id="docID">
              <a href="${result.url}">
                  <h3 class="title result">${result.title}</h3>
                  <div class="link">${result.url}</div>
              </a>
              <a href="#"><span class="down-arrow"></span></a>
              <p class="description">${result.description}</p>
          </li>
          `; 
    }); 
  })
  .catch(error => {
    console.log(error)
  })
});


//Click saving
// Assume you have a container element with the class "results"
const searchResultsContainer = document.querySelector(".results");

searchResultsContainer.addEventListener("click", function(event) {
    saveClick();
});


/* const button = document.querySelector(".my-button");

button.addEventListener("click", function(e) {
    saveClick(2, "Test");
});

[{docId, 234324, title: 234343, descr}] */

function saveClick() {
    const newEntry = {
        position: position,
        name: title
      };
      
    const clickedElement = event.target;
  
    // Check if the clicked element is a search result
    if (clickedElement.classList.contains("result")) {
      // Get the current timestamp

      const timestamp = new Date();

      const data = {
        timestamp: timestamp,
        result: clickedElement.innerText
      };
      
    fetch('http://localhost:3000/click', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(newEntry)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });
}
}
