import {Metadata} from "next";
import SearchForm from "@/app/components/SearchForm";

export const metadata: Metadata = {
  title: "Main",
  description: "Main Page",
};

export default function MainPage() {
  return (
      <div className="">
          <SearchForm />
        <h1 className="">Main</h1>
        <p className="">Main page</p>
      </div>

  );
}
