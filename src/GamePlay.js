
var STATE_GAME_NONE                 = 0;
var STATE_GAME_LOADING              = 1;
var STATE_GAME_MAIN_MENU            = 2;
var STATE_GAME_PLAYING              = 4;
var STATE_GAME_GAME_OVER            = 5;
var STATE_GAME_WIN                  = 6;

var stateGame = STATE_GAME_NONE; //estado inicial

GamePlayManager = {   //ObjetoGamePlayManager
    init: function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; //Haciendo nuestro juego totalmente responsivo
        game.scale.pageAlignHorizontally = true; //Centrando nuestro juego horizontalmente
        game.scale.pageAlignVertically = true; // Centrando nuestro juego verticalmente
    },
    preload: function(){
        stateGame = STATE_GAME_LOADING;
        game.load.image('background', 'assets/img/background-image.png');
        game.load.image('button-play', 'assets/img/button-play2.png');
        game.load.image('title', 'assets/img/title.png');
        game.load.image('hangman', 'assets/img/complete_hangman.png');
    },
    create: function(){
        game.add.sprite(0, 0, 'background');
        this.title = game.add.sprite(game.width/2, 100, 'title');
        this.hangmanComplete = game.add.sprite(game.width/2, 350, 'hangman');
        this.buttonPlay = game.add.button(game.width/2, 500, 'button-play', this.startGame, this); //new Button(posicion x , posicion x, llave , funcion a llamar , callback Context GAMEPlayManager (this), imagen antes de pasar el raton, imagen al pasar el raton, imagen a cargar antes de dar click, imagen al cagar al dar click)
    },
    startGame: function(){
        stateGame = STATE_GAME_PLAYING;
    },
    update: function(){
        switch(stateGame){ //Maquina de estados
            case STATE_GAME_NONE:
                break;

            case STATE_GAME_LOADING:
                break;
            
            case STATE_GAME_MAIN_MENU:

                break;
            
            case STATE_GAME_PLAYING:
                    this.title.visible = false;
                    this.hangmanComplete.visible = false;
                    this.buttonPlay.visible = false;
                break;

            case STATE_GAME_GAME_OVER:
                    console.log("Game Over")
                break;

            case STATE_GAME_WIN:
                break;
        }
    }
}

var game = new Phaser.Game(1136,640, Phaser.AUTO); //instanciamos juego en facer con sus especificaciones

game.state.add('gameplay',GamePlayManager); //Agregamos un estado que le vamos a llamar gameplay y se le asigna el objeto GamePlayMañager
game.state.start('gameplay'); //Llama a cada uno de los metodos

