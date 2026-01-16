import { useState } from "react";
import { usegetLeadsSuspenseQuery } from "../../../infrastructure/queries/lead";
import "./LeadsPage.scss";
import Pagination from "../../components/Pagination/Pagination";

const LeadsPage = () => {
    const pageSize = 10;
    const [currentPage,setCurrentPage] = useState(1);
    const data = usegetLeadsSuspenseQuery(currentPage,pageSize);
    
    return (
        <>
        <div className="leads-table-card">
            <div className="leads-table-header">
              <h2>Leads</h2>
              <button className="primary-btn">+ New Lead</button>
            </div>
            
            <div className="table-wrapper">
              <table className="leads-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
            
                <tbody>
                  {data ? data.leads.map((lead) => (
                    <tr key={lead.phone}>
                      <td className="lead-name">{lead.firstName} {lead.lastName}</td>
                      <td>{lead.email}</td>
                      <td>{lead.utm_campaign}</td>
                      <td>
                        <span className={`status`}>
                          {lead.source}
                        </span>
                      </td>
                      <td>
                        {new Date(lead.receivedAt).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="actions">
                        <button>View</button>
                        <button className="danger">Delete</button>
                      </td>
                    </tr>
                  )):"nothing"}
                </tbody>
              </table>

              <Pagination 
                currentPage={currentPage}
                totalPages={data?.pageNumber||0}
                onPageChange={setCurrentPage}
              />
            </div>
    </div>
        </>
    )
}

export default LeadsPage