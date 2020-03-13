
let check = false;
let checkId;

// on initzialize
$(document).ready(function () {
    let dataRecevied = JSON.parse(localStorage.getItem('row'))

    if (dataRecevied) {
        check = true
        checkId = document.getElementById("id").value = dataRecevied.id
        document.getElementById("id").value = dataRecevied.id
        document.getElementById("userId").value = dataRecevied.userId
        document.getElementById("title").value = dataRecevied.title
        document.getElementById("body").value = dataRecevied.body

        localStorage.removeItem("row");
    }else{
        let id = Math.round(Math.random() * 10000)
        document.getElementById("id").value = id
    }
})

// add entry
function add() {

    let id = document.getElementById("id").value
    let userID = document.getElementById("userId").value
    let title = document.getElementById("title").value
    let body = document.getElementById("body").value

    if (check) {
        let dataRecevied = JSON.parse(localStorage.getItem('data'))
        for (let i = 0; i < dataRecevied.length; i++) {
            if (dataRecevied[i].id == checkId) {
                dataRecevied.splice(i, 1)
            }
        }

        let obj = {
            "id": id,
            "userId": userID,
            "title": title,
            "body": body
        }

        dataRecevied.unshift(obj)
        localStorage.setItem(`data`, JSON.stringify(dataRecevied))
        ckeck == false
    } else {
        let obj = {
            "id": id,
            "userId": userID,
            "title": title,
            "body": body
        }
        let dataRecevied = JSON.parse(localStorage.getItem('data'))
        dataRecevied.unshift(obj)
        localStorage.setItem(`data`, JSON.stringify(dataRecevied))
    }

   
}

// validation
$(function () {

    let id = false;
    let userId = false;
    let title = false;
    let body = false;

    function check_id() {

        let username_length = $("#id").val().length;

        if (username_length < 1) {
            id = true;
        }

    }

    function check_userId() {

        let password_length = $("#userId").val().length;

        if (password_length < 1) {
            userId = true;
        }

    }

    function check_title() {

        let retype_password = $("#title").val().length;

        if ( retype_password < 1) {
            title = true;
        }
    }

    function check_body() {
        let pattern = $("#body").val().length
        if (pattern < 1) {
            body = true;
        }
    }

    $("#registration_form").submit(function () {

        check_id();
        check_userId();
        check_title();
        check_body();

        if (id == false && userId == false && title == false && body == false) {
            add()
            return true;
        } else {
            return false;
        }

    });

});

