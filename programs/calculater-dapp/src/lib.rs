use anchor_lang::prelude::*;

declare_id!("99PNcvRfaEmDgw4sMBMakmzEazzif7wYUH5kBobJqyjc");

#[program]
pub mod calculater_dapp {
    use super::*;
    
    pub fn create(ctx: Context<Create>, init_message: String) -> Result<()> {
        let calculater = &mut ctx.accounts.calculater;
        calculater.greeting = init_message;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {  
    #[account(init, payer = user, space = 264)]
    pub calculater: Account<'info, Calculater>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Calculater {
    pub greeting: String,
    pub result: i64,
    pub remainder: i64,
}