// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (C) 2026 LuxAlgo

import { describe, expect, it } from 'vitest';

import { PineTS } from '../../../src/PineTS.class';
import { Provider } from '@pinets/marketData/Provider.class';

describe('strategy immediate order execution', () => {
    it('fills a market entry on the bar that emits its signal', async () => {
        const pineTS = new PineTS(
            Provider.Mock,
            'BTCUSDC',
            '60',
            null,
            new Date('2024-01-01').getTime(),
            new Date('2024-01-10').getTime(),
        );

        const context: any = await pineTS.run(($) => {
            const { strategy } = $.pine;

            strategy('Immediate market entry');
            strategy.entry('long', strategy.long, 1);
        }, 1);

        expect(context.strategy.pending_orders).toHaveLength(0);
        expect(context.strategy.opentrades).toHaveLength(1);
        expect(context.strategy.opentrades[0].entry_bar_index).toBe(context.idx);
        expect(context.strategy.opentrades[0].entry_price).toBe(context.data.close.get(0));
    });
});
