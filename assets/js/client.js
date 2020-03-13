const socket = io('http://localhost:3000');

socket.on('userID', function (data) {
    const user = sessionStorage.getItem('userID');

    // 下面目的是防止自己登陆告诉自己已经进入了聊天室了
    if(user!== data.name) {
        $('.chatBox').append('<div class="notify">' + data.name + ' 登陆</div>')
    }
})

/**
 * 提醒用户某某某上线
 * @param {String} userID 用户的名称
 * @param {String} content 发送的内容
 */
function sendMessage(userID, content, type) {
    socket.emit('mes', { name: userID, msg: content, type: type});
}

socket.on('serverMes', function (data) {
    console.log(data);
    getMesFromServer(data)
})

/**
 * 获取群发的消息
 * @param {Object} mesOBJ { name: 用户名, msg: 内容, type: 0 文字 1图片}
 */
function getMesFromServer(mesOBJ) {
    const user = sessionStorage.getItem('userID');
    if (user === mesOBJ.name) return;
    let str = "";
    str += '<div class="personA">'
    str += '<div class="personNameA fontCommon">'+ mesOBJ.name +'</div>'
    str += '<div class="personContent">'
    str += '<img src="img/head.jpg" alt="">'
    str += '<span class="talkContent fontCommon">' 
    if(mesOBJ.type === 0){
        str += mesOBJ.msg
    }else if(mesOBJ.type === 1){
        str += '<img src=' + mesOBJ.msg + '>'
    }
    str += '</span>'
    str += '<span class="triangle"></span>'
    str += '</div>'
    str += '</div>'
    //插入节点之后清空dom，否则干扰下一次运行
    $('.chatBox').append(str);
    str = "";  
    //发送完毕消息后，清空输入框；
    $('.textarea').text(''); 
    //发送内容后重新获取高度，使其保持在最底部
    showContent = $(".chatBox");  
    showContent[0].scrollTop = showContent[0].scrollHeight;
}
// }