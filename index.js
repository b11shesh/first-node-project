#!/usr/bin/env node 
//tells os to execute code on installed node js version

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from 'chalk-animation';
import figlet from "figlet";
import { createSpinner } from "nanospinner";



let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome(){
    const rainbowTitle = chalkAnimation.rainbow(
        "Lets Test Your IQ \n"
    );
    await sleep();
    rainbowTitle.stop();

    console.log(`
    ${chalk.bgBlue('HOW TO PLAY')}
    I am a process on your device.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right....
    `);
}

async function askName(){
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default(){
            return 'player';
        },
    });
    playerName = answers.player_name;
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
  
    if (isCorrect) {
      spinner.success({ text: `Good Job ${playerName}. That's a correct answer` });
    } else {
      spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
      process.exit(1);
    }
}

function winner() {
    console.clear();
    figlet(`Congrats , ${playerName} !\n Your IQ is great`, (err, data) => {
      console.log(gradient.pastel.multiline(data) + '\n');
      process.exit(0);
    });
}

async function question1(){
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'What is (10+2)/6*3\n',
        choices: [
          '2',
          '5',
          '6',
          '9',
        ],
      });
    
      return handleAnswer(answers.question_1 === '6');
}
async function question2() {
    const answers = await inquirer.prompt({
      name: 'question_2',
      type: 'list',
      message: 'What is capital of Nepal? \n',
      choices: ['Pokhara', 'Chitwan', 'Kathmandu', 'Lalitpur'],
    });
    return handleAnswer(answers.question_2 === 'Kathmandu');
}
  
async function question3() {
    const answers = await inquirer.prompt({
      name: 'question_3',
      type: 'list',
      message: `When is Democracy day celebrated in Nepal? \n`,
      choices: ['7th Falgun 2007 B.S', '15th Falgun 2008 B.S', '12th Falgun 2006 B.S', '18th Falgun 2007 B.S' ],
    });
  
    return handleAnswer(answers.question_3 === '7th Falgun 2007 B.S');
}

console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
winner();