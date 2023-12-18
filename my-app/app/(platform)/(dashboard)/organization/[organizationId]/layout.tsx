import { auth } from "@clerk/nextjs";
import OrgControl from "./_components/org-control";
// import x from "lodash";
import { startCase } from "lodash";

export async function generateMetadata() {
  const { orgSlug } = auth();

  console.log({ orgSlug });

  return {
    title: startCase(orgSlug || "organization"),
  };
}

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgControl /> {/* To ensure the correct org is loaded */}
      {children}
    </>
  );
};

export default OrganizationLayout;
