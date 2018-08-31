import { expect } from 'chai';
import { getRandomChoice, getWinner } from '../src/logic';
import config from '../src/config';

describe('get random choice', () => {
  const choices = ['paper', 'rock', 'scissors'];
  it('choices should be equal to config keys', () => {
    expect(choices).to.have.same.members(Object.keys(config));
  });
  it('should not be accept an empty array of choices', () => {
    expect(() => getRandomChoice([])).to.throw();
    expect(choices).to.be.not.empty; // eslint-disable-line no-unused-expressions
  });
  it('should return a valid choice', () => {
    expect(getRandomChoice(choices)).to.be.oneOf(choices);
    expect(getRandomChoice(choices)).to.be.oneOf(Object.keys(config));
  });
});

describe('get a winner', () => {
  it('player 1 should have a valid choice', () => {
    expect(getWinner('whatever', 'rock', config))
      .to.be.a('number')
      .and.equal(-1);
  });
  it('player 2 should have a valid choice', () => {
    expect(getWinner('rock', 'whatever', config))
      .to.be.a('number')
      .and.equal(-1);
  });
  it('both players should have a valid choice', () => {
    expect(getWinner('naah', 'whatever', config))
      .to.be.a('number')
      .and.equal(-1);
  });
  it('should return 0 if there is a tie', () => {
    expect(getWinner('rock', 'rock', config)).to.equal(0);
  });
  it('should return the number of the winning player', () => {
    expect(getWinner('rock', 'paper', config)).to.equal(2);
  });
  it('should return the number of the winning player', () => {
    expect(getWinner('paper', 'rock', config)).to.equal(1);
  });
});
