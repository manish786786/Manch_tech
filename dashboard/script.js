

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

            if (!JSON.parse(localStorage.getItem('data'))) {
                let dataArray = []
                for (let i = data.length - 1; i >= 0; i--) {
                    dataArray.push(data[i])
                }
                localStorage.setItem(`data`, JSON.stringify(dataArray));

                // $.each(dataArray, function (i, item) {
                    for(let i=0;i<10;i++){
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
                for(let i=0;i<10;i++){
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
    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#list tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });

})


//sorting
function sort() {
    $("#list").empty();
    let data = JSON.parse(localStorage.getItem('data'))

    let sortedData = []

    for (let i = data.length - 1; i >= 0; i--) {
        sortedData.push(data[i])
    }

    let $list = $('#list')
    $.each(sortedData, function (i, item) {
        $list.append(
            '<tr>' +
            '<td>' + item.id + '</td>' +
            '<td>' + item.userId + '</td>' +
            '<td>' + item.title + '</td>' +
            '<td>' + item.body + '</td>' +
            '<td>' + '<button type="button" class="btn btn-success btn-xs" ><a href="../form/form.html">Edit</a></button>' + '</td>' +
            '<td>' + '<button type="button" class="btn btn-danger btn-xs">Delete</button>' + '</td>' +
            + '</tr>')
    })
}


// function next(){
//     let list =  document.getElementById("list").
//     console.log(list)
//     $("#list").empty();
//     let data = JSON.parse(localStorage.getItem('data'))
//     let $list = $('#list')
//     for(let i=0;i<10;i++){
//         $list.append(
//             '<tr>' +
//             '<td>' + data[i].id + '</td>' +
//             '<td>' + data[i].userId + '</td>' +
//             '<td>' + data[i].title + '</td>' +
//             '<td>' + data[i].body + '</td>' +
//             '<td>' + '<button type="button" class="btn btn-success btn-xs" ><a href="../form/form.html">Edit</a></button>' + '</td>' +
//             '<td>' + '<button type="button" class="btn btn-danger btn-xs">Delete</button>' + '</td>' +
//             + '</tr>')
//     }
// }

