import type { MetaFunction } from "@remix-run/node";
import { Link, json, useLoaderData } from "@remix-run/react";

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

export async function loader() {
  const res = await fetch("http://localhost:8080/meetups");
  const meetups: Meetup[] = await res.json();
  return json(meetups);
}

export default function Meetups() {
  const meetups = useLoaderData<typeof loader>();
  console.log(meetups);
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">MEETUPS</h1>
      <Link to={"/"}>Go back home</Link>
      {meetups.map((meetup) => (
        <div key={meetup._id} className="border p-4 my-4">
          <h2 className="text-xl">{meetup.title}</h2>
          <p>{meetup.date}</p>
          <p>{meetup.description}</p>
          <div className="flex gap-2">
            {meetup.categories.map((category) => (
              <span
                key={category}
                className="bg-lime-500 text-white px-2 py-1 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
          <p>{meetup.status}</p>

          <Link to={`/meetups/${meetup._id}`}>View details</Link>
        </div>
      ))}
    </div>
  );
}
