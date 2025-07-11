
"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";

import { ChartAreaInteractive } from "@/modules/dashboard/chartarea/cpc-chart-area";
import ChartAreaInteractiveEmployee from "@/modules/dashboard/chartarea/employee-chart-area";
import { DataTableEmployee } from "@/modules/dashboard/datatable/employee-data-table";
import { DataTable } from "@/modules/dashboard/datatable/cpc-data-table";
import { SectionCardCPC } from "@/modules/dashboard/sectioncard/Cpc-section-card";
import { SectionCardEmployee } from "@/modules/dashboard/sectioncard/Employee-section-card";

export default function Dashboard() {


  const { currentUser, loading, isCpc } = useCurrentUser();



const employeeId= currentUser?.id  // Default to a specific employee ID if not available

  return (

        <div className="p-4">
      {isCpc ? (
        <div className="space-y-6">
          <SectionCardCPC />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable />
        </div>
      ) : (
        <div className="space-y-6">
          <SectionCardEmployee employeeId={employeeId} />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractiveEmployee employeeId={employeeId}/>
          </div>
          <DataTableEmployee employeeId={employeeId}/>
        </div>
      )}
      
    </div>

  );
}

