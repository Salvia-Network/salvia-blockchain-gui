const salvia = require('../../util/salvia');

describe('salvia', () => {
  it('converts number seed to salvia', () => {
    const result = salvia.seed_to_salvia(1000000);

    expect(result).toBe(0.000001);
  });
  it('converts string seed to salvia', () => {
    const result = salvia.seed_to_salvia('1000000');

    expect(result).toBe(0.000001);
  });
  it('converts number seed to salvia string', () => {
    const result = salvia.seed_to_salvia_string(1000000);

    expect(result).toBe('0.000001');
  });
  it('converts string seed to salvia string', () => {
    const result = salvia.seed_to_salvia_string('1000000');

    expect(result).toBe('0.000001');
  });
  it('converts number salvia to seed', () => {
    const result = salvia.salvia_to_seed(0.000001);

    expect(result).toBe(1000000);
  });
  it('converts string salvia to seed', () => {
    const result = salvia.salvia_to_seed('0.000001');

    expect(result).toBe(1000000);
  });
  it('converts number seed to colouredcoin', () => {
    const result = salvia.seed_to_colouredcoin(1000000);

    expect(result).toBe(1000);
  });
  it('converts string seed to colouredcoin', () => {
    const result = salvia.seed_to_colouredcoin('1000000');

    expect(result).toBe(1000);
  });
  it('converts number seed to colouredcoin string', () => {
    const result = salvia.seed_to_colouredcoin_string(1000000);

    expect(result).toBe('1,000');
  });
  it('converts string seed to colouredcoin string', () => {
    const result = salvia.seed_to_colouredcoin_string('1000000');

    expect(result).toBe('1,000');
  });
  it('converts number colouredcoin to seed', () => {
    const result = salvia.colouredcoin_to_seed(1000);

    expect(result).toBe(1000000);
  });
  it('converts string colouredcoin to seed', () => {
    const result = salvia.colouredcoin_to_seed('1000');

    expect(result).toBe(1000000);
  });
});
