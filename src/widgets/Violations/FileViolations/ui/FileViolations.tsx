import Violation from "@features/Violations/Violation/ui/Violation";
import { TFile } from "@shared/Projects/File/model/types";
import { TRule } from "@shared/Rules/model/types";
import { FC } from "react";

interface IFileViolationsProps {
  file: TFile;
  allRules: TRule[];
}

const FileViolations: FC<IFileViolationsProps> = ({ file, allRules }) => {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold mb-2">{file.name}</h4>
      {file.violations.map((violation) => (
        <Violation key={`${file.name}-${violation.ruleId}-${violation.line || 0}`} violation={violation} allRules={allRules} />
      ))}
    </div>
  );
};

export default FileViolations;
