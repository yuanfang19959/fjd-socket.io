$(document).ready(function () {
    let reg = /^[a-z_0-9]{3,15}$/
    var userID;
    // 点击立即进入聊天室
    $('.btnR').on('click', function () {
        userID = $('input[name="userID"]').val();
        if (!reg.test(userID)) {
            alert('仅支持 a-z_0-9 中3-15位组成的名称！')
            return;
        }
        // 进入聊天室后存储userID
        sessionStorage.setItem('userID', userID);
        
        // 发送userID给服务器 以便通知所有用户有人加入聊天室了
        socket.emit('userID', { name: userID });
        $('.alertBox, .bear').hide();
        $('.jimi').show()
    })


    /*发送内容模块 */
    //  发送框三个小图标动画及事件
    // 使用此方式添加事件只能用闭包，否则作用域链中的i会被替换。只有一个图片能实现功能；
    var imgArr = $('.inputBox_top img'),
        len = imgArr.length;
    for (var i = 0; i < len; i++) {
        function a(i) {
            bindEvent(imgArr[i], 'mouseover', function () {
                getSRC(imgArr[i], i, 0);
            });
            bindEvent(imgArr[i], 'mouseout', function () {
                getSRC(imgArr[i], i, 1);
            });
            if (i != 0) {
                //当表情框显示的情况下，点击其他两个小图标 关闭表情框；
                bindEvent(imgArr[i], 'click', function () {
                    $('.emojstext').hide();
                });
                $('.upload').on('click', function () {
                    $('.emojstext').hide();
                })
            }
        }
        a(i);
    }

    // 先获取输入内容，并发送消息
    var btn1 = document.getElementById('dd');
    bindEvent(btn1, 'click', function () {
        var words = $('.textarea').text(),
            showContent;
        if (words.length > 0 && words.length < 150) {
            sendMes(0, words, userID); //发送消息
        } else if (words.length <= 0) {
            alert('请输入内容！');
        } else {
            console.log(words.length)
            alert('内容过长！')
        }
    });

    //点击表情显示表情框
    bindEvent(imgArr[0], 'click', function () {
        $('.emojstext').toggle();
    });

    //点击输入框关闭emoj表情
    $('.textarea').on('click', function () {
        $('.emojstext').hide();
    })

    //点击单个emoj表情，将其获取到输入框中
    var emoj = document.getElementById("emoj");
    eventProxy(emoj, 'click', 'span', function (e) {
        var e = e || event,
            target = e.target || e.srcElement;
        t = target.innerText;
        $('.textarea').text($('.textarea').text() + t);
        $("#emoj").hide();
    })

    // 获取图片并发送
    
//     var file = document.querySelector(".upload");
//     file.onchange = function () {
//         Array.from(this.files).forEach(fileItem => {
//         var reader = new FileReader();
//         reader.readAsDataURL(fileItem);
//         reader.onload = function() {
//             console.log(fileItem)
//             console.log(reader.result)
//             sendMes(1, reader.result, userID);
//         }
//     })
// }
var file = $(".upload");
file.change(function () {
    sendMes(1, getObjectURL(file[0].files[0]), userID);
});
// sendMes(1, getObjectURL(file[0].files[0]), userID);
});