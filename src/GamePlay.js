var STATE_GAME_NONE                 = 0;
var STATE_GAME_LOADING              = 1;
var STATE_GAME_MAIN_MENU            = 2;
var STATE_GAME_PLAYING              = 4;
var STATE_GAME_GAME_OVER            = 5;
var STATE_GAME_WIN                  = 6;
var correct = [];
var bmd;

var stateGame = STATE_GAME_NONE; //estado inicial
var list = ["resistencia", "arduino", "robot", "perro", "creacion","marrano"];

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
        game.load.image('platform', 'assets/img/platform.png');
        game.load.image('body', 'assets/img/body.png');
        game.load.image('head', 'assets/img/head.png');
        game.load.image('body', 'assets/img/body.png');
        game.load.image('armLeft', 'assets/img/hand_left.png');
        game.load.image('armRight', 'assets/img/hand_right.png');
        game.load.image('legRight', 'assets/img/leg_right.png');
        game.load.image('legLeft', 'assets/img/leg_left.png');
    },
    create: function(){
        game.add.sprite(0, 0, 'background');
        this.title = game.add.sprite(game.width/2, 90, 'title');
        this.title.anchor.setTo(0.5);
        this.hangmanComplete = game.add.sprite(game.width/2, 300, 'hangman');
        this.hangmanComplete.anchor.setTo(0.5);
        this.hangmanComplete.scale.setTo(0.7);
        this.platform = game.add.sprite(game.width/2, 250, 'platform');
        this.platform.anchor.setTo(0.5);
        this.buttonPlay = game.add.button(game.width/2, 520, 'button-play', this.startGame, this); //new Button(posicion x , posicion x, llave , funcion a llamar , callback Context GAMEPlayManager (this), imagen antes de pasar el raton, imagen al pasar el raton, imagen a cargar antes de dar click, imagen al cagar al dar click)
        this.buttonPlay.anchor.setTo(0.5);
        this.head = game.add.sprite(582, 149, 'head');
        this.head.scale.setTo(0.7);
        this.body = game.add.sprite(600, 200, 'body');
        this.body.scale.setTo(0.7);
        this.armRight = game.add.sprite(612, 185, 'armRight');
        this.armRight.scale.setTo(0.7);
        this.armLeft = game.add.sprite(564, 185, 'armLeft');
        this.armLeft.scale.setTo(0.7);
        this.legRight = game.add.sprite(612, 270, 'legRight');
        this.legRight.scale.setTo(0.7);
        this.legLeft = game.add.sprite(564, 270, 'legLeft');
        this.legLeft.scale.setTo(0.7);
    },
    startGame: function(){
        this.pressIncorrect = 0;
        stateGame = STATE_GAME_PLAYING;
        this.randomWord = list[Math.floor(Math.random()*list.length)];
        this.showingWord(this.randomWord);
        this.platform.visible = true;
        
    },
    gettingLetterFromKeyboard:function(char){
        bmd.cls();
        //  Set the x value we'll start drawing the text from
        var x = 300;
        
        // Verifying no match letter when someone pressed a button
        if(!this.randomWord.includes(char)){
            this.pressIncorrect += 1;
            this.pressOnAIncorrectWord();  
        }

        //  Loop through each letter of the word being entered and check them against the key that was pressed
        for (var i = 0; i < this.randomWord.length; i++){
            var letter = this.randomWord.charAt(i);
            //  If they pressed one of the letters in the word, flag it as correct
            if (char === letter){
                correct[letter] = true;   
            }
            //  Now draw the word, letter by letter, changing colour as required
            if (correct[letter]){
                bmd.context.fillStyle = '#00ff00';
            }
            else{
                bmd.context.fillStyle = '#ffffff';
            }
            bmd.context.fillText(letter, x, 550);
            x += bmd.context.measureText(letter).width;
        }
        this.verifyingIfWin();
    },
    verifyingIfWin: function(){ //Veryfying if the user game
        var list = [];

        Object.keys(correct).forEach(key => { //Obtaining all values from hash
            let value = correct[key];
            list.push(value); //Pushing all values into our list
        });
        
        function allElementsAreTrue(currentValue) {
            return currentValue === true;
        }

        if(list.every(allElementsAreTrue)){ //Verifying if all elements into our list are true
            this.winGame(); //If all elements are true we will win
        }
    },
    showingWord: function(word){
        for (var i = 0; i < word.length; i++)
        {
            correct[word[i]] = false;
        }

        //  This is our BitmapData onto which we'll draw the word being entered
        bmd = game.make.bitmapData(1136, 640);
        bmd.context.font = '140px Arial';
        bmd.context.fillStyle = '#ffffff';
        bmd.context.fillText(word, 300, 550);
        bmd.addToWorld();
    },
    pressOnAIncorrectWord: function(){ //How many times user pressed an incorrect letter which no match with our word.
        var errorCounter = this.pressIncorrect;
        switch(errorCounter) {
            case 1:
                this.head.visible = true;
              break;
            case 2:
                this.body.visible = true;
              break;
            case 3:
                this.armRight.visible = true;
              break
            case 4:
                this.armLeft.visible = true;
              break;
            case 5:
                this.legLeft.visible = true;
              break;
            case 6:
                this.legRight.visible = true;
                this.gameOver();
              break
          }
    },
    gameOver: function(){  //Game over
        stateGame = STATE_GAME_GAME_OVER;
        game.input.keyboard.stop();
    },
    winGame: function(){ // Winn
        stateGame = STATE_GAME_WIN;
        game.input.keyboard.stop();
    },
    update: function(){
        switch(stateGame){ //Maquina de estados
            case STATE_GAME_NONE:
                break;

            case STATE_GAME_LOADING:
                    this.platform.visible = false;
                    this.head.visible = false;
                    this.body.visible = false;
                    this.armRight.visible = false;
                    this.armLeft.visible = false;
                    this.legRight.visible = false;
                    this.legLeft.visible = false; 
                break;
            
            case STATE_GAME_MAIN_MENU:
                break;
            
            case STATE_GAME_PLAYING:
                    this.title.visible = false;
                    this.hangmanComplete.visible = false;
                    this.buttonPlay.visible = false;
                    this.platform.visible = true;
                    //  Capture all key presses
                    game.input.keyboard.addCallbacks(this, null, null, this.gettingLetterFromKeyboard);
                break;

            case STATE_GAME_GAME_OVER:
                    console.log("Game Over");
                break;

            case STATE_GAME_WIN:
                    console.log("You Win");
                break;
        }
    }
}

var game = new Phaser.Game(1136,640, Phaser.AUTO); //instanciamos juego en facer con sus especificaciones

game.state.add('gameplay',GamePlayManager); //Agregamos un estado que le vamos a llamar gameplay y se le asigna el objeto GamePlayMañager
game.state.start('gameplay'); //Llama a cada uno de los metodos

