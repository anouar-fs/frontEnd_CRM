import { useParams } from "react-router-dom";
import { usegetLeadSuspenseQuery } from "../../../infrastructure/queries/lead";
import { LeadProfilePage } from "../../components/leadProfile/LeadProfilePage";


const Profile = () => {
    const {id} = useParams()
    const lead = usegetLeadSuspenseQuery(id)
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
