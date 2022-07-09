import * as React from "react";
import { Outlet } from "react-router-dom";
import CardCareer from "../components/landing/CardCareer";
import CardSearch from "../components/landing/CardSearch";
import CardSearchType from "../components/landing/CardSearchType";
import CardTopRecruiter from "../components/landing/CardTopRecruiter";

const Index = () => {
  return (
    <>
      <section style={{ backgroundColor: "white" }}>
        <CardCareer />
        <CardSearch type={"typeSearchPosts"} />
        <main>
          <Outlet />
        </main>
        <CardTopRecruiter />
        <CardSearchType />
      </section>
    </>
  );
};
export default Index;
