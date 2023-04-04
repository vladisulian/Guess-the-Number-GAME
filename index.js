const readline = require("readline");
const fs = require("fs/promises"); //! PROMISES
const { program } = require("commander");
require("colors");

program.option(
  "-f, --file [type]",
  "file for saving game results",
  "results.txt"
);

program.parse(process.argv);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let count = 0;
const logFile = program.opts().file;
const mind = Math.floor(Math.random() * 10) + 1;

const isValid = (value) => {
  if (isNaN(value)) {
    console.log("Enter the number!".red);
    return false;
  }

  if (value < 1 || value > 10) {
    console.log(`The number must be between 1 and 10.`.red);
    return false;
  }
  return true;
};

const log = async (data) => {
  try {
    await fs.appendFile(logFile, `${data}\n`);
    console.log(`Saving the result in ${logFile}`.green);
  } catch (err) {
    console.log(`Error saving the ${logFile}`.red);
  }
};

const game = () => {
  rl.question("Guess the number between 1 and 10 ".yellow, (answer) => {
    let guess = +answer;

    if (!isValid(guess)) {
      game();
      return;
    }
    count += 1;
    if (guess === mind) {
      console.log(
        `You successfully guessed the number in %d steps.`.green,
        count
      );
      log(
        `${new Date().toLocaleDateString()}: Congratulations! You guessed the number in ${count} steps.`
      ).finally(() => rl.close());
      return;
    }
    console.log("Wrong answer. Try again".red);
    game();
  });
};

game();
