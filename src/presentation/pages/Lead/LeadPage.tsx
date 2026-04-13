import { Mail, Phone } from "lucide-react";
import "./LeadPage.scss";
import { useParams } from "react-router-dom";
import { usegetLeadSuspenseQuery } from "../../../infrastructure/queries/lead";

const LeadPage = () => {
    const {id} = useParams()
    const lead = usegetLeadSuspenseQuery(id)

  return (
    <div className="lead-page">
      <div className="lead-card">
        <header className="lead-header">
          <div>
            <h1>{lead.firstName} {lead.lastName}</h1>
            <p className="subtitle">{lead.product_interest}</p>
          </div>

          <span className="badge">{lead.source}</span>
        </header>

        <section className="lead-section">
          <div className="row">
            <Mail size={16} />
            <span>{lead.email}</span>
          </div>

          <div className="row">
            <Phone size={16} />
            <span>{lead.phone}</span>
          </div>
        </section>

        <section className="lead-meta">
          <div>
            <span className="label">Campaign</span>
            <strong>{lead.utmCampaign}</strong>
          </div>

          <div>
            <span className="label">Received</span>
            <strong>
              {new Date(lead.receivedAt).toLocaleDateString("en-GB")}
            </strong>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LeadPage;
