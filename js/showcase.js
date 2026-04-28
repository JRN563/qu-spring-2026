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

      config(); 

      // window.addEventListener('load', resizeAllItems);
      // window.addEventListener('resize', resizeAllItems);
    })
    .catch(error => {
      console.error('Error:', error)
    });

  //make main page grid
  function config(){
    let grid = document.getElementById('mainGrid');

    let gridContent = '';

    data.forEach((d, i) => {
      gridContent += `
        <a id="slat-${i}" class="slat" href="articles/${d.link}">
          <img class="thumbnailImg" src="images/${d.heroImg}">
          <div class="slatTitle">${d.headline}</div>
          <div class="slatSubhed">${d.subhed}</div>
          <div class="landingpage byline">${d.byline}</div>
        </a>
      `
    })
    
    grid.innerHTML = gridContent;

  }

})();