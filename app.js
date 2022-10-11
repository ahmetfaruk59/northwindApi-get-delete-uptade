var closeBut = document.getElementsByClassName('closee')[0],
    modal = document.getElementsByClassName('modal-contt')[0],
    loginBut = document.getElementsByClassName('loginn')[0];

//close
function x() {
    modal.style.display = "none";
}

closeBut.onclick = x;

loginBut.onclick = function () {
    modal.style.display = "block";
}

window.onclick = function (e) {
    if (e.target.className === 'modal-contt') {
        e.target.style.display = 'none';
    }
}


// Get Categories ========================

function getCategories() {

    document.querySelector('tbody').innerHTML = "";


    fetch("https://northwind.vercel.app/api/categories")
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {

                var trElement = document.createElement('tr');

                var tdId = document.createElement('td');
                tdId.innerText = element.id;

                var tdDesc = document.createElement('td');
                tdDesc.innerText = element.description;

                var tdName = document.createElement('td');
                tdName.innerText = element.name;

                var tdDelete = document.createElement('button');
                tdDelete.innerHTML = 'Delete'
                tdDelete.className = 'btn-op btn-delete';
                tdDelete.id = element.id;

                var tdDiv = document.createElement('div');
                tdDiv.className = 'operation-btn';


                tdDelete.addEventListener('click', function (e) {
                    let deleteId = e.target.id;
                    fetch("https://northwind.vercel.app/api/categories/" + deleteId, {
                            method: 'DELETE'
                        })
                        .then(res => {
                            if (res.status == 200) {
                                getCategories();
                            }
                        })
                })

                tdDiv.appendChild(tdDelete);
                trElement.appendChild(tdId);
                trElement.appendChild(tdDesc);
                trElement.appendChild(tdName);
                trElement.appendChild(tdDiv);

                document.getElementsByTagName('tbody')[0].appendChild(trElement);


            });

        })


}


function addCategories() {
    var newProduct = {
        description: document.querySelector('.description-input').value,
        name: document.querySelector('.name-input').value,
    }

    fetch("https://northwind.vercel.app/api/categories", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
        .then(res => res.json())
        .then(data => {
            alert("Your data has been sent.");
            getCategories();
        })
}