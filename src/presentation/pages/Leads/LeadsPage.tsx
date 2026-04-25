import { useState } from "react";
import { usegetLeadsSuspenseQuery } from "../../../infrastructure/queries/lead";
import "./LeadsPage.scss";
import Pagination from "../../components/Pagination/Pagination";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import FormLeads from "../../components/forms/FormLeads";
import { useLeadDeleteMutation } from "../../../infrastructure/mutations/useLeadDeleteMutation";
import { toast } from "sonner";
import DeleteModal from "../../components/modal/DeleteModal";

const LeadsPage = () => {
    const pageSize = 10;
    const [currentPage,setCurrentPage] = useState(1);
    const data = usegetLeadsSuspenseQuery(currentPage,pageSize);  
    const [open, setOpen] = useState(false);
    const { mutation: leaddeleteMutate } = useLeadDeleteMutation();

    const handleDelete = (id:number)=>{
        toast.promise(
          leaddeleteMutate.mutateAsync(id),
          {
            loading: 'Deleting lead...',
            success: 'Lead deleted successfully!',
            error: (error) => error.message || 'Failed to delete the lead'
          }
        )
    }


    return (
        <>
        <div className="leads-table-card">
            <div className="leads-table-header">
              <h2>Leads</h2>
              <button className="primary-btn" onClick={() => setOpen(true)}>+ New Lead</button>
            </div>

            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="Add new lead"
              >
            <FormLeads onClose={() => setOpen(false)}/>
            </Modal>
            
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
                      <td className="lead-name">
                        <Link to={`/lead/${lead.id}`}>
                          {lead.firstName} {lead.lastName}
                        </Link> </td>
                      <td>{lead.email}</td>
                      <td>{lead.utmCampaign}</td>
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
                        <Link to={`/lead/${lead.id}`}>
                          <Eye className="w-5 h-5 cursor-pointer" />
                        </Link>
                        <DeleteModal id={lead.id||0} handleDelete={handleDelete}/>
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