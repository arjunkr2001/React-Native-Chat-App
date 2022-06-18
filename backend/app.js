const io = require("socket.io")(3000,{
	cors:{
		origin: '*'
	}
})

io.on("connection", socket =>{
	console.log(socket.id)
	
	socket.on('data', (data)=>{
		console.log(data)
		io.emit('data',data)
	})
})

