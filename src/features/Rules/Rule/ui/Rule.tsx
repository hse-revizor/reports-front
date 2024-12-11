import { TRule } from "@shared/Rules/model/types";
import { FC } from "react";

interface IRuleProps {
  rule: TRule;
}

const Rule: FC<IRuleProps> = ({ rule }) =>  {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-semibold">{rule.name}</h3>
      <p className="text-gray-600">{rule.description}</p>
    </div>
  );
}

export default Rule;
