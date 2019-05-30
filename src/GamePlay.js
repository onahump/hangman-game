var STATE_GAME_NONE                 = 0;
var STATE_GAME_LOADING              = 1;
var STATE_GAME_MAIN_MENU            = 2;
var STATE_GAME_PLAYING              = 4;
var STATE_GAME_GAME_OVER            = 5;
var STATE_GAME_WIN                  = 6;


var stateGame = STATE_GAME_NONE; //estado inicial
var list = ["resistencia", "arduino", "robot", "computadora", "programacion","sensores","circuito","motor"];

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
        game.load.image('bgMenu', 'assets/img/bg-menu.png');
        game.load.image('buttonPlayAgain', 'assets/img/button-playagain.png');
        game.load.image('wonTxt', 'assets/img/youwon.png');
        game.load.image('loseTxt', 'assets/img/youlose.png');
    },
    create: function(){
        game.add.sprite(0, 0, 'background');
        this.title = game.add.sprite(game.width/2, 90, 'title');
        this.title.anchor.setTo(0.5);
        this.hangmanComplete = game.add.sprite(game.width/2, 300, 'hangman');
        this.hangmanComplete.anchor.setTo(0.5);
        this.hangmanComplete.scale.setTo(0.5);
        this.platform = game.add.sprite(game.width/2, 250, 'platform');
        this.platform.anchor.setTo(0.5);
        this.platform.scale.setTo(0.8);
        this.platform.anchor.setTo(0.5);
        this.buttonPlay = game.add.button(game.width/2, 520, 'button-play', this.startGame, this); //new Button(posicion x , posicion x, llave , funcion a llamar , callback Context GAMEPlayManager (this), imagen antes de pasar el raton, imagen al pasar el raton, imagen a cargar antes de dar click, imagen al cagar al dar click)
        this.buttonPlay.anchor.setTo(0.5);
        this.head = game.add.sprite(582, 149, 'head');
        this.head.scale.setTo(0.5);
        this.body = game.add.sprite(600, 200, 'body');
        this.body.scale.setTo(0.5);
        this.armRight = game.add.sprite(612, 185, 'armRight');
        this.armRight.scale.setTo(0.5);
        this.armLeft = game.add.sprite(564, 185, 'armLeft');
        this.armLeft.scale.setTo(0.5);
        this.legRight = game.add.sprite(612, 270, 'legRight');
        this.legRight.scale.setTo(0.5);
        this.legLeft = game.add.sprite(564, 270, 'legLeft');
        this.legLeft.scale.setTo(0.5);

        //Black background
        var pixel = game.add.bitmapData(1,1);
        pixel.ctx.fillStyle = '#000000';
        pixel.ctx.fillRect(0,0,1,1);

        this.blackBackground = game.add.sprite(0,0,pixel);
        this.blackBackground.width = game.width;
        this.blackBackground.height = game.height;
        this.blackBackground.alpha = 0.5;

        //Lose or Won
        this.bgMenu = game.add.sprite(game.width/2, game.height/2, 'bgMenu');
        this.bgMenu.anchor.setTo(0.5);
        this.wonTxt = game.add.sprite(game.width/2, 150, 'wonTxt');
        this.wonTxt.anchor.setTo(0.5);
        this.loseTxt = game.add.sprite(game.width/2, 150, 'loseTxt');
        this.loseTxt.anchor.setTo(0.5);
        this.buttonPlayAgain = game.add.button(game.width/2, 280, 'buttonPlayAgain', this.playAgain, this);
        this.buttonPlayAgain.anchor.setTo(0.5);
        this.buttonPlayAgain.scale.setTo(0.7);


    },
    startGame: function(){
        stateGame = STATE_GAME_PLAYING;
        game.input.keyboard.addCallbacks(this, null, null, this.gettingLetterFromKeyboard);
        this.pressIncorrect = 0;
        this.bmd;
        this.tipText = NaN;

        this.correct = [];
        this.platform.visible = true;
        this.hangmanComplete.visible = false;
        this.title.visible = false;
        this.buttonPlay.visible = false;
        this.head.visible = false;
        this.body.visible = false;
        this.armRight.visible = false;
        this.armLeft.visible = false;
        this.legRight.visible = false;
        this.legLeft.visible = false;
        this.blackBackground.visible = false;
        this.bgMenu.visible = false;
        this.wonTxt.visible = false;
        this.loseTxt.visible = false;
        this.buttonPlayAgain.visible = false;

        this.randomWord = list[Math.floor(Math.random()*list.length)];
        console.log(this.randomWord);
        this.showingWord(this.randomWord);
        this.tip;

        switch(this.randomWord) {
            case "resistencia":
                this.tip = "Su misión es oponerse al paso de la corriente eléctrica";
              break;
            case "arduino":
                this.tip = "Es una plataforma de hardware libre, basada en una placa con un microcontrolador\n y un entorno de desarrollo";
              break;
            case "robot":
                this.tip = "Es una máquina programable que puede manipular objetos y realizar operaciones\n como los seres humanos";
              break
            case "computadora":
                this.tip = "Máquina electrónica capaz de almacenar información y tratarla con operaciones\n  matemáticas y lógicas.";
              break;
            case "programacion":
                this.tip = "Es la acción y efecto de programar.";
              break;
            case "sensores":
                this.tip = "Pueden detectar distancias, temperaturas, velocidad, entre otras.";
              break
            case "circuito":
                this.tip = "Es una red electrónica que transporta corriente eléctrica .";
              break;
            case "motor":
                this.tip = "Es la parte de una máquina capaz de hacer funcionar un sistema transformando \n algún tipo de energía ";
              break
        }
        var style = {
            font: 'bold 18pt Arial',
            fill: '#FFFF',
            align: 'left'
        }
        this.tipText = game.add.text(game.width/2,60,'',style);
        this.tipText.anchor.setTo(0.5);
        this.tipText.text = this.tip;

        console.log(this.randomWord + ": " + this.tip);
    },
    gettingLetterFromKeyboard:function(char){
        this.bmd.cls();
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
                this.correct[letter] = true;
            }
            //  Now draw the word, letter by letter, changing colour as required
            if (this.correct[letter]){
                this.bmd.context.fillStyle = '#00ff00';
            }
            else{
                this.bmd.context.fillStyle = '#ffffff';
            }
            this.bmd.context.fillText(letter, x, 550);
            x += this.bmd.context.measureText(letter).width;
        }
        this.verifyingIfWin();
    },
    verifyingIfWin: function(){ //Veryfying if the user game
        var list = [];
        var wordsList = [];

        Object.keys(this.correct).forEach(key => { //Obtaining all values from hash
            let value = this.correct[key];
            console.log(key + ": " + value);
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
            this.correct[word[i]] = false;
        }

        //  This is our BitmapData onto which we'll draw the word being entered
        this.bmd = game.make.bitmapData(1136, 640);
        this.bmd.context.font = '140px Arial';
        this.bmd.context.fillStyle = '#ffffff';
        this.bmd.context.fillText(word, 300, 550);
        this.bmd.addToWorld();
        console.log(this.bmd);
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
        this.bmd.visible = false;
    },
    winGame: function(){ // Win
        stateGame = STATE_GAME_WIN;
        game.input.keyboard.reset(true);
    },
    playAgain: function(){
        this.tipText.destroy();
        game.input.keyboard.reset(true);
        this.bmd.destroy();
        this.startGame();
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

                    this.blackBackground.visible = false;
                    this.bgMenu.visible = false;
                    this.wonTxt.visible = false;
                    this.loseTxt.visible = false;
                    this.buttonPlayAgain.visible = false;
                break;

            case STATE_GAME_MAIN_MENU:
                break;

            case STATE_GAME_PLAYING:
                break;

            case STATE_GAME_GAME_OVER:
                    this.blackBackground.visible = true;
                    this.bgMenu.visible = true;
                    this.loseTxt.visible = true;
                    this.buttonPlayAgain.visible = true;
                    console.log("Game Over");
                break;

            case STATE_GAME_WIN:
                    this.blackBackground.visible = true;
                    this.bgMenu.visible = true;
                    this.wonTxt.visible = true;
                    this.buttonPlayAgain.visible = true;
                    console.log("You Win");
                break;
        }
    }
}

var game = new Phaser.Game(1136,640, Phaser.AUTO); //instanciamos juego en facer con sus especificaciones

game.state.add('gameplay',GamePlayManager); //Agregamos un estado que le vamos a llamar gameplay y se le asigna el objeto GamePlayMañager
game.state.start('gameplay'); //Llama a cada uno de los metodos

