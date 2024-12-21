import { formatCurrency } from "../scripts/utils/money.js";

describe('formatCurrency', () => {
    it('converts cents into dollars', () => {
        expect(formatCurrency(2033)).toEqual('20.33');
    });
    it('workd with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

});
