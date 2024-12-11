import { TReport } from "@shared/Reports/model/types";
import { TRule } from "@shared/Rules/model/types";

export class ReportsService {
  constructor() {}

  getRules(): Promise<TRule[]> {
    return Promise.resolve([
      { id: 'rule-1', name: 'No unused variables', description: 'Ensures that all variables declared are used.' },
      { id: 'rule-2', name: 'Consistent indentation', description: 'Requires consistent indentation throughout the code (e.g., 4 spaces).' },
      { id: 'rule-3', name: 'No console logs', description: 'Disallows the use of console.log in production code.' },
      { id: 'rule-4', name: 'Max line length', description: 'Limits the maximum length of a line of code to 120 characters' },
    ]);
  }

  getReportsData(): Promise<TReport[]> {
    return Promise.resolve([
      {
        id: 'report-1',
        timestamp: '2023-10-27T10:00:00Z',
        files: [
          {
            name: 'src/components/ComponentA.js',
            violations: [
              { ruleId: 'rule-1', line: 15, column: 5, message: 'Variable "unusedVar" is declared but never used.' },
              { ruleId: 'rule-3', line: 22, column: 1, message: 'Unexpected console.log statement.' },
            ],
          },
          {
            name: 'src/utils/helper.js',
            violations: [
              { ruleId: 'rule-2', line: 8, column: 1, message: 'Expected indentation of 4 spaces but found 2.' },
            ],
          },
        ],
      },
      {
        id: 'report-2',
        timestamp: '2023-10-26T14:30:00Z',
        files: [
          {
            name: 'src/components/ComponentB.js',
            violations: [
              { ruleId: 'rule-4', line: 55, column: 5, message: "Line exceeds maximum allowed length" }
            ]
          }
        ]
      },
    ]);
  }
}