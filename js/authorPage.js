(function() {
  let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQP652f2RyelxKFWrpkCzGkSHuHNVt3EYKvyVIzM10xyUttQ9FBMlN8HXhDRaOPyUqWvsGNJGQT3L-3/pub?gid=0&single=true&output=csv'

  //parser

  function parseCSV(url) {
    return new Promise((resolve, reject) => {
      Papa.parse(url, {
        download: true, //for remote files
        header: true,
        error: reject,
        complete: resolve
      });
    });
  }

  Promise.all([parseCSV(url)])
    .then(results => {
      data = results[0].data;
      authorPage();
    })
    .catch(error => {
      console.error('Error:', error)
    });

  //populate authors page
  function authorPage(){
    let authorPage = document.querySelector('#authorPage')

    let authorContent = '';

    data.forEach((d, i) => {
     authorContent += `
      <div class="authorSection">
        <a href="articles/${d.link}">${d.headline}</a>
        <br>
        <div class="byline">${d.byline}</div>
      </div>
      
      `

    })

    authorPage.innerHTML = authorContent;
  }
})();