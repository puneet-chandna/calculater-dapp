import * as anchor from '@project-serum/anchor';
const assert = require('assert');
const { SystemProgram } = anchor.web3;

describe('calculater-dapp', () => {
    const provider = anchor.AnchorProvider.local();
    anchor.setProvider(provider);
    const calculater = anchor.web3.Keypair.generate();
    const program = anchor.workspace.calculater_dapp;

    it('creates a calculater', async () => {
        await program.rpc.create("Welcome to Solana", {
            accounts: {
                calculater: calculater.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            },
            signers: [calculater]
        });
        const account = await program.account.calculater.fetch(calculater.publicKey);
        assert.ok(account.greeting === "Welcome to Solana");
    });
});
