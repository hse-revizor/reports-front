import { TReport } from "@shared/Reports/model/types";
import { TRule } from "@shared/Rules/model/types";
import FileViolations from "@widgets/Violations/FileViolations/ui/FileViolations";
import { FC, useState } from "react";

interface IViewReportPageProps {
  report: TReport;
  allRules: TRule[];
}

const ViewReport: FC<IViewReportPageProps> = ({ report, allRules }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-bold">Report {report.id}</h2>
        <span className="text-gray-500">{new Date(report.timestamp).toLocaleString()}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div className="mt-4">
          {report.files.map((file) => (
            <FileViolations key={file.name} file={file} allRules={allRules} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewReport;
