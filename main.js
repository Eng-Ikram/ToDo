let note = document.getElementById('note');
let create = document.getElementById('create');
let cancel = document.getElementById('cancel');
let errorMessage = document.getElementById('errorMessage');
let text = "No tasks have added yet!";
let mood = 'add';
let temp;
let datanote;
//create
if (localStorage.task != null) {
    datanote = JSON.parse(localStorage.task);
    shownotes();
}
else {
    datanote = [];
}
empty();

create.onclick = function () {
    error_Message()
    let newnote = {
        note: note.value,
        completed: 0

    }
    if (note.value != '') {
        if (mood === 'add') { datanote.push(newnote); empty(); }
        else {
            datanote[temp] = newnote;
            console.log(mood)
            mood = 'add';
            cancel.style.display = 'none';
            console.log(mood)
            create.innerHTML = '<i class="fa-solid fa-plus"></i>';

        }
    } else {
        error_Message();
    }

    localStorage.setItem('task', JSON.stringify(datanote))
    cleardata();
    shownotes();
}
//clear input
function cleardata() {
    note.value = '';
}

//show
function shownotes() {
    let table = '';
    let taskStyle = '';
    for (let i = 0; i < datanote.length; i++) {
        checked_status = '';
        if (datanote[i].completed != 0) {
            checked_status = "checked";
            taskStyle = 'color:#B7B9BA;pointer-events:none';

        }
        else {
            checked_status = "";
            taskStyle = 'color:#460359;pointer-events:initial';
        }
        table += `
        <tr>
        <td><input type="checkbox" ${checked_status} id="complete${i}" onClick="complete(${i})"> </td>
        <td>${datanote[i].note}</td>
        <td><a href="#" onclick="updateNote(${i})" id="update${i}" style="${taskStyle}"><i class="fa-solid fa-pen" style="${taskStyle}"></i></a>
        <a href="#" onclick="alrt(${i})" id="delete${i}"><i class="fa-solid fa-trash" style="color: #460359;"></i></a></td>
        </tr>
        `
    }
    document.getElementById('show').innerHTML = table;
    let delete_btn = document.getElementById('deleteall')
    if (datanote.length > 0) {
        delete_btn.innerHTML = `<button onclick="deleteall()">Delete All</button>`
    } else {
        delete_btn.innerHTML = '';
    }

}
//delete
function deletenote(i) {
    datanote.splice(i, 1);
    localStorage.task = JSON.stringify(datanote);
    empty();
    shownotes();
    Swal.fire(
        'Deleted!',
        'Your task has been deleted.',
        'success'
    )
}
function deleteall() {
    localStorage.clear();
    datanote.splice(0);
    empty();
    shownotes();
}
// update
function updateNote(i) {
    note.value = datanote[i].note;
    create.innerHTML = '<i class="fa-sharp fa-solid fa-check" style="color: #ffffff;"></i>';
    mood = 'update';
    temp = i;
    cancel.style.display = 'block';
    note.focus();
}
// checkbox
function complete(i) {

    checkInput = document.querySelector(`#complete${i}`);
    let checkBox = document.getElementById(`complete${i}`);
    let UpdateIcon = document.getElementById(`update${i}`);
    if (checkInput.checked) {

        datanote[i].completed = 1;
        console.log(`update${i}`);
        UpdateIcon.childNodes[0].style.color = '#B7B9BA';
        UpdateIcon.style.pointerEvents = "none";

    } else {

        datanote[i].completed = 0;
        UpdateIcon.style.color = '#460359';
        UpdateIcon.style.pointerEvents = 'initial';
    }
    localStorage.task = JSON.stringify(datanote);
    shownotes();
}

//empty
function empty() {
    if (datanote.length == 0) {
        document.getElementById('emp').innerHTML = text;
    }
    else {
        document.getElementById('emp').innerHTML = '';
    }
}
//alert
function alrt(i) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to remove this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {

            deletenote(i);
        }

    })
}
// cancel
cancel.onclick = function () {
    mood = 'add';
    note.value = '';
    cancel.style.display = 'none';
    create.innerHTML = '<i class="fa-solid fa-plus"></i>';

}
// errorMessage
function error_Message() {
    if (note.value == '') {
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = 'please insert your task firstly <i class="fa-solid fa-triangle-exclamation" style="color: #9e0505;"></i>';
    } else {
        errorMessage.innerHTML = '';
        errorMessage.style.display = 'none';
    }
    shownotes();
}