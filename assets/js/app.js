let cl = console.log;

/// posts => create object
//// GET=>dta get from dtatbase
////patch and put=>uppdate
//////delete
let card = document.getElementById('card')





let baseurl = `https://jsonplaceholder.typicode.com`



let xhr = `${baseurl}/posts`
cl(xhr)


///2>configuration


let xhr2 = new XMLHttpRequest();


xhr2.open('GET', xhr);


xhr2.send()



let tempalting = (arr => {
    let result = ``;
    arr.forEach(ele => {
        result += `  <div class="card mb-4">
        <div class="card-header">
            <h1>
                ${ele.title}
            </h1>
        </div>
        <div class="card-body">
            <p>
               ${ele.body}
        </div>
        <div class="card-footer  d-flex justify-content-between">
            <button class="btn btn-primary"> edit</button>
            <button class="btn btn-danger"> delete</button>
        </div>
    </div>`

    });
    card.innerHTML = result;
})
xhr2.onload = function gt() {
    // cl(xhr2.response)

    if (xhr2.status === 200) {
        let data = JSON.parse(xhr2.response)/// doing parse
        // cl(data)
        tempalting(data)
    } else {
        alert("something went wrong")
    }

}


















