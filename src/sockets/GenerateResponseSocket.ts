import {Server, Socket} from 'socket.io';

export const generateResponse = async (socket:Socket, io: Server) => {
    socket.on('create-game',async({})=>{
        try{
            let gameCheck = await MathGame.findOne({'players.socketID':socket.id});
            if(!gameCheck){
                let game = new MathGame();

                const operationsData = getData(dificultad);
                game.operation=operationsData;

                game.mode=mode;
                game.dificultad=dificultad;
                game.duracion=duracion;
                game.ptsWin=ptsWin;

                

                game.publico=publico==='1'?false:true;
                if(game.publico===true)
                    game.startDuration=120
                else
                    game.startDuration=5

                let player = {
                    socketID: socket.id,
                    isPartyLeader: true,
                    consumables : [],
                    nickName
                }

                game.players.push(player);
                game = await game.save();

                const gameID = game._id.toString();
                socket.join(gameID);
                io.to(gameID).emit('updateGame',game);
            }
        }catch(err){
            console.log(err);
        }
    });
};