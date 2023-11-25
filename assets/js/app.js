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
cl(useridcontrol)
let updatecontrol = document.getElementById('update');
let addbtn = document.getElementById('addbtn');





let baseurl = `https://jsonplaceholder.typicode.com`



let posturl = `${baseurl}/posts`
cl(posturl)


///2>configuration


// let xhr = new XMLHttpRequest();


// xhr2.open('GET', xhr);


// xhr2.send()

let postarry = [];
const onhandler = (eve) => { ///// ist step

    eve.preventDefault();
    let newpost = {
        title: titlecontrol.value,
        body: bodycontrol.value,
        userid: useridcontrol.value
    }
    cl(newpost);//// if onhandler clicked in create obj newpost array pass

    createobj(newpost); // paasing here and taking argumnet upper side


}
const createobj = (postobj) => { //// 2nd step by hitting on add post this will call in 1st step
    let xhr = new XMLHttpRequest();//// creating new instance to send created obj
    xhr.open('POST', posturl, true);////post with posturl // sending to backend

    xhr.send(JSON.stringify(postobj));//////stringyfy javscript object to json

    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {////// two condiytion as we createing and getting dat
            postobj.id = JSON.parse(xhr.response).id;///// we passing object as argument
            postarry.push(postobj);/// pushing  in post array by parameeter
            tempalting(postarry);// temoplating in post array
            Swal.fire({
                title: "Good job!",
                text: "You  have created post",
                icon: "success"
            });


        }
        postformcontrol.reset()


    }
}

const clickhandler = (eve) => {//// edit button functionlity
    // cl(eve)
    let getid = eve.closest('.card').id;/// to get id 
    localStorage.setItem('get', getid)
    cl(getid);
    let getobjurl = `${baseurl}/posts/${getid}`;//////https://jsonplaceholder.typicode.com/posts/100
    cl(getobjurl)
    let xhr = new XMLHttpRequest;//// creating instance
    xhr.open("GET", getobjurl, true);//// get data from getobjurl
    xhr.send();
    xhr.onload = function () {/// onlaod method of https requests
        if (xhr.status === 200) { //// giving conditon status fet status code=200
            cl(xhr.response)

            let getobj = JSON.parse(xhr.response);//// to json data to jvascipt used parse
            cl(getobj)
            titlecontrol.value = getobj.title//
            bodycontrol.value = getobj.body/// to patch the on edit button
            useridcontrol.value = getobj.userId////

            addbtn.classList.add('d-none')
            updatecontrol.classList.remove('d-none')
        }
    }
    postformcontrol.reset()

}

const postupdate = (ele) => {
    let updateobj = {
        title: titlecontrol.value,
        body: bodycontrol.value,
        useridcontrol: useridcontrol.value
    }
    cl(updateobj)
    let getupdateid = localStorage.getItem('get')
    cl(getupdateid)
    let updateurl = `${posturl}/${getupdateid}`
    cl(updateurl)

    let xhr = new XMLHttpRequest();
    xhr.open('PATCH', updateurl, true)
    xhr.send(JSON.stringify(updateobj))
    xhr.onload = function () {
        if (xhr.status === 200) {
            let getid2 = postarry.findIndex(post => {

                return post.id == getupdateid///take one by one array
            })
            cl(getid2)///// index number
            postarry[getid2].title = updateobj.title;/// to update or change keys of crated obj
            postarry[getid2].body = updateobj.body;
            postarry[getid2].userid = updateobj.userid;

            tempalting(postarry);
            Swal.fire({
                title: "POST UPDATED",
                text: "things in post are updated",
                icon: "success"
            });
        }
    }
    postformcontrol.reset()


}
const deletehandler = (ele) => {
    cl(ele)
    let deleteobj = ele.closest('.card').id;
    cl(deleteobj)
    let deleteurl = `${posturl}/${deleteobj}`
    cl(deleteurl)
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', deleteurl, true);
    xhr.send();
    xhr.onload = function () {
        cl(xhr.response)
        if (xhr.status === 200) {
            let delete2 = document.getElementById(deleteobj);
            cl(delete2);
            delete2.remove();
            Swal.fire({
                title: "POST DELETED",
                text: "things in post are deleted",
                icon: "success"
            });
        }



    }



}


let tempalting = (arr => {
    let result = ``;
    arr.forEach(ele => {
        result += `  <div class="card mb-4"id="${ele.id}">
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
            <button class="btn btn-primary" onclick="clickhandler(this)"> edit</button>
            <button class="btn btn-danger"onclick="deletehandler(this)"> delete</button>
        </div>
    </div>`

    });
    card.innerHTML = result;
})

const gethandler = () => { ////for getting data
    let xhr2 = new XMLHttpRequest();


    xhr2.open('GET', posturl); //// get method


    xhr2.send()
    xhr2.onload = function gt() {
        // cl(xhr2.response)

        if (xhr2.status === 200) { /// if status code
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
updatecontrol.addEventListener('click', postupdate)















