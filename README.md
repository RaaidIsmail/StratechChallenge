# Explore Node

## Challenge

Bybit is a Crypto currency exchange.
Bybit provides a public API at the base URL:
https://api-testnet.bybit.com

The following API list the derivative instruments available from Bybit: 

https://api-testnet.bybit.com/derivatives/v3/public/instruments-info?category=option

The following API gives returns analytic data for each derivative instrument traded on Bybit.

https://api-testnet.bybit.com​/derivatives/v3/public/tickers?category=option&symbol=BTC-5AUG22-18000-P
as an example.

Please write a javascript script to be executed with node, to extract the list of instruments from the Bybit test net.
For each instrument, fetch the derivative analyting data.

Using the persistance of your choice (file?database?), save the analytic data for all the instruments, in order of the following:
1. Category 
2. Total Volume (high to low)
3. Delta (large to small)


