const Big = require('big.js');
const units = require('./units');

// TODO: use bigint instead of float
const convert = (amount, from, to) => {
  if (Number.isNaN(Number.parseFloat(amount)) || !Number.isFinite(amount)) {
    return 0;
  }

  const amountInFromUnit = Big(amount).times(units.getUnit(from));

  return Number.parseFloat(amountInFromUnit.div(units.getUnit(to)));
};

class Salvia {
  constructor(value, unit) {
    this._value = value;
    this._unit = unit;
  }

  to(newUnit) {
    this._value = convert(this._value, this._unit, newUnit);
    this._unit = newUnit;

    return this;
  }

  value() {
    return this._value;
  }

  format() {
    const displayUnit = units.getDisplay(this._unit);

    const { format, fractionDigits, trailing } = displayUnit;

    let options = { maximumFractionDigits: fractionDigits };

    if (trailing) {
      options = { minimumFractionDigits: fractionDigits };
    }

    let value;

    if (fractionDigits !== undefined) {
      const fractionPower = Big(10).pow(fractionDigits);
      value = Number.parseFloat(
        Big(Math.floor(Big(this._value).times(fractionPower))).div(
          fractionPower,
        ),
      );
    } else {
      value = this._value;
    }

    let formatted = format.replace(
      '{amount}',
      Number.parseFloat(value).toLocaleString(undefined, options),
    );

    if (displayUnit.pluralize && this._value !== 1) {
      formatted += 's';
    }

    return formatted;
  }

  toString() {
    const displayUnit = units.getDisplay(this._unit);
    const { fractionDigits } = displayUnit;
    const options = { maximumFractionDigits: fractionDigits };
    return Number.parseFloat(this._value).toLocaleString(undefined, options);
  }
}

export const salvia_formatter = (value, unit) => new Salvia(value, unit);

salvia_formatter.convert = convert;
salvia_formatter.setDisplay = units.setDisplay;
salvia_formatter.setUnit = units.setUnit;
salvia_formatter.getUnit = units.getUnit;
salvia_formatter.setFiat = (currency, rate, display = null) => {
  units.setUnit(currency, 1 / rate, display);
};

export const seed_to_salvia = (seed) => {
  return salvia_formatter(Number.parseInt(seed), 'seed').to('salvia').value();
};

export const salvia_to_seed = (salvia) => {
  return salvia_formatter(Number.parseFloat(Number(salvia)), 'salvia')
    .to('seed')
    .value();
};

export const seed_to_salvia_string = (seed) => {
  return salvia_formatter(Number(seed), 'seed').to('salvia').toString();
};

export const seed_to_colouredcoin = (seed) => {
  return salvia_formatter(Number.parseInt(seed), 'seed')
    .to('colouredcoin')
    .value();
};

export const colouredcoin_to_seed = (colouredcoin) => {
  return salvia_formatter(Number.parseFloat(Number(colouredcoin)), 'colouredcoin')
    .to('seed')
    .value();
};

export const seed_to_colouredcoin_string = (seed) => {
  return salvia_formatter(Number(seed), 'seed').to('colouredcoin').toString();
};
