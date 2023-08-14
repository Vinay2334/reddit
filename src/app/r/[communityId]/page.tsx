import { Community, communityState } from "@/atoms/communitiesAtom";
import CommunityNotFound from "@/components/Community/CommunityNotFound";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import safeJsonStringify from "safe-json-stringify";
import CommunityPage from "@/components/Pages/CommunityPage";

type CommunityPageProps = {
  
};

async function getCommunityData(communityId: any) {
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);

    return communityDoc.exists() ? JSON.parse(
        safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
      ) : "";
    } catch (error) {
    console.log("getServerSideProps error", error);
  }
}

const Page: React.FC<CommunityPageProps> =  async({ params }: any) => {
  const { communityId } = params;
  const communityData: Community = await getCommunityData(communityId);

  if(!communityData){
    return <CommunityNotFound/>
  }

  return (
    <CommunityPage communityData={communityData} communityId={communityId}/>
  )
};

export default Page;
