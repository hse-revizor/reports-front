import { FC, useEffect, useState } from "react";
import { ReportsService } from "../api/service";
import Rule from "@features/Rules/Rule/ui/Rule";
import ViewReport from "@widgets/VIewReport/ui/ViewReport";
import { TRule } from "@shared/Rules/model/types";
import { TReport } from "@shared/Reports/model/types";

const service = new ReportsService();

const ViewReportPage: FC = () => {
  const [rulesData, setRulesData] = useState<TRule[]>([]);
  const [reportsData, setReportsData] = useState<TReport[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const rules = await service.getRules();
      const reports = await service.getReportsData();

      setRulesData(rules);
      setReportsData(reports);
      setIsLoaded(true);
    })()
  }, []);

  if (!isLoaded) {
    return (
      <div className="container mx-auto p-4">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Code Quality Reports</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Rules</h2>
        {rulesData.map((rule) => (
          <Rule key={rule.id} rule={rule} />
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Reports</h2>
        {reportsData.map((report) => (
          <ViewReport key={report.id} report={report} allRules={rulesData} />
        ))}
      </section>
    </div>
  );
};

export default ViewReportPage;
