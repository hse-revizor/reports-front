import { TRule } from "@shared/Rules/model/types";
import { TViolation } from "@shared/Violation/model/types";
import { FC } from "react";

interface IViolationProps {
  violation: TViolation;
  allRules: TRule[]
}

const Violation: FC<IViolationProps> = ({ violation, allRules }) => {
  const rule = allRules.find((r) => r.id === violation.ruleId);

  return (
    <div className="bg-red-50 p-3 rounded-md mb-2 border border-red-200">
      <div className="flex items-center">
        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold mr-2">!</span>
          <p className="text-red-700 font-medium">
              {rule ? rule.name : `Unknown Rule (ID: ${violation.ruleId})`}
          </p>

      </div>
        {violation.line && violation.column && (
            <p className='text-sm text-gray-600'>
            Line: {violation.line}, Column: {violation.column}
            </p>
        )}

      <p className="text-sm">{violation.message}</p>
    </div>
  );
};

export default Violation;