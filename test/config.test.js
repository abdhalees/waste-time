import { expect } from 'chai';
import config from '../src/config.json';

describe('Config object', () => {
  it('should be a valid config object', () => {
    expect(config)
      .to.be.an('object')
      .to.have.all.keys('rock', 'paper', 'scissors');
  });
  it('should have a vaild rock strength', () => {
    expect(config)
      .to.have.property('rock')
      .that.has.property('paper')
      .that.is.a('number')
      .and.equals(0);
    expect(config)
      .to.have.property('rock')
      .that.has.property('scissors')
      .that.is.a('number')
      .and.equals(1);
  });
  it('should have a vaild paper strength', () => {
    expect(config)
      .to.have.property('paper')
      .that.has.property('rock')
      .that.is.a('number')
      .and.equals(1);
    expect(config)
      .to.have.property('paper')
      .that.has.property('scissors')
      .that.is.a('number')
      .and.equals(0);
  });
  it('should have a vaild scissors strength', () => {
    expect(config)
      .to.have.property('scissors')
      .that.has.property('paper')
      .that.is.a('number')
      .and.equals(1);
    expect(config)
      .to.have.property('scissors')
      .that.has.property('rock')
      .that.is.a('number')
      .and.equals(0);
  });
});
