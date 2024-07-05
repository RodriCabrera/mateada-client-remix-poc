import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useNavigation } from "@remix-run/react";
import { authCookie } from "~/auth";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await authCookie.parse(cookieHeader)) || {};
  if (cookie) {
    return redirect("/");
  }
  return {};
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries());

  const res: Response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const access_token = await res.json();
  return redirect("/", {
    headers: {
      "Set-Cookie": await authCookie.serialize(access_token),
    },
  });
};

export default function Login() {
  const navigation = useNavigation();

  return (
    <Form method="post">
      <hr />
      <p>{navigation.state === "submitting" ? "Submitting" : "State?"}</p>
      <hr />
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" readOnly />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" readOnly />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" readOnly />
      </div>

      <button type="submit">Login</button>
    </Form>
  );
}
