import {Metadata} from "next";
import SearchForm from "@/app/components/SearchForm";
import BookingForm from "@/app/components/BookingForm";

export const metadata: Metadata = {
  title: "Main",
  description: "Main Page",
};

export default function MainPage() {
  return (
      <div>
          <SearchForm />
      </div>
  );
}
