import {Metadata} from "next";
import SearchForm from "@/app/components/SearchForm";

export const metadata: Metadata = {
  title: "Main",
  description: "Main Page",
};

export default function MainPage() {
  return (
      <div >
          <SearchForm />

      </div>

  );
}
