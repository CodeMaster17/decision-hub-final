interface InterfaceProperty {
  name: string;
  value: string;
  id: number;
}
export const property: InterfaceProperty[] = [
  {
    name: 'Income',
    value: 'value 1',
    id: 1,
  },
  {
    name: 'Property 2',
    value: 'value 2',
    id: 2,
  },
  {
    name: 'Property 3',
    value: 'value 3',
    id: 3,
  },
];

interface InterfaceOperator {
  name: string;
  value: string;
  id: number;
}

export const operator: InterfaceOperator[] = [
  {
    value: 'greater than',
    name: '>',
    id: 1,
  },
  {
    value: 'less than',
    name: '<',
    id: 2,
  },
  {
    value: 'greater than equal to',
    name: '>=',
    id: 3,
  },
  {
    value: 'less than equal to',
    name: '<=',
    id: 4,
  },
  {
    value: 'equals to',
    name: '==',
    id: 5,
  },
  {
    value: 'not equal to',
    name: '!=',
    id: 6,
  },
];

interface InterfaceNumbers {
  name: string;
  value: string;
  id: number;
}
export const numbers: InterfaceNumbers[] = [
  {
    name: '1L',
    value: '100000',
    id: 1,
  },
  {
    name: '1000 or 1K',
    value: '1000',
    id: 2,
  },
  {
    name: '10000 or 10K',
    value: '10000',
    id: 3,
  },
];

interface ThenFormInterface {
  name: string;
  value: string;
  id: number;
}
export const thenFormProperties: ThenFormInterface[] = [
  {
    name: 'Loan Grant',
    value: 'Loan Grant',
    id: 1,
  },
  {
    name: 'Incentive Grant',
    value: 'Incentive Grant',
    id: 2,
  },
  {
    name: 'Income Grant',
    value: 'Incentive Grant',
    id: 3,
  },
];

interface resultInterface {
  name: string;
  value: string;
  id: number;
}
export const results: resultInterface[] = [
  {
    name: 'True',
    value: 'True',
    id: 1,
  },
  {
    name: 'False',
    value: 'False',
    id: 2,
  },
];
