import missionData from "../../../utils/data/json/teams/mission/home.json";
import homeBanner from "../../../utils/data/json/teams/banner/home.json";
import { CoverImageSlide } from "./components/CoverImageSlide";
import ListNewsHome from "./components/ListNews";
import { ResumeComponent } from "./components/ResumeComponent";


export const HomeContent = () => {
  return (
    <>
      <CoverImageSlide coverImageData={homeBanner} />
      <ResumeComponent missionCartData={missionData} />
      <ListNewsHome team="" />
    </>
  );
};
