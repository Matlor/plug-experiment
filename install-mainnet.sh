export WALLET_PRINCIPAL=$(dfx identity --network ic get-wallet)  


dfx deploy --network ic --wallet "$WALLET_PRINCIPAL" frontend --with-cycles 100000000000