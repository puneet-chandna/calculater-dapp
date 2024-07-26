import * as anchor from '@project-serum/anchor';
import assert from 'assert';
const { SystemProgram } = anchor.web3;

describe('calculater-dapp', () => {
    const provider = anchor.AnchorProvider.local();
    anchor.setProvider(provider);

    // Explicitly fetch the workspace and program
    const idl = JSON.parse(
        require('fs').readFileSync('target/idl/calculater_dapp.json', 'utf8')
    );

    const programId = new anchor.web3.PublicKey('99PNcvRfaEmDgw4sMBMakmzEazzif7wYUH5kBobJqyjc');
    const program = new anchor.Program(idl, programId, provider);

    const calculater = anchor.web3.Keypair.generate();

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
