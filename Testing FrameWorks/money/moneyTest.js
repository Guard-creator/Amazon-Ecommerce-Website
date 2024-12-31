import { formatCurrency } from "../../scripts/utility/money.js";

describe('Test Suite: format Currency testing', () => {

  it('testing With Normal Value', () => {
    expect(formatCurrency(1095)).toEqual('10.95');
  })

  it('testing with round of numbers', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  })

  it('testing with zero', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  })

  it('testing with nearest number of zero', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  })

  it('testing with negative number', () => {
    expect(formatCurrency(-500)).toEqual('-5.00');
  })

})