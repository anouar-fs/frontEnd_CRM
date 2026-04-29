import { useParams } from "react-router-dom";
import { usegetLeadSuspenseQuery } from "../../../infrastructure/queries/lead";
import { LeadProfilePage } from "../../components/leadProfile/LeadProfilePage";
import type { LeadType } from "../../../models/leads";


const Profile = () => {
    const {id} = useParams()
    const lead = usegetLeadSuspenseQuery(Number(id)) ?? {} as LeadType
  return (
    <>
      <LeadProfilePage
        lead={lead}
        onEdit={() => console.log("edit")}
        onMessage={() => console.log("message")}
        onArchive={() => console.log("archive")}
      />
    </>
  );
};

export default Profile;
