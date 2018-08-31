/* global document localStorage alert */

import config from './config.json';
import { getRandomChoice, getWinner } from './logic';

const newGameButtons = document.getElementsByClassName('new-game');
const playButton = document.getElementById('play');
const watchButton = document.getElementById('watch');
const letMePlayButton = document.getElementById('let-me-play');
const player1Choices = document.getElementsByClassName('player1-choice');
const player2Choices = document.getElementsByClassName('player2-choice');
const player1ScoreElement = document.getElementById('palyer1-score');
const tieScoreElement = document.getElementById('ties-score');
const player2ScoreElement = document.getElementById('palyer2-score');
const player1Title = document.getElementById('palyer1-title');
const player2Title = document.getElementById('palyer2-title');
const cVcArea = document.getElementsByClassName('com-vs-com-area');
const pVcArea = document.getElementById('player-vs-com-area');
const choices = Object.keys(config);
let winningElement;
let losingElement;

const data = {
  player1: localStorage.getItem('player1') || 'user',
  player2: localStorage.getItem('player2') || 'com',
  player1Score: localStorage.getItem('player1Score') || 0,
  player2Score: localStorage.getItem('player2Score') || 0,
  tiesScore: localStorage.getItem('tiesScore') || 0
};

const save = key => {
  localStorage.setItem(key, data[key]);
};

const arrayListeners = (type, nodeList, event, handler) => {
  Array.from(nodeList).forEach(element => {
    if (type === 'add') element.addEventListener(event, handler);
    else element.removeEventListener(event, handler);
  });
};

const styleWinner = () => {
  if (winningElement.getAttribute('data-choice') === losingElement.getAttribute('data-choice')) {
    winningElement.classList.add('tie-choice');
    losingElement.classList.add('tie-choice');
  } else {
    winningElement.classList.add('winning-choice');
    losingElement.classList.add('losing-choice');
  }
};

const removeStyle = () => {
  if (winningElement && losingElement) {
    winningElement.classList.remove('tie-choice', 'winning-choice', 'losing-choice');
    losingElement.classList.remove('tie-choice', 'winning-choice', 'losing-choice');
  }
};

const renderScores = changed => {
  const { tiesScore, player1Score, player2Score } = data;
  // a switch case was used to just render the changing elements
  switch (changed) {
    case 'all':
      tieScoreElement.innerText = tiesScore;
      save('tiesScore');
      player1ScoreElement.innerText = player1Score;
      save('player1Score');
      player2ScoreElement.innerText = player2Score;
      save('player2Score');
      break;
    case 'player1':
      player1ScoreElement.innerText = player1Score;
      save('player1Score');
      break;
    case 'player2':
      player2ScoreElement.innerText = player2Score;
      save('player2Score');
      break;
    case 'tie':
      tieScoreElement.innerText = tiesScore;
      save('tiesScore');
      break;
    default:
  }
};

const renderShowBoard = (scoreType, winning, losing, changedScore) => {
  data[scoreType] = parseInt(data[scoreType], 10) + 1;
  winningElement = winning;
  losingElement = losing;
  renderScores(changedScore);
};

const renderWinner = (winner, player1Element, player2Element) => {
  removeStyle();
  switch (winner) {
    case -1:
      alert('not valid input'); // eslint-disable-line no-alert
      break;
    case 0:
      renderShowBoard('tiesScore', player1Element, player2Element, 'tie');
      break;
    case 1:
      renderShowBoard('player1Score', player1Element, player2Element, 'player1');
      break;
    case 2:
      renderShowBoard('player2Score', player2Element, player1Element, 'player2');
      break;
    default:
  }
  styleWinner();
};

const playGame = (playerType, playerChoice) => {
  if ((playerType !== 'user' && playerType !== 'com') || (playerChoice && !choices.includes(playerChoice))) return;
  const player1Choice = playerType === 'user' ? playerChoice : getRandomChoice(choices);
  const player2Choice = getRandomChoice(choices);
  const player1Element = player1Choices[choices.indexOf(player1Choice)];
  const player2Element = player2Choices[choices.indexOf(player2Choice)];
  const winner = getWinner(player1Choice, player2Choice, config);

  renderWinner(winner, player1Element, player2Element);
};

const playHandler = e => {
  const choice = e.currentTarget.getAttribute('data-choice');
  playGame(data.player1, choice);
};

const reset = () => {
  data.tiesScore = 0;
  data.player1Score = 0;
  data.player2Score = 0;
  removeStyle();
  renderScores('all');
};

const showcVcArea = () => {
  Array.from(cVcArea).forEach(area => {
    area.style.display = 'block'; // eslint-disable-line no-param-reassign
  });
  pVcArea.style.display = 'none';
};

const showpVcArea = () => {
  Array.from(cVcArea).forEach(area => {
    area.style.display = 'none'; // eslint-disable-line no-param-reassign
  });
  pVcArea.style.display = 'block';
};

const cVcRender = initalRender => {
  if (!initalRender) reset();
  showcVcArea();
  player1Title.innerText = 'Computer 1 Wins';
  player2Title.innerText = 'Computer 2 Wins';
  data.player1 = 'com';
  renderScores('all');
  save('player1');
  arrayListeners('remove', player1Choices, 'click', playHandler);
  Array.from(player1Choices).forEach(choiceElement => {
    choiceElement.classList.remove('selectable');
  });
};

const pVcRender = initalRender => {
  if (!initalRender) reset();
  showpVcArea();
  player1Title.innerText = 'Player Wins';
  player2Title.innerText = 'Computer Wins';
  data.player1 = 'user';
  renderScores('all');
  save('player1');
  save('player2');
  arrayListeners('add', player1Choices, 'click', playHandler);
  Array.from(player1Choices).forEach(choiceElement => {
    choiceElement.classList.add('selectable');
  });
};

if (data.player1 === 'user') pVcRender(true);
else cVcRender(true);

arrayListeners('add', newGameButtons, 'click', reset);

watchButton.addEventListener('click', () => {
  cVcRender();
});
letMePlayButton.addEventListener('click', () => {
  pVcRender();
});

playButton.addEventListener('click', () => {
  playGame(data.player1);
});
