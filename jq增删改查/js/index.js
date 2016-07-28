/**
 * Created by Administrator on 2016/7/19 0019.
 */
$.ajax(
    {
        url: '/get',
        type: 'get',
        async: true,
        success: function (data) {
            var str = '';
            data.forEach(function (item, index) {
                str += ' <tr>' +
                    '<td>' + item.name + '</td>' +
                    '<td>' + item.type + '</td>' +
                    '<td>' + item.price + '</td>' +
                    '<td><button type="button" class="update" num=' + index + ' >update</button></td>' +
                    '<td><button type="button" class="delete" num=' + index + ' >delete</button></td>' +
                    '</tr>'
            })
            $('#td').html(str)
            $('.delete').click(function () {
                var num = ($(this).attr('num'))
                $.ajax(
                    {
                        url: '/delete',
                        type: 'get',
                        async: true,
                        success: function (data) {
                            window.location.reload();
                        },
                        data: 'id=' + num
                    }
                )
            })
            $('.update').click(function () {
                var obj={}
                    console.log($(this).parent().parent().children()[0].innerHTML)
                var num = ($(this).attr('num'))
                var inputs = $('#form').children('input')
                obj.name = inputs[0].value=$(this).parent().parent().children()[0].innerHTML;
                obj.type = inputs[1].value=$(this).parent().parent().children()[1].innerHTML;
                obj.price = inputs[2].value=$(this).parent().parent().children()[2].innerHTML
                obj.id=num;
                $('#update').on('click',function(){
                    obj.name = inputs[0].value
                    obj.type = inputs[1].value
                    obj.price = inputs[2].value
                    $.ajax(
                        {
                            url: '/update',
                            type: 'post',
                            async: true,
                            success: function (data) {

                            },
                            data: JSON.stringify(obj)
                        } )
                    setTimeout(function () {
                        window.location.reload();
                    }, 100)
                })

            })
        }
    }
)

$('#add').on('click', function () {
    var obj = {}
    var inputs = $('#form').children('input')
    obj.name = inputs[0].value,
        obj.type = inputs[1].value.split(',')
    obj.price = inputs[2].value
    $.ajax(
        {
            url: '/add',
            type: 'post',
            async: true,
            success: function (data) {

            },
            data: JSON.stringify(obj)
        }
    )
    setTimeout(function () {
        window.location.reload();
    }, 10)
})

