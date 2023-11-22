let cl = console.log;

/// posts => create object
//// GET=>dta get from dtatbase
////patch and put=>uppdate
//////delete
let card = document.getElementById('card')
let postformcontrol = document.getElementById('postform');
let titlecontrol = document.getElementById('title');
let bodycontrol = document.getElementById('body');
let useridcontrol = document.getElementById('userid');






let baseurl = `https://jsonplaceholder.typicode.com`



let posturl = `${baseurl}/posts`
cl(posturl)


///2>configuration


// let xhr2 = new XMLHttpRequest();


// xhr2.open('GET', xhr);


// xhr2.send()

let postarry = [];





const onhandler = (eve) => {

    eve.preventDefault();
    let newpost = {
        title: titlecontrol.value,
        body: bodycontrol.value,
        userid: useridcontrol.value
    }
    cl(newpost);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', posturl, true);

    xhr.send(JSON.stringify(newpost));

    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
            newpost.id = JSON.parse(xhr.response).id;
            postarry.push(newpost);
    
            tempalting(postarry);
            Swal.fire({
                title: "Good job!",
                text: "You  have created post",
                icon: "success"
              });
            
        }

    }
    postformcontrol.reset()
}


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

const gethandler = () => {
    let xhr2 = new XMLHttpRequest();


      xhr2.open('GET', posturl);


     xhr2.send()
    xhr2.onload = function gt() {
        // cl(xhr2.response)

        if (xhr2.status === 200) {
            postarry = JSON.parse(xhr2.response)/// doing parse
            // cl(data)
            tempalting(postarry)
        } else {
            alert("something went wrong")
        }

    }


}
gethandler()

postformcontrol.addEventListener('submit', onhandler)














