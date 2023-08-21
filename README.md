## Task Description

1. Checkout the code from the repository
2. Run the application locally
```bash
$ yarn install
$ yarn run start
```
3. Call the endpoint with localhost:3111/17892393
```bash
curl --location --request POST 'localhost:3111/17892393'
```
4. Debug the application and fix the bug
5. Review the code and suggest improvements

## Application Description
Web API allowing to investigate which blockchain address appears most number of times in a given block.

Params:
- block number

Returns:
- address and number of times it appeared in the block
