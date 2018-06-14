"use strict"

//Defining Business Logic
var randomString = Math.floor((Math.random() * 10) + 1); //Generating random number
var maxTries = 3; // Max no of Tries

//Defining external methods
const internals = module.exports = (route, options) => {
    return (request, h) => {
        return internals[options.method](request, h);
    };
};
//
internals.printGuessItOutput = (request, h) => {

    var input = request.params.id;

    if (input > 0 && input < 11) {

        var optStatement = '';

        if (maxTries > 0) {
            var status = false; //For game status
            //Define tries statement
            const noOfTries = (maxTries == 3) ? 'first' : ((maxTries == 2) ? 'second' :
              (maxTries == 1) ? 'last' : '');

            //Defining the interval length for your input and output numbers
            const interval = Number(findIntervalLength([input, randomString]));
            //When your tries start, reducing the chances of solving the game
            maxTries--;

            if (interval == 0) {
                //If you won the game
                optStatement = 'Your ' + noOfTries + ' guess is: ' + input +
                  '<br/>Right! You have won the game';
                //Start new game
                randomString = Math.floor((Math.random() * 10) + 1);
                maxTries = 3;
                status = true;

            } else if (interval >= 3) {
                //When the guess is 3 or more away from your input
                optStatement = 'Your ' + noOfTries + ' guess is: ' + input + ' (cold)';

            } else if (interval == 2) {
                //When the guess is 2 away from your input
                optStatement = 'Your ' + noOfTries + ' guess is: ' + input + ' (warm)';

            } else if (interval == 1) {
                //When the guess is 1 away from your input
                optStatement = 'Your ' + noOfTries + ' guess is: ' + input + ' (hot)';

            }

            //If you lost the game
            if (noOfTries == 'last' && status == false) {
                optStatement = optStatement + '<br/>You lost the game!';
                //Start new game
                randomString = Math.floor((Math.random() * 10) + 1);
                maxTries = 3;
            }
        } else {
            optStatement = 'Your Max Tries done.'; // Print, If max tries done
        }
        return optStatement; //Return output
    } else {
        return 'Invalid input'; // Return, If invalid input found
    }
};

//Defining reloadGame function for regenerating the game
internals.reloadGame = (request, reply) => {

    randomString = Math.floor((Math.random() * 10) + 1);
    maxTries = 3;
    return 'ok';
};
//Defining findIntervalLength function find interval length for 2 numbers;
const findIntervalLength = (arr) => {

    var count = 0;
    const lower = Math.min(arr[0], arr[1]);
    const upper = Math.max(arr[0], arr[1]);
    for (var i = lower; i < upper; i++) {
        count++;
    }
    return count;
};
