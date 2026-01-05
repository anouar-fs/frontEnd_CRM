import { usegetLeadsSuspenseQuery } from "../../../infrastructure/queries/lead";
import "./LeadsPage.scss";

const LeadsPage = () => {
    const leads = usegetLeadsSuspenseQuery();

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
                    <th></th>
                  </tr>
                </thead>
            
                <tbody>
                  {leads ? leads.map((lead) => (
                    <tr key={lead.phone}>
                      <td className="lead-name">{lead.firstName} {lead.lastName}</td>
                      <td>{lead.email}</td>
                      <td>{lead.utm_campaign}</td>
                      <td>
                        <span className={`status`}>
                          {lead.source}
                        </span>
                      </td>
                      {/* <td>{lead.received_at.toISOString()}</td> */}
                      <td>{"ghgbrege r"}</td>
                      <td className="actions">
                        <button>View</button>
                        <button className="danger">Delete</button>
                      </td>
                    </tr>
                  )):"nothing"}
                </tbody>
              </table>
            </div>
    </div>
        </>
    )
}

export default LeadsPage