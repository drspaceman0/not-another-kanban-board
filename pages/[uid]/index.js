import { getUsersDash } from "../../lib/firebase";
import Dash from "../../components/Dash";
import { useState } from "react";

export default function UserPage({ columns }) {
  const [initialDashboard, setInitialDashboard] = useState(columns);

  return (
    <main>
      <div className="card">
        <h2>Welcome to your board </h2>
      </div>
      <Dash columns={columns} handleStateChange={handleStateChange} />
    </main>
  );
}

export async function getServerSideProps({ query }) {
  const columns = await getUsersDash(query.uid);
  console.log(columns);
  return { props: { columns: columns } };
}
