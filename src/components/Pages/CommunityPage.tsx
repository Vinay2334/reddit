"use client";
import { Community, communityState } from "@/atoms/communitiesAtom";
import React, { useEffect } from "react";
import CreatePostLink from "../Community/CreatePostLink";
import Header from "../Community/Header";
import PageContent from "../Layout/PageContent";
import Posts from "../Posts/Posts";
import { useSetRecoilState } from "recoil";
import About from "../Community/About";

type CommunityPageProps = {
  communityId: any;
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({
  communityId,
  communityData,
}) => {
  const setCommunityStateValue = useSetRecoilState(communityState);

  useEffect(() => {
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
  },[communityData]);

  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <div>
            <About communityData={communityData}/>
          </div>
        </>
      </PageContent>
    </>
  );
};
export default CommunityPage;
