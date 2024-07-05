import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, json, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

export const meta: MetaFunction = () => {
  return [{ title: "Meetups" }];
};

interface Meetup {
  _id: string;
  date: string;
  title: string;
  description: string;
  categories: string[];
  status: string;
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  invariant(params.meetupId, "Expected params.meetupId");

  // const cookieHeader = request.headers.get("Cookie");

  const res = await fetch(`http://localhost:8080/meetups/${params.meetupId}`);
  const meetupDetails: Meetup = await res.json();
  return json(meetupDetails);
}

export default function Meetups() {
  const meetupDetails = useLoaderData<typeof loader>();
  console.log(meetupDetails);
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Meetup Details</h1>
      <Link to={"/"}>Go back home</Link>
    </div>
  );
}
