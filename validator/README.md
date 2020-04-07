# JSON Schema Validator

Validator for Kaliningrad Graph structure.

## Installation

```sh
# or yarn add
npm install --save SquashConsulting/kaliningrad_validiator#master
```

## Usage

```ts
import validate from 'kaliningrad-validator'

const data = {...} // your Kaliningrad json data

const isValid = validate(data);

if (!isValid) {
  throw new Error('Invalid Kaliningrad Graph Structure');
}
```
