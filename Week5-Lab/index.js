let prom = await fetch('https://moxie.foxnews.com/google-publisher/latest.xml');
let text = await prom.text();

let parser = new DOMParser();
let xmlDoc = parser.parseFromString(text, "text/xml");

const items = xmlDoc.querySelectorAll("item");

items.forEach( (el)=>{
    let title       = el.querySelector('title').textContent;
    let description = el.querySelector('description').textContent;
    let guid        = el.querySelector('guid').textContent;

    let div = document.createElement('div');
    document.body.appendChild( div );
    div.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
    `;
    if ( guid ) div.innerHTML += `<a href='${guid}'>LINK</a>`;

});