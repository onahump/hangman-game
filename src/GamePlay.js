GamePlayManager = {   //ObjetoGamePlayManager
    init: function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; //Haciendo nuestro juego totalmente responsivo
        game.scale.pageAlignHorizontally = true; //Centrando nuestro juego horizontalmente
        game.scale.pageAlignVertically = true; // Centrando nuestro juego verticalmente
    },
    preload: function(){
        game.load.image('background', 'assets/img/background-image.png');
        game.load.image('button-play', 'assets/img/button-play2.png');
    },
    create: function(){
        game.add.sprite(0, 0, 'background');
        game.add.sprite(340, 470, 'button-play');
    },
    update: function(){

    }
}

var game = new Phaser.Game(1136,640, Phaser.CANVAS); //instanciamos juego en facer con sus especificaciones

game.state.add('gameplay',GamePlayManager); //Agregamos un estado que le vamos a llamar gameplay y se le asigna el objeto GamePlayMañager
game.state.start('gameplay'); //Llama a cada uno de los metodos

