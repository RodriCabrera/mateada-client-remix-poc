import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, json } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";

export const meta: MetaFunction = () => {
  return [
    { title: "MateadApp" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const auth = requireAuthCookie(request);
  return json({ auth });
}

export default function Index() {
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">MateadApp</h1>
      <ul className="list-disc mt-4 pl-6 space-y-2">
        <li>
          <Link
            to={"meetups"}
            className="text-blue-700 underline visited:text-purple-900"
          >
            Go to meetups page
          </Link>
        </li>
        <li>
          <Link
            to={"login"}
            className="text-blue-700 underline visited:text-purple-900"
            reloadDocument
          >
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
}
