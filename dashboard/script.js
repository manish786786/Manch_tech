let sortCheck = false;

$(document).ready(function () {

    //  mobile nav
    $('.js--nav-icon').click(function () {
        var nav = $('.js--main-nav')
        var icon = $('.js--nav-icon i')
        nav.slideToggle(200);

        if (icon.hasClass('fa fa-plus-square')) {
            icon.addClass('fa fa-close')
            icon.removeClass('fa fa-plus-square')
        } else {
            icon.removeClass('fa fa-close')
            icon.addClass('fa fa-plus-square')
        }
    })


    // first time getting data
    let $list = $('#list')
    $.ajax({
        type: 'GET',
        url: 'https://jsonplaceholder.typicode.com/posts',
        success: function (data) {


            var x = document.getElementById("prev");
            x.style.display = "none";

            if (!JSON.parse(localStorage.getItem('data'))) {
                let dataArray = []
                for (let i = data.length - 1; i >= 0; i--) {
                    dataArray.push(data[i])
                }
                localStorage.setItem(`data`, JSON.stringify(dataArray));

                // $.each(dataArray, function (i, item) {
                for (let i = 0; i < 10; i++) {
                    $list.append(
                        '<tr>' +
                        '<td>' + dataArray[i].id + '</td>' +
                        '<td>' + dataArray[i].userId + '</td>' +
                        '<td>' + dataArray[i].title + '</td>' +
                        '<td>' + dataArray[i].body + '</td>' +
                        '<td>' + '<button type="button" class="btn btn-success btn-xs" ><a href="../form/form.html">Edit</a></button>' + '</td>' +
                        '<td>' + '<button type="button" class="btn btn-danger btn-xs">Delete</button>' + '</td>' +
                        + '</tr>')
                }

                // })
            } else {
                let data = JSON.parse(localStorage.getItem('data'))
                for (let i = 0; i < 10; i++) {
                    $list.append(
                        '<tr>' +
                        '<td>' + data[i].id + '</td>' +
                        '<td>' + data[i].userId + '</td>' +
                        '<td>' + data[i].title + '</td>' +
                        '<td>' + data[i].body + '</td>' +
                        '<td>' + '<button type="button" class="btn btn-success btn-xs" ><a href="../form/form.html">Edit</a></button>' + '</td>' +
                        '<td>' + '<button type="button" class="btn btn-danger btn-xs">Delete</button>' + '</td>' +
                        + '</tr>')
                }

            }

        }
    })

    // delete function
    $('.table tbody').on('click', '.btn-danger', function () {

        let currentRow = $(this).closest('tr')
        let col = currentRow.find('td:eq(0)').text();
        $(this).closest('tr').remove();
        let data = JSON.parse(localStorage.getItem('data'))
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == col) {
                data.splice(i, 1)
            }
        }
        localStorage.setItem(`data`, JSON.stringify(data));
    })

    //edit function
    $('.table tbody').on('click', '.btn-success', function () {

        let currentRow = $(this).closest('tr')
        let col1 = currentRow.find('td:eq(0)').text();
        let col2 = currentRow.find('td:eq(1)').text();
        let col3 = currentRow.find('td:eq(2)').text();
        let col4 = currentRow.find('td:eq(3)').text();
        let obj = {
            "id": col1,
            "userId": col2,
            "title": col3,
            "body": col4
        }
        localStorage.setItem(`row`, JSON.stringify(obj));
    })


    // search 
    $("#search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#list tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

})


//sorting
function sort() {

    if (!sortCheck) {
        sortCheck = true
        let sortedData = []
        let prePareObj = {
            0: "id",
            1: "userId",
            2: "title",
            3: "body"
        }
        var myTab = document.getElementById('myTable');

        for (i = 1; i < myTab.rows.length; i++) {
            var objCells = myTab.rows.item(i).cells;

            let tempObj = {
            }
            // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
            for (var j = 0; j < 4; j++) {
                tempObj[prePareObj[j]] = objCells.item(j).innerHTML
            }
            sortedData.push(tempObj)
        }

        $("#list").empty();
        let $list = $('#list')
        for (let i = sortedData.length-1; i >= 0; i--) {
            $list.append(
                '<tr>' +
                '<td>' + sortedData[i].id + '</td>' +
                '<td>' + sortedData[i].userId + '</td>' +
                '<td>' + sortedData[i].title + '</td>' +
                '<td>' + sortedData[i].body + '</td>' +
                '<td>' + '<button type="button" class="btn btn-success btn-xs" ><a href="../form/form.html">Edit</a></button>' + '</td>' +
                '<td>' + '<button type="button" class="btn btn-danger btn-xs">Delete</button>' + '</td>' +
                + '</tr>')
        }
    } else {
        sortCheck = false

        let sortedData = []
        let prePareObj = {
            0: "id",
            1: "userId",
            2: "title",
            3: "body"
        }
        var myTab = document.getElementById('myTable');

        for (i = 1; i < myTab.rows.length; i++) {
            var objCells = myTab.rows.item(i).cells;

            let tempObj = {
            }
            // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
            for (var j = 0; j < 4; j++) {
                tempObj[prePareObj[j]] = objCells.item(j).innerHTML
            }
            sortedData.push(tempObj)
        }


        $("#list").empty();
        let $list = $('#list')
        for (let i = 0; i < sortedData.length; i++) {
            $list.append(
                '<tr>' +
                '<td>' + sortedData[i].id + '</td>' +
                '<td>' + sortedData[i].userId + '</td>' +
                '<td>' + sortedData[i].title + '</td>' +
                '<td>' + sortedData[i].body + '</td>' +
                '<td>' + '<button type="button" class="btn btn-success btn-xs" ><a href="../form/form.html">Edit</a></button>' + '</td>' +
                '<td>' + '<button type="button" class="btn btn-danger btn-xs">Delete</button>' + '</td>' +
                + '</tr>')
        }
    }

}


// pagination
function next() {
    let data = JSON.parse(localStorage.getItem('data'))
    let lastRowIdData = document.getElementById("list").rows[9].cells.item(0).innerHTML

    let startIndex = 0;
    for (let i = 0; i < data.length; i++) {
        if (lastRowIdData == data[i].id) {
            startIndex = data.indexOf(data[i]) + 1;
        }
    }

    $("#list").empty();
    let $list = $('#list')

    let lastIndex = startIndex + 10

    if (lastIndex == data.length + 1) {
        var x = document.getElementById("next");
        x.style.display = "none";
    } else {
        var x = document.getElementById("prev");
        x.style.display = "block";
    }

    for (let i = startIndex; i < lastIndex; i++) {
        $list.append(
            '<tr>' +
            '<td>' + data[i].id + '</td>' +
            '<td>' + data[i].userId + '</td>' +
            '<td>' + data[i].title + '</td>' +
            '<td>' + data[i].body + '</td>' +
            '<td>' + '<button type="button" class="btn btn-success btn-xs" ><a href="../form/form.html">Edit</a></button>' + '</td>' +
            '<td>' + '<button type="button" class="btn btn-danger btn-xs">Delete</button>' + '</td>' +
            + '</tr>')
    }
}

function previous() {
    let data = JSON.parse(localStorage.getItem('data'))
    let firstRowIdData = document.getElementById("list").rows[0].cells.item(0).innerHTML

    let lastIndex = 0;
    for (let i = 0; i < data.length; i++) {
        if (firstRowIdData == data[i].id) {
            lastIndex = data.indexOf(data[i]);
        }
    }

    $("#list").empty();
    let $list = $('#list')

    let startIndex = lastIndex - 10

    if (startIndex == 0) {
        var x = document.getElementById("prev");
        x.style.display = "none";
    } else {
        var x = document.getElementById("next");
        x.style.display = "block";
    }

    for (let i = startIndex; i < lastIndex; i++) {
        $list.append(
            '<tr>' +
            '<td>' + data[i].id + '</td>' +
            '<td>' + data[i].userId + '</td>' +
            '<td>' + data[i].title + '</td>' +
            '<td>' + data[i].body + '</td>' +
            '<td>' + '<button type="button" class="btn btn-success btn-xs" ><a href="../form/form.html">Edit</a></button>' + '</td>' +
            '<td>' + '<button type="button" class="btn btn-danger btn-xs">Delete</button>' + '</td>' +
            + '</tr>')
    }
}