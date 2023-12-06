let userList = [
    {nameID:'0000', userName:'Admin', status:"connect", socket:""},
    {nameID:'1111', userName:'nissim1', status:"connect", socket:""},
    {nameID:'2222', userName:'reuven', status:"connect", socket:""},
    {nameID:'3333', userName:'refael', status:"connect", socket:""},
    {nameID:'4444', userName:'moshe', status:"connect", socket:""},
    {nameID:'5555', userName:'Erik', status:"disconncet", socket:""},
    {nameID:'6666', userName:'dan', status:"disconncet", socket:""},
    {nameID:'7777', userName:'noam', status:"disconncet", socket:""},
    {nameID:'8888', userName:'segiv', status:"disconncet", socket:""}
]

let roomList = [
    {status:"open", roomID:'01233', roomName:"main", owner:"Server", members:['0000','1111','2222','3333','4444','5555','6666','7777','8888','9999']},
    {status:"open", roomID:'01234', roomName:"room-10", owner:"Server", members:['0000','1111','2222','3333','4444','5555']},
    {status:"open", roomID:'01235', roomName:"room-20", owner:"Admin", members:['0000','1111','2222','4444','5555','9999']},
    {status:"open", roomID:'01236', roomName:"room-30", owner:"other", members:['0000','1111','3333','4444','5555','8888']},
    {status:"open", roomID:'01237', roomName:"room-40", owner:"User", members:['0000','2222','3333','4444','5555','7777']},
    {status:"open", roomID:'01238', roomName:"room-50", owner:"User", members:['0000','1111','2222','3333','4444','6666']}
]

export default {roomList,userList}
